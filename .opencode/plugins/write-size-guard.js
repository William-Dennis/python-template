/**
 * Blocks oversized write tool calls before they reach the editor.
 *
 * Large generated writes can fail or corrupt files in some agent runtimes. Keep
 * this guard active by default; split large file creation into smaller edits.
 */
const { appendFileSync, mkdirSync } = require("fs");
const { dirname, join, resolve } = require("path");
const { randomUUID } = require("crypto");

const SESSION_ID = randomUUID();
const WARN_LINES = 100;
const BLOCK_LINES = 150;

function logViolation(directory, filePath, lineCount, blocked) {
  try {
    const out = join(
      resolve(directory),
      ".opencode",
      "metrics",
      "write-size-violations.jsonl",
    );
    mkdirSync(dirname(out), { recursive: true });
    appendFileSync(
      out,
      JSON.stringify({
        ts: new Date().toISOString(),
        session_id: SESSION_ID,
        file_path: filePath || "",
        line_count: lineCount,
        blocked,
      }) + "\n",
      "utf-8",
    );
  } catch {
    // Observability must not break the guard.
  }
}

const WriteSizeGuard = async ({ directory }) => ({
  "tool.execute.before": async (input, output) => {
    if (input.tool !== "write") return;

    const args = input.args || output.args || {};
    const content = args.content || "";
    const filePath = args.filePath || "";
    const lineCount = content.split("\n").length;

    if (lineCount > BLOCK_LINES) {
      logViolation(directory, filePath, lineCount, true);
      throw new Error(
        `Write blocked: ${lineCount} lines exceeds the ${BLOCK_LINES}-line limit. ` +
          "Create a small placeholder file, then append content in smaller edits.",
      );
    }

    if (lineCount > WARN_LINES) {
      logViolation(directory, filePath, lineCount, false);
      console.error(
        `[write-size-guard] Warning: ${filePath} write has ${lineCount} lines.`,
      );
    }
  },
});

module.exports = { WriteSizeGuard };
