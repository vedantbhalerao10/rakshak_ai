"""
Rakshak AI — AI Service
OpenAI-compatible analysis with fallback to rule-based engine
"""
import json
import os
import re
from typing import Optional

from ..risk_engine.scorer import (
    compute_risk_score, score_to_risk_level,
    generate_safe_actions, generate_simple_explanation
)

SYSTEM_PROMPT = """You are an investor-safety analysis system called Rakshak AI.

Your job is to identify potential fraud, phishing, manipulation, impersonation, misleading financial claims, and other investor-safety risks in submitted content.

You must distinguish evidence from inference.

You must NEVER provide investment recommendations.
You must NEVER tell the user to buy, sell, or hold any asset.
You must NEVER predict financial returns or stock prices.
You must NEVER recommend specific financial products, brokers, or platforms.

Do not claim that content is definitely fraudulent unless the supplied evidence conclusively establishes that fact.

Explain warning signs in simple, accessible English that a first-time investor can understand.

Risk levels:
- HIGH: Score 60-100. Multiple significant warning signs present.
- MEDIUM: Score 25-59. Some warning signs present; caution warranted.
- LOW: Score 0-24. Few or no warning signs detected.

Signal types you may detect:
- GUARANTEED_RETURN: Claims of guaranteed or implausibly high returns
- URGENCY: Pressure to act immediately
- PAYMENT_REQUEST: Requests for upfront payment, fees, or transfers
- CREDENTIAL_REQUEST: Requests for passwords, OTPs, PINs, or account verification
- AUTHORITY_IMPERSONATION: Unverified claims of SEBI, RBI, government approval
- SCARCITY_MANIPULATION: Artificial scarcity or exclusivity claims
- SUSPICIOUS_URL: Suspicious links or domain patterns
- THREAT_LANGUAGE: Threats of account suspension, legal action, or financial loss
- INVESTMENT_SOLICITATION: Unsolicited investment offers
- UNVERIFIED_REGULATORY_CLAIM: Regulatory claims without verifiable registration details

Return ONLY valid JSON matching this exact schema (no markdown, no explanation outside JSON):
{
  "risk_level": "HIGH" | "MEDIUM" | "LOW" | "UNABLE_TO_DETERMINE",
  "risk_score": integer 0-100,
  "summary": "Brief, factual summary of what was detected",
  "simple_explanation": "Plain-English explanation a first-time investor can understand",
  "signals": [
    {
      "type": "SIGNAL_TYPE",
      "label": "Human-readable label",
      "severity": "HIGH" | "MEDIUM" | "LOW",
      "evidence": "Exact phrase or text from the submission",
      "explanation": "Why this is a warning sign, in simple English"
    }
  ],
  "safe_actions": ["Action 1", "Action 2"],
  "uncertainty": "What the system cannot determine with certainty"
}"""


async def analyze_with_ai(content: str, input_type: str = "text") -> Optional[dict]:
    """
    Attempt AI analysis. Returns structured dict or None on failure.
    """
    api_key = os.getenv("OPENAI_API_KEY", "")
    api_base = os.getenv("OPENAI_API_BASE", "https://api.openai.com/v1")
    model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")

    if not api_key or api_key == "your-openai-api-key-here":
        return None

    try:
        from openai import AsyncOpenAI
        client = AsyncOpenAI(api_key=api_key, base_url=api_base)

        user_message = f"Analyze this {input_type} for investor-safety warning signs:\n\n{content}"

        response = await client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ],
            temperature=0.1,
            max_tokens=2000,
            timeout=30
        )

        raw_content = response.choices[0].message.content or ""
        result = parse_ai_response(raw_content)
        return result

    except Exception:
        return None


def parse_ai_response(raw: str) -> Optional[dict]:
    """Parse and validate AI JSON response. Returns None if invalid."""
    # Strip markdown code fences if present
    raw = re.sub(r"```(?:json)?", "", raw).strip()

    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        # Try to extract JSON block
        match = re.search(r'\{.*\}', raw, re.DOTALL)
        if match:
            try:
                data = json.loads(match.group())
            except json.JSONDecodeError:
                return None
        else:
            return None

    # Validate required fields
    required = ["risk_level", "risk_score", "summary"]
    for field in required:
        if field not in data:
            return None

    # Validate risk_level
    valid_levels = {"HIGH", "MEDIUM", "LOW", "UNABLE_TO_DETERMINE"}
    if data.get("risk_level") not in valid_levels:
        return None

    # Validate risk_score
    score = data.get("risk_score", 0)
    if not isinstance(score, (int, float)) or score < 0 or score > 100:
        data["risk_score"] = max(0, min(100, int(score) if isinstance(score, (int, float)) else 0))

    # Ensure signals is a list
    if not isinstance(data.get("signals"), list):
        data["signals"] = []

    # Ensure safe_actions is a list
    if not isinstance(data.get("safe_actions"), list):
        data["safe_actions"] = []

    return data


def analyze_with_rules(content: str, input_type: str = "text") -> dict:
    """
    Rule-based fallback analysis. Always returns a valid result.
    """
    score, signals = compute_risk_score(content)
    risk_level = score_to_risk_level(score)
    safe_actions = generate_safe_actions(signals)
    simple_explanation = generate_simple_explanation(risk_level, signals)

    if risk_level == "LOW" and not signals:
        summary = "No significant investor-safety warning signs were detected in this content."
        uncertainty = "Rakshak AI found no clear warning patterns. This does not guarantee the content is safe — always exercise independent judgment."
    else:
        detected_labels = [s["label"] for s in signals]
        summary = f"The content contains {len(signals)} warning sign(s): {', '.join(detected_labels[:3])}{'...' if len(detected_labels) > 3 else ''}."
        uncertainty = "The risk score reflects pattern-based detection. Rakshak AI cannot independently verify the identity of the sender or confirm fraudulent intent."

    return {
        "risk_level": risk_level,
        "risk_score": score,
        "summary": summary,
        "simple_explanation": simple_explanation,
        "signals": signals,
        "safe_actions": safe_actions,
        "uncertainty": uncertainty,
        "input_type": input_type,
        "demo_mode": False
    }


async def analyze_text(content: str) -> dict:
    """Main analysis entry point for text content."""
    demo_mode = os.getenv("DEMO_MODE", "false").lower() == "true"

    if not demo_mode:
        # Try AI first, fallback to rules
        ai_result = await analyze_with_ai(content, "text")
        if ai_result:
            ai_result["input_type"] = "text"
            ai_result["demo_mode"] = False
            # Supplement with safe actions if missing
            if not ai_result.get("safe_actions"):
                ai_result["safe_actions"] = generate_safe_actions(ai_result.get("signals", []))
            if not ai_result.get("simple_explanation"):
                ai_result["simple_explanation"] = generate_simple_explanation(
                    ai_result["risk_level"], ai_result.get("signals", [])
                )
            return ai_result

    # Rule-based analysis
    return analyze_with_rules(content, "text")


async def analyze_url(url: str) -> dict:
    """Main analysis entry point for URL."""
    from ..risk_engine.scorer import analyze_url_patterns

    url_score, url_signals = analyze_url_patterns(url)

    # Also analyze URL as text for additional signals
    text_score, text_signals = compute_risk_score(url)

    # Merge signals (deduplicate by type)
    all_signals = {s["type"]: s for s in url_signals}
    for s in text_signals:
        if s["type"] not in all_signals:
            all_signals[s["type"]] = s

    combined_signals = list(all_signals.values())
    combined_score = min(100, sum(s.get("score_contribution", 0) for s in combined_signals))

    if combined_score == 0:
        combined_score = max(url_score, text_score)

    risk_level = score_to_risk_level(combined_score)
    safe_actions = generate_safe_actions(combined_signals)
    simple_explanation = generate_simple_explanation(risk_level, combined_signals)

    from urllib.parse import urlparse
    try:
        parsed = urlparse(url)
        hostname = parsed.hostname or url
    except Exception:
        hostname = url

    if combined_signals:
        summary = f"This URL contains {len(combined_signals)} potential warning indicator(s). The domain and URL structure have been analyzed for known risk patterns."
    else:
        summary = f"No obvious suspicious patterns were detected in this URL. This does not confirm the website is safe — always verify the organization independently."

    uncertainty = "URL analysis is based on structural and pattern characteristics only. Rakshak AI does not browse websites or execute their code. A clean URL analysis does not guarantee the website content is safe."

    return {
        "risk_level": risk_level,
        "risk_score": combined_score,
        "summary": summary,
        "simple_explanation": simple_explanation,
        "signals": combined_signals,
        "safe_actions": safe_actions,
        "uncertainty": uncertainty,
        "input_type": "url",
        "demo_mode": False,
        "url_details": {
            "hostname": hostname,
            "scheme": parsed.scheme if 'parsed' in dir() else "unknown"
        }
    }


async def analyze_chat(message: str, context: Optional[dict] = None) -> dict:
    """
    Contextual explanation assistant — safety-scoped only.
    """
    # Topics that are off-limits
    investment_advice_patterns = [
        r"\b(buy|sell|hold|invest\s+in|should\s+i\s+(buy|sell|invest))\b.*\b(stock|share|mutual\s+fund|crypto|bitcoin|equity|fund)\b",
        r"\bwhich\s+(stock|fund|mutual\s+fund|crypto|share|company)\b",
        r"\b(will|can|could)\s+(stock|share|bitcoin|crypto|market)\b.*\b(go\s+up|rise|double|increase)\b",
        r"\bprice\s+of\b.*\b(stock|share|crypto|bitcoin)\b",
        r"\brecommend\b.*\b(stock|fund|investment|broker|platform)\b",
        r"\bbest\s+(stock|fund|broker|investment|mutual\s+fund)\b",
        r"\breturn\s+of\b.*\b(fund|stock|scheme)\b",
    ]

    for pattern in investment_advice_patterns:
        if re.search(pattern, message, re.IGNORECASE):
            return {
                "response": "I can help explain investor-safety risks, warning signs, and what safe next steps mean — but I cannot provide investment recommendations, predict investment outcomes, or suggest which financial products to choose. For investment advice, please consult a SEBI-registered investment advisor.",
                "is_safety_related": False
            }

    # Safety-related questions get direct responses
    safety_responses = {
        r"guaranteed?\s+return": "A 'guaranteed return' claim is a significant warning sign. No legitimate regulated investment can guarantee specific returns. Returns on investments depend on market conditions and cannot be predetermined. When you see this claim, independently verify the organization's SEBI registration before proceeding.",
        r"urgency|act\s+now|immediately": "Urgency is a manipulation tactic used to prevent you from taking time to verify the legitimacy of an offer. Legitimate investment opportunities do not expire in hours or days. If you feel pressured to act immediately, treat it as a warning sign and take more time to verify independently.",
        r"phishing|suspicious\s+link|click.*link": "Phishing attempts try to steal your account credentials by directing you to fake websites that look like legitimate platforms. Always access financial accounts by typing the official URL directly in your browser, never through links in messages.",
        r"sebi|rbi|regulatory": "SEBI and RBI registrations can be independently verified on their official websites (sebi.gov.in and rbi.org.in). Always ask for a registration number and verify it yourself — do not take registration claims at face value.",
        r"payment|transfer|send\s+money": "Requests for upfront payments, fees, or transfers to 'activate' or 'register' for an investment are warning signs. Legitimate regulated investment platforms use standard onboarding without advance payment requirements.",
        r"scarcity|limited\s+(slot|seat|spot)": "Artificial scarcity ('Only 3 slots remain') is a pressure tactic designed to make you act before you can verify an offer. Legitimate opportunities do not artificially limit access to pressure investors.",
        r"what\s+should\s+i\s+do|next\s+step": "If you've received a suspicious message: (1) Do not transfer money or click links. (2) Independently verify the organization's identity and regulatory registration. (3) Preserve all evidence. (4) If fraud is suspected, report it to the appropriate authority.",
        r"otp|password|credentials|pin": "Never share your OTP, PIN, password, or any account credentials with anyone — including people claiming to be from your bank, trading platform, or regulatory authority. Legitimate organizations will never ask for these through unsolicited messages.",
        r"report|complaint|lodge": "If you suspect investment fraud: preserve all evidence (messages, screenshots, transaction records). Report to the appropriate consumer protection or law enforcement authority in your jurisdiction. If the fraud involves a SEBI-regulated entity, SEBI's SCORES portal (scores.sebi.gov.in) accepts investor complaints.",
    }

    for pattern, response in safety_responses.items():
        if re.search(pattern, message, re.IGNORECASE):
            return {
                "response": response,
                "is_safety_related": True
            }

    # Generic safety-related fallback
    return {
        "response": "I can help explain investor-safety warning signs, what detected signals mean, and what safe next steps involve. Could you be more specific about which warning sign or aspect of the safety report you'd like explained?",
        "is_safety_related": True
    }
