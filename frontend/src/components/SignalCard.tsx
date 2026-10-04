import React from 'react';
import type { AnalysisSignal } from '../types';
import { AlertTriangle, AlertOctagon, Info, ChevronDown, ChevronUp } from 'lucide-react';

interface SignalCardProps {
  signal: AnalysisSignal;
  index: number;
}

const SignalCard: React.FC<SignalCardProps> = ({ signal, index }) => {
  const [expanded, setExpanded] = React.useState(true);

  const severityConfig = {
    HIGH: { color: '#FB7185', bg: 'rgba(244, 63, 94, 0.08)', border: 'rgba(244, 63, 94, 0.2)', label: 'HIGH', icon: AlertOctagon },
    MEDIUM: { color: '#FCD34D', bg: 'rgba(251, 191, 36, 0.08)', border: 'rgba(251, 191, 36, 0.2)', label: 'MEDIUM', icon: AlertTriangle },
    LOW: { color: '#6EE7B7', bg: 'rgba(52, 211, 153, 0.08)', border: 'rgba(52, 211, 153, 0.2)', label: 'LOW', icon: Info },
  };

  const config = severityConfig[signal.severity] || severityConfig.MEDIUM;
  const SeverityIcon = config.icon;

  return (
    <div
      className="animate-fade-in-up"
      style={{
        background: config.bg,
        border: `1px solid ${config.border}`,
        borderRadius: 14,
        overflow: 'hidden',
        animationDelay: `${index * 0.1}s`,
        opacity: 0,
      }}
    >
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'inherit',
          textAlign: 'left',
          gap: 12,
        }}
        aria-expanded={expanded}
        id={`signal-${signal.type}-${index}`}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36,
            background: `rgba(${config.color === '#FB7185' ? '244,63,94' : config.color === '#FCD34D' ? '251,191,36' : '52,211,153'}, 0.15)`,
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <SeverityIcon size={18} color={config.color} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: '#F1F5F9' }}>{signal.label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.8px',
                color: config.color,
                background: `${config.bg}`,
                border: `1px solid ${config.border}`,
                padding: '1px 8px', borderRadius: 999,
              }}>
                {config.label} SEVERITY
              </span>
            </div>
          </div>
        </div>
        <div style={{ color: '#64748B', flexShrink: 0 }}>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {/* Content */}
      {expanded && (
        <div style={{ padding: '0 20px 20px' }}>
          {/* Evidence */}
          <div style={{
            background: 'rgba(0,0,0,0.25)',
            borderRadius: 8,
            padding: '10px 14px',
            marginBottom: 14,
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#94A3B8', letterSpacing: '0.5px', marginBottom: 4 }}>
              EVIDENCE DETECTED
            </div>
            <div style={{
              fontSize: 14,
              color: '#FCD34D',
              fontStyle: 'italic',
              lineHeight: 1.5,
            }}>
              "{signal.evidence}"
            </div>
          </div>

          {/* Explanation */}
          <p style={{
            margin: 0,
            fontSize: 14,
            color: 'rgba(203, 213, 225, 0.85)',
            lineHeight: 1.7,
          }}>
            {signal.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default SignalCard;
