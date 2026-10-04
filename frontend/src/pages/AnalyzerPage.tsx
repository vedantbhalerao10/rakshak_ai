import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import {
  MessageSquare, Image, Globe, Upload, X, Zap,
  ChevronDown, AlertCircle, Shield, CheckCircle, Loader2
} from 'lucide-react';
import { analyzeText, analyzeImage, analyzeUrl, getDemoScenarios } from '../services/api';
import type { AnalysisResult, InputTab, DemoScenario } from '../types';

interface AnalyzerPageProps {
  onResult: (result: AnalysisResult) => void;
}

const ANALYSIS_STEPS = [
  { key: 'received', label: 'Content received' },
  { key: 'extracting', label: 'Extracting information' },
  { key: 'detecting', label: 'Detecting warning signs' },
  { key: 'evaluating', label: 'Evaluating evidence' },
  { key: 'preparing', label: 'Preparing safety report' },
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
    await delay(400);
    setCurrentStep(1);
    await delay(500);
    setCurrentStep(2);
    const result = await fn();
    setCurrentStep(3);
    await delay(400);
    setCurrentStep(4);
    await delay(300);
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
          setError('Please enter a message to analyze.');
          setAnalyzing(false);
          setCurrentStep(-1);
          return;
        }
        result = await simulateSteps(() =>
          analyzeText(textContent, selectedDemo || undefined)
        );
      } else if (activeTab === 'image') {
        if (!imageFile) {
          setError('Please upload an image to analyze.');
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

  const loadDemoScenario = (scenarioId: string) => {
    const scenario = demoScenarios.find(s => s.id === scenarioId);
    if (scenario) {
      setTextContent(scenario.content);
      setSelectedDemo(scenarioId);
      setActiveTab('text');
      setCharCount(scenario.content.length);
    }
  };

  const tabs: { id: InputTab; label: string; icon: React.ElementType }[] = [
    { id: 'text', label: 'Message', icon: MessageSquare },
    { id: 'image', label: 'Screenshot', icon: Image },
    { id: 'url', label: 'Website URL', icon: Globe },
  ];

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', padding: '80px 24px 48px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 36, textAlign: 'center' }}>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 800, color: '#F1F5F9', marginBottom: 12,
          }}>
            Check Before You Trust
          </h1>
          <p style={{ color: '#64748B', fontSize: 16, lineHeight: 1.6, maxWidth: 500, margin: '0 auto' }}>
            Submit suspicious financial content and identify potential warning signs before taking action.
          </p>
        </div>

        {/* Demo Scenario Selector */}
        {demoScenarios.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{
              background: 'rgba(37, 99, 235, 0.05)',
              border: '1px solid rgba(37, 99, 235, 0.15)',
              borderRadius: 14,
              padding: '16px 20px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Zap size={16} color="#60A5FA" />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#60A5FA' }}>
                  Try a Demo Scenario
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {demoScenarios.map(scenario => (
                  <button
                    key={scenario.id}
                    onClick={() => loadDemoScenario(scenario.id)}
                    id={`demo-${scenario.id}`}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 8,
                      border: `1px solid ${selectedDemo === scenario.id ? 'rgba(37, 99, 235, 0.5)' : 'rgba(59, 130, 246, 0.15)'}`,
                      background: selectedDemo === scenario.id ? 'rgba(37, 99, 235, 0.15)' : 'rgba(6, 18, 34, 0.6)',
                      color: selectedDemo === scenario.id ? '#60A5FA' : '#94A3B8',
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
          </div>
        )}

        {/* Main Analyzer Card */}
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid rgba(59, 130, 246, 0.1)',
            padding: '0 8px',
            overflowX: 'auto',
          }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => { setActiveTab(tab.id); setError(''); setSelectedDemo(''); }}
                id={`tab-${tab.id}`}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ padding: 28 }}>
            {/* TEXT TAB */}
            {activeTab === 'text' && (
              <div>
                <label htmlFor="message-input" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#94A3B8', marginBottom: 10 }}>
                  PASTE MESSAGE CONTENT
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
                  placeholder="Paste an SMS, WhatsApp message, email, social media post, or investment advertisement here..."
                  maxLength={5000}
                  aria-label="Message content to analyze"
                  style={{ minHeight: 180 }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                  <span style={{ fontSize: 12, color: charCount > 4500 ? '#FB7185' : '#475569' }}>
                    {charCount} / 5000
                  </span>
                </div>
              </div>
            )}

            {/* IMAGE TAB */}
            {activeTab === 'image' && (
              <div>
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
                    <Upload size={40} color="#3B82F6" style={{ marginBottom: 16, opacity: 0.8 }} />
                    <div style={{ fontWeight: 600, color: '#F1F5F9', fontSize: 15, marginBottom: 8 }}>
                      {isDragActive ? 'Drop image here' : 'Upload Screenshot'}
                    </div>
                    <div style={{ color: '#64748B', fontSize: 13 }}>
                      Drag and drop or click to select · PNG, JPG, WEBP · Max 10 MB
                    </div>
                  </div>
                ) : (
                  <div style={{ position: 'relative' }}>
                    <img
                      src={imagePreview}
                      alt="Uploaded screenshot preview"
                      style={{ width: '100%', maxHeight: 280, objectFit: 'contain', borderRadius: 10, border: '1px solid rgba(59, 130, 246, 0.15)' }}
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
                          {(imageFile.size / 1024).toFixed(1)} KB
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
                <label htmlFor="url-input" style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#94A3B8', marginBottom: 10 }}>
                  ENTER WEBSITE URL
                </label>
                <div style={{ position: 'relative' }}>
                  <Globe size={18} color="#475569" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                  <input
                    id="url-input"
                    type="url"
                    value={urlContent}
                    onChange={e => { setUrlContent(e.target.value); setError(''); }}
                    placeholder="https://example.com/investment-offer"
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
                <p style={{ fontSize: 13, color: '#475569', marginTop: 10, lineHeight: 1.5 }}>
                  We analyze the URL structure and domain patterns. We do not visit or execute the website.
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{
                marginTop: 16,
                padding: '12px 16px',
                background: 'rgba(244, 63, 94, 0.08)',
                border: '1px solid rgba(244, 63, 94, 0.2)',
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
                marginTop: 24,
                padding: '20px 24px',
                background: 'rgba(37, 99, 235, 0.05)',
                border: '1px solid rgba(37, 99, 235, 0.15)',
                borderRadius: 12,
              }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#60A5FA', marginBottom: 16 }}>
                  Analyzing content…
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

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="btn-primary"
              id="analyze-btn"
              style={{ width: '100%', justifyContent: 'center', marginTop: 24, padding: '14px' }}
              aria-label="Start analysis"
            >
              {analyzing ? (
                <>
                  <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  Analyzing…
                </>
              ) : (
                <>
                  <Shield size={18} />
                  Analyze Content
                </>
              )}
            </button>
          </div>
        </div>

        {/* Privacy note */}
        <div className="disclaimer-box" style={{ marginTop: 20 }}>
          🔒 <strong style={{ color: '#60A5FA' }}>Privacy Notice:</strong> Do not submit OTPs, passwords, PINs, or sensitive personal information.
          Content submitted for analysis is not stored beyond what is needed for the safety report.
        </div>
      </div>
    </div>
  );
};

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

export default AnalyzerPage;
