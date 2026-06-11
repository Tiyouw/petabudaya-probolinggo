"use client";

import dynamic from "next/dynamic";

const CultureMap = dynamic(() => import("./CultureMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] md:h-[700px] rounded-2xl bg-[#F0E6D8] animate-pulse flex items-center justify-center">
      <span className="text-[#6B4F3A] text-sm">Memuat peta interaktif...</span>
    </div>
  ),
});

export default function MapSection() {
  return <CultureMap />;
}
