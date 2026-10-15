import React, { Fragment } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { CMSLink } from "@/components/common/CMSLink";
import { SectionLabel } from "@/components/common/SectionLabel";
import { Button } from "@/components/ui/button";

// Production UI components
import { HomeHero } from "@/components/home/HomeHero";
import { PageHero } from "@/components/common/PageHero";
import { ImpactTrust } from "@/components/home/ImpactTrust";
import { ImpactDarkSection } from "@/components/home/ImpactDarkSection";
import { FocusAreas } from "@/components/home/FocusAreas";
import { MissionSection } from "@/components/home/MissionSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { CTASection } from "@/components/home/CTASection";
import { FAQSection } from "@/components/home/FAQSection";
import { NewsSection } from "@/components/home/NewsSection";
import { ContactSection } from "@/components/home/ContactSection";
import { ContactForm } from "@/components/forms/ContactForm";

// Icons
import {
  HeartHandshake,
  Users2,
  ShieldCheck,
  Sparkles,
  Heart,
  Building,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

// Payload CMS types
import type {
  Page,
  Media,
  HeroBlock,
  ImpactStatsBlock,
  FocusAreasBlock,
  MissionVisionBlock,
  ProjectsBlock,
  TestimonialsBlock,
  ProcessBlock,
  CTABlock,
  FAQBlock,
  NewsBlock,
  ContactBlock,
  ValuesBlock,
  DonateTiersBlock,
  TeamBlock,
  PartnersBlock,
  ContentBlock,
  MediaBlock,
  FormBlock,
} from "@/payload-types";

// Static fallback data
import { homeData } from "@/data/page-home";
import { aboutData } from "@/data/page-about";
import { donateData } from "@/data/page-donate";

// Extract layout block type safely
export type PageBlock = Page["layout"][number];
export type BlockType = PageBlock["blockType"];

/**
 * Safely extracts a displayable image URL from a Payload CMS Media field.
 */
export function getMediaUrl(
  media: string | Media | null | undefined
): string | null {
  if (!media) return null;
  if (typeof media === "string") {
    if (
      media.startsWith("http://") ||
      media.startsWith("https://") ||
      media.startsWith("/")
    ) {
      return media;
    }
    return null;
  }
  if (typeof media === "object" && media?.url) {
    return media.url;
  }
  return null;
}

/**
 * Recursive Lexical rich text AST renderer.
 */
export function LexicalRenderer({ node }: { node: any }): React.ReactNode {
  if (!node) return null;

  if (node.type === "text") {
    let content: React.ReactNode = node.text || "";
    const format = typeof node.format === "number" ? node.format : 0;
    if (format & 1) content = <strong>{content}</strong>;
    if (format & 2) content = <em>{content}</em>;
    if (format & 4) content = <del>{content}</del>;
    if (format & 8) content = <u>{content}</u>;
    if (format & 16) {
      content = (
        <code className="bg-slate-100 text-emerald-800 text-xs px-1.5 py-0.5 rounded font-mono">
          {content}
        </code>
      );
    }
    return content;
  }

  if (node.type === "linebreak") return <br />;
  if (node.type === "horizontalrule") return <hr className="my-6 border-slate-200" />;

  const children = Array.isArray(node.children)
    ? node.children.map((child: any, idx: number) => (
        <LexicalRenderer key={idx} node={child} />
      ))
    : null;

  switch (node.type) {
    case "paragraph": {
      const alignClass =
        node.format === "center"
          ? "text-center"
          : node.format === "right"
            ? "text-right"
            : node.format === "justify"
              ? "text-justify"
              : "";
      return (
        <p className={`mb-4 text-slate-700 leading-relaxed ${alignClass}`}>
          {children}
        </p>
      );
    }
    case "heading": {
      const tag = (node.tag || "h2").toLowerCase();
      if (tag === "h1") {
        return (
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-8 mb-4 tracking-tight">
            {children}
          </h1>
        );
      }
      if (tag === "h3") {
        return (
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-6 mb-2 tracking-tight">
            {children}
          </h3>
        );
      }
      if (tag === "h4") {
        return (
          <h4 className="text-lg font-bold text-slate-900 mt-5 mb-2 tracking-tight">
            {children}
          </h4>
        );
      }
      return (
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-7 mb-3 tracking-tight">
          {children}
        </h2>
      );
    }
    case "list":
      if (node.listType === "number") {
        return <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>;
      }
      return <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>;
    case "listitem":
      return <li className="text-slate-700 leading-relaxed">{children}</li>;
    case "quote":
      return (
        <blockquote className="border-l-4 border-emerald-600 pl-4 py-2 my-5 italic text-slate-800 bg-slate-50 rounded-r-lg">
          {children}
        </blockquote>
      );
    case "link":
      return (
        <CMSLink
          href={node.fields?.url || "#"}
          newTab={node.fields?.newTab}
          className="text-[#03452c] underline hover:text-emerald-700 font-semibold transition-colors"
        >
          {children}
        </CMSLink>
      );
    default:
      return children;
  }
}

// ---------------------------------------------------------------------------
// Dynamic Block Components
// ---------------------------------------------------------------------------

/**
 * 1. Hero Block
 */
export function DynamicHeroBlock(block: HeroBlock) {
  if (block.variant === "page") {
    return (
      <PageHero
        eyebrow={block.eyebrow || undefined}
        heading={block.heading}
        description={block.subheading || undefined}
        breadcrumbs={
          block.breadcrumbs?.map((b) => ({
            label: b.label,
            href: b.href || undefined,
          })) || undefined
        }
      />
    );
  }

  const heroData = {
    eyebrow: block.eyebrow || homeData.hero.eyebrow,
    headingPrefix: block.headingPrefix || undefined,
    headingMiddle: block.headingMiddle || undefined,
    headingAction: block.headingAction || undefined,
    highlightWord: block.highlightWord || undefined,
    heading: block.heading || homeData.hero.heading,
    description: block.subheading || homeData.hero.description,
    primaryCta: block.primaryCta?.label
      ? { label: block.primaryCta.label, href: block.primaryCta.url }
      : homeData.hero.primaryCta,
    secondaryCta: block.secondaryCta?.label
      ? { label: block.secondaryCta.label, href: block.secondaryCta.url }
      : homeData.hero.secondaryCta,
    image: getMediaUrl(block.image) || block.imageUrl || homeData.hero.image.src,
    imageAlt: block.imageAlt || homeData.hero.image.alt,
    stats:
      block.stats && block.stats.length > 0
        ? block.stats
        : homeData.hero.stats,
    floatingBadges: block.floatingBadges || homeData.hero.floatingBadges,
  };

  return <HomeHero data={heroData} />;
}

/**
 * 2. Impact Stats Block
 */
export function DynamicImpactStatsBlock(block: ImpactStatsBlock) {
  const stats =
    block.stats && block.stats.length > 0
      ? block.stats.map((s, idx) => ({
          id: s.id || `stat-${idx}`,
          value: s.value,
          label: s.label,
          sublabel: s.sublabel || "",
          icon: s.icon || "Users",
        }))
      : homeData.impactStats.stats;

  if (block.theme === "darkGreen") {
    return (
      <ImpactDarkSection
        data={{
          eyebrow: block.eyebrow || homeData.impactDark.eyebrow,
          heading: block.heading || homeData.impactDark.heading,
          description: block.description || homeData.impactDark.description,
          stats,
          features: homeData.impactDark.features,
        }}
      />
    );
  }

  return (
    <ImpactTrust
      data={{
        eyebrow: block.eyebrow || homeData.impactStats.eyebrow,
        heading: block.heading || homeData.impactStats.heading,
        description: block.description || homeData.impactStats.description,
        stats,
      }}
    />
  );
}

/**
 * 3. Focus Areas Block
 */
export function DynamicFocusAreasBlock(block: FocusAreasBlock) {
  const items =
    block.items && block.items.length > 0
      ? block.items.map((item, idx) => ({
          id: item.id || `fa-${idx}`,
          title: item.title,
          description: item.description,
          iconName: item.iconName || "GraduationCap",
          image: getMediaUrl(item.image) || item.imageUrl || "/images/fa-education.png",
          href: item.href || "/what-we-do",
        }))
      : homeData.focusAreas.items;

  return (
    <FocusAreas
      data={{
        eyebrow: block.eyebrow || homeData.focusAreas.eyebrow,
        heading: block.heading || homeData.focusAreas.heading,
        subheading: block.description || homeData.focusAreas.subheading,
        viewAllCta: homeData.focusAreas.viewAllCta,
        items,
      }}
    />
  );
}

/**
 * 4. Mission & Vision Block
 */
export function DynamicMissionVisionBlock(block: MissionVisionBlock) {
  const leftVisual = {
    badge: block.leftVisual?.badge || homeData.missionApproach.leftVisual.badge,
    title: block.leftVisual?.title || "Creating Change Where It Matters Most",
    subtext: block.leftVisual?.subtext || homeData.missionApproach.leftVisual.subtext,
    bulletPoints:
      block.leftVisual?.bulletPoints && block.leftVisual.bulletPoints.length > 0
        ? block.leftVisual.bulletPoints.map((b: any) =>
            typeof b === "string" ? b : b.point
          )
        : homeData.missionApproach.leftVisual.bulletPoints,
    image:
      getMediaUrl(block.leftVisual?.image) ||
      block.leftVisual?.imageUrl ||
      homeData.missionApproach.leftVisual.image,
    alt:
      block.leftVisual?.imageAlt ||
      homeData.missionApproach.leftVisual.alt,
  };

  const tabs =
    block.tabs && block.tabs.length > 0
      ? block.tabs.map((tab, idx) => ({
          id: tab.tabId || `tab-${idx}`,
          title: tab.label || `Pillar ${idx + 1}`,
          heading: tab.heading,
          description: tab.description,
          points: tab.points?.map((p: any) =>
            typeof p === "string" ? p : p.point
          ) || [],
          image:
            getMediaUrl(tab.image) ||
            tab.imageUrl ||
            "/images/approach-participatory.png",
        }))
      : homeData.missionApproach.tabs;

  return (
    <MissionSection
      data={{
        eyebrow: block.eyebrow || homeData.missionApproach.eyebrow,
        heading: block.heading || homeData.missionApproach.heading,
        description: block.subheading || homeData.missionApproach.description,
        leftVisual,
        tabs,
      }}
    />
  );
}

/**
 * 5. Projects Block
 */
export function DynamicProjectsBlock(block: ProjectsBlock) {
  const items =
    block.items && block.items.length > 0
      ? block.items.map((item, idx) => ({
          id: item.id || `proj-${idx}`,
          title: item.title,
          category: item.category || "Education",
          status: item.status || "Active",
          location: item.location || "India",
          year: item.year || "2024-Present",
          beneficiaries: item.beneficiaries || "Community Impact",
          shortDescription: item.shortDescription,
          image:
            getMediaUrl(item.image) ||
            item.imageUrl ||
            "/images/project-1.png",
          href:
            item.href ||
            (item.slug ? `/projects/${item.slug}` : "/projects"),
        }))
      : homeData.projects.items;

  return (
    <ProjectsSection
      data={{
        eyebrow: block.eyebrow || homeData.projects.eyebrow,
        heading: block.heading || homeData.projects.heading,
        subheading: block.description || homeData.projects.subheading,
        viewAllCta: {
          label: block.viewAllLink?.label || "Explore All Projects",
          href: block.viewAllLink?.url || "/projects",
        },
        items,
      }}
    />
  );
}

/**
 * 6. Testimonials Block
 */
export function DynamicTestimonialsBlock(block: TestimonialsBlock) {
  const items =
    block.items && block.items.length > 0
      ? block.items.map((item, idx) => ({
          id: item.id || `test-${idx}`,
          quote: item.quote,
          name: item.name,
          role: item.role,
          location: item.location || "",
          initiative: item.initiative || "Community Impact",
          avatar:
            getMediaUrl(item.avatar) ||
            item.avatarUrl ||
            "/images/avatar-1.png",
        }))
      : homeData.testimonials.items;

  return (
    <TestimonialsSection
      data={{
        eyebrow: block.eyebrow || homeData.testimonials.eyebrow,
        heading: block.heading || homeData.testimonials.heading,
        subheading: block.description || homeData.testimonials.subheading,
        theme: block.theme || "darkGreen",
        items,
      }}
    />
  );
}

/**
 * 7. Process Block
 */
export function DynamicProcessBlock(block: ProcessBlock) {
  const steps =
    block.steps && block.steps.length > 0
      ? block.steps.map((s) => ({
          step: s.step,
          title: s.title,
          description: s.description,
          phase: s.phaseTag || `Phase ${s.step}`,
        }))
      : homeData.approach.steps;

  return (
    <ProcessSection
      data={{
        eyebrow: block.eyebrow || homeData.approach.eyebrow,
        heading: block.heading || homeData.approach.heading,
        subheading: block.subheading || homeData.approach.subheading,
        steps,
      }}
    />
  );
}

/**
 * 8. CTA Block
 */
export function DynamicCTABlock(block: CTABlock) {
  return (
    <CTASection
      data={{
        badge: block.badge || "Join Hands With Arvishha",
        heading: block.heading || homeData.cta.heading,
        subheading: block.subheading || homeData.cta.subheading,
        theme: block.theme || "darkGreen",
        primaryCta: block.primaryCta?.label
          ? { label: block.primaryCta.label, href: block.primaryCta.url }
          : homeData.cta.primaryCta,
        secondaryCta: block.secondaryCta?.label
          ? { label: block.secondaryCta.label, href: block.secondaryCta.url }
          : homeData.cta.secondaryCta,
      }}
    />
  );
}

/**
 * 9. FAQ Block
 */
export function DynamicFAQBlock(block: FAQBlock) {
  const items =
    block.items && block.items.length > 0
      ? block.items.map((item, idx) => ({
          id: item.id || `faq-${idx}`,
          question: item.question,
          answer: item.answer,
          category: item.category || "General",
        }))
      : homeData.faq.items;

  return (
    <FAQSection
      data={{
        eyebrow: block.eyebrow || homeData.faq.eyebrow,
        heading: block.heading || homeData.faq.heading,
        subheading: block.subheading || homeData.faq.subheading,
        contactLink: block.contactLink?.label
          ? { label: block.contactLink.label, url: block.contactLink.url }
          : { label: "Have More Questions?", url: "/contact" },
        items,
      }}
    />
  );
}

/**
 * 10. News Block
 */
export function DynamicNewsBlock(block: NewsBlock) {
  const articles =
    block.items && block.items.length > 0
      ? block.items.map((item, idx) => ({
          id: item.id || `news-${idx}`,
          title: item.title,
          category: item.category || "Education",
          date: item.date || "Recent Update",
          readTime: item.readTime || "3 min read",
          excerpt: item.excerpt,
          image:
            getMediaUrl(item.image) ||
            item.imageUrl ||
            "/images/news-1.png",
          slug: item.href
            ? item.href.replace(/^\/news\/?/, "")
            : `article-${idx}`,
        }))
      : homeData.news.staticArticles;

  return (
    <NewsSection
      data={{
        eyebrow: block.eyebrow || homeData.news.eyebrow,
        heading: block.heading || homeData.news.heading,
        subheading: block.subheading || homeData.news.subheading,
        viewAllCta: {
          label: block.viewAllLink?.label || homeData.news.viewAllCta.label,
          href: block.viewAllLink?.url || homeData.news.viewAllCta.href,
        },
        staticArticles: articles,
      }}
    />
  );
}

/**
 * 11. Contact Block
 */
export function DynamicContactBlock(block: ContactBlock) {
  return (
    <ContactSection
      data={{
        eyebrow: block.eyebrow || homeData.contact.eyebrow,
        heading: block.heading || homeData.contact.heading,
        subheading: block.subheading || homeData.contact.subheading,
        phoneOverride: block.phoneOverride || undefined,
        emailOverride: block.emailOverride || undefined,
        info: homeData.contact.info,
      }}
    />
  );
}

/**
 * 12. Values Block
 */
const valueIcons: Record<string, React.ReactNode> = {
  HeartHandshake: <HeartHandshake className="h-6 w-6 text-amber-500" />,
  Users2: <Users2 className="h-6 w-6 text-amber-500" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6 text-amber-500" />,
  Sparkles: <Sparkles className="h-6 w-6 text-amber-500" />,
  Heart: <Heart className="h-6 w-6 text-amber-500" />,
};

export function DynamicValuesBlock(block: ValuesBlock) {
  const eyebrow = block.eyebrow || "Guiding Principles";
  const heading = block.heading || "Values That Anchor Everything We Do";
  const description =
    block.description ||
    "Our culture and field operations are steered by ethical rigor, community trust, and mutual respect.";
  const items =
    block.items && block.items.length > 0 ? block.items : aboutData.values;

  return (
    <section className="py-20 sm:py-28 bg-[#faf9f5] border-t border-slate-200/60">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionLabel>{eyebrow}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {heading}
          </h2>
          <p className="mt-4 text-base text-slate-600">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((val, idx) => {
            const iconName = val.icon || "HeartHandshake";
            const iconElement = valueIcons[iconName] || (
              <HeartHandshake className="h-6 w-6 text-amber-500" />
            );
            const key =
              "id" in val && typeof val.id === "string" ? val.id : idx;

            return (
              <div
                key={key}
                className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-5">
                    {iconElement}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/**
 * 13. Donate Tiers Block
 */
export function DynamicDonateTiersBlock(block: DonateTiersBlock) {
  const eyebrow = block.eyebrow || donateData.hero.eyebrow;
  const heading = block.heading || donateData.hero.heading;
  const description = block.description || donateData.hero.description;
  const tiers =
    block.tiers && block.tiers.length > 0
      ? block.tiers
      : donateData.impactOptions;

  const bank = {
    accountName:
      block.bankDetails?.accountName || donateData.bankDetails.accountName,
    accountNumber:
      block.bankDetails?.accountNumber || donateData.bankDetails.accountNumber,
    bankName: block.bankDetails?.bankName || donateData.bankDetails.bankName,
    branch: block.bankDetails?.branch || donateData.bankDetails.branch,
    ifscCode: block.bankDetails?.ifscCode || donateData.bankDetails.ifscCode,
    upiId: block.bankDetails?.upiId || donateData.bankDetails.upiId,
  };

  const transparencyPoints =
    block.transparencyPoints && block.transparencyPoints.length > 0
      ? block.transparencyPoints.map((p) => p.point)
      : [
          "Transparent audited financial disclosures",
          "Quarterly impact and photographic field dispatches",
          "Official digitally signed contribution receipts",
        ];

  return (
    <section className="py-20 sm:py-28 bg-[#faf9f5]">
      <Container>
        {/* Impact Donation Tiers */}
        <div className="mb-20">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <SectionLabel>{eyebrow}</SectionLabel>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {heading}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              {description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, idx) => {
              const key =
                "id" in tier && typeof tier.id === "string" ? tier.id : idx;
              return (
                <div
                  key={key}
                  className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div>
                    <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-[#03452c] border border-emerald-200 mb-4">
                      {tier.amount}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#03452c] transition-colors">
                      {tier.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Button
                      asChild
                      className="w-full bg-[#03452c] hover:bg-[#023320] text-white rounded-full text-xs font-semibold py-2.5 h-auto justify-center"
                    >
                      <a href="#bank-transfer">Donate This Amount</a>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bank Transfer & Details Card */}
        <div
          id="bank-transfer"
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start scroll-mt-32"
        >
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-lg space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-[#03452c]">
                <Building className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                  Direct Bank Transfer &amp; UPI
                </h3>
                <p className="text-xs text-slate-500">
                  Official account for donor contributions
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Account Name</span>
                <span className="font-bold text-slate-900 font-mono text-sm">
                  {bank.accountName}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Account Number</span>
                <span className="font-bold text-slate-900 font-mono text-sm">
                  {bank.accountNumber}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Bank Name</span>
                <span className="font-bold text-slate-900">
                  {bank.bankName}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Branch</span>
                <span className="font-bold text-slate-900">
                  {bank.branch}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">IFSC Code</span>
                <span className="font-bold text-slate-900 font-mono text-sm">
                  {bank.ifscCode}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">UPI ID</span>
                <span className="font-bold text-emerald-800 font-mono text-sm">
                  {bank.upiId}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#023420] text-white rounded-3xl p-8 sm:p-10 shadow-lg space-y-5">
            <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
              Tax Benefits &amp; Assurance
            </span>
            <h3 className="text-2xl font-bold leading-tight">
              100% Transparency Guarantee
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Every donation received directly funds our grassroots learning
              centers, healthcare initiatives, and skill training workshops.
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-emerald-100/90 pt-2">
              {transparencyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * 14. Team Block
 */
export function DynamicTeamBlock(block: TeamBlock) {
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

/**
 * 15. Partners Block
 */
export function DynamicPartnersBlock(block: PartnersBlock) {
  const eyebrow = block.eyebrow || "Partnerships for Good";
  const heading =
    block.heading || "Institutions & CSR Leaders Backing Our Grassroots Mission";
  const subheading =
    block.subheading ||
    "We collaborate with statutory bodies, visionary corporates, and philanthropic trusts to amplify our social impact.";
  const items = block.items || [];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-12">
          <SectionLabel>{eyebrow}</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">{subheading}</p>
        </div>

        {items && items.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
            {items.map((partner, idx) => {
              const logoSrc = getMediaUrl(partner.logo) || partner.logoUrl;

              const content = (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center min-h-[90px] text-center hover:border-emerald-300 transition-colors">
                  {logoSrc ? (
                    <div className="relative w-full h-12">
                      <Image
                        src={logoSrc}
                        alt={partner.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-slate-700">
                      {partner.name}
                    </span>
                  )}
                </div>
              );

              if (partner.website) {
                return (
                  <a
                    key={partner.id || idx}
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                    title={partner.name}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div key={partner.id || idx}>
                  {content}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-xs text-slate-400">
            Partnerships and collaborative programs active across India.
          </div>
        )}
      </Container>
    </section>
  );
}

/**
 * 16. Content Block (Rich Text)
 */
export function DynamicContentBlock(block: ContentBlock) {
  const widthClasses: Record<string, string> = {
    standard: "max-w-4xl mx-auto",
    narrow: "max-w-3xl mx-auto",
    wide: "max-w-6xl mx-auto",
    full: "w-full",
  };

  const bgClasses: Record<string, string> = {
    white: "bg-white",
    cream: "bg-[#faf9f5]",
    muted: "bg-slate-50",
    darkGreen: "bg-[#023420] text-white",
  };

  const containerClass =
    widthClasses[block.containerWidth || "standard"] || widthClasses.standard;
  const bgClass =
    bgClasses[block.backgroundColor || "white"] || bgClasses.white;

  const proseThemeClass =
    block.backgroundColor === "darkGreen"
      ? "prose-invert text-emerald-100"
      : "prose-slate";

  return (
    <section className={`py-12 sm:py-16 ${bgClass}`}>
      <Container>
        <div className={`prose ${proseThemeClass} max-w-none ${containerClass}`}>
          {block.content?.root && <LexicalRenderer node={block.content.root as any} />}
        </div>
      </Container>
    </section>
  );
}

/**
 * 17. Media Block
 */
export function DynamicMediaBlock(block: MediaBlock) {
  const mediaUrl = getMediaUrl(block.media) || block.mediaUrl;
  const alt = block.alt || "Arvishha Foundation Initiative";

  if (!mediaUrl) return null;

  const sizeClasses: Record<string, string> = {
    normal: "max-w-4xl mx-auto rounded-3xl aspect-16/9",
    wide: "max-w-6xl mx-auto rounded-3xl aspect-16/9",
    fullscreen: "w-full aspect-[21/9]",
  };

  const sizeClass = sizeClasses[block.size || "wide"] || sizeClasses.wide;

  return (
    <section className="py-12 bg-white">
      <Container
        size={block.size === "wide" ? "wide" : "default"}
        className={block.size === "fullscreen" ? "max-w-none px-0" : undefined}
      >
        <div className={`relative overflow-hidden shadow-xl bg-slate-100 ${sizeClass}`}>
          <Image
            src={mediaUrl}
            alt={alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {block.caption && (
          <p className="text-center text-xs text-slate-500 mt-3 italic max-w-2xl mx-auto">
            {block.caption}
          </p>
        )}
      </Container>
    </section>
  );
}

/**
 * 18. Form Block
 */
export function DynamicFormBlock(block: FormBlock) {
  return (
    <section className="py-16 sm:py-24 bg-[#faf9f5]">
      <Container size="narrow">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md">
          {block.enableIntro && block.introContent?.root && (
            <div className="mb-8">
              <LexicalRenderer node={block.introContent.root as any} />
            </div>
          )}
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Block Registry Mapping
// ---------------------------------------------------------------------------

export const blockComponents: Record<
  BlockType,
  React.ComponentType<any>
> = {
  hero: DynamicHeroBlock,
  content: DynamicContentBlock,
  impactStats: DynamicImpactStatsBlock,
  focusAreas: DynamicFocusAreasBlock,
  missionVision: DynamicMissionVisionBlock,
  projects: DynamicProjectsBlock,
  testimonials: DynamicTestimonialsBlock,
  process: DynamicProcessBlock,
  cta: DynamicCTABlock,
  faq: DynamicFAQBlock,
  news: DynamicNewsBlock,
  contact: DynamicContactBlock,
  mediaBlock: DynamicMediaBlock,
  formBlock: DynamicFormBlock,
  team: DynamicTeamBlock,
  partners: DynamicPartnersBlock,
  values: DynamicValuesBlock,
  donateTiers: DynamicDonateTiersBlock,
};

export interface RenderBlocksProps {
  blocks?: Page["layout"] | null;
  className?: string;
}

/**
 * Main Layout Block Renderer for Payload CMS pages.
 */
export const RenderBlocks: React.FC<RenderBlocksProps> = ({
  blocks,
  className,
}) => {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className={className}>
      {blocks.map((block, index) => {
        if (!block || !block.blockType) return null;

        const { blockType } = block;
        const BlockComponent = blockComponents[blockType];
        const key = block.id || `${blockType}-${index}`;

        if (BlockComponent) {
          return (
            <div
              className={`cms-block cms-block-${blockType}`}
              key={key}
            >
              <BlockComponent {...block} />
            </div>
          );
        }

        if (isDev) {
          return (
            <div
              key={key}
              className="p-4 my-4 border border-dashed border-amber-300 bg-amber-50 rounded-xl text-amber-900 text-xs text-center font-mono"
            >
              Warning: Unknown CMS block type &quot;{blockType}&quot;
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};
