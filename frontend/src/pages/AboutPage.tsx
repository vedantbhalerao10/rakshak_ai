import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Zap, Eye, Lock, AlertTriangle, CheckCircle2,
  Code2, Database, Cpu, Globe, ArrowRight
} from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', padding: '80px 24px 80px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(37, 99, 235, 0.1)',
            border: '1px solid rgba(37, 99, 235, 0.25)',
            borderRadius: 999, padding: '6px 16px', marginBottom: 20,
            fontSize: 13, fontWeight: 600, color: '#60A5FA',
          }}>
            <Shield size={14} />
            About Rakshak AI
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#F1F5F9', marginBottom: 16,
          }}>
            Detect. Understand. Stay Safe.
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.7, maxWidth: 620, margin: '0 auto' }}>
            Rakshak AI is an evidence-first investor-safety prototype designed to help people recognize potential
            fraud and misleading financial content before they become victims.
          </p>
        </div>

        {/* Mission sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 48 }}>

          {/* Problem */}
          <div className="glass-card" style={{ padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, background: 'rgba(244, 63, 94, 0.12)', border: '1px solid rgba(244, 63, 94, 0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={20} color="#FB7185" />
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: '#F1F5F9', margin: 0 }}>
                The Problem
              </h2>
            </div>
            <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.75, margin: 0 }}>
              Millions of retail investors — especially those new to investing — receive suspicious investment messages
              through WhatsApp, SMS, and social media every day. These messages use psychological tactics like guaranteed
              returns, urgency, fake regulatory claims, and impersonation to manipulate people into making harmful financial
              decisions. Without the tools or knowledge to assess these messages critically, many people lose money to
              investment fraud.
            </p>
          </div>

          {/* Solution */}
          <div className="glass-card" style={{ padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, background: 'rgba(52, 211, 153, 0.12)', border: '1px solid rgba(52, 211, 153, 0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={20} color="#34D399" />
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: '#F1F5F9', margin: 0 }}>
                Our Approach
              </h2>
            </div>
            <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>
              Rakshak AI is an <em style={{ color: '#60A5FA' }}>evidence-first investor-safety assistant</em> that detects
              potential warning signals, explains the evidence behind them, and guides users toward safer next steps.
            </p>
            <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.75, margin: 0 }}>
              We don't simply tell you something is a scam. We show you exactly what was detected, where it was found in
              the submitted content, why it is a warning sign, and what you should independently verify. This approach
              builds financial literacy alongside protection.
            </p>
          </div>

          {/* Technology */}
          <div className="glass-card" style={{ padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Code2 size={20} color="#60A5FA" />
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: '#F1F5F9', margin: 0 }}>
                Technology
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
              {[
                { icon: Cpu, label: 'AI Analysis', desc: 'OpenAI-compatible LLM for structured evidence extraction', color: '#A78BFA' },
                { icon: Zap, label: 'Risk Engine', desc: 'Transparent rule-based scoring layer with defined signal weights', color: '#FCD34D' },
                { icon: Eye, label: 'OCR Pipeline', desc: 'Text extraction from uploaded screenshots using Tesseract', color: '#60A5FA' },
                { icon: Database, label: 'Local History', desc: 'SQLite database for analysis history and statistics', color: '#34D399' },
                { icon: Globe, label: 'URL Analysis', desc: 'Pattern-based domain and URL structure analysis', color: '#FB7185' },
                { icon: Lock, label: 'Privacy First', desc: 'No credentials stored, history deletable, minimal data retention', color: '#F97316' },
              ].map(t => (
                <div key={t.label} style={{ padding: '14px 16px', background: 'rgba(6, 18, 34, 0.6)', border: '1px solid rgba(59, 130, 246, 0.08)', borderRadius: 12 }}>
                  <t.icon size={18} color={t.color} style={{ marginBottom: 8 }} />
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9', marginBottom: 4 }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.5 }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Principles */}
          <div className="glass-card" style={{ padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, background: 'rgba(251, 191, 36, 0.12)', border: '1px solid rgba(251, 191, 36, 0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={20} color="#FCD34D" />
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: '#F1F5F9', margin: 0 }}>
                Safety Principles
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Evidence First', desc: 'Every warning is backed by specific phrases detected in the submitted content.' },
                { label: 'No Investment Advice', desc: 'Rakshak AI never recommends investments, predicts returns, or suggests financial products.' },
                { label: 'Uncertainty Acknowledged', desc: 'We distinguish between detected warning signs and confirmed fraud. We never overclaim certainty.' },
                { label: 'Simple English', desc: 'Every explanation is written for someone with limited financial literacy, not for experts.' },
                { label: 'Privacy by Design', desc: 'Do not submit OTPs, passwords, PINs, or bank credentials. History is deletable at any time.' },
                { label: 'Transparent Scoring', desc: 'The risk score formula is visible in documentation. It is a heuristic indicator, not a fraud probability.' },
              ].map(p => (
                <div key={p.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3B82F6', flexShrink: 0, marginTop: 7 }} />
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#F1F5F9' }}>{p.label}: </span>
                    <span style={{ fontSize: 14, color: '#94A3B8' }}>{p.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Limitations */}
          <div style={{
            padding: 28,
            background: 'rgba(251, 191, 36, 0.05)',
            border: '1px solid rgba(251, 191, 36, 0.15)',
            borderRadius: 16,
          }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: '#F1F5F9', marginBottom: 14 }}>
              Known Limitations
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'AI analysis cannot establish fraudulent intent with certainty — it identifies warning patterns.',
                'OCR text extraction may miss or misread text in low-quality images.',
                'URL analysis is structural only — it does not visit or execute website code.',
                'The rule-based risk engine uses pattern matching; sophisticated fraud may avoid detection.',
                'Demo mode uses deterministic scenarios — AI mode requires a valid API key.',
                'The application is a hackathon prototype and has not undergone security audit.',
              ].map((lim, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <AlertTriangle size={14} color="#FCD34D" style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.6 }}>{lim}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Demo note */}
          <div style={{
            padding: 24,
            background: 'rgba(59, 130, 246, 0.05)',
            border: '1px solid rgba(59, 130, 246, 0.15)',
            borderRadius: 14,
          }}>
            <h3 style={{ fontWeight: 700, fontSize: 15, color: '#F1F5F9', marginBottom: 8 }}>For Developers</h3>
            <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              This prototype includes deterministic demo scenarios for reliable demonstration without API dependency.
              When <code style={{ background: 'rgba(59,130,246,0.1)', padding: '1px 6px', borderRadius: 4, fontSize: 12 }}>DEMO_MODE=true</code> is
              set, the rule-based analysis engine is used. Demo scenarios are clearly documented in the source code.
              The application architecture is designed for easy extension to support real AI analysis, additional languages,
              and more scam categories.
            </p>
          </div>

        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/analyze" className="btn-primary" id="about-analyze-btn" style={{ padding: '14px 32px', fontSize: 16 }}>
            <Shield size={18} />
            Start Analyzing Content
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
