# 🛡️ Rakshak AI — 3-Minute Hackathon Video Pitch & Demo Script
**Theme:** Digital Fraud & Scam Resilience | SANGYAN Hackathon  
**Tagline:** *Detect. Understand. Stay Safe.*

---

## ⏱️ Video Timeline Overview
* **0:00 - 0:40 (40s):** The Problem & Hook (India's retail investor boom vs fraud surge)
* **0:40 - 1:15 (35s):** The Solution: What is Rakshak AI?
* **1:15 - 2:45 (90s):** Live Prototype Walkthrough (Analyzer, Risk Meter, Explainability, Chatbot)
* **2:45 - 3:20 (35s):** Investor Education & History
* **3:20 - 3:45 (25s):** Conclusion & Impact

---

## Detailed Script & Actions

### Scene 1: The Problem (0:00 – 0:40)
* **Screen:** Landing page (`http://localhost:5173`) showing the hero headline: *"Detect investment scams before they cost you."*
* **Voiceover:**
  > "Over 15 crore retail investors have entered India's capital markets. But with this boom comes an epidemic of sophisticated fraud — fake WhatsApp advisory channels, deepfake stock recommendations, and bogus pre-IPO schemes.
  >
  > Every single day, innocent retail investors lose hard-earned savings because fraud messages look convincingly authentic and exploit urgency. Today, we present **Rakshak AI** — an evidence-first, explainable investor-safety companion designed to empower retail investors."

---

### Scene 2: Introducing Rakshak AI (0:40 – 1:15)
* **Screen:** Click **"Start Analysis"** button or navigate to `/analyze`.
* **Voiceover:**
  > "Rakshak AI doesn't just give a vague warning. It analyzes text messages, screenshots, and URLs across multiple dimensions — pinpointing exact manipulation signals like guaranteed return claims, urgency pressure, and fake SEBI registrations.
  >
  > Let's see how it works in real-time."

---

### Scene 3: Live Demo — Analysis & Results (1:15 – 2:45)

#### Action 1: Text Analysis (1:15 – 1:55)
* **Screen:** On the **Message** tab, click the preset **"Guaranteed 30% Return Scam"** button (or paste from `demo/sample_test_inputs.md`).
* Click **"Analyze Message"**.
* Watch the scanning animation progress through the 4 stages.
* **Results Page loads (`/results`)**:
  * Point cursor at the **Risk Meter**: *"Risk Score 91 — HIGH RISK"*.
  * Scroll to **Detected Signals**: Highlight *"Guaranteed Return Claim"*, *"Urgency Pressure"*, *"Authority Impersonation"*.
  * Scroll to **Exact Evidence**: Highlight the quoted evidence snippet.
  * Point out the **"Simple Explanation"**:
    > "Notice how Rakshak AI translates complex technical and regulatory nuances into plain language any first-time investor can understand: 'No legitimate investment can guarantee fixed returns.'"
  * Show the **Safe Next Steps**: Clear guidance on verifying SEBI registration numbers and reporting to Cyber Crime (1930).

#### Action 2: Image / Screenshot Analysis (1:55 – 2:20)
* **Screen:** Click **"Analyze Another"**, switch to the **Screenshot / Image** tab.
* Drag and drop `demo/sample_whatsapp_scam.png`.
* Click **"Analyze Screenshot"**.
* Point out that Rakshak AI extracts text from mobile screenshots and flags hidden red flags directly from chat groups.

#### Action 3: Ask Rakshak AI Safety Chat (2:20 – 2:45)
* **Screen:** On the Results page, scroll to the bottom **"Ask Rakshak"** section.
* Type: *"The sender says they are SEBI registered, how can I check?"*
* Send message.
* Point out the instant, context-aware, reassuring safety guidance.

---

### Scene 4: Education Hub & History (2:45 – 3:20)
* **Screen:** Navigate to the **Education** tab (`/education`).
* Expand one of the scam types (e.g., *WhatsApp Stock Advisory Scams* or *Fake IPO Scams*).
* Show the interactive **5-Second Investor Safety Checklist** — check 2 boxes to show real-time score calculation.
* **Voiceover:**
  > "Beyond reactive defense, Rakshak AI builds long-term investor resilience. Our Education Hub covers 8 pervasive modern scams and includes an interactive 5-second sanity checklist before transferring any funds."

---

### Scene 5: Impact & Conclusion (3:20 – 3:45)
* **Screen:** Return to `/about` or `/` landing page.
* **Voiceover:**
  > "Built entirely with explainability, privacy, and retail investor empathy at its core, Rakshak AI runs both offline and AI-augmented. 
  > 
  > With Rakshak AI, we protect retail investors: Detect. Understand. Stay Safe. Thank you."

---

## 💡 Quick Tips for Recording
1. **Resolution:** Record your screen at 1080p (1920x1080).
2. **Smooth Cursor:** Move your mouse smoothly and pause 1–2 seconds on key visual elements (Risk Score meter, evidence quotes).
3. **Demo Mode:** The badge in the top right navbar shows `Demo Mode` when running locally without an OpenAI key, ensuring 100% reliable execution with zero API rate limits during recording.
