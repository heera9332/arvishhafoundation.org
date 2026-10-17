import React from "react";
import type { Page } from "@/payload-types";

// Block Components
import { HeroComponent } from "./hero/component";
import { ContentComponent } from "./content/component";
import { ImpactStatsComponent } from "./impact-stats/component";
import { FocusAreasComponent } from "./focus-areas/component";
import { MissionVisionComponent } from "./mission-vision/component";
import { ProjectsComponent } from "./projects/component";
import { TestimonialsComponent } from "./testimonials/component";
import { ProcessComponent } from "./process/component";
import { CTAComponent } from "./cta/component";
import { FAQComponent } from "./faq/component";
import { NewsComponent } from "./news/component";
import { ContactComponent } from "./contact/component";
import { ContactPageComponent } from "./contact-page/component";
import { MediaBlockComponent } from "./media-block/component";
import { FormBlockComponent } from "./form-block/component";
import { TeamComponent } from "./team/component";
import { PartnersComponent } from "./partners/component";
import { ValuesComponent } from "./values/component";
import { DonateTiersComponent } from "./donate-tiers/component";
import { StoryComponent } from "./story/component";
import { TransparencyComponent } from "./transparency/component";
import { VolunteerComponent } from "./volunteer/component";
import { CorporatePartnershipComponent } from "./corporate-partnership/component";
import { PillarsComponent } from "./pillars/component";
import { PostsGridComponent } from "./posts-grid/component";

import { ScrollReveal } from "@/components/animation/ScrollReveal";

// Shared utilities
export { getMediaUrl } from "./shared/getMediaUrl";
export { LexicalRenderer, type LexicalNode } from "./shared/LexicalRenderer";

export type PageBlock = Page["layout"][number];
export type BlockType = PageBlock["blockType"];

export const blockComponents: Record<
  BlockType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ComponentType<any>
> = {
  hero: HeroComponent,
  content: ContentComponent,
  impactStats: ImpactStatsComponent,
  focusAreas: FocusAreasComponent,
  missionVision: MissionVisionComponent,
  projects: ProjectsComponent,
  testimonials: TestimonialsComponent,
  process: ProcessComponent,
  cta: CTAComponent,
  faq: FAQComponent,
  news: NewsComponent,
  contact: ContactComponent,
  contactPage: ContactPageComponent,
  mediaBlock: MediaBlockComponent,
  formBlock: FormBlockComponent,
  team: TeamComponent,
  partners: PartnersComponent,
  values: ValuesComponent,
  donateTiers: DonateTiersComponent,
  story: StoryComponent,
  transparency: TransparencyComponent,
  volunteer: VolunteerComponent,
  corporatePartnership: CorporatePartnershipComponent,
  pillars: PillarsComponent,
  postsGrid: PostsGridComponent,
};

export interface RenderBlocksProps {
  blocks?: Page["layout"] | null;
  className?: string;
}

/**
 * Main Layout Block Renderer for Payload CMS pages with smooth section entrance transitions.
 */
export const RenderBlocks: React.FC<RenderBlocksProps> = ({
  blocks,
  className,
}) => {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className={className}>
      {blocks.map((block, index) => {
        if (!block || !block.blockType) return null;

        const { blockType } = block;
        const BlockComponent =
          blockComponents[blockType] ||
          ((blockType as string) === "whatWeDo" || (blockType as string) === "what-we-do"
            ? PillarsComponent
            : (blockType as string) === "posts-grid" || (blockType as string) === "postsGrid"
            ? PostsGridComponent
            : undefined);
        const key = block.id || `${blockType}-${index}`;

        if (BlockComponent) {
          const isHero = blockType === "hero" || index === 0;
          return (
            <ScrollReveal
              key={key}
              variant={isHero ? "fade" : "fade-up"}
              duration={isHero ? 500 : 700}
              threshold={isHero ? 0 : 0.08}
              className={`cms-block cms-block-${blockType}`}
            >
              <BlockComponent {...block} />
            </ScrollReveal>
          );
        }

        if (isDev) {
          return (
            <div
              key={key}
              className="p-4 my-4 border border-dashed border-amber-300 bg-amber-50 rounded-xl text-amber-900 text-xs text-center font-mono"
            >
              Warning: Unknown CMS block type &quot;{blockType}&quot;
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default RenderBlocks;
