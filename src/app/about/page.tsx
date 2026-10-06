import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HeartHandshake,
  Users2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/common/PageHero";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Button } from "@/components/ui/button";
import { aboutData } from "@/data/page-about";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Who We Are — About Arvishha Foundation",
  description:
    "Learn about Arvishha Foundation's journey, core values, leadership, and our commitment to human dignity and grassroots social change.",
  canonical: "/about",
});

const valueIcons: Record<string, React.ReactNode> = {
  HeartHandshake: <HeartHandshake className="h-6 w-6 text-amber-500" />,
  Users2: <Users2 className="h-6 w-6 text-amber-500" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6 text-amber-500" />,
  Sparkles: <Sparkles className="h-6 w-6 text-amber-500" />,
};

export default function AboutPage() {
  const breadcrumbLd = generateBreadcrumbSchema([
    { name: "Who We Are", url: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow={aboutData.hero.eyebrow}
        heading={aboutData.hero.heading}
        description={aboutData.hero.description}
        breadcrumbs={[{ label: "Who We Are" }]}
      />

      {/* Origin Story Section */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <SectionLabel>Our Story & Purpose</SectionLabel>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {aboutData.story.heading}
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed text-base">
                {aboutData.story.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-slate-100">
                <Image
                  src={aboutData.hero.image}
                  alt="Arvishha Foundation community gathering"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values Section */}
      <section className="py-20 sm:py-28 bg-[#faf9f5] border-t border-slate-200/60">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionLabel>Guiding Principles</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Values That Anchor Everything We Do
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Our culture and field operations are steered by ethical rigor, community trust, and mutual respect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.values.map((val, idx) => (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="mb-5 h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                    {valueIcons[val.icon] || (
                      <HeartHandshake className="h-6 w-6 text-amber-500" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {val.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership & Trustees */}
      <section className="py-20 sm:py-28 bg-white border-t border-slate-100">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <SectionLabel>Leadership & Governance</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Guided by Experienced Social Practitioners
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Our leadership team brings decades of cumulative experience across grassroots education, public health, and social equity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutData.leadership.map((member, idx) => (
              <div
                key={idx}
                className="bg-[#faf9f5] rounded-3xl p-6 border border-slate-200/80 text-center flex flex-col items-center shadow-xs"
              >
                <div className="relative h-32 w-32 rounded-full overflow-hidden mb-5 border-4 border-white shadow-md">
                  <Image
                    src={member.image}
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
                <p className="text-xs text-slate-600 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Transparency & Governance Section */}
      <section id="transparency" className="py-20 bg-[#023420] text-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Accountability & Trust
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {aboutData.transparency.heading}
            </h2>
            <p className="text-emerald-100/90 text-base leading-relaxed">
              {aboutData.transparency.description}
            </p>

            <div className="grid grid-cols-3 gap-4 pt-6 max-w-xl mx-auto">
              {aboutData.transparency.stats.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-emerald-950/80 border border-emerald-800 rounded-2xl p-4 text-center"
                >
                  <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                    {item.value}
                  </p>
                  <p className="text-xs text-emerald-200 mt-1">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Button
                asChild
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-full px-8 py-3 h-auto"
              >
                <Link href="/contact" className="inline-flex items-center gap-2">
                  <span>Connect With Our Governance Team</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
