"use client";

import { PinLayerType } from "@/lib/map-utils";

interface MapFilterBarProps {
  activeLayers: PinLayerType[];
  onToggle: (layer: PinLayerType) => void;
}

const layers: { key: PinLayerType; label: string; color: string }[] = [
  { key: "cb", label: "Cagar Budaya", color: "#C0392B" },
  { key: "odcb", label: "ODCB", color: "#8B5E34" },
  { key: "wbtb", label: "WBTB", color: "#D4A843" },
  { key: "opk", label: "OPK", color: "#6B4F3A" },
];

export default function MapFilterBar({ activeLayers, onToggle }: MapFilterBarProps) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
      <div className="flex gap-2 bg-white/95 backdrop-blur-sm rounded-full px-2 py-2 shadow-map border border-[#DDD0C0]">
        {layers.map(({ key, label, color }) => {
          const active = activeLayers.includes(key);
          return (
            <button
              key={key}
              onClick={() => onToggle(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] ${
                active
                  ? "bg-[#C0392B] text-white shadow-sm"
                  : "bg-transparent text-[#6B4F3A] hover:bg-[#F0E6D8]"
              }`}
            >
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: active ? "white" : color }}
              />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
