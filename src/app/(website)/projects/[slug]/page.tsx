import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Calendar, Users, ArrowLeft, ArrowRight, Heart, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/common/PageHero";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projectsData } from "@/data/page-projects";
import { getPostBySlug, getAllPostSlugs } from "@/lib/posts";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

export const revalidate = 300; // 5 min ISR

export async function generateStaticParams() {
  const cmsSlugs = await getAllPostSlugs("projects");
  const staticSlugs = projectsData.projects.map((p) => p.slug);
  const combined = Array.from(new Set([...cmsSlugs, ...staticSlugs]));

  return combined.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cmsPost = await getPostBySlug(slug, "projects");
  const staticProject = !cmsPost
    ? projectsData.projects.find((p) => p.slug === slug)
    : null;

  const title = cmsPost?.title || staticProject?.title || "Field Project";
  const desc =
    cmsPost?.shortDescription ||
    cmsPost?.excerpt ||
    staticProject?.shortDescription ||
    "Arvishha Foundation Ground Initiative";

  return constructMetadata({
    title,
    description: desc,
    canonical: `/projects/${slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cmsPost = await getPostBySlug(slug, "projects");
  const staticProject = !cmsPost
    ? projectsData.projects.find((p) => p.slug === slug)
    : null;

  if (!cmsPost && !staticProject) {
    notFound();
  }

  const title = cmsPost?.title || staticProject?.title || "";
  const category =
    (typeof cmsPost?.category === "object" && cmsPost.category && "title" in cmsPost.category
      ? (cmsPost.category.title as string)
      : cmsPost?.categoryCustom) ||
    staticProject?.category ||
    "Education";

  const status = cmsPost?.status || staticProject?.status || "Active";
  const location = cmsPost?.location || staticProject?.location || "Field Communities";
  const year = cmsPost?.year || staticProject?.year || "2024–Present";
  const beneficiaries = cmsPost?.beneficiaries || staticProject?.beneficiaries || "";
  const shortDescription =
    cmsPost?.shortDescription || cmsPost?.excerpt || staticProject?.shortDescription || "";
  const fullDescription =
    cmsPost?.fullDescription || staticProject?.fullDescription || shortDescription;

  const image =
    (typeof cmsPost?.image === "object" && cmsPost.image && "url" in cmsPost.image
      ? (cmsPost.image.url as string)
      : cmsPost?.imageUrl) ||
    (typeof staticProject?.image === "string" ? staticProject.image : null) ||
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80";

  const keyOutcomes =
    cmsPost?.keyOutcomes && cmsPost.keyOutcomes.length > 0
      ? cmsPost.keyOutcomes.map((k) => k.outcome)
      : [];

  const breadcrumbLd = generateBreadcrumbSchema([
    { name: "Projects", url: "/projects" },
    { name: title, url: `/projects/${slug}` },
  ]);

  // Extract lexical text paragraphs if available
  const lexicalParagraphs: string[] = [];
  if (cmsPost?.content?.root?.children) {
    for (const child of cmsPost.content.root.children as any[]) {
      if (child?.children) {
        const text = child.children.map((c: any) => c.text || "").join("").trim();
        if (text) lexicalParagraphs.push(text);
      }
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow="Our Ground Initiatives"
        heading={title}
        description={shortDescription}
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: title },
        ]}
      />

      <article className="py-16 sm:py-24 bg-white overflow-hidden">
        <Container size="narrow">
          <ScrollReveal variant="fade-down" duration={600}>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <Button
                asChild
                variant="ghost"
                className="gap-2 text-slate-600 hover:text-slate-900 group"
              >
                <Link href="/projects" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  <span>Back to All Projects</span>
                </Link>
              </Button>

              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-[#03452c] text-white border-0 text-xs font-semibold px-3 py-1 shadow-sm">
                  {category}
                </Badge>
                <Badge className="bg-amber-400 text-slate-950 border-0 text-xs font-bold px-3 py-1 shadow-sm">
                  {status}
                </Badge>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="zoom-in" duration={800} delay={100}>
            <div className="group relative w-full aspect-16/9 rounded-3xl overflow-hidden shadow-xl mb-10 bg-slate-100">
              <Image
                src={image}
                alt={title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </ScrollReveal>

          {/* Project Details Strip */}
          <ScrollReveal variant="fade-up" duration={700} delay={150}>
            <div className="bg-[#faf9f5] rounded-2xl border border-slate-200/80 p-6 sm:p-8 mb-12 grid grid-cols-1 sm:grid-cols-3 gap-6 shadow-xs">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-semibold uppercase text-slate-400">Location</span>
                  <span className="text-sm font-bold text-slate-900">{location}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-emerald-800 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs font-semibold uppercase text-slate-400">Timeline</span>
                  <span className="text-sm font-bold text-slate-900">{year}</span>
                </div>
              </div>

              {beneficiaries && (
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-semibold uppercase text-slate-400">Beneficiaries</span>
                    <span className="text-sm font-bold text-slate-900">{beneficiaries}</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Narrative Content */}
          <ScrollReveal variant="fade-up" duration={700} delay={200}>
            <div className="prose prose-lg prose-slate max-w-none space-y-6 leading-relaxed text-slate-700">
              {lexicalParagraphs.length > 0 ? (
                <div className="space-y-6">
                  {lexicalParagraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === 0
                          ? "text-xl font-medium text-slate-800 leading-relaxed"
                          : "leading-relaxed"
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-xl font-medium text-slate-800 leading-relaxed">
                    {shortDescription}
                  </p>
                  <p className="leading-relaxed">
                    {fullDescription}
                  </p>
                </div>
              )}
            </div>
          </ScrollReveal>

          {/* Key Deliverables / Outcomes */}
          {keyOutcomes.length > 0 && (
            <ScrollReveal variant="fade-up" duration={700} delay={250}>
              <div className="mt-12 p-8 bg-emerald-50/50 rounded-3xl border border-emerald-100 shadow-xs">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Key Outcomes & Deliverables
                </h3>
                <ul className="space-y-3">
                  {keyOutcomes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base group">
                      <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          )}

          {/* Action CTAs */}
          <ScrollReveal variant="fade-up" duration={600} delay={300}>
            <div className="mt-16 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <Button
                asChild
                className="bg-[#03452c] hover:bg-[#023320] text-white rounded-full px-6 py-2.5 h-auto text-sm transition-transform duration-200 hover:scale-105 active:scale-95 shadow-md"
              >
                <Link href="/get-involved" className="inline-flex items-center gap-2 group">
                  <span>Volunteer for this Project</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="border-amber-500 text-amber-700 hover:bg-amber-50 rounded-full px-5 py-2.5 h-auto text-sm transition-transform duration-200 hover:scale-105 active:scale-95 shadow-xs"
              >
                <Link href="/donate" className="inline-flex items-center gap-1.5 group">
                  <Heart className="h-4 w-4 fill-amber-500 text-amber-500 transition-transform group-hover:scale-110" />
                  <span>Support This Initiative</span>
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </Container>
      </article>
    </>
  );
}
