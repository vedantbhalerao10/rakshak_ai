# 🎬 Rakshak AI — 3-Minute Video Demo Script
**HackNowa Global Hackathon 2026 — Digital Safety & Cybersecurity Track**  
**Total Target Runtime**: Exactly 3 Minutes (180 Seconds)  
**Presenter Tone**: Professional, energetic, empathetic, and security-focused.  

---

## ⏱️ Timeline Overview

| Timestamp | Duration | Section | Key Screen Visual |
| :--- | :--- | :--- | :--- |
| **0:00 – 0:20** | 20s | The Digital Safety Crisis | Slide / News collage of scam alerts & fake KYC SMS |
| **0:20 – 0:40** | 20s | Introducing Rakshak AI | Rakshak AI Landing Page (`/`) with Hero & Threat Grid |
| **0:40 – 1:40** | 60s | Core Live Analysis Demo | Analyzer Page (`/analyze`) $\rightarrow$ Digital Safety Report (`/results`) |
| **1:40 – 2:05** | 25s | Multi-Modal Screenshot Scan | Screenshot OCR Tab on Analyzer Page |
| **2:05 – 2:25** | 20s | Digital Safety Hub | Educational Threat Cards & 5-Second Flowchart (`/safety-hub`) |
| **2:25 – 2:45** | 20s | Persistent History & Audit Trail | History Page (`/history`) showing persistent threat records |
| **2:45 – 3:00** | 15s | Conclusion & Hackathon Wrap-up | Closing Slide / Landing Page footer |

---

## 📝 Word-by-Word Script & Visual Directives

### [0:00 – 0:20] The Digital Safety Crisis
- **Visual**: Show real-world headlines of phishing, fake police notices, WhatsApp investment scams, and urgent KYC suspension messages.
- **Voiceover**:  
  > *"Every single day, millions of digital citizens receive urgent messages like this: 'Your account is suspended! Update KYC immediately or face police action!' or 'Exclusive VIP group: Guaranteed 300% daily profit!'  
  > Cybercriminals don't just hack systems anymore—they hack human psychology through fear, urgency, and false promises. And traditional antiviruses don't stop these social engineering attacks. Everyday users need a fast, transparent shield."*

---

### [0:20 – 0:40] Introducing Rakshak AI
- **Visual**: Seamless transition to the **Rakshak AI Landing Page** (`http://localhost:5173`). Highlight the hero badge: *"AI-Powered Digital Scam & Phishing Shield"* and tagline: *"Detect. Understand. Stay Safe."* Scroll smoothly past the "What Rakshak Detects" 8-card grid.
- **Voiceover**:  
  > *"Meet Rakshak AI—an AI-powered digital scam and phishing shield built for the HackNowa Global Hackathon 2026 under the Digital Safety & Cybersecurity track.  
  > Rakshak AI isn't an opaque black box. It combines a rapid 12-vector deterministic heuristic engine with contextual AI to detect threats, pinpoint exact evidence, and explain risks in plain, reassuring language."*

---

### [0:40 – 1:40] Core Live Analysis Demo (Main HackNowa Threat)
- **Visual**: Click **"Analyze Suspicious Content"** in the navbar to open `/analyze`.  
  Click the preset **"High-Yield WhatsApp Scam"** button. The text box fills instantly with the composite scam message containing fake KYC urgency, guaranteed 300% returns, upfront UPI deposit demand, police threats, and a shortened URL.  
  Click **"Analyze Suspicious Content"**. The multi-step scanning state appears for ~500ms, then renders the **Digital Safety Report**.
- **Voiceover**:  
  > *"Let's see it in action. Here is a real-world composite message combining fake KYC urgency, an upfront UPI payment demand, guaranteed 300% returns, and a malicious shortened link.  
  > We click analyze. In milliseconds, Rakshak AI produces a comprehensive Digital Safety Report.  
  > Notice our Heuristic Score: 100 out of 100—HIGH RISK.  
  > It immediately classifies the primary threat as 'Financial Scam + Social Engineering'.  
  > But more importantly, look at the evidence breakdown: Rakshak AI doesn't just guess—it quotes the exact phrases used to manipulate the victim: 'guaranteed 300% monthly return', 'transfer Rs 25,000 activation deposit', and 'permanent account suspension'.  
  > And below, it gives clear, reassuring safe actions: never transfer funds, verify independently on official portals, and report immediately to cybercrime authorities."*

---

### [1:40 – 2:05] Multi-Modal Screenshot Analysis (OCR Pipeline)
- **Visual**: Click **"Scan Another Item"**, select the **"Screenshot / Image"** tab. Upload or select a suspicious chat screenshot. Watch the OCR engine extract the text in real-time, populate the preview, and submit for instant scoring.
- **Voiceover**:  
  > *"Scammers often send deceptive images or chat screenshots to evade text filters. With Rakshak AI's multi-modal OCR pipeline, users can simply upload a screenshot of a suspicious chat or notice.  
  > The engine extracts the embedded text on the fly, evaluates every psychological pressure marker, and generates the exact same evidence-backed safety report."*

---

### [2:05 – 2:25] Digital Safety Hub & 5-Second Safety Check
- **Visual**: Navigate to **"Digital Safety Hub"** (`/safety-hub`). Scroll through the 8 categorized threat modules and highlight the visual **"5-Second Safety Check"** flowchart.
- **Voiceover**:  
  > *"Detection is only half the battle—prevention requires digital literacy. Our Digital Safety Hub breaks down modern attack vectors: from impersonation fraud to credential harvesting.  
  > Users also get our intuitive 5-Second Safety Check protocol: Pause, Inspect Link, Verify Source, Never Share OTP, and Scan with Rakshak—empowering citizens with proactive defense habits."*

---

### [2:25 – 2:45] Persistent History & Local Audit Trail
- **Visual**: Navigate to **"History"** (`/history`). Show the table of previous analyses, showing timestamps, input types, calibrated risk scores, and the dedicated **Threat Type** badges (*Phishing + Social Engineering*, *Financial Scam*, etc.). Click **"View Report"** on an existing scan to instantly reload its report.
- **Voiceover**:  
  > *"Every scan is archived in a privacy-respecting local SQLite audit trail. Users can inspect their history, review threat classifications, and reload full evidence reports at any time. No credentials or private messages are ever sent to third parties or stored in unencrypted cloud logs."*

---

### [2:45 – 3:00] Conclusion & Hackathon Closing
- **Visual**: Return to the Landing Page hero or show a clean summary slide featuring the technology stack: *FastAPI + React 18 + TypeScript + Deterministic Rule Engine + SQLite*.
- **Voiceover**:  
  > *"Rakshak AI does not tell users what to invest in. It helps them detect suspicious digital content, understand the evidence, and avoid risky actions.  
  > Rakshak AI — Detect. Understand. Stay Safe."*

---

## 🚫 Critical Presenter Notes
- **Do NOT demonstrate or mention any chatbot** ("Ask Rakshak" is strictly decoupled).
- **Do NOT claim 100% detection accuracy** or use fake statistics (e.g. "99.9% detection rate"). Use the phrase *"calibrated heuristic safety indicator"*.
- **Do NOT give financial or investment advice**.
- Ensure backend (`port 8001`) and frontend (`port 5173`) are running and verified prior to screen recording.
