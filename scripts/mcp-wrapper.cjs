#!/usr/bin/env node
/**
 * MCP 래퍼 스크립트 — Framelink MCP 연결 진단/안정화용
 *
 * 용도:
 * - figma-developer-mcp를 child process로 스폰하고 stdin/stdout 파이프
 * - stderr와 exit code를 mcp-error.log에 기록 → disconnect 원인 확정
 * - Claude Code sub-agent lifecycle 버그 가설 검증
 *
 * 사용:
 *   claude mcp add figma-framelink -s user -- node {이 파일 경로}
 *   (env var는 child에게 전달됨)
 *
 * 로그:
 *   C:/Dev/Workspace/esgpn-react-harness/mcp-error.log
 */

const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const LOG_FILE = path.resolve(__dirname, "..", "mcp-error.log");
const logStream = fs.createWriteStream(LOG_FILE, { flags: "a" });

function log(msg) {
  logStream.write(`[${new Date().toISOString()}] ${msg}\n`);
}

const TARGET = process.env.FIGMA_MCP_ENTRY || "C:/Users/softpuzzle/AppData/Roaming/npm/node_modules/figma-developer-mcp/dist/bin.js";
const API_KEY = process.env.FIGMA_API_KEY;
const IMAGE_DIR = process.env.FIGMA_IMAGE_DIR || "C:/Dev/Workspace/esgpn-react-harness";

if (!API_KEY) {
  console.error("ERROR: FIGMA_API_KEY env var is required (set via claude mcp add ... -e FIGMA_API_KEY=...)");
  process.exit(1);
}

log(`=== MCP wrapper start (pid=${process.pid}) ===`);

const child = spawn("node", [
  TARGET,
  `--figma-api-key=${API_KEY}`,
  "--stdio",
  `--image-dir=${IMAGE_DIR}`,
], {
  stdio: ["pipe", "pipe", "pipe"],
  env: {
    ...process.env,
    NODE_NO_WARNINGS: "1",
    NODE_ENV: "production",
  },
});

log(`spawned child pid=${child.pid}`);

// 부모 → 자식 (Claude → MCP)
process.stdin.pipe(child.stdin);

// 자식 → 부모 (MCP → Claude)
child.stdout.pipe(process.stdout);

// 에러 로깅
child.stderr.on("data", (data) => {
  log(`STDERR: ${data.toString().trim()}`);
});

// 자식 종료 감지
child.on("exit", (code, signal) => {
  log(`CHILD EXITED — code=${code} signal=${signal}`);
  logStream.end();
  process.exit(code ?? 0);
});

child.on("error", (err) => {
  log(`CHILD ERROR: ${err.message}`);
});

// 부모 stdin 종료 감지 (Claude가 pipe 닫음)
process.stdin.on("end", () => {
  log(`PARENT STDIN ENDED — likely Claude Code closing the MCP pipe`);
});

process.stdin.on("close", () => {
  log(`PARENT STDIN CLOSED`);
});

// 부모 프로세스 종료 시그널
process.on("SIGINT", () => {
  log(`PARENT SIGINT`);
  child.kill("SIGINT");
});

process.on("SIGTERM", () => {
  log(`PARENT SIGTERM`);
  child.kill("SIGTERM");
});

process.on("exit", (code) => {
  log(`WRAPPER EXITING — code=${code}`);
});

// 에러 처리
process.on("uncaughtException", (err) => {
  log(`UNCAUGHT EXCEPTION: ${err.message}\n${err.stack}`);
});
