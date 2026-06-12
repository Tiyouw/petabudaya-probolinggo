"use client";

import { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";
import CultureMap from "./CultureMap";

export default function MapFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      {/* Normal view */}
      <div className={`relative ${isFullscreen ? "hidden" : ""}`}>
        <CultureMap />
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-3 right-3 z-20 p-2 rounded-lg bg-white/90 backdrop-blur-sm border border-[#DDD0C0] shadow-card hover:bg-[#F0E6D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B]"
          aria-label="Buka peta layar penuh"
        >
          <Maximize2 size={18} className="text-[#6B4F3A]" />
        </button>
      </div>

      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-4 md:inset-6 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#C0392B]">
            <CultureMap isFullscreen />
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-3 right-3 z-20 p-2 rounded-lg bg-white/90 backdrop-blur-sm border border-[#DDD0C0] shadow-card hover:bg-[#F0E6D8] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B]"
              aria-label="Tutup peta layar penuh"
            >
              <Minimize2 size={18} className="text-[#6B4F3A]" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
