import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  className?: string;
}

export function PageHero({
  eyebrow,
  heading,
  description,
  breadcrumbs,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative bg-[#023420] text-white pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden",
        className
      )}
    >
      {/* Subtle decorative background curves */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-emerald-400" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full border border-amber-400" />
      </div>

      <Container className="relative z-10">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center gap-2 text-xs sm:text-sm text-emerald-200/80 mb-6"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="h-3.5 w-3.5 text-emerald-400/60" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-white transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        <div className="max-w-3xl">
          {eyebrow && (
            <SectionLabel variant="gold" className="text-amber-400">
              {eyebrow}
            </SectionLabel>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white">
            {heading}
          </h1>
          {description && (
            <p className="mt-5 text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
