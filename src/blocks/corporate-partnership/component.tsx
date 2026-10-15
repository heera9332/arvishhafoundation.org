import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Button } from "@/components/ui/button";
import { getMediaUrl } from "@/blocks/shared/getMediaUrl";
import { getInvolvedData } from "@/data/page-get-involved";
import type { CorporatePartnershipBlock } from "@/payload-types";

export interface CorporatePartnershipComponentProps {
  data?: CorporatePartnershipBlock | Record<string, unknown>;
}

export function CorporatePartnershipComponent(
  props: CorporatePartnershipComponentProps | CorporatePartnershipBlock
) {
  const block = (("data" in props && props.data ? props.data : props) || {}) as Partial<CorporatePartnershipBlock>;

  const eyebrow = block.eyebrow || "Corporate Partnerships";
  const heading =
    block.heading || getInvolvedData.corporatePartnership.heading;
  const description =
    block.description || getInvolvedData.corporatePartnership.description;

  const benefits =
    block.benefits && block.benefits.length > 0
      ? block.benefits.map((b) => b.benefit)
      : getInvolvedData.corporatePartnership.benefits;

  const ctaText = block.ctaText || "Connect With Our CSR Desk";
  const ctaLink = block.ctaLink || "/contact?type=csr";

  const imgSrc =
    getMediaUrl(block.image) ||
    block.imageUrl ||
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80";

  return (
    <section id="partner" className="py-20 sm:py-28 bg-[#faf9f5] border-t border-slate-200/60 scroll-mt-32">
      <Container>
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-14 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionLabel>{eyebrow}</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {heading}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              {description}
            </p>

            <div className="space-y-3 pt-2">
              {benefits.map((b, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">{b}</span>
                </div>
              ))}
            </div>

            {ctaText && (
              <div className="pt-4">
                <Button
                  asChild
                  className="bg-[#03452c] hover:bg-[#023320] text-white rounded-full px-8 py-3.5 h-auto text-base"
                >
                  <Link href={ctaLink}>{ctaText}</Link>
                </Button>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 shadow-md">
            <Image
              src={imgSrc}
              alt="Corporate CSR partnership meeting"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CorporatePartnershipComponent;
