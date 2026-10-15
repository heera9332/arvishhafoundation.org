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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat: any, idx: number) => (
            <div
              key={stat.id || idx}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="mb-4 inline-flex p-3 rounded-2xl bg-emerald-50 w-fit">
                {stat.icon && iconMap[stat.icon] ? (
                  iconMap[stat.icon]
                ) : (
                  <Users className="h-6 w-6 text-amber-500" />
                )}
              </div>
              <div>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#03452c] tracking-tight">
                  {stat.value}
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
          ))}
        </div>
      </Container>
    </section>
  );
}
