"""Behavioural tests for check_notes.check on a throwaway tree."""
import pathlib
import sys
import tempfile
import unittest

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from check_notes import BANNED, check  # noqa: E402

SRC = "line one\nline two\nline three\n"


class CheckNotesTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.root = pathlib.Path(self.tmp.name)
        (self.root / "repo/W6/components").mkdir(parents=True)
        (self.root / "repo/W6/components/View.md").write_text(SRC)
        (self.root / "repo/W6/README.md").write_text(SRC)
        (self.root / "notlar").mkdir()

    def tearDown(self):
        self.tmp.cleanup()

    def write_note(self, text):
        (self.root / "notlar/n.md").write_text(text, encoding="utf-8")

    def test_ground_control_clean_notes_pass(self):
        self.write_note("View `W6/components/View.md:2` ve `W6/README.md:1-3`\n")
        self.assertEqual(check(self.root), [])

    def test_line_past_end_fails(self):
        self.write_note("`W6/components/View.md:4` `W6/README.md:1`\n")
        errs = check(self.root)
        self.assertEqual(len(errs), 1)
        self.assertIn("outside 1..3", errs[0])

    def test_range_past_end_fails(self):
        self.write_note("`W6/components/View.md:2-9` `W6/README.md:1`\n")
        self.assertIn("outside 1..3", check(self.root)[0])

    def test_missing_file_fails(self):
        self.write_note("`W6/components/Nope.md:1` `W6/components/View.md` `W6/README.md`\n")
        errs = check(self.root)
        self.assertEqual(errs, ["notlar/n.md:1: missing file W6/components/Nope.md"])

    def test_dashes_fail(self):
        self.write_note("a — b – c `W6/components/View.md` `W6/README.md`\n")
        errs = check(self.root)
        self.assertEqual(len(errs), 2)

    def test_banned_word_fails_whole_word_only(self):
        self.write_note(f"{BANNED[0].upper()} x `W6/components/View.md` `W6/README.md`\n")
        self.assertEqual(len(check(self.root)), 1)
        self.write_note("fundamentals `W6/components/View.md` `W6/README.md`\n")
        self.assertEqual(check(self.root), [])

    def test_unmentioned_source_fails_coverage(self):
        self.write_note("`W6/components/View.md:1`\n")
        self.assertEqual(check(self.root), ["coverage: W6/README.md never mentioned in notes"])


if __name__ == "__main__":
    unittest.main(verbosity=1)
