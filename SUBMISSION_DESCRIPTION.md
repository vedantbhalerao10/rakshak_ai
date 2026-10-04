# Rakshak AI — Hackathon Submission Description

## Problem
India is witnessing an unprecedented surge in retail participation across its capital markets, bringing millions of first-time investors into financial ecosystems. However, this democratization has coincided with an alarming rise in digital investment fraud. Novice investors frequently encounter misleading promotions across social media, Telegram groups, WhatsApp channels, and SMS. These deceptive schemes exploit psychological vulnerabilities through guaranteed-return promises, fabricated regulatory registrations, fake SEBI endorsements, artificial urgency, and deceptive pre-IPO allocations. Enticed by claims of zero-risk wealth creation, users face phishing portals and direct requests for upfront deposits or credentials. First-time investors lack the specialized regulatory and financial literacy required to discern whether incoming digital solicitations are authentic or fraudulent.

## Target Users
Rakshak AI is designed for retail investors, first-time stock and mutual fund market entrants, digitally active youth, families evaluating online investment opportunities, and digitally less-experienced citizens seeking an accessible, objective second opinion before transferring funds.

## Solution
Rakshak AI is an evidence-first, explainable investor-safety companion that assesses suspicious financial solicitations before users commit capital. The application provides:
- **Multimodal Ingestion**: Multi-tab analysis supporting raw text messages, screenshot image uploads (with optical character recognition), and suspicious website URLs.
- **Hybrid Risk Engine**: Combines a deterministic rule-based scam detection engine with contextual AI/NLP analysis to score threats from 0 to 100 across low, medium, and high risk categories.
- **Evidence Extraction**: Isolates exact suspicious phrases (e.g., guaranteed returns, unverified SEBI claims, artificial scarcity) and provides plain-language explanations.
- **Actionable Safety Steps**: Delivers clear guidance on verifying credentials via official regulatory portals and reporting cyber incidents.
- **Interactive Education & History**: Features an education hub breaking down 8 prevalent fraud archetypes, a five-second safety checklist, an interactive safety assistant, and local scan history.

## Innovation
Unlike conventional threat filters that offer opaque, binary "scam or safe" labels, Rakshak AI introduces evidence-first investor safety. It unpacks the anatomy of the deception: showing precisely *what* triggered the warning, *where* the evidence appears in the message, *why* the tactic is deceptive, and *what* safe actions the user must take next.

## Technology
Rakshak AI is built using:
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide icons.
- **Backend**: FastAPI, Python 3.14, Uvicorn, Pydantic, HTTPX.
- **Storage**: SQLite with SQLAlchemy and aiosqlite.
- **Intelligence**: Rule-based heuristic risk engine, Tesseract OCR integration, and optional OpenAI LLM contextual reasoning with fully autonomous offline demo fallbacks.

## Safety and Privacy
Rakshak AI never provides investment advice, stock tips, or buy/sell/hold recommendations. It does not predict market performance or collect sensitive personal credentials. The system explicitly communicates analytical limitations, and users retain full control to clear their analysis history at any time.

## Impact and Scalability
Rakshak AI's modular architecture is designed to scale across regional Indian languages, integrate real-time SEBI/RBI registry lookups, adapt to emerging fraud vectors such as deepfakes, and support community threat intelligence. By replacing blind trust with contextual understanding, Rakshak AI builds lasting investor resilience.
