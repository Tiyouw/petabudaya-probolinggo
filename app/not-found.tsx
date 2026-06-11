import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#1C0F08] overflow-hidden">
      {/* Subtle pattern overlay */}
      <div
        className="pattern-overlay absolute inset-0 pointer-events-none opacity-30"
        aria-hidden="true"
      />

      {/* Decorative corner motifs */}
      <div
        className="absolute top-0 left-0 w-64 h-64 opacity-[0.04] pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="128" fill="#D4A843" />
          <circle cx="0" cy="0" r="96" fill="none" stroke="#D4A843" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="64" fill="none" stroke="#D4A843" strokeWidth="0.5" />
        </svg>
      </div>
      <div
        className="absolute bottom-0 right-0 w-64 h-64 opacity-[0.04] pointer-events-none rotate-180"
        aria-hidden="true"
      >
        <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="0" cy="0" r="128" fill="#D4A843" />
          <circle cx="0" cy="0" r="96" fill="none" stroke="#D4A843" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="64" fill="none" stroke="#D4A843" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        {/* 404 number */}
        <p
          className="text-[140px] md:text-[180px] leading-none font-bold text-[#C0392B] opacity-20 select-none"
          style={{ fontFamily: "var(--font-display)" }}
          aria-hidden="true"
        >
          404
        </p>

        {/* Heading */}
        <h1
          className="text-3xl md:text-4xl font-bold text-[#F0E6D8] mb-4 -mt-10"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Halaman Tidak Ditemukan
        </h1>

        {/* Subtext */}
        <p className="text-base text-[#6B4F3A] mb-10 max-w-sm mx-auto leading-relaxed">
          Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>

        {/* Back to home link — styled like primary Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C0392B] bg-[#C0392B] text-white hover:bg-[#96231A]"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
