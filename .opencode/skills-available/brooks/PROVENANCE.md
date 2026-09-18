# Vendored skills provenance

- Upstream: https://github.com/hyhmrright/brooks-lint
- Pinned commit: 29fd7761cdb59a1bd9d2b5b6458277807c674c4f (2026-09-14)
- Scope: `skills/brooks-{review,audit,debt,test,health,sweep}` + `skills/_shared`, `commands/brooks-*.md`, `plugins/brooks-session.ts`, `.brooks-lint.example.yaml` — skills keep the upstream flat layout so `../_shared/` resolves
- OpenCode port: `commands/brooks-*.md` rewritten to load skills via the Skill tool (upstream `${CLAUDE_PLUGIN_ROOT}` wrappers do not resolve under OpenCode); Claude `hooks/` (`hooks.json`, `session-start`, `session-start.mjs` with its `~/.claude/commands` installer) replaced by `plugins/brooks-session.ts`, which logs the skill index on `session.created`
- Sync: re-run the upstream installer (`curl -fsSL https://raw.githubusercontent.com/hyhmrright/brooks-lint/main/scripts/install.sh | bash -s -- opencode --project`) or re-copy the same paths, then update the pin above
