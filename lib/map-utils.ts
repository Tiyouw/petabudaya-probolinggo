// ===== Map Utilities — PetaBudaya Probolinggo =====
import { CulturalItem } from "@/data/types";
import { mapRegions } from "@/data/map-regions";

export const MAP_BOUNDS = {
  sw: { lat: -8.42, lng: 113.0 },
  ne: { lat: -7.60, lng: 113.9 },
} as const;

export const DEFAULT_ZOOM = 9;
export const MAX_ZOOM = 16;
export const MIN_ZOOM = 9;
export const CLUSTER_ZOOM = 12;

export type PinLayerType = "cb" | "odcb" | "wbtb" | "opk";

export interface PinBadge {
  label: string;
  typeBadge: string;
  isApprox: boolean;
  pinColor: string;
  pinSize: number;
}

export function getPinBadge(item: CulturalItem): PinBadge {
  const isApprox = item.coordinateConfidence !== "exact";

  switch (item.type) {
    case "cagar-budaya":
      return { label: "Cagar Budaya", typeBadge: "type-cb", isApprox, pinColor: "#C0392B", pinSize: 36 };
    case "odcb":
      return { label: "ODCB", typeBadge: "type-odcb", isApprox, pinColor: "#8B5E34", pinSize: 30 };
    case "wbtb":
      return { label: "WBTB", typeBadge: "type-wbtb", isApprox, pinColor: "#D4A843", pinSize: 32 };
    case "opk":
      return { label: "OPK", typeBadge: "type-opk", isApprox, pinColor: "#C0392B", pinSize: 28 };
    default:
      return { label: "", typeBadge: "type-opk", isApprox, pinColor: "#DDD0C0", pinSize: 24 };
  }
}

export function getDistrictCoord(districtName: string): { lat: number; lng: number } | null {
  const normalized = districtName.toLowerCase().trim();
  const region = mapRegions.find(
    (r) => r.name.toLowerCase() === normalized || r.id === normalized
  );
  return region ? { lat: region.lat, lng: region.lng } : null;
}

export function buildGoogleMapsUrl(lat: number | undefined, lng: number | undefined): string {
  if (lat === undefined || lng === undefined) return "#";
  return `https://www.google.com/maps?q=${lat},${lng}`;
}
