# Agent Instructions

This is a generic Python project template using `uv`, `ruff`, and `pytest`.

## Commands

- Install dependencies: `uv sync --dev`
- Format: `uv run ruff format`
- Lint: `uv run ruff check`
- Test: `uv run pytest`
- Build: `uv build`

## Rules

- Use `uv` for dependency management and command execution.
- Keep changes small and focused.
- Add or update tests for behavior changes.
- Run `uv run ruff check` and `uv run pytest` before finishing code changes.
- Do not add runtime dependencies unless they are required by package behavior.
- Prefer clear, boring Python over clever abstractions.

## Optional Agent Support

- `.opencode/skills/` contains reusable workflow skills for AI-assisted development.
- `.opencode/plugins/write-size-guard.js` prevents oversized generated writes.
- `.opencode/plugins-available/` contains optional telemetry plugins that can be copied into `.opencode/plugins/` when desired.
