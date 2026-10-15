import React from "react";
import type { HeroBlock } from "@/payload-types";
import { HomeHero } from "@/components/home/HomeHero";
import { PageHero } from "@/components/common/PageHero";

export function HeroComponent(block: HeroBlock) {
  if (block.variant === "page") {
    return (
      <PageHero
        eyebrow={block.eyebrow || undefined}
        heading={block.heading}
        description={block.subheading || undefined}
        breadcrumbs={
          block.breadcrumbs?.map((b) => ({
            label: b.label,
            href: b.href || undefined,
          })) || undefined
        }
      />
    );
  }

  return <HomeHero data={block} />;
}

export default HeroComponent;
