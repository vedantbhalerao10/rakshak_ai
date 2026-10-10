"""
Rakshak AI — Pydantic Models
"""
from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class AnalysisSignal(BaseModel):
    type: str
    label: str
    severity: str  # HIGH, MEDIUM, LOW
    evidence: str
    explanation: str


class AnalysisResult(BaseModel):
    risk_level: str  # HIGH, MEDIUM, LOW, UNABLE_TO_DETERMINE
    risk_score: int = Field(ge=0, le=100)
    primary_threat: str = "Unable to Determine"
    threat_types: list[str] = []
    summary: str
    signals: list[AnalysisSignal] = []
    safe_actions: list[str] = []
    uncertainty: str = ""
    simple_explanation: str = ""
    input_type: str = "text"
    demo_mode: bool = False
    extracted_text: Optional[str] = None
    ocr_note: Optional[str] = None
    url_details: Optional[dict] = None


class TextAnalysisRequest(BaseModel):
    content: str = Field(min_length=1, max_length=5000)
    demo_scenario_id: Optional[str] = None


class URLAnalysisRequest(BaseModel):
    url: str = Field(min_length=1, max_length=2000)


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=1000)
    context: Optional[dict] = None


class ChatResponse(BaseModel):
    response: str
    is_safety_related: bool = True


class HistoryItem(BaseModel):
    id: int
    timestamp: datetime
    input_type: str
    content_preview: str
    threat_type: Optional[str] = "Unable to Determine"
    risk_level: str
    risk_score: int
    signals_count: int
    signals_summary: Optional[str] = None


class HealthResponse(BaseModel):
    status: str
    demo_mode: bool
    ai_available: bool
    version: str = "1.0.0"
