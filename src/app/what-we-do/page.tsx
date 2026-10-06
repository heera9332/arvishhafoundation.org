import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/common/PageHero";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Button } from "@/components/ui/button";
import { whatWeDoData } from "@/data/page-what-we-do";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "What We Do — Programs & Focus Areas",
  description:
    "Explore Arvishha Foundation's core intervention pillars: education, women empowerment, health awareness, and rural development.",
  canonical: "/what-we-do",
});

export default function WhatWeDoPage() {
  const breadcrumbLd = generateBreadcrumbSchema([
    { name: "What We Do", url: "/what-we-do" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow={whatWeDoData.hero.eyebrow}
        heading={whatWeDoData.hero.heading}
        description={whatWeDoData.hero.description}
        breadcrumbs={[{ label: "What We Do" }]}
      />

      {/* Intervention Pillars */}
      <section className="py-20 sm:py-28 bg-white space-y-24 sm:space-y-32">
        <Container>
          <div className="space-y-24 sm:space-y-32">
            {whatWeDoData.pillars.map((pillar, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={pillar.id}
                  id={pillar.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center scroll-mt-32"
                >
                  {/* Text Content */}
                  <div
                    className={`lg:col-span-6 space-y-6 ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <SectionLabel>{pillar.title}</SectionLabel>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                      {pillar.heading}
                    </h2>
                    <p className="text-base text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>

                    <div className="space-y-4 pt-2">
                      {pillar.initiatives.map((init, iIdx) => (
                        <div
                          key={iIdx}
                          className="bg-[#faf9f5] border border-slate-200/80 rounded-2xl p-5 hover:border-emerald-800/40 transition-colors"
                        >
                          <h4 className="text-base font-bold text-[#03452c] mb-1">
                            {init.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {init.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <Button
                        asChild
                        className="bg-[#03452c] hover:bg-[#023320] text-white rounded-full px-7 py-3 h-auto"
                      >
                        <Link href="/get-involved" className="inline-flex items-center gap-2">
                          <span>Support This Initiative</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Visual Image */}
                  <div
                    className={`lg:col-span-6 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden shadow-xl border-4 border-slate-100 bg-slate-100">
                      <Image
                        src={pillar.image}
                        alt={pillar.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 bg-[#023420] text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Get Involved
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Help Us Expand These Programs To More Communities
            </h2>
            <p className="text-emerald-100/90 text-base leading-relaxed">
              Every donation and volunteer hour directly strengthens our classrooms, medical checkup camps, and livelihood training programs.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-3.5 h-auto rounded-full"
              >
                <Link href="/donate" className="inline-flex items-center gap-2">
                  <Heart className="h-5 w-5 fill-slate-950 text-slate-950" />
                  <span>Donate Today</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 px-7 py-3.5 h-auto rounded-full"
              >
                <Link href="/get-involved">
                  Volunteer With Us
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
