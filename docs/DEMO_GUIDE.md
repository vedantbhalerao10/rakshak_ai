# 🎯 Rakshak AI — HackNowa 2026 Judge Demo Guide
**Track: Digital Safety & Cybersecurity**  
**Tagline**: *Detect. Understand. Stay Safe.*

This guide provides a rapid, foolproof walkthrough for hackathon judges and evaluators to experience the full capabilities of Rakshak AI within 3 to 5 minutes.

---

## ⚡ Quick Start (Under 60 Seconds)

### Step 1: Start Backend (Terminal 1)
```powershell
cd backend
python -m uvicorn main:app --reload --port 8001
```
*Health Check*: Verify at [http://localhost:8001/api/health](http://localhost:8001/api/health) — responds `{"status": "ok", "app": "Rakshak AI", "mode": "HackNowa 2026 Digital Safety Shield"}`.

### Step 2: Start Frontend (Terminal 2)
```powershell
cd frontend
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

*(Alternatively, run `.\start.bat` or `.\start.ps1` from the root directory to launch both automatically.)*

---

## 🎬 5-Step Evaluation Walkthrough

### Scenario 1: Main HackNowa Threat Demo (Investment Scam & KYC Phishing)
1. Navigate to **Analyze** (`/analyze`) via the top navbar.
2. In the **MESSAGE** tab, click the quick preset button:  
   **"Main HackNowa Demo: Investment Scam & KYC Phishing"** (or paste below):
   ```text
   URGENT: Your investment account has been selected for an exclusive government-approved wealth program! Invest ₹10,000 today and receive ₹50,000 within 30 days with zero risk. Our SEBI-registered experts guarantee 100% returns. Only 10 spots remain! Complete your KYC immediately using this link: https://example.com/verify-investment. Failure to register today will result in losing this lifetime opportunity.
   ```
3. Click **"Analyze Suspicious Content"**.
4. **Expected Output in Digital Safety Report**:
   - **Risk Score**: `91/100` or `100/100` (HIGH RISK — Critical Threat Detected)
   - **Primary Threat**: `Financial Scam + Social Engineering`
   - **Threat Categories**: `Financial Scam`, `Social Engineering`, `Phishing`, `Credential Theft Risk`, `Fake Authority Claim`, `Suspicious Link`, `Fraudulent Offer`
   - **Warning Signals Detected**:
     - *Guaranteed / Unrealistic Returns* (`receive ₹50,000 within 30 days with zero risk...`)
     - *Urgency & Time Pressure* (`URGENT... today... immediately...`)
     - *Fake Authority / Regulatory Claim* (`government-approved wealth program... SEBI-registered experts`)
     - *Credential / KYC Request* (`Complete your KYC immediately using this link`)
     - *Scarcity & Exclusivity Pressure* (`Only 10 spots remain`)
     - *Suspicious Link / Phishing URL* (`https://example.com/verify-investment`)
     - *Urgency & Threat Tactics* (`Failure to register today will result in losing this lifetime opportunity`)
   - **Safe Next Steps**: Do not click unverified links, do not share credentials/KYC, verify through official regulator portal (`sebi.gov.in`).

---

### Scenario 2: Urgent Phishing & Account Suspension Coercion
1. In the **MESSAGE** tab on `/analyze`, paste (or click **Example 1 — Phishing**):
   ```text
   URGENT: Your account will be suspended today. Verify your identity immediately using the link below to avoid losing access. Failure to complete verification will permanently lock your account.
   ```
2. Click **"Analyze Suspicious Content"**.
3. **Expected Output**:
   - **Risk Score**: `75/100` or `88/100` (HIGH RISK)
   - **Primary Threat**: `Phishing + Social Engineering`
   - **Warning Signals**:
     - *Urgency & Time Pressure* (`URGENT... suspended today... immediately`)
     - *Urgency & Threat Tactics* (`Your account will be suspended today... permanently lock your account`)
     - *Credential / Identity Request* (`Verify your identity immediately using the link below`)
   - **Safe Next Steps**: Do not click unverified links; log into your account directly via official bookmarks; never enter passwords or OTPs on links sent via SMS/messaging.

---

### Scenario 3: Screenshot / Image Threat Extraction (Multi-Modal OCR)
1. Switch to the **SCREENSHOT** tab on `/analyze`.
2. Drag and drop any image containing scam or phishing text.
3. The multi-modal OCR engine extracts text on-device, pre-populates the extraction preview, and proceeds through automated risk scoring.
4. Review extracted text and visual highlights in the Digital Safety Report.

---

### Scenario 4: Benign Legitimate Communication (No False Positives)
1. On `/analyze`, click the preset button **"Benign Example — Educational"** (or paste below):
   ```text
   What is phishing and how can users protect themselves from suspicious links?
   ```
2. Click **"Analyze Suspicious Content"**.
3. **Expected Output**:
   - **Risk Score**: `0 – 5 / 100` (LOW RISK)
   - **Primary Threat**: `Unable to Determine / Educational Content`
   - **Warning Signals**: Zero warning signals detected.
   - **Outcome**: Confirms that Rakshak AI does not label everything as dangerous.

---

### Scenario 5: Digital Safety Hub & Investigation History
1. Click **Digital Safety Hub** (`/safety-hub`) in the top navigation:
   - Explore the **8 Threat Knowledge Cards** (Phishing, Impersonation, Social Engineering, Suspicious Links, Upfront Fees, Credential Theft, Authority Coercion, Urgency Manipulation).
   - Review the **5-Second Safety Check Flowchart** (*Pause $\rightarrow$ Inspect Link $\rightarrow$ Verify Source $\rightarrow$ Never Share OTP $\rightarrow$ Scan with Rakshak*).
2. Click **History** (`/history`):
   - Review audit trail of past analyzed scans.
   - Observe the persistent **Threat Type** column showing threat classification badges.
   - Click **View Report** on any past record to reload the full evidence breakdown.

---

## 🛡️ Key Judge Evaluation Criteria Addressed

| HackNowa Criterion | How Rakshak AI Delivers |
| :--- | :--- |
| **1. Innovation & Originality** | Evidence-first dual-layer pipeline (Regex Shield + Contextual AI). Highlights exact manipulative substrings instead of vague confidence scores. |
| **2. AI / Technical Implementation** | Multi-modal scanning (Text + OCR + URL), deterministic 12-signal heuristic engine, instant offline fallback, SQLite audit trail. |
| **3. Problem Relevance & Impact** | Tackles the exponential surge in WhatsApp/Telegram digital scams, digital arrest coercion, and phishing attacks targeting digital citizens. |
| **4. Functionality** | Zero-latency instant analysis, zero external dependencies required for core flow, full audit logging, fully responsive modern UI. |
| **5. Presentation & Demo** | Ready presets, clear visual hierarchy, intuitive color-coded risk bands, actionable safety steps, zero broken links. |
