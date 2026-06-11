"use client";

// ---------------------------------------------------------------------------
// SkeletonLoader — reusable pulse-animated placeholders
//
// Variants:
//   SkeletonCard  – card-sized block  (w-full h-40 rounded-xl)
//   SkeletonGrid  – responsive grid of SkeletonCards (count prop, default 3)
//   SkeletonText  – single line        (width prop, default "w-3/4")
// ---------------------------------------------------------------------------

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`w-full h-40 rounded-xl bg-[#F0E6D8] animate-pulse ${className}`}
    />
  );
}

export function SkeletonGrid({
  count = 3,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
    >
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonText({
  width = "w-3/4",
  className = "",
}: {
  width?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`h-4 rounded-md bg-[#F0E6D8] animate-pulse ${width} ${className}`}
    />
  );
}
