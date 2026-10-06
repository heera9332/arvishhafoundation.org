"use client";

import React, { useState } from "react";
import Link from "next/link";
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
import { mainNavLinks } from "@/data/navigation";
import { siteConfig } from "@/lib/seo";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
            <div className="relative h-12 w-12 rounded-xl bg-white p-1 shadow-sm shrink-0">
              <Image
                src="/images/logo.png"
                alt="Arvishha Foundation Logo"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div>
              <SheetTitle className="text-white text-base font-bold">
                Arvishha Foundation
              </SheetTitle>
              <p className="text-xs text-emerald-200">
                {siteConfig.slogan}
              </p>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <nav className="flex flex-col space-y-1">
            {mainNavLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
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
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
            <Button
              asChild
              className="w-full bg-[#03452c] hover:bg-[#023320] text-white gap-2 justify-center"
            >
              <Link href="/donate" onClick={() => setOpen(false)}>
                <Heart className="h-4 w-4 fill-amber-400 text-amber-400" />
                Donate / Support Us
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-center"
            >
              <Link href="/get-involved" onClick={() => setOpen(false)}>
                Become a Volunteer
              </Link>
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-500 space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-emerald-800" />
              <span>{siteConfig.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-emerald-800" />
              <span>{siteConfig.contact.email}</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
