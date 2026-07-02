// scripts/hooks/check-parse.js
//
// Parse-checks JS/JSX files with @babel/standalone (an existing runtime
// dependency of this app — see renderer/App.jsx's in-browser Babel usage).
// Mirrors the "sanity" job in .github/workflows/ci.yml exactly, so a syntax
// error is caught locally before it fails CI.
//
// Usage:
//   node scripts/hooks/check-parse.js               walk the full tree, like CI
//   node scripts/hooks/check-parse.js file1.js ...   check only the given files

const Babel = require("@babel/standalone");
const fs = require("fs");
const path = require("path");

function walk(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(walk(full));
    else if (/\.(js|jsx)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const args = process.argv.slice(2);
const files = args.length
  ? args.filter((f) => /\.(js|jsx)$/.test(f) && fs.existsSync(f))
  : ["main.js", "preload.js"].concat(walk("server")).concat(walk("renderer"));

let failed = false;
for (const f of files) {
  try {
    Babel.transform(fs.readFileSync(f, "utf8"), { presets: ["react"], filename: f });
  } catch (e) {
    failed = true;
    console.error(`FAIL ${f} - ${e.message}`);
  }
}

if (failed) {
  console.error("\nParse check failed. Fix the syntax error(s) above, then re-stage/re-run.");
  process.exit(1);
}
