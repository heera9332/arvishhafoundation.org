import React from "react";
import type { ValuesBlock } from "@/payload-types";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/common/SectionLabel";
import { aboutData } from "@/data/page-about";
import {
  HeartHandshake,
  Users2,
  ShieldCheck,
  Sparkles,
  Heart,
} from "lucide-react";

const valueIcons: Record<string, React.ReactNode> = {
  HeartHandshake: <HeartHandshake className="h-6 w-6 text-amber-500" />,
  Users2: <Users2 className="h-6 w-6 text-amber-500" />,
  ShieldCheck: <ShieldCheck className="h-6 w-6 text-amber-500" />,
  Sparkles: <Sparkles className="h-6 w-6 text-amber-500" />,
  Heart: <Heart className="h-6 w-6 text-amber-500" />,
};

export interface ValuesComponentProps {
  data?: ValuesBlock | Record<string, unknown>;
}

export function ValuesComponent(
  props?: ValuesComponentProps | Partial<ValuesBlock>
) {
  const block = (("data" in (props || {}) && (props as ValuesComponentProps)?.data
    ? (props as ValuesComponentProps).data
    : props) || {}) as Partial<ValuesBlock>;

  const eyebrow = block.eyebrow || "Guiding Principles";
  const heading = block.heading || "Values That Anchor Everything We Do";
  const description =
    block.description ||
    "Our culture and field operations are steered by ethical rigor, community trust, and mutual respect.";
  const items =
    block.items && block.items.length > 0 ? block.items : aboutData.values;

  return (
    <section className="py-20 sm:py-28 bg-[#faf9f5] border-t border-slate-200/60">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionLabel>{eyebrow}</SectionLabel>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {heading}
          </h2>
          <p className="mt-4 text-base text-slate-600">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((val, idx) => {
            const iconName = val.icon || "HeartHandshake";
            const iconElement = valueIcons[iconName] || (
              <HeartHandshake className="h-6 w-6 text-amber-500" />
            );
            const key =
              "id" in val && typeof val.id === "string" ? val.id : idx;

            return (
              <div
                key={key}
                className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-5">
                    {iconElement}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default ValuesComponent;
