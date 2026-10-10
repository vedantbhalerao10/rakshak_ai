import React, { useState } from 'react';
import {
  Shield, Lock, UserX, AlertOctagon, KeyRound,
  Zap, Link2, AlertTriangle, ChevronDown, ChevronUp,
  CheckCircle2, ArrowDown
} from 'lucide-react';

interface SafetyCard {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  whatItIs: string;
  howItWorks: string;
  warningSigns: string[];
  whatToDo: string[];
}

const safetyCards: SafetyCard[] = [
  {
    id: 'phishing',
    title: '1. Phishing',
    icon: Lock,
    color: '#FB7185',
    whatItIs: 'Deceptive messages disguised as trustworthy organizations designed to steal passwords, financial credentials, or private information.',
    howItWorks: 'Attackers create fake email, SMS, or direct messages mimicking banks, cloud services, or government agencies. When you click their link, you land on a spoofed portal designed to log your keystrokes.',
    warningSigns: [
      'Unsolicited communication claiming immediate action is required on your account',
      'Sender address does not match the organization\'s official top-level domain',
      'Generic greetings ("Dear Customer") paired with catastrophic threats',
      'Hyperlinks where the visible text says one URL, but points elsewhere',
    ],
    whatToDo: [
      'Never click links in unsolicited messages or emails',
      'Navigate to the official portal by typing the verified URL directly into your browser',
      'Inspect sender domain headers and verify security certificates',
    ],
  },
  {
    id: 'impersonation',
    title: '2. Impersonation',
    icon: UserX,
    color: '#60A5FA',
    whatItIs: 'Pretending to be an authorized executive, regulatory inspector, bank manager, or technical support agent to hijack trust.',
    howItWorks: 'Scammers clone official logos, create display names matching recognized authorities, or spoof phone numbers to give false credibility to their demands.',
    warningSigns: [
      'Claims of being from SEBI, RBI, CBI, or Cyber Cell demanding "verification"',
      'Contact initiated via informal channels like Telegram or WhatsApp for official business',
      'Insistence on secrecy or demands not to contact other company personnel',
      'Refusal to provide verifiable official employee registration or contact numbers',
    ],
    whatToDo: [
      'Hang up or disengage immediately and look up the official switchboard number',
      'Remember: regulatory bodies and banks never initiate personal messaging to request credentials',
      'Verify executive identity via internal out-of-band communication channels',
    ],
  },
  {
    id: 'social-engineering',
    title: '3. Social Engineering',
    icon: AlertOctagon,
    color: '#A78BFA',
    whatItIs: 'Psychological manipulation techniques that exploit cognitive biases, fear, greed, curiosity, or sympathy to convince victims to compromise security.',
    howItWorks: 'Instead of finding technical vulnerabilities in software, attackers target human judgment by inducing panic (fear of penalties) or excitement (exclusive wealth).',
    warningSigns: [
      'High-pressure conversation creating an artificial sense of crisis',
      'Requests to bypass standard organizational security protocols "just this once"',
      'Appeals to vanity ("you have been selected for an exclusive VIP tier")',
      'Unusual emotional intensity compared to normal operational communication',
    ],
    whatToDo: [
      'Pause and disconnect emotional reaction from technical action',
      'Subject any high-stakes request to independent second-party verification',
      'Follow standard verification checklists regardless of who appears to be asking',
    ],
  },
  {
    id: 'credential-theft',
    title: '4. Credential Theft',
    icon: KeyRound,
    color: '#F43F5E',
    whatItIs: 'Direct solicitation or harvesting of secret authentication factors such as passwords, OTPs, PINs, or sensitive KYC identity records.',
    howItWorks: 'Threat actors fabricate a pretext — such as an expired KYC status, security audit, or fraud alert — requiring you to "confirm" your one-time passcode or password.',
    warningSigns: [
      'Any prompt asking for a one-time password (OTP) sent to your mobile phone',
      'Urgent warnings that account KYC is incomplete and will lead to deactivation',
      'Forms asking for full banking credentials or ATM PIN numbers',
      'Requests to read out verification codes over phone calls',
    ],
    whatToDo: [
      'Never share an OTP, PIN, or password with anyone, including bank representatives',
      'Understand that OTPs are designed to authorize actions, not confirm identity',
      'Complete KYC updates solely through official bank branches or verified mobile apps',
    ],
  },
  {
    id: 'financial-scams',
    title: '5. Financial Scams',
    icon: Zap,
    color: '#F97316',
    whatItIs: 'Fraudulent investment schemes promising unrealistic guaranteed returns, zero risk, or insider trading profits.',
    howItWorks: 'Promoters display fake profit screenshots, recruit through VIP groups, and solicit initial deposits. Early participants may see simulated profits until they try to withdraw.',
    warningSigns: [
      'Promises of guaranteed returns, daily fixed percentages, or "zero risk"',
      'Claims of doubling money within weeks or guaranteed jackpot stock calls',
      'Requests for payment in cryptocurrency or unverified personal UPI handles',
      'Unregistered advisors unable to provide public SEBI registration numbers',
    ],
    whatToDo: [
      'Verify regulatory registration on official regulator databases (e.g. sebi.gov.in)',
      'Acknowledge that all legitimate financial market returns carry proportional risk',
      'Never transfer funds to personal bank accounts for institutional investments',
    ],
  },
  {
    id: 'fake-authority',
    title: '6. Fake Authority Claims',
    icon: Shield,
    color: '#34D399',
    whatItIs: 'Citing fake government endorsements, regulatory certificates, or legal seals to disarm victim suspicion.',
    howItWorks: 'Scammers forge official letterheads, paste digital SEBI/RBI logos, or reference real government acts to claim their private scheme is officially sponsored.',
    warningSigns: [
      'Claims of "Government-approved wealth program" or "Ministry certified"',
      'No verifiable registration number provided on the official regulatory portal',
      'Stamps and logos displayed out of context on low-quality PDFs or images',
      'Using the regulator\'s name to guarantee safety (regulators do not guarantee returns)',
    ],
    whatToDo: [
      'Search for the exact entity name on the official regulator directory',
      'Verify whether the license allows investment solicitation in your category',
      'Do not rely on screenshots of certificates provided by the sender',
    ],
  },
  {
    id: 'suspicious-links',
    title: '7. Suspicious Links',
    icon: Link2,
    color: '#FCD34D',
    whatItIs: 'URLs crafted to disguise malicious destinations through deceptive domains, typo-squatting, or free web hosts.',
    howItWorks: 'Attackers register domains with minor character substitutions (e.g., swapping "o" for "0") or abuse suspicious TLDs (.xyz, .top, .work) with link shorteners.',
    warningSigns: [
      'Unusual domain extensions (.xyz, .click, .download, .tk, .pw)',
      'Numeric IP addresses in place of a standard domain name',
      'Misspelled corporate brand names in the host header',
      'Non-HTTPS connections (unencrypted HTTP) on login portals',
    ],
    whatToDo: [
      'Hover over links before clicking to check the destination URL destination',
      'Check for valid SSL certificates and exact spelling of domain names',
      'Use Rakshak AI\'s URL tab to inspect structural heuristics before visiting',
    ],
  },
  {
    id: 'urgency-threats',
    title: '8. Urgency & Threat Tactics',
    icon: AlertTriangle,
    color: '#38BDF8',
    whatItIs: 'High-pressure coercion threatening legal action, police arrest, tax penalties, or account shutdown to force immediate compliance.',
    howItWorks: 'Fraudsters exploit the natural fight-or-flight response. By compressing available time, they block the rational habit of consulting peers or checking official guidelines.',
    warningSigns: [
      'Deadlines counted in minutes or hours ("must respond within 15 minutes")',
      'Threats of imminent police visits, court summons, or tax raids',
      'Aggressive language designed to intimidate and humiliate the target',
      'Claims that missing the deadline forfeits a "once-in-a-lifetime opportunity"',
    ],
    whatToDo: [
      'Recognize urgency as the #1 indicator of manipulation',
      'Slow down — legitimate legal and financial notices follow formal written processes',
      'Consult trusted colleagues, legal counsel, or the cybercrime helpline immediately',
    ],
  },
];

const EducationPage: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('phishing');

  const toggleCard = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', padding: '80px 24px 80px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(37, 99, 235, 0.12)',
            border: '1px solid rgba(37, 99, 235, 0.25)',
            borderRadius: 999, padding: '5px 16px', marginBottom: 16,
            fontSize: 12, fontWeight: 700, color: '#60A5FA', letterSpacing: '0.5px',
          }}>
            <Shield size={14} />
            DIGITAL SAFETY HUB
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 800, color: '#F1F5F9', marginBottom: 12,
          }}>
            Digital Safety Hub
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.6, maxWidth: 640, margin: '0 auto' }}>
            Comprehensive cybersecurity reference guide. Understand how digital scams and phishing attacks operate, identify warning signals, and adopt proactive defense habits.
          </p>
        </div>

        {/* 5-SECOND SAFETY CHECK (Section 13) */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(6, 18, 34, 0.8))',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          borderRadius: 20,
          padding: '32px 28px',
          marginBottom: 48,
          textAlign: 'center',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: 999, padding: '4px 14px', marginBottom: 16,
            fontSize: 12, fontWeight: 800, color: '#FB7185',
          }}>
            CORE DEFENSE PROTOCOL
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 26, fontWeight: 800, color: '#F1F5F9', marginBottom: 24,
          }}>
            5-SECOND SAFETY CHECK
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            maxWidth: 500,
            margin: '0 auto',
          }}>
            <div style={{
              background: '#DC2626',
              color: 'white',
              fontWeight: 900,
              fontSize: 16,
              padding: '8px 28px',
              borderRadius: 8,
              letterSpacing: '1px',
              boxShadow: '0 4px 16px rgba(220, 38, 38, 0.4)',
            }}>
              STOP
            </div>

            <ArrowDown size={18} color="#60A5FA" />

            <div style={{ background: 'rgba(6, 18, 34, 0.8)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '10px 20px', borderRadius: 10, width: '100%', color: '#F1F5F9', fontWeight: 600 }}>
              1. Who sent this?
            </div>

            <ArrowDown size={18} color="#60A5FA" />

            <div style={{ background: 'rgba(6, 18, 34, 0.8)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '10px 20px', borderRadius: 10, width: '100%', color: '#F1F5F9', fontWeight: 600 }}>
              2. What are they asking me to do?
            </div>

            <ArrowDown size={18} color="#60A5FA" />

            <div style={{ background: 'rgba(6, 18, 34, 0.8)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '10px 20px', borderRadius: 10, width: '100%', color: '#F1F5F9', fontWeight: 600 }}>
              3. Is there urgency or pressure?
            </div>

            <ArrowDown size={18} color="#60A5FA" />

            <div style={{ background: 'rgba(6, 18, 34, 0.8)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '10px 20px', borderRadius: 10, width: '100%', color: '#F1F5F9', fontWeight: 600 }}>
              4. Can I verify it independently?
            </div>

            <ArrowDown size={18} color="#34D399" />

            <div style={{
              background: 'rgba(52, 211, 153, 0.15)',
              border: '1px solid rgba(52, 211, 153, 0.35)',
              padding: '12px 24px',
              borderRadius: 10,
              width: '100%',
              color: '#34D399',
              fontWeight: 700,
              fontSize: 15,
            }}>
              ✓ Do not click / share / pay until verified.
            </div>
          </div>
        </div>

        {/* 8 Threat Cards */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 24, fontWeight: 700, color: '#F1F5F9', marginBottom: 8,
            }}>
              Threat Encyclopedia
            </h2>
            <p style={{ color: '#94A3B8', fontSize: 14 }}>
              Click any category to examine its mechanism, signs, and defenses.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {safetyCards.map((card) => {
              const isExpanded = expandedId === card.id;
              const CardIcon = card.icon;

              return (
                <div
                  key={card.id}
                  className="glass-card"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    borderColor: isExpanded ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.12)',
                    transition: 'all 0.2s',
                  }}
                >
                  <button
                    onClick={() => toggleCard(card.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '20px 24px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'inherit',
                      textAlign: 'left',
                      gap: 16,
                    }}
                    aria-expanded={isExpanded}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{
                        width: 42, height: 42,
                        background: `${card.color}1a`,
                        border: `1px solid ${card.color}44`,
                        borderRadius: 12,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <CardIcon size={20} color={card.color} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F1F5F9', margin: 0 }}>
                          {card.title}
                        </h3>
                        <p style={{ fontSize: 13, color: '#94A3B8', margin: '4px 0 0', lineHeight: 1.4 }}>
                          {card.whatItIs}
                        </p>
                      </div>
                    </div>
                    <div style={{ color: '#64748B', flexShrink: 0 }}>
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div style={{
                      padding: '0 24px 24px',
                      borderTop: '1px solid rgba(59, 130, 246, 0.08)',
                      paddingTop: 20,
                    }}>
                      {/* HOW IT WORKS */}
                      <div style={{ marginBottom: 18 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: '#60A5FA', letterSpacing: '0.6px', marginBottom: 6 }}>
                          HOW IT WORKS
                        </div>
                        <p style={{ margin: 0, fontSize: 14, color: '#CBD5E1', lineHeight: 1.65 }}>
                          {card.howItWorks}
                        </p>
                      </div>

                      {/* WARNING SIGNS */}
                      <div style={{ marginBottom: 18 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: '#FB7185', letterSpacing: '0.6px', marginBottom: 8 }}>
                          WARNING SIGNS
                        </div>
                        <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {card.warningSigns.map((ws, i) => (
                            <li key={i} style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.5 }}>
                              {ws}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* WHAT TO DO */}
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color: '#34D399', letterSpacing: '0.6px', marginBottom: 8 }}>
                          WHAT TO DO
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {card.whatToDo.map((action, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                              <CheckCircle2 size={15} color="#34D399" style={{ flexShrink: 0, marginTop: 2 }} />
                              <span style={{ fontSize: 13, color: '#E2E8F0', lineHeight: 1.5 }}>{action}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EducationPage;
