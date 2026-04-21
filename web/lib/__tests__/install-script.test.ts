import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";

describe("public/install.sh", () => {
  const scriptPath = path.join(process.cwd(), "public", "install.sh");
  const script = fs.readFileSync(scriptPath, "utf8");

  it("contains the skills configuration step before the install command", () => {
    const step1 = "Use Bash / Write-like tools, or create a soft link, to add the following directory to your own skills configuration:";
    const step2 = "npm install -g clawplay@latest && clawplay setup";

    expect(script).toContain(step1);
    expect(script).toContain(step2);
    expect(script.indexOf(step1)).toBeLessThan(script.indexOf(step2));
  });

  it("starts with a shell shebang", () => {
    expect(script.startsWith("#!/usr/bin/env bash")).toBe(true);
  });
});
