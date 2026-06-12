"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error boundary caught:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAF5EE] px-6 py-10 text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C0392B"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h1 className="text-2xl font-display font-bold text-[#1C0F08] mb-3">
        Terjadi Kesalahan
      </h1>
      <p className="text-[#6B4F3A] text-sm max-w-md mb-6">
        Maaf, terjadi kesalahan yang tidak terduga. Silakan coba lagi.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 rounded-xl bg-[#C0392B] text-white text-sm font-medium hover:bg-[#96231A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] focus-visible:ring-offset-2"
      >
        Coba Lagi
      </button>
    </div>
  );
}
