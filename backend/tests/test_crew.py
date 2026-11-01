"""Tests for the minimal CrewAI Agent & Crew configuration (Phase 01)."""

from backend.app.crew.crew import build_teaching_assistant_crew, crew_summary


def test_crewai_package_imports() -> None:
    import crewai

    assert hasattr(crewai, "Agent")
    assert hasattr(crewai, "Crew")
    assert hasattr(crewai, "Task")
    assert hasattr(crewai, "Process")


def test_minimal_agent_and_crew_construct_without_llm_calls() -> None:
    crew = build_teaching_assistant_crew()
    # One agent, one task, wired sequentially — but never kicked off.
    assert len(crew.agents) == 1
    assert len(crew.tasks) == 1
    assert crew.agents[0].role == "AI Teaching Assistant"
    # Tasks reference the teaching assistant agent.
    assert crew.tasks[0].agent is crew.agents[0]


def test_crew_summary_reports_initialized_crew() -> None:
    summary = crew_summary()
    assert summary["initialized"] is True, summary.get("error", summary)
    assert summary["agents"] == ["AI Teaching Assistant"]
