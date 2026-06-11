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
import { X } from "lucide-react";
import { CulturalItem } from "@/data/types";
import { allCulturalSites } from "@/data/cultural-sites";
import { wbtbItems } from "@/data/wbtb";
import {
  MAP_BOUNDS,
  DEFAULT_ZOOM,
  MAX_ZOOM,
  MIN_ZOOM,
  getPinBadge,
  buildGoogleMapsUrl,
} from "@/lib/map-utils";
import Badge from "@/components/ui/Badge";
import MapFilterBar from "./MapFilterBar";
import { useMapFilter } from "@/hooks/useMapFilter";
import boundaryData from "@/data/probolinggo-boundary.json";

const MAPTILER_KEY = "GuKF8sEbZEmRlalTzWEl";

// SVGs for pin icons (not lucide-react — MapLibre markers need raw HTML/SVG strings)
const pinIcons: Record<string, string> = {
  "cagar-budaya":
    '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="16" y2="11"/>',
  odcb:
    '<circle cx="12" cy="12" r="9"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  wbtb:
    '<polygon points="12,2 15,9 22,9 16,14 18,21 12,17 6,21 8,14 2,9 9,9"/>',
};

function getPinSvg(type: string, color: string, size: number): string {
  const inner = pinIcons[type] || pinIcons["odcb"];
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${
    size + 8
  }" viewBox="0 0 24 32" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="10" r="9" fill="${color}" opacity="0.25"/>
      <circle cx="12" cy="10" r="7" fill="${color}" stroke="white" stroke-width="2"/>
      ${inner.replace(/stroke="[^"]*"/g, 'stroke="white" stroke-width="1.5"')}
      <polygon points="12,28 7,18 17,18" fill="${color}"/>
    </svg>
  `;
}

// Merge all mappable items
const allItems: CulturalItem[] = [
  ...allCulturalSites,
  ...wbtbItems,
].filter((item) => item.lat !== undefined && item.lng !== undefined);

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

  const handleMove = useCallback((evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState);
  }, []);

  const handleMarkerClick = useCallback(
    (item: CulturalItem) => {
      setPopupItem(item);
      selectItem(item.id);
    },
    [selectItem]
  );

  const handleClosePopup = useCallback(() => {
    setPopupItem(null);
    selectItem(null);
  }, [selectItem]);

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
          "fill-opacity": 0.06,
        },
      });
      map.addLayer({
        id: "probolinggo-outline",
        type: "line",
        source: "probolinggo-boundary",
        paint: {
          "line-color": "#C0392B",
          "line-width": 2.5,
          "line-opacity": 0.5,
          "line-dasharray": [4, 2],
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
      className={`relative w-full rounded-2xl overflow-hidden shadow-map border border-[#DDD0C0] ${
        isFullscreen ? "h-full" : "h-[600px] md:h-[700px]"
      }`}
    >
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
      >
        <NavigationControl position="top-right" />

        {/* Markers */}
        {filteredItems.map((item) => {
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
                  __html: getPinSvg(item.type, badge.pinColor, badge.pinSize),
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

      {/* Filter bar */}
      <MapFilterBar activeLayers={activeLayers} onToggle={toggleLayer} />

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

// Popup card
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
