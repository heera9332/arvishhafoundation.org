import React from "react";
import Image from "next/image";
import type { PartnersBlock } from "@/payload-types";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { getMediaUrl } from "@/blocks/shared/getMediaUrl";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/animation/StaggerGroup";

export function PartnersComponent(block: PartnersBlock) {
  const eyebrow = block.eyebrow || "Partnerships for Good";
  const heading =
    block.heading || "Institutions & CSR Leaders Backing Our Grassroots Mission";
  const subheading =
    block.subheading ||
    "We collaborate with statutory bodies, visionary corporates, and philanthropic trusts to amplify our social impact.";
  const items = block.items || [];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-100 overflow-hidden">
      <Container>
        <ScrollReveal variant="fade-up" duration={700}>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <SectionLabel>{eyebrow}</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {heading}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">{subheading}</p>
          </div>
        </ScrollReveal>

        {items && items.length > 0 ? (
          <StaggerGroup
            staggerDelay={80}
            initialDelay={150}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center"
          >
            {items.map((partner, idx) => {
              const logoSrc = getMediaUrl(partner.logo) || partner.logoUrl;

              const content = (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center min-h-[90px] text-center shadow-2xs hover:shadow-md hover:border-emerald-600/40 hover:-translate-y-1 transition-all duration-300">
                  {logoSrc ? (
                    <div className="relative w-full h-12 transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={logoSrc}
                        alt={partner.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-slate-700 group-hover:text-emerald-900 transition-colors">
                      {partner.name}
                    </span>
                  )}
                </div>
              );

              if (partner.website) {
                return (
                  <StaggerItem key={partner.id || idx}>
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                      title={partner.name}
                    >
                      {content}
                    </a>
                  </StaggerItem>
                );
              }

              return (
                <StaggerItem key={partner.id || idx}>
                  <div className="group">
                    {content}
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        ) : (
          <div className="text-center text-xs text-slate-400">
            Partnerships and collaborative programs active across India.
          </div>
        )}
      </Container>
    </section>
  );
}

export default PartnersComponent;
