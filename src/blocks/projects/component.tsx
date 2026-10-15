import React from "react";
import type { ProjectsBlock } from "@/payload-types";
import { ProjectsSection } from "@/components/home/ProjectsSection";

export function ProjectsComponent(block: ProjectsBlock) {
  return <ProjectsSection data={block} />;
}

export default ProjectsComponent;
