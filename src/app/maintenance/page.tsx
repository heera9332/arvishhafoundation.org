import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Wrench,
  Clock,
  HeartHandshake,
  Phone,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { siteConfig } from "@/lib/seo";
import { MaintenanceActions } from "@/components/common/MaintenanceActions";

export const metadata: Metadata = {
  title: "Under Scheduled Maintenance | Arvishha Foundation",
  description:
    "Arvishha Foundation website is currently undergoing scheduled maintenance. We will be back online shortly.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenancePage() {
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
                src="/images/logo.png"
                alt="Arvishha Foundation Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-white block">
                {siteConfig.name}
              </span>
              <span className="text-[11px] text-amber-300 font-medium block">
                विकास और सामाजिक कार्यों के लिए अग्रसर
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

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full mx-auto text-center space-y-8">
          {/* Badge & Icon */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-emerald-600/30 to-amber-500/20 border border-emerald-500/40 flex items-center justify-center shadow-2xl backdrop-blur-md">
                <Wrench className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 animate-bounce" />
              </div>
              <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-200 text-xs">
              <span>Platform Upgrades In Progress</span>
            </div>
          </div>

          {/* Heading & Copy */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              We&apos;re Enhancing Our Portal For{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-emerald-300">
                Greater Social Impact
              </span>
            </h1>
            <p className="text-base sm:text-lg text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
              Arvishha Foundation is currently undergoing planned technical maintenance to improve security, performance, and stakeholder resources. All community and on-ground field initiatives continue without disruption.
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-emerald-500/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-semibold text-white">System Status</h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Database optimization and security hardening underway. Resuming shortly.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-emerald-500/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-semibold text-white">Field Operations</h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Active programs in education, health, and welfare remain 100% operational.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-emerald-500/40 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-semibold text-white">Immediate Inquiries</h2>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Direct phone and email communication channels are open for urgent matters.
              </p>
            </div>
          </div>

          {/* Quick Contact Bar */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#01140c]/90 border border-emerald-900/80 flex flex-wrap items-center justify-around gap-4 text-xs text-emerald-200">
            <a
              href={`tel:${siteConfig.contact.phoneRaw}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span className="font-medium">{siteConfig.contact.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span className="font-medium">{siteConfig.contact.email}</span>
            </a>
            <div className="flex items-center gap-2 text-emerald-300/80">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{siteConfig.contact.address.city}, {siteConfig.contact.address.region}</span>
            </div>
          </div>

          {/* Interactive Bypass & Preview Controls */}
          <MaintenanceActions />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full border-t border-emerald-900/50 bg-[#01140c]/90 py-5 text-center text-xs text-emerald-400/80">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-5 text-xs">
            <a
              href={siteConfig.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Facebook
            </a>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
