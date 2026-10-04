import { type RiskLevel } from '../types';
import { ShieldAlert, ShieldCheck, ShieldQuestion, AlertTriangle } from 'lucide-react';

export const getRiskColor = (level: RiskLevel | string): string => {
  switch (level) {
    case 'HIGH': return '#FB7185';
    case 'MEDIUM': return '#FCD34D';
    case 'LOW': return '#6EE7B7';
    default: return '#94A3B8';
  }
};

export const getRiskBgColor = (level: RiskLevel | string): string => {
  switch (level) {
    case 'HIGH': return 'rgba(244, 63, 94, 0.12)';
    case 'MEDIUM': return 'rgba(251, 191, 36, 0.12)';
    case 'LOW': return 'rgba(52, 211, 153, 0.12)';
    default: return 'rgba(148, 163, 184, 0.12)';
  }
};

export const getRiskBorderColor = (level: RiskLevel | string): string => {
  switch (level) {
    case 'HIGH': return 'rgba(244, 63, 94, 0.3)';
    case 'MEDIUM': return 'rgba(251, 191, 36, 0.3)';
    case 'LOW': return 'rgba(52, 211, 153, 0.3)';
    default: return 'rgba(148, 163, 184, 0.3)';
  }
};

export const getRiskLabel = (level: RiskLevel | string): string => {
  switch (level) {
    case 'HIGH': return 'HIGH RISK';
    case 'MEDIUM': return 'MEDIUM RISK';
    case 'LOW': return 'LOW RISK';
    case 'UNABLE_TO_DETERMINE': return 'UNABLE TO DETERMINE';
    default: return level;
  }
};

export const getRiskIcon = (level: RiskLevel | string) => {
  switch (level) {
    case 'HIGH': return ShieldAlert;
    case 'MEDIUM': return AlertTriangle;
    case 'LOW': return ShieldCheck;
    default: return ShieldQuestion;
  }
};

export const formatTimestamp = (ts: string): string => {
  const date = new Date(ts);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getInputTypeLabel = (type: string): string => {
  switch (type) {
    case 'text': return 'Message';
    case 'image': return 'Screenshot';
    case 'url': return 'Website URL';
    default: return type;
  }
};

export const highlightEvidence = (text: string, signals: Array<{ evidence: string }>): string => {
  if (!signals || signals.length === 0) return text;
  let result = text;
  for (const signal of signals) {
    if (signal.evidence && signal.evidence.length > 2) {
      const escaped = signal.evidence.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      result = result.replace(
        new RegExp(escaped, 'gi'),
        (match) => `<mark class="evidence-highlight">${match}</mark>`
      );
    }
  }
  return result;
};

export const truncate = (str: string, len: number): string => {
  if (str.length <= len) return str;
  return str.slice(0, len) + '…';
};
