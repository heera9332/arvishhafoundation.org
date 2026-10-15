import React from "react";
import type { MissionVisionBlock } from "@/payload-types";
import { MissionSection } from "@/components/home/MissionSection";

export function MissionVisionComponent(block: MissionVisionBlock) {
  return <MissionSection data={block} />;
}

export default MissionVisionComponent;
