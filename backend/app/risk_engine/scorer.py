"""
Rakshak AI — Risk Engine
Transparent rule-based scoring layer
"""
import re
from typing import List, Tuple

# Signal definitions with base scores
SIGNAL_RULES = {
    "GUARANTEED_RETURN": {
        "label": "Guaranteed Return Claim",
        "score": 25,
        "severity": "HIGH",
        "patterns": [
            r"guaranteed?\s+(return|profit|income|earning)",
            r"guarantee\w*\s+\d+",
            r"assured?\s+(return|profit|earning)",
            r"\d+%\s*(monthly|weekly|daily|per\s*month|per\s*week)",
            r"double\s+your\s+money",
            r"triple\s+your\s+money",
            r"risk[\s-]?free\s+(return|profit|investment)",
            r"no[\s-]?risk\s+(return|profit|investment|opportunity)",
            r"(30|40|50|60|70|80|90|100|200|300|400|500)%\s*(return|profit|monthly|weekly|daily)",
        ],
        "explanation_template": "The content claims a guaranteed or unusually high return. No legitimate investment can guarantee specific returns, and promises of high fixed returns are a significant warning sign."
    },
    "URGENCY": {
        "label": "Urgency Pressure",
        "score": 15,
        "severity": "HIGH",
        "patterns": [
            r"\btoday\b.*\b(send|transfer|pay|invest|register|verify)\b",
            r"\b(send|transfer|pay|invest|register|verify)\b.*\btoday\b",
            r"immediately",
            r"urgent",
            r"act\s+now",
            r"limited\s+time",
            r"expires?\s+(today|soon|in\s+\d+\s+(hour|minute|day))",
            r"last\s+(chance|opportunity)",
            r"don'?t\s+(delay|wait|miss)",
            r"right\s+now",
            r"before\s+it'?s?\s+too\s+late",
            r"offer\s+(ends|closes|expires)",
        ],
        "explanation_template": "The content uses urgency tactics to pressure immediate action, reducing the opportunity for independent verification."
    },
    "PAYMENT_REQUEST": {
        "label": "Upfront Payment Request",
        "score": 20,
        "severity": "HIGH",
        "patterns": [
            r"send\s+[₹$£€\d]",
            r"transfer\s+[₹$£€\d]",
            r"pay\s+[₹$£€\d]",
            r"[₹$£€]\s*[\d,]+",
            r"activation\s+(fee|charge|amount)",
            r"registration\s+(fee|charge|amount)",
            r"membership\s+(fee|charge|amount)",
            r"deposit\s+[₹$£€\d]",
            r"invest\s+[₹$£€\d]",
            r"send\s+money",
            r"transfer\s+money",
            r"payment\s+(required|needed|mandatory)",
        ],
        "explanation_template": "The content requests a direct payment, fee, or financial transfer. Legitimate investment platforms use regulated, transparent payment processes."
    },
    "CREDENTIAL_REQUEST": {
        "label": "Credential / Phishing Risk",
        "score": 25,
        "severity": "HIGH",
        "patterns": [
            r"verify\s+your\s+(account|identity|details|information)",
            r"confirm\s+your\s+(account|identity|details|information)",
            r"\bOTP\b",
            r"one[\s-]?time\s+password",
            r"enter\s+your\s+(password|PIN|credentials)",
            r"log\s*(in|on)\s+(here|now|immediately)",
            r"click\s+(here|the\s+link)\s+to\s+(verify|confirm|validate|access)",
            r"update\s+your\s+(account|KYC|details)",
            r"re[\s-]?verify",
            r"re[\s-]?validate",
            r"password\s+expired",
            r"account\s+verification",
        ],
        "explanation_template": "The content requests account verification or credential entry. Phishing attempts commonly use this approach to harvest passwords, OTPs, or account credentials."
    },
    "AUTHORITY_IMPERSONATION": {
        "label": "Authority / Regulatory Claim",
        "score": 20,
        "severity": "HIGH",
        "patterns": [
            r"\bSEBI\b.{0,50}(verified|approved|certified|registered|authorized)",
            r"\bRBI\b.{0,50}(verified|approved|certified|registered|authorized)",
            r"\bNSE\b.{0,50}(approved|certified)",
            r"\bBSE\b.{0,50}(approved|certified)",
            r"government.{0,30}(certified|approved|program|scheme)",
            r"ministry.{0,30}(approved|certified|scheme)",
            r"officially\s+(approved|certified|verified)",
            r"(SEBI|RBI|AMFI|IRDAI)\s+(verified|approved|certified)",
            r"approved\s+by\s+(SEBI|RBI|government|ministry)",
            r"RBI\s+(approved|authorized|licensed)",
        ],
        "explanation_template": "The content claims official regulatory approval or government certification without providing verifiable registration details. Anyone can write such claims — always verify on the official regulator's website."
    },
    "SCARCITY_MANIPULATION": {
        "label": "Scarcity Manipulation",
        "score": 10,
        "severity": "MEDIUM",
        "patterns": [
            r"only\s+\d+\s+(slot|seat|spot|position|place|opening)",
            r"limited\s+(slot|seat|spot|position|place|opening|availability)",
            r"few\s+(slot|seat|spot|position|place|opening)\s+remain",
            r"almost\s+(full|sold\s*out|complete)",
            r"exclusive\s+(opportunity|offer|invitation)",
            r"select(ed)?\s+(few|members|investors)",
            r"\d+\s+(slot|seat|spot|position|place|opening)\s+(remain|left|available)",
        ],
        "explanation_template": "The content creates artificial scarcity to pressure recipients into acting quickly without adequate verification time."
    },
    "SUSPICIOUS_URL": {
        "label": "Suspicious URL Pattern",
        "score": 20,
        "severity": "HIGH",
        "patterns": [
            r"https?://[a-z0-9-]+\.(xyz|tk|ml|ga|cf|pw|top|click|download|link|gq)\b",
            r"https?://[a-z0-9-]*(secure|verify|login|account|banking|trading|invest)[a-z0-9-]*\.(com|net|org|in|co\.in)[^\s]*",
            r"http://[^\s]+",  # Non-HTTPS links
            r"bit\.ly|tinyurl|t\.co/[^\s]+(?=.*invest|.*trading|.*account|.*verify)",
            r"click\s+here.*http",
        ],
        "explanation_template": "The content contains a URL with characteristics commonly associated with phishing sites, including suspicious domains or non-secure HTTP connections."
    },
    "THREAT_LANGUAGE": {
        "label": "Threat Language",
        "score": 15,
        "severity": "HIGH",
        "patterns": [
            r"(account|access).{0,20}(suspend|block|close|terminat|deactivat)",
            r"(suspend|block|close|terminat|deactivat).{0,20}(account|access)",
            r"lose\s+(access|funds|money|investment)",
            r"losing\s+(access|funds|money|investment)",
            r"legal\s+action",
            r"penalty",
            r"fine\s+will\s+be",
            r"consequences",
            r"failure\s+to\s+(verify|confirm|respond|act)",
        ],
        "explanation_template": "The content uses threatening language about loss of access, funds, or legal consequences. This is a manipulation tactic to override rational decision-making."
    },
    "INVESTMENT_SOLICITATION": {
        "label": "Unsolicited Investment Solicitation",
        "score": 10,
        "severity": "MEDIUM",
        "patterns": [
            r"investment\s+(opportunity|program|scheme|plan|package)",
            r"invest\s+(now|today|with\s+us)",
            r"join\s+our\s+(investment|trading|wealth|profit)\s+(program|plan|group|team)",
            r"earn\s+(lakhs|crores|thousands)\s+(daily|weekly|monthly)",
            r"passive\s+income\s+(opportunity|program)",
            r"work\s+from\s+home\s+and\s+earn",
            r"contact\s+our\s+representative\s+to\s+(invest|register|join)",
        ],
        "explanation_template": "The content contains an unsolicited investment solicitation. Legitimate investments are offered through regulated entities and formal channels, not unsolicited messages."
    },
    "UNVERIFIED_REGULATORY_CLAIM": {
        "label": "Unverified Regulatory Claim",
        "score": 20,
        "severity": "HIGH",
        "patterns": [
            r"SEBI\s+(verified|approved|certified)\b(?!.*registration\s+no)",
            r"without\s+(a\s+)?registration\s+(number|no\.?)",
        ],
        "explanation_template": "The content makes regulatory claims that cannot be independently verified from the information provided."
    }
}


def compute_risk_score(text: str) -> Tuple[int, list]:
    """
    Compute a transparent, rule-based risk score for the given text.
    Returns (score, detected_signals)
    """
    text_lower = text.lower()
    detected_signals = []
    total_score = 0

    for signal_type, rule in SIGNAL_RULES.items():
        matched_evidence = None
        for pattern in rule["patterns"]:
            match = re.search(pattern, text_lower, re.IGNORECASE)
            if match:
                # Extract original-case evidence
                start, end = match.span()
                matched_evidence = text[start:end].strip()
                break

        if matched_evidence:
            detected_signals.append({
                "type": signal_type,
                "label": rule["label"],
                "severity": rule["severity"],
                "evidence": matched_evidence,
                "explanation": rule["explanation_template"],
                "score_contribution": rule["score"]
            })
            total_score += rule["score"]

    # Cap at 100
    total_score = min(total_score, 100)

    return total_score, detected_signals


def score_to_risk_level(score: int) -> str:
    if score <= 24:
        return "LOW"
    elif score <= 59:
        return "MEDIUM"
    else:
        return "HIGH"


def analyze_url_patterns(url: str) -> Tuple[int, list]:
    """
    Analyze a URL for suspicious patterns without executing its JavaScript.
    """
    signals = []
    score = 0

    from urllib.parse import urlparse
    try:
        parsed = urlparse(url)
        hostname = parsed.hostname or ""
        scheme = parsed.scheme

        # Non-HTTPS
        if scheme == "http":
            signals.append({
                "type": "SUSPICIOUS_URL",
                "label": "Non-Secure Connection (HTTP)",
                "severity": "MEDIUM",
                "evidence": f"URL uses HTTP instead of HTTPS",
                "explanation": "The URL uses an unencrypted HTTP connection. Financial platforms should use HTTPS.",
                "score_contribution": 15
            })
            score += 15

        # Suspicious TLDs
        suspicious_tlds = [".xyz", ".tk", ".ml", ".ga", ".cf", ".pw", ".top", ".click", ".download", ".link", ".gq", ".work"]
        for tld in suspicious_tlds:
            if hostname.endswith(tld):
                signals.append({
                    "type": "SUSPICIOUS_URL",
                    "label": "Suspicious Domain Extension",
                    "severity": "HIGH",
                    "evidence": hostname,
                    "explanation": f"The domain uses '{tld}' which is commonly associated with low-cost or free domains used in phishing campaigns.",
                    "score_contribution": 20
                })
                score += 20
                break

        # Impersonation keywords in domain
        impersonation_keywords = ["sebi", "rbi", "nse", "bse", "govt", "government", "official", "secure", "verify", "login", "bank", "trading", "invest"]
        for keyword in impersonation_keywords:
            if keyword in hostname.lower() and not is_likely_official(hostname):
                signals.append({
                    "type": "AUTHORITY_IMPERSONATION",
                    "label": "Suspicious Domain Name",
                    "severity": "HIGH",
                    "evidence": hostname,
                    "explanation": f"The domain name contains '{keyword}' which may be attempting to impersonate a regulatory or financial institution.",
                    "score_contribution": 20
                })
                score += 20
                break

        # Numeric IPs
        import re
        if re.match(r'\d+\.\d+\.\d+\.\d+', hostname):
            signals.append({
                "type": "SUSPICIOUS_URL",
                "label": "IP Address Instead of Domain",
                "severity": "HIGH",
                "evidence": hostname,
                "explanation": "The URL uses a numeric IP address instead of a domain name. Legitimate financial platforms use registered domain names.",
                "score_contribution": 25
            })
            score += 25

        # Very long domains (often phishing)
        if len(hostname) > 50:
            signals.append({
                "type": "SUSPICIOUS_URL",
                "label": "Unusually Long Domain Name",
                "severity": "MEDIUM",
                "evidence": hostname,
                "explanation": "Unusually long domain names are sometimes used in phishing to embed misleading text.",
                "score_contribution": 10
            })
            score += 10

    except Exception:
        pass

    return min(score, 100), signals


def is_likely_official(hostname: str) -> bool:
    """Check if a hostname appears to be an official known domain."""
    official_domains = [
        "sebi.gov.in", "rbi.org.in", "nseindia.com", "bseindia.com",
        "nse.com", "amfiindia.com", "investor.sebi.gov.in",
        "zerodha.com", "groww.in", "upstox.com", "angelone.in"
    ]
    return any(hostname == d or hostname.endswith("." + d) for d in official_domains)


def generate_safe_actions(signals: list) -> list:
    """Generate context-aware safe actions based on detected signals."""
    actions = []
    signal_types = {s["type"] for s in signals}

    if "PAYMENT_REQUEST" in signal_types or "GUARANTEED_RETURN" in signal_types:
        actions.append("Do not transfer money until you have independently verified the organization through official channels.")

    if "CREDENTIAL_REQUEST" in signal_types or "SUSPICIOUS_URL" in signal_types:
        actions.append("Do not click any links in this message. Access your account only through the official website by typing it directly in your browser.")
        actions.append("Do not enter your password, OTP, PIN, or any credentials on any page reached through this message.")

    if "AUTHORITY_IMPERSONATION" in signal_types or "UNVERIFIED_REGULATORY_CLAIM" in signal_types:
        actions.append("Verify any regulatory claim (SEBI, RBI, etc.) on the official regulator's website using the registration number provided.")

    actions.append("Preserve all evidence: screenshots, messages, URLs, and any transaction records.")
    actions.append("If you have already provided money or credentials, contact your bank and report the incident to the appropriate authority.")

    if not actions:
        actions = [
            "Review this content carefully before taking any action.",
            "Verify the identity of the sender through independent means."
        ]

    return actions


def generate_simple_explanation(risk_level: str, signals: list) -> str:
    """Generate a beginner-friendly explanation of the analysis."""
    if risk_level == "LOW" and not signals:
        return "No significant investor-safety warning signs were detected in this content. This appears to be general information rather than an investment solicitation or fraud attempt."

    signal_types = {s["type"] for s in signals}
    parts = []

    if "GUARANTEED_RETURN" in signal_types:
        parts.append("It promises a guaranteed return — no legitimate investment can guarantee this")

    if "URGENCY" in signal_types:
        parts.append("it pressures you to act immediately, which reduces your time to verify")

    if "PAYMENT_REQUEST" in signal_types:
        parts.append("it asks for an upfront payment or fee, which is uncommon in legitimate regulated investments")

    if "CREDENTIAL_REQUEST" in signal_types or "SUSPICIOUS_URL" in signal_types:
        parts.append("it tries to get you to click a link and enter your account details or credentials")

    if "AUTHORITY_IMPERSONATION" in signal_types:
        parts.append("it claims regulatory approval without providing verifiable details")

    if "THREAT_LANGUAGE" in signal_types:
        parts.append("it threatens account suspension or financial loss to frighten you into acting")

    if "SCARCITY_MANIPULATION" in signal_types:
        parts.append("it creates artificial scarcity to make you feel you'll miss out if you don't act quickly")

    if parts:
        concern_list = "; ".join(parts)
        return f"This content has raised concern because: {concern_list}. These are warning signs that warrant careful independent verification before you take any action."

    return "This content contains some patterns that resemble investor-safety warning signs. Exercise caution and verify all claims independently before acting."
