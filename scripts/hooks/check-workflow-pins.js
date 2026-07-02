// scripts/hooks/check-workflow-pins.js
//
// Enforces the org-wide invariant (see CLAUDE.md: "SHA-pin every GitHub
// Action") locally: every `uses:` in a workflow file must resolve to a full
// 40-char commit SHA, not a tag or branch. CI's `pin-check` job (a thin
// caller of the org's central pin-check.yml) enforces this remotely; this
// hook catches the same problem before push.
//
// Usage: node scripts/hooks/check-workflow-pins.js <workflow-file> ...

const fs = require("fs");

const SHA_PIN = /^[^\s@]+@[0-9a-f]{40}(\s*#.*)?$/;

function stripComment(line) {
  const idx = line.indexOf("#");
  return idx === -1 ? line : line.slice(0, idx);
}

const files = process.argv.slice(2).filter((f) => fs.existsSync(f));
let failed = false;

for (const file of files) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^\s*(?:-\s*)?uses:\s*(.+?)\s*$/);
    if (!m) continue;

    let value = m[1].trim();
    let lineNo = i + 1;

    // YAML folded/literal scalar (`uses: >-`) — the actual value is the next
    // non-blank line.
    if (value === ">-" || value === ">" || value === "|" || value === "|-") {
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === "") j++;
      if (j >= lines.length) continue;
      value = lines[j].trim();
      lineNo = j + 1;
    }

    value = stripComment(value).trim();
    if (!value) continue;

    if (!SHA_PIN.test(value)) {
      failed = true;
      console.error(`FAIL ${file}:${lineNo} - unpinned action: "${value}"`);
      console.error("     must be pinned to a full 40-char commit SHA, e.g. owner/action@<40-char-sha>");
    }
  }
}

if (failed) {
  console.error("\nWorkflow pin check failed. Resolve the SHA with:");
  console.error("  gh api /repos/<owner>/<action-repo>/commits/<tag> --jq '.sha'");
  process.exit(1);
}
