import React from "react";
import Link from "next/link";
import {
  Compass,
  Layers,
  HeartHandshake,
  ShieldCheck,
  ExternalLink,
  FolderTree,
  Code2,
  Newspaper,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PageHero } from "@/components/common/PageHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { constructMetadata, generateBreadcrumbSchema } from "@/lib/seo";
import { homeData } from "@/data/page-home";
import { projectsData } from "@/data/page-projects";

export const metadata = constructMetadata({
  title: "Sitemap & Website Directory — Arvishha Foundation",
  description:
    "Complete directory and sitemap of all pages, field initiatives, legal policies, and news updates across the Arvishha Foundation portal.",
  canonical: "/sitemap",
});

export default function SitemapPage() {
  const breadcrumbLd = generateBreadcrumbSchema([
    { name: "Sitemap", url: "/sitemap" },
  ]);

  const corePages = [
    {
      title: "Home",
      href: "/",
      description: "Foundation overview, key mission, pillars of change, and grassroots impact highlights.",
    },
    {
      title: "Who We Are (About Us)",
      href: "/about",
      description: "Our founding vision, values, leadership team, and organizational governance.",
    },
    {
      title: "What We Do",
      href: "/what-we-do",
      description: "Our focus pillars: Inclusive Education, Women Empowerment, Preventive Healthcare, and Community Development.",
    },
    {
      title: "Ground Projects",
      href: "/projects",
      description: "Active community programs with measurable field impact, direct beneficiaries, and volunteer engagement.",
    },
    {
      title: "News & Stories",
      href: "/news",
      description: "Ground stories, quarterly milestone reports, press coverage, and field publications.",
    },
    {
      title: "Get Involved",
      href: "/get-involved",
      description: "Volunteer registration, community chapter enrollment, and corporate CSR partnerships.",
    },
    {
      title: "Contact Us",
      href: "/contact",
      description: "Direct outreach channels, regional office locations, and general inquiry forms.",
    },
    {
      title: "Donate / Support",
      href: "/donate",
      description: "Tax-exempt donations, banking details, and recurring support options for social projects.",
    },
  ];

  const initiatives = [
    {
      title: "Become a Grassroots Volunteer",
      href: "/get-involved#volunteer",
      description: "Join field operations in teaching, health drives, or artisan mentorship.",
    },
    {
      title: "Institutional & CSR Partnerships",
      href: "/get-involved#partner",
      description: "Partner with Arvishha Foundation on structured corporate social responsibility programs.",
    },
    {
      title: "Community Chapters & Local Centers",
      href: "/what-we-do",
      description: "Establishing localized learning and self-reliance hubs in underserved neighborhoods.",
    },
    {
      title: "Annual Reports & Financial Transparency",
      href: "/about#transparency",
      description: "Open disclosure of donation utilization, audited financials, and governance.",
    },
  ];

  const legalPages = [
    {
      title: "Privacy Policy",
      href: "/privacy-policy",
      description: "Donor confidentiality standards, data protection protocols, and privacy rights.",
    },
    {
      title: "Terms & Conditions",
      href: "/terms",
      description: "Website usage terms, intellectual property, donation compliance, and governance.",
    },
    {
      title: "Cookie Policy",
      href: "/cookie-policy",
      description: "Information regarding cookie usage, analytics cookies, and visitor browser preferences.",
    },
  ];

  const staticNews = homeData.news.staticArticles;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageHero
        eyebrow="Directory & Structure"
        heading="Website Sitemap"
        description="Comprehensive index of all accessible pages, field initiatives, legal policies, and news updates across Arvishha Foundation."
        breadcrumbs={[{ label: "Sitemap" }]}
      />

      <section className="py-16 sm:py-24 bg-[#faf9f5]">
        <Container>
          {/* Machine-Readable Feeds Callout */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <Badge variant="accent" className="text-xs">
                  Search Engine & Crawlers
                </Badge>
                <Badge variant="outline" className="text-xs">
                  XML Protocol
                </Badge>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Machine-Readable XML Sitemap & Robots Protocol
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                For search engines like Google, Bing, and indexing crawlers, we maintain automated, standards-compliant XML feeds following the Sitemaps.org protocol.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button asChild variant="outlinePrimary" className="text-xs sm:text-sm h-10 px-5">
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <Code2 className="h-4 w-4 text-emerald-800" />
                  <span>View sitemap.xml</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </Button>
              <Button asChild variant="outline" className="text-xs sm:text-sm h-10 px-5">
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <FolderTree className="h-4 w-4 text-slate-700" />
                  <span>View robots.txt</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </Button>
            </div>
          </div>

          <div className="space-y-16">
            {/* 1. Core Pages */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Core Site Pages
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Primary navigational sections and organization portals
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {corePages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="group bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-emerald-700/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                          {page.title}
                        </h3>
                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {page.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] font-mono text-emerald-700">
                      <span>{page.href}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. Active Projects */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Active Ground Projects
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Key field initiatives and flagship community development programs
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {projectsData.projects.map((proj) => (
                  <Link
                    key={proj.id}
                    href={`/projects#${proj.id}`}
                    className="group bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-amber-500 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <Badge variant="accent" className="text-[10px] px-2 py-0.5">
                          {proj.category}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                          {proj.status}
                        </Badge>
                      </div>
                      <h3 className="font-bold text-slate-900 group-hover:text-amber-800 transition-colors text-sm sm:text-base leading-snug">
                        {proj.title}
                      </h3>
                      <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {proj.shortDescription}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">{proj.location}</span>
                      <span className="font-bold text-emerald-800">{proj.beneficiaries}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. Community Engagement & Transparency */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Community Initiatives & Participation
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Ways to partner, volunteer, and review governance
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {initiatives.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="group bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-emerald-700/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                          {item.title}
                        </h3>
                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] font-mono text-emerald-700">
                      <span>{item.href}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 4. News & Field Articles */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <Newspaper className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Published News & Stories
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Featured field updates, articles, and community stories
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {staticNews.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/news/${article.slug}`}
                    className="group bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-emerald-700/50 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <Badge variant="default" className="text-[10px] px-2 py-0.5">
                          {article.category}
                        </Badge>
                        <span className="text-[11px] text-slate-500">{article.readTime}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors text-sm sm:text-base leading-snug">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">{article.date}</span>
                      <span className="font-mono text-emerald-700">/news/{article.slug}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 5. Legal, Policies & Governance */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Legal, Policies & Governance
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Compliance, donor protection, and transparent governance frameworks
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {legalPages.map((policy) => (
                  <Link
                    key={policy.href}
                    href={policy.href}
                    className="group bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-slate-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                          {policy.title}
                        </h3>
                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {policy.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] font-mono text-emerald-700">
                      <span>{policy.href}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
