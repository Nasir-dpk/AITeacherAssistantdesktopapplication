"""FastAPI application factory for the AI Teacher Assistant backend."""

import sys

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.api.routes.health import router as health_router
from backend.app.core.config import get_settings

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description=(
        "Phase 01 foundation of the AI Teacher Assistant backend: a health "
        "endpoint plus a minimal, initialization-only CrewAI configuration."
    ),
)

# Allow the Vite dev server and the Tauri WebView to call the API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)


@app.get("/")
def root() -> dict:
    """Friendly index pointing to the health endpoints."""
    return {
        "app": settings.app_name,
        "version": settings.app_version,
        "python": sys.version.split()[0],
        "endpoints": ["/health", "/api/health", "/docs"],
    }
