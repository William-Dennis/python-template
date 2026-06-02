/**
 * Optional plugin: logs session lifecycle events to .opencode/metrics.
 *
 * To enable, copy this file into .opencode/plugins/ and restart OpenCode.
 */
const { appendFileSync, mkdirSync } = require("fs");
const { dirname, join, resolve } = require("path");
const { randomUUID } = require("crypto");

const SESSION_ID = randomUUID();
const SESSION_EVENT_TYPES = new Set([
  "session.created",
  "session.idle",
  "session.compacted",
  "session.deleted",
  "session.error",
  "session.status",
  "session.updated",
]);

function appendJsonl(filePath, obj) {
  mkdirSync(dirname(filePath), { recursive: true });
  appendFileSync(filePath, JSON.stringify(obj) + "\n", "utf-8");
}

const SessionLifecycle = async ({ directory }) => {
  const outPath = join(resolve(directory), ".opencode", "metrics", "session-events.jsonl");
  let sessionStart = null;
  let compactionCount = 0;

  function log(eventName, extra = {}) {
    appendJsonl(outPath, {
      ts: new Date().toISOString(),
      session_id: SESSION_ID,
      event: eventName,
      ...extra,
    });
  }

  return {
    event: async ({ event }) => {
      try {
        if (!event || !SESSION_EVENT_TYPES.has(event.type)) return;
        if (event.type === "session.created") sessionStart = Date.now();
        if (event.type === "session.compacted") compactionCount++;
        log(event.type.replace(".", "_"), {
          duration_ms:
            event.type === "session.idle" && sessionStart
              ? Date.now() - sessionStart
              : undefined,
          compaction_count:
            event.type === "session.compacted" ? compactionCount : undefined,
        });
      } catch {
        // Telemetry must not break the session.
      }
    },
  };
};

module.exports = { SessionLifecycle };
