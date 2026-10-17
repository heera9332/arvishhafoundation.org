import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { aboutData } from "@/data/page-about";
import type { TransparencyBlock } from "@/payload-types";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/animation/StaggerGroup";
import { AnimatedCounter } from "@/components/animation/AnimatedCounter";

export interface TransparencyComponentProps {
  data?: TransparencyBlock | Record<string, unknown>;
}

export function TransparencyComponent(
  props: TransparencyComponentProps | TransparencyBlock
) {
  const block = (("data" in props && props.data ? props.data : props) || {}) as Partial<TransparencyBlock>;

  const eyebrow = block.eyebrow || "Accountability & Trust";
  const heading = block.heading || aboutData.transparency.heading;
  const description = block.description || aboutData.transparency.description;
  const stats =
    block.stats && block.stats.length > 0
      ? block.stats
      : aboutData.transparency.stats;

  const ctaText = block.ctaText || "Connect With Our Governance Team";
  const ctaLink = block.ctaLink || "/contact";

  return (
    <section id="transparency" className="py-20 bg-[#023420] text-white overflow-hidden">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <ScrollReveal variant="fade-up" duration={700}>
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              {eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-2">
              {heading}
            </h2>
            <p className="text-emerald-100/90 text-base leading-relaxed mt-3">
              {description}
            </p>
          </ScrollReveal>

          <StaggerGroup
            staggerDelay={120}
            initialDelay={150}
            className="grid grid-cols-3 gap-4 pt-6 max-w-xl mx-auto"
          >
            {stats.map((item, idx) => (
              <StaggerItem key={idx}>
                <div
                  className="group bg-emerald-950/80 border border-emerald-800 rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-lg hover:shadow-emerald-950/60"
                >
                  <p className="text-2xl sm:text-3xl font-extrabold text-amber-400 group-hover:scale-105 transition-transform">
                    <AnimatedCounter value={item.value} />
                  </p>
                  <p className="text-xs text-emerald-200 mt-1">
                    {item.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {ctaText && (
            <ScrollReveal variant="fade-up" duration={600} delay={300}>
              <div className="pt-6">
                <Button
                  asChild
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-full px-8 py-3 h-auto transition-transform duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-950/50"
                >
                  <Link href={ctaLink} className="inline-flex items-center gap-2 group">
                    <span>{ctaText}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          )}
        </div>
      </Container>
    </section>
  );
}

export default TransparencyComponent;
