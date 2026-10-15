"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { homeData } from "@/data/page-home";
import type { ProjectsBlock } from "@/payload-types";

export interface ProjectsSectionProps {
  data?: ProjectsBlock | typeof homeData.projects;
}

function ProjectCard({ project }: { project: any }) {
  const [imgError, setImgError] = useState(false);
  const imgSrc =
    typeof project.image === "object" && project.image?.url
      ? project.image.url
      : project.imageUrl ||
        (typeof project.image === "string" ? project.image : "/images/project-1.png");
  const href = project.href || (project.slug ? `/projects/${project.slug}` : "/projects");
  const category = project.category || "Education";
  const status = project.status || "Active";
  const location = project.location || "India";
  const year = project.year || "2024-Present";
  const beneficiaries = project.beneficiaries || "Community Impact";

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Project Image */}
      <div className="relative w-full aspect-16/10 bg-slate-100 overflow-hidden">
        {!imgError ? (
          <Image
            src={imgSrc}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-[#03452c] flex items-center justify-center text-white p-4 text-center">
            <span className="font-semibold text-sm">{category}</span>
          </div>
        )}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-emerald-950/80 backdrop-blur-xs text-white border-0 text-xs font-semibold">
            {category}
          </Badge>
          <Badge className="bg-amber-400 text-slate-950 border-0 text-xs font-bold">
            {status}
          </Badge>
        </div>
      </div>

      {/* Project Details */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-emerald-800" />
              <span>{location}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-emerald-800" />
              <span>{year}</span>
            </span>
          </div>

          <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#03452c] transition-colors leading-snug">
            {project.title}
          </h3>

          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-emerald-800">
            {beneficiaries}
          </span>
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:text-[#03452c] transition-colors"
          >
            <span>Learn more</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection({ data }: ProjectsSectionProps) {
  const d = data as any;
  const eyebrow = d?.eyebrow || homeData.projects.eyebrow;
  const heading = d?.heading || homeData.projects.heading;
  const subheading =
    d?.description || d?.subheading || homeData.projects.subheading;
  const viewAllHref =
    d?.viewAllLink?.url || d?.viewAllCta?.href || "/projects";
  const viewAllLabel =
    d?.viewAllLink?.label || d?.viewAllCta?.label || "Explore All Projects";
  const items =
    d?.items && d.items.length > 0 ? d.items : homeData.projects.items;

  return (
    <section className="py-20 sm:py-28 bg-[#faf9f5]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <SectionLabel>{eyebrow}</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {heading}
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              {subheading}
            </p>
          </div>

          <Button
            asChild
            className="bg-[#03452c] hover:bg-[#023320] text-white rounded-full px-7 py-3 h-auto shrink-0 shadow-sm"
          >
            <Link href={viewAllHref} className="inline-flex items-center gap-2">
              <span>{viewAllLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map((project: any, idx: number) => (
            <ProjectCard key={project.id || idx} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
