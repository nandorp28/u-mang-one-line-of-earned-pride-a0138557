import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Line of Earned Pride — u-mang-one-line-of-earned-pride-a0138557
// One line, 1–240 chars: a quiet, earned moment of pride for someone in a
// scene. The effort (six weeks on one sentence) is felt inside the line,
// the scene is concrete and seen happening, and the pride arrives in the
// last words — she holds her head up — never asserted or explained.
const LINE =
  "Six weeks on one sentence — 'my name is Ana' — and today she said it to the shopkeeper, who smiled and answered, and she did not look down.";

function validate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 240) {
    throw new Error(`entry must be 1-240 characters, got ${chars}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line !== line.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validate(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  console.log(`wrote ${[...LINE].length} chars to ${target}`);
}

main();
