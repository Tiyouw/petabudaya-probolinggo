"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "filter-chip";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  active?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-[#C0392B] text-white hover:bg-[#96231A] focus-visible:ring-[#C0392B]",
  outline:
    "border-2 border-[#C0392B] text-[#C0392B] hover:bg-[#C0392B] hover:text-white focus-visible:ring-[#C0392B]",
  ghost:
    "text-[#1C0F08] hover:bg-[#F0E6D8] focus-visible:ring-[#C0392B]",
  "filter-chip":
    "rounded-full px-4 py-1.5 text-sm border transition-all focus-visible:ring-2",
};

export default function Button({
  variant = "primary",
  active = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none text-sm";

  const chipStyle = active
    ? "bg-[#C0392B] text-white border-[#C0392B]"
    : "bg-white text-[#1C0F08] border-[#DDD0C0] hover:border-[#C0392B]";

  const style =
    variant === "filter-chip"
      ? `${base} ${chipStyle} ${className}`
      : `${base} ${variantStyles[variant]} ${className}`;

  return (
    <button className={style} {...props}>
      {children}
    </button>
  );
}
