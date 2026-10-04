import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHistory, clearHistory, getStats } from '../services/api';
import type { HistoryItem, Stats } from '../types';
import {
  Clock, Trash2, MessageSquare, Image, Globe, Shield,
  BarChart3, TrendingUp, AlertTriangle, CheckCircle2, RefreshCw
} from 'lucide-react';
import { getRiskColor, getRiskBgColor, getRiskBorderColor, getRiskLabel, formatTimestamp, getInputTypeLabel } from '../utils/helpers';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, high_risk: 0, medium_risk: 0, low_risk: 0 });
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [h, s] = await Promise.all([getHistory(), getStats()]);
      setHistory(h);
      setStats(s);
    } catch {
      setError('Unable to load history. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleClear = async () => {
    setClearing(true);
    try {
      await clearHistory();
      setHistory([]);
      setStats({ total: 0, high_risk: 0, medium_risk: 0, low_risk: 0 });
      setShowConfirm(false);
    } catch {
      setError('Failed to clear history. Please try again.');
    } finally {
      setClearing(false);
    }
  };

  const chartData = [
    { name: 'High Risk', value: stats.high_risk, color: '#FB7185' },
    { name: 'Medium Risk', value: stats.medium_risk, color: '#FCD34D' },
    { name: 'Low Risk', value: stats.low_risk, color: '#34D399' },
  ].filter(d => d.value > 0);

  const getInputIcon = (type: string) => {
    if (type === 'image') return Image;
    if (type === 'url') return Globe;
    return MessageSquare;
  };

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', padding: '80px 24px 80px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#F1F5F9', marginBottom: 6 }}>
              Analysis History
            </h1>
            <p style={{ color: '#64748B', fontSize: 14 }}>Your recent investor-safety analyses</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <button onClick={load} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: 6 }} id="refresh-history-btn">
              <RefreshCw size={16} />
              Refresh
            </button>
            {history.length > 0 && (
              <button
                onClick={() => setShowConfirm(true)}
                className="btn-secondary"
                style={{ color: '#FB7185', borderColor: 'rgba(244, 63, 94, 0.3)', fontSize: 13, padding: '7px 14px' }}
                id="clear-history-btn"
              >
                <Trash2 size={15} />
                Clear History
              </button>
            )}
          </div>
        </div>

        {/* Stats Dashboard */}
        {stats.total > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 28 }}>
            <div className="stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <BarChart3 size={18} color="#60A5FA" />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>TOTAL ANALYSES</span>
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#60A5FA', fontFamily: "'Space Grotesk', sans-serif" }}>
                {stats.total}
              </div>
            </div>
            <div className="stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <AlertTriangle size={18} color="#FB7185" />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>HIGH RISK</span>
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#FB7185', fontFamily: "'Space Grotesk', sans-serif" }}>
                {stats.high_risk}
              </div>
            </div>
            <div className="stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <TrendingUp size={18} color="#FCD34D" />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>MEDIUM RISK</span>
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#FCD34D', fontFamily: "'Space Grotesk', sans-serif" }}>
                {stats.medium_risk}
              </div>
            </div>
            <div className="stat-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <CheckCircle2 size={18} color="#34D399" />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>LOW RISK</span>
              </div>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#34D399', fontFamily: "'Space Grotesk', sans-serif" }}>
                {stats.low_risk}
              </div>
            </div>
          </div>
        )}

        {/* Pie Chart */}
        {chartData.length > 0 && (
          <div className="glass-card" style={{ padding: 24, marginBottom: 28 }}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: '#F1F5F9', marginBottom: 16 }}>
              Risk Distribution
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <ResponsiveContainer width="100%" height={160} style={{ maxWidth: 200 }}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={75}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#061222', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 8, color: '#F1F5F9' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {chartData.map(d => (
                  <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: '#CBD5E1' }}>
                      {d.name}: <strong style={{ color: d.color }}>{d.value}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Confirm Delete */}
        {showConfirm && (
          <div style={{
            marginBottom: 20,
            padding: '20px 24px',
            background: 'rgba(244, 63, 94, 0.08)',
            border: '1px solid rgba(244, 63, 94, 0.25)',
            borderRadius: 14,
          }}>
            <p style={{ color: '#F1F5F9', fontWeight: 600, marginBottom: 16 }}>
              Are you sure you want to clear all analysis history? This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={handleClear}
                disabled={clearing}
                className="btn-primary"
                style={{ background: 'linear-gradient(135deg, #F43F5E, #DC2626)', fontSize: 13, padding: '8px 18px' }}
                id="confirm-clear-btn"
              >
                {clearing ? 'Clearing…' : 'Yes, Clear All'}
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="btn-ghost"
                id="cancel-clear-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={{
            padding: '14px 18px', background: 'rgba(244, 63, 94, 0.08)',
            border: '1px solid rgba(244, 63, 94, 0.2)', borderRadius: 10, marginBottom: 20,
            color: '#FB7185', fontSize: 14,
          }} role="alert">
            {error}
          </div>
        )}

        {/* History List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div className="spinner" style={{ margin: '0 auto 16px' }} />
            <p style={{ color: '#64748B' }}>Loading history…</p>
          </div>
        ) : history.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px 24px',
            background: 'rgba(10, 31, 56, 0.4)',
            border: '1px solid rgba(59, 130, 246, 0.08)',
            borderRadius: 20,
          }}>
            <Clock size={48} color="#1E3A5F" style={{ marginBottom: 16 }} />
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F1F5F9', marginBottom: 10 }}>No analyses yet</h3>
            <p style={{ color: '#64748B', fontSize: 14, maxWidth: 300, margin: '0 auto 24px' }}>
              Your analysis history will appear here after you analyze content.
            </p>
            <Link to="/analyze" className="btn-primary">
              <Shield size={16} />
              Analyze Content
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {history.map((item, i) => {
              const InputIcon = getInputIcon(item.input_type);
              const riskColor = getRiskColor(item.risk_level);
              return (
                <div
                  key={item.id}
                  className="animate-fade-in-up"
                  style={{
                    background: 'rgba(10, 31, 56, 0.5)',
                    border: `1px solid ${getRiskBorderColor(item.risk_level)}`,
                    borderRadius: 14,
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    flexWrap: 'wrap',
                    animationDelay: `${i * 0.05}s`,
                    opacity: 0,
                  }}
                >
                  {/* Input type icon */}
                  <div style={{
                    width: 40, height: 40,
                    background: 'rgba(37, 99, 235, 0.1)',
                    borderRadius: 10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <InputIcon size={18} color="#60A5FA" />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ fontSize: 14, color: '#CBD5E1', lineHeight: 1.4, marginBottom: 6 }}>
                      {item.content_preview.length > 80 ? item.content_preview.slice(0, 80) + '…' : item.content_preview}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 11, color: '#475569' }}>
                        {getInputTypeLabel(item.input_type)}
                      </span>
                      <span style={{ fontSize: 11, color: '#2A3F5F' }}>·</span>
                      <span style={{ fontSize: 11, color: '#475569' }}>
                        {formatTimestamp(item.timestamp)}
                      </span>
                      {item.signals_count > 0 && (
                        <>
                          <span style={{ fontSize: 11, color: '#2A3F5F' }}>·</span>
                          <span style={{ fontSize: 11, color: '#94A3B8' }}>
                            {item.signals_count} signal{item.signals_count !== 1 ? 's' : ''}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Risk badge */}
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6,
                    flexShrink: 0,
                  }}>
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      background: getRiskBgColor(item.risk_level),
                      border: `1px solid ${getRiskBorderColor(item.risk_level)}`,
                      borderRadius: 999, padding: '4px 12px',
                      fontSize: 11, fontWeight: 700, color: riskColor,
                    }}>
                      {item.risk_score}
                    </div>
                    <span style={{
                      fontSize: 11, fontWeight: 600, color: riskColor,
                      letterSpacing: '0.5px',
                    }}>
                      {getRiskLabel(item.risk_level)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
