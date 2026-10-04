import React, { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldAlert, CheckCircle2, ChevronLeft, RotateCcw,
  MessageSquare, Image, Globe, Info, AlertTriangle, Eye
} from 'lucide-react';
import type { AnalysisResult } from '../types';
import RiskCard from '../components/RiskCard';
import SignalCard from '../components/SignalCard';
import AskRakshak from '../components/AskRakshak';
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
      <div style={{ maxWidth: 860, margin: '0 auto' }} ref={contentRef}>

        {/* Back / Re-analyze */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 999, background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.15)' }}>
              <InputIcon size={14} color="#60A5FA" />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#60A5FA' }}>
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
              Analyze Again
            </button>
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(22px, 3vw, 32px)',
            fontWeight: 800, color: '#F1F5F9', marginBottom: 8,
          }}>
            Investor Safety Report
          </h1>
          <p style={{ color: '#64748B', fontSize: 14 }}>
            Evidence-first analysis · Not investment advice
          </p>
        </div>

        {/* Risk Card */}
        <div style={{ marginBottom: 28 }}>
          <RiskCard
            riskLevel={result.risk_level}
            riskScore={result.risk_score}
            summary={result.summary}
          />
        </div>

        {/* Simple Explanation */}
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
                Why is this suspicious?
              </h2>
            </div>
            <p style={{ margin: 0, fontSize: 15, color: 'rgba(203, 213, 225, 0.85)', lineHeight: 1.75 }}>
              {result.simple_explanation}
            </p>
          </div>
        )}

        {/* Warning Signals */}
        <section style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <AlertTriangle size={20} color={getRiskColor(result.risk_level)} />
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: '#F1F5F9', margin: 0 }}>
              Warning Signals
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
              <div style={{ fontSize: 14, color: '#64748B', maxWidth: 400, margin: '0 auto' }}>
                This content does not appear to contain the warning patterns typically associated with investment fraud. Exercise independent judgment.
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

        {/* Evidence Section */}
        {result.extracted_text && (
          <div className="glass-card animate-fade-in-up" style={{ padding: 28, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Eye size={18} color="#FCD34D" />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: '#F1F5F9', margin: 0 }}>
                Extracted Text (OCR)
              </h2>
            </div>
            <div style={{
              background: 'rgba(6, 18, 34, 0.6)', borderRadius: 10, padding: '16px',
              border: '1px solid rgba(59, 130, 246, 0.1)', fontSize: 14, color: '#CBD5E1', lineHeight: 1.7,
            }}>
              {result.extracted_text}
            </div>
          </div>
        )}

        {/* Evidence Highlighting */}
        {result.signals.length > 0 && (
          <div className="glass-card animate-fade-in-up" style={{ padding: 28, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Eye size={18} color="#FCD34D" />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: '#F1F5F9', margin: 0 }}>
                Evidence Detected
              </h2>
            </div>
            <p style={{ fontSize: 13, color: '#475569', marginBottom: 14 }}>
              Highlighted phrases are the specific evidence detected by the safety analysis.
            </p>
            <div
              style={{
                background: 'rgba(6, 18, 34, 0.6)', borderRadius: 10, padding: '16px',
                border: '1px solid rgba(59, 130, 246, 0.1)',
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
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <CheckCircle2 size={20} color="#34D399" />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: '#F1F5F9', margin: 0 }}>
                What Should You Do?
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
                    animationDelay: `${i * 0.1}s`, opacity: 0,
                  }}
                >
                  <div style={{
                    width: 26, height: 26,
                    background: 'rgba(52, 211, 153, 0.15)',
                    borderRadius: 8, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: '#34D399',
                  }}>
                    {i + 1}
                  </div>
                  <p style={{ margin: 0, fontSize: 14, color: 'rgba(203, 213, 225, 0.85)', lineHeight: 1.6 }}>
                    {action}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Uncertainty */}
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
                <div style={{ fontSize: 12, fontWeight: 600, color: '#60A5FA', marginBottom: 4 }}>SYSTEM LIMITATIONS</div>
                <p style={{ margin: 0, fontSize: 13, color: '#94A3B8', lineHeight: 1.6 }}>{result.uncertainty}</p>
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="disclaimer-box">
          <strong style={{ color: '#60A5FA' }}>Disclaimer:</strong> Rakshak AI provides educational and investor-safety analysis only.
          It does not provide investment advice or guarantee that content is fraudulent.
          The risk score ({result.risk_score}/100) is a heuristic safety indicator, not a probability of fraud.
          Users should independently verify important information through authoritative sources.
        </div>

        {/* Score explanation */}
        <div style={{ marginTop: 12, padding: '12px 16px', background: 'rgba(6, 18, 34, 0.4)', borderRadius: 10, fontSize: 12, color: '#475569' }}>
          Score ranges: 0–24 = Low · 25–59 = Medium · 60–100 = High. The score reflects the number and severity of warning patterns detected, not the probability of fraud.
        </div>
      </div>

      {/* Ask Rakshak floating assistant */}
      <AskRakshak analysisContext={result} />
    </div>
  );
};

export default ResultsPage;
