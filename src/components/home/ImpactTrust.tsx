import React from "react";
import {
  Users,
  HandHeart,
  BookOpen,
  Target,
  Sparkles,
  Sprout,
  Heart,
  ShieldCheck,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { homeData } from "@/data/page-home";
import type { ImpactStatsBlock } from "@/payload-types";

import { StaggerGroup, StaggerItem } from "@/components/animation/StaggerGroup";
import { AnimatedCounter } from "@/components/animation/AnimatedCounter";

export interface ImpactTrustProps {
  data?: ImpactStatsBlock | typeof homeData.impactStats;
}

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="h-6 w-6 text-amber-500" />,
  HandHeart: <HandHeart className="h-6 w-6 text-amber-500" />,
  BookOpen: <BookOpen className="h-6 w-6 text-amber-500" />,
  Target: <Target className="h-6 w-6 text-amber-500" />,
  Sparkles: <Sparkles className="h-6 w-6 text-amber-500" />,
  Sprout: <Sprout className="h-6 w-6 text-amber-500" />,
  Heart: <Heart className="h-6 w-6 text-amber-500" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6 text-amber-500" />,
};

export function ImpactTrust({ data }: ImpactTrustProps) {
  const d = data as any;
  const stats =
    d?.stats && d.stats.length > 0
      ? d.stats
      : homeData.impactStats.stats;
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200/60">
      <Container>
        <StaggerGroup
          staggerInterval={100}
          duration={650}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {stats.map((stat: any, idx: number) => (
            <StaggerItem key={stat.id || idx} index={idx}>
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group h-full">
                <div className="mb-4 inline-flex p-3 rounded-2xl bg-emerald-50 w-fit transition-transform duration-300 group-hover:scale-110 group-hover:bg-emerald-100">
                  {stat.icon && iconMap[stat.icon] ? (
                    iconMap[stat.icon]
                  ) : (
                    <Users className="h-6 w-6 text-amber-500" />
                  )}
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#03452c] tracking-tight transition-transform duration-300 group-hover:scale-105">
                    <AnimatedCounter value={stat.value} />
                  </p>
                  <h4 className="mt-2 text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    {stat.label}
                  </h4>
                  {stat.sublabel && (
                    <p className="mt-1 text-xs sm:text-sm text-slate-500">
                      {stat.sublabel}
                    </p>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
