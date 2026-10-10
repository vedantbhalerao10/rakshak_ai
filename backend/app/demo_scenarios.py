"""
Rakshak AI — Demo Scenarios
Predefined test cases for HackNowa Global Hackathon 2026 demonstration
"""

DEMO_SCENARIOS = {
    "main_hacknowa_scam": {
        "id": "main_hacknowa_scam",
        "label": "Main HackNowa Demo: Investment Scam & KYC Phishing",
        "content": "URGENT: Your investment account has been selected for an exclusive government-approved wealth program! Invest \u20b910,000 today and receive \u20b950,000 within 30 days with zero risk. Our SEBI-registered experts guarantee 100% returns. Only 10 spots remain! Complete your KYC immediately using this link: https://example.com/verify-investment. Failure to register today will result in losing this lifetime opportunity.",
        "result": {
            "risk_level": "HIGH",
            "risk_score": 91,
            "primary_threat": "Financial Scam + Social Engineering",
            "threat_types": [
                "Financial Scam",
                "Social Engineering",
                "Phishing",
                "Credential Theft Risk",
                "Fake Authority Claim",
                "Suspicious Link",
                "Fraudulent Offer"
            ],
            "summary": "High-risk hybrid threat combining financial solicitation, unrealistic guaranteed returns, unverified authority claims, credential/KYC harvesting, and extreme coercive urgency.",
            "simple_explanation": "This message triggers multiple critical cybersecurity and scam warning signs. It promises a 500% return with 'zero risk' (an impossibility in legitimate financial markets), impersonates SEBI and government approval without credentials, deploys artificial scarcity ('only 10 spots remain'), pressures you to act 'today', and directs you to submit sensitive KYC verification through an unverified external link.",
            "signals": [
                {
                    "type": "GUARANTEED_RETURN",
                    "label": "Guaranteed / Unrealistic Returns",
                    "severity": "HIGH",
                    "evidence": "receive \u20b950,000 within 30 days with zero risk. Our SEBI-registered experts guarantee 100% returns",
                    "explanation": "The message promises unusually high returns while claiming zero risk. No legitimate investment can guarantee specific returns or eliminate risk."
                },
                {
                    "type": "URGENCY",
                    "label": "Urgency & Time Pressure",
                    "severity": "HIGH",
                    "evidence": "URGENT ... today ... immediately ... Failure to register today",
                    "explanation": "The message uses severe urgency tactics to force impulsive action before independent verification can be performed."
                },
                {
                    "type": "AUTHORITY_IMPERSONATION",
                    "label": "Fake Authority / Regulatory Claim",
                    "severity": "HIGH",
                    "evidence": "exclusive government-approved wealth program! ... Our SEBI-registered experts",
                    "explanation": "The message claims government endorsement and SEBI affiliation without providing verifiable registration identifiers."
                },
                {
                    "type": "CREDENTIAL_REQUEST",
                    "label": "Credential / KYC Request",
                    "severity": "HIGH",
                    "evidence": "Complete your KYC immediately using this link",
                    "explanation": "The message creates urgency and requests sensitive personal verification details (KYC) through an external link."
                },
                {
                    "type": "SCARCITY_MANIPULATION",
                    "label": "Scarcity & Exclusivity Pressure",
                    "severity": "MEDIUM",
                    "evidence": "Only 10 spots remain",
                    "explanation": "Artificial scarcity is manufactured to pressure users into making decisions without verification."
                },
                {
                    "type": "SUSPICIOUS_URL",
                    "label": "Suspicious Link / Phishing URL",
                    "severity": "HIGH",
                    "evidence": "https://example.com/verify-investment",
                    "explanation": "Directs users to an unverified external link designed to harvest KYC credentials and personal data."
                },
                {
                    "type": "THREAT_LANGUAGE",
                    "label": "Urgency & Threat Tactics",
                    "severity": "HIGH",
                    "evidence": "Failure to register today will result in losing this lifetime opportunity",
                    "explanation": "Uses psychological fear-of-missing-out and coercive framing to intimidate users into prompt compliance."
                }
            ],
            "safe_actions": [
                "Do not click unverified links.",
                "Do not share passwords, OTPs, or financial credentials.",
                "Verify the sender independently through official regulator portals.",
                "Check claims through official sources (e.g. sebi.gov.in).",
                "Avoid making decisions under pressure.",
                "Report suspicious content through appropriate cybersecurity channels."
            ],
            "uncertainty": "Risk scores are heuristic safety indicators based on detected patterns, not mathematical proof that content is fraudulent. Always independently verify important claims."
        }
    },
    "phishing": {
        "id": "phishing",
        "label": "Phishing: Account Suspension Threat",
        "content": "URGENT: Your account will be suspended today. Verify your identity immediately using the link below to avoid losing access. Failure to complete verification will permanently lock your account.",
        "result": {
            "risk_level": "HIGH",
            "risk_score": 88,
            "primary_threat": "Phishing + Social Engineering",
            "threat_types": [
                "Phishing",
                "Social Engineering",
                "Credential Theft Risk",
                "Suspicious Link"
            ],
            "summary": "This message exhibits classic phishing and credential theft characteristics using coercive threats of immediate account lockout.",
            "simple_explanation": "The message employs intimidation tactics, threatening permanent account lockout unless you verify credentials immediately. Legitimate security providers do not demand urgent re-verification via unsolicited messages with threat ultimatums.",
            "signals": [
                {
                    "type": "URGENCY",
                    "label": "Urgency & Time Pressure",
                    "severity": "HIGH",
                    "evidence": "URGENT ... suspended today ... immediately",
                    "explanation": "The message creates artificial panic to prevent rational cross-checking with the actual service provider."
                },
                {
                    "type": "THREAT_LANGUAGE",
                    "label": "Urgency & Threat Tactics",
                    "severity": "HIGH",
                    "evidence": "Your account will be suspended today ... permanently lock your account",
                    "explanation": "Threatens permanent loss of access to coerce the victim into following instructions immediately."
                },
                {
                    "type": "CREDENTIAL_REQUEST",
                    "label": "Credential / Identity Request",
                    "severity": "HIGH",
                    "evidence": "Verify your identity immediately using the link below",
                    "explanation": "Directs user to input credentials or identity proof through an unverified channel."
                }
            ],
            "safe_actions": [
                "Do not click unverified links in this message.",
                "Log into your service account directly by typing the official website URL into your browser.",
                "Do not enter passwords, PINs, or OTPs on links sent via SMS or messaging apps.",
                "Contact official support directly through verified customer service channels.",
                "Report this message to your security team or cybersecurity helpline."
            ],
            "uncertainty": "Heuristic analysis indicates high credential theft risk. Rakshak AI cannot independently determine whether the sender possesses authentic account access."
        }
    },
    "impersonation": {
        "id": "impersonation",
        "label": "Impersonation: Security Verification",
        "content": "Your account has been selected for a security verification. Confirm your identity immediately or your account will be permanently locked.",
        "result": {
            "risk_level": "HIGH",
            "risk_score": 75,
            "primary_threat": "Impersonation + Phishing",
            "threat_types": [
                "Impersonation",
                "Phishing",
                "Credential Theft Risk",
                "Social Engineering"
            ],
            "summary": "Impersonation scam attempting to harvest credentials under the guise of an official security audit.",
            "simple_explanation": "Attackers frequently pose as internal security departments requesting urgent 'security verification' to steal credentials.",
            "signals": [
                {
                    "type": "CREDENTIAL_REQUEST",
                    "label": "Credential / KYC Request",
                    "severity": "HIGH",
                    "evidence": "security verification. Confirm your identity",
                    "explanation": "Unsolicited prompt to confirm sensitive identity details."
                },
                {
                    "type": "URGENCY",
                    "label": "Urgency & Time Pressure",
                    "severity": "HIGH",
                    "evidence": "immediately",
                    "explanation": "Demands prompt response to bypass standard verification habits."
                },
                {
                    "type": "THREAT_LANGUAGE",
                    "label": "Urgency & Threat Tactics",
                    "severity": "HIGH",
                    "evidence": "permanently locked",
                    "explanation": "Coercive penalty threat to induce panic."
                }
            ],
            "safe_actions": [
                "Do not share passwords, OTPs, or identity documents.",
                "Verify the sender's email address domain or official contact list.",
                "Access your portal account independently through official bookmarks."
            ],
            "uncertainty": "Pattern-based detection indicates credential risk. Always verify directly with the named service."
        }
    },
    "suspicious_trading": {
        "id": "suspicious_trading",
        "label": "Trading Promotion: VIP Channel & Jackpot Call",
        "content": "Join our VIP trading channel for daily 99% accuracy stock tips. Doubled money in 2 weeks for all members. Limited spots for tomorrow's jackpot call. Click link to join: https://example.com/vip-jackpot-tips",
        "result": {
            "risk_level": "HIGH",
            "risk_score": 85,
            "primary_threat": "Financial Scam + Fraudulent Offer",
            "threat_types": [
                "Financial Scam",
                "Fraudulent Offer",
                "Social Engineering",
                "Suspicious Link"
            ],
            "summary": "Fraudulent financial promotion using unrealistic accuracy claims ('99%'), rapid capital doubling, and artificial FOMO.",
            "simple_explanation": "Stock tip channels promising 99% accuracy and doubled money in two weeks operate unregistered pump-and-dump or subscription traps.",
            "signals": [
                {
                    "type": "GUARANTEED_RETURN",
                    "label": "Guaranteed / Unrealistic Returns",
                    "severity": "HIGH",
                    "evidence": "daily 99% accuracy stock tips. Doubled money in 2 weeks",
                    "explanation": "Promises mathematically unrealistic trading accuracy and 100% profit in 14 days."
                },
                {
                    "type": "INVESTMENT_SOLICITATION",
                    "label": "Fraudulent Offer / Unsolicited Promotion",
                    "severity": "MEDIUM",
                    "evidence": "Join our VIP trading channel ... tomorrow's jackpot call",
                    "explanation": "Unsolicited invitation to an unregulated financial tipping channel."
                },
                {
                    "type": "SCARCITY_MANIPULATION",
                    "label": "Scarcity & Exclusivity Pressure",
                    "severity": "MEDIUM",
                    "evidence": "Limited spots for tomorrow's jackpot call",
                    "explanation": "Manufactures artificial scarcity to rush subscription decisions."
                },
                {
                    "type": "SUSPICIOUS_URL",
                    "label": "Suspicious Link",
                    "severity": "HIGH",
                    "evidence": "https://example.com/vip-jackpot-tips",
                    "explanation": "Directs users to an unverified third-party landing page."
                }
            ],
            "safe_actions": [
                "Do not join unverified VIP investment or trading groups.",
                "Remember that SEBI-registered advisors are prohibited from promising fixed or jackpot returns.",
                "Do not click unverified links or transfer subscription fees.",
                "Report illegal tipsters to regulatory authorities."
            ],
            "uncertainty": "Heuristic evaluation flags predatory promotional patterns."
        }
    },
    "educational": {
        "id": "educational",
        "label": "Benign / Educational Content",
        "content": "What is phishing and how can users protect themselves from suspicious links?",
        "result": {
            "risk_level": "LOW",
            "risk_score": 5,
            "primary_threat": "Unable to Determine / Educational Content",
            "threat_types": [
                "Unable to Determine"
            ],
            "summary": "This content is educational digital safety content with zero malicious or manipulative signals detected.",
            "simple_explanation": "The text poses a legitimate question about cybersecurity principles. It contains no urgency, no credential solicitations, no fake authority claims, and no suspicious links.",
            "signals": [],
            "safe_actions": [
                "Continue learning about digital hygiene and cybersecurity best practices.",
                "Explore the Digital Safety Hub for in-depth guidance on phishing defense."
            ],
            "uncertainty": "No warning patterns detected. Demonstrates that Rakshak AI accurately differentiates benign educational inquiries from threats."
        }
    }
}

# Compatibility aliases
DEMO_SCENARIOS["guaranteed_return"] = DEMO_SCENARIOS["main_hacknowa_scam"]
DEMO_SCENARIOS["fake_regulatory"] = DEMO_SCENARIOS["main_hacknowa_scam"]
