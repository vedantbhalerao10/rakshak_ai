import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Zap, Eye, CheckCircle2, ArrowRight,
  MessageSquare, Image, Globe, AlertTriangle,
  Lock, BookOpen, UserX, AlertOctagon, Link2, KeyRound
} from 'lucide-react';
import { getStats } from '../services/api';

const whatRakshakDetects = [
  {
    icon: Lock,
    title: 'Phishing',
    desc: 'Deceptive messages and fraudulent portals engineered to trick you into disclosing sensitive information.',
    color: '#FB7185',
  },
  {
    icon: UserX,
    title: 'Impersonation',
    desc: 'Spoofed identities posing as trusted banks, regulators, customer support teams, or company executives.',
    color: '#60A5FA',
  },
  {
    icon: AlertOctagon,
    title: 'Social Engineering',
    desc: 'Psychological manipulation exploiting fear, excitement, authority, or panic to bypass cautious habits.',
    color: '#A78BFA',
  },
  {
    icon: Link2,
    title: 'Suspicious Links',
    desc: 'Unregistered domains, typo-squatted URLs, and high-risk redirects designed for malicious capture.',
    color: '#FCD34D',
  },
  {
    icon: Zap,
    title: 'Financial Scams',
    desc: 'Unrealistic return promises, Ponzi schemes, fake wealth programs, and fraudulent investment promotions.',
    color: '#F97316',
  },
  {
    icon: KeyRound,
    title: 'Credential Requests',
    desc: 'Coercive demands for OTPs, passwords, PIN numbers, or unauthorized urgent identity KYC re-verification.',
    color: '#F43F5E',
  },
  {
    icon: Shield,
    title: 'Fake Authority Claims',
    desc: 'Fabricated claims of SEBI, RBI, government, or law-enforcement certification without verifiable license details.',
    color: '#34D399',
  },
  {
    icon: AlertTriangle,
    title: 'Urgency & Threats',
    desc: 'Coercive deadlines and threats of account suspension or penalties engineered to provoke rapid compliance.',
    color: '#38BDF8',
  },
];

const features = [
  {
    icon: MessageSquare,
    title: 'Message Analysis',
    description: 'Paste suspicious emails, SMS alerts, WhatsApp forwards, or direct messages for instant threat evaluation.',
  },
  {
    icon: Image,
    title: 'Screenshot Analysis',
    description: 'Upload screenshots of suspicious chats, promotional posts, or alerts with automatic OCR text extraction.',
  },
  {
    icon: Globe,
    title: 'Suspicious URL Verification',
    description: 'Inspect suspicious links for credential-harvesting patterns, domain abnormalities, and phishing flags.',
  },
  {
    icon: Eye,
    title: 'Transparent Evidence Extraction',
    description: 'We highlight the specific clauses, phrases, and structures triggering the safety alert.',
  },
  {
    icon: BookOpen,
    title: 'Plain Language Explanations',
    description: 'Every alert is explained in simple language so you understand the tactic, not just the score.',
  },
  {
    icon: CheckCircle2,
    title: 'Actionable Safe Steps',
    description: 'Concrete, safe next steps guiding you on how to verify claims independently and protect your assets.',
  },
];

const LandingPage: React.FC = () => {
  const [stats, setStats] = useState({ total: 0, high_risk: 0, medium_risk: 0, low_risk: 0 });

  useEffect(() => {
    getStats().then(setStats).catch(() => {});
  }, []);

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        padding: '80px 24px 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow background accents */}
        <div style={{
          position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '15%',
          width: 320, height: 320,
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 880, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div className="animate-fade-in-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(37, 99, 235, 0.12)',
            border: '1px solid rgba(37, 99, 235, 0.3)',
            borderRadius: 999,
            padding: '6px 18px',
            marginBottom: 24,
            fontSize: 13, fontWeight: 700, color: '#60A5FA',
            letterSpacing: '0.5px',
          }}>
            <Shield size={14} />
            RAKSHAK AI · AI-POWERED DIGITAL SAFETY SHIELD
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up animate-stagger-1" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(36px, 5.5vw, 62px)',
            fontWeight: 800,
            color: '#F1F5F9',
            lineHeight: 1.15,
            marginBottom: 20,
          }}>
            Detect. Understand. <span style={{ color: '#3B82F6' }}>Stay Safe.</span>
          </h1>

          {/* Core Tagline / Subtitle */}
          <p className="animate-fade-in-up animate-stagger-2" style={{
            fontSize: 'clamp(17px, 2.4vw, 21px)',
            color: '#E2E8F0',
            fontWeight: 500,
            lineHeight: 1.5,
            marginBottom: 16,
            maxWidth: 720,
            margin: '0 auto 16px',
          }}>
            Detect suspicious messages, phishing attempts, scams and social-engineering threats before you act.
          </p>

          {/* Concise explanation */}
          <p className="animate-fade-in-up animate-stagger-2" style={{
            fontSize: 'clamp(14px, 1.8vw, 16px)',
            color: '#94A3B8',
            lineHeight: 1.7,
            marginBottom: 36,
            maxWidth: 680,
            margin: '0 auto 36px',
          }}>
            Submit a suspicious message, screenshot or URL. Rakshak AI identifies potential threat signals, shows the evidence, explains why it matters, and recommends safe next steps.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up animate-stagger-3" style={{
            display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <Link to="/analyze" className="btn-primary" id="hero-analyze-btn" style={{ padding: '14px 30px', fontSize: 15, fontWeight: 700 }}>
              <Shield size={18} />
              Analyze Suspicious Content
              <ArrowRight size={16} />
            </Link>
            <Link to="/safety-hub" className="btn-secondary" id="hero-learn-btn" style={{ padding: '14px 28px', fontSize: 15 }}>
              <BookOpen size={16} />
              Learn Digital Safety
            </Link>
          </div>
        </div>

        {/* Hero Features Highlight Bar */}
        <div className="animate-fade-in-up animate-stagger-4" style={{
          maxWidth: 960, margin: '56px auto 0',
          background: 'rgba(10, 31, 56, 0.65)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          borderRadius: 20,
          padding: 24,
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
            {[
              { label: 'Hybrid AI & Rules', icon: Shield, color: '#3B82F6', desc: 'Deterministic heuristics + AI reasoning' },
              { label: 'Exact Evidence', icon: Eye, color: '#FCD34D', desc: 'Verifiable phrase extraction' },
              { label: 'Threat Categorization', icon: AlertTriangle, color: '#FB7185', desc: 'Phishing, scams, & social engineering' },
              { label: 'Safe Next Steps', icon: CheckCircle2, color: '#34D399', desc: 'Concrete protective guidance' },
            ].map((item) => (
              <div key={item.label} style={{
                background: 'rgba(6, 18, 34, 0.65)',
                border: '1px solid rgba(59, 130, 246, 0.1)',
                borderRadius: 14,
                padding: '16px 14px',
                textAlign: 'center',
              }}>
                <div style={{
                  width: 42, height: 42,
                  background: `${item.color}1f`,
                  border: `1px solid ${item.color}44`,
                  borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 10px',
                }}>
                  <item.icon size={20} color={item.color} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#F1F5F9', marginBottom: 4 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 12, color: '#94A3B8' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Stats bar if history exists */}
      {stats.total > 0 && (
        <section style={{ padding: '0 24px', marginBottom: 56 }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <div style={{
              background: 'rgba(10, 31, 56, 0.5)',
              border: '1px solid rgba(59, 130, 246, 0.15)',
              borderRadius: 16,
              padding: '20px 32px',
              display: 'flex',
              justifyContent: 'space-around',
              gap: 20,
              flexWrap: 'wrap',
            }}>
              <StatBit label="Analyses Performed" value={stats.total} color="#60A5FA" />
              <StatBit label="High Risk Flagged" value={stats.high_risk} color="#FB7185" />
              <StatBit label="Medium Risk Flagged" value={stats.medium_risk} color="#FCD34D" />
              <StatBit label="Low Risk Verified" value={stats.low_risk} color="#34D399" />
            </div>
          </div>
        </section>
      )}

      {/* WHAT RAKSHAK DETECTS (8 Cards) */}
      <section style={{ padding: '72px 24px', background: 'rgba(6, 18, 34, 0.45)', borderTop: '1px solid rgba(59, 130, 246, 0.1)', borderBottom: '1px solid rgba(59, 130, 246, 0.1)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', color: '#60A5FA', marginBottom: 8 }}>
              CYBERSECURITY THREAT TAXONOMY
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 800,
              color: '#F1F5F9',
              marginBottom: 12,
            }}>
              What Rakshak AI Detects
            </h2>
            <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>
              Eight core digital threat vectors analyzed through transparent deterministic rules and AI-assisted contextual evaluation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 18 }}>
            {whatRakshakDetects.map((threat) => (
              <div key={threat.title} className="glass-card" style={{ padding: 22, transition: 'transform 0.2s', position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{
                    width: 38, height: 38,
                    background: `${threat.color}1a`,
                    border: `1px solid ${threat.color}44`,
                    borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <threat.icon size={18} color={threat.color} />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: 16, color: '#F1F5F9', margin: 0 }}>
                    {threat.title}
                  </h3>
                </div>
                <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>
                  {threat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(26px, 4vw, 38px)',
              fontWeight: 800, color: '#F1F5F9', marginBottom: 12,
            }}>
              How It Works
            </h2>
            <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 540, margin: '0 auto' }}>
              Structured, explainable evaluation pipeline built for transparency.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {features.map((f) => (
              <div key={f.title} className="glass-card" style={{ padding: 26 }}>
                <div style={{
                  width: 44, height: 44,
                  background: 'rgba(37, 99, 235, 0.12)',
                  border: '1px solid rgba(37, 99, 235, 0.25)',
                  borderRadius: 12,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  <f.icon size={20} color="#3B82F6" />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: '#F1F5F9', marginBottom: 8 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6, margin: 0 }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '60px 24px', textAlign: 'center' }}>
        <div style={{
          maxWidth: 680,
          margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(20, 184, 166, 0.08))',
          border: '1px solid rgba(37, 99, 235, 0.25)',
          borderRadius: 24,
          padding: '48px 32px',
        }}>
          <Shield size={44} color="#3B82F6" style={{ marginBottom: 16 }} />
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 30, fontWeight: 800, color: '#F1F5F9', marginBottom: 14,
          }}>
            Analyze Suspicious Content Now
          </h2>
          <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.6, marginBottom: 28, maxWidth: 500, margin: '0 auto 28px' }}>
            Check suspicious SMS alerts, phishing emails, investment offers, or URLs in seconds.
          </p>
          <Link to="/analyze" className="btn-primary" id="cta-analyze-btn" style={{ padding: '14px 32px', fontSize: 15, fontWeight: 700 }}>
            <Shield size={18} />
            Analyze Suspicious Content
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ padding: '0 24px 60px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div className="disclaimer-box">
            <strong style={{ color: '#60A5FA' }}>Disclaimer:</strong> Rakshak AI provides heuristic digital safety and risk indicator analysis.
            It is not an antivirus system, financial adviser, law-enforcement tool, or guarantee of fraud detection.
            Risk scores represent heuristic safety indicators, not mathematical probabilities of fraud.
            Users should always independently verify claims through verified public channels.
          </div>
        </div>
      </section>
    </div>
  );
};

const StatBit: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontSize: 28, fontWeight: 800, color, fontFamily: "'Space Grotesk', sans-serif" }}>
      {value}
    </div>
    <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>{label}</div>
  </div>
);

export default LandingPage;
