"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Users,
  Sprout,
  Target,
  Heart,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import type { homeData } from "@/data/page-home";

interface HomeHeroProps {
  data: typeof homeData.hero;
}

export function HomeHero({ data }: HomeHeroProps) {
  const [imgSrc, setImgSrc] = useState(data.image.src || "/images/hero-women-photo.png");

  return (
    <section className="relative pt-28 pb-20 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 overflow-hidden bg-[#faf9f5]">
      {/* Background Decorative Graphic Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle top-left circular arc */}
        <div className="absolute -top-32 -left-32 w-[460px] h-[460px] rounded-full border border-amber-300/30" />
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-emerald-100/30 blur-3xl" />

        {/* Right background soft organic blobs */}
        <div className="absolute top-12 right-0 w-[600px] h-[600px] rounded-full bg-[#e8f2ec]/60 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-amber-100/40 blur-3xl" />

        {/* Ambient bottom sweeping wave curve */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full h-28 sm:h-36 text-amber-500/15"
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C320,120 720,10 1120,70 C1280,95 1380,50 1440,30 L1440,120 L0,120 Z"
            fill="currentColor"
            opacity="0.3"
          />
          <path
            d="M0,80 C360,20 760,110 1200,40 C1320,20 1400,60 1440,50"
            stroke="#ea580c"
            strokeWidth="1.2"
            strokeOpacity="0.35"
            fill="none"
          />
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Eyebrow, Editorial Heading, Description, CTAs, Stats */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* 1. Eyebrow */}
            <div className="flex items-center gap-3 mb-5 sm:mb-6">
              <span className="w-7 h-1 bg-[#ea580c] rounded-full inline-block shrink-0" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-slate-700 uppercase">
                {data.eyebrow}
              </span>
            </div>

            {/* 2. Editorial Serif Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[62px] xl:text-[70px] font-serif font-semibold text-[#033624] tracking-tight leading-[1.08] mb-6">
              {data.headingPrefix || "Building a future"}
              <br />
              {data.headingMiddle || "where everyone"}
              <br />
              {data.headingAction || "can"}{" "}
              <span className="relative inline-block italic font-serif text-[#033624]">
                {data.highlightWord || "thrive."}
                {/* Hand-drawn curved orange brush underline */}
                <svg
                  className="absolute -bottom-2 sm:-bottom-2.5 left-0 w-[105%] h-3 sm:h-4 text-[#ea580c] pointer-events-none"
                  viewBox="0 0 170 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 8.5C45 4 118 4.2 167 10C125 12.8 55 12 3 8.5Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </h1>

            {/* 3. Description Narrative */}
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mb-8 sm:mb-10">
              {data.description}
            </p>

            {/* 4. Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12 sm:mb-14">
              {/* Primary Pill Button */}
              <Link
                href={data.primaryCta.href}
                className="inline-flex items-center justify-center gap-2.5 bg-[#033624] hover:bg-[#022417] text-white text-sm sm:text-base font-semibold px-7 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-200 group"
              >
                <span>{data.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              {/* Secondary Join Mission with Play Circle */}
              <Link
                href={data.secondaryCta.href}
                className="inline-flex items-center gap-3 text-slate-900 hover:text-[#033624] font-semibold text-sm sm:text-base transition-colors group"
              >
                <div className="w-11 h-11 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:border-[#033624]/40 group-hover:shadow transition-all">
                  <Play className="w-4 h-4 fill-[#033624] text-[#033624] ml-0.5" />
                </div>
                <span>{data.secondaryCta.label}</span>
              </Link>
            </div>

            {/* 5. Bottom Stats Strip */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 items-start">
              {/* Stat 1: 500+ community members */}
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-xl bg-emerald-100/80 text-[#033624] shrink-0 mt-0.5">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-none">
                    500+
                  </div>
                  <div className="text-xs text-slate-500 mt-1.5 leading-snug">
                    community members reached &amp; empowered
                  </div>
                </div>
              </div>

              {/* Stat 2: 12+ grassroots initiatives */}
              <div className="flex items-start gap-3.5 sm:border-l sm:border-slate-200 sm:pl-4">
                <div className="p-2 rounded-xl bg-emerald-100/80 text-[#033624] shrink-0 mt-0.5">
                  <Sprout className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-none">
                    12+
                  </div>
                  <div className="text-xs text-slate-500 mt-1.5 leading-snug">
                    grassroots initiatives
                  </div>
                </div>
              </div>

              {/* Stat 3: 3 focus areas */}
              <div className="flex items-start gap-3.5 sm:border-l sm:border-slate-200 sm:pl-4">
                <div className="p-2 rounded-xl bg-amber-100/80 text-[#ea580c] shrink-0 mt-0.5">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-slate-900 leading-none">
                    3
                  </div>
                  <div className="text-xs text-slate-600 font-medium mt-1 leading-none">
                    focus areas
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1.5 leading-snug">
                    Education • Women Empowerment • Health
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Overlays & Botanical Art */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Background Botanical Stems Illustration */}
            <div className="absolute -top-12 -right-8 w-48 h-72 pointer-events-none opacity-60 z-0 hidden sm:block">
              <svg viewBox="0 0 160 240" fill="none" className="w-full h-full text-emerald-800/25">
                <path
                  d="M130 10C100 60 70 140 90 220"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                {/* Leaves along the branch */}
                <path
                  d="M125 30C140 25 155 35 150 45C140 50 128 40 125 30Z"
                  fill="currentColor"
                  opacity="0.4"
                />
                <path
                  d="M110 70C130 65 145 75 140 85C125 90 115 80 110 70Z"
                  fill="currentColor"
                  opacity="0.4"
                />
                <path
                  d="M98 120C118 115 130 125 125 135C110 140 100 130 98 120Z"
                  fill="currentColor"
                  opacity="0.4"
                />
                <path
                  d="M92 170C110 168 120 180 115 190C100 192 94 180 92 170Z"
                  fill="currentColor"
                  opacity="0.4"
                />
              </svg>
            </div>

            {/* Left Botanical Accent behind photo */}
            <div className="absolute bottom-16 -left-10 w-36 h-56 pointer-events-none opacity-40 z-0 hidden sm:block">
              <svg viewBox="0 0 120 180" fill="none" className="w-full h-full text-emerald-800/30">
                <path
                  d="M30 180C40 130 20 80 10 20"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M26 120C10 115 5 105 10 95C25 95 30 110 26 120Z"
                  fill="currentColor"
                  opacity="0.3"
                />
                <path
                  d="M20 70C5 65 0 55 5 45C20 45 25 60 20 70Z"
                  fill="currentColor"
                  opacity="0.3"
                />
              </svg>
            </div>

            {/* Orange Curved Flow Line wrapping around right of photo */}
            <svg
              className="absolute -inset-6 w-[112%] h-[112%] pointer-events-none z-0 hidden sm:block"
              viewBox="0 0 600 700"
              fill="none"
            >
              <path
                d="M 120 620 C 30 480 30 200 200 80 C 380 -40 550 40 580 200 C 610 360 480 620 220 650"
                stroke="#ea580c"
                strokeWidth="1.2"
                strokeOpacity="0.4"
                fill="none"
              />
            </svg>

            {/* Top Right Solid Orange Accent Circle */}
            <div className="absolute top-2 -right-2 sm:top-5 sm:-right-4 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#f27228] shadow-md z-20" />

            {/* Main Rounded Image Container */}
            <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[500px] aspect-[4/5] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-950/20 bg-emerald-900 border-2 border-white/80 z-10">
              <Image
                src={imgSrc}
                alt={data.image.alt}
                fill
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 480px, 500px"
                className="object-cover transition-transform duration-700 hover:scale-105"
                onError={() => {
                  if (imgSrc !== data.image.fallback) {
                    setImgSrc(data.image.fallback);
                  }
                }}
              />
              {/* Gentle ambient gradient for bottom depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Overlay Badge 1: Community First (Bottom Left) */}
            <div className="absolute -bottom-6 left-2 sm:-left-6 lg:-left-8 z-20 bg-[#121c17]/85 backdrop-blur-md text-white p-4 sm:p-5 rounded-2xl border border-white/15 shadow-2xl max-w-[210px] sm:max-w-[230px]">
              <span className="w-7 h-1 bg-[#f27228] rounded-full block mb-2.5" />
              <h4 className="font-bold text-white text-sm sm:text-base leading-tight">
                Community First
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-snug">
                Local action. Lasting change.
              </p>
            </div>

            {/* Floating Overlay Badge 2: Empowering communities (Bottom Right) */}
            <div className="absolute bottom-8 -right-2 sm:-right-6 lg:-right-8 z-20 bg-white/95 backdrop-blur-md rounded-2xl px-4 sm:px-5 py-3.5 shadow-xl border border-slate-100 flex items-center gap-3">
              <Heart className="w-5 h-5 text-[#f27228] fill-[#f27228] shrink-0" />
              <span className="text-xs font-bold text-slate-900 leading-snug max-w-[140px] sm:max-w-[155px]">
                Empowering communities across India
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
