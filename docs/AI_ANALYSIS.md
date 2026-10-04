# 🧠 Rakshak AI — AI Analysis & Risk Engine Methodology

This document explains the detection logic, scoring methodology, evidence extraction algorithms, and safety constraints that power **Rakshak AI**.

---

## 1. The Role of AI in Rakshak AI

In investor-safety applications, AI must **never be a black box**. An unexplainable label like *"92% Scam Probability"* leaves users anxious, uncertain, and unequipped to evaluate similar solicitations in the future.

Rakshak AI follows a **hybrid AI design**:
1. **Deterministic Rule Engine (The Shield)**: High-speed, deterministic pattern matching that reliably catches known manipulation techniques, urgency markers, and regulatory violations without hallucination or latency.
2. **Contextual AI / LLM (The Explainer)**: Translates technical fraud signals and regulatory nuances into reassuring, plain-language explanations tailored to the retail investor.
3. **Interactive Safety Chatbot (Ask Rakshak)**: An AI assistant grounded in strict investor-protection principles to answer follow-up questions without offering investment advice.

---

## 2. Risk Engine Taxonomy & Scoring

The risk engine (`backend/app/risk_engine/scorer.py`) scans inputs against an established investor-fraud taxonomy:

| Signal Type | Description | Weight | Example Matches |
| :--- | :--- | :--- | :--- |
| `GUARANTEED_RETURN` | Promising fixed, risk-free, or guaranteed profits | **35 pts** | *"guaranteed 30% return"*, *"100% fixed profit"*, *"daily 5% payout"* |
| `UPFRONT_PAYMENT` | Demanding fees or deposits to activate accounts | **30 pts** | *"send Rs. 25,000"*, *"activation deposit"*, *"registration fee"* |
| `AUTHORITY_IMPERSONATION` | Claiming unverified affiliation with SEBI, RBI, or exchanges | **25 pts** | *"SEBI approved"*, *"RBI verified"*, *"official institutional desk"* |
| `URGENCY_PRESSURE` | Artificial time limits forcing hasty decisions | **20 pts** | *"today only"*, *"act within 1 hour"*, *"immediate transfer"* |
| `SCARCITY_MANIPULATION` | Fabricating limited availability to induce FOMO | **15 pts** | *"only 5 slots left"*, *"exclusive VIP group"*, *"first 10 investors"* |
| `CREDENTIAL_REQUEST` | Solicitations asking for OTPs, PINs, or credentials | **35 pts** | *"share OTP"*, *"confirm netbanking password"*, *"provide PIN"* |
| `THREAT_LANGUAGE` | Coercion threatening legal or financial penalties | **25 pts** | *"account will be suspended"*, *"police action"*, *"arrest warrant"* |

### 2.1 Score Calculation Algorithm
* Total raw score = $\sum \text{Weights of detected signals}$
* Adjustments: Presence of standard regulatory risk disclaimers (e.g., *"Mutual fund investments are subject to market risks"*) reduces the scam probability.
* Clamping: The composite score is normalized between `0` and `100`.
* Severity Categorization:
  * **0 – 30**: `LOW RISK` (Normal market communication, educational text, or legitimate broker notification)
  * **31 – 70**: `MEDIUM RISK` (Unverified tips, suspicious advisory language, or aggressive marketing)
  * **71 – 100**: `HIGH RISK` (Direct scam indicators, upfront payment demands, or authority impersonation)

---

## 3. Evidence Extraction Methodology

Rather than paraphrasing, Rakshak AI extracts **exact textual substrings** that triggered each flagged signal:
1. When a pattern matcher detects a trigger, it records the exact matched span and character offsets.
2. The UI renders these as **Evidence Quotes**:
   > *"guaranteed 30% monthly return"*  
   > *Evidence: The message promises a fixed 30% monthly return. Under Indian securities regulations, no registered entity may promise or guarantee specific market returns.*
3. This creates verifiable transparency: the user sees exactly what the model flagged.

---

## 4. Safety Constraints & Guardrails

To prevent misuse and protect users, Rakshak AI enforces strict guardrails:

### 🚫 Strict Prohibitions (System Prompt & Code Enforced)
* **No Buy/Sell/Hold Advice**: The system never suggests buying, selling, or holding any stock, mutual fund, derivative, or cryptocurrency.
* **No Security Valuation**: It does not evaluate whether a stock is overvalued, undervalued, or fundamentally sound.
* **No Credential Ingestion**: If an input appears to contain passwords, private keys, or full credit card numbers, the system advises the user to redact such information immediately.

### ⚠️ Communication of Uncertainty
* The system explicitly states that it provides **risk indicators, not judicial or legal proof of fraud**.
* Users are always directed to verify registrations independently through official channels:
  * **SEBI Intermediary Portal**: `sebi.gov.in`
  * **RBI Sachet Portal**: `sachet.rbi.org.in`
  * **National Cyber Crime Helpline**: `1930`

---

## 5. Offline Fallback (Demo Mode)

To ensure zero dependencies on third-party API availability during demonstrations or network disruptions:
* If `OPENAI_API_KEY` is not provided or `DEMO_MODE=true`, the system dynamically synthesizes structured explanations and safe actions using deterministic heuristic templates.
* Pre-configured demo scenarios in `demo_scenarios.py` provide instant, reliable demonstrations for judges.
