"""
Rakshak AI — End-to-End API Integration Verification Test
Tests all endpoints against HackNowa Global Hackathon 2026 requirements
"""
import sys
import asyncio
from fastapi.testclient import TestClient

from main import app
from app.database.db import init_db

def run_tests():
    print("Initializing test database...")
    asyncio.run(init_db())

    client = TestClient(app)

    # 1. Health check
    print("\n1. Testing GET /api/health...")
    res = client.get("/api/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    health_data = res.json()
    print(f"   Status: {health_data['status']}, Demo Mode: {health_data['demo_mode']}, Version: {health_data['version']}")
    assert health_data["status"] == "ok"

    # 2. Demo scenarios
    print("\n2. Testing GET /api/demo/scenarios...")
    res = client.get("/api/demo/scenarios")
    assert res.status_code == 200
    scenarios = res.json().get("scenarios", [])
    print(f"   Retrieved {len(scenarios)} scenarios.")
    assert len(scenarios) >= 3

    # 3. Main HackNowa Demo
    print("\n3. Testing POST /api/analyze/text with Main HackNowa Scam...")
    main_text = (
        "URGENT: Your investment account has been selected for an exclusive government-approved wealth program! "
        "Invest ₹10,000 today and receive ₹50,000 within 30 days with zero risk. Our SEBI-registered experts guarantee "
        "100% returns. Only 10 spots remain! Complete your KYC immediately using this link: "
        "https://example.com/verify-investment. Failure to register today will result in losing this lifetime opportunity."
    )
    res = client.post("/api/analyze/text", json={"content": main_text})
    assert res.status_code == 200, f"Analysis failed: {res.text}"
    main_result = res.json()
    print(f"   Risk Level: {main_result['risk_level']}")
    print(f"   Risk Score: {main_result['risk_score']} / 100")
    print(f"   Primary Threat: {main_result['primary_threat']}")
    print(f"   Threat Types: {main_result.get('threat_types')}")
    print(f"   Warning Signals ({len(main_result['signals'])}): {[s['label'] for s in main_result['signals']]}")
    print(f"   Safe Actions ({len(main_result['safe_actions'])}): {main_result['safe_actions'][:2]}")
    assert main_result["risk_level"] == "HIGH"
    assert main_result["risk_score"] >= 70
    assert "Financial Scam" in main_result.get("threat_types", [])
    assert len(main_result["signals"]) >= 4

    # 4. Secondary Phishing Demo
    print("\n4. Testing POST /api/analyze/text with Secondary Phishing Scenario...")
    phishing_text = (
        "URGENT: Your account will be suspended today. Verify your identity immediately using the link below "
        "to avoid losing access. Failure to complete verification will permanently lock your account."
    )
    res = client.post("/api/analyze/text", json={"content": phishing_text})
    assert res.status_code == 200
    phishing_result = res.json()
    print(f"   Risk Level: {phishing_result['risk_level']}")
    print(f"   Risk Score: {phishing_result['risk_score']} / 100")
    print(f"   Primary Threat: {phishing_result['primary_threat']}")
    assert phishing_result["risk_level"] == "HIGH"
    assert "Phishing" in phishing_result.get("threat_types", [])

    # 5. Benign Content Demo
    print("\n5. Testing POST /api/analyze/text with Benign Educational Query...")
    benign_text = "What is phishing and how can users protect themselves from suspicious links?"
    res = client.post("/api/analyze/text", json={"content": benign_text})
    assert res.status_code == 200
    benign_result = res.json()
    print(f"   Risk Level: {benign_result['risk_level']}")
    print(f"   Risk Score: {benign_result['risk_score']} / 100")
    print(f"   Primary Threat: {benign_result['primary_threat']}")
    assert benign_result["risk_level"] == "LOW"
    assert benign_result["risk_score"] < 25

    # 6. URL Analysis
    print("\n6. Testing POST /api/analyze/url with Suspicious URL pattern...")
    res = client.post("/api/analyze/url", json={"url": "https://example.com/verify-account"})
    assert res.status_code == 200
    url_result = res.json()
    print(f"   URL Risk Level: {url_result['risk_level']}")
    print(f"   URL Risk Score: {url_result['risk_score']}")
    print(f"   Primary Threat: {url_result['primary_threat']}")
    print(f"   Hostname: {url_result.get('url_details', {}).get('hostname')}")
    assert "url_details" in url_result

    # 7. Image Upload & OCR Analysis
    print("\n7. Testing POST /api/analyze/image with screenshot...")
    import os
    img_path = os.path.join(os.path.dirname(__file__), "..", "demo", "sample_whatsapp_scam.png")
    if os.path.exists(img_path):
        with open(img_path, "rb") as f:
            res = client.post("/api/analyze/image", files={"file": ("sample_whatsapp_scam.png", f, "image/png")})
        assert res.status_code == 200
        img_result = res.json()
        print(f"   Image Risk Level: {img_result['risk_level']}")
        print(f"   Image Risk Score: {img_result['risk_score']}")
        print(f"   Extracted Text Preview: {(img_result.get('extracted_text') or '')[:80]}...")
        assert img_result.get("extracted_text") is not None
        assert len(img_result.get("extracted_text")) > 50

    # 8. History retrieval
    print("\n8. Testing GET /api/history...")
    res = client.get("/api/history")
    assert res.status_code == 200
    history = res.json().get("history", [])
    print(f"   Retrieved {len(history)} history records.")
    assert len(history) >= 4
    first = history[0]
    print(f"   Latest record: ID={first['id']}, Type={first['input_type']}, Threat={first.get('threat_type')}, Score={first['risk_score']}")
    assert "threat_type" in first

    # 8. Stats
    print("\n8. Testing GET /api/stats...")
    res = client.get("/api/stats")
    assert res.status_code == 200
    stats = res.json()
    print(f"   Stats: Total={stats['total']}, High={stats['high_risk']}, Medium={stats['medium_risk']}, Low={stats['low_risk']}")
    assert stats["total"] >= 4

    # 9. Clear History
    print("\n9. Testing DELETE /api/history...")
    res = client.delete("/api/history")
    assert res.status_code == 200
    clear_data = res.json()
    print(f"   Cleared: {clear_data['message']}")

    # 10. Verify history empty
    res = client.get("/api/history")
    assert len(res.json().get("history", [])) == 0
    print("   Verified history is cleared.")

    print("\n==============================================")
    print(" ALL END-TO-END VERIFICATION CHECKS PASSED! ")
    print("==============================================")

if __name__ == "__main__":
    run_tests()
