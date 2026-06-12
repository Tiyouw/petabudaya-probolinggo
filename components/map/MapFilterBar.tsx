"use client";

import { PinLayerType } from "@/lib/map-utils";

interface MapFilterBarProps {
  activeLayers: PinLayerType[];
  onToggle: (layer: PinLayerType) => void;
  clusterEnabled: boolean;
  onClusterToggle: () => void;
  onResetView: () => void;
}

const layers: { key: PinLayerType; label: string; color: string }[] = [
  { key: "cb", label: "Cagar Budaya", color: "#C0392B" },
  { key: "odcb", label: "ODCB", color: "#8B5E34" },
  { key: "wbtb", label: "WBTB", color: "#D4A843" },
];

export default function MapFilterBar({
  activeLayers,
  onToggle,
  clusterEnabled,
  onClusterToggle,
  onResetView,
}: MapFilterBarProps) {
  return (
    <div className="absolute bottom-6 left-1/2 z-10 w-[calc(100%-2rem)] -translate-x-1/2">
      <div className="flex flex-col items-center gap-2">
        {/* Layer toggles */}
        <div className="flex flex-wrap justify-center gap-1.5 rounded-2xl border border-[#DDD0C0] bg-white/95 px-2.5 py-2 shadow-map backdrop-blur-sm">
          <span className="mr-1 hidden self-center text-[10px] font-semibold uppercase tracking-wider text-[#6B4F3A] sm:block">
            Tampilkan
          </span>
          {layers.map(({ key, label, color }) => {
            const active = activeLayers.includes(key);
            return (
              <button
                key={key}
                onClick={() => onToggle(key)}
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] ${
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
        </div>

        {/* Second row: Cluster toggle + Reset view + Map instructions */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-[#DDD0C0] bg-white/95 px-2.5 py-2 shadow-map backdrop-blur-sm">
          <button
            onClick={onClusterToggle}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] ${
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
            <span className="flex items-center gap-1">
              Cluster
              <span className="text-[9px] opacity-60">{clusterEnabled ? "ON" : "OFF"}</span>
            </span>
          </button>

          <span className="h-4 w-px bg-[#DDD0C0]" aria-hidden="true" />

          <button
            onClick={onResetView}
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-medium text-[#6B4F3A] transition-all hover:bg-[#F0E6D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B]"
            title="Kembali ke tampilan awal"
            aria-label="Reset tampilan peta"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="8" cy="8" r="6" />
              <path d="M8 4v4l2.5 2" />
            </svg>
            Reset Peta
          </button>

          {/* Map instructions tooltip */}
          <div className="group/help relative">
            <button
              className="flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[11px] text-[#6B4F3A] transition-all hover:bg-[#F0E6D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B]"
              aria-label="Cara menggunakan peta"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="8" cy="8" r="6" />
                <path d="M6 6.5c0-.8.6-2 2-2s2 .9 2 1.5c0 .8-.5 1.2-1 1.5-.6.4-1 .8-1 1.5v.5" />
                <circle cx="8" cy="12" r="0.5" fill="currentColor" />
              </svg>
            </button>
            <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 hidden group-hover/help:block z-20">
              <div className="w-56 rounded-xl bg-[#1C0F08] px-3 py-2.5 text-[11px] text-[#DDD0C0] shadow-xl border border-[#6B4F3A]">
                <p className="mb-1 flex items-center gap-1.5"><span className="font-semibold text-white">Klik</span> pin untuk detail</p>
                <p className="mb-1 flex items-center gap-1.5"><span className="font-semibold text-white">Geser</span> untuk navigasi peta</p>
                <p className="flex items-center gap-1.5"><span className="font-semibold text-white">Klik kanan + geser</span> ubah perspektif</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
