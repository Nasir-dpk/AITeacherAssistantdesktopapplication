"""CrewAI integration (minimal, initialization-only in Phase 01).

The `crewai` package is imported lazily so the API can still serve the health
endpoint even if the AI stack is not installed. No LLM provider is contacted
during initialization; kick-offs belong to later phases.
"""
