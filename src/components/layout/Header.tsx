"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Heart, Phone, Mail } from "lucide-react";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { mainNavLinks } from "@/data/navigation";
import { siteConfig } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Announcement / Info Bar */}
      <div
        className={cn(
          "bg-[#012215] text-emerald-100 text-xs border-b border-emerald-900/40 transition-all duration-300 overflow-hidden",
          isScrolled ? "h-0 border-none opacity-0 py-0" : "h-auto py-1.5 opacity-100"
        )}
      >
        <Container className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="hidden sm:inline-block font-medium text-amber-300">
              विकास और सामाजिक कार्यों के लिए अग्रसर
            </span>
            <span className="hidden md:inline-block text-emerald-300/80">
              Non-Profit Organization
            </span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-xs ml-auto">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^0-9]/g, "")}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="h-3 w-3 text-amber-400" />
              <span>{siteConfig.contact.phone}</span>
            </a>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="h-3 w-3 text-amber-400" />
              <span>{siteConfig.contact.email}</span>
            </a>
          </div>
        </Container>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={cn(
          "bg-[#023420] transition-all duration-300 border-b border-emerald-900/50",
          isScrolled
            ? "bg-[#023420]/95 backdrop-blur-md shadow-lg py-2.5 border-none"
            : "py-0 sm:py-3.5"
        )}
      >
        <Container className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-xl p-1"
          >
            <div className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-white p-1 shadow-md transition-transform group-hover:scale-105 shrink-0 overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="Arvishha Foundation Logo"
                fill
                priority
                className="object-contain p-0.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-base sm:text-lg leading-tight tracking-tight">
                Arvishha Foundation
              </span>
              <span className="text-amber-400 text-[11px] sm:text-xs font-medium tracking-wide">
                Development • Dignity • Social Change
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center space-x-1 xl:space-x-2"
          >
            {mainNavLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200",
                    isActive
                      ? "text-white bg-emerald-900/60 font-semibold"
                      : "text-emerald-100 hover:text-white hover:bg-emerald-900/30"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Mobile Menu */}
          <div className="flex items-center gap-3">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Heart className="h-4 w-4 fill-slate-950 text-slate-950" />
              <span>Donate</span>
            </Link>

            <MobileNav />
          </div>
        </Container>
      </div>
    </header>
  );
}
