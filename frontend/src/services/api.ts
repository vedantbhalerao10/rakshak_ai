import axios from 'axios';
import type { AnalysisResult, HistoryItem, DemoScenario, HealthStatus, Stats } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 60000,
});

// Intercept errors to show user-friendly messages
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      throw new Error('Unable to connect to the analysis server. Please ensure the backend is running.');
    }
    const detail = error.response?.data?.detail || error.message || 'An unexpected error occurred.';
    throw new Error(detail);
  }
);

export const analyzeText = async (content: string, demoScenarioId?: string): Promise<AnalysisResult> => {
  const response = await api.post<AnalysisResult>('/api/analyze/text', {
    content,
    demo_scenario_id: demoScenarioId || null,
  });
  return response.data;
};

export const analyzeImage = async (file: File): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post<AnalysisResult>('/api/analyze/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const analyzeUrl = async (url: string): Promise<AnalysisResult> => {
  const response = await api.post<AnalysisResult>('/api/analyze/url', { url });
  return response.data;
};

export const sendChatMessage = async (message: string, context?: object): Promise<{ response: string; is_safety_related: boolean }> => {
  const response = await api.post('/api/chat', { message, context });
  return response.data;
};

export const getHistory = async (): Promise<HistoryItem[]> => {
  const response = await api.get<{ history: HistoryItem[] }>('/api/history');
  return response.data.history;
};

export const clearHistory = async (): Promise<void> => {
  await api.delete('/api/history');
};

export const getDemoScenarios = async (): Promise<DemoScenario[]> => {
  const response = await api.get<{ scenarios: DemoScenario[] }>('/api/demo/scenarios');
  return response.data.scenarios;
};

export const getHealth = async (): Promise<HealthStatus> => {
  const response = await api.get<HealthStatus>('/api/health');
  return response.data;
};

export const getStats = async (): Promise<Stats> => {
  const response = await api.get<Stats>('/api/stats');
  return response.data;
};
