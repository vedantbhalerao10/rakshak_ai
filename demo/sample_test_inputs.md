# Rakshak AI — Quick Demo Test Inputs

Use these pre-tested test inputs when recording your hackathon demo or demonstrating live to judges.

---

## 1. High Risk Text Scam (Guaranteed Return + WhatsApp)
**Copy & Paste into the Message tab:**
```text
Exclusive investment opportunity. Earn a guaranteed 30% monthly return. This opportunity is officially approved by SEBI. Send Rs. 25,000 today to activate your institutional trading account. Only 5 slots remain. Contact admin on Telegram: @quick_profit_admin.
```
*Expected Result:* **Score 90+ (HIGH RISK)**
*Signals Detected:* Guaranteed Return Claim, Urgency Pressure, Authority/Regulatory Impersonation, Scarcity Manipulation, Payment Request.

---

## 2. High Risk Phishing URL
**Paste into the URL tab:**
```text
https://sebi-secure-portal-verification-login.in/update-kyc
```
*Expected Result:* **Score 80+ (HIGH RISK)**
*Signals Detected:* Domain Impersonation (SEBI), Urgent Credential/KYC harvest attempt, Unofficial TLD.

---

## 3. Medium Risk Advisory Group Message
**Copy & Paste into the Message tab:**
```text
Join our VIP trading channel for daily 99% accuracy stock tips. Doubled money in 2 weeks for all members. Limited spots for tomorrow's jackpot call. Click link to join: bit.ly/vip-jackpot-tips
```
*Expected Result:* **Score 65–75 (MEDIUM/HIGH RISK)**
*Signals Detected:* Excessive Accuracy Claim, Urgency, Shortened URL redirection.

---

## 4. Low Risk / Legitimate Message
**Copy & Paste into the Message tab:**
```text
Dear Investor, your mutual fund SIP of Rs. 5,000 in Axis Nifty 50 Index Fund has been successfully processed for the month. NAV: Rs. 42.15. Mutual fund investments are subject to market risks, read all scheme related documents carefully.
```
*Expected Result:* **Score 0–15 (LOW RISK)**
*Signals Detected:* No scam markers, contains standard regulatory disclaimer.

---

## 5. Sample Images for Upload Tab
Located in the `demo/` folder:
1. `demo/sample_whatsapp_scam.png` (Realistic dark-mode WhatsApp group screenshot)
2. `demo/sample_fake_brochure.png` (Fake wealth management brochure with daily payouts)
