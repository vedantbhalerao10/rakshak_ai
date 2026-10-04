# 🎯 Rakshak AI — Live Demonstration Guide

This guide provides step-by-step instructions for demonstrating **Rakshak AI** during hackathon presentations, judging rounds, or recording a 3–5 minute video.

---

## ⚡ Pre-Demo Checklist

1. **Verify Services Are Running**:
   * Frontend: Open [http://localhost:5173](http://localhost:5173) in Chrome or Edge.
   * Backend: Check [http://localhost:8001/api/health](http://localhost:8001/api/health) returns `{"status":"ok"}`.
   * *If not running, simply double-click `start.bat`.*
2. **Verify Demo Mode Badge**:
   * In the top-right navbar, verify the badge shows `Demo Mode` (green shield).
3. **Have Test Assets Ready**:
   * Open `demo/sample_test_inputs.md` on a side window for quick copy-pasting.
   * Note the location of `demo/sample_whatsapp_scam.png`.

---

## 🎬 Step-by-Step Demo Sequence (3–5 Minutes)

### Step 1: The Landing Page (0:00 – 0:40)
* **URL**: `http://localhost:5173/`
* **Focus Points**:
  * Point out the tagline: *"Detect. Understand. Stay Safe."*
  * Highlight the **Real-Time Threat Ticker** showcasing common traps (Guaranteed Returns, Fake IPOs, WhatsApp tips).
  * Click the primary CTA button: **"Start Free Analysis"**.

### Step 2: Text Analysis & Instant Preset (0:40 – 1:40)
* **URL**: `http://localhost:5173/analyze`
* **Actions**:
  1. Click the preset button: **"Guaranteed 30% Return Scam"**.
  2. The suspicious WhatsApp text populates the textarea.
  3. Click **"Analyze Message"**.
  4. Observe the multi-stage scanning animation simulating real-time analysis.
* **Results Page Highlights (`/results`)**:
  * **Risk Meter**: Show the animated circular meter showing **Score 91 / 100 (HIGH RISK)**.
  * **Warning Signals**: Point out the flagged badges:
    * *Guaranteed Return Claim*
    * *Upfront Payment Request*
    * *Urgency Pressure*
    * *Authority / Regulatory Claim*
    * *Scarcity Manipulation*
  * **Evidence Highlights**: Point out the exact quoted evidence substrings.
  * **Simple Explanation**: Read 1–2 sentences showing how complex jargon is translated into reassuring, clear language.
  * **Safe Next Steps**: Point out the recommendations to verify SEBI registrations and avoid transferring funds.

### Step 3: Screenshot Analysis (1:40 – 2:20)
* **Actions**:
  1. Click **"Analyze Another"** or return to `/analyze`.
  2. Switch to the **"Screenshot / Image"** tab.
  3. Drag and drop `demo/sample_whatsapp_scam.png` into the dropzone.
  4. Show the visual thumbnail preview.
  5. Click **"Analyze Screenshot"**.
  6. Show the extracted content and risk breakdown on the results page.

### Step 4: Interactive Safety Chatbot (2:20 – 2:45)
* **Actions**:
  1. On the Results page, scroll down to the **"Ask Rakshak"** section.
  2. Click one of the suggested prompts or type:
     *"The sender claims they are SEBI certified. How can I confirm this?"*
  3. Hit Send.
  4. Show the immediate, context-aware safety response instructing how to check registration numbers on `sebi.gov.in`.

### Step 5: Investor Education Hub (2:45 – 3:15)
* **URL**: `http://localhost:5173/education`
* **Actions**:
  1. Scroll through the **8 Scam Archetype Cards**.
  2. Click to expand **"WhatsApp Stock Tip Groups"** to reveal the anatomy of pump-and-dump operations.
  3. Scroll down to the **"5-Second Investor Safety Checklist"**.
  4. Check off 2–3 red flags to show the interactive real-time readiness calculator in action.

### Step 6: Scan History & Privacy Sovereignty (3:15 – 3:45)
* **URL**: `http://localhost:5173/history`
* **Actions**:
  1. Show past scan entries saved in the local SQLite database.
  2. Point out the Risk Distribution breakdown bar.
  3. Highlight the **"Clear History"** button to emphasize zero unwanted retention of user data.

### Step 7: Mission & Wrap-Up (3:45 – 4:00)
* **URL**: `http://localhost:5173/about`
* **Closing Words**:
  > *"Rakshak AI empowers everyday retail investors with evidence-first fraud resilience. Before you invest, understand what you are seeing. Detect. Understand. Stay Safe."*
