# 🧠 Rakshak AI — AI Analysis & Risk Engine Methodology
**HackNowa Global Hackathon 2026 — Digital Safety & Cybersecurity Track**

This document details the threat taxonomy, detection heuristics, scoring algorithms, evidence extraction mechanisms, AI system prompts, and strict safety guardrails powering **Rakshak AI**.

---

## 1. Core Philosophy: Explainable, Evidence-First Digital Safety

In cybersecurity and consumer fraud protection, AI must **never be an unexplainable black box**. A generic label like *"95% Fraud Probability"* fails users: it causes panic, offers no actionable recourse, and fails to build lasting digital safety literacy.

Rakshak AI implements a **dual-layer, evidence-first detection architecture**:
1. **Deterministic Rule Engine (Layer 1 — The Rapid Heuristic Shield)**: High-speed, regex-driven pattern matching across 12+ threat classes. Catches known credential harvesting markers, urgent coercion, suspicious links, and unverified authority claims with zero latency and 0% hallucination risk.
2. **Contextual LLM Reasoning (Layer 2 — The Threat Explainer)**: Analyzes unstructured text, multi-modal OCR output, and suspicious domain structures to synthesize plain-language explanations, specific evidence quotes, and ordered safe actions.
3. **Deterministic Fallback Pipeline**: If an API key is absent or external LLM services experience downtime, the deterministic rule engine automatically generates structured reports, primary threat classifications, and recommended safe actions without crashing.

---

## 2. Threat Taxonomy & Signal Rules

The risk engine (`backend/app/risk_engine/scorer.py`) evaluates incoming content across a multi-dimensional digital safety taxonomy:

| Signal Key | Threat Category | Weight | Regex Trigger Highlights |
| :--- | :--- | :--- | :--- |
| `GUARANTEED_RETURN` | Financial Scam | **35 pts** | `guaranteed\s+\d+%`, `risk-free\s+returns`, `100%\s+daily\s+profit` |
| `UPFRONT_PAYMENT` | Financial Scam | **30 pts** | `pay\s+first`, `deposit\s+amount`, `registration\s+fees`, `transfer\s+to\s+upi` |
| `CREDENTIAL_REQUEST` | Phishing / Theft | **35 pts** | `share\s+your\s+otp`, `enter\s+password`, `netbanking\s+pin`, `provide\s+cvv` |
| `SUSPICIOUS_URL` | Phishing / Links | **30 pts** | Shorteners (`bit\.ly`, `tinyurl`), IP addresses, `(using\|the)\s+link\s+below` |
| `AUTHORITY_IMPERSONATION` | Impersonation | **25 pts** | `cyber\s+crime\s+department`, `reserve\s+bank`, `security\s+team`, `verified\s+agent` |
| `KYC_HARVESTING` | Phishing / Data Theft | **30 pts** | `kyc\s+suspended`, `update\s+pan`, `aadhaar\s+verification`, `kyc\s+expired` |
| `URGENCY_PRESSURE` | Social Engineering | **20 pts** | `immediate\s+action`, `within\s+24\s+hours`, `account\s+will\s+be\s+closed` |
| `ACCOUNT_SUSPENSION` | Social Engineering / Threats | **30 pts** | `account\s+suspended`, `blocked\s+immediately`, `restricted\s+access` |
| `THREAT_LANGUAGE` | Coercion / Blackmail | **25 pts** | `legal\s+action`, `police\s+warrant`, `cbi\s+investigation`, `penalty\s+applied` |
| `VIP_EXCLUSIVE` | Social Engineering | **15 pts** | `vip\s+group`, `exclusive\s+channel`, `limited\s+slots`, `insider\s+access` |
| `UNVERIFIED_ADVISORY` | Financial Scam | **20 pts** | `surefire\s+tips`, `insider\s+trading\s+calls`, `jackpot\s+formula` |
| `BENIGN_DISCLAIMER` | Legitimate Indicator | **-15 pts** | `subject\s+to\s+market\s+risks`, `official\s+helpdesk`, `read\s+terms` |

---

## 3. Threat Classification & Scoring Algorithm

### 3.1 Composite Heuristic Safety Score
The heuristic score is computed deterministically:
$$\text{Raw Score} = \sum_{s \in \text{Signals}} \text{Weight}(s) - \text{Disclaimers}$$
$$\text{Safety Indicator} = \min(100, \max(0, \text{Raw Score}))$$

* **LOW RISK (0 – 30)**: Normal administrative alerts, standard educational content, or communications from verified official entities.
* **MEDIUM RISK (31 – 70)**: Unverified solicitations, unsolicited invitations, aggressive promotional marketing, or missing verification credentials.
* **HIGH RISK (71 – 100)**: Credential harvesting, urgent account suspension threats, deceptive links, or unverified demands for upfront transfers.

### 3.2 Dynamic Primary Threat Classification (`determine_threat_types()`)
Rather than assigning a singular arbitrary label, the engine maps detected signals into functional threat categories:
- **`Phishing`**: Triggered by `CREDENTIAL_REQUEST`, `KYC_HARVESTING`, or `SUSPICIOUS_URL`.
- **`Impersonation`**: Triggered by `AUTHORITY_IMPERSONATION`.
- **`Social Engineering`**: Triggered by `URGENCY_PRESSURE`, `ACCOUNT_SUSPENSION`, or `VIP_EXCLUSIVE`.
- **`Financial Scam`**: Triggered by `GUARANTEED_RETURN`, `UPFRONT_PAYMENT`, or `UNVERIFIED_ADVISORY`.
- **`Coercion & Threats`**: Triggered by `THREAT_LANGUAGE`.

**Primary Threat Formatting Rules**:
- Combined threat compounds (e.g. `Phishing + Social Engineering`, `Financial Scam + Social Engineering`) are synthesized when multiple major vectors co-occur.
- If no threat signals trigger, the classification defaults to `Unable to Determine` or `Benign Communication`.

---

## 4. Evidence Extraction & Substring Highlighting

Every flagged warning signal is accompanied by exact textual proof:
1. **Regex Offset Tracking**: Pattern matches store exact character spans (`start`, `end`) and the matched substring.
2. **Contextual Span**: The engine preserves the surrounding clause so users can see the exact manipulative context.
3. **Frontend Visual Highlighting**: In the **Digital Safety Report**, exact phrases are rendered inside high-contrast evidence badges alongside the rationale explaining *why* the phrase represents deceptive behavior.

---

## 5. Contextual LLM Pipeline & System Prompt

When an OpenAI API key is configured, the analysis engine (`backend/app/ai/analyzer.py`) passes the user's content through the following structured prompt:

```text
You are Rakshak AI, an AI-powered Digital Scam & Phishing Shield developed for HackNowa Global Hackathon 2026 (Digital Safety & Cybersecurity track).
Your mission is to protect everyday digital citizens from online scams, phishing attempts, impersonation fraud, social engineering attacks, and credential theft.

Analyze the provided input and return a JSON object strictly adhering to this schema:
{
  "risk_score": <integer 0-100>,
  "risk_level": "LOW" | "MEDIUM" | "HIGH",
  "threat_types": ["Phishing" | "Impersonation" | "Social Engineering" | "Financial Scam" | "Coercion" | ...],
  "primary_threat": "<Formatted primary threat, e.g. 'Phishing + Social Engineering'>",
  "summary": "<1-2 concise sentences summarizing safety posture>",
  "warning_signals": [
    {
      "signal_type": "<TYPE>",
      "description": "<Why this constitutes a digital safety risk>",
      "severity": "LOW" | "MEDIUM" | "HIGH",
      "evidence": "<Exact quote or substring from the input>"
    }
  ],
  "safe_actions": [
    "<Immediate, actionable, numbered safety recommendation>"
  ],
  "simple_explanation": "<A clear 2-3 sentence non-technical breakdown for everyday citizens>"
}
```

### 5.1 Strict System Guardrails
- **No Chatbot Dependency**: Core threat analysis is instantaneous and single-pass. No conversational back-and-forth is required to protect the user.
- **No Financial/Investment Advice**: The system explicitly avoids providing buy/sell/hold stock advice, portfolio recommendations, or asset price targets.
- **No 100% Certainty Claims**: The system presents scores as *"Heuristic Safety Indicators (0-100)"*, never claiming zero false positives or absolute judicial proof.
- **No Privacy Leaks**: Sensitive credentials or private tokens identified during scanning are flagged for redaction and never stored in plain text.

---

## 6. Deterministic Fallback & Zero-Dependency Execution

To guarantee 100% operational uptime during hackathon evaluations and offline testing:
- If the LLM call times out or lacks an API key, `analyze_with_rules(text, url)` executes instantly.
- It calculates the exact score, maps detected regex flags into `threat_types` and `primary_threat`, populates concrete `warning_signals` with real substring evidence, and provides context-specific safe actions (e.g. reporting to National Cyber Crime helpline `1930`).
- This guarantees judges a seamless, zero-error experience under any environment.
