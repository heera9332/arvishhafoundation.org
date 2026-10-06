import React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  variant?: "dark" | "light" | "gold";
}

export function SectionLabel({
  children,
  className,
  variant = "dark",
}: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3",
        variant === "dark" && "text-emerald-800",
        variant === "light" && "text-emerald-200",
        variant === "gold" && "text-amber-500",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 inline-block" />
      {children}
    </div>
  );
}
