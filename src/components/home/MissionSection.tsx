"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, Heart } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { homeData } from "@/data/page-home";

interface MissionSectionProps {
  data: typeof homeData.missionApproach;
}

export function MissionSection({ data }: MissionSectionProps) {
  const [activeTab, setActiveTab] = useState("vision");
  const [leftImgError, setLeftImgError] = useState(false);

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-slate-100">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Context Card & Authentic Visual */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#faf9f5] border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xs">
              <span className="inline-block text-xs font-semibold text-emerald-800 uppercase tracking-widest mb-3">
                {data.leftVisual.badge}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-4">
                Creating Change Where It Matters Most
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                {data.leftVisual.subtext}
              </p>
              <ul className="space-y-2.5 text-sm text-slate-700">
                {data.leftVisual.bulletPoints.map((pt, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative w-full aspect-16/10 rounded-3xl overflow-hidden shadow-lg border border-slate-100 bg-slate-100">
              {!leftImgError ? (
                <Image
                  src={data.leftVisual.image}
                  alt={data.leftVisual.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  onError={() => setLeftImgError(true)}
                />
              ) : (
                <div className="absolute inset-0 bg-emerald-900 flex items-center justify-center text-white p-6 text-center">
                  <p className="font-semibold">Collaborative Community Workshops</p>
                </div>
              )}
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md text-white p-4 rounded-2xl border border-white/20 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-amber-300">Grassroots Engagement</p>
                  <p className="text-sm font-semibold">Participatory Rural Planning</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 font-bold shadow-md">
                  <Heart className="h-5 w-5 fill-slate-950" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Approach Narrative & Tabs */}
          <div className="lg:col-span-6 space-y-6 lg:pt-4">
            <div>
              <SectionLabel>{data.eyebrow}</SectionLabel>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
                {data.heading}
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* Segmented Controls / Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full pt-4"
            >
              <TabsList className="grid grid-cols-3 max-w-sm">
                {data.tabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {data.tabs.map((tab) => (
                <TabsContent
                  key={tab.id}
                  value={tab.id}
                  className="mt-6 bg-[#f4f7f4] rounded-3xl p-7 border border-emerald-900/10 shadow-2xs space-y-4"
                >
                  <h4 className="text-xl font-bold text-[#03452c]">
                    {tab.heading}
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {tab.description}
                  </p>
                  {tab.points && tab.points.length > 0 && (
                    <div className="pt-2 border-t border-emerald-900/10 space-y-2">
                      {tab.points.map((pt, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </Container>
    </section>
  );
}
