import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, Zap, Eye, Lock, AlertTriangle, CheckCircle2,
  Code2, Database, Cpu, Globe, ArrowRight, ShieldAlert, FileText
} from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', padding: '80px 24px 80px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(37, 99, 235, 0.12)',
            border: '1px solid rgba(37, 99, 235, 0.25)',
            borderRadius: 999, padding: '6px 18px', marginBottom: 20,
            fontSize: 13, fontWeight: 700, color: '#60A5FA', letterSpacing: '0.5px'
          }}>
            <Shield size={14} />
            ABOUT RAKSHAK AI · DIGITAL SAFETY & CYBERSECURITY
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, color: '#F1F5F9', marginBottom: 16,
          }}>
            Detect. Understand. Stay Safe.
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.7, maxWidth: 660, margin: '0 auto' }}>
            Rakshak AI is an AI-powered digital safety platform designed to help users recognize suspicious digital content before taking action.
          </p>
        </div>

        {/* Core Positioning Alert */}
        <div style={{
          background: 'rgba(37, 99, 235, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          borderRadius: 16,
          padding: '24px 28px',
          marginBottom: 36,
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#93C5FD', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Shield size={18} />
            HackNowa Global Hackathon 2026 — Digital Safety & Cybersecurity
          </h3>
          <p style={{ fontSize: 14, color: '#CBD5E1', lineHeight: 1.7, margin: 0 }}>
            "Rakshak AI is an AI-powered digital safety platform that analyzes suspicious messages, screenshots, and URLs to identify potential scams, phishing attempts, impersonation, social-engineering tactics, suspicious links, and misleading financial claims. It combines deterministic safety rules with AI-based analysis to identify warning signals, provide evidence, explain the risk in simple language, and recommend safe next steps."
          </p>
        </div>

        {/* Content sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48 }}>

          {/* Problem & Motivation */}
          <div className="glass-card" style={{ padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, background: 'rgba(244, 63, 94, 0.12)', border: '1px solid rgba(244, 63, 94, 0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={20} color="#FB7185" />
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: '#F1F5F9', margin: 0 }}>
                The Digital Safety Challenge
              </h2>
            </div>
            <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.75, margin: 0 }}>
              Digital communication channels — email, SMS, instant messaging, and social media — are bombarded daily with engineered deception.
              Threat actors leverage sophisticated social engineering: urgency, coercive threats of account suspension, fake regulatory affiliations (SEBI, RBI, government agencies), and unverified external links to harvest user credentials or solicit fraudulent payments.
              Traditional binary filters often fail to explain <em>why</em> a message is dangerous, leaving everyday users vulnerable to novel psychological manipulation tactics.
            </p>
          </div>

          {/* Solution & Approach */}
          <div className="glass-card" style={{ padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, background: 'rgba(52, 211, 153, 0.12)', border: '1px solid rgba(52, 211, 153, 0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={20} color="#34D399" />
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: '#F1F5F9', margin: 0 }}>
                Our Evidence-First Methodology
              </h2>
            </div>
            <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>
              Rather than producing an unexplained risk score, Rakshak AI follows an evidence-first architecture:
            </p>
            <div style={{
              background: 'rgba(6, 18, 34, 0.7)',
              border: '1px solid rgba(59, 130, 246, 0.12)',
              borderRadius: 12,
              padding: '16px 20px',
              fontFamily: "'Space Grotesk', monospace",
              fontSize: 13,
              color: '#93C5FD',
              lineHeight: 1.8,
              textAlign: 'center',
            }}>
              USER INPUT → PREPROCESSING → DETERMINISTIC SAFETY RULES + AI ANALYSIS → STRUCTURED EVIDENCE → RISK SCORING → DIGITAL SAFETY REPORT
            </div>
          </div>

          {/* Technology Architecture */}
          <div className="glass-card" style={{ padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, background: 'rgba(59, 130, 246, 0.12)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Code2 size={20} color="#60A5FA" />
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: '#F1F5F9', margin: 0 }}>
                Technical Implementation
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
              {[
                { icon: Cpu, label: 'Hybrid AI Reasoning', desc: 'OpenAI-compatible LLM extracts contextual signals, threat classifications, and plain-language explanations.', color: '#A78BFA' },
                { icon: Zap, label: 'Rule-Based Engine', desc: 'Deterministic regex scoring layer detecting urgency, credential prompts, guaranteed yields, and coercion.', color: '#FCD34D' },
                { icon: Eye, label: 'OCR Pipeline', desc: 'Tesseract OCR engine extracts text from suspicious screenshots (PNG, JPG, WEBP) for threat analysis.', color: '#60A5FA' },
                { icon: Globe, label: 'URL Pattern Intelligence', desc: 'Analyzes structural heuristics, suspicious TLDs (.xyz, .top), non-HTTPS schemes, and deceptive hostnames.', color: '#FB7185' },
                { icon: Database, label: 'Local SQLite History', desc: 'Async SQLAlchemy + aiosqlite database stores timestamped reports and threat categories locally.', color: '#34D399' },
                { icon: Lock, label: 'Data Privacy & Hygiene', desc: 'No credentials stored, local database clearable at will, and deterministic offline demo mode support.', color: '#F97316' },
              ].map(t => (
                <div key={t.label} style={{ padding: '16px 18px', background: 'rgba(6, 18, 34, 0.65)', border: '1px solid rgba(59, 130, 246, 0.1)', borderRadius: 12 }}>
                  <t.icon size={20} color={t.color} style={{ marginBottom: 10 }} />
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#F1F5F9', marginBottom: 6 }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.55 }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Strict Role Boundaries (Section 15 & 23) */}
          <div className="glass-card" style={{ padding: 32, borderColor: 'rgba(244, 63, 94, 0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, background: 'rgba(244, 63, 94, 0.12)', border: '1px solid rgba(244, 63, 94, 0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldAlert size={20} color="#FB7185" />
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: '#F1F5F9', margin: 0 }}>
                What Rakshak AI Is NOT
              </h2>
            </div>
            <p style={{ color: '#FB7185', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
              Rakshak AI is not an antivirus, financial adviser, law-enforcement system, or guarantee of fraud detection.
            </p>
            <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8, color: '#94A3B8', fontSize: 14 }}>
              <li><strong>No Financial Advice:</strong> It does not provide buy/sell/hold stock calls, price targets, or financial portfolio recommendations.</li>
              <li><strong>Not an Antivirus / Endpoint Scanner:</strong> It does not scan local hard drives, inspect binaries, execute shell commands, or run penetration tests.</li>
              <li><strong>Heuristic Indicators:</strong> Risk scores reflect pattern weights, not legal proof that content is fraudulent.</li>
            </ul>
          </div>

          {/* Privacy & Data Storage (Section 15 & 32) */}
          <div className="glass-card" style={{ padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, background: 'rgba(52, 211, 153, 0.12)', border: '1px solid rgba(52, 211, 153, 0.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lock size={20} color="#34D399" />
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: '#F1F5F9', margin: 0 }}>
                Privacy & Data Storage
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, color: '#94A3B8', fontSize: 14, lineHeight: 1.7 }}>
              <p style={{ margin: 0 }}>
                • <strong>What is stored:</strong> Analysis history records the input type, a brief 300-character snippet preview, primary threat type, risk score, and signal count in a local SQLite file (<code>rakshak.db</code>).
              </p>
              <p style={{ margin: 0 }}>
                • <strong>What is never stored:</strong> We do not request or store passwords, OTPs, government IDs, bank credentials, or private API keys.
              </p>
              <p style={{ margin: 0 }}>
                • <strong>User Control:</strong> You can purge your entire history database at any moment using the "Clear History" button on the History page.
              </p>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/analyze" className="btn-primary" id="about-analyze-btn" style={{ padding: '14px 32px', fontSize: 16, fontWeight: 700 }}>
            <Shield size={18} />
            Analyze Suspicious Content
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
