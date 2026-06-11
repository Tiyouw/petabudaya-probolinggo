"use client";

import { type SVGProps } from "react";

type LogoProps = SVGProps<SVGSVGElement> & {
  /** Size in pixels — sets both width and height. Default 120. */
  size?: number;
  /** When true, renders a text-free variant (just the shield). Default false. */
  textless?: boolean;
};

/**
 * Reusable placeholder SVG logo for Pemkab Probolinggo.
 *
 * Renders a coat-of-arms / shield emblem in gold (#D4A843) and red (#C0392B)
 * with "PROBOLINGGO" at the bottom. Designed to sit in the Hero and Footer
 * while waiting for the official logo assets.
 *
 * Usage:
 *   <Logo size={96} className="mx-auto" />
 *   <Logo size={64} textless />
 */
export default function Logo({ size = 120, textless = false, className, ...rest }: LogoProps) {
  const w = size;
  const h = textless ? size * 0.85 : size * 1.15;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={textless ? "0 0 200 170" : "0 0 200 240"}
      width={w}
      height={h}
      fill="none"
      className={className}
      aria-label="Lambang Pemerintah Kabupaten Probolinggo"
      role="img"
      {...rest}
    >
      {/* ── Shield outline ── */}
      <path
        d="M100 8 L186 44 L186 124 C186 164 142 192 100 208 C58 192 14 164 14 124 L14 44 Z"
        fill="#C0392B"
        stroke="#D4A843"
        strokeWidth="2.5"
      />

      {/* ── Inner gold border ── */}
      <path
        d="M100 20 L174 52 L174 118 C174 152 136 176 100 190 C64 176 26 152 26 118 L26 52 Z"
        fill="none"
        stroke="#D4A843"
        strokeWidth="1.2"
      />

      {/* ── Horizontal divider bands ── */}
      <line x1="26" y1="74" x2="174" y2="74" stroke="#D4A843" strokeWidth="1" />
      <line x1="26" y1="96" x2="174" y2="96" stroke="#D4A843" strokeWidth="1" />

      {/* ── Star (top compartment) ── */}
      <polygon
        points="100,36 104.7,50 119.5,50 107.6,58.5 112.3,72.5 100,64 87.7,72.5 92.4,58.5 80.5,50 95.3,50"
        fill="#D4A843"
      />

      {/* ── Mountain / volcano (middle compartment — Tengger reference) ── */}
      <polygon points="50,134 100,78 150,134" fill="#D4A843" opacity="0.9" />
      <polygon points="62,134 100,88 138,134" fill="#C0392B" opacity="0.95" />

      {/* ── Two wavy water lines (bottom of middle) ── */}
      <path
        d="M50 150 Q66 144 82 150 Q98 156 114 150 Q130 144 146 150"
        stroke="#D4A843"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M46 158 Q62 152 78 158 Q94 164 110 158 Q126 152 142 158 Q154 164 166 158"
        stroke="#D4A843"
        strokeWidth="1.2"
        fill="none"
      />

      {/* ── Rice & cotton wreath (bottom compartment) ── */}
      {/* Left branch — rice */}
      <g stroke="#D4A843" strokeWidth="1" fill="none" opacity="0.8">
        <path d="M56 182 Q48 174 42 164" />
        <ellipse cx="42" cy="160" rx="3" ry="5" transform="rotate(-30 42 160)" />
        <ellipse cx="38" cy="166" rx="3" ry="5" transform="rotate(-60 38 166)" />
        <ellipse cx="40" cy="172" rx="3" ry="5" transform="rotate(-45 40 172)" />
      </g>
      {/* Right branch — cotton */}
      <g stroke="#D4A843" strokeWidth="1" fill="none" opacity="0.8">
        <path d="M144 182 Q152 174 158 164" />
        <circle cx="158" cy="160" r="4.5" />
        <circle cx="162" cy="166" r="4" />
        <circle cx="160" cy="172" r="3.5" />
      </g>

      {/* ── Ribbon waves at base ── */}
      <path
        d="M44 188 Q100 198 156 188"
        stroke="#D4A843"
        strokeWidth="1"
        fill="none"
      />

      {/* ── Bottom banner background ── */}
      {!textless && (
        <>
          <path
            d="M28 196 L100 206 L172 196 L172 214 L100 224 L28 214 Z"
            fill="#D4A843"
          />
          {/* ── Text: PROBOLINGGO ── */}
          <text
            x="100"
            y="213"
            textAnchor="middle"
            fontFamily="var(--font-display), serif"
            fontSize="9.5"
            fontWeight="700"
            fill="#C0392B"
            letterSpacing="2.2"
          >
            PROBOLINGGO
          </text>
          {/* ── Ribbon fold tips ── */}
          <path
            d="M28 214 L18 220 L28 226 Z"
            fill="#C0392B"
          />
          <path
            d="M172 214 L182 220 L172 226 Z"
            fill="#C0392B"
          />
        </>
      )}
    </svg>
  );
}
