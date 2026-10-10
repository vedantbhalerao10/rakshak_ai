"""
Rakshak AI — API Routes
"""
import os
import base64
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import Optional

from ..models.schemas import (
    TextAnalysisRequest, URLAnalysisRequest, AnalysisResult,
    ChatRequest, ChatResponse, HealthResponse
)
from ..ai.analyzer import analyze_text, analyze_url, analyze_chat
from ..database.db import save_analysis, get_history, clear_history, get_stats
from ..demo_scenarios import DEMO_SCENARIOS

router = APIRouter(prefix="/api")

MAX_IMAGE_SIZE = 10 * 1024 * 1024  # 10 MB
ALLOWED_IMAGE_TYPES = {"image/png", "image/jpeg", "image/jpg", "image/webp"}


@router.get("/health", response_model=HealthResponse)
async def health_check():
    demo_mode = os.getenv("DEMO_MODE", "false").lower() == "true"
    api_key = os.getenv("OPENAI_API_KEY", "")
    ai_available = bool(api_key and api_key != "your-openai-api-key-here")

    return HealthResponse(
        status="ok",
        demo_mode=demo_mode,
        ai_available=ai_available,
        version="1.0.0"
    )


@router.post("/analyze/text")
async def analyze_text_endpoint(request: TextAnalysisRequest):
    content = request.content.strip()
    if not content:
        raise HTTPException(status_code=422, detail="Content cannot be empty.")

    demo_mode = os.getenv("DEMO_MODE", "false").lower() == "true"

    # Check if a specific demo scenario was requested
    if request.demo_scenario_id and request.demo_scenario_id in DEMO_SCENARIOS:
        scenario = DEMO_SCENARIOS[request.demo_scenario_id]
        result = scenario["result"].copy()
        result["input_type"] = "text"
        result["demo_mode"] = demo_mode

        # Save to history
        await save_analysis(
            input_type="text",
            content_preview=content[:300],
            risk_level=result["risk_level"],
            risk_score=result["risk_score"],
            signals=result.get("signals", []),
            threat_type=result.get("primary_threat", "Unable to Determine")
        )
        return result

    # Perform analysis
    result = await analyze_text(content)

    # Save to history
    await save_analysis(
        input_type="text",
        content_preview=content[:300],
        risk_level=result["risk_level"],
        risk_score=result["risk_score"],
        signals=result.get("signals", []),
        threat_type=result.get("primary_threat", "Unable to Determine")
    )

    return result


@router.post("/analyze/image")
async def analyze_image_endpoint(file: UploadFile = File(...)):
    # Validate file type
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=422,
            detail=f"Unsupported image type '{file.content_type}'. Allowed: PNG, JPG, JPEG, WEBP."
        )

    # Read and validate size
    contents = await file.read()
    if len(contents) > MAX_IMAGE_SIZE:
        raise HTTPException(
            status_code=422,
            detail="Image too large. Maximum size is 10 MB."
        )

    # Multi-strategy OCR text extraction
    extracted_text = ""
    ocr_available = False

    # Strategy 1: Native Windows Media OCR (winocr)
    try:
        import winocr
        from PIL import Image
        import io

        image = Image.open(io.BytesIO(contents))
        ocr_res = await winocr.recognize_pil(image)
        if hasattr(ocr_res, "text") and ocr_res.text:
            extracted_text = ocr_res.text.strip()
        elif isinstance(ocr_res, dict) and ocr_res.get("text"):
            extracted_text = ocr_res["text"].strip()
        ocr_available = True
    except Exception:
        pass

    # Strategy 2: Tesseract OCR (cross-platform fallback)
    if not extracted_text:
        try:
            import pytesseract
            from PIL import Image
            import io

            image = Image.open(io.BytesIO(contents))
            extracted_text = pytesseract.image_to_string(image).strip()
            ocr_available = True
        except ImportError:
            pass
        except Exception:
            # Tesseract binary not installed or failed
            pass

    if not extracted_text and not ocr_available:
        # Neither OCR engine is functional on this system
        extracted_text = f"Image file: {file.filename}"
        result = await analyze_text(extracted_text)
        result["input_type"] = "image"
        result["ocr_note"] = "OCR engine is not available on this server. Please type or copy any text from the screenshot into the Message tab."

        await save_analysis(
            input_type="image",
            content_preview=f"[Image: {file.filename}]",
            risk_level=result["risk_level"],
            risk_score=result["risk_score"],
            signals=result.get("signals", []),
            threat_type=result.get("primary_threat", "Unable to Determine")
        )
        return result

    if not extracted_text:
        result = {
            "risk_level": "UNABLE_TO_DETERMINE",
            "risk_score": 0,
            "primary_threat": "Unable to Determine",
            "threat_types": ["Unable to Determine"],
            "summary": "No text could be extracted from this image.",
            "simple_explanation": "The OCR system could not detect readable characters in this image. This may occur if the image resolution is low, text contrast is faint, or the image contains only non-text graphics. You can manually copy the text from the image into the Message tab.",
            "signals": [],
            "safe_actions": ["If you can read text in the image, copy it and use the Message analysis tab instead."],
            "uncertainty": "Analysis could not be completed because no readable text was extracted from the image.",
            "input_type": "image",
            "demo_mode": False
        }
        return result

    # Analyze the extracted text
    result = await analyze_text(extracted_text)
    result["input_type"] = "image"
    result["extracted_text"] = extracted_text

    await save_analysis(
        input_type="image",
        content_preview=f"[Image] {extracted_text[:250]}",
        risk_level=result["risk_level"],
        risk_score=result["risk_score"],
        signals=result.get("signals", []),
        threat_type=result.get("primary_threat", "Unable to Determine")
    )

    return result


@router.post("/analyze/url")
async def analyze_url_endpoint(request: URLAnalysisRequest):
    url = request.url.strip()

    # Basic URL validation
    if not url.startswith(("http://", "https://")):
        if "." in url:
            url = "https://" + url
        else:
            raise HTTPException(
                status_code=422,
                detail="Invalid URL. Please include the full URL starting with http:// or https://"
            )

    result = await analyze_url(url)

    await save_analysis(
        input_type="url",
        content_preview=url[:300],
        risk_level=result["risk_level"],
        risk_score=result["risk_score"],
        signals=result.get("signals", []),
        threat_type=result.get("primary_threat", "Unable to Determine")
    )

    return result


@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    result = await analyze_chat(request.message, request.context)
    return ChatResponse(
        response=result["response"],
        is_safety_related=result.get("is_safety_related", True)
    )


@router.get("/history")
async def get_history_endpoint(limit: int = 50):
    records = await get_history(limit=min(limit, 100))
    return {"history": records}


@router.delete("/history")
async def clear_history_endpoint():
    count = await clear_history()
    return {"message": f"Cleared {count} record(s) from history.", "count": count}


@router.get("/stats")
async def get_stats_endpoint():
    stats = await get_stats()
    return stats


@router.get("/demo/scenarios")
async def get_demo_scenarios():
    return {
        "scenarios": [
            {
                "id": k,
                "label": v["label"],
                "content": v["content"]
            }
            for k, v in DEMO_SCENARIOS.items()
        ]
    }
