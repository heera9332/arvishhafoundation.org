import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/common/PageHero";
import { SectionLabel } from "@/components/common/SectionLabel";
import { VolunteerForm } from "@/components/forms/VolunteerForm";
import { Button } from "@/components/ui/button";
import { getInvolvedData } from "@/data/page-get-involved";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Get Involved — Volunteer & CSR Partnerships",
  description:
    "Join Arvishha Foundation as a volunteer, academic mentor, medical contributor, or corporate CSR partner.",
  canonical: "/get-involved",
});

export default function GetInvolvedPage() {
  const breadcrumbLd = generateBreadcrumbSchema([
    { name: "Get Involved", url: "/get-involved" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow={getInvolvedData.hero.eyebrow}
        heading={getInvolvedData.hero.heading}
        description={getInvolvedData.hero.description}
        breadcrumbs={[{ label: "Get Involved" }]}
      />

      {/* Volunteer Opportunities */}
      <section id="volunteer" className="py-20 sm:py-28 bg-white scroll-mt-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Volunteer Roles List */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <SectionLabel>Volunteer With Us</SectionLabel>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Ways You Can Share Your Passion & Skills
                </h2>
                <p className="mt-4 text-base text-slate-600 leading-relaxed">
                  We match volunteers with initiatives where their unique background—whether teaching, healthcare, arts, or communication—creates the highest positive impact.
                </p>
              </div>

              <div className="space-y-4">
                {getInvolvedData.volunteerRoles.map((role, idx) => (
                  <div
                    key={idx}
                    className="bg-[#faf9f5] border border-slate-200/80 rounded-2xl p-6 shadow-2xs hover:border-emerald-800/40 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold text-[#03452c]">
                        {role.title}
                      </h3>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-semibold">
                        {role.mode}
                      </span>
                    </div>
                    <p className="text-xs text-amber-700 font-medium mb-2">
                      Commitment: {role.commitment}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Volunteer Form */}
            <div className="lg:col-span-6">
              <VolunteerForm />
            </div>
          </div>
        </Container>
      </section>

      {/* Corporate CSR Partnerships */}
      <section id="partner" className="py-20 sm:py-28 bg-[#faf9f5] border-t border-slate-200/60 scroll-mt-32">
        <Container>
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-14 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <SectionLabel>Corporate Partnerships</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {getInvolvedData.corporatePartnership.heading}
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                {getInvolvedData.corporatePartnership.description}
              </p>

              <div className="space-y-3 pt-2">
                {getInvolvedData.corporatePartnership.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{b}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button
                  asChild
                  className="bg-[#03452c] hover:bg-[#023320] text-white rounded-full px-8 py-3.5 h-auto text-base"
                >
                  <Link href="/contact?type=csr">
                    Connect With Our CSR Desk
                  </Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 shadow-md">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                alt="Corporate CSR partnership meeting"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
