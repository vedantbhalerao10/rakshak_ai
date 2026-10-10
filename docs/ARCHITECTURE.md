# Rakshak AI — System Architecture

**HackNowa Global Hackathon 2026** · **Problem Statement: DIGITAL SAFETY & CYBERSECURITY**

This document provides a technical blueprint of **Rakshak AI (AI-Powered Digital Scam & Phishing Shield)**, detailing its architectural layers, threat evaluation methodologies, data flows, and safety boundaries.

---

## 1. High-Level System Architecture

Rakshak AI employs an asynchronous, decoupled client-server architecture designed for explainability, high reliability, and privacy.

```mermaid
graph TB
    subgraph Client ["Client Layer (Frontend)"]
        UI[React 19 + TypeScript + Vite]
        Router[React Router DOM]
        State[Component State & Axios Client]
        Components[RiskCard, SignalCard, EvidenceHighlighter]
    end

    subgraph Server ["Server Layer (FastAPI :8001)"]
        FastAPI[FastAPI Asynchronous Gateway]
        CORS[CORS Middleware]
        Lifespan[Async Lifespan & Migration Handler]
        PydanticModels[Pydantic Validation Schemas]
    end

    subgraph Ingestion ["Multi-Modal Preprocessing"]
        TextProc[Text Normalizer & Lexical Parser]
        OCR[Tesseract OCR Pipeline (Pillow)]
        URLProc[URL Parser & Host Structure Extractor]
    end

    subgraph Engine ["Hybrid Threat Intelligence Engine"]
        Scorer[Deterministic Risk Engine (scorer.py)]
        ThreatTaxonomy[Threat Categorizer & Heuristics]
        AIOrchestrator[AI Reasoning Engine (analyzer.py)]
    end

    subgraph Storage ["Auditable Local Persistence"]
        DB[(Local SQLite via aiosqlite)]
    end

    UI --> Router
    Router --> State
    State -- "REST (JSON / Multipart)" --> CORS
    CORS --> FastAPI
    FastAPI --> Lifespan
    FastAPI --> PydanticModels

    FastAPI --> TextProc
    FastAPI --> OCR
    FastAPI --> URLProc

    TextProc --> Scorer
    OCR --> Scorer
    URLProc --> Scorer

    Scorer --> ThreatTaxonomy
    Scorer --> AIOrchestrator
    ThreatTaxonomy --> FastAPI
    AIOrchestrator --> FastAPI
    FastAPI --> DB
```

---

## 2. Ingestion Pipelines

### 2.1 Message Analysis Pipeline
* **Input**: Plain-text strings (up to 5,000 characters).
* **Sanitization**: Normalized string stripping and character boundary checks.
* **Evaluation**: Sent concurrently through the deterministic regex rule engine and contextual AI analyzer.

### 2.2 Screenshot Analysis Pipeline (OCR)
* **Input**: Image file (`image/png`, `image/jpeg`, `image/webp` up to 10 MB).
* **Processing**: In-memory byte parsing via Pillow (`PIL.Image`).
* **Text Extraction**: Tesseract OCR (`pytesseract.image_to_string`).
* **Fallback Behavior**: If OCR is unavailable or produces empty text, returns an informative note explaining that image text could not be extracted and guides the user to copy text into the Message tab.

### 2.3 URL Analysis Pipeline
* **Input**: URL string (up to 2,000 characters).
* **URL Parsing**: `urllib.parse.urlparse` extracts scheme, hostname, path, and query parameters.
* **Structural Checks**:
  * Unencrypted protocol flag (HTTP vs HTTPS).
  * Suspicious or free top-level domain extensions (`.xyz`, `.tk`, `.ml`, `.ga`, `.cf`, `.pw`, `.top`, `.click`, `.download`, `.link`, `.gq`, `.work`).
  * Deceptive keyword matching in hostname (`verify`, `login`, `secure`, `kyc`, `sebi`, `rbi`, `account`).
  * Raw numeric IP addresses used in place of domain names.
  * Excessive hostname character length.
* **Safety Boundary**: Evaluates syntactic and structural characteristics only. Never executes client-side JavaScript or renders arbitrary web assets.

---

## 3. Threat Engine & Scorer Architecture

### 3.1 Deterministic Safety Rules
The deterministic engine defines weighted pattern rules:

| Rule Key | Base Score | Severity | Focus |
| :--- | :---: | :---: | :--- |
| `GUARANTEED_RETURN` | 25 | HIGH | Implausible promises, zero-risk claims, 100% returns |
| `CREDENTIAL_REQUEST` | 25 | HIGH | OTP requests, passwords, PINs, urgent KYC verification |
| `AUTHORITY_IMPERSONATION` | 20 | HIGH | Unverified claims of SEBI, RBI, government endorsement |
| `PAYMENT_REQUEST` | 20 | HIGH | Upfront fees, activation charges, deposit requests |
| `SUSPICIOUS_URL` | 20 | HIGH | Unrecognized domains, phishing links, deceptive URLs |
| `URGENCY` | 15 | HIGH | Coercive time pressure, today-only deadlines |
| `THREAT_LANGUAGE` | 15 | HIGH | Account suspension threats, permanent lockout warnings |
| `UNVERIFIED_REGULATORY_CLAIM` | 20 | HIGH | Regulatory claims without verifiable registration ID |
| `SCARCITY_MANIPULATION` | 10 | MEDIUM | Limited spots remaining, exclusive program claims |
| `INVESTMENT_SOLICITATION` | 10 | MEDIUM | Unsolicited VIP trading groups, jackpot stock tips |

### 3.2 Threat Categorization Mapping
The `determine_threat_types` function categorizes detected signals into the HackNowa taxonomy:
* `CREDENTIAL_REQUEST` + `SUSPICIOUS_URL` / `URGENCY` → **Phishing**, **Credential Theft Risk**
* `GUARANTEED_RETURN` / `PAYMENT_REQUEST` → **Financial Scam**, **Fraudulent Offer**
* `URGENCY` / `SCARCITY_MANIPULATION` / `THREAT_LANGUAGE` → **Social Engineering**
* `AUTHORITY_IMPERSONATION` / `UNVERIFIED_REGULATORY_CLAIM` → **Fake Authority Claim**, **Impersonation**
* `SUSPICIOUS_URL` → **Suspicious Link**

A primary threat label is generated by combining the top 1-2 most significant categories (e.g., *Financial Scam + Social Engineering*, *Phishing / Suspicious Link*).

---

## 4. Database Schema & Migration Strategy

The local persistence layer utilizes SQLite with SQLAlchemy async ORM.

### AnalysisRecord Model
* `id` (Integer, Primary Key, Autoincrement)
* `timestamp` (DateTime, UTC)
* `input_type` (String, 'text' | 'image' | 'url')
* `content_preview` (String(300))
* `threat_type` (String(100), default 'Unable to Determine')
* `risk_level` (String(30), 'HIGH' | 'MEDIUM' | 'LOW' | 'UNABLE_TO_DETERMINE')
* `risk_score` (Integer, 0–100)
* `signals_count` (Integer)
* `signals_summary` (Text)

### Safe Schema Migration
During database initialization (`init_db`), a non-destructive migration inspects existing table columns and issues `ALTER TABLE analyses ADD COLUMN threat_type VARCHAR(100) DEFAULT 'Unable to Determine'` if missing, preserving historical records across version upgrades.

---

## 5. Security & Isolation Boundaries

1. **No External Secrets Exfiltration**: API keys are isolated server-side via environment variables and never leaked into client bundles.
2. **Local Data Sovereignty**: History is stored locally in `rakshak.db` and can be purged by the user with a single click.
3. **Guardrails Against Financial Advice**: The system prompt strictly prohibits investment recommendations, buy/sell calls, and price predictions.
