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
import { CulturalItem } from "@/data/types";
import { allCulturalSites } from "@/data/cultural-sites";
import { wbtbItems } from "@/data/wbtb";
import { MAP_BOUNDS, DEFAULT_ZOOM, MAX_ZOOM, MIN_ZOOM, CLUSTER_ZOOM, PinLayerType, getPinBadge, buildGoogleMapsUrl } from "@/lib/map-utils";
import Badge from "@/components/ui/Badge";
import MapFilterBar from "./MapFilterBar";
import { useMapFilter } from "@/hooks/useMapFilter";

const MAPTILER_KEY = "GuKF8sEbZEmRlalTzWEl";

function getPinIcon(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="14" r="12" fill="${color}" opacity="0.2"/>
      <circle cx="18" cy="14" r="8" fill="${color}" stroke="white" stroke-width="2"/>
      <path d="M18 34 L10 20 L26 20 Z" fill="${color}"/>
    </svg>
  `;
}

function getPinDataUrl(color: string, size: number): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(getPinIcon(color, size))}`;
}

// Merge all mappable items
const allItems: CulturalItem[] = [
  ...allCulturalSites,
  ...wbtbItems,
].filter((item) => item.lat !== undefined && item.lng !== undefined);

export default function CultureMap() {
  const mapRef = useRef<MapRef>(null);
  const { activeLayers, toggleLayer, selectedItemId, selectItem } = useMapFilter({
    defaultLayers: ["cb", "odcb", "wbtb"],
  });
  const [popupItem, setPopupItem] = useState<CulturalItem | null>(null);

  const [viewState, setViewState] = useState<Partial<ViewState>>({
    latitude: -7.73,
    longitude: 113.57,
    zoom: DEFAULT_ZOOM,
  });

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      if (activeLayers.includes("cb") && item.type === "cagar-budaya") return true;
      if (activeLayers.includes("odcb") && item.type === "odcb") return true;
      if (activeLayers.includes("wbtb") && item.type === "wbtb") return true;
      return false;
    });
  }, [activeLayers]);

  const handleMove = useCallback((evt: ViewStateChangeEvent) => {
    setViewState(evt.viewState);
  }, []);

  const handleMarkerClick = useCallback((item: CulturalItem) => {
    setPopupItem(item);
    selectItem(item.id);
  }, [selectItem]);

  const handleClosePopup = useCallback(() => {
    setPopupItem(null);
    selectItem(null);
  }, [selectItem]);

  // Fly to a pinned item
  useEffect(() => {
    if (selectedItemId && mapRef.current) {
      const item = allItems.find((i) => i.id === selectedItemId);
      if (item?.lat && item?.lng) {
        mapRef.current.flyTo({ center: [item.lng, item.lat], zoom: 13, duration: 1500 });
      }
    }
  }, [selectedItemId]);

  return (
    <div className="relative w-full h-[600px] md:h-[700px] rounded-2xl overflow-hidden shadow-map border border-[#DDD0C0]">
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
              >
                <div
                  style={{
                    width: badge.pinSize,
                    height: badge.pinSize + 10,
                    position: "relative",
                  }}
                >
                  {/* Simple CSS pin */}
                  <div
                    style={{
                      width: badge.pinSize,
                      height: badge.pinSize,
                      borderRadius: "50%",
                      backgroundColor: badge.pinColor,
                      border: "3px solid white",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: badge.pinSize * 0.4,
                    }}
                  >
                    {item.type === "cagar-budaya" && "🏛"}
                    {item.type === "odcb" && "?"}
                    {item.type === "wbtb" && "✦"}
                  </div>
                  {/* Pin tail */}
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: "6px solid transparent",
                      borderRight: "6px solid transparent",
                      borderTop: `10px solid ${badge.pinColor}`,
                      margin: "0 auto",
                      marginTop: -2,
                    }}
                  />
                </div>
              </div>
            </Marker>
          );
        })}

        {/* Popup */}
        {popupItem && popupItem.lat && popupItem.lng && (
          <Popup
            latitude={popupItem.lat}
            longitude={popupItem.lng}
            anchor="top"
            offset={30}
            closeButton={true}
            closeOnClick={false}
            onClose={handleClosePopup}
            maxWidth="320px"
            className="z-50"
          >
            <PopupCard item={popupItem} />
          </Popup>
        )}
      </Map>

      {/* Filter bar */}
      <MapFilterBar activeLayers={activeLayers} onToggle={toggleLayer} />

      {/* Info label */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-card text-xs text-[#6B4F3A]">
        {filteredItems.length} objek budaya
      </div>
    </div>
  );
}

// Popup card
function PopupCard({ item }: { item: CulturalItem }) {
  const badge = getPinBadge(item);
  const mapsUrl = buildGoogleMapsUrl(item.lat, item.lng);

  return (
    <div className="p-3 min-w-[240px]">
      <div className="flex flex-wrap gap-1 mb-2">
        <Badge variant={badge.typeBadge as "type-cb" | "type-odcb" | "type-wbtb"}>{badge.label}</Badge>
        {badge.isApprox && <Badge variant="status-approx">📍 Lokasi Perkiraan</Badge>}
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
          Maps ↗
        </a>
      </div>
    </div>
  );
}
