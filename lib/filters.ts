// ===== Client-side Filter Utilities =====
import { CulturalItem } from "@/data/types";
import { PinLayerType } from "./map-utils";

export function filterByType(items: CulturalItem[], types: PinLayerType[]): CulturalItem[] {
  if (types.length === 0 || types.length === 4) return items;
  return items.filter((item) => {
    if (types.includes("cb") && item.type === "cagar-budaya") return true;
    if (types.includes("odcb") && item.type === "odcb") return true;
    if (types.includes("wbtb") && item.type === "wbtb") return true;
    if (types.includes("opk") && item.type === "opk") return true;
    return false;
  });
}

export function filterHeritageItems(
  items: CulturalItem[],
  filter: "all" | "cb" | "odcb"
): CulturalItem[] {
  if (filter === "all") return items;
  return items.filter((item) => {
    if (filter === "cb" && item.type === "cagar-budaya") return true;
    if (filter === "odcb" && item.type === "odcb") return true;
    return false;
  });
}

export function filterByDistrict(
  items: CulturalItem[],
  district: string | null
): CulturalItem[] {
  if (!district) return items;
  return items.filter((item) => item.district === district);
}

export function filterByCategory(
  items: CulturalItem[],
  category: string | null
): CulturalItem[] {
  if (!category) return items;
  return items.filter((item) => item.category === category);
}

export function uniqueDistricts(items: CulturalItem[]): string[] {
  const districts = new Set(
    items.map((item) => item.district).filter(Boolean) as string[]
  );
  return Array.from(districts).sort();
}

export function uniqueCategories(items: CulturalItem[]): string[] {
  const categories = new Set(
    items.map((item) => item.category).filter(Boolean) as string[]
  );
  return Array.from(categories).sort();
}
