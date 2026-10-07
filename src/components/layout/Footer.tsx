import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Heart, ArrowUpRight } from "lucide-react";
import { Container } from "./Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import {
  footerQuickLinks,
  footerSupportLinks,
  footerLegalLinks,
  socialLinks,
} from "@/data/navigation";
import { siteConfig } from "@/lib/seo";

export function Footer() {
  return (
    <footer className="bg-[#012215] text-slate-300 border-t border-emerald-950 pt-16 sm:pt-20 pb-12">
      <Container>
        {/* Top Newsletter & Mission Statement Block */}
        <div className="pb-12 border-b border-emerald-900/60 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <span className="inline-block text-xs font-semibold text-amber-400 uppercase tracking-widest mb-2">
              Stay Connected With Our Work
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Be The First To Know — Subscribe Today
            </h3>
            <p className="mt-2 text-sm text-emerald-200/80 max-w-lg leading-relaxed">
              Get quarterly grassroots field updates, volunteer impact stories, and community achievements delivered directly to your inbox.
            </p>
          </div>
          <div className="lg:col-span-6">
            <NewsletterForm />
          </div>
        </div>

        {/* Middle Columns: Brand, Links, Contact */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded-xl bg-white p-1 shadow-md shrink-0 overflow-hidden">
                <Image
                  src="/images/logo.png"
                  alt="Arvishha Foundation Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg leading-none">
                  Arvishha Foundation
                </h4>
                <p className="text-xs text-amber-400 mt-1">
                  {siteConfig.slogan}
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              A dedicated non-governmental organization advancing child education, women empowerment, health awareness, and community dignity through grassroots action.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-amber-400 text-slate-950 hover:bg-amber-300 transition-colors"
              >
                <Heart className="h-3.5 w-3.5 fill-slate-950" />
                <span>Support Our Cause</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-sm font-semibold text-white tracking-wider uppercase">
              Quick Links
            </h5>
            <ul className="space-y-2.5 text-sm">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-amber-300 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support / Get Involved */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-sm font-semibold text-white tracking-wider uppercase">
              Get Involved
            </h5>
            <ul className="space-y-2.5 text-sm">
              {footerSupportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-amber-300 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

              {/* Quick Info / Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-sm font-semibold text-white tracking-wider uppercase">
              Direct Contact
            </h5>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="text-xs text-amber-300 font-medium">
                Representative: <strong className="text-white font-bold">{siteConfig.contactPerson.name}</strong>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {siteConfig.contact.address.street}, {siteConfig.contact.address.city}, {siteConfig.contact.address.region}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`}
                  className="hover:text-white transition-colors font-medium"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Visual Brand Banner (as shown in reference screenshot) */}
        <div className="rounded-2xl bg-gradient-to-r from-[#03452c] to-[#023420] p-6 sm:p-8 border border-emerald-800/80 my-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 rounded-2xl bg-white p-1.5 shadow-md shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Arvishha Foundation"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg sm:text-xl leading-tight">
                  Arvishha Foundation
                </h4>
                <p className="text-xs text-amber-300 font-medium">
                  विकास और सामाजिक कार्यों के लिए अग्रसर
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 text-center md:text-left">
              <div>
                <p className="text-xs text-emerald-300 uppercase font-semibold">
                  Need Any Help?
                </p>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`}
                  className="text-base sm:text-lg font-bold text-white hover:text-amber-300 transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="h-8 w-px bg-emerald-700/60 hidden sm:block" />
              <div>
                <p className="text-xs text-emerald-300 uppercase font-semibold">
                  E-Mail Now
                </p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-base sm:text-lg font-bold text-white hover:text-amber-300 transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 border-t border-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Arvishha Foundation. All Rights Reserved.</p>

          <div className="flex items-center gap-6">
            {footerLegalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-slate-200 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400 transition-colors font-medium capitalize"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
