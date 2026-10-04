import React, { useState } from 'react';
import {
  TrendingUp, Clock, AlertTriangle, Shield, ExternalLink,
  ChevronDown, ChevronUp, CheckSquare, Square
} from 'lucide-react';

interface EducationCard {
  id: string;
  title: string;
  icon: string;
  color: string;
  whatItMeans: string;
  example: string;
  warningSigns: string[];
  whatToDo: string[];
}

const educationCards: EducationCard[] = [
  {
    id: 'guaranteed-returns',
    title: 'Guaranteed Returns',
    icon: '📈',
    color: '#FB7185',
    whatItMeans: 'When someone promises that an investment will definitely give you a specific return — like "guaranteed 30% monthly" — it is a significant warning sign.',
    example: '"Invest ₹10,000 today and get guaranteed ₹13,000 back next month. Zero risk. SEBI approved."',
    warningSigns: [
      'The word "guaranteed" next to a return percentage',
      'Promises of risk-free returns',
      'Returns that sound too good to be true (e.g., 20–50% monthly)',
      'Comparing the investment to bank fixed deposits but with far higher returns',
    ],
    whatToDo: [
      'Ask for the SEBI registration number and verify it on sebi.gov.in',
      'Remember: no legitimate regulated investment can guarantee returns',
      'Do not transfer any money until you have independently verified the organization',
    ],
  },
  {
    id: 'urgent-payments',
    title: 'Urgent Payment Requests',
    icon: '⏰',
    color: '#F97316',
    whatItMeans: 'Scammers pressure you to send money immediately, before you have time to think or verify. They create artificial deadlines to bypass your judgment.',
    example: '"This offer expires in 3 hours. Send ₹25,000 today to lock in your guaranteed return. Don\'t miss out."',
    warningSigns: [
      'Deadlines of hours or days to transfer money',
      'Phrases like "act now", "today only", "limited time"',
      'Warnings that you\'ll lose your "slot" if you don\'t pay immediately',
      'Requests to pay first and receive documentation later',
    ],
    whatToDo: [
      'Take more time, not less — legitimate opportunities do not disappear in hours',
      'Never transfer money under time pressure without independent verification',
      'Consult a trusted friend or family member before sending money',
    ],
  },
  {
    id: 'fake-regulatory',
    title: 'Fake Regulatory Claims',
    icon: '🏛️',
    color: '#FCD34D',
    whatItMeans: 'Fraudsters claim their scheme is approved by SEBI, RBI, or the Government to build false trust. Anyone can write "SEBI verified" — it means nothing without a verifiable registration number.',
    example: '"Government-approved investment scheme. SEBI certified. Ministry of Finance endorsed. Double your money in 60 days."',
    warningSigns: [
      'Claims of SEBI, RBI, or government approval with no registration number',
      'Logos of regulatory bodies on unofficial websites',
      'Claims of "government backing" for private investment schemes',
      'Inability to provide a SEBI registration number when asked',
    ],
    whatToDo: [
      'Ask for the SEBI or RBI registration number',
      'Verify it directly on sebi.gov.in or rbi.org.in',
      'Remember: SEBI and RBI do not endorse specific investment returns',
    ],
  },
  {
    id: 'impersonation',
    title: 'Impersonation',
    icon: '🎭',
    color: '#A78BFA',
    whatItMeans: 'Fraudsters pretend to be bank employees, SEBI officials, government representatives, or well-known financial personalities to build trust.',
    example: '"I am calling from SEBI\'s investor protection division. Your account has been flagged. Please verify your details immediately to avoid suspension."',
    warningSigns: [
      'Unsolicited calls or messages claiming to be from regulatory bodies',
      'Requests for account credentials "to protect your account"',
      'Urgency combined with an official-sounding identity',
      'Communication through personal WhatsApp/Telegram rather than official channels',
    ],
    whatToDo: [
      'SEBI and RBI never ask for account credentials through calls or messages',
      'Hang up and call the official number listed on the regulator\'s website',
      'Never share OTPs, passwords, or PINs with anyone',
    ],
  },
  {
    id: 'phishing',
    title: 'Phishing Links',
    icon: '🎣',
    color: '#60A5FA',
    whatItMeans: 'Phishing links direct you to fake websites designed to look like real platforms (banks, trading apps) to steal your login credentials.',
    example: '"Your trading account has been suspended. Verify immediately: http://secure-trade-verify.xyz/login"',
    warningSigns: [
      'Links in unsolicited messages asking you to "verify" or "confirm" your account',
      'URLs that look slightly different from the official site (e.g., "zerodha-secure.com" instead of "zerodha.com")',
      'HTTP links instead of HTTPS',
      'Unusual domain extensions like .xyz, .tk, .ml',
    ],
    whatToDo: [
      'Never click account verification links in unsolicited messages',
      'Access your trading account by typing the official URL directly in your browser',
      'Check the exact URL carefully before entering any credentials',
    ],
  },
  {
    id: 'fake-platforms',
    title: 'Fake Trading Platforms',
    icon: '💻',
    color: '#34D399',
    whatItMeans: 'Scammers create fake investment apps or websites that show fabricated profits to lure more money, then disappear when you try to withdraw.',
    example: '"Join our exclusive trading platform and watch your ₹5,000 grow to ₹25,000 in 30 days. Hundreds of members earning daily."',
    warningSigns: [
      'Platforms not listed on official app stores or with very few reviews',
      'You can see "profits" but cannot actually withdraw money',
      'Platform suddenly becomes unavailable or the operator stops responding',
      'Requests to invest more money to "unlock" your withdrawal',
    ],
    whatToDo: [
      'Use only SEBI-registered brokers — the list is on sebi.gov.in',
      'Verify that the platform has a registered office address and contact details',
      'Test with a small withdrawal before depositing significant amounts',
    ],
  },
  {
    id: 'social-engineering',
    title: 'Social Engineering',
    icon: '🧠',
    color: '#F472B6',
    whatItMeans: 'Social engineering manipulates your emotions — fear, greed, trust, or urgency — to get you to act without thinking. Many investment scams use these psychological techniques.',
    example: '"My uncle works at a top investment firm and gave me this secret tip. I\'m sharing it only with close friends. Don\'t tell anyone else or the opportunity will disappear."',
    warningSigns: [
      '"Secret" or "exclusive" information only you have access to',
      'Building friendship or trust over time before the investment request',
      'Claims of insider knowledge or tips',
      'Pressure based on not wanting to miss out (FOMO)',
    ],
    whatToDo: [
      'Be skeptical of any "exclusive" or "secret" investment opportunity',
      'Remember: legitimate investment opportunities are available through regulated channels',
      'Discuss major financial decisions with a trusted, unconnected third party',
    ],
  },
  {
    id: 'pressure-scarcity',
    title: 'Pressure and Scarcity',
    icon: '🎯',
    color: '#FB923C',
    whatItMeans: 'Scarcity tactics create a false sense that you\'ll miss out if you don\'t act immediately. Combined with urgency, they prevent you from taking time to verify.',
    example: '"Only 3 slots remain in our exclusive ₹25,000 investment scheme. 47 investors already enrolled. Register before midnight tonight."',
    warningSigns: [
      '"Only X slots/seats/positions remain"',
      'Countdown timers on investment offers',
      '"Offer expires tonight" or "Price increases tomorrow"',
      'Claims of hundreds of people already enrolled to create social proof',
    ],
    whatToDo: [
      'Treat extreme scarcity as a red flag, not a reason to act faster',
      'If the offer is real, it will survive your verification period',
      'Never let artificial deadlines override your need to verify independently',
    ],
  },
];

const SafetyChecklist: React.FC = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const items = [
    { id: 'c1', label: 'Is a return being guaranteed?' },
    { id: 'c2', label: 'Are you being pressured to act immediately?' },
    { id: 'c3', label: 'Are you being asked for money or credentials?' },
    { id: 'c4', label: 'Is someone claiming official approval without proof?' },
    { id: 'c5', label: 'Can you independently verify the organization?' },
  ];

  return (
    <div style={{
      background: 'rgba(37, 99, 235, 0.06)',
      border: '1px solid rgba(37, 99, 235, 0.2)',
      borderRadius: 16, padding: '24px 28px', marginBottom: 40,
    }}>
      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: '#F1F5F9', marginBottom: 6 }}>
        ⚡ 5-Second Safety Check
      </h3>
      <p style={{ color: '#64748B', fontSize: 13, marginBottom: 20 }}>
        Before you engage with any investment offer, run through this quick checklist.
      </p>
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => setChecked(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            width: '100%', background: 'transparent', border: 'none',
            padding: '10px 0', cursor: 'pointer', textAlign: 'left',
            borderBottom: '1px solid rgba(59, 130, 246, 0.06)',
            color: checked[item.id] ? '#34D399' : '#CBD5E1',
            transition: 'color 0.2s',
            fontFamily: 'Inter, sans-serif',
          }}
          id={`check-${item.id}`}
          aria-checked={checked[item.id]}
          role="checkbox"
        >
          {checked[item.id]
            ? <CheckSquare size={20} color="#34D399" />
            : <Square size={20} color="#475569" />
          }
          <span style={{ fontSize: 14, lineHeight: 1.5 }}>{item.label}</span>
        </button>
      ))}
      <p style={{ marginTop: 16, fontSize: 13, color: '#475569' }}>
        If you answered "yes" to any of the first four, or "no" to the last, treat the offer with caution and verify independently.
      </p>
    </div>
  );
};

const EducationPage: React.FC = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>('guaranteed-returns');

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', padding: '80px 24px 80px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(37, 99, 235, 0.1)', border: '1px solid rgba(37, 99, 235, 0.25)',
            borderRadius: 999, padding: '6px 16px', marginBottom: 20,
            fontSize: 13, fontWeight: 600, color: '#60A5FA',
          }}>
            <Shield size={14} />
            Investor Education
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#F1F5F9', marginBottom: 14,
          }}>
            Learn to Spot Investment Scams
          </h1>
          <p style={{ color: '#64748B', fontSize: 16, lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
            Understanding how investment fraud works is the first step to protecting yourself.
            Each category below explains what to look for, real examples, and what to do.
          </p>
        </div>

        {/* Safety Checklist */}
        <SafetyChecklist />

        {/* Education Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {educationCards.map((card) => (
            <div
              key={card.id}
              style={{
                background: 'rgba(10, 31, 56, 0.5)',
                border: `1px solid ${expandedCard === card.id ? card.color + '33' : 'rgba(59, 130, 246, 0.08)'}`,
                borderRadius: 16,
                overflow: 'hidden',
                transition: 'border-color 0.2s',
              }}
            >
              {/* Card Header */}
              <button
                onClick={() => setExpandedCard(expandedCard === card.id ? null : card.id)}
                id={`edu-${card.id}`}
                style={{
                  width: '100%', background: 'transparent', border: 'none',
                  padding: '20px 24px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: 12,
                }}
                aria-expanded={expandedCard === card.id}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left' }}>
                  <div style={{
                    width: 44, height: 44,
                    background: `${card.color}18`,
                    border: `1px solid ${card.color}30`,
                    borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22, flexShrink: 0,
                  }}>
                    {card.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#F1F5F9', marginBottom: 2 }}>
                      {card.title}
                    </div>
                    {expandedCard !== card.id && (
                      <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.4 }}>
                        {card.whatItMeans.slice(0, 80)}…
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ color: '#475569', flexShrink: 0 }}>
                  {expandedCard === card.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>

              {/* Card Content */}
              {expandedCard === card.id && (
                <div style={{ padding: '0 24px 24px', borderTop: '1px solid rgba(59, 130, 246, 0.06)' }}>
                  <div style={{ paddingTop: 20 }}>
                    {/* What it means */}
                    <div style={{ marginBottom: 20 }}>
                      <h4 style={{ fontSize: 12, fontWeight: 700, color: card.color, letterSpacing: '0.5px', marginBottom: 8 }}>
                        WHAT IT MEANS
                      </h4>
                      <p style={{ fontSize: 14, color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>
                        {card.whatItMeans}
                      </p>
                    </div>

                    {/* Example */}
                    <div style={{
                      background: 'rgba(251, 191, 36, 0.06)',
                      border: '1px solid rgba(251, 191, 36, 0.15)',
                      borderRadius: 10, padding: '14px 16px', marginBottom: 20,
                    }}>
                      <h4 style={{ fontSize: 11, fontWeight: 700, color: '#FCD34D', letterSpacing: '0.5px', marginBottom: 8 }}>
                        EXAMPLE
                      </h4>
                      <p style={{ fontSize: 13, color: '#FCD34D', fontStyle: 'italic', lineHeight: 1.6, margin: 0, opacity: 0.85 }}>
                        {card.example}
                      </p>
                    </div>

                    {/* Warning Signs */}
                    <div style={{ marginBottom: 20 }}>
                      <h4 style={{ fontSize: 12, fontWeight: 700, color: '#FB7185', letterSpacing: '0.5px', marginBottom: 12 }}>
                        WARNING SIGNS
                      </h4>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {card.warningSigns.map((ws, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#CBD5E1', lineHeight: 1.5 }}>
                            <AlertTriangle size={14} color="#FB7185" style={{ flexShrink: 0, marginTop: 3 }} />
                            {ws}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What to Do */}
                    <div>
                      <h4 style={{ fontSize: 12, fontWeight: 700, color: '#34D399', letterSpacing: '0.5px', marginBottom: 12 }}>
                        WHAT TO DO
                      </h4>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {card.whatToDo.map((action, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#CBD5E1', lineHeight: 1.5 }}>
                            <Shield size={14} color="#34D399" style={{ flexShrink: 0, marginTop: 3 }} />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Resources */}
        <div style={{
          marginTop: 40,
          background: 'rgba(10, 31, 56, 0.5)',
          border: '1px solid rgba(59, 130, 246, 0.12)',
          borderRadius: 16, padding: '28px',
        }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: '#F1F5F9', marginBottom: 16 }}>
            Authoritative Resources
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {[
              { label: 'SEBI Investor Education', url: 'https://investor.sebi.gov.in', desc: 'Official SEBI investor resources' },
              { label: 'SEBI SCORES Portal', url: 'https://scores.sebi.gov.in', desc: 'File complaints against SEBI-regulated entities' },
              { label: 'SEBI Intermediary List', url: 'https://www.sebi.gov.in', desc: 'Verify SEBI registrations' },
              { label: 'RBI Official Website', url: 'https://www.rbi.org.in', desc: 'Reserve Bank of India resources' },
            ].map(r => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '14px 16px',
                  background: 'rgba(6, 18, 34, 0.6)',
                  border: '1px solid rgba(59, 130, 246, 0.08)',
                  borderRadius: 10, textDecoration: 'none',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.25)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.08)')}
              >
                <ExternalLink size={15} color="#60A5FA" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#60A5FA', marginBottom: 2 }}>{r.label}</div>
                  <div style={{ fontSize: 12, color: '#475569' }}>{r.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
