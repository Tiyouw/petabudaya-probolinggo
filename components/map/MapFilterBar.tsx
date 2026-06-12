"use client";

import { PinLayerType } from "@/lib/map-utils";

interface MapFilterBarProps {
  activeLayers: PinLayerType[];
  onToggle: (layer: PinLayerType) => void;
  clusterEnabled: boolean;
  onClusterToggle: () => void;
}

const layers: { key: PinLayerType; label: string; color: string }[] = [
  { key: "cb", label: "Cagar Budaya", color: "#C0392B" },
  { key: "odcb", label: "ODCB", color: "#8B5E34" },
  { key: "wbtb", label: "WBTB", color: "#D4A843" },
  { key: "opk", label: "OPK", color: "#6B4F3A" },
];

export default function MapFilterBar({
  activeLayers,
  onToggle,
  clusterEnabled,
  onClusterToggle,
}: MapFilterBarProps) {
  return (
    <div className="absolute bottom-6 left-1/2 z-10 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2">
      <div className="flex flex-wrap justify-center gap-2 rounded-2xl border border-[#DDD0C0] bg-white/95 px-2 py-2 shadow-map backdrop-blur-sm sm:rounded-full">
        {layers.map(({ key, label, color }) => {
          const active = activeLayers.includes(key);
          return (
            <button
              key={key}
              onClick={() => onToggle(key)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] ${
                active
                  ? "bg-[#C0392B] text-white shadow-sm"
                  : "bg-transparent text-[#6B4F3A] hover:bg-[#F0E6D8]"
              }`}
              aria-pressed={active}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: active ? "white" : color }}
              />
              {label}
            </button>
          );
        })}
        <button
          onClick={onClusterToggle}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] ${
            clusterEnabled
              ? "bg-[#1C0F08] text-white shadow-sm"
              : "bg-transparent text-[#6B4F3A] hover:bg-[#F0E6D8]"
          }`}
          aria-pressed={clusterEnabled}
        >
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              clusterEnabled ? "bg-[#D4A843]" : "bg-[#C4B5A5]"
            }`}
          />
          Cluster
        </button>
      </div>
    </div>
  );
}
