import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { aboutData } from "@/data/page-about";
import type { TransparencyBlock } from "@/payload-types";

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
    <section id="transparency" className="py-20 bg-[#023420] text-white">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
            {eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {heading}
          </h2>
          <p className="text-emerald-100/90 text-base leading-relaxed">
            {description}
          </p>

          <div className="grid grid-cols-3 gap-4 pt-6 max-w-xl mx-auto">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="bg-emerald-950/80 border border-emerald-800 rounded-2xl p-4 text-center"
              >
                <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                  {item.value}
                </p>
                <p className="text-xs text-emerald-200 mt-1">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {ctaText && (
            <div className="pt-6">
              <Button
                asChild
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-full px-8 py-3 h-auto"
              >
                <Link href={ctaLink} className="inline-flex items-center gap-2">
                  <span>{ctaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export default TransparencyComponent;
