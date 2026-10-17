import React from "react";
import Link from "next/link";
import { Heart, UserPlus, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { homeData } from "@/data/page-home";
import type { CTABlock } from "@/payload-types";

import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { FloatingElement } from "@/components/animation/FloatingElement";

export interface CTASectionProps {
  data?: CTABlock | typeof homeData.cta;
}

export function CTASection({ data }: CTASectionProps) {
  const d = data as any;
  const badge = d?.badge || "Join Hands With Arvishha";
  const heading = d?.heading || homeData.cta.heading;
  const subheading = d?.subheading || homeData.cta.subheading;
  const primaryCta = {
    label: d?.primaryCta?.label || homeData.cta.primaryCta.label,
    href: d?.primaryCta?.url || d?.primaryCta?.href || homeData.cta.primaryCta.href,
  };
  const secondaryCta = {
    label: d?.secondaryCta?.label || homeData.cta.secondaryCta.label,
    href: d?.secondaryCta?.url || d?.secondaryCta?.href || homeData.cta.secondaryCta.href,
  };

  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container>
        <ScrollReveal variant="zoom-in" duration={700}>
          <div className="relative rounded-3xl bg-gradient-to-br from-[#023420] via-[#03452c] to-[#012215] text-white p-8 sm:p-14 lg:p-20 shadow-2xl overflow-hidden border border-emerald-800">
            {/* Subtle decorative circles with ambient float */}
            <FloatingElement
              animation="slow"
              className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full border border-amber-400/20 pointer-events-none"
            />
            <FloatingElement
              animation="delayed"
              className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full border border-emerald-400/20 pointer-events-none"
            />

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-700/60 text-amber-300 text-xs font-semibold tracking-wider uppercase transition-transform duration-300 hover:scale-105">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse-subtle" />
                {badge}
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {heading}
              </h2>

              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl mx-auto">
                {subheading}
              </p>

              <div className="pt-4 flex flex-wrap gap-4 justify-center">
                {primaryCta.label && (
                  <Button
                    asChild
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-3.5 h-auto text-base rounded-full shadow-lg hover:shadow-amber-400/20 hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <Link href={primaryCta.href} className="inline-flex items-center gap-2">
                      <Heart className="h-5 w-5 fill-slate-950 text-slate-950 animate-pulse-subtle" />
                      <span>{primaryCta.label}</span>
                    </Link>
                  </Button>
                )}

                {secondaryCta.label && (
                  <Button
                    asChild
                    variant="outline"
                    className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-xs px-7 py-3.5 h-auto text-base rounded-full hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <Link href={secondaryCta.href} className="inline-flex items-center gap-2">
                      <UserPlus className="h-5 w-5 text-amber-300" />
                      <span>{secondaryCta.label}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
