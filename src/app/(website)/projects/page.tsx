import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Users, ArrowRight, Heart } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/common/PageHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projectsData } from "@/data/page-projects";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Projects & Ground Initiatives — Arvishha Foundation",
  description:
    "Explore Arvishha Foundation's active field programs: Project Shiksha, Project Swavalamban, Arogya Chetna, and Project Prakriti.",
  canonical: "/projects",
});

export default function ProjectsPage() {
  const breadcrumbLd = generateBreadcrumbSchema([
    { name: "Projects", url: "/projects" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow={projectsData.hero.eyebrow}
        heading={projectsData.hero.heading}
        description={projectsData.hero.description}
        breadcrumbs={[{ label: "Projects" }]}
      />

      <section className="py-20 sm:py-28 bg-[#faf9f5]">
        <Container>
          <div className="space-y-16">
            {projectsData.projects.map((proj) => (
              <div
                key={proj.id}
                id={proj.id}
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 scroll-mt-32"
              >
                {/* Visual Image */}
                <div className="lg:col-span-5 relative aspect-16/10 lg:aspect-auto min-h-[300px] bg-slate-100">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-[#03452c] text-white border-0 text-xs font-semibold">
                      {proj.category}
                    </Badge>
                    <Badge className="bg-amber-400 text-slate-950 border-0 text-xs font-bold">
                      {proj.status}
                    </Badge>
                  </div>
                </div>

                {/* Project Details */}
                <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1.5 font-medium">
                        <MapPin className="h-4 w-4 text-emerald-800" />
                        <span>{proj.location}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar className="h-4 w-4 text-emerald-800" />
                        <span>{proj.year}</span>
                      </span>
                      {proj.beneficiaries && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1.5 font-bold text-emerald-900">
                            <Users className="h-4 w-4 text-amber-500" />
                            <span>{proj.beneficiaries}</span>
                          </span>
                        </>
                      )}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                      {proj.title}
                    </h2>

                    <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                      {proj.fullDescription || proj.shortDescription}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <Button
                      asChild
                      className="bg-[#03452c] hover:bg-[#023320] text-white rounded-full px-6 py-2.5 h-auto text-sm"
                    >
                      <Link href="/get-involved" className="inline-flex items-center gap-2">
                        <span>Volunteer for this Project</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="border-amber-500 text-amber-700 hover:bg-amber-50 rounded-full px-5 py-2.5 h-auto text-sm"
                    >
                      <Link href="/donate" className="inline-flex items-center gap-1.5">
                        <Heart className="h-4 w-4 fill-amber-500 text-amber-500" />
                        <span>Support This Initiative</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
