import React from "react";
import Image from "next/image";
import type { TeamBlock } from "@/payload-types";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ExternalLink } from "lucide-react";
import { getMediaUrl } from "@/blocks/shared/getMediaUrl";
import { aboutData } from "@/data/page-about";
import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { StaggerGroup, StaggerItem } from "@/components/animation/StaggerGroup";

export interface TeamComponentProps {
  data?: TeamBlock | Record<string, unknown>;
}

export function TeamComponent(props?: TeamComponentProps | Partial<TeamBlock>) {
  const block = (("data" in (props || {}) && (props as TeamComponentProps)?.data
    ? (props as TeamComponentProps).data
    : props) || {}) as Partial<TeamBlock>;

  const eyebrow = block.eyebrow || "Leadership & Governance";
  const heading =
    block.heading || "Guided by Experienced Social Practitioners";
  const description =
    block.description ||
    "Our leadership team brings decades of cumulative experience across grassroots education, public health, and social equity.";
  const members =
    block.members && block.members.length > 0
      ? block.members
      : aboutData.leadership;

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-slate-100 overflow-hidden">
      <Container>
        <ScrollReveal variant="fade-up" duration={700}>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionLabel>{eyebrow}</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {heading}
            </h2>
            <p className="mt-4 text-base text-slate-600">{description}</p>
          </div>
        </ScrollReveal>

        <StaggerGroup
          staggerDelay={120}
          initialDelay={150}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {members.map((member, idx) => {
            const memberKey =
              "id" in member && typeof member.id === "string" ? member.id : idx;
            const imageUrl = "imageUrl" in member ? member.imageUrl : undefined;
            const linkedin = "linkedin" in member ? member.linkedin : undefined;
            const imgSrc =
              getMediaUrl(member.image) ||
              imageUrl ||
              (typeof member.image === "string" ? member.image : "/images/avatar-1.png");

            return (
              <StaggerItem key={memberKey}>
                <div
                  className="group bg-[#faf9f5] rounded-3xl p-6 border border-slate-200/80 text-center flex flex-col items-center shadow-xs hover:shadow-xl hover:border-emerald-600/30 transition-all duration-300 hover:-translate-y-2 h-full justify-between"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative h-32 w-32 rounded-full overflow-hidden mb-5 border-4 border-white shadow-md bg-emerald-950 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-lg">
                      <Image
                        src={imgSrc}
                        alt={member.name}
                        fill
                        sizes="128px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-emerald-900 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-800 mt-1 mb-3">
                      {member.role}
                    </p>
                    {member.bio && (
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                  </div>
                  {linkedin && (
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1.5 text-xs text-[#03452c] font-semibold hover:text-emerald-700 transition-colors group/link"
                    >
                      <span>LinkedIn Profile</span>
                      <ExternalLink className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}

export default TeamComponent;
