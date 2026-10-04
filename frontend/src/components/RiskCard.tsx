import React from 'react';
import { getRiskColor, getRiskBgColor, getRiskBorderColor, getRiskLabel, getRiskIcon } from '../utils/helpers';
import type { RiskLevel } from '../types';

interface RiskCardProps {
  riskLevel: RiskLevel;
  riskScore: number;
  summary: string;
  compact?: boolean;
}

const RiskCard: React.FC<RiskCardProps> = ({ riskLevel, riskScore, summary, compact = false }) => {
  const color = getRiskColor(riskLevel);
  const bgColor = getRiskBgColor(riskLevel);
  const borderColor = getRiskBorderColor(riskLevel);
  const label = getRiskLabel(riskLevel);
  const IconComponent = getRiskIcon(riskLevel);

  // SVG ring gauge
  const radius = compact ? 40 : 60;
  const stroke = compact ? 6 : 8;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (riskScore / 100) * circumference;
  const svgSize = (radius + stroke) * 2;

  return (
    <div
      className="animate-fade-in-up"
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 20,
        padding: compact ? '20px 24px' : '32px 36px',
        display: 'flex',
        alignItems: 'center',
        gap: compact ? 20 : 36,
        flexWrap: 'wrap',
      }}
    >
      {/* Score Ring */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <svg width={svgSize} height={svgSize} viewBox={`0 0 ${svgSize} ${svgSize}`}>
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={stroke}
          />
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${svgSize / 2} ${svgSize / 2})`}
            style={{ transition: 'stroke-dashoffset 1s ease' }}
          />
        </svg>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: compact ? 20 : 28,
            fontWeight: 800,
            color,
            lineHeight: 1,
            fontFamily: "'Space Grotesk', sans-serif",
          }}>
            {riskScore}
          </div>
          {!compact && (
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>/100</div>
          )}
        </div>
      </div>

      {/* Label + Summary */}
      <div style={{ flex: 1, minWidth: 200 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <IconComponent size={compact ? 20 : 24} color={color} />
          <span style={{
            fontSize: compact ? 16 : 22,
            fontWeight: 800,
            color,
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: '0.5px',
          }}>
            {label}
          </span>
        </div>
        <p style={{
          margin: 0,
          color: 'rgba(241, 245, 249, 0.75)',
          fontSize: compact ? 13 : 15,
          lineHeight: 1.6,
        }}>
          {summary}
        </p>
      </div>
    </div>
  );
};

export default RiskCard;
