"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import type { homeData } from "@/data/page-home";

interface TestimonialsSectionProps {
  data: typeof homeData.testimonials;
}

function TestimonialCard({ item }: { item: (typeof homeData.testimonials.items)[0] }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-3xl p-8 backdrop-blur-xs flex flex-col justify-between hover:border-amber-400/50 transition-colors shadow-lg relative group">
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-900/80 text-amber-300 border border-emerald-700/60">
            {item.initiative}
          </span>
          <Quote className="h-8 w-8 text-amber-400/40 rotate-180" />
        </div>

        <p className="text-emerald-100 text-sm sm:text-base leading-relaxed italic mb-8">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-emerald-850">
        <div className="relative h-12 w-12 rounded-full overflow-hidden bg-emerald-900 border-2 border-amber-400/60 shrink-0">
          {!imgError ? (
            <Image
              src={item.avatar}
              alt={item.name}
              fill
              sizes="48px"
              className="object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center font-bold text-white text-sm">
              {item.name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-base font-bold text-white leading-tight">
            {item.name}
          </h4>
          <p className="text-xs text-amber-300 font-medium mt-0.5">
            {item.role}
          </p>
          <p className="text-[11px] text-emerald-300/70">
            {item.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
  return (
    <section className="py-20 sm:py-28 bg-[#023420] text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <SectionLabel variant="gold">{data.eyebrow}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {data.heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-emerald-100/90 leading-relaxed">
            {data.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {data.items.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
