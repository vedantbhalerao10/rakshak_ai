"""
Rakshak AI — Database Layer
SQLite using SQLAlchemy async
"""
import os
from datetime import datetime
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy import String, Integer, DateTime, Text, select, delete

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./rakshak.db")

engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


class AnalysisRecord(Base):
    __tablename__ = "analyses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    input_type: Mapped[str] = mapped_column(String(20))
    content_preview: Mapped[str] = mapped_column(String(300))
    risk_level: Mapped[str] = mapped_column(String(30))
    risk_score: Mapped[int] = mapped_column(Integer)
    signals_count: Mapped[int] = mapped_column(Integer, default=0)
    signals_summary: Mapped[str] = mapped_column(Text, default="")


async def init_db():
    """Create database tables."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def save_analysis(
    input_type: str,
    content_preview: str,
    risk_level: str,
    risk_score: int,
    signals: list
) -> int:
    """Save an analysis result to the database. Returns the new record ID."""
    signals_summary = ", ".join(s.get("label", s.get("type", "")) for s in signals[:5])

    record = AnalysisRecord(
        timestamp=datetime.utcnow(),
        input_type=input_type,
        content_preview=content_preview[:300],
        risk_level=risk_level,
        risk_score=risk_score,
        signals_count=len(signals),
        signals_summary=signals_summary
    )

    async with AsyncSessionLocal() as session:
        session.add(record)
        await session.commit()
        await session.refresh(record)
        return record.id


async def get_history(limit: int = 50) -> list:
    """Retrieve analysis history, most recent first."""
    async with AsyncSessionLocal() as session:
        result = await session.execute(
            select(AnalysisRecord).order_by(AnalysisRecord.timestamp.desc()).limit(limit)
        )
        records = result.scalars().all()
        return [
            {
                "id": r.id,
                "timestamp": r.timestamp.isoformat(),
                "input_type": r.input_type,
                "content_preview": r.content_preview,
                "risk_level": r.risk_level,
                "risk_score": r.risk_score,
                "signals_count": r.signals_count,
                "signals_summary": r.signals_summary,
            }
            for r in records
        ]


async def clear_history() -> int:
    """Delete all history records. Returns count deleted."""
    async with AsyncSessionLocal() as session:
        result = await session.execute(delete(AnalysisRecord))
        await session.commit()
        return result.rowcount


async def get_stats() -> dict:
    """Return summary statistics."""
    async with AsyncSessionLocal() as session:
        all_result = await session.execute(select(AnalysisRecord))
        records = all_result.scalars().all()

        total = len(records)
        high = sum(1 for r in records if r.risk_level == "HIGH")
        medium = sum(1 for r in records if r.risk_level == "MEDIUM")
        low = sum(1 for r in records if r.risk_level == "LOW")

        return {
            "total": total,
            "high_risk": high,
            "medium_risk": medium,
            "low_risk": low
        }
