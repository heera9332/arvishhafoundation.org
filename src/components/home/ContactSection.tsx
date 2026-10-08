"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { ContactForm } from "@/components/forms/ContactForm";
import type { homeData } from "@/data/page-home";

interface ContactSectionProps {
  data: typeof homeData.contact;
}

export function ContactSection({ data }: ContactSectionProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="py-20 sm:py-28 bg-[#faf9f5] border-t border-slate-200/60">
      <Container>
        {/* Container Card as in reference design */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 lg:p-14 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Visual Card with floating green info badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-4/5 rounded-3xl overflow-hidden bg-slate-100 shadow-md">
                {!imgError ? (
                  <Image
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80"
                    alt="Arvishha Foundation Office and Community Hub"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[#03452c] flex items-center justify-center text-white p-6 text-center">
                    <p className="font-bold text-lg">Arvishha Foundation Center</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Floating Contact Badges (matches reference screenshot page-5) */}
                <div className="absolute top-6 left-6 right-6 space-y-2.5">
                  {data.info.name && (
                    <div className="bg-[#023420]/95 backdrop-blur-md text-white p-3.5 rounded-2xl border border-emerald-700/60 shadow-lg">
                      <p className="text-[11px] text-amber-300 font-semibold uppercase tracking-wider">
                        Contact Person
                      </p>
                      <p className="text-sm sm:text-base font-bold text-white mt-0.5">
                        {data.info.name}
                      </p>
                    </div>
                  )}

                  <div className="bg-[#023420]/95 backdrop-blur-md text-white p-3.5 rounded-2xl border border-emerald-700/60 shadow-lg">
                    <p className="text-[11px] text-amber-300 font-semibold uppercase tracking-wider">
                      Mobile Number
                    </p>
                    <a
                      href={`tel:${data.info.phone.replace(/[^0-9]/g, "")}`}
                      className="text-sm sm:text-base font-bold text-white hover:text-amber-300 transition-colors block mt-0.5"
                    >
                      {data.info.phone}
                    </a>
                  </div>

                  <div className="bg-[#023420]/95 backdrop-blur-md text-white p-3.5 rounded-2xl border border-emerald-700/60 shadow-lg">
                    <p className="text-[11px] text-amber-300 font-semibold uppercase tracking-wider">
                      Email Address
                    </p>
                    <a
                      href={`mailto:${data.info.emailAlt || data.info.email}`}
                      className="text-sm sm:text-base font-bold text-white hover:text-amber-300 transition-colors block mt-0.5 break-all"
                    >
                      {data.info.emailAlt || data.info.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Heading & Contact Form */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <SectionLabel>{data.eyebrow}</SectionLabel>
                <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {data.heading}
                </h2>
                <p className="mt-3 text-base text-slate-600 leading-relaxed">
                  {data.subheading}
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
