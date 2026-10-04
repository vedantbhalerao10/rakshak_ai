"""
Rakshak AI — Demo Scenarios
Predefined test cases for reliable hackathon demonstration
"""

DEMO_SCENARIOS = {
    "guaranteed_return": {
        "id": "guaranteed_return",
        "label": "Guaranteed Return Scam",
        "content": "Exclusive investment opportunity. Earn a guaranteed 30% monthly return. This opportunity is officially approved. Send \u20b925,000 today to activate your account. Only 5 slots remain.",
        "result": {
            "risk_level": "HIGH",
            "risk_score": 91,
            "summary": "This message contains multiple high-severity investor-safety warning signs. It claims a guaranteed return, requests an immediate payment, uses authority impersonation, and deploys scarcity manipulation tactics. Each of these elements individually warrants caution; their combination significantly raises concern.",
            "signals": [
                {
                    "type": "GUARANTEED_RETURN",
                    "label": "Guaranteed Return Claim",
                    "severity": "HIGH",
                    "evidence": "guaranteed 30% monthly return",
                    "explanation": "The message promises a fixed 30% monthly return. No legitimate investment can guarantee specific returns. Such claims are a classic warning sign of fraudulent investment offers."
                },
                {
                    "type": "PAYMENT_REQUEST",
                    "label": "Upfront Payment Request",
                    "severity": "HIGH",
                    "evidence": "Send \u20b925,000 today to activate your account",
                    "explanation": "The message requests an upfront payment to 'activate' an account. Legitimate investment platforms do not require activation fees or advance payments to access services."
                },
                {
                    "type": "URGENCY",
                    "label": "Urgency Pressure",
                    "severity": "HIGH",
                    "evidence": "Send \u20b925,000 today",
                    "explanation": "The message pressures the recipient to act immediately ('today'). Urgency is a manipulation tactic that reduces the time available for independent verification."
                },
                {
                    "type": "AUTHORITY_IMPERSONATION",
                    "label": "Authority / Regulatory Claim",
                    "severity": "HIGH",
                    "evidence": "officially approved",
                    "explanation": "The message claims official approval without identifying the approving body. Unverified official approval claims are a common fraud tactic used to build false trust."
                },
                {
                    "type": "SCARCITY_MANIPULATION",
                    "label": "Scarcity Manipulation",
                    "severity": "MEDIUM",
                    "evidence": "Only 5 slots remain",
                    "explanation": "The message creates artificial scarcity ('Only 5 slots remain') to pressure recipients into acting before they can verify the offer."
                }
            ],
            "safe_actions": [
                "Do not transfer money until you have independently verified the organization through official channels.",
                "Do not share OTPs, passwords, PINs, or any account credentials.",
                "Search for the organization name and 'SEBI registration' or 'RBI registration' on official regulatory websites.",
                "Preserve this message as evidence if you have already interacted with the sender.",
                "If you suspect fraud, report it to the appropriate consumer protection or law enforcement authority."
            ],
            "uncertainty": "Rakshak AI has identified multiple warning signs in this content. It cannot independently confirm the identity of the sender or establish with certainty that this constitutes fraud. Independent verification is strongly recommended.",
            "simple_explanation": "This message uses several pressure tactics often associated with investment scams. It promises a guaranteed return (which no legitimate investment can offer), asks for immediate payment, and claims official approval without identifying the regulator. The artificial scarcity ('Only 5 slots') is designed to make you act before you can think critically. Treat this message with significant caution and verify all claims independently before taking any action."
        }
    },
    "phishing": {
        "id": "phishing",
        "label": "Phishing Investment Message",
        "content": "Your trading account will be suspended today. Verify your account immediately using the link below to avoid losing access to your funds. Click here: http://secure-trading-verify.xyz/verify",
        "result": {
            "risk_level": "HIGH",
            "risk_score": 88,
            "summary": "This message exhibits strong phishing characteristics. It uses threat language about account suspension, creates extreme urgency, requests credential verification through a suspicious link, and contains an unrecognized domain name.",
            "signals": [
                {
                    "type": "URGENCY",
                    "label": "Extreme Urgency",
                    "severity": "HIGH",
                    "evidence": "suspended today ... immediately",
                    "explanation": "The message demands immediate action to prevent account suspension. Urgency is a primary phishing tactic designed to prevent recipients from verifying the message's legitimacy."
                },
                {
                    "type": "THREAT_LANGUAGE",
                    "label": "Threat of Account Suspension",
                    "severity": "HIGH",
                    "evidence": "Your trading account will be suspended today ... avoid losing access to your funds",
                    "explanation": "The message threatens loss of access and funds if the recipient does not act immediately. Fear of financial loss is a manipulation technique used to override rational judgment."
                },
                {
                    "type": "CREDENTIAL_REQUEST",
                    "label": "Credential / Phishing Risk",
                    "severity": "HIGH",
                    "evidence": "Verify your account immediately using the link below",
                    "explanation": "The message directs users to verify account credentials through an external link. Legitimate trading platforms do not request account verification through unsolicited messages."
                },
                {
                    "type": "SUSPICIOUS_URL",
                    "label": "Suspicious Link",
                    "severity": "HIGH",
                    "evidence": "http://secure-trading-verify.xyz/verify",
                    "explanation": "The URL uses an unrecognized domain (secure-trading-verify.xyz) with a non-standard TLD. Legitimate trading platforms use their official domains, not third-party or newly-registered domains."
                }
            ],
            "safe_actions": [
                "Do NOT click the link in this message.",
                "Log in to your trading account directly by typing the official URL in your browser — not through any link in a message.",
                "Do not enter your username, password, or OTP on any page reached through this link.",
                "Contact your trading platform's official customer support using contact details from their official website.",
                "Report this message to your platform's security team."
            ],
            "uncertainty": "Rakshak AI has identified phishing indicators in this content. It cannot confirm whether the sender has access to actual trading account information or whether the link leads to a credential-harvesting page. Independent verification through official channels is essential.",
            "simple_explanation": "This message is designed to frighten you into clicking a link quickly, before you have time to think. It threatens to suspend your account and cut off access to your funds. Legitimate trading platforms never send account suspension warnings through SMS or messages with links to third-party websites. If you are concerned about your account, open your browser, type your platform's official website address directly, and log in normally."
        }
    },
    "fake_regulatory": {
        "id": "fake_regulatory",
        "label": "Fake Regulatory Claim",
        "content": "Government certified investment program. SEBI verified. Double your money in 60 days. Contact our representative to register. Limited time offer for Indian investors.",
        "result": {
            "risk_level": "HIGH",
            "risk_score": 86,
            "summary": "This message contains unverified regulatory authority claims, an implausible investment return promise, and time pressure. These elements together match a pattern commonly associated with fraudulent investment solicitation.",
            "signals": [
                {
                    "type": "AUTHORITY_IMPERSONATION",
                    "label": "Unverified Regulatory Claim",
                    "severity": "HIGH",
                    "evidence": "Government certified investment program. SEBI verified.",
                    "explanation": "The message claims SEBI verification and government certification without providing registration numbers, verifiable identifiers, or official documentation. SEBI registration details can be verified on the official SEBI website at sebi.gov.in."
                },
                {
                    "type": "GUARANTEED_RETURN",
                    "label": "Implausible Return Claim",
                    "severity": "HIGH",
                    "evidence": "Double your money in 60 days",
                    "explanation": "A promise to double money in 60 days represents an approximately 600% annualized return. This is not achievable through any legitimate, regulated investment and is a significant warning sign."
                },
                {
                    "type": "URGENCY",
                    "label": "Time Pressure",
                    "severity": "MEDIUM",
                    "evidence": "Limited time offer",
                    "explanation": "The message creates time pressure with a 'limited time offer'. This tactic reduces the opportunity for careful verification before acting."
                },
                {
                    "type": "INVESTMENT_SOLICITATION",
                    "label": "Unsolicited Investment Solicitation",
                    "severity": "MEDIUM",
                    "evidence": "Contact our representative to register",
                    "explanation": "The message solicits contact with a representative to 'register' for an investment scheme. Legitimate SEBI-registered entities have formal onboarding processes and do not typically solicit investments through informal messages."
                }
            ],
            "safe_actions": [
                "Verify any SEBI registration claim on the official SEBI website: sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=13",
                "Never accept verbal or message-based authority claims — always verify registration numbers.",
                "Do not contact the representative mentioned until you have independently verified the organization.",
                "Legitimate investment programs do not promise doubling of money within short timeframes.",
                "If the scheme appears to be registered, consult an independent, SEBI-registered investment advisor."
            ],
            "uncertainty": "Rakshak AI has identified authority impersonation indicators and implausible return claims. It cannot independently verify whether SEBI registration exists or whether this message represents a specific illegal scheme.",
            "simple_explanation": "This message claims government and SEBI certification, but provides no verification details. Anyone can write 'SEBI verified' in a message — it means nothing without a registration number you can check yourself. The promise to double your money in 60 days is mathematically implausible for any legitimate investment. Always verify regulatory claims directly on the official SEBI website before engaging with any investment offer."
        }
    },
    "educational": {
        "id": "educational",
        "label": "Educational Content",
        "content": "What is diversification and why is it important for investors?",
        "result": {
            "risk_level": "LOW",
            "risk_score": 8,
            "summary": "This content appears to be a general educational question about investment concepts rather than an investment solicitation, phishing attempt, or fraudulent offer.",
            "signals": [],
            "safe_actions": [
                "This content appears educational. You may wish to learn more about diversification from trusted financial education resources.",
                "SEBI's investor education portal (investor.sebi.gov.in) contains reliable information about investment concepts."
            ],
            "uncertainty": "Rakshak AI identified no significant investor-safety warning signs in this content. It cannot verify the intent behind the question.",
            "simple_explanation": "This appears to be a straightforward question about a basic investment concept. It does not contain any of the warning signs typically associated with investment fraud, phishing, or misleading financial content. Diversification is a legitimate and widely recommended investment strategy of spreading investments across different assets to manage risk."
        }
    }
}

TEST_CASES = [
    {
        "name": "Guaranteed Return — Expected HIGH",
        "input": "Exclusive investment opportunity. Earn a guaranteed 30% monthly return.",
        "expected_risk": "HIGH",
        "expected_score_min": 60,
        "expected_signals": ["GUARANTEED_RETURN"]
    },
    {
        "name": "Phishing — Expected HIGH",
        "input": "Your trading account will be suspended today. Verify your account immediately.",
        "expected_risk": "HIGH",
        "expected_score_min": 60,
        "expected_signals": ["URGENCY", "THREAT_LANGUAGE", "CREDENTIAL_REQUEST"]
    },
    {
        "name": "Educational Content — Expected LOW",
        "input": "What is diversification and why is it important for investors?",
        "expected_risk": "LOW",
        "expected_score_max": 30,
        "expected_signals": []
    }
]
