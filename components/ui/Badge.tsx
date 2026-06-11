type BadgeVariant =
  | "type-cb"
  | "type-odcb"
  | "type-wbtb"
  | "type-opk"
  | "status-official"
  | "status-approx"
  | "status-validation"
  | "year";

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  "type-cb": "bg-[#C0392B] text-white",
  "type-odcb": "bg-white border border-[#C0392B] text-[#C0392B]",
  "type-wbtb": "bg-[#D4A843] text-[#1C0F08]",
  "type-opk": "bg-[#FAF5EE] text-[#1C0F08] border border-[#DDD0C0]",
  "status-official": "bg-[#E8F5E9] text-[#2E7D32]",
  "status-approx": "bg-[#EFF6FF] text-[#1E40AF]",
  "status-validation": "bg-[#FEF3C7] text-[#92400E]",
  year: "bg-[#D4A843] text-[#1C0F08]",
};

export default function Badge({ variant, children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
