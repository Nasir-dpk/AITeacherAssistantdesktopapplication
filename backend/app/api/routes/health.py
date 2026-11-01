"""Health-check endpoints used by the desktop frontend and tests."""

import sys

from fastapi import APIRouter

from backend.app.core.config import get_settings
from backend.app.crew.crew import crew_summary

settings = get_settings()
router = APIRouter(tags=["health"])


@router.get("/health")
def health() -> dict:
    """Lightweight liveness probe."""
    return {
        "status": "ok",
        "app": settings.app_name,
        "version": settings.app_version,
    }


@router.get("/api/health")
def detailed_health() -> dict:
    """Detailed health information, including CrewAI initialization status."""
    return {
        "status": "ok",
        "app": settings.app_name,
        "version": settings.app_version,
        "environment": settings.environment,
        "python": sys.version.split()[0],
        "crew": crew_summary(),
    }
