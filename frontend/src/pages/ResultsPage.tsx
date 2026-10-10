import React, { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldAlert, CheckCircle2, ChevronLeft, RotateCcw,
  MessageSquare, Image, Globe, Info, AlertTriangle, Eye, ShieldCheck, Tag
} from 'lucide-react';
import type { AnalysisResult } from '../types';
import RiskCard from '../components/RiskCard';
import SignalCard from '../components/SignalCard';
import { highlightEvidence, getRiskColor, getInputTypeLabel } from '../utils/helpers';

interface ResultsPageProps {
  result: AnalysisResult | null;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ result }) => {
  const navigate = useNavigate();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!result) {
    return (
      <div style={{ paddingTop: 64, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <ShieldAlert size={48} color="#64748B" />
        <h2 style={{ color: '#F1F5F9', fontFamily: "'Space Grotesk', sans-serif" }}>No Analysis Found</h2>
        <p style={{ color: '#64748B' }}>Please submit content for analysis first.</p>
        <Link to="/analyze" className="btn-primary">
          <ShieldAlert size={16} />
          Go to Analyzer
        </Link>
      </div>
    );
  }

  const inputTypeIcon = result.input_type === 'image' ? Image : result.input_type === 'url' ? Globe : MessageSquare;
  const InputIcon = inputTypeIcon;

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', padding: '80px 24px 80px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }} ref={contentRef}>

        {/* Back / Re-analyze Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <button
            onClick={() => navigate('/analyze')}
            className="btn-ghost"
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            id="back-to-analyzer-btn"
          >
            <ChevronLeft size={18} />
            Back to Analyzer
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 999, background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.15)' }}>
              <InputIcon size={14} color="#60A5FA" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#60A5FA' }}>
                {getInputTypeLabel(result.input_type)}
              </span>
            </div>
            <button
              onClick={() => navigate('/analyze')}
              className="btn-secondary"
              style={{ fontSize: 13, padding: '6px 14px' }}
              id="analyze-again-btn"
            >
              <RotateCcw size={14} />
              Analyze Another
            </button>
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(37, 99, 235, 0.12)',
            border: '1px solid rgba(37, 99, 235, 0.25)',
            borderRadius: 999, padding: '4px 14px', marginBottom: 12,
            fontSize: 12, fontWeight: 700, color: '#60A5FA', letterSpacing: '0.5px'
          }}>
            <ShieldCheck size={14} />
            EVIDENCE-BASED CYBERSECURITY EVALUATION
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 800, color: '#F1F5F9', marginBottom: 8,
          }}>
            DIGITAL SAFETY REPORT
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 14 }}>
            Heuristic Safety Indicator · Detect. Understand. Stay Safe.
          </p>
        </div>

        {/* Primary Risk Card */}
        <div style={{ marginBottom: 28 }}>
          <RiskCard
            riskLevel={result.risk_level}
            riskScore={result.risk_score}
            summary={result.summary}
            primaryThreat={result.primary_threat}
          />
        </div>

        {/* Primary Threat Categories Breakdown */}
        {result.threat_types && result.threat_types.length > 0 && result.threat_types[0] !== 'Unable to Determine' && (
          <div className="glass-card animate-fade-in-up" style={{ padding: '18px 24px', marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#94A3B8', fontSize: 12, fontWeight: 700 }}>
                <Tag size={14} color="#60A5FA" />
                IDENTIFIED THREAT CATEGORIES:
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {result.threat_types.map((type, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'rgba(37, 99, 235, 0.12)',
                      border: '1px solid rgba(59, 130, 246, 0.25)',
                      borderRadius: 6,
                      padding: '3px 10px',
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#93C5FD',
                    }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Screenshot OCR Text Section */}
        {result.input_type === 'image' && (
          <div className="glass-card animate-fade-in-up" style={{ padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Eye size={18} color="#60A5FA" />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: '#F1F5F9', margin: 0 }}>
                Text extracted from image (OCR)
              </h2>
            </div>
            {result.extracted_text ? (
              <div style={{
                background: 'rgba(6, 18, 34, 0.7)', borderRadius: 10, padding: '14px 16px',
                border: '1px solid rgba(59, 130, 246, 0.12)', fontSize: 14, color: '#CBD5E1', lineHeight: 1.7,
              }}>
                {result.extracted_text}
              </div>
            ) : (
              <div style={{ fontSize: 13, color: '#94A3B8' }}>
                {result.ocr_note || 'No readable text could be extracted from this image.'}
              </div>
            )}
          </div>
        )}

        {/* URL Breakdown Section */}
        {result.input_type === 'url' && result.url_details && (
          <div className="glass-card animate-fade-in-up" style={{ padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <Globe size={18} color="#60A5FA" />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: '#F1F5F9', margin: 0 }}>
                Domain & URL Indicators
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              <div style={{ background: 'rgba(6, 18, 34, 0.7)', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>HOST / DOMAIN</div>
                <div style={{ fontSize: 14, color: '#F1F5F9', fontWeight: 600, marginTop: 2 }}>{result.url_details.hostname}</div>
              </div>
              <div style={{ background: 'rgba(6, 18, 34, 0.7)', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                <div style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>PROTOCOL</div>
                <div style={{ fontSize: 14, color: result.url_details.scheme === 'https' ? '#34D399' : '#FB7185', fontWeight: 600, marginTop: 2 }}>
                  {result.url_details.scheme.toUpperCase()} {result.url_details.scheme === 'http' && '(Non-secure)'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Why Is This Suspicious? */}
        {result.simple_explanation && (
          <div className="glass-card animate-fade-in-up" style={{ padding: 28, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 32, height: 32, background: 'rgba(59, 130, 246, 0.12)', borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Info size={17} color="#60A5FA" />
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: '#F1F5F9', margin: 0 }}>
                Why This Is Suspicious
              </h2>
            </div>
            <p style={{ margin: 0, fontSize: 15, color: 'rgba(203, 213, 225, 0.9)', lineHeight: 1.75 }}>
              {result.simple_explanation}
            </p>
          </div>
        )}

        {/* Warning Signals */}
        <section style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <AlertTriangle size={20} color={getRiskColor(result.risk_level)} />
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: '#F1F5F9', margin: 0 }}>
              Warning Signals Detected
              {result.signals.length > 0 && (
                <span style={{
                  marginLeft: 10,
                  background: 'rgba(244, 63, 94, 0.15)',
                  color: '#FB7185',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  borderRadius: 999,
                  padding: '2px 10px',
                  fontSize: 13,
                  fontWeight: 700,
                }}>
                  {result.signals.length}
                </span>
              )}
            </h2>
          </div>

          {result.signals.length === 0 ? (
            <div style={{
              padding: '28px 24px',
              background: 'rgba(52, 211, 153, 0.06)',
              border: '1px solid rgba(52, 211, 153, 0.15)',
              borderRadius: 14,
              textAlign: 'center',
            }}>
              <CheckCircle2 size={32} color="#34D399" style={{ marginBottom: 12 }} />
              <div style={{ fontWeight: 600, fontSize: 15, color: '#F1F5F9', marginBottom: 6 }}>No Significant Warning Signs Detected</div>
              <div style={{ fontSize: 14, color: '#94A3B8', maxWidth: 440, margin: '0 auto' }}>
                This content does not exhibit the deceptive patterns commonly associated with phishing or scam campaigns. Always maintain standard digital safety habits.
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {result.signals.map((signal, index) => (
                <SignalCard key={`${signal.type}-${index}`} signal={signal} index={index} />
              ))}
            </div>
          )}
        </section>

        {/* Exact Evidence Highlighting */}
        {result.signals.length > 0 && (
          <div className="glass-card animate-fade-in-up" style={{ padding: 28, marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <Eye size={18} color="#FCD34D" />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: '#F1F5F9', margin: 0 }}>
                Exact Evidence
              </h2>
            </div>
            <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 14 }}>
              Phrases highlighted below triggered specific deterministic threat detection rules:
            </p>
            <div
              style={{
                background: 'rgba(6, 18, 34, 0.7)', borderRadius: 10, padding: '16px',
                border: '1px solid rgba(59, 130, 246, 0.12)',
                fontSize: 15, color: '#CBD5E1', lineHeight: 1.9,
              }}
              dangerouslySetInnerHTML={{
                __html: highlightEvidence(
                  result.extracted_text || result.signals.map(s => s.evidence).join(' … '),
                  result.signals
                )
              }}
            />
          </div>
        )}

        {/* Safe Next Steps */}
        {result.safe_actions.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <CheckCircle2 size={20} color="#34D399" />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: '#F1F5F9', margin: 0 }}>
                WHAT SHOULD YOU DO?
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {result.safe_actions.map((action, i) => (
                <div
                  key={i}
                  className="animate-fade-in-up"
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 14,
                    background: 'rgba(52, 211, 153, 0.06)',
                    border: '1px solid rgba(52, 211, 153, 0.15)',
                    borderRadius: 12, padding: '14px 18px',
                    animationDelay: `${i * 0.08}s`,
                  }}
                >
                  <div style={{
                    width: 24, height: 24,
                    background: 'rgba(52, 211, 153, 0.15)',
                    borderRadius: 6, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 700, color: '#34D399',
                  }}>
                    ✓
                  </div>
                  <p style={{ margin: 0, fontSize: 14, color: 'rgba(203, 213, 225, 0.9)', lineHeight: 1.6 }}>
                    {action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Uncertainty / System Limitations */}
        {result.uncertainty && (
          <div style={{
            padding: '16px 20px',
            background: 'rgba(59, 130, 246, 0.05)',
            border: '1px solid rgba(59, 130, 246, 0.15)',
            borderRadius: 12, marginBottom: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <Info size={16} color="#60A5FA" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#60A5FA', letterSpacing: '0.5px', marginBottom: 4 }}>
                  SYSTEM ANALYSIS LIMITATIONS
                </div>
                <p style={{ margin: 0, fontSize: 13, color: '#94A3B8', lineHeight: 1.6 }}>{result.uncertainty}</p>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="disclaimer-box">
          <strong style={{ color: '#60A5FA' }}>DISCLAIMER:</strong> Risk scores are heuristic safety indicators, not proof that content is fraudulent.
          Rakshak AI does not provide financial or legal advice. Always independently verify important claims through authoritative sources.
        </div>

        {/* Score explanation */}
        <div style={{ marginTop: 12, padding: '12px 16px', background: 'rgba(6, 18, 34, 0.5)', borderRadius: 10, fontSize: 12, color: '#64748B' }}>
          Score ranges: 0–24 = Low Risk · 25–59 = Medium Risk · 60–100 = High Risk. The score reflects detected heuristic threat patterns, not a mathematical probability of fraud.
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
