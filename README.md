# AI Teacher Assistant — Desktop Application

Cross-platform desktop application for teachers, built with **Tauri 2 (desktop shell)**, **React 19 + TypeScript (frontend)**, **Tailwind CSS 4 (styling)**, and a **FastAPI + CrewAI (Python) backend** with a SQLite-ready architecture planned for data persistence.

> **Current status: Phase 01 — Foundation, Installation & Setup ✅**
> This phase delivers the project skeleton, a placeholder desktop screen, the FastAPI health endpoint, and a minimal (initialization-only) CrewAI agent/crew configuration.

---

## Project Structure

```
.
├── src/                        # React + TypeScript frontend
│   ├── api/client.ts           # Frontend-to-backend communication client
│   ├── components/…            # (future Phase 02+ UI components)
│   ├── __tests__/              # Vitest + Testing Library tests
│   ├── App.tsx                 # Phase 01 placeholder screen
│   └── main.tsx                # React entry point
├── src-tauri/                  # Tauri 2 desktop shell (Rust)
│   ├── src/                    # Rust entry points
│   ├── tauri.conf.json         # Window, dev URL, bundle config
│   ├── capabilities/           # Tauri permission capabilities
│   └── icons/                  # Generated app icons (all platforms)
├── backend/                    # Python backend
│   ├── app/main.py             # FastAPI application (CORS + health routes)
│   ├── app/api/routes/         # HTTP routes (/health, /api/health)
│   ├── app/core/config.py      # Settings via environment / .env file
│   ├── app/crew/               # Minimal CrewAI agent & crew (YAML config)
│   └── tests/                  # pytest + FastAPI TestClient tests
├── scripts/                    # Dev utilities (icon generator, screenshots)
├── docs/evidence/              # Verification evidence (screenshots, logs)
├── .env.example                # Environment template — copy to `.env`
├── requirements.txt            # Python backend dependencies
└── package.json                # Frontend + Tauri CLI dependencies
```

## Prerequisites

| Tool | Required version | Check |
|---|---|---|
| Node.js | 18+ (20/22 recommended) | `node --version` |
| npm | 9+ | `npm --version` |
| Python | 3.10+ (3.12 recommended) | `python --version` |
| Rust & Cargo | stable (Tauri requires it) | `cargo --version` |
| MSVC Build Tools | Visual Studio 2022 Build Tools with the **Desktop development with C++** workload (Windows only) | — |
| WebView2 | Evergreen runtime (pre-installed on Windows 10/11) | — |

### Installing prerequisites (one-time, Windows)

```powershell
# Rust toolchain (per-user install, no admin needed)
# Download https://win.rustup.rs/x86_64 then:
rustup-init.exe -y --default-toolchain stable-x86_64-pc-windows-msvc --profile minimal

# MSVC Build Tools (requires admin/UAC)
winget install --id Microsoft.VisualStudio.2022.BuildTools --override `
  "--quiet --wait --add Microsoft.VisualStudio.Workload.VCTools --includeRecommended"
```

Linux: `curl https://sh.rustup.rs -sSf | sh` plus system webkit dependencies (`tauri` docs). macOS: `curl https://sh.rustup.rs -sSf | sh` + Xcode command line tools.

## Installation

```powershell
# 1) Frontend + Tauri CLI dependencies (Node)
npm install

# 2) Backend dependencies (isolated venv, Python 3.10+)
python -m venv .venv
.venv\Scripts\Activate.ps1          # (bash: source .venv/Scripts/activate)
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

# 3) Environment file (optional — sane defaults work out of the box)
Copy-Item .env.example .env
```

## Running the Application

**Desktop app (Tauri) — dev mode.** This starts the Tauri window with the Vite dev server; start the backend in a second terminal to show live backend status:

```powershell
# Terminal 1 — FastAPI backend (http://127.0.0.1:8000)
# .venv activated
npm run backend:dev
#    equivalent: python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload

# Terminal 2 — Tauri desktop window (Vite dev server on http://localhost:5173)
npm run tauri dev
```

**Frontend only (browser):** `npm run dev` → http://localhost:5173 (calls are proxied to the backend, see `vite.config.ts`).

**Backend only:** `npm run backend:dev` → verify with http://127.0.0.1:8000/health or `/api/health` (interactive docs at `/docs`).

**Production build of the desktop app:**

```powershell
npm run tauri build    # compiles Rust + bundles installers into src-tauri/target
```

For packaged builds set `VITE_API_BASE_URL=http://127.0.0.1:8000` in `.env` so the WebView can reach the backend (CORS already allows the Tauri origin).

## Tests

```powershell
# Frontend (Vitest + jsdom + Testing Library)
npm test

# Backend (pytest, FastAPI TestClient, CrewAI initialization checks)
# .venv activated
npm run backend:test
```

## Phase 01 Verification Checklist

| Item | Verify with | Expected |
|---|---|---|
| Tauri desktop app launches | `npm run tauri dev` | Desktop window shows the placeholder screen |
| React frontend runs | `npm run dev` → http://localhost:5173 | UI renders; `npm run build` succeeds |
| FastAPI health endpoint | `curl http://127.0.0.1:8000/api/health` | JSON `{"status": "ok", …}` |
| CrewAI imports & initializes | `npm run backend:test` | `test_crew.py::test_crew_summary_reports_initialized_crew` passes |
| Dependencies installed & documented | `npm install`, `pip install -r requirements.txt` | exit code 0 |
| No secrets exposed | — | No API keys in the repo; `.env` git-ignored; only `.env.example` committed |

Note on CrewAI: Phase 01 only **constructs** the agent/crew (`backend/app/crew/crew.py`) to verify integration — no AI task is executed and no LLM provider is contacted. Kickoffs (with credentials the user supplies locally via `.env`) come in later phases.

## Phase 02+ Roadmap

- Real UI: lesson planner, chat scheduling, and curriculum views (Phase 02)
- CrewAI task execution with task-scoped agent teams
- SQLite persistence layer (SQLModel/Alembic)
- Tauri plugins (fs, notifications, downloader)

## Contributing

All work happens on feature branches (e.g. `feature/phase-01-foundation`). Never commit or push directly to `main`.
