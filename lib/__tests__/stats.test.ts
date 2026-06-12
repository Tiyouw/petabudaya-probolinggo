import { describe, it, expect } from "vitest";
import { getStats } from "@/lib/stats";

describe("getStats", () => {
  it("returns numeric counts for all keys", () => {
    const stats = getStats();
    expect(stats.cagarBudaya).toBeGreaterThan(0);
    expect(stats.wbtb).toBeGreaterThan(0);
    expect(stats.opkCategories).toBeGreaterThan(0);
    expect(stats.odcb).toBeGreaterThan(0);
    expect(stats.total).toBeGreaterThan(0);
  });

  it("total is at least the sum of cb + wbtb + odcb", () => {
    const stats = getStats();
    expect(stats.total).toBeGreaterThanOrEqual(
      stats.cagarBudaya + stats.wbtb + stats.odcb
    );
  });

  it("all counts are positive integers", () => {
    const stats = getStats();
    Object.values(stats).forEach((v) => {
      expect(Number.isInteger(v)).toBe(true);
      expect(v).toBeGreaterThanOrEqual(0);
    });
  });
});
