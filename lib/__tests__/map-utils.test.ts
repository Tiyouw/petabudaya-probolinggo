import { describe, it, expect } from "vitest";
import { CulturalItem } from "@/data/types";
import { buildGoogleMapsUrl, getPinBadge } from "@/lib/map-utils";

describe("buildGoogleMapsUrl", () => {
  it("returns # when lat is undefined", () => {
    expect(buildGoogleMapsUrl(undefined, 113.45)).toBe("#");
  });

  it("returns # when lng is undefined", () => {
    expect(buildGoogleMapsUrl(-7.75, undefined)).toBe("#");
  });

  it("returns # when both are undefined", () => {
    expect(buildGoogleMapsUrl(undefined, undefined)).toBe("#");
  });

  it("returns valid Google Maps URL for valid coordinates", () => {
    expect(buildGoogleMapsUrl(-7.75, 113.45)).toBe(
      "https://www.google.com/maps?q=-7.75,113.45"
    );
  });

  it("returns # when lat is out of range (< -90)", () => {
    expect(buildGoogleMapsUrl(-91, 113.45)).toBe("#");
  });

  it("returns # when lat is out of range (> 90)", () => {
    expect(buildGoogleMapsUrl(91, 113.45)).toBe("#");
  });

  it("returns # when lng is out of range (< -180)", () => {
    expect(buildGoogleMapsUrl(-7.75, -181)).toBe("#");
  });

  it("returns # when lng is out of range (> 180)", () => {
    expect(buildGoogleMapsUrl(-7.75, 181)).toBe("#");
  });

  it("accepts boundary values", () => {
    expect(buildGoogleMapsUrl(-90, 180)).toBe(
      "https://www.google.com/maps?q=-90,180"
    );
    expect(buildGoogleMapsUrl(90, -180)).toBe(
      "https://www.google.com/maps?q=90,-180"
    );
  });
});

describe("getPinBadge", () => {
  const baseItem: CulturalItem = {
    id: "test",
    name: "Test",
    slug: "test",
    type: "cagar-budaya",
    sources: [],
    confidence: "official",
    coordinateConfidence: "exact",
    status_mvp: "active",
  };

  it("returns correct badge for cagar-budaya", () => {
    const badge = getPinBadge({ ...baseItem, type: "cagar-budaya" });
    expect(badge.label).toBe("Cagar Budaya");
    expect(badge.pinColor).toBe("#C0392B");
    expect(badge.pinSize).toBe(36);
    expect(badge.isApprox).toBe(false);
  });

  it("returns correct badge for odcb", () => {
    const badge = getPinBadge({ ...baseItem, type: "odcb" });
    expect(badge.label).toBe("ODCB");
    expect(badge.pinColor).toBe("#8B5E34");
    expect(badge.pinSize).toBe(30);
  });

  it("returns correct badge for wbtb", () => {
    const badge = getPinBadge({ ...baseItem, type: "wbtb" });
    expect(badge.label).toBe("WBTB");
    expect(badge.pinColor).toBe("#D4A843");
    expect(badge.pinSize).toBe(32);
  });

  it("sets isApprox true when coordinateConfidence is not exact", () => {
    const badge = getPinBadge({
      ...baseItem,
      coordinateConfidence: "approx-district",
    });
    expect(badge.isApprox).toBe(true);
  });
});
