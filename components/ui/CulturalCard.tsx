import { CulturalItem } from "@/data/types";
import Badge from "./Badge";
import { getPinBadge } from "@/lib/map-utils";

type CardVariant = "compact" | "featured" | "official" | "carousel";

interface CulturalCardProps {
  item: CulturalItem;
  variant?: CardVariant;
  className?: string;
}

const cardVariants: Record<CardVariant, string> = {
  compact: "p-4 rounded-xl",
  featured: "p-5 rounded-xl",
  official: "p-6 rounded-xl border-l-4 border-[#C0392B]",
  carousel: "p-4 rounded-xl min-w-[200px] max-w-[240px] md:min-w-[220px] md:max-w-[280px]",
};

export default function CulturalCard({
  item,
  variant = "compact",
  className = "",
}: CulturalCardProps) {
  const pinBadge = getPinBadge(item);

  return (
    <div
      className={`bg-white shadow-card hover:shadow-lift transition-shadow ${cardVariants[variant]} ${className}`}
    >
      {/* Type + Confidence badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <Badge variant={pinBadge.typeBadge as "type-cb" | "type-odcb" | "type-wbtb"}>
          {pinBadge.label}
        </Badge>
        {pinBadge.isApprox && (
          <Badge variant="status-approx">📍 Lokasi Perkiraan</Badge>
        )}
        {item.confidence === "needs-validation" && (
          <Badge variant="status-validation">⚠️ Perlu Validasi</Badge>
        )}
      </div>

      {/* Name */}
      <h3
        className={`font-display text-[#1C0F08] mb-1 ${
          variant === "official" ? "text-xl" : "text-lg"
        }`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {item.displayName || item.name}
      </h3>

      {/* Location */}
      {item.locationText && (
        <p className="text-sm text-[#6B4F3A] mb-2">{item.locationText}</p>
      )}

      {/* SK Number */}
      {item.skNumber && (
        <p className="text-xs text-[#6B4F3A] mb-2 font-mono" style={{ fontFamily: "var(--font-mono)" }}>
          {item.skNumber}
          {item.skDate && ` · ${item.skDate}`}
        </p>
      )}

      {/* Notes */}
      {item.notes && (
        <p className="text-xs text-[#6B4F3A] mt-2 italic">{item.notes}</p>
      )}

      {/* Actions slot — "Lihat di Peta" rendered by parent */}
    </div>
  );
}
