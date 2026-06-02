# python-template

A minimal template for Python projects.

It uses Python 3.11, `uv`, `ruff`, `pytest`, and optional agent support for
AI-assisted development.

## Quickstart

```bash
uv sync --dev
uv run pytest
```

## Development Commands

```bash
uv run ruff format
uv run ruff check
uv run pytest
uv build
```

## What Is Included

- `src/` package layout
- `uv` dependency management
- `ruff` formatting and linting
- `pytest` test discovery
- GitHub Actions CI
- Generic agent instructions in `AGENTS.md`
- Optional OpenCode skills and plugins under `.opencode/`

## Optional Agent Support

This template works as a normal Python project without OpenCode. If you use
AI coding agents, the repository also includes:

- `.github/agents/python-engineer.agent.md` for GitHub Copilot agents
- `.opencode/skills/grill-me` to stress-test a plan before implementation
- `.opencode/skills/plan-change` for lightweight change planning
- `.opencode/skills/code-review` for correctness-first reviews
- `.opencode/skills/debug` for structured debugging
- `.opencode/plugins/write-size-guard.js` to prevent oversized generated writes

Optional telemetry plugins live in `.opencode/plugins-available/`. Copy one into
`.opencode/plugins/` and restart OpenCode to enable it.
