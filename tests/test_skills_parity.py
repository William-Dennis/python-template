from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CLAUDE_ONLY_SKILLS = {"delegate-opencode"}


def _snapshot(directory: Path) -> dict[str, bytes]:
    return {
        path.relative_to(directory).as_posix(): path.read_bytes()
        for path in sorted(directory.rglob("*"))
        if path.is_file()
    }


def _top_level(relative_path: str) -> str:
    return relative_path.split("/", 1)[0]


def test_claude_skills_match_opencode_skills() -> None:
    claude = _snapshot(ROOT / ".claude" / "skills")
    opencode = _snapshot(ROOT / ".opencode" / "skills")

    claude_shared = {
        path: data for path, data in claude.items() if _top_level(path) not in CLAUDE_ONLY_SKILLS
    }
    assert claude_shared == opencode
    assert any(_top_level(path) in CLAUDE_ONLY_SKILLS for path in claude)
    assert not any(_top_level(path) in CLAUDE_ONLY_SKILLS for path in opencode)
