import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AnalyzerPage from './pages/AnalyzerPage';
import ResultsPage from './pages/ResultsPage';
import EducationPage from './pages/EducationPage';
import HistoryPage from './pages/HistoryPage';
import AboutPage from './pages/AboutPage';
import type { AnalysisResult } from './types';

// Footer component
const Footer: React.FC = () => (
  <footer style={{
    borderTop: '1px solid rgba(59, 130, 246, 0.08)',
    padding: '28px 24px',
    marginTop: 'auto',
    background: 'rgba(2, 11, 24, 0.6)',
  }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 13, color: '#475569' }}>🛡️</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#64748B' }}>Rakshak AI</span>
        <span style={{ fontSize: 13, color: '#2A3F5F' }}>·</span>
        <span style={{ fontSize: 13, color: '#475569' }}>Detect. Understand. Stay Safe.</span>
      </div>
      <div style={{ fontSize: 12, color: '#2A3F5F' }}>
        Not investment advice · Educational and safety analysis only · SANGYAN Hackathon Prototype
      </div>
    </div>
  </footer>
);

const AppContent: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const location = useLocation();

  // Scroll to top on route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/analyze" element={<AnalyzerPage onResult={setAnalysisResult} />} />
          <Route path="/results" element={<ResultsPage result={analysisResult} />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
