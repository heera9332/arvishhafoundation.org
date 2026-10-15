import React from "react";
import type { FocusAreasBlock } from "@/payload-types";
import { FocusAreas } from "@/components/home/FocusAreas";

export function FocusAreasComponent(block: FocusAreasBlock) {
  return <FocusAreas data={block} />;
}

export default FocusAreasComponent;
