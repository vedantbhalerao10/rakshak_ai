# 📊 Rakshak AI — Pitch Presentation Deck Content
**HackNowa Global Hackathon 2026 — Track: Digital Safety & Cybersecurity**

Use this structured 8-slide content deck for your presentation slides, video deck, or PDF pitch submission.

---

## Slide 1: Title & Positioning
* **Headline**: **Rakshak AI**
* **Sub-headline**: AI-Powered Digital Scam & Phishing Shield
* **Tagline**: *Detect. Understand. Stay Safe.*
* **Event**: HackNowa Global Hackathon 2026
* **Category / Track**: Digital Safety & Cybersecurity
* **Team**: Rakshak Defense Team
* **Repository**: [github.com/vedantbhalerao10/rakshak_ai](https://github.com/vedantbhalerao10/rakshak_ai)

---

## Slide 2: The Problem — The Digital Deception Crisis
* **The Reality**:
  - Millions of smartphone users encounter deceptive digital solicitations daily across WhatsApp, Telegram, SMS, and email.
  - Cybercriminals no longer just exploit software vulnerabilities—they exploit human psychology through **urgency**, **fear of legal penalties**, and **fabricated financial FOMO**.
* **Why Existing Defenses Fall Short**:
  - **Traditional Antivirus**: Designed for malware files and network intrusions, blind to social engineering and fake KYC messages.
  - **Black-Box AI Tools**: Output opaque numbers (e.g., *"91% Risk Score"*) with zero explanation, inducing panic without offering actionable protection.
  - **No Actionable Guidance**: Users are left wondering: *Is this real? What should I do next? Who do I contact?*

---

## Slide 3: The Solution — Rakshak AI
* **An Evidence-First Digital Safety Shield**:
  - Rakshak AI transforms suspicious text, screenshots, and links into clear, explainable **Digital Safety Reports**.
* **Three Core Pillars**:
  1. **Detect**: Multi-modal ingestion of raw messages, OCR screenshots, and URLs with sub-second analysis.
  2. **Understand**: Highlights the exact manipulative phrases used by attackers (evidence-first breakdown).
  3. **Stay Safe**: Delivers clear, ordered, emergency-safe actions (e.g., official reporting numbers, verification portals, freezing credentials).

---

## Slide 4: Key Capabilities & Threat Coverage
* **What Rakshak AI Identifies**:
  - **Phishing & Credential Theft**: Fake KYC renewal, OTP requests, login spoofing.
  - **Impersonation**: Impersonating law enforcement, government agencies, and bank security desks.
  - **Social Engineering**: False urgency, artificial scarcity, and account suspension threats.
  - **High-Yield Scams**: Guaranteed 300% return claims, unverified VIP groups, upfront fee demands.
  - **Deceptive Links**: Obfuscated URLs, shortened redirection links (`bit.ly`, `tinyurl`), unverified domains.
* **Proactive Protection**:
  - **Digital Safety Hub**: 8 interactive threat breakdowns with the **5-Second Safety Check** protocol.
  - **Audit History**: Local, privacy-conscious SQLite storage for past scan inspections.

---

## Slide 5: Technical Architecture & AI Pipeline
* **Dual-Layer Hybrid Defense Pipeline**:
  - **Layer 1: Deterministic Heuristic Engine (`scorer.py`)**:
    - 12+ compiled regex signal rules with calibrated weights.
    - Zero external latency, 100% deterministic, zero hallucination.
    - Automated primary threat synthesis (`determine_threat_types()`).
  - **Layer 2: Contextual AI Reasoning (`analyzer.py`)**:
    - Contextual LLM evaluation producing structured JSON output.
    - Synthesizes plain-language explanations tailored to everyday citizens.
  - **Resilient Fallback**: 100% operational offline; automatically falls back to heuristic explanations when external APIs are unreachable.
* **Technology Stack**:
  - FastAPI + Python 3.10 | React 18 + TypeScript + Vite | SQLite + SQLAlchemy.

---

## Slide 6: Live Demonstration & Results Walkthrough
* **Test Case: Real-World WhatsApp Scam**:
  - *Input*: Urgent KYC expiration notice, VIP trading claim, guaranteed 300% returns, upfront UPI fee, police legal threats, shortened link.
* **The Safety Report Output**:
  - **Heuristic Safety Score**: `100/100` — `HIGH RISK` (Critical Threat Detected).
  - **Primary Threat**: `Financial Scam + Social Engineering`.
  - **Extracted Evidence Highlights**:
    - *"guaranteed 300% monthly return"* $\rightarrow$ Unrealistic guarantee indicator.
    - *"transfer Rs 25,000 activation deposit"* $\rightarrow$ Advance-fee fraud pattern.
    - *"permanent account suspension and police legal notice"* $\rightarrow$ Coercive pressure marker.
  - **Actionable Steps**: Clear 3-step immediate safety recommendations.

---

## Slide 7: Impact & Target Audience
* **Democratizing Cybersecurity**:
  - **Everyday Digital Citizens**: Rapid verification of suspicious daily SMS and WhatsApp forwards.
  - **Seniors & Vulnerable Users**: Shielding non-technical users from aggressive digital arrest tactics.
  - **First-Time Digital Consumers**: Safe onboarding to digital transactions and netbanking.
* **Educational Value**:
  - Moves users from blind vulnerability to active digital vigilance by teaching them to recognize the anatomy of deception.

---

## Slide 8: Future Roadmap & Hackathon Conclusion
* **Next Horizons**:
  - **Browser Extension**: Real-time inline phishing warnings when browsing web pages and webmail.
  - **Multi-Lingual Localization**: Hindi, Marathi, Tamil, Bengali, and Spanish detection models.
  - **Direct One-Click Cybercrime Reporting**: Automated draft generation for National Cyber Crime Reporting portals.
* **Summary**:
  - Fully working prototype, zero external dependencies required for core execution, clean architecture, and direct alignment with **HackNowa 2026 Digital Safety & Cybersecurity**.
  - **Detect. Understand. Stay Safe.**
