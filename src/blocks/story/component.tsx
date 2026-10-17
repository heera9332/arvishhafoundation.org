import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { getMediaUrl } from "@/blocks/shared/getMediaUrl";
import { aboutData } from "@/data/page-about";
import type { StoryBlock } from "@/payload-types";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

export interface StoryComponentProps {
  data?: StoryBlock | Record<string, unknown>;
}

export function StoryComponent(props: StoryComponentProps | StoryBlock) {
  const block = (("data" in props && props.data ? props.data : props) || {}) as Partial<StoryBlock>;

  const eyebrow = block.eyebrow || "Our Story & Purpose";
  const heading = block.heading || aboutData.story.heading;
  const paragraphs =
    block.paragraphs && block.paragraphs.length > 0
      ? block.paragraphs.map((p) => p.text)
      : aboutData.story.paragraphs;

  const imgSrc =
    getMediaUrl(block.image) ||
    block.imageUrl ||
    aboutData.hero.image ||
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80";

  const alt = block.imageAlt || "Arvishha Foundation community gathering";

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <ScrollReveal variant="fade-right" duration={700}>
              <div className="space-y-6">
                <SectionLabel>{eyebrow}</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {heading}
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                  {paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6">
            <ScrollReveal variant="fade-left" duration={700} delay={150}>
              <div className="group relative w-full aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-slate-100">
                <Image
                  src={imgSrc}
                  alt={alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default StoryComponent;
