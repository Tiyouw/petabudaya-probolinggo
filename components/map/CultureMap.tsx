"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Map, {
  MapRef,
  Marker,
  NavigationControl,
  Popup,
  ViewState,
  ViewStateChangeEvent,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { AlertTriangle, X } from "lucide-react";
import { CulturalItem } from "@/data/types";
import { allCulturalSites } from "@/data/cultural-sites";
import { wbtbItems } from "@/data/wbtb";
import {
  MAP_BOUNDS,
  DEFAULT_ZOOM,
  MAX_ZOOM,
  MIN_ZOOM,
  CLUSTER_ZOOM,
  getPinBadge,
  buildGoogleMapsUrl,
} from "@/lib/map-utils";
import Badge from "@/components/ui/Badge";
import MapFilterBar from "./MapFilterBar";
import { useMapFilter } from "@/hooks/useMapFilter";
import boundaryData from "@/data/probolinggo-boundary.json";

const MAPTILER_KEY = "GuKF8sEbZEmRlalTzWEl";

// ---------------------------------------------------------------------------
// Pin SVG generation
// ---------------------------------------------------------------------------
// Every pin uses a fixed 24×32 viewBox. The outer <svg> width/height scales
// to the target pinSize so the same artwork works at all three sizes.
//
// Structure (top → bottom):
//   1. Glow / halo circle           cx=12  cy=10  r=9   opacity 0.25
//   2. Main filled circle + border  cx=12  cy=10  r=7   stroke-width 2
//   3. White icon centered at (12,10) inside the circle  (~60 % of r=7)
//   4. Triangle tail pointing down  12,28  7,18  17,18
//
// Icons use simple geometric paths – no nested <svg>, no tiny unreadable
// rect/line combos.  Every path element explicitly sets fill / stroke so
// nothing leaks from a parent attribute.
// ---------------------------------------------------------------------------

/** Return the white icon body (one or more SVG elements) for a site type.
 *  All coordinates are relative to the 24×32 viewBox; the icon is centred
 *  at (12, 10) – the same centre as the filled circle. */
function getPinIcon(type: string): string {
  switch (type) {
    case "cagar-budaya":
      return (
        `<path d="M7.4 10.1h9.2v5.6H7.4z" fill="none" stroke="white" stroke-width="1.8" stroke-linejoin="round"/>` +
        `<path d="M6.4 10.1 12 6.5l5.6 3.6" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>` +
        `<path d="M10.4 15.7v-3h3.2v3" fill="none" stroke="white" stroke-width="1.6" stroke-linejoin="round"/>`
      );
    case "odcb":
      return (
        `<path d="M8.2 8.8c.8-1.5 2.2-2.3 4-2.1 2 .2 3.4 1.5 3.4 3.2 0 1.6-1 2.4-2.4 3.2-.9.5-1.2.9-1.2 1.8" fill="none" stroke="white" stroke-width="1.9" stroke-linecap="round"/>` +
        `<circle cx="12" cy="17.2" r="1.25" fill="white"/>`
      );
    case "wbtb":
      return `<path d="m12 6.6 1.25 3.15 3.35.25-2.58 2.13.8 3.27L12 13.62 9.18 15.4l.8-3.27L7.4 10l3.35-.25L12 6.6Z" fill="none" stroke="white" stroke-width="1.9" stroke-linejoin="round"/>`;
    default:
      return getPinIcon("odcb");
  }
}

function buildPinSvg(type: string, color: string, size: number): string {
  const icon = getPinIcon(type);
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size + 10}" viewBox="0 0 24 34" aria-hidden="true">
      <filter id="pinShadow" x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="2" stdDeviation="1.6" flood-color="#1C0F08" flood-opacity="0.25" />
      </filter>
      <g filter="url(#pinShadow)">
        <circle cx="12" cy="12" r="10.2" fill="${color}" opacity="0.22" />
        <path d="M12 32 6.9 21.4h10.2L12 32Z" fill="${color}" stroke="white" stroke-width="1.2" stroke-linejoin="round"/>
        <circle cx="12" cy="12" r="9" fill="${color}" stroke="white" stroke-width="2.2" />
        ${icon}
      </g>
    </svg>
  `;
}

// ---------------------------------------------------------------------------
// Cluster utilities
// ---------------------------------------------------------------------------

const GRID_CELL_SIZE = 0.05; // ~5 km at the equator

interface Cluster {
  id: string;
  lat: number;
  lng: number;
  count: number;
  items: CulturalItem[];
  dominantType: CulturalItem["type"];
}

function buildClusterColor(dominantType: CulturalItem["type"]): string {
  switch (dominantType) {
    case "cagar-budaya":
      return "#C0392B";
    case "odcb":
      return "#8B5E34";
    case "wbtb":
      return "#D4A843";
    default:
      return "#6B4F3A";
  }
}

function clusterSize(count: number): number {
  // Scale from 44px (2 items) up to 72px (10+ items)
  return Math.min(44 + (count - 2) * 3.5, 72);
}

function clusterFontSize(count: number): number {
  if (count < 10) return 14;
  if (count < 100) return 13;
  return 11;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

// Merge all mappable items
const allItems: CulturalItem[] = [
  ...allCulturalSites,
  ...wbtbItems,
].filter((item) => item.lat !== undefined && item.lng !== undefined);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function CultureMap({
  isFullscreen = false,
}: {
  isFullscreen?: boolean;
}) {
  const mapRef = useRef<MapRef>(null);
  const { activeLayers, toggleLayer, selectedItemId, selectItem } =
    useMapFilter({
      defaultLayers: ["cb", "odcb", "wbtb"],
    });
  const [popupItem, setPopupItem] = useState<CulturalItem | null>(null);
  const [mapError, setMapError] = useState(false);
  const [clusterEnabled, setClusterEnabled] = useState(false);

  const [viewState, setViewState] = useState<Partial<ViewState>>({
    latitude: -7.75,
    longitude: 113.45,
    zoom: DEFAULT_ZOOM,
  });

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      if (activeLayers.includes("cb") && item.type === "cagar-budaya")
        return true;
      if (activeLayers.includes("odcb") && item.type === "odcb") return true;
      if (activeLayers.includes("wbtb") && item.type === "wbtb") return true;
      return false;
    });
  }, [activeLayers]);

  const currentZoom = viewState.zoom ?? DEFAULT_ZOOM;
  const isClustered = clusterEnabled && currentZoom < CLUSTER_ZOOM;

  // -------------------------------------------------------------------------
  // Grid-based clusters (zoom < CLUSTER_ZOOM)
  // -------------------------------------------------------------------------
  const clusters = useMemo<Cluster[] | null>(() => {
    if (!isClustered) return null;

    const grid: Record<string, CulturalItem[]> = {};

    for (const item of filteredItems) {
      const gridLat = Math.round(item.lat! / GRID_CELL_SIZE) * GRID_CELL_SIZE;
      const gridLng = Math.round(item.lng! / GRID_CELL_SIZE) * GRID_CELL_SIZE;
      const key = `${gridLat.toFixed(4)},${gridLng.toFixed(4)}`;
      if (!grid[key]) grid[key] = [];
      grid[key].push(item);
    }

    return Object.entries(grid).map(([key, items]) => {
      const centerLat =
        items.reduce((sum, it) => sum + it.lat!, 0) / items.length;
      const centerLng =
        items.reduce((sum, it) => sum + it.lng!, 0) / items.length;

      // Dominant type by count
      const typeCounts: Record<string, number> = {};
      for (const item of items) {
        typeCounts[item.type] = (typeCounts[item.type] ?? 0) + 1;
      }
      const dominantType = Object.entries(typeCounts).sort(
        (a, b) => b[1] - a[1],
      )[0][0] as CulturalItem["type"];

      return {
        id: `cluster-${key}`,
        lat: centerLat,
        lng: centerLng,
        count: items.length,
        items,
        dominantType,
      };
    });
  }, [filteredItems, isClustered]);

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------

  const handleMove = useCallback((evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState);
  }, []);

  const handleMarkerClick = useCallback(
    (item: CulturalItem) => {
      setPopupItem(item);
      selectItem(item.id);
    },
    [selectItem],
  );

  const handleClosePopup = useCallback(() => {
    setPopupItem(null);
    selectItem(null);
  }, [selectItem]);

  const handleResetView = useCallback(() => {
    setPopupItem(null);
    mapRef.current?.flyTo({
      center: [113.45, -7.75],
      zoom: DEFAULT_ZOOM,
      duration: 1200,
    });
  }, []);

  const handleClusterClick = useCallback(
    (cluster: Cluster) => {
      const targetZoom = Math.min(currentZoom + 2, MAX_ZOOM);
      mapRef.current?.flyTo({
        center: [cluster.lng, cluster.lat],
        zoom: targetZoom,
        duration: 800,
      });
    },
    [currentZoom],
  );

  // Fly to a pinned item
  useEffect(() => {
    if (selectedItemId && mapRef.current) {
      const item = allItems.find((i) => i.id === selectedItemId);
      if (item?.lat && item?.lng) {
        mapRef.current.flyTo({
          center: [item.lng, item.lat],
          zoom: 13,
          duration: 1500,
        });
      }
    }
  }, [selectedItemId]);

  // GeoJSON boundary source + layers
  useEffect(() => {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const addBoundary = () => {
      if (map.getSource("probolinggo-boundary")) return;
      map.addSource("probolinggo-boundary", {
        type: "geojson",
        data: boundaryData as unknown as GeoJSON.FeatureCollection,
      });
      map.addLayer({
        id: "probolinggo-fill",
        type: "fill",
        source: "probolinggo-boundary",
        paint: {
          "fill-color": "#C0392B",
          "fill-opacity": 0.08,
        },
      });
      map.addLayer({
        id: "probolinggo-fill-soft",
        type: "fill",
        source: "probolinggo-boundary",
        paint: {
          "fill-color": "#D4A843",
          "fill-opacity": 0.025,
        },
      });
      map.addLayer({
        id: "probolinggo-outline",
        type: "line",
        source: "probolinggo-boundary",
        paint: {
          "line-color": "#C0392B",
          "line-width": 3,
          "line-opacity": 0.78,
          "line-dasharray": [3, 1.5],
        },
      });
    };

    if (map.isStyleLoaded()) {
      addBoundary();
    } else {
      map.once("style.load", addBoundary);
    }
  }, []);

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden shadow-map border ${
        mapError ? "border-[#C0392B]" : "border-[#DDD0C0]"
      } ${
        isFullscreen ? "h-full" : "h-[600px] md:h-[700px]"
      }`}
    >
      {mapError ? (
        <div className="flex flex-col items-center justify-center w-full h-full bg-[#FAF5EE] px-6 py-10 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <AlertTriangle className="text-[#C0392B]" size={28} />
          </div>
          <p className="text-[#1C0F08] font-display font-semibold text-lg mb-2">
            Gagal memuat peta
          </p>
          <p className="text-[#6B4F3A] text-sm max-w-xs mb-6">
            Gagal memuat peta. Silakan muat ulang halaman.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-lg bg-[#C0392B] text-white text-sm font-medium hover:bg-[#96231A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] focus-visible:ring-offset-2"
          >
            Muat Ulang
          </button>
        </div>
      ) : (
        <Map
          ref={mapRef}
          {...viewState}
          onMove={handleMove}
          mapStyle={`https://api.maptiler.com/maps/streets-v2-light/style.json?key=${MAPTILER_KEY}`}
          maxBounds={[
            MAP_BOUNDS.sw.lng,
            MAP_BOUNDS.sw.lat,
            MAP_BOUNDS.ne.lng,
            MAP_BOUNDS.ne.lat,
          ]}
          maxZoom={MAX_ZOOM}
          minZoom={MIN_ZOOM}
          mapLib={import("maplibre-gl")}
          style={{ width: "100%", height: "100%" }}
          attributionControl={false}
          onError={() => setMapError(true)}
        >
          <NavigationControl position="top-right" style={{ marginTop: 56 }} />

          {/* ----------------------------------------------------------------- */}
          {/* Cluster markers (zoom < CLUSTER_ZOOM) */}
          {/* ----------------------------------------------------------------- */}
          {isClustered &&
            clusters?.map((cluster) => {
              const color = buildClusterColor(cluster.dominantType);
              const size = clusterSize(cluster.count);
              const fontSize = clusterFontSize(cluster.count);

              return (
                <Marker
                  key={cluster.id}
                  latitude={cluster.lat}
                  longitude={cluster.lng}
                  anchor="center"
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    handleClusterClick(cluster);
                  }}
                >
                  <div
                    className="relative flex items-center justify-center cursor-pointer transition-transform hover:scale-125"
                    style={{ width: size, height: size }}
                    title={`${cluster.count} objek budaya`}
                  >
                    {/* halo ring */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        backgroundColor: color,
                        opacity: 0.2,
                        transform: "scale(1.15)",
                      }}
                    />
                    {/* main circle */}
                    <div
                      className="absolute inset-0 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                      style={{ backgroundColor: color }}
                    >
                      <span
                        className="font-bold text-white select-none leading-none"
                        style={{ fontSize }}
                      >
                        {cluster.count}
                      </span>
                    </div>
                  </div>
                </Marker>
              );
            })}

          {/* ----------------------------------------------------------------- */}
          {/* Individual markers (zoom >= CLUSTER_ZOOM) */}
          {/* ----------------------------------------------------------------- */}
          {!isClustered &&
            filteredItems.map((item) => {
              const badge = getPinBadge(item);
              return (
                <Marker
                  key={item.id}
                  latitude={item.lat!}
                  longitude={item.lng!}
                  anchor="bottom"
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    handleMarkerClick(item);
                  }}
                >
                  <div
                    className="cursor-pointer transition-transform hover:scale-125"
                    title={item.name}
                    dangerouslySetInnerHTML={{
                      __html: buildPinSvg(
                        item.type,
                        badge.pinColor,
                        badge.pinSize,
                      ),
                    }}
                  />
                </Marker>
              );
            })}

          {/* Popup with large close button */}
          {popupItem && popupItem.lat && popupItem.lng && (
            <Popup
              latitude={popupItem.lat}
              longitude={popupItem.lng}
              anchor="top"
              offset={36}
              closeButton={false}
              closeOnClick={false}
              onClose={handleClosePopup}
              maxWidth="320px"
              className="z-50 [&_.maplibregl-popup-content]:!overflow-visible [&_.maplibregl-popup-content]:!rounded-xl [&_.maplibregl-popup-content]:!p-0"
            >
              <div className="relative p-4 min-w-[260px]">
                {/* Custom close button — large, positioned outside */}
                <button
                  onClick={handleClosePopup}
                  className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border border-[#DDD0C0] shadow-md flex items-center justify-center hover:bg-[#C0392B] hover:text-white hover:border-[#C0392B] transition-colors z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B]"
                  aria-label="Tutup popup"
                >
                  <X size={16} />
                </button>
                <PopupCard item={popupItem} />
              </div>
            </Popup>
          )}
        </Map>
      )}

      {/* Filter bar */}
      <MapFilterBar
        activeLayers={activeLayers}
        onToggle={toggleLayer}
        clusterEnabled={clusterEnabled}
        onClusterToggle={() => setClusterEnabled((value) => !value)}
        onResetView={handleResetView}
      />

      {/* Info label */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-card text-xs text-[#6B4F3A]">
        {filteredItems.length} objek budaya
      </div>

      {/* Legend — visible in fullscreen mode */}
      {isFullscreen && (
        <div className="absolute bottom-6 right-6 z-10 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-map border border-[#DDD0C0] text-xs">
          <h4 className="font-semibold text-[#1C0F08] mb-2">Legenda</h4>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C0392B]" />
              <span className="text-[#6B4F3A]">Cagar Budaya (5)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B5E34]" />
              <span className="text-[#6B4F3A]">ODCB (54)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A843]" />
              <span className="text-[#6B4F3A]">WBTB (6)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Popup card
// ---------------------------------------------------------------------------

function PopupCard({ item }: { item: CulturalItem }) {
  const badge = getPinBadge(item);
  const mapsUrl = buildGoogleMapsUrl(item.lat, item.lng);

  return (
    <div>
      <div className="flex flex-wrap gap-1 mb-2">
        <Badge
          variant={
            badge.typeBadge as "type-cb" | "type-odcb" | "type-wbtb"
          }
        >
          {badge.label}
        </Badge>
        {badge.isApprox && (
          <Badge variant="status-approx">Lokasi Perkiraan</Badge>
        )}
      </div>
      <h4
        className="text-base font-display font-bold text-[#1C0F08] mb-1"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {item.displayName || item.name}
      </h4>
      <p className="text-xs text-[#6B4F3A] mb-3">
        {item.locationText || item.district || ""}
      </p>
      {item.description && (
        <p className="text-xs text-[#6B4F3A] line-clamp-3 mb-3">
          {item.description}
        </p>
      )}
      <div className="flex gap-2">
        <button
          disabled
          className="flex-1 text-center text-xs px-3 py-1.5 rounded-lg border border-[#DDD0C0] text-[#6B4F3A] cursor-not-allowed opacity-50"
          title="Segera hadir"
        >
          Lihat Detail
        </button>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center text-xs px-3 py-1.5 rounded-lg bg-[#C0392B] text-white hover:bg-[#96231A] transition-colors no-underline"
        >
          Google Maps
        </a>
      </div>
    </div>
  );
}
