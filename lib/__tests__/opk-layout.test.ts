import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const componentPath = path.resolve(__dirname, "../../components/opk/OpkShowcase.tsx");
const globalsCssPath = path.resolve(__dirname, "../../app/globals.css");

describe("OPK showcase layout", () => {
  it("does not clip long OPK item lists inside fixed-height snap sections", () => {
    const source = readFileSync(componentPath, "utf8");

    expect(source).not.toMatch(/className="snap-section[^"`]*overflow-hidden/);
  });

  it("keeps OPK categories in the page flow instead of a nested vertical scroller", () => {
    const source = readFileSync(globalsCssPath, "utf8");

    expect(source).not.toMatch(/\.snap-container\s*\{[^}]*overflow-y\s*:\s*scroll/);
    expect(source).not.toMatch(/\.snap-container\s*\{[^}]*height\s*:\s*100vh/);
  });

  it("uses a transparent page scrollbar track with a subtle thumb", () => {
    const source = readFileSync(globalsCssPath, "utf8");

    expect(source).toMatch(/scrollbar-color\s*:\s*rgba\(107,\s*79,\s*58,\s*0\.35\)\s+transparent/);
    expect(source).toMatch(/\*::\s*-webkit-scrollbar-track\s*\{[^}]*background\s*:\s*transparent/);
    expect(source).toMatch(/\*::\s*-webkit-scrollbar-thumb\s*\{[^}]*background-color\s*:\s*rgba\(107,\s*79,\s*58,\s*0\.28\)/);
  });

  it("renders OPK as an interactive explorer instead of ten full scroll sections", () => {
    const source = readFileSync(componentPath, "utf8");

    expect(source).toContain("useState");
    expect(source).toContain("selectedCategoryId");
    expect(source).toContain("visibleItems");
    expect(source).toContain("setShowAll");
    expect(source).toContain("Lihat semua");
    expect(source).toContain("Tampilkan lebih sedikit");
    expect(source).not.toContain("className=\"snap-section flex items-center relative overflow-visible\"");
  });

  it("keeps OPK previews concise by limiting initial visible cards", () => {
    const source = readFileSync(componentPath, "utf8");

    expect(source).toMatch(/const PREVIEW_ITEM_LIMIT\s*=\s*8/);
    expect(source).toMatch(/\.items\.slice\(0,\s*PREVIEW_ITEM_LIMIT\)/);
  });
});
