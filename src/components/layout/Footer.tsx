import React from "react";
import Image from "next/image";
import { Phone, Mail, Heart, ArrowUpRight } from "lucide-react";
import { Container } from "./Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { CMSLink } from "@/components/common/CMSLink";
import type { FooterData } from "@/global/footer/types";
import { defaultFooterData } from "@/global/footer/defaults";

export interface FooterProps {
  data?: FooterData;
}

export function Footer({ data = defaultFooterData }: FooterProps) {
  const {
    branding = defaultFooterData.branding,
    newsletter = defaultFooterData.newsletter,
    navigation = defaultFooterData.navigation,
    contact = defaultFooterData.contact,
    legal = defaultFooterData.legal,
  } = data || {};

  const phoneDigits = contact.phone ? contact.phone.replace(/[^0-9]/g, "") : "";

  return (
    <footer className="bg-[#012215] text-slate-300 border-t border-emerald-950 pt-16 sm:pt-20 pb-12">
      <Container>
        {/* Top Newsletter & Mission Statement Block */}
        {newsletter.enabled !== false && (
          <div className="pb-12 border-b border-emerald-900/60 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              {newsletter.badge && (
                <span className="inline-block text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
                  {newsletter.badge}
                </span>
              )}
              {newsletter.heading && (
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {newsletter.heading}
                </h3>
              )}
              {newsletter.description && (
                <p className="mt-2 text-sm text-emerald-200/80 max-w-lg leading-relaxed">
                  {newsletter.description}
                </p>
              )}
            </div>
            <div className="lg:col-span-6">
              <NewsletterForm form={newsletter.form} />
            </div>
          </div>
        )}

        {/* Middle Columns: Brand, Links, Contact */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-xl bg-white p-1 shadow-md shrink-0 overflow-hidden">
                <Image
                  src={branding.logoUrl || "/images/logo.png"}
                  alt={branding.logoAlt || "Arvishha Foundation Logo"}
                  fill
                  unoptimized={Boolean(branding.logoUrl?.includes("?"))}
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg leading-none">
                  {branding.siteTitle || "Arvishha Foundation"}
                </h4>
                {branding.slogan && (
                  <p className="text-xs text-amber-400 mt-1">
                    {branding.slogan}
                  </p>
                )}
              </div>
            </div>
            {branding.description && (
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                {branding.description}
              </p>
            )}
            {branding.cta?.enabled !== false && (
              <div className="pt-2 flex items-center gap-3">
                <CMSLink
                  href={branding.cta.href || "/donate"}
                  newTab={branding.cta.newTab}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors"
                >
                  <Heart className="h-3.5 w-3.5 fill-slate-950" />
                  <span>{branding.cta.label || "Support Our Cause"}</span>
                </CMSLink>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-sm font-semibold text-white tracking-wider uppercase">
              {navigation.quickLinksTitle || "Quick Links"}
            </h5>
            <ul className="space-y-2.5 text-sm">
              {navigation.quickLinks.map((link) => {
                if (link.enabled === false) return null;
                return (
                  <li key={link.href + link.label}>
                    <CMSLink
                      href={link.href}
                      newTab={link.newTab}
                      className="hover:text-amber-300 transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                    </CMSLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Support / Get Involved */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-sm font-semibold text-white tracking-wider uppercase">
              {navigation.supportLinksTitle || "Get Involved"}
            </h5>
            <ul className="space-y-2.5 text-sm">
              {navigation.supportLinks.map((link) => {
                if (link.enabled === false) return null;
                return (
                  <li key={link.href + link.label}>
                    <CMSLink
                      href={link.href}
                      newTab={link.newTab}
                      className="hover:text-amber-300 transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                    </CMSLink>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick Info / Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-sm font-semibold text-white tracking-wider uppercase">
              {contact.title || "Direct Contact"}
            </h5>
            <ul className="space-y-3 text-sm text-slate-300">
              {contact.phone && (
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                  <a
                    href={`tel:${phoneDigits}`}
                    className="hover:text-white transition-colors font-medium"
                  >
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-white transition-colors break-all"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Visual Brand Banner */}
        {contact.showBanner !== false && (
          <div className="rounded-2xl bg-gradient-to-r from-[#03452c] to-[#023420] p-6 sm:p-8 border border-emerald-800/80 my-8 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 rounded-2xl bg-white p-1.5 shadow-md shrink-0">
                  <Image
                    src={branding.logoUrl || "/images/logo.png"}
                    alt={branding.siteTitle || "Arvishha Foundation"}
                    fill
                    unoptimized={Boolean(branding.logoUrl?.includes("?"))}
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg sm:text-xl leading-tight">
                    {branding.siteTitle || "Arvishha Foundation"}
                  </h4>
                  {branding.slogan && (
                    <p className="text-xs text-amber-300 font-medium">
                      {branding.slogan}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-8 text-center md:text-left">
                {contact.phone && (
                  <div>
                    <p className="text-xs text-emerald-300 uppercase font-semibold">
                      {contact.bannerHelpLabel || "Need Any Help?"}
                    </p>
                    <a
                      href={`tel:${phoneDigits}`}
                      className="text-base sm:text-lg font-bold text-white hover:text-amber-300 transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                )}
                {contact.phone && contact.email && (
                  <div className="h-8 w-px bg-emerald-700/60 hidden sm:block" />
                )}
                {contact.email && (
                  <div>
                    <p className="text-xs text-emerald-300 uppercase font-semibold">
                      {contact.bannerEmailLabel || "E-Mail Now"}
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-base sm:text-lg font-bold text-white hover:text-amber-300 transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{legal.copyrightText || "© 2026 Arvishha Foundation. All Rights Reserved."}</p>

          <div className="flex items-center gap-6">
            {legal.legalLinks.map((item) => {
              if (item.enabled === false) return null;
              return (
                <CMSLink
                  key={item.href + item.label}
                  href={item.href}
                  newTab={item.newTab}
                  className="hover:text-slate-200 transition-colors"
                >
                  {item.label}
                </CMSLink>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {legal.socialLinks.map((s) => {
              if (s.enabled === false) return null;
              return (
                <a
                  key={s.platform + s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors font-medium capitalize"
                >
                  {s.label}
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
