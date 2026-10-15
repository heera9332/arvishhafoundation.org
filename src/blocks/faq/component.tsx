import React from "react";
import type { FAQBlock } from "@/payload-types";
import { FAQSection } from "@/components/home/FAQSection";

export function FAQComponent(block: FAQBlock) {
  return <FAQSection data={block} />;
}

export default FAQComponent;
