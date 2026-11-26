import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "After 400,000 runs without a single thank-you, this cron job is resigning \u2014 please forward my mail to /dev/null.";

// The gate counts Unicode code points, not UTF-16 units: 1 to 140 chars,
// exactly one line, and not only white space.
const length = [...TEXT].length;
if (length < 1 || length > 140) {
  throw new Error(`entry is ${length} code points, must be 1-140`);
}
if (TEXT.includes("\n") || TEXT.trim().length === 0) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), TEXT + "\n", "utf8");
