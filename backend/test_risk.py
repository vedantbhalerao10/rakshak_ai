from app.risk_engine.scorer import compute_risk_score, score_to_risk_level, determine_threat_types

# Scenario 1: Main HackNowa Demo
text1 = (
    "URGENT: Your investment account has been selected for an exclusive government-approved "
    "wealth program! Invest ₹10,000 today and receive ₹50,000 within 30 days with zero risk. "
    "Our SEBI-registered experts guarantee 100% returns. Only 10 spots remain! "
    "Complete your KYC immediately using this link: https://example.com/verify-investment. "
    "Failure to register today will result in losing this lifetime opportunity."
)
score1, sigs1 = compute_risk_score(text1)
types1, primary1 = determine_threat_types(sigs1, text1)
print(f"--- Main HackNowa Demo ---")
print(f"Score: {score1}/100, Level: {score_to_risk_level(score1)}")
print(f"Primary Threat: {primary1}")
print(f"Threat Types: {types1}")
print(f"Detected Signals ({len(sigs1)}): {[s['label'] for s in sigs1]}")

# Scenario 2: Phishing & Account Suspension
text2 = "URGENT: Your account will be suspended today. Verify your identity immediately using the link below to avoid losing access. Failure to complete verification will permanently lock your account."
score2, sigs2 = compute_risk_score(text2)
types2, primary2 = determine_threat_types(sigs2, text2)
print(f"\n--- Phishing Demo ---")
print(f"Score: {score2}/100, Level: {score_to_risk_level(score2)}")
print(f"Primary Threat: {primary2}")
print(f"Threat Types: {types2}")
print(f"Detected Signals ({len(sigs2)}): {[s['label'] for s in sigs2]}")

# Scenario 3: Benign Educational Content
text3 = "What is phishing and how can users protect themselves from suspicious links?"
score3, sigs3 = compute_risk_score(text3)
types3, primary3 = determine_threat_types(sigs3, text3)
print(f"\n--- Benign Content Demo ---")
print(f"Score: {score3}/100, Level: {score_to_risk_level(score3)}")
print(f"Primary Threat: {primary3}")
print(f"Threat Types: {types3}")
print(f"Detected Signals: {[s['label'] for s in sigs3]}")
