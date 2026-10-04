# 🏛️ Rakshak AI — System Architecture

This document provides a comprehensive technical blueprint of **Rakshak AI**, detailing its architectural layers, data flows, fraud detection methodologies, and safety boundaries.

---

## 1. High-Level System Architecture

Rakshak AI is engineered as an asynchronous, decoupled client-server web application optimized for speed, explainability, and privacy.

```mermaid
graph TB
    subgraph Client ["Client Layer (Frontend)"]
        UI[React 19 + TypeScript + Vite]
        Router[React Router DOM]
        State[Component State & Axios Client]
    end

    subgraph Gateway ["API Gateway / Server Layer"]
        FastAPI[FastAPI Server :8001]
        CORS[CORS Middleware]
        Lifespan[Async Lifespan Handler]
    end

    subgraph Pipeline ["Processing Pipelines"]
        TextProc[Text Normalizer & Cleaner]
        OCR[Tesseract OCR / Fallback Pipeline]
        URLProc[URL Parser & Domain Analyzer]
    end

    subgraph CoreEngine ["Risk Intelligence & Reasoning"]
        Scorer[Rule-Based Scorer (scorer.py)]
        PatternTaxonomy[Fraud Taxonomy Matcher]
        AIOrchestrator[AI & Explainability Engine (analyzer.py)]
    end

    subgraph Storage ["Local Persistence Layer"]
        DB[(SQLite Async via aiosqlite)]
    end

    UI --> Router
    Router --> State
    State -- "REST (JSON / Multipart)" --> CORS
    CORS --> FastAPI
    FastAPI --> Lifespan
    
    FastAPI --> TextProc
    FastAPI --> OCR
    FastAPI --> URLProc

    TextProc --> Scorer
    OCR --> Scorer
    URLProc --> Scorer

    Scorer --> PatternTaxonomy
    PatternTaxonomy --> AIOrchestrator
    AIOrchestrator --> FastAPI
    FastAPI --> DB
```

---

## 2. Component Details

### 2.1 Frontend Architecture (`frontend/src`)
* **Framework**: React 19 with TypeScript, bundled using Vite 6.
* **Styling**: Tailwind CSS coupled with custom design tokens defined in `src/index.css` (custom HSL color palette, deep navy theme, glassmorphism card surfaces, and accessible focus states).
* **Navigation**: Client-side single-page routing via `react-router-dom`:
  * `/` — Landing page with live ticker and CTA highlights.
  * `/analyze` — Multi-tab submission panel (Text, Screenshot upload with `react-dropzone`, URL input).
  * `/results` — Risk assessment meter, detected signal breakdown, evidence quotes, simple explanations, safe actions, and interactive "Ask Rakshak" chat drawer.
  * `/education` — 8 scam archetype deep-dives and an interactive 5-second investor safety checklist.
  * `/history` — Local persistent scan audit log with risk distributions.
  * `/about` — Architecture, hackathon context, and safety boundaries.

### 2.2 Backend Architecture (`backend/app`)
* **Framework**: FastAPI with Python 3.10+.
* **Concurrency**: Native Python `asyncio` for non-blocking I/O during database operations and API calls.
* **Data Validation**: Strict Pydantic models for request validation (`TextAnalysisRequest`, `URLAnalysisRequest`, `ChatRequest`) and structured responses (`AnalysisResult`, `HealthResponse`, `ChatResponse`).
* **Storage Layer**: SQLite accessed through `SQLAlchemy 2.0` with `aiosqlite` async drivers. Local database files (`rakshak.db`) store only anonymous scan summaries (content snippet, risk level, score, signals).

---

## 3. Data Flow

### 3.1 Text Analysis Pipeline
1. **Request**: User submits raw text or selects a demo scenario.
2. **Sanitization**: Backend strips whitespace, validates length (rejects empty or excessively large inputs).
3. **Scorer Invocation**: `scorer.compute_risk_score(text)` runs 8 regex/linguistic signal detectors.
4. **Signal Aggregation**:
   * Each detected signal adds weighted severity points (High: 25–35 pts, Medium: 15–20 pts, Low: 5–10 pts).
   * Aggregated score is clamped to `0–100`.
   * Score maps to severity level: `0–30: LOW`, `31–70: MEDIUM`, `71–100: HIGH`.
5. **Explainability Pass**:
   * If `DEMO_MODE=true` (or no API key), the system generates plain-language explanations using predefined contextual templates.
   * If OpenAI is enabled, `gpt-4o-mini` refines the simple explanation and highlights nuances.
6. **Persistence**: Saves summary, score, and signals asynchronously to SQLite.
7. **Response**: Returns complete JSON payload to the frontend.

### 3.2 Image / Screenshot Pipeline
1. **Upload**: User uploads `.png`, `.jpg`, `.jpeg`, or `.webp` file (up to 10 MB).
2. **OCR Extraction**: Backend passes image bytes to `pytesseract`.
3. **Graceful Fallback**: If OCR is unavailable in the environment, the system falls back gracefully, providing actionable guidance to copy readable text into the Message tab.
4. **Analysis**: Extracted text feeds directly into the same deterministic risk engine.

### 3.3 URL Pipeline
1. **Validation**: Checks URL structure, scheme (`http/https`), and basic format.
2. **Domain Heuristics**: Analyzes domain characteristics:
   * Brand / Regulatory impersonation keywords (`sebi`, `rbi`, `nse`, `bse`, `zerodha`, `groww`).
   * Suspicious top-level domains (`.xyz`, `.top`, `.tk`, `.in-login`).
   * High-risk path components (`/kyc-update`, `/bonus`, `/claim-reward`).
3. **Scoring**: Calculates risk score and outputs actionable safety alerts.

---

## 4. Security & Privacy Design

* **Zero Sensitive PII Stored**: Full messages, passwords, or personal credentials are never permanently stored.
* **User Data Sovereignty**: The `/api/history` endpoint supports complete deletion via `DELETE /api/history`.
* **CORS Hardening**: Strict origin whitelisting (`http://localhost:5173`).
* **Environment Protection**: All sensitive tokens and keys are loaded via `.env` and strictly excluded from version control via `.gitignore`.
