from app.risk_engine.scorer import compute_risk_score, score_to_risk_level

text = "Guaranteed 30% monthly return. Send Rs 25000 today. Only 5 slots remain. SEBI verified."
score, sigs = compute_risk_score(text)
print(f"Score: {score}")
print(f"Level: {score_to_risk_level(score)}")
print(f"Signals: {[s['type'] for s in sigs]}")
print("---")

# Test 2: phishing
text2 = "Your trading account will be suspended today. Verify your account immediately."
score2, sigs2 = compute_risk_score(text2)
print(f"Phishing Score: {score2}, Level: {score_to_risk_level(score2)}, Signals: {[s['type'] for s in sigs2]}")

# Test 3: educational
text3 = "What is diversification and why is it important for investors?"
score3, sigs3 = compute_risk_score(text3)
print(f"Educational Score: {score3}, Level: {score_to_risk_level(score3)}, Signals: {[s['type'] for s in sigs3]}")
