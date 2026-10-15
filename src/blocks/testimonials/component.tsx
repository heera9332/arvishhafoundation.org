import React from "react";
import type { TestimonialsBlock } from "@/payload-types";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export function TestimonialsComponent(block: TestimonialsBlock) {
  return <TestimonialsSection data={block} />;
}

export default TestimonialsComponent;
