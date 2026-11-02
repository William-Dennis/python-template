from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def _snapshot(directory: Path) -> dict[str, bytes]:
    return {
        path.relative_to(directory).as_posix(): path.read_bytes()
        for path in sorted(directory.rglob("*"))
        if path.is_file()
    }


def test_claude_skills_match_opencode_skills() -> None:
    assert _snapshot(ROOT / ".claude" / "skills") == _snapshot(ROOT / ".opencode" / "skills")
