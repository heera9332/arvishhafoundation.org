import React from "react";
import type { ImpactStatsBlock } from "@/payload-types";
import { ImpactDarkSection } from "@/components/home/ImpactDarkSection";
import { ImpactTrust } from "@/components/home/ImpactTrust";

export function ImpactStatsComponent(block: ImpactStatsBlock) {
  if (block.theme === "darkGreen") {
    return <ImpactDarkSection data={block} />;
  }

  return <ImpactTrust data={block} />;
}

export default ImpactStatsComponent;
