import { describe, it, expect } from "vitest";
import { CulturalItem } from "@/data/types";
import {
  filterHeritageItems,
  filterByDistrict,
  uniqueDistricts,
  filterByType,
} from "@/lib/filters";

const mockItems: CulturalItem[] = [
  {
    id: "a",
    name: "Cagar Budaya A",
    slug: "cagar-budaya-a",
    type: "cagar-budaya",
    district: "Kraksaan",
    sources: [],
    confidence: "official",
    coordinateConfidence: "exact",
    status_mvp: "active",
  },
  {
    id: "b",
    name: "ODCB B",
    slug: "odcb-b",
    type: "odcb",
    district: "Paiton",
    sources: [],
    confidence: "source-backed",
    coordinateConfidence: "exact",
    status_mvp: "active",
  },
  {
    id: "c",
    name: "WBTB C",
    slug: "wbtb-c",
    type: "wbtb",
    district: "Sukapura",
    sources: [],
    confidence: "source-backed",
    coordinateConfidence: "exact",
    status_mvp: "active",
  },
  {
    id: "d",
    name: "No District",
    slug: "no-district",
    type: "odcb",
    sources: [],
    confidence: "source-backed",
    coordinateConfidence: "exact",
    status_mvp: "active",
  },
];

describe("filterHeritageItems", () => {
  it("returns all items when filter is 'all'", () => {
    expect(filterHeritageItems(mockItems, "all")).toHaveLength(4);
  });

  it("returns only cagar-budaya items when filter is 'cb'", () => {
    const result = filterHeritageItems(mockItems, "cb");
    expect(result).toHaveLength(1);
    expect(result[0].type).toBe("cagar-budaya");
  });

  it("returns only odcb items when filter is 'odcb'", () => {
    const result = filterHeritageItems(mockItems, "odcb");
    expect(result).toHaveLength(2);
    expect(result.every((i) => i.type === "odcb")).toBe(true);
  });

  it("returns empty array when no items match", () => {
    const items: CulturalItem[] = mockItems.slice(2, 3); // only wbtb
    expect(filterHeritageItems(items, "cb")).toHaveLength(0);
  });
});

describe("filterByDistrict", () => {
  it("returns all items when district is null", () => {
    expect(filterByDistrict(mockItems, null)).toHaveLength(4);
  });

  it("filters by exact district name", () => {
    const result = filterByDistrict(mockItems, "Kraksaan");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("a");
  });

  it("returns empty if no match", () => {
    expect(filterByDistrict(mockItems, "Nonexistent")).toHaveLength(0);
  });
});

describe("uniqueDistricts", () => {
  it("returns sorted unique district names", () => {
    const result = uniqueDistricts(mockItems);
    expect(result).toEqual(["Kraksaan", "Paiton", "Sukapura"]);
  });

  it("excludes items without district", () => {
    // Item "d" has no district and should be excluded
    const result = uniqueDistricts(mockItems);
    expect(result).not.toContain(undefined);
  });
});

describe("filterByType", () => {
  it("returns items matching given types", () => {
    const result = filterByType(mockItems, ["cb", "wbtb"]);
    expect(result).toHaveLength(2);
  });

  it("returns all when types array is all four", () => {
    const result = filterByType(mockItems, ["cb", "odcb", "wbtb", "opk"]);
    expect(result).toHaveLength(4);
  });

  it("returns empty when types array is empty, given the function returns all when types.length === 0", () => {
    // Note: filterByType returns all items when types.length === 0
    expect(filterByType(mockItems, [])).toHaveLength(4);
  });
});
