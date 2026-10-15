import React from "react";
import type { CTABlock } from "@/payload-types";
import { CTASection } from "@/components/home/CTASection";

export function CTAComponent(block: CTABlock) {
  return <CTASection data={block} />;
}

export default CTAComponent;
