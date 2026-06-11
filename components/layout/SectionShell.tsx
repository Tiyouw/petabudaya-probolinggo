import { ReactNode } from "react";

interface SectionShellProps {
  id: string;
  className?: string;
  children: ReactNode;
  fullWidth?: boolean;
}

export default function SectionShell({
  id,
  className = "",
  children,
  fullWidth = false,
}: SectionShellProps) {
  return (
    <section id={id} className={`relative py-20 md:py-28 ${className}`}>
      {fullWidth ? (
        children
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      )}
    </section>
  );
}
