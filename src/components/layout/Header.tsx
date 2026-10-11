"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Heart, Phone, Mail, ChevronDown } from "lucide-react";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { CMSLink } from "@/components/common/CMSLink";
import type { HeaderData } from "@/global/header/types";
import { defaultHeaderData } from "@/global/header/defaults";
import { cn } from "@/lib/utils";

export interface HeaderProps {
  data?: HeaderData;
}

export function Header({ data = defaultHeaderData }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const {
    branding = defaultHeaderData.branding,
    navigation = defaultHeaderData.navigation,
    actions = defaultHeaderData.actions,
    settings = defaultHeaderData.settings,
  } = data || {};

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const phoneDigits = settings.phone ? settings.phone.replace(/[^0-9]/g, "") : "";

  return (
    <header
      className={cn(
        "top-0 left-0 right-0 z-40 transition-all duration-300",
        settings.isSticky !== false ? "fixed" : "relative"
      )}
    >
      {/* Top Announcement / Info Bar */}
      {settings.showTopBar !== false && (
        <div
          className={cn(
            "bg-[#012215] text-emerald-100 text-xs border-b border-emerald-900/40 transition-all duration-300 overflow-hidden hidden md:block",
            isScrolled ? "h-0 border-none opacity-0 py-0" : "h-auto py-1.5 opacity-100"
          )}
        >
          <Container className="flex items-center justify-between py-2">
            <div className="flex items-center gap-6">
              <span className="hidden md:inline-block text-emerald-300/80">
                {settings.topBarText || "Non-Profit Organization"}
              </span>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 text-xs ml-auto">
              {settings.phone && (
                <a
                  href={`tel:${phoneDigits}`}
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Phone className="h-3 w-3 text-amber-400" />
                  <span>{settings.phone}</span>
                </a>
              )}
              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Mail className="h-3 w-3 text-amber-400" />
                  <span>{settings.email}</span>
                </a>
              )}
            </div>
          </Container>
        </div>
      )}

      {/* Main Navigation Bar */}
      <div
        className={cn(
          "bg-[#023420] transition-all duration-300 border-b border-emerald-900/50",
          isScrolled
            ? "bg-[#023420]/95 backdrop-blur-md shadow-lg py-2.5 border-none"
            : "py-0 sm:py-3.5"
        )}
      >
        <Container className="flex items-center justify-between py-2 md:py-0">
          {/* Brand Logo */}
          <CMSLink
            href={branding.logoLink || "/"}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-xl p-1"
          >
            <div className="relative h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-white p-1 shadow-md transition-transform group-hover:scale-105 shrink-0 overflow-hidden">
              <Image
                src={branding.logoUrl || "/images/logo.png"}
                alt={branding.logoAlt || "Arvishha Foundation Logo"}
                fill
                priority
                unoptimized={Boolean(branding.logoUrl?.includes("?"))}
                className="object-contain p-0.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-base sm:text-lg leading-tight tracking-tight">
                {branding.siteTitle || "Arvishha Foundation"}
              </span>
              {branding.slogan && (
                <span className="text-amber-400 text-[11px] sm:text-xs font-medium tracking-wide">
                  {branding.slogan}
                </span>
              )}
            </div>
          </CMSLink>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center space-x-1 xl:space-x-2"
          >
            {navigation.items.map((link) => {
              if (link.enabled === false) return null;

              const hasChildren = Boolean(
                link.children &&
                  link.children.filter((child) => child.enabled !== false).length > 0
              );

              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              if (hasChildren) {
                const isOpen = openDropdown === link.label;
                return (
                  <div
                    key={link.href + link.label}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenDropdown(isOpen ? null : link.label)}
                      aria-expanded={isOpen}
                      className={cn(
                        "relative flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-full transition-all duration-200",
                        isActive
                          ? "text-white bg-emerald-900/60 font-semibold"
                          : "text-emerald-100 hover:text-white hover:bg-emerald-900/30"
                      )}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          isOpen && "rotate-180"
                        )}
                      />
                      {isActive && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-amber-400 rounded-full" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="absolute top-full left-0 mt-1 min-w-[210px] bg-[#023420]/95 backdrop-blur-md rounded-2xl p-2 shadow-xl border border-emerald-900/50 z-50">
                        {link.children
                          ?.filter((child) => child.enabled !== false)
                          .map((child) => (
                            <CMSLink
                              key={child.href + child.label}
                              href={child.href}
                              newTab={child.newTab}
                              onClick={() => setOpenDropdown(null)}
                              className="block px-3 py-2 rounded-xl text-xs font-medium text-emerald-100 hover:text-white hover:bg-emerald-900/60 transition-colors"
                            >
                              <div>{child.label}</div>
                              {child.description && (
                                <p className="text-[11px] text-emerald-300/70 mt-0.5 font-normal">
                                  {child.description}
                                </p>
                              )}
                            </CMSLink>
                          ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <CMSLink
                  key={link.href + link.label}
                  href={link.href}
                  newTab={link.newTab}
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
                </CMSLink>
              );
            })}
          </nav>

          {/* Actions & Mobile Menu */}
          <div className="flex items-center gap-3">
            {actions.primaryCta?.enabled !== false && (
              <CMSLink
                href={actions.primaryCta.href || "/donate"}
                newTab={actions.primaryCta.newTab}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {actions.primaryCta.showIcon !== false && (
                  <Heart className="h-4 w-4 fill-slate-950 text-slate-950" />
                )}
                <span>{actions.primaryCta.label || "Donate"}</span>
              </CMSLink>
            )}

            <MobileNav data={data} />
          </div>
        </Container>
      </div>
    </header>
  );
}
