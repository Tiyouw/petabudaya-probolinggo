import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const componentPath = path.resolve(__dirname, "../../components/opk/OpkShowcase.tsx");

describe("OPK showcase layout", () => {
  it("does not clip long OPK item lists inside fixed-height snap sections", () => {
    const source = readFileSync(componentPath, "utf8");

    expect(source).not.toMatch(/className="snap-section[^"`]*overflow-hidden/);
  });
});
