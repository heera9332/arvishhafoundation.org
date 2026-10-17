import React from "react";
import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { homeData } from "@/data/page-home";
import type { ImpactStatsBlock } from "@/payload-types";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/animation/StaggerGroup";
import { AnimatedCounter } from "@/components/animation/AnimatedCounter";

export interface ImpactDarkSectionProps {
  data?: ImpactStatsBlock | typeof homeData.impactDark;
}

export function ImpactDarkSection({ data }: ImpactDarkSectionProps) {
  const d = data as any;
  const eyebrow = d?.eyebrow || homeData.impactDark.eyebrow;
  const heading = d?.heading || homeData.impactDark.heading;
  const description = d?.description || homeData.impactDark.description;
  const stats =
    d?.stats && d.stats.length > 0
      ? d.stats
      : homeData.impactDark.stats;
  const features =
    d?.features && d.features.length > 0
      ? d.features
      : homeData.impactDark.features;

  return (
    <section className="py-20 sm:py-28 bg-[#023420] text-white relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full border border-emerald-400 animate-float-slow" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full border border-amber-400 animate-float-delayed" />
      </div>

      <Container className="relative z-10">
        <ScrollReveal variant="fade-up" duration={700}>
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <SectionLabel variant="gold">{eyebrow}</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {heading}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-emerald-100/90 leading-relaxed">
              {description}
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Impact Statistics Grid with Staggered Entrance & Counter */}
        <StaggerGroup
          staggerInterval={100}
          duration={650}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16"
        >
          {stats.map((stat: any, idx: number) => (
            <StaggerItem key={stat.id || idx} index={idx}>
              <div className="bg-emerald-950/70 border border-emerald-800/80 rounded-3xl p-6 sm:p-8 text-center backdrop-blur-xs hover:border-amber-400/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-950/80 group">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-400 mb-2 transition-transform duration-300 group-hover:scale-105">
                  <AnimatedCounter value={stat.value} />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {stat.label}
                </h4>
                {stat.sublabel && (
                  <p className="mt-1 text-xs sm:text-sm text-emerald-200/80">
                    {stat.sublabel}
                  </p>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* 3 Value Pillars with Staggered Entrance */}
        <StaggerGroup
          baseDelay={200}
          staggerInterval={120}
          duration={650}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-emerald-850"
        >
          {features.map((feat: any, idx: number) => (
            <StaggerItem key={idx} index={idx}>
              <div className="flex items-start gap-4 group p-3 rounded-2xl transition-all duration-300 hover:bg-emerald-900/30">
                <div className="h-10 w-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-amber-400/30">
                  {idx === 0 && <Check className="h-5 w-5" />}
                  {idx === 1 && <ShieldCheck className="h-5 w-5" />}
                  {idx === 2 && <Sparkles className="h-5 w-5" />}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1.5 group-hover:text-amber-300 transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}

