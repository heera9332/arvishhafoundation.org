import React from "react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import type { homeData } from "@/data/page-home";

interface ProcessSectionProps {
  data: typeof homeData.approach;
}

export function ProcessSection({ data }: ProcessSectionProps) {
  return (
    <section className="py-20 sm:py-28 bg-[#faf9f5] border-t border-slate-200/60">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <SectionLabel>{data.eyebrow}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {data.heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {data.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {data.steps.map((step) => (
            <div
              key={step.step}
              className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Step
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 text-xs font-extrabold shadow-2xs">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#03452c] transition-colors leading-snug">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-800 font-semibold">
                <span>Phase {step.step}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
