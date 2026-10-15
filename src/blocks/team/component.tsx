import React from "react";
import Image from "next/image";
import type { TeamBlock } from "@/payload-types";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ExternalLink } from "lucide-react";
import { getMediaUrl } from "@/blocks/shared/getMediaUrl";
import { aboutData } from "@/data/page-about";

export function TeamComponent(block: TeamBlock) {
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
    <section className="py-20 sm:py-28 bg-white border-t border-slate-100">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionLabel>{eyebrow}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {heading}
          </h2>
          <p className="mt-4 text-base text-slate-600">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div
                key={memberKey}
                className="bg-[#faf9f5] rounded-3xl p-6 border border-slate-200/80 text-center flex flex-col items-center shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="relative h-32 w-32 rounded-full overflow-hidden mb-5 border-4 border-white shadow-md bg-emerald-950">
                  <Image
                    src={imgSrc}
                    alt={member.name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
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
                {linkedin && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs text-[#03452c] font-semibold hover:underline"
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default TeamComponent;
