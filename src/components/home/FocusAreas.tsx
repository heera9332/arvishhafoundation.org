"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Sparkles,
  ShieldCheck,
  HeartPulse,
  Building2,
  Leaf,
  Users,
  Heart,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Button } from "@/components/ui/button";
import { homeData } from "@/data/page-home";
import type { FocusAreasBlock } from "@/payload-types";

export interface FocusAreasProps {
  data?: FocusAreasBlock | typeof homeData.focusAreas;
}

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="h-5 w-5 text-amber-400" />,
  Sparkles: <Sparkles className="h-5 w-5 text-amber-400" />,
  ShieldCheck: <ShieldCheck className="h-5 w-5 text-amber-400" />,
  HeartPulse: <HeartPulse className="h-5 w-5 text-amber-400" />,
  Building2: <Building2 className="h-5 w-5 text-amber-400" />,
  Leaf: <Leaf className="h-5 w-5 text-amber-400" />,
  Users: <Users className="h-5 w-5 text-amber-400" />,
  Heart: <Heart className="h-5 w-5 text-amber-400" />,
};

function FocusAreaCard({ item }: { item: any }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc =
    (typeof item.image === "object" && item.image?.url)
      ? item.image.url
      : item.imageUrl ||
        (typeof item.image === "string" ? item.image : "/images/fa-education.png");
  const href = item.href || "/what-we-do";
  const icon = item.iconName || "GraduationCap";

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1">
      <div>
        {/* Top Header: Title & Arrow Button */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-[#03452c] transition-colors">
            {item.title}
          </h3>
          <Link
            href={href}
            aria-label={`Learn more about ${item.title}`}
            className="h-10 w-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-[#03452c] group-hover:text-white group-hover:border-transparent transition-all shrink-0"
          >
            <ArrowRight className="h-4 w-4 -rotate-45 group-hover:rotate-0 transition-transform" />
          </Link>
        </div>

        {/* Short Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {item.description}
        </p>
      </div>

      {/* Image with Floating Icon Badge */}
      <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden bg-slate-100 mt-2">
        {!imgError ? (
          <Image
            src={imgSrc}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-[#03452c]/90 flex items-center justify-center text-amber-400">
            {iconMap[icon] || <GraduationCap className="h-5 w-5 text-amber-400" />}
          </div>
        )}
        <div className="absolute bottom-3 left-3 h-10 w-10 rounded-xl bg-[#03452c]/95 backdrop-blur-xs flex items-center justify-center shadow-md border border-white/20">
          {iconMap[icon] || <GraduationCap className="h-5 w-5 text-amber-400" />}
        </div>
      </div>
    </div>
  );
}

export function FocusAreas({ data }: FocusAreasProps) {
  const d = data as any;
  const eyebrow = d?.eyebrow || homeData.focusAreas.eyebrow;
  const heading = d?.heading || homeData.focusAreas.heading;
  const subheading =
    d?.description || d?.subheading || homeData.focusAreas.subheading;
  const viewAllCta = d?.viewAllCta || homeData.focusAreas.viewAllCta;
  const items =
    d?.items && d.items.length > 0
      ? d.items
      : homeData.focusAreas.items;

  return (
    <section className="py-20 sm:py-28 bg-[#faf9f5]">
      <Container>
        {/* Section Header with CTA button aligned right */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <SectionLabel>{eyebrow}</SectionLabel>
            <h2 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {heading}
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              {subheading}
            </p>
          </div>

          <Button
            asChild
            className="bg-[#03452c] hover:bg-[#023320] text-white rounded-full px-7 py-3 h-auto shrink-0 shadow-sm"
          >
            <Link href={viewAllCta.href} className="inline-flex items-center gap-2">
              <span>{viewAllCta.label}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Focus Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item: any, idx: number) => (
            <FocusAreaCard key={item.id || idx} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
