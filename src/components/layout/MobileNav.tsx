"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Heart, Phone, Mail } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CMSLink } from "@/components/common/CMSLink";
import type { HeaderData } from "@/global/header/types";
import { defaultHeaderData } from "@/global/header/defaults";

export interface MobileNavProps {
  data?: HeaderData;
}

export function MobileNav({ data = defaultHeaderData }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const {
    branding = defaultHeaderData.branding,
    navigation = defaultHeaderData.navigation,
    actions = defaultHeaderData.actions,
    settings = defaultHeaderData.settings,
  } = data || {};

  const logoSrc =
    branding.mobileLogoUrl || branding.logoUrl || "/images/logo.png";
  const phoneDigits = settings.phone ? settings.phone.replace(/[^0-9]/g, "") : "";

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open navigation menu"
          className="p-2 text-white hover:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-lg lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[320px] sm:w-[380px] p-0 bg-white">
        <SheetHeader className="p-6 border-b border-slate-100 bg-[#023420] text-white">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-xl bg-white p-1 shadow-sm shrink-0 overflow-hidden">
              <Image
                src={logoSrc}
                alt={branding.logoAlt || "Arvishha Foundation Logo"}
                fill
                unoptimized={Boolean(logoSrc?.includes("?"))}
                className="object-contain p-0.5"
              />
            </div>
            <div>
              <SheetTitle className="text-white text-base font-bold">
                {branding.siteTitle || "Arvishha Foundation"}
              </SheetTitle>
              {branding.slogan && (
                <p className="text-xs text-emerald-200">{branding.slogan}</p>
              )}
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <nav className="flex flex-col space-y-1">
            {navigation.items.map((link) => {
              if (link.enabled === false) return null;

              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              const hasChildren = Boolean(
                link.children &&
                  link.children.filter((child) => child.enabled !== false).length > 0
              );

              if (hasChildren) {
                return (
                  <div key={link.href + link.label} className="space-y-1">
                    <CMSLink
                      href={link.href}
                      newTab={link.newTab}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-emerald-50 text-[#03452c] font-semibold"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="h-2 w-2 rounded-full bg-[#03452c]" />
                      )}
                    </CMSLink>
                    <div className="pl-4 pr-1 py-1 space-y-1 bg-slate-50/70 rounded-xl">
                      {link.children
                        ?.filter((child) => child.enabled !== false)
                        .map((child) => (
                          <CMSLink
                            key={child.href + child.label}
                            href={child.href}
                            newTab={child.newTab}
                            onClick={() => setOpen(false)}
                            className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-[#03452c] hover:bg-emerald-50/50"
                          >
                            {child.label}
                          </CMSLink>
                        ))}
                    </div>
                  </div>
                );
              }

              return (
                <CMSLink
                  key={link.href + link.label}
                  href={link.href}
                  newTab={link.newTab}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-emerald-50 text-[#03452c] font-semibold"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="h-2 w-2 rounded-full bg-[#03452c]" />
                  )}
                </CMSLink>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
            {actions.primaryCta?.enabled !== false && (
              <Button
                asChild
                className="w-full bg-[#03452c] hover:bg-[#023320] text-white gap-2 justify-center"
              >
                <CMSLink
                  href={actions.primaryCta.href || "/donate"}
                  newTab={actions.primaryCta.newTab}
                  onClick={() => setOpen(false)}
                >
                  {actions.primaryCta.showIcon !== false && (
                    <Heart className="h-4 w-4 fill-amber-400 text-amber-400" />
                  )}
                  <span>{actions.primaryCta.label || "Donate / Support Us"}</span>
                </CMSLink>
              </Button>
            )}

            {actions.secondaryCta?.enabled !== false && (
              <Button asChild variant="outline" className="w-full justify-center">
                <CMSLink
                  href={actions.secondaryCta.href || "/get-involved"}
                  newTab={actions.secondaryCta.newTab}
                  onClick={() => setOpen(false)}
                >
                  <span>
                    {actions.secondaryCta.label || "Become a Volunteer"}
                  </span>
                </CMSLink>
              </Button>
            )}
          </div>

          {/* Contact Details */}
          {(settings.phone || settings.email) && (
            <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500 space-y-2">
              {settings.phone && (
                <a
                  href={`tel:${phoneDigits}`}
                  className="flex items-center gap-2 hover:text-[#03452c] transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald-800 shrink-0" />
                  <span>{settings.phone}</span>
                </a>
              )}
              {settings.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-2 hover:text-[#03452c] transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-emerald-800 shrink-0" />
                  <span>{settings.email}</span>
                </a>
              )}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
