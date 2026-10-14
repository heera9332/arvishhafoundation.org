import React, { Fragment } from "react";
import type { Page } from "@/payload-types";

// component mapping
const blockComponents = {
  faqs: null,
};

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][];
}> = async (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          // console.log('Block > ', block)
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <div className={block?.blockType || ""} key={index}>
                  <Block {...block} />
                </div>
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
