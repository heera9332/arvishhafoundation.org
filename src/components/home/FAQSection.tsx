"use client";

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

export interface FAQSectionData {
  eyebrow?: string | null;
  heading?: string | null;
  subheading?: string | null;
  contactLink?: { label?: string | null; url?: string | null } | null;
  items?: Array<any> | null;
}

export interface FAQSectionProps {
  data?: FAQSectionData | typeof homeData.faq | any;
}

export function FAQSection({ data }: FAQSectionProps) {
  const eyebrow = data?.eyebrow || homeData.faq.eyebrow;
  const heading = data?.heading || homeData.faq.heading;
  const subheading = data?.subheading || homeData.faq.subheading;
  const contactHref = data?.contactLink?.url || "/contact";
  const contactLabel = data?.contactLink?.label || "Have More Questions?";
  const items =
    data?.items && data.items.length > 0 ? data.items : homeData.faq.items;
  const firstItemId = items[0]?.id || "faq-0";

  return (
    <section className="py-20 sm:py-28 bg-[#faf9f5]">
      <Container>
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
            className="bg-[#03452c] hover:bg-[#023320] text-white rounded-full px-6 py-2.5 h-auto shrink-0"
          >
            <Link href={contactHref} className="inline-flex items-center gap-2">
              <span>{contactLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Shadcn Accordion */}
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible defaultValue={firstItemId} className="space-y-4">
              {items.map((item: any, idx: number) => {
                const itemId = item.id || `faq-${idx}`;
                return (
                  <AccordionItem key={itemId} value={itemId}>
                    <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-[#03452c]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>

          {/* Right Column: Visual Help Card (matches reference design layout) */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl bg-amber-400 p-8 text-slate-950 shadow-md flex flex-col justify-between space-y-6">
              <div>
                <div className="h-12 w-12 rounded-2xl bg-[#03452c] text-amber-400 flex items-center justify-center mb-5 shadow-sm">
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
                  className="bg-[#03452c] hover:bg-[#023320] text-white w-full rounded-full py-3 h-auto font-semibold justify-center shadow-md"
                >
                  <Link href="/contact" className="inline-flex items-center gap-2">
                    <span>Ask a Question</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
