import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Users, ArrowRight, Heart } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getMediaUrl } from "@/blocks/shared/getMediaUrl";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { projectsData } from "@/data/page-projects";
import type { ProjectsBlock, Media } from "@/payload-types";

interface ProjectListItem {
  id?: string | null;
  slug?: string | null;
  title: string;
  category?: string | null;
  status?: string | null;
  location?: string | null;
  year?: string | null;
  beneficiaries?: string | null;
  shortDescription?: string | null;
  fullDescription?: string | null;
  image?: unknown;
  imageUrl?: string | null;
}

export interface ProjectsComponentProps {
  data?: ProjectsBlock | Record<string, unknown>;
  variant?: string | null;
}

export function ProjectsComponent(
  props?: (ProjectsComponentProps & Partial<ProjectsBlock>) | Partial<ProjectsBlock>
) {
  const block = (("data" in (props || {}) && (props as ProjectsComponentProps)?.data
    ? (props as ProjectsComponentProps).data
    : props) || {}) as Partial<ProjectsBlock> & { variant?: string | null };

  const variant = (props as ProjectsComponentProps)?.variant || block.variant;

  if (variant === "list") {
    const eyebrow = block.eyebrow || projectsData.hero.eyebrow;
    const heading = block.heading || projectsData.hero.heading;
    const description = block.description || projectsData.hero.description;
    const items = (
      block.items && block.items.length > 0
        ? block.items
        : projectsData.projects
    ) as ProjectListItem[];

    return (
      <section className="py-20 sm:py-28 bg-[#faf9f5]">
        <Container>
          {(heading || description) && (
            <div className="max-w-3xl mx-auto text-center mb-16">
              {eyebrow && <SectionLabel>{eyebrow}</SectionLabel>}
              {heading && (
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {heading}
                </h2>
              )}
              {description && (
                <p className="mt-4 text-base text-slate-600">{description}</p>
              )}
            </div>
          )}

          <div className="space-y-16">
            {items.map((proj, idx) => {
              const projId = proj.id || proj.slug || `proj-${idx}`;
              const imgSrc =
                getMediaUrl(proj.image as string | Media | null | undefined) ||
                proj.imageUrl ||
                (typeof proj.image === "string" ? proj.image : "/images/project-1.png");
              const category = proj.category || "Education";
              const status = proj.status || "Active";
              const location = proj.location || "India";
              const year = proj.year || "2024-Present";
              const beneficiaries = proj.beneficiaries || "";
              const fullDescription =
                proj.fullDescription || proj.shortDescription || "";

              return (
                <div
                  key={projId}
                  id={projId}
                  className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 scroll-mt-32"
                >
                  <div className="lg:col-span-5 relative aspect-16/10 lg:aspect-auto min-h-[300px] bg-slate-100">
                    <Image
                      src={imgSrc}
                      alt={proj.title || "Project Image"}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-[#03452c] text-white border-0 text-xs font-semibold">
                        {category}
                      </Badge>
                      <Badge className="bg-amber-400 text-slate-950 border-0 text-xs font-bold">
                        {status}
                      </Badge>
                    </div>
                  </div>

                  <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1.5 font-medium">
                          <MapPin className="h-4 w-4 text-emerald-800" />
                          <span>{location}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5 font-medium">
                          <Calendar className="h-4 w-4 text-emerald-800" />
                          <span>{year}</span>
                        </span>
                        {beneficiaries && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1.5 font-bold text-emerald-900">
                              <Users className="h-4 w-4 text-amber-500" />
                              <span>{beneficiaries}</span>
                            </span>
                          </>
                        )}
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                        {proj.title}
                      </h2>

                      <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                        {fullDescription}
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
              );
            })}
          </div>
        </Container>
      </section>
    );
  }

  return <ProjectsSection data={block as ProjectsBlock} />;
}

export default ProjectsComponent;
