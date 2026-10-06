import React from "react";
import { cn } from "@/lib/utils";
import { SectionLabel } from "./SectionLabel";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  theme?: "dark" | "light";
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  theme = "dark",
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-12 sm:mb-16",
        align === "center" && "mx-auto text-center",
        align === "left" && "text-left",
        align === "right" && "ml-auto text-right",
        className
      )}
    >
      {label && (
        <SectionLabel
          variant={theme === "light" ? "light" : "dark"}
          className={align === "center" ? "justify-center" : undefined}
        >
          {label}
        </SectionLabel>
      )}
      <h2
        className={cn(
          "text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold tracking-tight leading-[1.2]",
          theme === "dark" ? "text-slate-900" : "text-white",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base sm:text-lg leading-relaxed",
            theme === "dark" ? "text-slate-600" : "text-emerald-100/90"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
