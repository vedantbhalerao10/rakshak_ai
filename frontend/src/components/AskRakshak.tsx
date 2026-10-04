import React, { useState, useRef } from 'react';
import { sendChatMessage } from '../services/api';
import { MessageCircle, Send, X, Shield, MinusSquare } from 'lucide-react';
import type { AnalysisResult } from '../types';

interface AskRakshakProps {
  analysisContext?: AnalysisResult;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AskRakshak: React.FC<AskRakshakProps> = ({ analysisContext }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I can help explain the warning signs detected in this analysis — what they mean, why they matter, and what safe steps you can take. I cannot provide investment recommendations or predict investment outcomes.",
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const res = await sendChatMessage(userMsg, analysisContext ? {
        risk_level: analysisContext.risk_level,
        signals: analysisContext.signals.map(s => s.type),
      } : undefined);
      setMessages(prev => [...prev, { role: 'assistant', content: res.response }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm unable to process that request right now. Please try again."
      }]);
    } finally {
      setLoading(false);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          id="ask-rakshak-btn"
          aria-label="Open Ask Rakshak assistant"
          style={{
            position: 'fixed',
            bottom: 28,
            right: 28,
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563EB, #14B8A6)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)',
            zIndex: 999,
            transition: 'transform 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <MessageCircle size={24} color="white" />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            bottom: 28,
            right: 28,
            width: 380,
            maxWidth: 'calc(100vw - 40px)',
            height: 520,
            background: '#061222',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            animation: 'fadeInUp 0.3s ease',
          }}
          role="dialog"
          aria-label="Ask Rakshak safety assistant"
          aria-modal="true"
        >
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32,
                background: 'linear-gradient(135deg, #2563EB, #14B8A6)',
                borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Shield size={16} color="white" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#F1F5F9' }}>Ask Rakshak</div>
                <div style={{ fontSize: 11, color: '#64748B' }}>Safety explanations only</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="btn-ghost"
              style={{ padding: '4px 8px' }}
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{
                  maxWidth: '85%',
                  padding: '10px 14px',
                  borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: msg.role === 'user'
                    ? 'linear-gradient(135deg, #2563EB, #1D4ED8)'
                    : 'rgba(10, 31, 56, 0.8)',
                  border: msg.role === 'user' ? 'none' : '1px solid rgba(59, 130, 246, 0.1)',
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: '#F1F5F9',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '14px 14px 14px 4px',
                  background: 'rgba(10, 31, 56, 0.8)',
                  border: '1px solid rgba(59, 130, 246, 0.1)',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <div className="spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />
                  <span style={{ fontSize: 13, color: '#64748B' }}>Thinking…</span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Disclaimer */}
          <div style={{
            padding: '8px 16px',
            fontSize: 11,
            color: '#475569',
            textAlign: 'center',
            borderTop: '1px solid rgba(59, 130, 246, 0.05)',
          }}>
            Safety explanations only · No investment advice
          </div>

          {/* Input */}
          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid rgba(59, 130, 246, 0.1)',
            display: 'flex', gap: 8,
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about a warning sign..."
              aria-label="Chat message input"
              id="chat-input"
              style={{
                flex: 1,
                background: 'rgba(6, 18, 34, 0.8)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                borderRadius: 10,
                padding: '10px 14px',
                color: '#F1F5F9',
                fontSize: 13,
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || loading}
              className="btn-primary"
              style={{ padding: '10px 14px', flexShrink: 0 }}
              aria-label="Send message"
              id="chat-send-btn"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AskRakshak;
