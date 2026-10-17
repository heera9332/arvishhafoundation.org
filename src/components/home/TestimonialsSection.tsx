"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { homeData } from "@/data/page-home";
import type { TestimonialsBlock } from "@/payload-types";

import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/animation/StaggerGroup";

export interface TestimonialsSectionProps {
  data?: TestimonialsBlock | typeof homeData.testimonials;
}

function TestimonialCard({ item }: { item: any }) {
  const [imgError, setImgError] = useState(false);
  const avatarSrc =
    typeof item.avatar === "object" && item.avatar?.url
      ? item.avatar.url
      : item.avatarUrl ||
        (typeof item.avatar === "string" ? item.avatar : "/images/avatar-1.png");

  return (
    <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-3xl p-8 backdrop-blur-xs flex flex-col justify-between hover:border-amber-400/80 transition-all duration-300 hover:-translate-y-2 shadow-lg relative group h-full hover:shadow-2xl hover:shadow-emerald-950/90">
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-900/80 text-amber-300 border border-emerald-700/60 transition-colors group-hover:border-amber-400/60">
            {item.initiative || "Community"}
          </span>
          <Quote className="h-8 w-8 text-amber-400/40 rotate-180 transition-all duration-300 group-hover:scale-115 group-hover:text-amber-400/80" />
        </div>

        <p className="text-emerald-100 text-sm sm:text-base leading-relaxed italic mb-8">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-emerald-850">
        <div className="relative h-12 w-12 rounded-full overflow-hidden bg-emerald-900 border-2 border-amber-400/60 shrink-0 transition-transform duration-300 group-hover:scale-110">
          {!imgError ? (
            <Image
              src={avatarSrc}
              alt={item.name}
              fill
              sizes="48px"
              className="object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center font-bold text-white text-sm">
              {item.name ? item.name.charAt(0) : "A"}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-base font-bold text-white leading-tight group-hover:text-amber-300 transition-colors">
            {item.name}
          </h4>
          <p className="text-xs text-amber-300 font-medium mt-0.5">
            {item.role}
          </p>
          {item.location && (
            <p className="text-[11px] text-emerald-300/70">
              {item.location}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const d = data as any;
  const eyebrow = d?.eyebrow || homeData.testimonials.eyebrow;
  const heading = d?.heading || homeData.testimonials.heading;
  const subheading =
    d?.description || d?.subheading || homeData.testimonials.subheading;
  const items =
    d?.items && d.items.length > 0
      ? d.items
      : homeData.testimonials.items;

  return (
    <section className="py-20 sm:py-28 bg-[#023420] text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white animate-float-slow" />
      </div>

      <Container className="relative z-10">
        <ScrollReveal variant="fade-up" duration={650}>
          <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
            <SectionLabel variant="gold">{eyebrow}</SectionLabel>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {heading}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-emerald-100/90 leading-relaxed">
              {subheading}
            </p>
          </div>
        </ScrollReveal>

        <StaggerGroup
          staggerInterval={120}
          duration={650}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {items.map((item: any, idx: number) => (
            <StaggerItem key={item.id || idx} index={idx}>
              <TestimonialCard item={item} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
