import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { homeData } from "@/data/page-home";

export interface ImpactDarkSectionData {
  eyebrow?: string | null;
  heading?: string | null;
  description?: string | null;
  stats?: Array<{
    id?: string | null;
    value: string;
    label: string;
    sublabel?: string | null;
    icon?: string | null;
  }> | null;
  features?: Array<{
    title: string;
    description: string;
  }> | null;
}

export interface ImpactDarkSectionProps {
  data?: ImpactDarkSectionData | typeof homeData.impactDark | any;
}

export function ImpactDarkSection({ data }: ImpactDarkSectionProps) {
  const eyebrow = data?.eyebrow || homeData.impactDark.eyebrow;
  const heading = data?.heading || homeData.impactDark.heading;
  const description = data?.description || homeData.impactDark.description;
  const stats =
    data?.stats && data.stats.length > 0
      ? data.stats
      : homeData.impactDark.stats;
  const features =
    data?.features && data.features.length > 0
      ? data.features
      : homeData.impactDark.features;

  return (
    <section className="py-20 sm:py-28 bg-[#023420] text-white relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full border border-emerald-400" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full border border-amber-400" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <SectionLabel variant="gold">{eyebrow}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-emerald-100/90 leading-relaxed">
            {description}
          </p>
        </div>

        {/* 4 Impact Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
          {stats.map((stat: any, idx: number) => (
            <div
              key={stat.id || idx}
              className="bg-emerald-950/70 border border-emerald-800/80 rounded-3xl p-6 sm:p-8 text-center backdrop-blur-xs hover:border-amber-400/50 transition-colors shadow-lg"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-400 mb-2">
                {stat.value}
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                {stat.label}
              </h4>
              <p className="mt-1 text-xs sm:text-sm text-emerald-200/80">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-emerald-850">
          {features.map((feat: any, idx: number) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
                {idx === 0 && <Check className="h-5 w-5" />}
                {idx === 1 && <ShieldCheck className="h-5 w-5" />}
                {idx === 2 && <Sparkles className="h-5 w-5" />}
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1.5">
                  {feat.title}
                </h4>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
