---
name: delegate-opencode
description: Delegates one atomic task to headless opencode. Use only when the user explicitly asks to delegate or have opencode do something ("delegate to opencode", "have opencode do X", "run this in opencode"). Not for small inline tasks.
---

# Delegate to OpenCode

One skill call = one `opencode run`. Headless only: never `-i`.

## Command

Foreground (short tasks):

```
opencode run --dir <absolute-repo-path> -m opencode-go/muse-spark-1.3-contributor --format json [--agent <name>] [-f <file>] "<atomic prompt>" < /dev/null
```

Background (long tasks such as test or build sweeps): the same command with the Bash tool's `run_in_background`. Do not append `&`. Tell the user the job is running, then summarize when it completes. Stop a hung run with TaskStop.

Always set the Bash tool's `timeout` on foreground runs.

## Rules

- `< /dev/null` is required. Without it, an open stdin can hang the run.
- `--dir` is always an absolute path. `-m` is always set.
- Quote the whole prompt as one argument.
- Agents: `python-engineer` (edits), `research`, `docs-reader`, `plan` (read-only), or omit `--agent`.
- Fallback: on a model or auth error, retry once with `-m opencode/big-pickle`, then report the failure. Never switch models silently.
- Treat exit 0 with empty output as a failure.
- Summarize the JSON result for the user. Keep raw JSON out of chat unless asked.
- After an edit run, review `git diff` and run `uv run ruff check`, `uv run ty check`, and `uv run pytest` yourself. Do not trust the delegate's report alone.
- Do not chain: a follow-up is a new explicit delegation.

## Forbidden without explicit user approval

`--auto`, `-i`/`--interactive`, `-c`/`--continue`, `-s`/`--session`, `--fork`.

## Prompt contract

The prompt covers one file or behavior and states the output shape, for example "return a summary" or "return the diff only".
