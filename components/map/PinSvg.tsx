"use client";

import { useId } from "react";

interface PinSvgProps {
  type: string;
  color: string;
  size: number;
}

export default function PinSvg({ type, color, size }: PinSvgProps) {
  const filterId = useId().replace(/[:.]/g, "");

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size + 10}
      viewBox="0 0 24 34"
      aria-hidden="true"
    >
      <defs>
        <filter
          id={filterId}
          x="-20%"
          y="-20%"
          width="140%"
          height="150%"
        >
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="1.6"
            floodColor="#1C0F08"
            floodOpacity="0.25"
          />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>
        <circle cx="12" cy="12" r="10.2" fill={color} opacity="0.22" />
        <path
          d="M12 32 6.9 21.4h10.2L12 32Z"
          fill={color}
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="12"
          r="9"
          fill={color}
          stroke="white"
          strokeWidth="2.2"
        />
        <PinIcon type={type} />
      </g>
    </svg>
  );
}

function PinIcon({ type }: { type: string }) {
  switch (type) {
    case "cagar-budaya":
      return (
        <>
          <path
            d="M7.4 10.1h9.2v5.6H7.4z"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M6.4 10.1 12 6.5l5.6 3.6"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.4 15.7v-3h3.2v3"
            fill="none"
            stroke="white"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </>
      );
    case "odcb":
      return (
        <>
          <path
            d="M8.2 8.8c.8-1.5 2.2-2.3 4-2.1 2 .2 3.4 1.5 3.4 3.2 0 1.6-1 2.4-2.4 3.2-.9.5-1.2.9-1.2 1.8"
            fill="none"
            stroke="white"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
          <circle cx="12" cy="17.2" r="1.25" fill="white" />
        </>
      );
    case "wbtb":
      return (
        <path
          d="m12 6.6 1.25 3.15 3.35.25-2.58 2.13.8 3.27L12 13.62 9.18 15.4l.8-3.27L7.4 10l3.35-.25L12 6.6Z"
          fill="none"
          stroke="white"
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
      );
    default:
      return (
        <>
          <path
            d="M8.2 8.8c.8-1.5 2.2-2.3 4-2.1 2 .2 3.4 1.5 3.4 3.2 0 1.6-1 2.4-2.4 3.2-.9.5-1.2.9-1.2 1.8"
            fill="none"
            stroke="white"
            strokeWidth="1.9"
            strokeLinecap="round"
          />
          <circle cx="12" cy="17.2" r="1.25" fill="white" />
        </>
      );
  }
}
