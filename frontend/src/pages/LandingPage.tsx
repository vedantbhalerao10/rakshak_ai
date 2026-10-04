import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Zap, Eye, CheckCircle2, ArrowRight,
  MessageSquare, Image, Globe, AlertTriangle,
  ShieldCheck, ShieldAlert, BookOpen, BarChart3
} from 'lucide-react';
import { getStats } from '../services/api';

const features = [
  {
    icon: MessageSquare,
    title: 'Message Analysis',
    description: 'Paste SMS, WhatsApp, email, or social media investment messages for instant safety analysis.',
  },
  {
    icon: Image,
    title: 'Screenshot Upload',
    description: 'Upload screenshots of suspicious content. Our OCR pipeline extracts and analyzes the text automatically.',
  },
  {
    icon: Globe,
    title: 'Website Check',
    description: 'Submit suspicious URLs. We analyze domain patterns, URL structure, and known phishing indicators.',
  },
  {
    icon: Eye,
    title: 'Evidence First',
    description: 'We don\'t just flag content — we show you exactly what was detected, where, and why it\'s suspicious.',
  },
  {
    icon: BookOpen,
    title: 'Plain English Explanations',
    description: 'Every warning is explained in simple language that anyone can understand, regardless of financial literacy.',
  },
  {
    icon: CheckCircle2,
    title: 'Safe Next Steps',
    description: 'Each analysis includes concrete, actionable steps you can take to protect yourself.',
  },
];

const warningSigns = [
  { label: 'Guaranteed Returns', desc: 'No legitimate investment can guarantee specific returns', color: '#FB7185' },
  { label: 'Urgent Payment Requests', desc: 'Pressure to send money immediately', color: '#F97316' },
  { label: 'Fake Regulatory Claims', desc: 'Unverified SEBI or government approval claims', color: '#FCD34D' },
  { label: 'Phishing Links', desc: 'Suspicious URLs designed to steal credentials', color: '#A78BFA' },
  { label: 'Impersonation', desc: 'Fake identities of banks or officials', color: '#60A5FA' },
  { label: 'Scarcity Tactics', desc: '"Only 3 slots left" pressure tactics', color: '#34D399' },
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
        {/* Glow orbs */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '20%',
          width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <div className="animate-fade-in-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(37, 99, 235, 0.1)',
            border: '1px solid rgba(37, 99, 235, 0.25)',
            borderRadius: 999,
            padding: '6px 16px',
            marginBottom: 28,
            fontSize: 13, fontWeight: 600, color: '#60A5FA',
          }}>
            <Shield size={14} />
            Investor Safety · Detect · Understand · Stay Safe
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up animate-stagger-1" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 800,
            color: '#F1F5F9',
            lineHeight: 1.15,
            marginBottom: 24,
          }}>
            Detect Investment Scams
            <br />
            <span style={{ color: '#3B82F6' }}>Before They Cost You.</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up animate-stagger-2" style={{
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            color: '#94A3B8',
            lineHeight: 1.7,
            marginBottom: 40,
            maxWidth: 640,
            margin: '0 auto 40px',
          }}>
            Rakshak AI analyzes suspicious investment messages, screenshots, and websites
            to identify warning signs and explain the risks — before you act.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in-up animate-stagger-3" style={{
            display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <Link to="/analyze" className="btn-primary" id="hero-analyze-btn" style={{ padding: '14px 32px', fontSize: 16 }}>
              <Shield size={18} />
              Analyze Content
              <ArrowRight size={16} />
            </Link>
            <Link to="/education" className="btn-secondary" id="hero-learn-btn" style={{ padding: '14px 32px', fontSize: 16 }}>
              <BookOpen size={16} />
              Learn How It Works
            </Link>
          </div>
        </div>

        {/* Hero Dashboard Preview */}
        <div className="animate-fade-in-up animate-stagger-4" style={{
          maxWidth: 900, margin: '64px auto 0',
          background: 'rgba(10, 31, 56, 0.6)',
          border: '1px solid rgba(59, 130, 246, 0.15)',
          borderRadius: 24,
          padding: 32,
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[
              { label: 'Investor Safety', icon: Shield, color: '#3B82F6', desc: 'Evidence-first analysis' },
              { label: 'Risk Detection', icon: AlertTriangle, color: '#FB7185', desc: 'Multiple signal types' },
              { label: 'Evidence Found', icon: Eye, color: '#FCD34D', desc: 'Exact phrase detection' },
              { label: 'Safe Actions', icon: CheckCircle2, color: '#34D399', desc: 'Clear next steps' },
            ].map((item) => (
              <div key={item.label} style={{
                background: 'rgba(6, 18, 34, 0.6)',
                border: '1px solid rgba(59, 130, 246, 0.08)',
                borderRadius: 14,
                padding: '20px',
                textAlign: 'center',
              }}>
                <div style={{
                  width: 48, height: 48,
                  background: `${item.color}22`,
                  border: `1px solid ${item.color}44`,
                  borderRadius: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 12px',
                }}>
                  <item.icon size={22} color={item.color} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#F1F5F9', marginBottom: 4 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 12, color: '#64748B' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      {stats.total > 0 && (
        <section style={{ padding: '0 24px', marginBottom: 64 }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{
              background: 'rgba(10, 31, 56, 0.5)',
              border: '1px solid rgba(59, 130, 246, 0.1)',
              borderRadius: 14,
              padding: '20px 32px',
              display: 'flex',
              justifyContent: 'space-around',
              gap: 20,
              flexWrap: 'wrap',
            }}>
              <StatBit label="Analyses" value={stats.total} color="#60A5FA" />
              <StatBit label="High Risk Detected" value={stats.high_risk} color="#FB7185" />
              <StatBit label="Medium Risk" value={stats.medium_risk} color="#FCD34D" />
              <StatBit label="Low Risk" value={stats.low_risk} color="#34D399" />
            </div>
          </div>
        </section>
      )}

      {/* Warning Signs */}
      <section style={{ padding: '60px 24px', background: 'rgba(6, 18, 34, 0.3)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(26px, 4vw, 38px)',
              fontWeight: 700,
              color: '#F1F5F9',
              marginBottom: 12,
            }}>
              What Rakshak AI Detects
            </h2>
            <p style={{ color: '#64748B', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
              Six major categories of investor-safety warning signs, explained clearly.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {warningSigns.map((ws) => (
              <div key={ws.label} className="stat-card">
                <div style={{
                  width: 10, height: 10,
                  background: ws.color,
                  borderRadius: '50%',
                  marginBottom: 12,
                  boxShadow: `0 0 8px ${ws.color}66`,
                }} />
                <div style={{ fontWeight: 600, fontSize: 15, color: '#F1F5F9', marginBottom: 6 }}>
                  {ws.label}
                </div>
                <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>{ws.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(26px, 4vw, 38px)',
              fontWeight: 700, color: '#F1F5F9', marginBottom: 12,
            }}>
              How It Works
            </h2>
            <p style={{ color: '#64748B', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
              Submit → Analyze → Explain → Protect
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {features.map((f, i) => (
              <div key={f.title} className="glass-card" style={{ padding: 28 }}>
                <div style={{
                  width: 48, height: 48,
                  background: 'rgba(37, 99, 235, 0.12)',
                  border: '1px solid rgba(37, 99, 235, 0.2)',
                  borderRadius: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  <f.icon size={22} color="#3B82F6" />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: '#F1F5F9', marginBottom: 8 }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, margin: 0 }}>
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
          maxWidth: 600,
          margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(20, 184, 166, 0.08))',
          border: '1px solid rgba(37, 99, 235, 0.2)',
          borderRadius: 24,
          padding: '48px 32px',
        }}>
          <Shield size={40} color="#3B82F6" style={{ marginBottom: 16 }} />
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 28, fontWeight: 700, color: '#F1F5F9', marginBottom: 16,
          }}>
            Analyze Suspicious Content Now
          </h2>
          <p style={{ color: '#64748B', fontSize: 16, lineHeight: 1.6, marginBottom: 28 }}>
            It takes under 30 seconds. Paste a message, upload a screenshot, or enter a URL.
          </p>
          <Link to="/analyze" className="btn-primary" id="cta-analyze-btn" style={{ padding: '14px 32px', fontSize: 16 }}>
            <Shield size={18} />
            Start Analysis
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section style={{ padding: '0 24px 60px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="disclaimer-box">
            <strong style={{ color: '#60A5FA' }}>Disclaimer:</strong> Rakshak AI provides educational and investor-safety analysis.
            It does not provide investment advice or guarantee that content is fraudulent.
            The risk score is a heuristic safety indicator, not a probability of fraud.
            Users should independently verify important information through authoritative sources.
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
    <div style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>{label}</div>
  </div>
);

export default LandingPage;
