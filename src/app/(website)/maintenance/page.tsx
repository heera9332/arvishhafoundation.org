import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import {
  Wrench,
  Clock,
  HeartHandshake,
  Phone,
  Mail,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/lib/seo";
import { getSiteSettings } from "@/global/site-settings";
import { MaintenanceActions } from "@/components/common/MaintenanceActions";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

export const metadata: Metadata = {
  title: "Under Scheduled Maintenance | Arvishha Foundation",
  description:
    "Arvishha Foundation website is currently undergoing scheduled maintenance. We will be back online shortly.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function MaintenancePage({
  searchParams,
}: {
  searchParams?: Promise<{ preview?: string }>;
}) {
  const settings = await getSiteSettings();
  const params = searchParams ? await searchParams : undefined;
  const isPreview = params?.preview === "true";

  // If maintenance mode is disabled and not in preview mode, redirect to homepage
  if (!settings.maintenanceMode && !isPreview) {
    redirect("/");
  }

  const phoneDigits = settings.phone
    ? settings.phone.replace(/[^0-9]/g, "")
    : siteConfig.contact.phoneRaw;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#021b11] text-slate-100 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* Decorative background glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-800/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full border-b border-emerald-900/50 bg-[#01140c]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl bg-white/10 p-1.5 border border-white/20 backdrop-blur-xs flex items-center justify-center shadow-inner">
              <Image
                src={settings.logoUrl || "/images/logo.png"}
                alt={settings.siteName ? `${settings.siteName} Logo` : "Logo"}
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-white block">
                {settings.siteName || siteConfig.name}
              </span>
              <span className="text-[11px] text-amber-300 font-medium block">
                {settings.tagline || siteConfig.slogan}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/90 border border-emerald-500/30 text-emerald-300 text-xs shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
            <span className="font-semibold text-amber-200">Scheduled Maintenance</span>
          </div>
        </div>
      </header>

      {/* Main Content Hero */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Animated Icon Badge */}
          <ScrollReveal variant="zoom-in" duration={800}>
            <div className="inline-flex items-center justify-center">
              <div className="relative">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-[#03452c] to-emerald-700/80 p-0.5 shadow-2xl flex items-center justify-center">
                  <div className="w-full h-full bg-[#022216] rounded-[22px] flex items-center justify-center border border-emerald-500/30">
                    <Wrench className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 animate-bounce" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-2 rounded-xl shadow-lg border border-amber-300">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Heading and Notice */}
          <ScrollReveal variant="fade-up" duration={700} delay={150}>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 text-xs font-semibold tracking-wide uppercase">
                <Clock className="w-3.5 h-3.5" />
                <span>Platform Upgrades in Progress</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                We&apos;re Improving Your Community Experience
              </h1>
              <p className="text-base sm:text-lg text-emerald-100/80 max-w-xl mx-auto leading-relaxed">
                Our website is currently undergoing scheduled maintenance and system optimization. We will be back online shortly with enhanced performance and new tools.
              </p>
            </div>
          </ScrollReveal>

          {/* Information Cards */}
          <ScrollReveal variant="fade-up" duration={700} delay={250}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h2 className="text-sm font-semibold text-white">Grassroots Operations</h2>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Active programs in education, health, and welfare remain 100% operational.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
                  <Phone className="w-5 h-5" />
                </div>
                <h2 className="text-sm font-semibold text-white">Immediate Inquiries</h2>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Direct phone and email communication channels are open for urgent matters.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Quick Contact Bar */}
          <ScrollReveal variant="fade-up" duration={600} delay={350}>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#01140c]/90 border border-emerald-900/80 flex flex-wrap items-center justify-around gap-4 text-xs text-emerald-200 shadow-md">
              {settings.phone && (
                <a
                  href={`tel:${phoneDigits}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span className="font-medium">{settings.phone}</span>
                </a>
              )}
              {settings.contactEmail && (
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span className="font-medium">{settings.contactEmail}</span>
                </a>
              )}
            </div>
          </ScrollReveal>

          {/* Interactive Bypass & Preview Controls */}
          <MaintenanceActions />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-emerald-900/50 bg-[#01140c]/90 py-5 text-center text-xs text-emerald-400/80">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            {settings.footerCopyright ||
              `© ${new Date().getFullYear()} ${settings.siteName || siteConfig.name}. All rights reserved.`}
          </p>
          <div className="flex items-center gap-5 text-xs">
            {settings.socialLinks && settings.socialLinks.length > 0 ? (
              settings.socialLinks.map((s) => (
                <a
                  key={s.platform + s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors capitalize font-medium"
                >
                  {s.platform}
                </a>
              ))
            ) : (
              <>
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={siteConfig.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  YouTube
                </a>
                <a
                  href={siteConfig.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  X
                </a>
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
