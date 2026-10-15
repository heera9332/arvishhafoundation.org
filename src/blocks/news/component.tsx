import React from "react";
import type { NewsBlock } from "@/payload-types";
import { NewsSection } from "@/components/home/NewsSection";

export function NewsComponent(block: NewsBlock) {
  return <NewsSection data={block} />;
}

export default NewsComponent;
