import React from "react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { homeData } from "@/data/page-home";
import type { ProcessBlock } from "@/payload-types";

import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/animation/StaggerGroup";

export interface ProcessSectionProps {
  data?: ProcessBlock | typeof homeData.approach;
}

export function ProcessSection({ data }: ProcessSectionProps) {
  const d = data as any;
  const eyebrow = d?.eyebrow || homeData.approach.eyebrow;
  const heading = d?.heading || homeData.approach.heading;
  const subheading =
    d?.subheading || d?.description || homeData.approach.subheading;
  const steps =
    d?.steps && d.steps.length > 0
      ? d.steps
      : homeData.approach.steps;

  return (
    <section className="py-20 sm:py-28 bg-[#faf9f5] border-t border-slate-200/60">
      <Container>
        <ScrollReveal variant="fade-up" duration={650}>
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <SectionLabel>{eyebrow}</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {heading}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {subheading}
            </p>
          </div>
        </ScrollReveal>

        <StaggerGroup
          staggerInterval={120}
          duration={650}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {steps.map((step: any, idx: number) => {
            const phase = step.phaseTag || step.phase || `Phase ${step.step}`;
            return (
              <StaggerItem key={idx} index={idx}>
                <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2 hover:border-emerald-700/30 h-full">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                        Step
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 text-xs font-extrabold shadow-2xs transition-transform duration-300 group-hover:scale-110">
                        {step.step}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#03452c] transition-colors duration-300 leading-snug">
                      {step.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-800 font-semibold">
                    <span>{phase}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-700 transition-all duration-300 group-hover:scale-150 group-hover:bg-amber-500" />
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
