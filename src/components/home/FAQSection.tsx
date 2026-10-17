import React from "react";
import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { homeData } from "@/data/page-home";
import type { FAQBlock } from "@/payload-types";

import { ScrollReveal } from "@/components/animation/ScrollReveal";
import { FloatingElement } from "@/components/animation/FloatingElement";

export interface FAQSectionProps {
  data?: FAQBlock | typeof homeData.faq;
}

export function FAQSection({ data }: FAQSectionProps) {
  const d = data as any;
  const eyebrow = d?.eyebrow || homeData.faq.eyebrow;
  const heading = d?.heading || homeData.faq.heading;
  const subheading = d?.subheading || homeData.faq.subheading;
  const contactHref = d?.contactLink?.url || "/contact";
  const contactLabel = d?.contactLink?.label || "Have More Questions?";
  const items =
    d?.items && d.items.length > 0 ? d.items : homeData.faq.items;
  const firstItemId = items[0]?.id || "faq-0";

  return (
    <section className="py-20 sm:py-28 bg-[#faf9f5]">
      <Container>
        <ScrollReveal variant="fade-up" duration={650}>
          <div className="flex flex-col lg:flex-row items-start justify-between mb-12 gap-8">
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
              className="bg-[#03452c] hover:bg-[#023320] text-white rounded-full px-6 py-2.5 h-auto shrink-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Link href={contactHref} className="inline-flex items-center gap-2">
                <span>{contactLabel}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Shadcn Accordion */}
          <ScrollReveal variant="fade-up" duration={700} delay={100} className="lg:col-span-8">
            <Accordion type="single" collapsible defaultValue={firstItemId} className="space-y-4">
              {items.map((item: any, idx: number) => {
                const itemId = item.id || `faq-${idx}`;
                return (
                  <AccordionItem
                    key={itemId}
                    value={itemId}
                    className="border border-slate-200/80 rounded-2xl bg-white px-6 py-1 transition-all duration-300 hover:border-emerald-600/40 hover:shadow-md data-[state=open]:shadow-md data-[state=open]:border-emerald-600/50"
                  >
                    <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-[#03452c] transition-colors py-4">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 text-sm sm:text-base leading-relaxed pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </ScrollReveal>

          {/* Right Column: Visual Help Card */}
          <ScrollReveal variant="fade-left" duration={700} delay={200} className="lg:col-span-4">
            <FloatingElement animation="slow">
              <div className="rounded-3xl bg-amber-400 p-8 text-slate-950 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 border border-amber-300">
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-[#03452c] text-amber-400 flex items-center justify-center mb-5 shadow-sm transition-transform duration-300 hover:scale-110">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold leading-tight mb-3">
                    Don&apos;t Worry — We&apos;ve Got Answers!
                  </h3>
                  <p className="text-sm text-slate-800 leading-relaxed">
                    We are here to help. If you didn&apos;t find the answer you were looking for, reach out to our team directly. We are happy to clarify any details.
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    asChild
                    className="bg-[#03452c] hover:bg-[#023320] text-white w-full rounded-full py-3 h-auto font-semibold justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Link href="/contact" className="inline-flex items-center gap-2">
                      <span>Ask a Question</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </FloatingElement>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
