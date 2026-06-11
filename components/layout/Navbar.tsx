"use client";

import { useState } from "react";

const navLinks = [
  { label: "Beranda", href: "#hero" },
  { label: "Peta", href: "#peta" },
  { label: "Cagar Budaya", href: "#cagar-budaya" },
  { label: "WBTB", href: "#wbtb" },
  { label: "OPK", href: "#opk" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF5EE]/95 backdrop-blur-sm border-b border-[#DDD0C0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2 text-lg font-display font-bold text-[#1C0F08] no-underline"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-[#C0392B]">●</span>
            PetaBudaya Probolinggo
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-[#6B4F3A] hover:text-[#C0392B] hover:bg-[#F0E6D8] transition-colors no-underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 rounded-lg text-[#6B4F3A] hover:bg-[#F0E6D8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B]"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[#DDD0C0] bg-[#FAF5EE]">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-[#6B4F3A] hover:text-[#C0392B] hover:bg-[#F0E6D8] transition-colors no-underline"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
