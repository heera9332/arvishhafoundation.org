import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Button } from "@/components/ui/button";
import { getMediaUrl } from "@/blocks/shared/getMediaUrl";
import { whatWeDoData } from "@/data/page-what-we-do";
import type { PillarsBlock, Media } from "@/payload-types";

import { ScrollReveal } from "@/components/animation/ScrollReveal";

export interface PillarsComponentProps {
  data?: PillarsBlock | Record<string, unknown>;
}

interface PillarInitiative {
  title: string;
  desc: string;
}

interface PillarItem {
  id?: string | null;
  title: string;
  heading: string;
  description: string;
  image?: unknown;
  imageUrl?: string | null;
  initiatives?: PillarInitiative[] | null;
}

export function PillarsComponent(props: PillarsComponentProps | PillarsBlock) {
  const block = (("data" in props && props.data ? props.data : props) ||
    {}) as Partial<PillarsBlock>;

  const pillars = (
    block.items && block.items.length > 0 ? block.items : whatWeDoData.pillars
  ) as PillarItem[];

  const showCta = block.showCta !== false;
  const ctaHeading =
    block.ctaHeading || "Help Us Expand These Programs To More Communities";
  const ctaDescription =
    block.ctaDescription ||
    "Every donation and volunteer hour directly strengthens our classrooms, medical checkup camps, and livelihood training programs.";
  const primaryCtaText = block.primaryCtaText || "Donate Today";
  const primaryCtaLink = block.primaryCtaLink || "/donate";
  const secondaryCtaText = block.secondaryCtaText || "Volunteer With Us";
  const secondaryCtaLink = block.secondaryCtaLink || "/get-involved";

  return (
    <div className="pillars-block">
      {/* Intervention Pillars */}
      <section className="py-20 sm:py-28 bg-white space-y-24 sm:space-y-32">
        <Container>
          <div className="space-y-24 sm:space-y-32">
            {pillars.map((pillar, idx) => {
              const isEven = idx % 2 === 1;
              const pillarId = pillar.id || `pillar-${idx}`;
              const imgSrc =
                getMediaUrl(
                  pillar.image as string | Media | null | undefined,
                ) ||
                pillar.imageUrl ||
                "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80";

              return (
                <div
                  key={pillarId}
                  id={pillarId}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center scroll-mt-32"
                >
                  {/* Text Content */}
                  <ScrollReveal
                    variant={isEven ? "fade-left" : "fade-right"}
                    duration={700}
                    className={`lg:col-span-6 space-y-6 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="flex items-center">
                      <div>
                        <SectionLabel>{pillar.title}</SectionLabel>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                          {pillar.heading}
                        </h2>
                      </div>
                    </div>

                    <p className="text-base text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>

                    {pillar.initiatives && pillar.initiatives.length > 0 && (
                      <div className="space-y-4 pt-2">
                        {pillar.initiatives.map(
                          (init: PillarInitiative, iIdx: number) => (
                            <div
                              key={iIdx}
                              className="bg-[#faf9f5] border border-slate-200/80 rounded-2xl p-5 hover:border-emerald-800/40 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-300"
                            >
                              <h4 className="text-base font-bold text-[#03452c] mb-1">
                                {init.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                                {init.desc}
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    )}
                  </ScrollReveal>

                  {/* Visual Image */}
                  <ScrollReveal
                    variant={isEven ? "fade-right" : "fade-left"}
                    duration={700}
                    delay={100}
                    className={`lg:col-span-6 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-4 border-slate-100 bg-slate-100 group">
                      <Image
                        src={imgSrc}
                        alt={pillar.title || "Arvishha Foundation Pillar"}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Bottom CTA Banner */}
      {showCta && (
        <section className="py-20 bg-[#023420] text-white">
          <Container>
            <ScrollReveal variant="zoom-in" duration={700}>
              <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                Get Involved
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {ctaHeading}
              </h2>
              <p className="text-emerald-100/90 text-base leading-relaxed">
                {ctaDescription}
              </p>
              <div className="pt-4 flex flex-wrap gap-4 justify-center">
                {primaryCtaText && (
                  <Button
                    asChild
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-3.5 h-auto rounded-full"
                  >
                    <Link
                      href={primaryCtaLink}
                      className="inline-flex items-center gap-2"
                    >
                      <Heart className="h-5 w-5 fill-slate-950 text-slate-950" />
                      <span>{primaryCtaText}</span>
                    </Link>
                  </Button>
                )}
                {secondaryCtaText && (
                  <Button
                    asChild
                    variant="outline"
                    className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-7 py-3.5 h-auto rounded-full"
                  >
                    <Link href={secondaryCtaLink}>{secondaryCtaText}</Link>
                  </Button>
                )}
              </div>
            </div>
          </ScrollReveal>
          </Container>
        </section>
      )}
    </div>
  );
}

export default PillarsComponent;
