"""Tests for the FastAPI health-check endpoints."""

from fastapi.testclient import TestClient

from backend.app.main import app

client = TestClient(app)


def test_root_endpoint_returns_app_metadata() -> None:
    response = client.get("/")
    assert response.status_code == 200
    payload = response.json()
    assert payload["app"].startswith("AI Teacher Assistant")
    assert payload["endpoints"] == ["/health", "/api/health", "/docs"]


def test_health_endpoint_responds_ok() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ok"
    assert payload["app"].startswith("AI Teacher Assistant")
    assert payload["version"]


def test_detailed_health_reports_environment_and_crew() -> None:
    response = client.get("/api/health")
    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ok"
    assert payload["environment"]
    # CrewAI should be importable in this environment (installed from
    # requirements.txt); if a dependency were missing the endpoint still
    # returns 200 and surfaces the problem as data.
    assert "crew" in payload
    crew_payload = payload.get("crew", {})
    assert isinstance(crew_payload, dict)
