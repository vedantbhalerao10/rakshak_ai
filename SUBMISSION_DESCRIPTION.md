# 🏆 HackNowa Global Hackathon 2026 — Submission Description

**Project Name**: Rakshak AI  
**Track**: DIGITAL SAFETY & CYBERSECURITY  
**Tagline**: Detect. Understand. Stay Safe.  
**Repository**: [github.com/vedantbhalerao10/rakshak_ai](https://github.com/vedantbhalerao10/rakshak_ai)  

---

## 📌 Problem Description

Digital scams and phishing attacks increasingly use social engineering, urgency, impersonation, fake authority claims, suspicious links and fraudulent offers to manipulate users. Many people cannot easily distinguish legitimate digital communication from deceptive content.

Traditional cybersecurity measures often provide opaque verdicts without explaining the deceptive manipulation techniques at play. Consequently, users cannot learn how to identify warning signals independently, leaving them vulnerable to new variations of social-engineering and phishing attacks.

---

## 💡 Solution Description

Rakshak AI is an AI-powered digital safety platform that analyzes suspicious messages, screenshots and URLs for potential scam, phishing and social-engineering indicators. It combines deterministic safety rules with AI-assisted contextual analysis to identify warning signals, extract evidence, categorize threats and generate an understandable risk report.

The system does not simply label content as a scam. It shows the exact evidence behind the warning, explains why it matters and provides safe next steps.

The platform also provides a Digital Safety Hub covering phishing, impersonation, credential theft, financial scams, fake authority claims, suspicious links and social engineering. Every scan is securely recorded in a local SQLite audit history, giving users transparent visibility over their digital safety posture.

---

## ⚡ Key Features

- **Multi-Modal Threat Ingestion**: Instant scanning of suspicious messages, chat text, forwarded SMS, chat screenshots via multi-modal OCR, and unverified web URLs.
- **Explainable Evidence Highlighting**: Pinpoints exact substrings that triggered alerts (e.g., *"guaranteed 300% return"*, *"account will be suspended"*), demonstrating exactly how the scam operates.
- **Dual-Layer Hybrid Architecture**: Combines a high-speed deterministic heuristic rule engine with contextual LLM threat analysis and an automated offline fallback mechanism.
- **Clear Primary Threat Categorization**: Accurately classifies multi-vector attacks into actionable categories (*Phishing*, *Impersonation*, *Social Engineering*, *Financial Scam*, *Coercion & Threats*).
- **Actionable Safety Protocol**: Provides plain-language, prioritized emergency instructions rather than vague warnings.
- **Digital Safety Hub**: Educational breakdown of modern attack anatomy with a structured "5-Second Safety Check" flowchart.
- **Persistent Audit Trail**: Stores scan history locally in SQLite with full threat metadata, risk scores, timestamps, and one-click report reloading.
- **Privacy-Preserving & Zero-Dependency Execution**: Fully functional offline without external API dependencies; no personal credentials or private keys are ever stored or transmitted.

---

## 🛠️ Technology Stack

| Component | Technologies Used |
| :--- | :--- |
| **Frontend UI/UX** | React 18, TypeScript, Vite, Tailwind CSS / Vanilla CSS Tokens, Lucide Icons |
| **Backend API** | FastAPI (Python 3.10+), Pydantic v2 schemas, Uvicorn ASGI |
| **Detection Engine** | Custom deterministic regex heuristic scorer (`backend/app/risk_engine/scorer.py`) |
| **Multi-Modal AI** | Contextual LLM reasoning via OpenAI API / Structured JSON prompts, OCR image extraction pipeline |
| **Data Persistence** | SQLite via SQLAlchemy ORM with non-destructive schema migrations |
| **Testing & CI** | Automated test suite (`backend/test_risk.py`), TypeScript compilation (`tsc -b`), Vite production build |

---

## 👥 Target Audience & Real-World Impact

1. **Everyday Digital Citizens**: Non-technical smartphone users vulnerable to urgent WhatsApp/Telegram phishing messages and fake KYC suspension threats.
2. **First-Time Investors & Senior Citizens**: Individuals frequently targeted by high-yield "VIP institutional trading" schemes and digital arrest coercion.
3. **Cybersecurity Educators & First Responders**: Consumer safety organizations seeking an explainable, open-source tool to teach citizens how to deconstruct social engineering tactics.

**Impact**: Eliminates the fear and confusion of online scams by transforming abstract cybersecurity signals into actionable, evidence-based digital literacy.

---

## 🌟 Novelty & Innovation

Unlike opaque black-box classifiers, Rakshak AI bridges the gap between **detection** and **comprehension**:
1. **Evidence-First Transparency**: Every risk point is tied directly to highlighted text in the user's input, eliminating black-box distrust.
2. **Deterministic Resiliency**: Operates seamlessly with zero external API dependencies via its offline heuristic rule engine, ensuring 100% availability during network disruptions.
3. **Multi-Vector Classification**: Accurately detects composite threats that combine financial fraud with psychological coercion, reflecting how real-world attackers operate.
