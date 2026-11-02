#!/usr/bin/env python3
"""Deterministic gate for the exam notes.

Checks, for every Markdown file under <root>/notlar:
  1. every `Wn/...:LINE` (or `:A-B`) reference points at an existing repo file
     and the line numbers are inside that file;
  2. every path mentioned without a line number also exists;
  3. no em dash (U+2014) or en dash (U+2013);
  4. none of the owner's banned words;
  5. coverage: every source file of the course weeks is mentioned at least once.

Usage: check_notes.py <root>   (root holds repo/, notlar/, kurtarilan/)
Exit code 0 when clean, 1 when any check fails.
"""
import pathlib
import re
import sys

PATH_RE = re.compile(
    r"((?:W\d+|kurtarilan)/[A-Za-z0-9_./-]+?\.(?:md|html|jsx|js|css))(?::(\d+)(?:-(\d+))?)?"
)
DASHES = {"—": "em dash", "–": "en dash"}
BANNED = [
    "delve", "crucial", "robust", "comprehensive", "nuanced", "multifaceted",
    "furthermore", "moreover", "pivotal", "landscape", "tapestry", "underscore",
    "foster", "showcase", "intricate", "vibrant", "fundamental", "significant",
    "interplay",
]
BANNED_RE = re.compile(r"\b(" + "|".join(BANNED) + r")\b", re.IGNORECASE)
# Files that carry no lesson content of their own.
COVERAGE_SKIP = {"W2/README.html", "W2/topics/styles.css"}


def required_sources(repo: pathlib.Path) -> list[str]:
    out = []
    for p in sorted(repo.rglob("*")):
        rel = p.relative_to(repo).as_posix()
        if not p.is_file() or rel.startswith(".git/") or not re.match(r"W\d+/", rel):
            continue
        if p.suffix in {".md", ".html", ".js", ".jsx", ".css"} and rel not in COVERAGE_SKIP:
            out.append(rel)
    return out


def check(root: pathlib.Path) -> list[str]:
    repo = root / "repo"
    errors: list[str] = []
    mentioned: set[str] = set()
    line_counts: dict[pathlib.Path, int] = {}

    for note in sorted((root / "notlar").rglob("*.md")):
        name = note.relative_to(root).as_posix()
        for lineno, line in enumerate(note.read_text(encoding="utf-8").splitlines(), 1):
            for ch, label in DASHES.items():
                if ch in line:
                    errors.append(f"{name}:{lineno}: {label}")
            for m in BANNED_RE.finditer(line):
                errors.append(f"{name}:{lineno}: banned word '{m.group(1)}'")
            for m in PATH_RE.finditer(line):
                path, a, b = m.group(1), m.group(2), m.group(3)
                target = (root if path.startswith("kurtarilan/") else repo) / path
                if not target.is_file():
                    errors.append(f"{name}:{lineno}: missing file {path}")
                    continue
                mentioned.add(path)
                if a is None:
                    continue
                if target not in line_counts:
                    line_counts[target] = len(target.read_text(encoding="utf-8").splitlines())
                n = line_counts[target]
                lo, hi = int(a), int(b) if b else int(a)
                if not (1 <= lo <= hi <= n):
                    errors.append(f"{name}:{lineno}: {path}:{a}{'-' + b if b else ''} outside 1..{n}")

    for src in required_sources(repo):
        if src not in mentioned:
            errors.append(f"coverage: {src} never mentioned in notes")
    return errors


def main(argv: list[str]) -> int:
    root = pathlib.Path(argv[1]) if len(argv) > 1 else pathlib.Path.cwd()
    errors = check(root)
    for e in errors:
        print(e)
    print(f"{'FAIL' if errors else 'OK'}: {len(errors)} problem(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
