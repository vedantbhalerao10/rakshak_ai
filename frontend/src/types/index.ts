// API Types for Rakshak AI

export interface AnalysisSignal {
  type: string;
  label: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  evidence: string;
  explanation: string;
  score_contribution?: number;
}

export interface AnalysisResult {
  risk_level: 'HIGH' | 'MEDIUM' | 'LOW' | 'UNABLE_TO_DETERMINE';
  risk_score: number;
  primary_threat?: string;
  threat_types?: string[];
  summary: string;
  simple_explanation: string;
  signals: AnalysisSignal[];
  safe_actions: string[];
  uncertainty: string;
  input_type: 'text' | 'image' | 'url';
  demo_mode: boolean;
  extracted_text?: string;
  ocr_note?: string;
  url_details?: {
    hostname: string;
    scheme: string;
  };
}

export interface HistoryItem {
  id: number;
  timestamp: string;
  input_type: string;
  content_preview: string;
  threat_type?: string;
  risk_level: string;
  risk_score: number;
  signals_count: number;
  signals_summary: string;
}

export interface DemoScenario {
  id: string;
  label: string;
  content: string;
}

export interface HealthStatus {
  status: string;
  demo_mode: boolean;
  ai_available: boolean;
  version: string;
}

export interface Stats {
  total: number;
  high_risk: number;
  medium_risk: number;
  low_risk: number;
}

export type RiskLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'UNABLE_TO_DETERMINE';
export type InputTab = 'text' | 'image' | 'url';
export type AnalysisStep = 'received' | 'extracting' | 'detecting' | 'evaluating' | 'preparing' | 'done';
