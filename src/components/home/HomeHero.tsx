"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap,
  TrendingUp,
  HeartPulse,
  ArrowRight,
  Heart,
  Users,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import type { homeData } from "@/data/page-home";

interface HomeHeroProps {
  data: typeof homeData.hero;
}

const iconMap: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="h-6 w-6 text-slate-900" />,
  TrendingUp: <TrendingUp className="h-6 w-6 text-slate-900" />,
  HeartPulse: <HeartPulse className="h-6 w-6 text-slate-900" />,
};

export function HomeHero({ data }: HomeHeroProps) {
  const [imgSrc, setImgSrc] = useState(data.image.fallback || data.image.src);

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-radial from-emerald-50/50 via-white to-white">
      {/* Subtle decorative geometric backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full border border-emerald-900/10" />
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full border border-amber-500/20" />
        <div className="absolute top-40 right-10 w-96 h-96 rounded-full border border-emerald-800/15" />
      </div>

      <Container className="relative z-10">
        {/* Eyebrow & Main Title */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            {data.eyebrow}
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
            Arvishha Foundation
          </h1>
          <p className="mt-3 text-lg sm:text-2xl font-medium text-emerald-800">
            Development. Dignity. Social Change.
          </p>
        </div>

        {/* Editorial 3-Column Layout: Statement, Hero Visual, Detailed Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column: Brief proposition + CTA + Social proof */}
          <div className="lg:col-span-4 space-y-6 text-center lg:text-left order-2 lg:order-1">
            <div className="bg-white/80 backdrop-blur-xs p-6 rounded-3xl border border-slate-100 shadow-xs space-y-5">
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                <strong className="font-semibold text-slate-900">
                  Building stronger communities
                </strong>{" "}
                through education, empowerment, rights awareness, health, and sustainable social development.
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <Button
                  asChild
                  className="bg-[#03452c] hover:bg-[#023320] text-white shadow-md rounded-full px-6 py-2.5 h-auto"
                >
                  <Link href={data.primaryCta.href} className="inline-flex items-center gap-2">
                    <span>{data.primaryCta.label}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full px-5 py-2.5 h-auto text-slate-800 hover:bg-slate-100"
                >
                  <Link href={data.secondaryCta.href}>
                    {data.secondaryCta.label}
                  </Link>
                </Button>
              </div>

              {/* Social Proof */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-center lg:justify-start gap-3">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-emerald-800 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                    AS
                  </div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-amber-500 flex items-center justify-center text-slate-950 text-xs font-bold shadow-xs">
                    RV
                  </div>
                  <div className="h-8 w-8 rounded-full border-2 border-white bg-emerald-700 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                    <Users className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div className="text-xs text-slate-600 font-medium">
                  <span className="font-bold text-[#03452c]">{data.proofBadge.count}</span>{" "}
                  {data.proofBadge.text}
                </div>
              </div>
            </div>
          </div>

          {/* Center Column: Authentic Hero Portrait with layered frame */}
          <div className="lg:col-span-4 flex justify-center order-1 lg:order-2">
            <div className="relative w-64 sm:w-80 lg:w-full max-w-[340px] aspect-3/4 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-emerald-950 group">
              <Image
                src={imgSrc}
                alt={data.image.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 340px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => {
                  if (imgSrc !== data.image.fallback) {
                    setImgSrc(data.image.fallback);
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/20">
                <p className="font-semibold text-amber-300">Community First</p>
                <p className="text-white/90 text-[11px] leading-tight mt-0.5">
                  Grassroots action in education, women empowerment & health
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Mission narrative */}
          <div className="lg:col-span-4 space-y-4 text-center lg:text-left order-3">
            <div className="bg-white/80 backdrop-blur-xs p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                At <strong className="text-[#03452c] font-semibold">Arvishha Foundation</strong>, we believe meaningful change begins when people have the knowledge, opportunities, support, and confidence to shape a better future.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                We work with communities to create opportunities for children, young people, women, and families while promoting social justice, civic participation, healthy living, and environmental responsibility.
              </p>
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-emerald-800">
                <Heart className="h-4 w-4 fill-amber-500 text-amber-500" />
                <span>Empowering communities across India</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillared Feature Cards (as in reference design) */}
        <div className="mt-14 sm:mt-18 grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.features.map((feat) => (
            <div
              key={feat.id}
              className="bg-[#023420] text-white p-7 rounded-3xl border border-emerald-900 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-12 w-12 rounded-2xl bg-amber-400 flex items-center justify-center mb-5 shadow-xs">
                  {iconMap[feat.icon] || <GraduationCap className="h-6 w-6 text-slate-900" />}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 leading-snug">
                  {feat.title}
                </h3>
                <p className="text-sm text-emerald-100/80 leading-relaxed">
                  {feat.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-emerald-800/60 flex items-center text-xs font-semibold text-amber-300">
                <Link
                  href="/what-we-do"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Learn more</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
