# python-template

A minimal template for Python projects.

It uses Python 3.12, `uv`, `ruff`, `ty`, `pytest`, and optional agent support for
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
uv run ty check
uv run pytest
uv build
```

## What Is Included

- `src/` package layout
- `uv` dependency management
- `ruff` formatting and linting
- `ty` type checking
- `pytest` test discovery
- GitHub Actions CI
- Generic agent instructions in `AGENTS.md`
- Optional OpenCode config, agents, and skills under `.opencode/`
- Optional Claude Code config under `.claude/` and `CLAUDE.md`

## Optional Agent Support

This template works as a normal Python project without OpenCode. If you use
AI coding agents, the repository also includes:

- `opencode.json` with conservative default permissions and useful commands
- `.opencode/agents/python-engineer.md` for focused Python implementation work
- `.opencode/agents/research.md` for read-only academic research (CrossRef/OpenAlex/PubMed MCPs, disabled by default)
- `.opencode/skills/dev-workflow` for planned, verified changes
- `.opencode/skills/grill-me` to stress-test a plan before implementation
- `.opencode/skills/strict-code-review` for actionable code reviews
- `.opencode/skills/session-retro` to capture lessons and follow-ups
- `.opencode/skills/caveman` for terse technical communication
- `.opencode/skills-available/brooks/` with the opt-in, explicit-invocation brooks-lint skills

Claude Code support (`CLAUDE.md`, `.claude/`):

- `CLAUDE.md` imports `AGENTS.md` so both tools share one set of instructions
- `.claude/settings.json` sets Sonnet 5.5 at medium effort and mirrors the OpenCode permissions
- `.claude/agents/python-engineer.md` (Sonnet 5.5, medium) and `.claude/agents/research.md` (Haiku, MCPs scoped to this agent only)
- `.claude/skills` is a copy of `.opencode/skills`, kept in sync by `tests/test_skills_parity.py`
- `.claude/skills/delegate-opencode` is Claude-only. It runs one headless `opencode run` task, in the foreground or background, with model `opencode-go/muse-spark-1.3-contributor` and fallback `opencode/big-pickle`. `--auto` is denied.
- `.claude/commands/` has `/check` and `/grill-me`

To enable brooks, copy `.opencode/skills-available/brooks/skills/*` into
`.opencode/skills/`.
