# Rakshak AI — AI-Powered Digital Safety Shield

> **Detect. Understand. Stay Safe.**  
> Built for **HackNowa Global Hackathon 2026** · **Problem Statement: DIGITAL SAFETY & CYBERSECURITY**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-brightgreen.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115%2B-009688.svg)](https://fastapi.tiangolo.com)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6.svg)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)](https://vitejs.dev)

---

## 1. Problem

Digital communication channels (SMS, messaging apps, email, and social networks) have become primary vectors for predatory digital attacks. Threat actors exploit social engineering, urgency manipulation, authority impersonation, credential harvesting, unverified links, and deceptive financial offers to manipulate individuals into compromising their digital identities and finances.

Traditional security measures (such as generic blocklists or binary virus scanners) often provide opaque verdicts ("safe" or "dangerous") without explaining the deceptive manipulation techniques at play. Consequently, users cannot learn how to identify warning signals independently, leaving them vulnerable to new variations of social-engineering and phishing attacks.

---

## 2. HackNowa Problem Statement

* **Hackathon**: HackNowa Global Hackathon 2026
* **Category**: Digital Safety & Cybersecurity
* **Evaluation Criteria Addressed**:
  1. **Innovation & Originality**: Hybrid evaluation pipeline combining deterministic rule-based heuristic weights with AI-assisted contextual reasoning to produce explainable digital safety reports.
  2. **AI / Technical Implementation**: Structured LLM extraction, deterministic regex safety scoring, Tesseract OCR for screenshot ingestion, and structural URL heuristics.
  3. **Problem Relevance & Impact**: Directly shields users from phishing campaigns, account takeover, identity theft, and fraudulent financial solicitations.
  4. **Functionality**: Working end-to-end multi-modal ingestion (text, screenshots, URLs) with real-time heuristic scoring, evidence pinpointing, local SQLite history, and a Digital Safety Hub.
  5. **Presentation & Demo**: Clean, accessible security dashboard with reliable offline demo scenarios.

---

## 3. Solution

**Rakshak AI** is an AI-powered digital safety platform that analyzes suspicious messages, screenshots, and URLs to identify potential scams, phishing attempts, impersonation, social-engineering tactics, suspicious links, and misleading financial claims. It combines deterministic safety rules with AI-based analysis to identify warning signals, provide evidence, explain the risk in simple language, and recommend safe next steps.

Rather than giving a black-box verdict, Rakshak AI provides an explainable **Digital Safety Report**:
1. **Identifies the primary threat category** (e.g. *Financial Scam + Social Engineering*, *Phishing / Suspicious Link*).
2. **Extracts exact evidence** from the submitted content.
3. **Explains why the content is suspicious** in plain language.
4. **Delivers prioritized safe next steps** so users avoid risky actions.

---

## 4. Key Features

* **Multi-Modal Content Ingestion**:
  * **Message Analysis**: Scan suspicious SMS, emails, chat messages, or investment solicitations (up to 5,000 characters).
  * **Screenshot Analysis**: Upload mobile screenshots or promotional banners (PNG, JPG, JPEG, WEBP up to 10 MB) with automated OCR text extraction.
  * **URL Analysis**: Analyze link structure, domain characteristics, suspicious TLDs, and credential-harvesting patterns without executing untrusted client-side code.
* **Hybrid Analysis Engine**:
  * Deterministic heuristic scoring engine with 10+ defined safety rules.
  * AI-assisted contextual reasoning via OpenAI-compatible endpoints with structured JSON schemas.
* **Threat Categorization**:
  * Automatically assigns threat categories to every analysis (Phishing, Impersonation, Financial Scam, Social Engineering, Credential Theft Risk, Fake Authority Claim, Suspicious Link, Fraudulent Offer).
* **Exact Evidence Pinpointing**:
  * Highlights the specific text spans and clauses triggering risk indicators.
* **Digital Safety Hub**:
  * Educational knowledge base with 8 comprehensive threat cards (What It Is, How It Works, Warning Signs, What To Do) and the **5-Second Safety Check** protocol.
* **Auditable Local History**:
  * Fast local storage in SQLite recording date, input type, threat type, risk level, and score with instant clear capability.

---

## 5. Threat Categories

| Threat Category | Description | Primary Heuristic Indicators |
| :--- | :--- | :--- |
| **Phishing** | Deceptive communications aimed at stealing credentials or account access | Urgent verification links, spoofed portals, fake security warnings |
| **Impersonation** | Posing as authorized personnel, regulators, banks, or executives | SEBI, RBI, government agency, or executive spoofing |
| **Social Engineering** | Psychological manipulation to bypass cautious habits | Manufactured crises, exclusivity claims, artificial scarcity |
| **Credential Theft Risk** | Direct harvesting of passwords, OTPs, PINs, or sensitive KYC records | Prompts for OTP, PIN, password, or urgent KYC confirmation |
| **Financial Scams** | Fraudulent investment schemes or fake wealth programs | Guaranteed high returns, zero-risk claims, upfront payment requests |
| **Fake Authority Claims** | Unverified claims of government, regulatory, or institutional approval | SEBI/RBI/Government verified claims without verifiable registration ID |
| **Suspicious Links** | High-risk domains, typo-squatted URLs, and unverified landing pages | Non-HTTPS on login forms, high-risk TLDs (.xyz, .tk, .top), numeric IPs |
| **Urgency & Threats** | Coercive language forcing immediate compliance under duress | Immediate account lockout threats, legal penalties, lost lifetime opportunity |

---

## 6. How It Works

```
                     USER INPUT
         (Message Text / Screenshot / URL)
                        │
                        ▼
                  PREPROCESSING
           (OCR extraction / URL parsing)
                        │
       ┌────────────────┴────────────────┐
       ▼                                 ▼
DETERMINISTIC SAFETY RULES          AI ANALYSIS
(10+ weighted regex signals)  (Contextual threat reasoning)
       └────────────────┬────────────────┘
                        │
                        ▼
               STRUCTURED EVIDENCE
                        │
                        ▼
             HEURISTIC RISK SCORING
                 (0 – 100 Scale)
                        │
                        ▼
              DIGITAL SAFETY REPORT
    • Risk Level & Score (Heuristic Indicator)
    • Primary Threat Type
    • Warning Signals & Exact Evidence
    • Plain-English Explanation
    • Safe Next Steps & Verification Guidance
```

---

## 7. Technical Architecture

* **Frontend**: React 19 single-page application built with TypeScript and Vite. Responsive dark-mode dashboard styled with custom CSS tokens, Lucide icons, and Recharts.
* **Backend**: FastAPI (Python 3.10+) asynchronous REST API with Pydantic validation and CORS configuration.
* **Rule Engine**: Deterministic Python regex evaluation module (`app.risk_engine.scorer`) calculating weighted heuristic contributions.
* **AI Engine**: Asynchronous OpenAI client integration (`app.ai.analyzer`) enforcing strict JSON schema output and deterministic offline fallback.
* **OCR Service**: PIL (Pillow) and pytesseract pipeline for image text extraction.
* **Database**: SQLAlchemy async engine with `aiosqlite` powering local persistence in `rakshak.db`.

---

## 8. Technology Stack

* **Frontend**: React 19, TypeScript 5.7, Vite 6.0, React Router 7, Axios, Lucide React, Recharts, React Dropzone.
* **Backend**: Python 3.10+, FastAPI 0.115, Uvicorn, Pydantic 2.9, SQLAlchemy 2.0, aiosqlite, OpenAI Python SDK, Pillow, pytesseract.
* **Storage**: SQLite 3 (local file `rakshak.db`).

---

## 9. Project Structure

```
rakshak_ai/
├── backend/
│   ├── app/
│   │   ├── ai/
│   │   │   └── analyzer.py          # AI integration with strict fallback
│   │   ├── api/
│   │   │   └── routes.py            # API endpoint routes
│   │   ├── database/
│   │   │   └── db.py                # Async SQLite database layer & migrations
│   │   ├── models/
│   │   │   └── schemas.py           # Pydantic request/response schemas
│   │   ├── risk_engine/
│   │   │   └── scorer.py            # Rule engine, heuristics, & threat mapping
│   │   └── demo_scenarios.py        # Predefined HackNowa test cases
│   ├── main.py                      # FastAPI entry point
│   ├── requirements.txt             # Python backend dependencies
│   └── test_risk.py                 # Risk engine verification script
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx           # Navigation bar with clean cybersecurity routing
│   │   │   ├── RiskCard.tsx         # Score gauge, risk level, & threat badge
│   │   │   └── SignalCard.tsx       # Expandable signal cards with exact evidence
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx      # HackNowa cybersecurity landing page
│   │   │   ├── AnalyzerPage.tsx     # Message, Screenshot, & URL analyzer
│   │   │   ├── ResultsPage.tsx      # Comprehensive Digital Safety Report
│   │   │   ├── EducationPage.tsx    # Digital Safety Hub with 8 threat cards
│   │   │   ├── HistoryPage.tsx      # Auditable history with threat categories
│   │   │   └── AboutPage.tsx        # Technical architecture, safety guardrails & privacy
│   │   ├── services/
│   │   │   └── api.ts               # Axios API client
│   │   ├── types/
│   │   │   └── index.ts             # TypeScript interface definitions
│   │   ├── utils/
│   │   │   └── helpers.ts           # Evidence highlighter & formatters
│   │   ├── App.tsx                  # Application layout & routing
│   │   └── index.css                # Design system styling & tokens
│   ├── package.json                 # Node dependencies
│   └── vite.config.ts               # Vite configuration
├── docs/
│   ├── ARCHITECTURE.md              # Detailed architecture documentation
│   ├── AI_ANALYSIS.md               # AI prompts, guardrails, & schemas
│   └── DEMO_GUIDE.md                # HackNowa judge testing instructions
├── SUBMISSION_DESCRIPTION.md        # Hackathon submission summary
├── SUBMISSION_CHECKLIST.md          # Verification and deliverable checklist
├── DEMO_SCRIPT.md                   # 3-minute video presentation script
├── start.bat                        # Windows launch script
├── start.ps1                        # PowerShell launch script
└── README.md
```

---

## 10. Setup Instructions

### Prerequisites
* Python 3.10 or higher
* Node.js 18 or higher with npm
* (Optional) Tesseract OCR installed locally for live screenshot text extraction

### 1. Clone & Setup Backend
```bash
cd backend
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
# source venv/bin/activate

pip install -r requirements.txt
```

### 2. Setup Frontend
```bash
cd ../frontend
npm install
```

### 3. Quick Start (Windows)
Run the automated launcher from the project root:
```powershell
.\start.ps1
```
Or double-click `start.bat`.

---

## 11. Environment Variables

Create `.env` in `backend/` and `frontend/` (templates provided in `.env.example`):

### Backend (`backend/.env`)
```env
DEMO_MODE=true
OPENAI_API_KEY=your-openai-api-key-here
OPENAI_API_BASE=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
BACKEND_HOST=0.0.0.0
BACKEND_PORT=8001
CORS_ORIGINS=http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173
DATABASE_URL=sqlite+aiosqlite:///./rakshak.db
```

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:8001
VITE_DEMO_MODE=true
```

---

## 12. Demo Mode

Rakshak AI features a deterministic **Demo Mode** (`DEMO_MODE=true` by default):
* **Zero external API dependencies**: Does not require an active OpenAI API key or network connection to perform complete analyses.
* **Deterministic Risk Engine**: The rule engine directly detects warning signals, extracts evidence, computes the risk score, and assigns threat categories.
* **Predefined Hackathon Scenarios**: High-impact test cases available with one-click loading on the Analyze page.

---

## 13. API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check returning status, version, demo mode state, and AI availability |
| `POST` | `/api/analyze/text` | Analyzes text message or financial offer for threat indicators |
| `POST` | `/api/analyze/image` | Extracts text via OCR and evaluates threat signals |
| `POST` | `/api/analyze/url` | Evaluates link structure, domain patterns, and phishing heuristics |
| `GET` | `/api/history` | Retrieves recent analysis history (Date, Input Type, Threat Type, Score) |
| `DELETE` | `/api/history` | Purges all analysis history from SQLite |
| `GET` | `/api/stats` | Returns aggregate counts of total, high, medium, and low risk analyses |
| `GET` | `/api/demo/scenarios` | Returns predefined HackNowa demonstration scenarios |

---

## 14. Safety & Privacy

The system adheres to strict security guardrails:
* **No Financial Advice**: Never provides buy/sell/hold stock recommendations, securities advice, or price targets.
* **No Credential Harvesting**: Never requests, stores, or logs real passwords, OTPs, or government identity tokens.
* **Privacy by Design**: Content snippets stored in local SQLite are truncated to 300 characters. History can be purged at any time.
* **No False Claims**: Does not claim 100% accuracy, zero false positives, or certainty of criminal intent. Scores are explicitly labeled as **heuristic safety indicators**.

---

## 15. Limitations

* **Heuristic Indicators**: Risk scores are calculated based on recognized pattern weights; they are not legal proof of fraud.
* **OCR Quality Dependency**: Text extraction accuracy depends on screenshot resolution and contrast.
* **Structural URL Analysis**: URL verification inspects syntactic heuristics and known deceptive patterns; it does not execute client-side scripts.
* **Non-Antivirus Scope**: Rakshak AI is focused on scams, phishing, and social engineering; it is not an endpoint antivirus or firewall tool.

---

## 16. Screenshots

| Screen | Description | File |
| :--- | :--- | :--- |
| **Landing Page** | Cybersecurity hero, threat taxonomy & core features | `docs/screenshots/01_landing_page.png` |
| **Analyze Page** | Message, Screenshot & URL analysis interface with demo presets | `docs/screenshots/02_analyzer_input.png` |
| **Digital Safety Report** | Heuristic gauge, primary threat classification & explanation | `docs/screenshots/03_results_risk_meter.png` |
| **Warning Signals & Evidence** | Deterministic signal cards & exact evidence highlight | `docs/screenshots/04_results_signals.png` |
| **Digital Safety Hub** | 8 Threat cards & 5-Second Safety Check protocol | `docs/screenshots/05_education_hub.png` |

---

## 17. Demo Video

* A 3-minute video presentation demonstrating live scam detection, OCR screenshot ingestion, URL verification, and the Digital Safety Hub is included:
  * Video Recording: `Screen Recording 2026-10-04 235708.mp4`
  * Complete Video Presentation Script: [`DEMO_SCRIPT.md`](DEMO_SCRIPT.md)

---

## 18. Future Scope

* **Browser Extension**: Real-time evaluation of visited URLs and highlighted text directly in Chrome/Edge.
* **Email & Messaging Client Plugins**: Integrations for Outlook, Gmail, and WhatsApp Web to flag high-risk social engineering in incoming messages.
* **Expanded Domain Threat Intelligence**: Integration with public threat intelligence feeds for domain age, WHOIS analysis, and certificate validation.
* **Multilingual Safety Heuristics**: Expanded linguistic rules for regional Indian languages (Hindi, Tamil, Telugu, Marathi).

---

## 19. License

MIT License. Developed for HackNowa Global Hackathon 2026.

