"""Minimal CrewAI Agent & Crew configuration (verification only).

Phase 01 requirement: verify that CrewAI can be imported and that an Agent and
Crew can be constructed. No AI task is executed and no LLM provider is
contacted — the crew is only assembled.

The agent/task definitions live in `backend/app/crew/config/*.yaml` so later
phases can extend the crew without touching this assembly code.
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

import yaml

from backend.app.core.config import get_settings

CONFIG_DIRECTORY = Path(__file__).resolve().parent / "config"


def _load_yaml_config(name: str) -> dict[str, Any]:
    with (CONFIG_DIRECTORY / name).open("r", encoding="utf-8") as handle:
        return yaml.safe_load(handle)


def build_teaching_assistant_crew() -> Any:
    """Assemble the minimal Phase 01 teaching-assistant crew.

    Returns constructed `crewai.Crew` (agents + tasks are wired, but the crew
    is never kicked off here — no AI provider calls happen in Phase 01).
    Raises `ImportError`/`ModuleNotFoundError` if CrewAI is not installed.
    """
    # Imported lazily so the health endpoint keeps working without the AI stack
    # and so importing this module is cheap for tests.
    from crewai import Agent, Crew, Process, Task

    settings = get_settings()
    agents_config: dict[str, Any] = _load_yaml_config("agents.yaml")
    tasks_config: dict[str, Any] = _load_yaml_config("tasks.yaml")

    teaching_agent_config = agents_config["teaching_assistant"]
    agent = Agent(
        role=teaching_agent_config["role"],
        goal=teaching_agent_config["goal"],
        backstory=teaching_agent_config["backstory"],
        verbose=False,
        allow_delegation=False,
    )

    task_config = tasks_config["prepare_lesson"]
    task = Task(
        description=task_config["description"],
        expected_output=task_config["expected_output"],
        agent=agent,
    )

    return Crew(
        agents=[agent],
        tasks=[task],
        process=Process.sequential,
        verbose=False,
    )


def crew_summary() -> dict[str, Any]:
    """Initialize the crew and return a serializable status summary.

    Never raises for missing CrewAI — surfaces the problem as data so the
    health endpoint stays useful in partially installed environments.
    """
    settings = get_settings()
    try:
        crew = build_teaching_assistant_crew()
        return {
            "initialized": True,
            "agents": [str(agent.role) for agent in crew.agents],
            "process": getattr(crew.process, "value", str(crew.process)),
        }
    except (ImportError, ModuleNotFoundError) as error:  # CrewAI not installed
        return {"initialized": False, "agents": [], "error": f"CrewAI not available: {error}"}
    except Exception as error:  # noqa: BLE001 - surface any init problem as data
        return {"initialized": False, "agents": [], "error": str(error)}
