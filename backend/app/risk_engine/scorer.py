"""
Rakshak AI — Risk Engine
Transparent rule-based scoring layer
"""
import re
from typing import List, Tuple

# Signal definitions with base scores
SIGNAL_RULES = {
    "GUARANTEED_RETURN": {
        "label": "Guaranteed / Unrealistic Returns",
        "score": 25,
        "severity": "HIGH",
        "patterns": [
            r"guaranteed?\s+(return|profit|income|earning)",
            r"guarantee\w*\s+\d+%",
            r"guarantee\w*\s+\d+",
            r"assured?\s+(return|profit|earning)",
            r"\d+%\s*(monthly|weekly|daily|per\s*month|per\s*week)",
            r"double\s+your\s+money",
            r"doubled?\s+money",
            r"triple\s+your\s+money",
            r"risk[\s-]?free\s+(return|profit|investment)",
            r"no[\s-]?risk\s+(return|profit|investment|opportunity)",
            r"zero\s+risk",
            r"(30|40|50|60|70|80|90|99|100|200|300|400|500)%\s*(return|returns|profit|monthly|weekly|daily|accuracy)",
            r"receive\s+[₹$£€\d,]+\s+within\s+\d+\s+days\s+with\s+zero\s+risk",
        ],
        "explanation_template": "The content promises guaranteed or implausibly high returns with zero or minimal risk. Legitimate financial systems carry risk; guarantees of high profits are a primary scam indicator."
    },
    "URGENCY": {
        "label": "Urgency & Time Pressure",
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
            r"failure\s+to\s+register\s+today",
        ],
        "explanation_template": "The message deploys artificial urgency to pressure immediate action before the recipient can independently verify the sender or claims."
    },
    "PAYMENT_REQUEST": {
        "label": "Financial Solicitation / Payment Request",
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
        "explanation_template": "The content solicits upfront money or payment under the guise of an investment or verification fee."
    },
    "CREDENTIAL_REQUEST": {
        "label": "Credential / KYC Request",
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
            r"complete\s+your\s+kyc",
            r"\bKYC\b",
            r"re[\s-]?verify",
            r"re[\s-]?validate",
            r"password\s+expired",
            r"account\s+verification",
            r"security\s+verification",
        ],
        "explanation_template": "The message requests credentials, identity confirmation, or urgent KYC verification — common tactics in phishing and credential theft."
    },
    "AUTHORITY_IMPERSONATION": {
        "label": "Fake Authority / Regulatory Claim",
        "score": 20,
        "severity": "HIGH",
        "patterns": [
            r"\bSEBI\b.{0,50}(verified|approved|certified|registered|authorized|experts)",
            r"SEBI-registered",
            r"sebi\s+registered",
            r"\bRBI\b.{0,50}(verified|approved|certified|registered|authorized)",
            r"\bNSE\b.{0,50}(approved|certified)",
            r"\bBSE\b.{0,50}(approved|certified)",
            r"government.{0,30}(certified|approved|program|scheme)",
            r"government-approved",
            r"government\s+approved",
            r"ministry.{0,30}(approved|certified|scheme)",
            r"officially\s+(approved|certified|verified)",
            r"(SEBI|RBI|AMFI|IRDAI)\s+(verified|approved|certified|registered)",
            r"approved\s+by\s+(SEBI|RBI|government|ministry)",
            r"RBI\s+(approved|authorized|licensed)",
        ],
        "explanation_template": "The content asserts government, regulatory, or official institutional endorsement to fabricate legitimacy without verifiable public credentials."
    },
    "SCARCITY_MANIPULATION": {
        "label": "Scarcity & Exclusivity Pressure",
        "score": 10,
        "severity": "MEDIUM",
        "patterns": [
            r"only\s+\d+\s+(slot|slots|seat|seats|spot|spots|position|place|opening)",
            r"limited\s+(slot|slots|seat|seats|spot|spots|position|place|opening|availability)",
            r"few\s+(slot|slots|seat|seats|spot|spots|position|place|opening)\s+remain",
            r"almost\s+(full|sold\s*out|complete)",
            r"exclusive\s+(opportunity|offer|invitation|program|wealth\s+program)",
            r"select(ed)?\s+(few|members|investors|for\s+an\s+exclusive)",
            r"\d+\s+(slot|slots|seat|seats|spot|spots|position|place|opening)\s+(remain|left|available)",
        ],
        "explanation_template": "The content creates artificial scarcity or exclusivity ('only 10 spots remain') to pressure victims into making impulsive decisions without verification."
    },
    "SUSPICIOUS_URL": {
        "label": "Suspicious Link / Phishing URL",
        "score": 20,
        "severity": "HIGH",
        "patterns": [
            r"https?://[a-z0-9-]+\.(xyz|tk|ml|ga|cf|pw|top|click|download|link|gq|work)\b",
            r"https?://[a-z0-9-]*(secure|verify|login|account|banking|trading|invest)[a-z0-9-]*\.(com|net|org|in|co\.in)[^\s]*",
            r"https?://[^\s]*(verify-investment|verify-account|account-update|login-verify|secure-login)[^\s]*",
            r"http://[^\s]+",
            r"bit\.ly|tinyurl|t\.co/[^\s]+",
            r"click\s+(link|here)\s*:\s*https?://",
            r"click\s+link\s+to\s+join\s*:\s*https?://",
            r"using\s+this\s+link\s*:\s*https?://",
            r"(using\s+)?(the\s+)?link\s+below",
        ],
        "explanation_template": "The content features an unverified or high-risk link designed to direct the user to an external landing page for credential harvesting or scam onboarding."
    },
    "THREAT_LANGUAGE": {
        "label": "Urgency & Threat Tactics",
        "score": 15,
        "severity": "HIGH",
        "patterns": [
            r"(account|access).{0,30}(suspend|block|close|terminat|deactivat|lock)",
            r"(suspend|block|close|terminat|deactivat|lock).{0,30}(account|access)",
            r"permanently\s+lock",
            r"suspended\s+today",
            r"lose\s+(access|funds|money|investment)",
            r"losing\s+(access|funds|money|investment|this\s+lifetime\s+opportunity)",
            r"legal\s+action",
            r"penalty",
            r"fine\s+will\s+be",
            r"consequences",
            r"failure\s+to\s+(verify|confirm|respond|act|register)",
            r"avoid\s+losing\s+access",
        ],
        "explanation_template": "The content leverages coercive threat language (account suspension, permanent lock, or lost lifetime opportunity) to evoke anxiety and override rational skepticism."
    },
    "INVESTMENT_SOLICITATION": {
        "label": "Fraudulent Offer / Unsolicited Promotion",
        "score": 10,
        "severity": "MEDIUM",
        "patterns": [
            r"investment\s+(opportunity|program|scheme|plan|package)",
            r"invest\s+(now|today|with\s+us)",
            r"join\s+our\s+(investment|trading|wealth|profit|vip\s+trading)\s+(program|plan|group|team|channel)",
            r"vip\s+trading\s+channel",
            r"jackpot\s+(call|tips?)",
            r"earn\s+(lakhs|crores|thousands)\s+(daily|weekly|monthly)",
            r"passive\s+income\s+(opportunity|program)",
            r"work\s+from\s+home\s+and\s+earn",
            r"contact\s+our\s+representative\s+to\s+(invest|register|join)",
        ],
        "explanation_template": "The content promotes an unsolicited or high-pressure scheme (e.g. VIP trading channel or wealth program) outside legitimate regulatory onboarding pathways."
    },
    "UNVERIFIED_REGULATORY_CLAIM": {
        "label": "Unverified Regulatory Claim",
        "score": 20,
        "severity": "HIGH",
        "patterns": [
            r"SEBI\s+(verified|approved|certified)\b(?!.*registration\s+no)",
            r"without\s+(a\s+)?registration\s+(number|no\.?)",
        ],
        "explanation_template": "The content makes regulatory claims without providing verifiable registration identifiers that can be audited on official oversight portals."
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


def determine_threat_types(signals: list, text: str = "") -> Tuple[List[str], str]:
    """
    Determine threat type categories from detected signals and text context.
    Allowed categories:
    - Phishing
    - Financial Scam
    - Social Engineering
    - Impersonation
    - Suspicious Link
    - Credential Theft Risk
    - Fake Authority Claim
    - Fraudulent Offer
    - Misinformation / Misleading Claim
    - Unable to Determine
    """
    if not signals:
        return ["Unable to Determine"], "Unable to Determine"

    signal_types = {s.get("type", "") for s in signals}
    categories = []

    has_phishing = ("CREDENTIAL_REQUEST" in signal_types or "SUSPICIOUS_URL" in signal_types)
    has_fin_scam = ("GUARANTEED_RETURN" in signal_types or "PAYMENT_REQUEST" in signal_types or "INVESTMENT_SOLICITATION" in signal_types)
    has_social_eng = ("URGENCY" in signal_types or "SCARCITY_MANIPULATION" in signal_types or "THREAT_LANGUAGE" in signal_types)
    has_authority = ("AUTHORITY_IMPERSONATION" in signal_types or "UNVERIFIED_REGULATORY_CLAIM" in signal_types)

    # Financial Scam / Fraudulent Offer
    if has_fin_scam:
        categories.append("Financial Scam")
        if "GUARANTEED_RETURN" in signal_types or "INVESTMENT_SOLICITATION" in signal_types:
            categories.append("Fraudulent Offer")

    # Phishing / Credential Theft Risk
    if "CREDENTIAL_REQUEST" in signal_types:
        categories.append("Phishing")
        categories.append("Credential Theft Risk")
    elif "SUSPICIOUS_URL" in signal_types:
        if has_social_eng or "account" in text.lower() or "verify" in text.lower() or "suspended" in text.lower():
            categories.append("Phishing")

    # Social Engineering
    if has_social_eng:
        categories.append("Social Engineering")

    # Impersonation & Fake Authority Claims
    if has_authority:
        categories.append("Fake Authority Claim")
        categories.append("Impersonation")

    # Suspicious Link
    if "SUSPICIOUS_URL" in signal_types:
        categories.append("Suspicious Link")

    # Deduplicate while preserving order
    deduped = []
    for c in categories:
        if c not in deduped:
            deduped.append(c)

    if not deduped:
        return ["Unable to Determine"], "Unable to Determine"

    # Determine primary threat format (e.g. "Financial Scam + Social Engineering", "Phishing / Suspicious Link")
    if len(deduped) >= 2:
        # Prioritize high-impact combos
        if "Financial Scam" in deduped and "Social Engineering" in deduped:
            primary_threat = "Financial Scam + Social Engineering"
        elif "Phishing" in deduped and "Social Engineering" in deduped:
            primary_threat = "Phishing + Social Engineering"
        elif "Phishing" in deduped and "Suspicious Link" in deduped:
            primary_threat = "Phishing / Suspicious Link"
        elif "Financial Scam" in deduped and "Fake Authority Claim" in deduped:
            primary_threat = "Financial Scam + Fake Authority Claim"
        else:
            primary_threat = f"{deduped[0]} + {deduped[1]}"
    else:
        primary_threat = deduped[0]

    return deduped, primary_threat


def generate_safe_actions(signals: list) -> list:
    """Generate context-aware safe actions based on detected signals."""
    actions = []
    signal_types = {s["type"] for s in signals}

    if "CREDENTIAL_REQUEST" in signal_types or "SUSPICIOUS_URL" in signal_types:
        actions.append("Do not click unverified links.")
        actions.append("Do not share passwords, OTPs, or financial credentials.")

    if "PAYMENT_REQUEST" in signal_types or "GUARANTEED_RETURN" in signal_types:
        actions.append("Do not transfer money or invest until identity and credentials are authenticated.")

    if "AUTHORITY_IMPERSONATION" in signal_types or "UNVERIFIED_REGULATORY_CLAIM" in signal_types:
        actions.append("Verify the sender and regulatory claims independently through official portals.")

    if "URGENCY" in signal_types or "SCARCITY_MANIPULATION" in signal_types or "THREAT_LANGUAGE" in signal_types:
        actions.append("Avoid making decisions under pressure — legitimate institutions provide reasonable response times.")

    actions.append("Check claims and domain origins through trusted, official sources.")
    actions.append("Report suspicious content and scams through appropriate cybersecurity reporting channels.")

    # Deduplicate while preserving order
    seen = set()
    unique_actions = []
    for a in actions:
        if a not in seen:
            seen.add(a)
            unique_actions.append(a)

    return unique_actions


def generate_simple_explanation(risk_level: str, signals: list) -> str:
    """Generate a beginner-friendly explanation of the digital safety analysis."""
    if risk_level == "LOW" and not signals:
        return "No significant digital safety warning signs or phishing patterns were detected in this content. This appears to be general educational or benign communication."

    signal_types = {s["type"] for s in signals}
    parts = []

    if "GUARANTEED_RETURN" in signal_types:
        parts.append("promises an unrealistic or guaranteed return with zero risk, which is a classic scam tactic")

    if "URGENCY" in signal_types:
        parts.append("creates artificial urgency to rush you into acting without independent verification")

    if "PAYMENT_REQUEST" in signal_types:
        parts.append("requests direct upfront funds or fees outside standard verified settlement pathways")

    if "CREDENTIAL_REQUEST" in signal_types:
        parts.append("attempts to harvest credentials, identity verification, or KYC information under false pretenses")

    if "SUSPICIOUS_URL" in signal_types:
        parts.append("directs you to a suspicious or external link typical of credential harvesting and phishing portals")

    if "AUTHORITY_IMPERSONATION" in signal_types or "UNVERIFIED_REGULATORY_CLAIM" in signal_types:
        parts.append("falsely claims government or regulatory authority endorsement without verifiable credentials")

    if "THREAT_LANGUAGE" in signal_types:
        parts.append("uses coercive language threatening account suspension or lost opportunities to trigger emotional fear")

    if "SCARCITY_MANIPULATION" in signal_types:
        parts.append("deploys artificial scarcity (limited slots) to force immediate commitment")

    if parts:
        concern_list = "; ".join(parts)
        return f"This content triggers serious safety alerts because it {concern_list}. These combined tactics are designed to deceive users into compromising their digital or financial safety."

    return "This content exhibits deceptive patterns consistent with digital scams and phishing tactics. Exercise extreme caution and do not interact with links or sender requests."

