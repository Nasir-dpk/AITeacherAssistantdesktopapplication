"""Application settings, loaded from the process environment and `.env`."""
from __future__ import annotations

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime configuration. Every value can be overridden via environment
    variables or a root-level `.env` file (see `.env.example`)."""

    app_name: str = "AI Teacher Assistant API"
    app_version: str = "0.1.0"
    environment: str = "development"

    # Address uvicorn binds to for local development.
    backend_host: str = "127.0.0.1"
    backend_port: int = 8000

    # Comma-separated list of allowed CORS origins. The desktop WebView origin
    # is `tauri://localhost` (and `http://tauri.localhost` on Windows).
    cors_origins_csv: str = (
        "http://localhost:5173,http://tauri.localhost,tauri://localhost"
    )

    # CrewAI model hint for later phases. Initialization never contacts a
    # provider; kickoffs would require the user's own local credentials.
    crew_model: str = "gpt-4o-mini"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        env_prefix="APP_",
        extra="ignore",
    )

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins_csv.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
