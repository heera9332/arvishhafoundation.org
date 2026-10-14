import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { CMSLink } from "@/components/common/CMSLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Page, Media } from "@/payload-types";
import {
  ArrowRight,
  ExternalLink,
  HelpCircle,
  Sparkles,
  Layers,
  Database,
  Quote,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Users,
} from "lucide-react";

// Extract layout block type safely
export type PageBlock = Page["layout"][number];
export type BlockType = PageBlock["blockType"];

/**
 * Registry of block components.
 * Set any block to a custom React component when you are ready to link it.
 * e.g. blockComponents.hero = CustomHeroComponent;
 */
export const blockComponents: Record<
  BlockType,
  React.ComponentType<any> | null
> = {
  hero: null,
  content: null,
  impactStats: null,
  focusAreas: null,
  missionVision: null,
  projects: null,
  testimonials: null,
  process: null,
  cta: null,
  faq: null,
  news: null,
  contact: null,
  mediaBlock: null,
  formBlock: null,
  team: null,
  partners: null,
  values: null,
  donateTiers: null,
};

// Helper to safely extract image URL from Media relation or string
function getMediaUrl(media: string | Media | null | undefined): string | null {
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

// Simple, safe Lexical AST renderer
function LexicalRenderer({ node }: { node: any }): React.ReactNode {
  if (!node) return null;

  if (node.type === "text") {
    let content: React.ReactNode = node.text;
    if (node.format & 1) content = <strong>{content}</strong>;
    if (node.format & 2) content = <em>{content}</em>;
    if (node.format & 8) content = <u>{content}</u>;
    return content;
  }

  const children = Array.isArray(node.children)
    ? node.children.map((child: any, idx: number) => (
        <LexicalRenderer key={idx} node={child} />
      ))
    : null;

  switch (node.type) {
    case "paragraph":
      return <p className="mb-4 text-slate-700 leading-relaxed">{children}</p>;
    case "heading": {
      const tag = node.tag || "h2";
      if (tag === "h1") {
        return (
          <h1 className="text-3xl font-bold text-slate-900 mt-6 mb-3 tracking-tight">
            {children}
          </h1>
        );
      }
      if (tag === "h3") {
        return (
          <h3 className="text-xl font-bold text-slate-900 mt-5 mb-2 tracking-tight">
            {children}
          </h3>
        );
      }
      if (tag === "h4") {
        return (
          <h4 className="text-lg font-bold text-slate-900 mt-4 mb-2 tracking-tight">
            {children}
          </h4>
        );
      }
      return (
        <h2 className="text-2xl font-bold text-slate-900 mt-6 mb-3 tracking-tight">
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
        <blockquote className="border-l-4 border-emerald-600 pl-4 py-1 my-4 italic text-slate-800 bg-slate-50 rounded-r">
          {children}
        </blockquote>
      );
    case "link":
      return (
        <CMSLink
          href={node.fields?.url || "#"}
          newTab={node.fields?.newTab}
          className="text-[#03452c] underline hover:text-emerald-700 font-semibold"
        >
          {children}
        </CMSLink>
      );
    default:
      return children;
  }
}

// Block Header badge & titles
function BlockHeader({
  eyebrow,
  heading,
  subheading,
  blockType,
  badgeText,
}: {
  eyebrow?: string | null;
  heading?: string | null;
  subheading?: string | null;
  blockType: string;
  badgeText?: string | null;
}) {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-[#023420] border border-emerald-200">
          <Layers className="h-3 w-3" />
          <span>{badgeText || eyebrow || blockType}</span>
        </span>
      </div>

      {heading && (
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
          {heading}
        </h2>
      )}

      {subheading && (
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
          {subheading}
        </p>
      )}
    </div>
  );
}

// Block Raw Data Inspector
function DataInspector({
  blockType,
  data,
}: {
  blockType: string;
  data: any;
}) {
  return (
    <div className="mt-8 pt-4 border-t border-slate-200/60">
      <details className="group text-xs text-slate-500">
        <summary className="cursor-pointer font-medium hover:text-slate-800 flex items-center gap-1.5 select-none">
          <Database className="h-3.5 w-3.5 text-slate-400" />
          <span>Inspect Saved Payload Data ({blockType})</span>
        </summary>
        <pre className="mt-2 p-4 bg-slate-900 text-slate-100 rounded-xl overflow-x-auto text-[11px] font-mono leading-relaxed max-h-80">
          {JSON.stringify(data, null, 2)}
        </pre>
      </details>
    </div>
  );
}

// Data-driven fallback renderers for each block type

function RenderHero(block: any) {
  const imageUrl = getMediaUrl(block.image);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#faf9f5] to-white border-b border-slate-200/60">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <BlockHeader
              eyebrow={block.eyebrow}
              heading={
                block.headingMiddle
                  ? `${block.headingPrefix || ""} ${block.headingMiddle || ""} ${block.headingAction || ""} ${block.highlightWord || ""}`.trim()
                  : block.heading
              }
              subheading={block.subheading}
              blockType="hero"
            />

            {(block.primaryCta?.label || block.secondaryCta?.label) && (
              <div className="flex flex-wrap gap-4 pt-2">
                {block.primaryCta?.label && (
                  <Button
                    asChild
                    className="bg-[#03452c] hover:bg-[#023420] text-white rounded-full px-7 py-3 h-auto font-bold shadow-md"
                  >
                    <CMSLink
                      href={block.primaryCta.url}
                      newTab={block.primaryCta.newTab}
                    >
                      <span>{block.primaryCta.label}</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </CMSLink>
                  </Button>
                )}
                {block.secondaryCta?.label && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-slate-300 hover:bg-slate-100 text-slate-800 rounded-full px-7 py-3 h-auto font-bold"
                  >
                    <CMSLink
                      href={block.secondaryCta.url}
                      newTab={block.secondaryCta.newTab}
                    >
                      {block.secondaryCta.label}
                    </CMSLink>
                  </Button>
                )}
              </div>
            )}

            {Array.isArray(block.stats) && block.stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                {block.stats.map((stat: any, idx: number) => (
                  <div key={idx} className="space-y-1">
                    <p className="text-2xl sm:text-3xl font-extrabold text-emerald-800">
                      {stat.value}
                    </p>
                    <p className="text-xs font-semibold text-slate-800 uppercase tracking-wide">
                      {stat.label}
                    </p>
                    {stat.sublabel && (
                      <p className="text-xs text-slate-500">{stat.sublabel}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            {imageUrl ? (
              <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                <Image
                  src={imageUrl}
                  alt={block.imageAlt || block.heading || "Hero Image"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-emerald-950 text-white shadow-xl space-y-4">
                <p className="text-xs uppercase font-semibold text-amber-400">
                  {block.floatingBadges?.communityFirstTitle || "Community First"}
                </p>
                <h3 className="text-xl font-bold">
                  {block.floatingBadges?.communityFirstSubtitle ||
                    "Grassroots Action. Lasting Dignity."}
                </h3>
                {block.floatingBadges?.proofCount && (
                  <div className="pt-4 border-t border-emerald-800">
                    <span className="text-3xl font-extrabold text-amber-400">
                      {block.floatingBadges.proofCount}
                    </span>
                    <p className="text-xs text-emerald-200 mt-1">
                      {block.floatingBadges.proofText}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <DataInspector blockType="hero" data={block} />
      </Container>
    </section>
  );
}

function RenderFocusAreas(block: any) {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/60">
      <Container>
        <BlockHeader
          eyebrow={block.eyebrow}
          heading={block.heading}
          subheading={block.description}
          blockType="focusAreas"
        />

        {Array.isArray(block.items) && block.items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {block.items.map((item: any, idx: number) => {
              const itemImg = getMediaUrl(item.image);
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-[#faf9f5] p-6 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {itemImg && (
                      <div className="relative w-full aspect-16/9 rounded-xl overflow-hidden mb-4 bg-slate-200">
                        <Image
                          src={itemImg}
                          alt={item.title || "Focus Area"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-xs">
                        {idx + 1}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {item.href && (
                    <div className="pt-4 mt-4 border-t border-slate-200/60">
                      <CMSLink
                        href={item.href}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#03452c] hover:underline"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </CMSLink>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <DataInspector blockType="focusAreas" data={block} />
      </Container>
    </section>
  );
}

function RenderProcess(block: any) {
  return (
    <section className="py-16 sm:py-24 bg-[#faf9f5] border-b border-slate-200/60">
      <Container>
        <BlockHeader
          eyebrow={block.eyebrow}
          heading={block.heading}
          subheading={block.subheading}
          blockType="process"
        />

        {Array.isArray(block.steps) && block.steps.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {block.steps.map((step: any, idx: number) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold text-emerald-800">
                      {step.step || `0${idx + 1}`}
                    </span>
                    {step.phaseTag && (
                      <Badge className="bg-emerald-50 text-emerald-900 border-emerald-200 text-xs">
                        {step.phaseTag}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <DataInspector blockType="process" data={block} />
      </Container>
    </section>
  );
}

function RenderTestimonials(block: any) {
  const isDark = block.theme === "darkGreen";

  return (
    <section
      className={`py-16 sm:py-24 border-b border-slate-200/60 ${
        isDark ? "bg-[#023420] text-white" : "bg-white text-slate-900"
      }`}
    >
      <Container>
        <BlockHeader
          eyebrow={block.eyebrow}
          heading={block.heading}
          subheading={block.description}
          blockType="testimonials"
          badgeText={block.eyebrow || "Testimonials"}
        />

        {Array.isArray(block.items) && block.items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {block.items.map((item: any, idx: number) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 border flex flex-col justify-between ${
                  isDark
                    ? "bg-emerald-950/70 border-emerald-800 text-white"
                    : "bg-[#faf9f5] border-slate-200 text-slate-900"
                }`}
              >
                <div>
                  <Quote
                    className={`h-8 w-8 mb-4 ${
                      isDark ? "text-amber-400" : "text-emerald-700"
                    }`}
                  />
                  <p
                    className={`text-sm italic leading-relaxed mb-6 ${
                      isDark ? "text-emerald-100" : "text-slate-700"
                    }`}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/20 flex items-center gap-3">
                  <div>
                    <p className="font-bold text-sm">{item.name}</p>
                    <p
                      className={`text-xs ${
                        isDark ? "text-emerald-300" : "text-slate-500"
                      }`}
                    >
                      {item.role} {item.location ? `• ${item.location}` : ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <DataInspector blockType="testimonials" data={block} />
      </Container>
    </section>
  );
}

function RenderFAQ(block: any) {
  const askAQuestion = block["Ask a Question"] || block.askAQuestion;

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/60">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <BlockHeader
              eyebrow={block.eyebrow}
              heading={block.heading}
              subheading={block.subheading}
              blockType="faq"
            />

            {Array.isArray(block.items) && block.items.length > 0 && (
              <div className="space-y-4">
                {block.items.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#faf9f5] border border-slate-200 space-y-2"
                  >
                    <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-emerald-800 shrink-0 mt-0.5" />
                      <span>{item.question}</span>
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed pl-7">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {askAQuestion && (
            <div className="lg:col-span-4">
              <div className="p-8 rounded-3xl bg-[#03452c] text-white shadow-xl space-y-4 sticky top-28">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Need Help?
                </span>
                <h3 className="text-xl font-bold leading-tight">
                  {askAQuestion.askQuestionHeading || "Don't Worry — We've Got Answers!"}
                </h3>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  {askAQuestion.description}
                </p>
                {askAQuestion.cta?.link?.label && (
                  <div className="pt-4">
                    <Button
                      asChild
                      className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-full py-3 h-auto"
                    >
                      <CMSLink
                        href={askAQuestion.cta.link.url || "/contact"}
                        newTab={askAQuestion.cta.link.newTab}
                      >
                        {askAQuestion.cta.link.label}
                      </CMSLink>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <DataInspector blockType="faq" data={block} />
      </Container>
    </section>
  );
}

function RenderNews(block: any) {
  return (
    <section className="py-16 sm:py-24 bg-[#faf9f5] border-b border-slate-200/60">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <BlockHeader
            eyebrow={block.eyebrow}
            heading={block.heading}
            subheading={block.subheading}
            blockType="news"
          />

          {block.viewAllLink?.label && (
            <Button
              asChild
              variant="outline"
              className="rounded-full border-slate-300 font-bold text-xs"
            >
              <CMSLink
                href={block.viewAllLink.url || "/news"}
                newTab={block.viewAllLink.newTab}
              >
                <span>{block.viewAllLink.label}</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </CMSLink>
            </Button>
          )}
        </div>

        {Array.isArray(block.items) && block.items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {block.items.map((item: any, idx: number) => {
              const itemImg = getMediaUrl(item.image);
              return (
                <article
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    {itemImg && (
                      <div className="relative w-full aspect-16/10 bg-slate-100">
                        <Image
                          src={itemImg}
                          alt={item.title || "News"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        {item.category && (
                          <Badge className="bg-emerald-50 text-emerald-900 border-0 text-[10px]">
                            {item.category}
                          </Badge>
                        )}
                        {item.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{item.readTime} min read</span>
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-slate-900 text-lg leading-snug">
                        {item.title}
                      </h3>

                      {item.excerpt && (
                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {item.excerpt}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <CMSLink
                      href={item.href || "/news"}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#03452c] hover:underline"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </CMSLink>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <DataInspector blockType="news" data={block} />
      </Container>
    </section>
  );
}

function RenderContact(block: any) {
  const imgUrl = getMediaUrl(block.sectionImage);

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/60">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <BlockHeader
              eyebrow={block.eyebrow}
              heading={block.heading}
              subheading={block.subheading}
              blockType="contact"
            />

            <div className="p-8 rounded-3xl bg-[#faf9f5] border border-slate-200 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">
                Contact & Inquiries
              </h3>
              <p className="text-sm text-slate-600">
                Have questions or want to partner with us? Reach out directly via our contact channels or visit our dedicated contact page.
              </p>
              <div className="pt-2">
                <Button
                  asChild
                  className="bg-[#03452c] hover:bg-[#023420] text-white rounded-full px-6 py-2.5 h-auto text-sm font-bold"
                >
                  <Link href="/contact">Go to Contact Page</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            {imgUrl ? (
              <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
                <Image
                  src={imgUrl}
                  alt={block.heading || "Contact"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="p-8 rounded-3xl bg-slate-100 border border-slate-200 text-center space-y-3">
                <Users className="h-10 w-10 text-emerald-800 mx-auto" />
                <h4 className="font-bold text-slate-900">Get In Touch</h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  We are here to help communities grow, succeed, and build dignity together.
                </p>
              </div>
            )}
          </div>
        </div>

        <DataInspector blockType="contact" data={block} />
      </Container>
    </section>
  );
}

function RenderCTA(block: any) {
  const isDark = block.theme === "darkGreen" || !block.theme;

  return (
    <section
      className={`py-16 sm:py-24 border-b border-slate-200/60 ${
        isDark ? "bg-[#023420] text-white" : "bg-[#faf9f5] text-slate-900"
      }`}
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {block.badge && (
            <span
              className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                isDark
                  ? "bg-emerald-900/80 text-amber-400 border border-emerald-700"
                  : "bg-emerald-100 text-emerald-900"
              }`}
            >
              {block.badge}
            </span>
          )}

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {block.heading}
          </h2>

          {block.subheading && (
            <p
              className={`text-base leading-relaxed ${
                isDark ? "text-emerald-100" : "text-slate-600"
              }`}
            >
              {block.subheading}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {block.primaryCta?.label && (
              <Button
                asChild
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-full px-8 py-3 h-auto shadow-md"
              >
                <CMSLink
                  href={block.primaryCta.url}
                  newTab={block.primaryCta.newTab}
                >
                  {block.primaryCta.label}
                </CMSLink>
              </Button>
            )}

            {block.secondaryCta?.label && (
              <Button
                asChild
                variant="outline"
                className={`rounded-full px-8 py-3 h-auto font-bold ${
                  isDark
                    ? "border-emerald-700 hover:bg-emerald-900/50 text-white"
                    : "border-slate-300 hover:bg-slate-100 text-slate-900"
                }`}
              >
                <CMSLink
                  href={block.secondaryCta.url}
                  newTab={block.secondaryCta.newTab}
                >
                  {block.secondaryCta.label}
                </CMSLink>
              </Button>
            )}
          </div>
        </div>

        <DataInspector blockType="cta" data={block} />
      </Container>
    </section>
  );
}

function RenderProjects(block: any) {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/60">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <BlockHeader
            eyebrow={block.eyebrow}
            heading={block.heading}
            subheading={block.description}
            blockType="projects"
          />

          {block.viewAllLink?.label && (
            <Button
              asChild
              variant="outline"
              className="rounded-full border-slate-300 font-bold text-xs"
            >
              <CMSLink
                href={block.viewAllLink.url || "/projects"}
                newTab={block.viewAllLink.newTab}
              >
                <span>{block.viewAllLink.label}</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
              </CMSLink>
            </Button>
          )}
        </div>

        {Array.isArray(block.items) && block.items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {block.items.map((item: any, idx: number) => {
              const itemImg = getMediaUrl(item.image);
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-[#faf9f5] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    {itemImg && (
                      <div className="relative w-full aspect-16/10 bg-slate-200">
                        <Image
                          src={itemImg}
                          alt={item.title || "Project"}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2">
                        {item.category && (
                          <Badge className="bg-emerald-100 text-emerald-900 border-0 text-[10px]">
                            {item.category}
                          </Badge>
                        )}
                        {item.status && (
                          <Badge variant="outline" className="text-[10px]">
                            {item.status}
                          </Badge>
                        )}
                      </div>

                      <h3 className="font-bold text-slate-900 text-lg leading-snug">
                        {item.title}
                      </h3>

                      {item.location && (
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-emerald-800" />
                          <span>{item.location}</span>
                        </p>
                      )}

                      {item.shortDescription && (
                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {item.shortDescription}
                        </p>
                      )}
                    </div>
                  </div>

                  {item.href && (
                    <div className="px-6 pb-6 pt-2">
                      <CMSLink
                        href={item.href}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#03452c] hover:underline"
                      >
                        <span>Project Details</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </CMSLink>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <DataInspector blockType="projects" data={block} />
      </Container>
    </section>
  );
}

function RenderValues(block: any) {
  return (
    <section className="py-16 sm:py-24 bg-[#faf9f5] border-b border-slate-200/60">
      <Container>
        <BlockHeader
          eyebrow={block.eyebrow}
          heading={block.heading}
          subheading={block.description}
          blockType="values"
        />

        {Array.isArray(block.items) && block.items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {block.items.map((item: any, idx: number) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3"
              >
                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-800 font-bold">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}

        <DataInspector blockType="values" data={block} />
      </Container>
    </section>
  );
}

function RenderContent(block: any) {
  const widthClasses: Record<string, string> = {
    standard: "max-w-4xl",
    narrow: "max-w-3xl",
    wide: "max-w-6xl",
    full: "max-w-full",
  };
  const bgClasses: Record<string, string> = {
    white: "bg-white",
    cream: "bg-[#faf9f5]",
    muted: "bg-slate-50",
    darkGreen: "bg-[#023420] text-white",
  };

  const containerWidth = widthClasses[block.containerWidth] || "max-w-4xl";
  const bgClass = bgClasses[block.backgroundColor] || "bg-white";

  return (
    <section className={`py-16 sm:py-24 border-b border-slate-200/60 ${bgClass}`}>
      <Container>
        <div className={`mx-auto ${containerWidth}`}>
          <div className="prose prose-slate max-w-none">
            {block.content?.root?.children?.map((child: any, idx: number) => (
              <LexicalRenderer key={idx} node={child} />
            ))}
          </div>
        </div>

        <DataInspector blockType="content" data={block} />
      </Container>
    </section>
  );
}

function RenderImpactStats(block: any) {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/60">
      <Container>
        <BlockHeader
          eyebrow={block.eyebrow}
          heading={block.heading}
          subheading={block.description}
          blockType="impactStats"
        />

        {Array.isArray(block.stats) && block.stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {block.stats.map((stat: any, idx: number) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#faf9f5] border border-slate-200 text-center space-y-1"
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-emerald-800">
                  {stat.value}
                </p>
                <p className="text-sm font-bold text-slate-900">{stat.label}</p>
                {stat.sublabel && (
                  <p className="text-xs text-slate-500">{stat.sublabel}</p>
                )}
              </div>
            ))}
          </div>
        )}

        <DataInspector blockType="impactStats" data={block} />
      </Container>
    </section>
  );
}

function RenderMissionVision(block: any) {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/60">
      <Container>
        <BlockHeader
          eyebrow={block.eyebrow}
          heading={block.heading}
          blockType="missionVision"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {block.mission && (
            <div className="p-8 rounded-3xl bg-[#faf9f5] border border-slate-200 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Our Mission
              </span>
              <h3 className="text-2xl font-bold text-slate-900">
                {block.mission.heading || "Mission"}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {block.mission.description}
              </p>
            </div>
          )}

          {block.vision && (
            <div className="p-8 rounded-3xl bg-[#023420] text-white border border-emerald-900 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Our Vision
              </span>
              <h3 className="text-2xl font-bold text-white">
                {block.vision.heading || "Vision"}
              </h3>
              <p className="text-sm text-emerald-100 leading-relaxed">
                {block.vision.description}
              </p>
            </div>
          )}
        </div>

        <DataInspector blockType="missionVision" data={block} />
      </Container>
    </section>
  );
}

function RenderDonateTiers(block: any) {
  return (
    <section className="py-16 sm:py-24 bg-[#faf9f5] border-b border-slate-200/60">
      <Container>
        <BlockHeader
          eyebrow={block.eyebrow}
          heading={block.heading}
          subheading={block.description}
          blockType="donateTiers"
        />

        {Array.isArray(block.tiers) && block.tiers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {block.tiers.map((tier: any, idx: number) => (
              <div
                key={idx}
                className={`rounded-3xl p-8 border flex flex-col justify-between ${
                  tier.popular
                    ? "bg-[#023420] text-white border-emerald-700 shadow-xl"
                    : "bg-white text-slate-900 border-slate-200 shadow-xs"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">{tier.title}</h3>
                    {tier.popular && (
                      <Badge className="bg-amber-400 text-slate-950 font-bold border-0 text-[10px]">
                        Most Impactful
                      </Badge>
                    )}
                  </div>
                  <p
                    className={`text-3xl font-extrabold ${
                      tier.popular ? "text-amber-400" : "text-emerald-800"
                    }`}
                  >
                    {tier.amount}
                  </p>
                  <p
                    className={`text-xs leading-relaxed ${
                      tier.popular ? "text-emerald-100" : "text-slate-600"
                    }`}
                  >
                    {tier.description}
                  </p>
                </div>

                <div className="pt-6">
                  <Button
                    asChild
                    className={`w-full rounded-full font-bold ${
                      tier.popular
                        ? "bg-amber-400 hover:bg-amber-300 text-slate-950"
                        : "bg-[#03452c] hover:bg-[#023420] text-white"
                    }`}
                  >
                    <Link href="/donate">Support This Tier</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <DataInspector blockType="donateTiers" data={block} />
      </Container>
    </section>
  );
}

function RenderMediaBlock(block: any) {
  const imgUrl = getMediaUrl(block.media);

  return (
    <section className="py-12 bg-white border-b border-slate-200/60">
      <Container>
        {imgUrl && (
          <div className="relative w-full aspect-16/9 rounded-3xl overflow-hidden bg-slate-100 shadow-lg mb-4">
            <Image
              src={imgUrl}
              alt={block.caption || "Media Block"}
              fill
              className="object-cover"
            />
          </div>
        )}
        {block.caption && (
          <p className="text-center text-xs text-slate-500 italic">
            {block.caption}
          </p>
        )}
        <DataInspector blockType="mediaBlock" data={block} />
      </Container>
    </section>
  );
}

function RenderGenericBlock(block: any) {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-200/60">
      <Container>
        <BlockHeader
          eyebrow={block.eyebrow}
          heading={block.heading || `Block: ${block.blockType}`}
          subheading={block.subheading || block.description}
          blockType={block.blockType}
        />
        <DataInspector blockType={block.blockType} data={block} />
      </Container>
    </section>
  );
}

// Fallback block dispatcher based on saved data
function DefaultBlockRenderer({ block }: { block: PageBlock }) {
  const { blockType } = block;

  switch (blockType) {
    case "hero":
      return <RenderHero {...block} />;
    case "focusAreas":
      return <RenderFocusAreas {...block} />;
    case "process":
      return <RenderProcess {...block} />;
    case "testimonials":
      return <RenderTestimonials {...block} />;
    case "faq":
      return <RenderFAQ {...block} />;
    case "news":
      return <RenderNews {...block} />;
    case "contact":
      return <RenderContact {...block} />;
    case "cta":
      return <RenderCTA {...block} />;
    case "projects":
      return <RenderProjects {...block} />;
    case "values":
      return <RenderValues {...block} />;
    case "content":
      return <RenderContent {...block} />;
    case "impactStats":
      return <RenderImpactStats {...block} />;
    case "missionVision":
      return <RenderMissionVision {...block} />;
    case "donateTiers":
      return <RenderDonateTiers {...block} />;
    case "mediaBlock":
      return <RenderMediaBlock {...block} />;
    default:
      return <RenderGenericBlock {...block} />;
  }
}

/**
 * RenderBlocks:
 * Iterates through page layout blocks.
 * If blockComponents[blockType] is configured, uses that component.
 * Otherwise, renders DefaultBlockRenderer based on the saved Payload data.
 */
export const RenderBlocks: React.FC<{
  blocks?: Page["layout"] | null;
}> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <Fragment>
      {blocks.map((block, index) => {
        if (!block || !block.blockType) return null;

        const { blockType } = block;
        const CustomBlockComponent = blockComponents[blockType];

        // 1. If component is linked, render it
        if (CustomBlockComponent) {
          return (
            <div
              className={`cms-block cms-block-${blockType}`}
              key={block.id || index}
            >
              <CustomBlockComponent {...block} />
            </div>
          );
        }

        // 2. Otherwise render default data-driven renderer based on saved data
        return (
          <div
            className={`cms-block cms-block-${blockType}`}
            key={block.id || index}
          >
            <DefaultBlockRenderer block={block} />
          </div>
        );
      })}
    </Fragment>
  );
};
