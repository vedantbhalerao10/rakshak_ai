# 🛡️ Rakshak AI — Presentation Slides Content

**HackNowa Global Hackathon 2026 — Track: Digital Safety & Cybersecurity**  
**Design Palette:** Deep Navy (`#020B18`), Electric Blue (`#3B82F6`), Cyan Accent (`#14B8A6`), Slate White (`#F8FAFC`)  
**Typography:** Space Grotesk (Headers), Inter (Body)

---

## Slide 1: Title & Positioning

### Visual Layout:
* Minimalist dark cybersecurity backdrop with glowing cyber shield insignia.
* Clean centered alignment with hackathon track badge.

```text
                                  🛡️
                              RAKSHAK AI
                     Detect. Understand. Stay Safe.

             AI-Powered Digital Safety Shield
```

* **Headline:** Rakshak AI
* **Sub-headline:** AI-Powered Digital Safety Shield
* **Tagline:** *Detect. Understand. Stay Safe.*
* **Event:** HackNowa Global Hackathon 2026
* **Category / Track:** Digital Safety & Cybersecurity

---

## Slide 2: The Problem

### Title: **The Problem**
#### Subtitle: *The Rise of Sophisticated Digital Deception*

### Core Vectors:
* **Digital Scams:** Unrealistic high-yield promises, fake wealth schemes, upfront fee solicitations.
* **Phishing:** Spoofed banking alerts, urgent account suspension notices, deceptive credential theft forms.
* **Impersonation:** Bad actors masquerading as regulators (SEBI, RBI), government agencies, or tech support.
* **Social Engineering:** Psychological manipulation weaponizing manufactured urgency, fear, and artificial scarcity.
* **Suspicious Links:** Look-alike domains, suspicious TLDs (`.xyz`, `.top`), and credential-harvesting landing pages.

### The Critical Gap:
* Traditional antiviruses only catch known file signatures and network exploits, leaving users blind to social engineering.
* Black-box AI tools output opaque numbers with zero explanation, inducing panic without offering actionable protection.

---

## Slide 3: Our Solution

### Title: **Our Solution**
#### Subtitle: *Evidence-First Digital Safety Workflow*

### The Explainable Pipeline:
```text
  [ User Submission: Message / Screenshot / URL ]
                         │
                         ▼
             [ AI + Deterministic Rules ]
                         │
                         ▼
                [ Exact Evidence ]
                         │
                         ▼
                [ Threat Type ]
                         │
                         ▼
             [ Heuristic Risk Score ]
                         │
                         ▼
             [ Actionable Safe Steps ]
```

* **Multi-Modal Input:** Analyzes raw messages, screenshots (OCR text extraction), and URLs.
* **Hybrid Evaluation:** 10+ deterministic heuristic rules combined with contextual AI reasoning.
* **Transparent Report:** Extracts exact manipulative phrases, classifies composite threat categories, and delivers clear safe actions.

---

## Slide 4: How Rakshak Detects Threats

### Title: **How Rakshak Detects Threats**
#### Subtitle: *Comprehensive Threat Taxonomy*

### Eight Core Threat Categories:
1. **Phishing:** Deceptive messages engineered to harvest account credentials and login secrets.
2. **Impersonation:** Spoofed identities mimicking banks, regulatory bodies, and corporate executives.
3. **Social Engineering:** Psychological pressure tactics targeting fear, greed, or curiosity.
4. **Suspicious Links:** Typo-squatted domains, suspicious TLDs, and redirection patterns.
5. **Financial Scams:** Unrealistic guaranteed return claims, Ponzi schemes, and fraudulent wealth programs.
6. **Credential Requests:** Unauthorized prompts for passwords, OTPs, PINs, or urgent KYC confirmation.
7. **Fake Authority Claims:** Fabricated regulatory certifications (SEBI, RBI, government agencies).
8. **Urgency & Threats:** Coercive deadlines and threats of account suspension to bypass critical verification.

---

## Slide 5: Technical Architecture

### Title: **Technical Architecture**
#### Subtitle: *Modular, Resilient, Privacy-Preserving System*

### System Components:
* **Frontend:** React 19 + TypeScript + Vite + custom cybersecurity design system.
* **Backend:** FastAPI (Python 3.10+) with asynchronous REST endpoints.
* **Rule Engine:** Deterministic regex scoring engine (`scorer.py`) with weighted heuristic contributions.
* **AI Engine:** Contextual LLM analysis (`analyzer.py`) enforcing structured JSON schemas with automatic offline fallback.
* **OCR Pipeline:** Automated text extraction from uploaded screenshots (PNG, JPG, WEBP).
* **URL Analysis:** Syntactic heuristics, protocol checking, and deceptive hostname evaluation.
* **Storage:** Local SQLite database via asynchronous SQLAlchemy for auditable scan history.

---

## Slide 6: Live Demo

### Title: **Live Demonstration**
#### Subtitle: *From Suspicious Message to Actionable Digital Safety Report*

### Demonstration Scenario:
```text
"URGENT: Your investment account has been selected for an exclusive government-approved wealth program! 
Invest ₹10,000 today and receive ₹50,000 within 30 days with zero risk. 
Our SEBI-registered experts guarantee 100% returns. Only 10 spots remain! 
Complete your KYC immediately using this link: https://example.com/verify-investment. 
Failure to register today will result in losing this lifetime opportunity."
```

### Analysis Output:
* **Risk Level & Score:** `HIGH RISK` — `91 / 100` (Heuristic Safety Indicator)
* **Primary Threat:** `Financial Scam + Social Engineering`
* **Warning Signals Detected:**
  - Guaranteed / unrealistic returns
  - Fake authority claim
  - Urgency & time pressure
  - Credential / KYC request
  - Suspicious link
  - Scarcity pressure
* **Exact Evidence Pinpointed:**
  - *"receive ₹50,000 within 30 days with zero risk"*
  - *"exclusive government-approved wealth program! ... SEBI-registered experts"*
  - *"Complete your KYC immediately using this link"*
* **Safe Actions:** Concrete, step-by-step guidance on independent verification and non-disclosure.

---

## Slide 7: Why Rakshak AI Is Different

### Title: **Why Rakshak AI Is Different**
#### Subtitle: *Transparency, Education, and Strict Guardrails*

| Traditional Tools | Generic Antivirus | Rakshak AI |
| :--- | :--- | :--- |
| Opaque risk percentage | File malware only | **Evidence-first phrase pinpointing** |
| Black-box AI | Blind to social engineering | **Hybrid AI + deterministic rules** |
| Panic-inducing warnings | No plain-language guidance | **Plain-English explanations & safe steps** |
| Zero educational focus | Passive background agent | **Digital Safety Hub (Proactive literacy)** |
| May offer unverified advice | Generic alerts | **Strict guardrails: zero investment advice** |

### Safety Guardrails:
* **No Financial Advice:** Does not recommend stocks, buy/sell calls, or price targets.
* **No Unsupported Metrics:** Risk scores are transparent heuristic indicators, not false "100% scam guarantees".
* **Privacy by Design:** Zero storage of credentials, passwords, or private keys.

---

## Slide 8: Impact & Future Scope

### Title: **Impact & Future Scope**
#### Subtitle: *Empowering Digital Citizens Toward Proactive Safety*

### Real-World Impact:
* **Safer Digital Behavior:** Transforms passive recipients into vigilant, informed digital citizens.
* **Scalable Safety Education:** Empowers vulnerable users (seniors, first-time smartphone consumers) with the 5-Second Safety Check.
* **Democratizing Threat Literacy:** Understand the *why* behind every scam before taking action.

### Future Roadmap:
* **Browser Extension:** Real-time URL and text safety evaluation in Chrome, Firefox, and Edge.
* **Email & Messaging Client Integrations:** Plugins for Gmail, Outlook, and WhatsApp Web to flag high-risk social engineering.
* **Stronger URL Intelligence:** Live domain age, WHOIS analysis, and threat intelligence feeds.
* **Multilingual Support:** Linguistic heuristics for regional Indian and global languages.

---

### Closing Thought:
> *"Rakshak AI does not tell users what to invest in. It helps them detect suspicious digital content, understand the evidence, and avoid risky actions."*  
> **Rakshak AI — Detect. Understand. Stay Safe.**
