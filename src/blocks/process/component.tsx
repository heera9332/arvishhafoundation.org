import React from "react";
import type { ProcessBlock } from "@/payload-types";
import { ProcessSection } from "@/components/home/ProcessSection";

export function ProcessComponent(block: ProcessBlock) {
  return <ProcessSection data={block} />;
}

export default ProcessComponent;
