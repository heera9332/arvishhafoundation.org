"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { homeData } from "@/data/page-home";

export interface ContactSectionData {
  eyebrow?: string | null;
  heading?: string | null;
  subheading?: string | null;
  phoneOverride?: string | null;
  emailOverride?: string | null;
  info?: {
    name?: string | null;
    phone?: string | null;
    email?: string | null;
    emailAlt?: string | null;
    hours?: string | null;
  } | null;
}

export interface ContactSectionProps {
  data?: ContactSectionData | typeof homeData.contact | any;
}

export function ContactSection({ data }: ContactSectionProps) {
  const eyebrow = data?.eyebrow || homeData.contact.eyebrow || "GET IN TOUCH";
  const heading = data?.heading || homeData.contact.heading;
  const subheading = data?.subheading || homeData.contact.subheading;
  const infoPhone =
    data?.phoneOverride || data?.info?.phone || homeData.contact.info.phone;
  const infoEmail =
    data?.emailOverride || data?.info?.email || homeData.contact.info.email;
  const infoName = data?.info?.name || homeData.contact.info.name;
  const infoEmailAlt = data?.info?.emailAlt || homeData.contact.info.emailAlt;

  console.log("ContactSection data:", data);
  const emailTarget = infoEmailAlt || infoEmail;

  return (
    <section className="py-16 sm:py-24 lg:py-28 bg-[#faf9f5] border-t border-slate-200/60 relative">
      <Container size="wide" className="max-w-[1340px]">
        {/* Main White Card Container */}
        <div className="bg-white rounded-3xl sm:rounded-[36px] border border-slate-200/80 p-6 sm:p-10 lg:p-12 xl:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden">
          
          {/* Subtle Botanical Leaf Watermark in Top Right Corner */}
          <div className="absolute top-0 right-0 w-44 sm:w-60 lg:w-72 pointer-events-none select-none overflow-hidden z-0">
            <svg
              viewBox="0 0 280 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto text-emerald-950/[0.11]"
              aria-hidden="true"
            >
              <path
                d="M280 5 C 235 25, 175 75, 95 130 C 55 158, 25 182, 0 195"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M210 46 C 182 38, 155 35, 130 38"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M148 90 C 126 84, 102 88, 80 95"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Leaves */}
              <path
                d="M275 8 C 260 -6, 235 -6, 224 8 C 230 24, 255 26, 275 8 Z"
                fill="currentColor"
              />
              <path
                d="M255 22 C 232 12, 206 18, 200 34 C 215 48, 242 40, 255 22 Z"
                fill="currentColor"
              />
              <path
                d="M228 38 C 205 26, 175 28, 168 44 C 184 57, 214 52, 228 38 Z"
                fill="currentColor"
              />
              <path
                d="M192 42 C 170 30, 140 30, 132 45 C 147 57, 178 54, 192 42 Z"
                fill="currentColor"
              />
              <path
                d="M156 36 C 136 28, 110 32, 104 46 C 120 56, 146 50, 156 36 Z"
                fill="currentColor"
              />
              <path
                d="M182 70 C 160 55, 130 58, 122 74 C 140 86, 168 83, 182 70 Z"
                fill="currentColor"
              />
              <path
                d="M156 84 C 134 72, 105 76, 98 92 C 115 103, 142 97, 156 84 Z"
                fill="currentColor"
              />
              <path
                d="M130 102 C 106 92, 78 98, 70 114 C 88 126, 116 118, 130 102 Z"
                fill="currentColor"
              />
              <path
                d="M104 120 C 80 110, 52 118, 45 133 C 62 144, 90 134, 104 120 Z"
                fill="currentColor"
              />
              <path
                d="M70 140 C 48 132, 22 142, 16 157 C 32 166, 58 156, 70 140 Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-center relative z-10">
            {/* Left Column: Visual Card */}
            <div className="lg:col-span-5 w-full flex justify-center">
              <div className="relative w-full max-w-[480px] lg:max-w-none aspect-[642/757] rounded-3xl overflow-hidden shadow-xl shadow-emerald-950/10 border border-emerald-900/10 bg-[#063a28]">
                <Image
                  src="/images/contact-visual-card.png"
                  alt="Arvishha Foundation Center — Stronger Communities Brighter Tomorrows"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 480px"
                  className="object-cover select-none"
                  priority
                />
 

                {/* Accessible semantic details for screen readers & crawlers */}
                <div className="sr-only">
                  <p>Stronger Communities Brighter Tomorrows</p>
                  <p>Contact Person: {infoName}</p>
                  <p>Mobile Number: {infoPhone}</p>
                  <p>Email Address: {emailTarget}</p>
                  <p>People • Community • Positive Change</p>
                </div>
              </div>
            </div>

            {/* Right Column: Heading & Contact Form */}
            <div className="lg:col-span-7">
              {/* Eyebrow with Amber Dot */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                <span className="text-xs sm:text-sm font-bold tracking-[0.18em] text-[#083827] uppercase">
                  {eyebrow}
                </span>
              </div>

              {/* Serif Heading */}
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-bold text-slate-900 tracking-tight leading-[1.15]">
                {heading}
              </h2>

              {/* Subheading */}
              <p className="mt-3.5 mb-8 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                {subheading}
              </p>

              {/* Contact Form */}
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
