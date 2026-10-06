import React from "react";
import Link from "next/link";
import { Heart, UserPlus, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import type { homeData } from "@/data/page-home";

interface CTASectionProps {
  data: typeof homeData.cta;
}

export function CTASection({ data }: CTASectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <Container>
        <div className="relative rounded-3xl bg-gradient-to-br from-[#023420] via-[#03452c] to-[#012215] text-white p-8 sm:p-14 lg:p-20 shadow-2xl overflow-hidden border border-emerald-800">
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full border border-amber-400/20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full border border-emerald-400/20 pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-700/60 text-amber-300 text-xs font-semibold tracking-wider uppercase">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Join Hands With Arvishha
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {data.heading}
            </h2>

            <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed max-w-2xl mx-auto">
              {data.subheading}
            </p>

            <div className="pt-4 flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-8 py-3.5 h-auto text-base rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <Link href={data.primaryCta.href} className="inline-flex items-center gap-2">
                  <Heart className="h-5 w-5 fill-slate-950 text-slate-950" />
                  <span>{data.primaryCta.label}</span>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-xs px-7 py-3.5 h-auto text-base rounded-full transition-all"
              >
                <Link href={data.secondaryCta.href} className="inline-flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-amber-300" />
                  <span>{data.secondaryCta.label}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
