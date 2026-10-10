import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import {
  MessageSquare, Image, Globe, Upload, X, Zap,
  AlertCircle, Shield, CheckCircle, Loader2, Sparkles, ArrowRight
} from 'lucide-react';
import { analyzeText, analyzeImage, analyzeUrl, getDemoScenarios } from '../services/api';
import type { AnalysisResult, InputTab, DemoScenario } from '../types';

interface AnalyzerPageProps {
  onResult: (result: AnalysisResult) => void;
}

const ANALYSIS_STEPS = [
  { key: 'received', label: 'Content received' },
  { key: 'extracting', label: 'Extracting content & indicators' },
  { key: 'detecting', label: 'Detecting threat signals' },
  { key: 'evaluating', label: 'Evaluating evidence & severity' },
  { key: 'preparing', label: 'Preparing Digital Safety Report' },
];

const COMMON_THREATS = [
  'Phishing Links',
  'Impersonation',
  'Urgency & Threats',
  'Fraudulent Offers',
  'Credential Requests',
  'Fake Authority Claims',
  'Financial Scams',
  'Social Engineering',
];

const PRESET_EXAMPLES = [
  {
    tag: 'Phishing',
    label: 'Example 1 — Phishing',
    color: '#FB7185',
    text: 'URGENT: Your bank account will be suspended today. Verify your account immediately using the link below to avoid losing access.',
  },
  {
    tag: 'Impersonation',
    label: 'Example 2 — Impersonation',
    color: '#60A5FA',
    text: 'Your account has been selected for a security verification. Confirm your identity immediately or your account will be permanently locked.',
  },
  {
    tag: 'Financial Scam',
    label: 'Example 3 — Financial Scam',
    color: '#F97316',
    text: 'Invest \u20b910,000 today and receive \u20b950,000 within 30 days with zero risk. Only 10 spots remain.',
  },
  {
    tag: 'Trading Promotion',
    label: 'Example 4 — Suspicious Trading',
    color: '#A78BFA',
    text: "Join our VIP trading channel for daily 99% accuracy stock tips. Doubled money in 2 weeks for all members. Limited spots for tomorrow's jackpot call. Click link to join: https://example.com/vip-jackpot-tips",
  },
  {
    tag: 'Benign Content',
    label: 'Benign Example — Educational',
    color: '#34D399',
    text: 'What is phishing and how can users protect themselves from suspicious links?',
  },
];

const AnalyzerPage: React.FC<AnalyzerPageProps> = ({ onResult }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<InputTab>('text');
  const [textContent, setTextContent] = useState('');
  const [urlContent, setUrlContent] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [error, setError] = useState('');
  const [demoScenarios, setDemoScenarios] = useState<DemoScenario[]>([]);
  const [selectedDemo, setSelectedDemo] = useState('');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    getDemoScenarios().then(setDemoScenarios).catch(() => {});
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
    setError('');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/png': [], 'image/jpeg': [], 'image/webp': [] },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
    onDropRejected: (files) => {
      const err = files[0]?.errors[0];
      if (err?.code === 'file-too-large') setError('Image too large. Maximum size is 10 MB.');
      else if (err?.code === 'file-invalid-type') setError('Unsupported file type. Please upload PNG, JPG, or WEBP.');
      else setError('Could not upload file. Please try again.');
    }
  });

  const simulateSteps = async (fn: () => Promise<AnalysisResult>): Promise<AnalysisResult> => {
    setCurrentStep(0);
    await delay(350);
    setCurrentStep(1);
    await delay(450);
    setCurrentStep(2);
    const result = await fn();
    setCurrentStep(3);
    await delay(350);
    setCurrentStep(4);
    await delay(250);
    return result;
  };

  const handleAnalyze = async () => {
    setError('');
    setAnalyzing(true);
    setCurrentStep(0);

    try {
      let result: AnalysisResult;

      if (activeTab === 'text') {
        if (!textContent.trim()) {
          setError('Please enter a message or offer to analyze.');
          setAnalyzing(false);
          setCurrentStep(-1);
          return;
        }
        result = await simulateSteps(() =>
          analyzeText(textContent, selectedDemo || undefined)
        );
      } else if (activeTab === 'image') {
        if (!imageFile) {
          setError('Please upload an image screenshot to analyze.');
          setAnalyzing(false);
          setCurrentStep(-1);
          return;
        }
        result = await simulateSteps(() => analyzeImage(imageFile));
      } else {
        if (!urlContent.trim()) {
          setError('Please enter a URL to analyze.');
          setAnalyzing(false);
          setCurrentStep(-1);
          return;
        }
        let url = urlContent.trim();
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = 'https://' + url;
        }
        result = await simulateSteps(() => analyzeUrl(url));
      }

      onResult(result);
      navigate('/results');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Analysis failed. Please try again.';
      setError(msg);
      setCurrentStep(-1);
    } finally {
      setAnalyzing(false);
    }
  };

  const loadExample = (text: string, demoId?: string) => {
    setTextContent(text);
    setSelectedDemo(demoId || '');
    setActiveTab('text');
    setCharCount(text.length);
    setError('');
  };

  const tabs: { id: InputTab; label: string; icon: React.ElementType }[] = [
    { id: 'text', label: 'MESSAGE', icon: MessageSquare },
    { id: 'image', label: 'SCREENSHOT', icon: Image },
    { id: 'url', label: 'URL', icon: Globe },
  ];

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', padding: '80px 24px 60px' }}>
      <div style={{ maxWidth: 840, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(37, 99, 235, 0.1)',
            border: '1px solid rgba(37, 99, 235, 0.25)',
            borderRadius: 999, padding: '5px 16px', marginBottom: 16,
            fontSize: 12, fontWeight: 700, color: '#60A5FA',
          }}>
            <Shield size={14} />
            DIGITAL THREAT ANALYSIS ENGINE
          </div>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 800, color: '#F1F5F9', marginBottom: 10,
          }}>
            Analyze Suspicious Content
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 16, lineHeight: 1.6, maxWidth: 580, margin: '0 auto' }}>
            Detect potential scams, phishing and social-engineering threats.
          </p>
        </div>

        {/* Common Threats Rakshak Can Identify */}
        <div style={{
          background: 'rgba(6, 18, 34, 0.5)',
          border: '1px solid rgba(59, 130, 246, 0.12)',
          borderRadius: 14,
          padding: '16px 20px',
          marginBottom: 24,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={14} color="#60A5FA" />
            COMMON THREATS RAKSHAK CAN IDENTIFY
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {COMMON_THREATS.map(t => (
              <span
                key={t}
                style={{
                  fontSize: 12,
                  padding: '4px 10px',
                  borderRadius: 6,
                  background: 'rgba(37, 99, 235, 0.08)',
                  border: '1px solid rgba(59, 130, 246, 0.18)',
                  color: '#CBD5E1',
                  fontWeight: 500,
                }}
              >
                • {t}
              </span>
            ))}
          </div>
        </div>

        {/* Main Demo Scenarios (HackNowa Highlight) */}
        {demoScenarios.length > 0 && (
          <div style={{
            background: 'rgba(37, 99, 235, 0.06)',
            border: '1px solid rgba(37, 99, 235, 0.22)',
            borderRadius: 14,
            padding: '16px 20px',
            marginBottom: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Zap size={16} color="#60A5FA" />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#60A5FA' }}>
                Quick Demo Scenarios
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {demoScenarios.map(scenario => (
                <button
                  key={scenario.id}
                  onClick={() => loadExample(scenario.content, scenario.id)}
                  id={`demo-${scenario.id}`}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 8,
                    border: `1px solid ${selectedDemo === scenario.id ? 'rgba(37, 99, 235, 0.6)' : 'rgba(59, 130, 246, 0.18)'}`,
                    background: selectedDemo === scenario.id ? 'rgba(37, 99, 235, 0.25)' : 'rgba(6, 18, 34, 0.7)',
                    color: selectedDemo === scenario.id ? '#93C5FD' : '#CBD5E1',
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {scenario.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Analyzer Card */}
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid rgba(59, 130, 246, 0.12)',
            padding: '0 12px',
            background: 'rgba(6, 18, 34, 0.4)',
          }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => { setActiveTab(tab.id); setError(''); }}
                id={`tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                role="tab"
                style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.5px' }}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ padding: 28 }}>
            {/* MESSAGE TAB */}
            {activeTab === 'text' && (
              <div>
                <label htmlFor="message-input" style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px', marginBottom: 8 }}>
                  PASTE SUSPICIOUS CONTENT
                </label>
                <textarea
                  id="message-input"
                  className="input-field"
                  value={textContent}
                  onChange={e => {
                    setTextContent(e.target.value);
                    setCharCount(e.target.value.length);
                    setSelectedDemo('');
                    setError('');
                  }}
                  placeholder="Paste a suspicious message, email, SMS, social media message or financial offer..."
                  maxLength={5000}
                  aria-label="Message content to analyze"
                  style={{ minHeight: 180, fontSize: 14 }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                  <div style={{ fontSize: 12, color: '#64748B' }}>
                    Tip: Try pasting messages with urgent deadlines, high returns, or verification links.
                  </div>
                  <span style={{ fontSize: 12, color: charCount > 4500 ? '#FB7185' : '#475569' }}>
                    {charCount} / 5000
                  </span>
                </div>

                {/* Example Quick-Pick Cards */}
                <div style={{ marginTop: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', marginBottom: 8 }}>
                    Or click an example to load:
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 10 }}>
                    {PRESET_EXAMPLES.map((ex, idx) => (
                      <div
                        key={idx}
                        onClick={() => loadExample(ex.text)}
                        style={{
                          padding: '10px 14px',
                          background: 'rgba(6, 18, 34, 0.7)',
                          border: '1px solid rgba(59, 130, 246, 0.1)',
                          borderRadius: 8,
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)'}
                        onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.1)'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: ex.color }} />
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#F1F5F9' }}>{ex.label}</span>
                        </div>
                        <div style={{ fontSize: 11, color: '#94A3B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          "{ex.text}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SCREENSHOT TAB */}
            {activeTab === 'image' && (
              <div>
                <div style={{ marginBottom: 16 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F1F5F9', marginBottom: 4 }}>
                    Analyze Suspicious Screenshot
                  </h3>
                  <p style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>
                    Upload a suspicious message, email, advertisement, social media post or financial offer.
                  </p>
                </div>

                {!imageFile ? (
                  <div
                    {...getRootProps()}
                    className={`drop-zone ${isDragActive ? 'dragging' : ''}`}
                    id="image-dropzone"
                    tabIndex={0}
                    role="button"
                    aria-label="Upload image by clicking or dropping"
                  >
                    <input {...getInputProps()} aria-label="Image file input" />
                    <Upload size={38} color="#3B82F6" style={{ marginBottom: 14, opacity: 0.9 }} />
                    <div style={{ fontWeight: 700, color: '#F1F5F9', fontSize: 15, marginBottom: 6 }}>
                      {isDragActive ? 'Drop image here' : 'Drop screenshot or click to browse'}
                    </div>
                    <div style={{ color: '#64748B', fontSize: 13 }}>
                      Supports PNG, JPG, JPEG, WEBP · Max 10 MB · Automated OCR text extraction
                    </div>
                  </div>
                ) : (
                  <div style={{ position: 'relative' }}>
                    <img
                      src={imagePreview}
                      alt="Uploaded screenshot preview"
                      style={{ width: '100%', maxHeight: 280, objectFit: 'contain', borderRadius: 10, border: '1px solid rgba(59, 130, 246, 0.2)' }}
                    />
                    <div style={{
                      marginTop: 12,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: 'rgba(6, 18, 34, 0.8)', borderRadius: 10, padding: '10px 14px',
                      border: '1px solid rgba(59, 130, 246, 0.1)',
                    }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9' }}>{imageFile.name}</div>
                        <div style={{ fontSize: 12, color: '#64748B' }}>
                          {(imageFile.size / 1024).toFixed(1)} KB · Ready for OCR extraction
                        </div>
                      </div>
                      <button
                        onClick={() => { setImageFile(null); setImagePreview(''); }}
                        className="btn-ghost"
                        style={{ padding: '4px 8px' }}
                        aria-label="Remove uploaded image"
                        id="remove-image-btn"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* URL TAB */}
            {activeTab === 'url' && (
              <div>
                <div style={{ marginBottom: 16 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F1F5F9', marginBottom: 4 }}>
                    Analyze Suspicious URL
                  </h3>
                  <p style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>
                    Check a suspicious link for potential phishing and scam indicators.
                  </p>
                </div>

                <label htmlFor="url-input" style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px', marginBottom: 8 }}>
                  PASTE SUSPICIOUS URL
                </label>
                <div style={{ position: 'relative' }}>
                  <Globe size={18} color="#475569" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input
                    id="url-input"
                    type="url"
                    value={urlContent}
                    onChange={e => { setUrlContent(e.target.value); setError(''); }}
                    placeholder="Paste a suspicious URL..."
                    aria-label="URL to analyze"
                    style={{
                      width: '100%',
                      background: 'rgba(6, 18, 34, 0.8)',
                      border: '1px solid rgba(59, 130, 246, 0.15)',
                      borderRadius: 10,
                      padding: '14px 16px 14px 42px',
                      color: '#F1F5F9',
                      fontSize: 14,
                      outline: 'none',
                      fontFamily: 'Inter, sans-serif',
                      boxSizing: 'border-box',
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.15)'}
                  />
                </div>

                {/* Safe Demo URL helper */}
                <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: '#64748B' }}>Safe test URL:</span>
                  <button
                    onClick={() => setUrlContent('https://example.com/verify-account')}
                    style={{
                      fontSize: 11,
                      padding: '3px 8px',
                      background: 'rgba(37, 99, 235, 0.1)',
                      border: '1px solid rgba(37, 99, 235, 0.3)',
                      color: '#60A5FA',
                      borderRadius: 4,
                      cursor: 'pointer',
                    }}
                  >
                    https://example.com/verify-account
                  </button>
                </div>

                <p style={{ fontSize: 13, color: '#64748B', marginTop: 14, lineHeight: 1.5 }}>
                  Rakshak evaluates structural heuristics, suspicious TLDs, non-HTTPS protocols, and credential-harvesting keywords. It does not execute JavaScript or render active scripts.
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div style={{
                marginTop: 18,
                padding: '12px 16px',
                background: 'rgba(244, 63, 94, 0.08)',
                border: '1px solid rgba(244, 63, 94, 0.25)',
                borderRadius: 10,
                display: 'flex', alignItems: 'center', gap: 10,
              }} role="alert">
                <AlertCircle size={16} color="#FB7185" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: '#FB7185' }}>{error}</span>
              </div>
            )}

            {/* Analysis Progress */}
            {analyzing && (
              <div style={{
                marginTop: 22,
                padding: '20px 24px',
                background: 'rgba(37, 99, 235, 0.05)',
                border: '1px solid rgba(37, 99, 235, 0.18)',
                borderRadius: 12,
              }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#60A5FA', marginBottom: 14 }}>
                  Analyzing content against digital safety heuristics…
                </div>
                {ANALYSIS_STEPS.map((step, i) => (
                  <div
                    key={step.key}
                    className={`progress-step ${i < currentStep ? 'done' : i === currentStep ? 'active' : ''}`}
                  >
                    <div style={{ flexShrink: 0 }}>
                      {i < currentStep
                        ? <CheckCircle size={16} color="#34D399" />
                        : i === currentStep
                          ? <Loader2 size={16} color="#3B82F6" style={{ animation: 'spin 1s linear infinite' }} />
                          : <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid #1E293B' }} />
                      }
                    </div>
                    <span style={{ fontSize: 13 }}>{step.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Analyze Action Button */}
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="btn-primary"
              id="analyze-btn"
              style={{ width: '100%', justifyContent: 'center', marginTop: 24, padding: '14px', fontSize: 15, fontWeight: 700 }}
              aria-label="Start analysis"
            >
              {analyzing ? (
                <>
                  <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  Analyzing…
                </>
              ) : activeTab === 'url' ? (
                <>
                  <Globe size={18} />
                  Analyze URL
                </>
              ) : (
                <>
                  <Shield size={18} />
                  Analyze Suspicious Content
                </>
              )}
            </button>
          </div>
        </div>

        {/* Privacy notice */}
        <div className="disclaimer-box" style={{ marginTop: 22 }}>
          🔒 <strong style={{ color: '#60A5FA' }}>Privacy Guardrail:</strong> Do not submit real passwords, OTPs, or private government documents.
          Content submitted for safety analysis is processed for heuristic evaluation and not shared with third-party advertising brokers.
        </div>
      </div>
    </div>
  );
};

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

export default AnalyzerPage;
