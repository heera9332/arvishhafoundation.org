import React from "react";
import type { ContentBlock } from "@/payload-types";
import { Container } from "@/components/layout/Container";
import { LexicalRenderer, type LexicalNode } from "@/blocks/shared/LexicalRenderer";

export function ContentComponent(block: ContentBlock) {
  const widthClasses: Record<string, string> = {
    standard: "max-w-4xl mx-auto",
    narrow: "max-w-3xl mx-auto",
    wide: "max-w-6xl mx-auto",
    full: "w-full",
  };

  const bgClasses: Record<string, string> = {
    white: "bg-white",
    cream: "bg-[#faf9f5]",
    muted: "bg-slate-50",
    darkGreen: "bg-[#023420] text-white",
  };

  const containerClass =
    widthClasses[block.containerWidth || "standard"] || widthClasses.standard;
  const bgClass =
    bgClasses[block.backgroundColor || "white"] || bgClasses.white;

  const proseThemeClass =
    block.backgroundColor === "darkGreen"
      ? "prose-invert text-emerald-100"
      : "prose-slate";

  return (
    <section className={`py-12 sm:py-16 ${bgClass}`}>
      <Container>
        <div className={`prose ${proseThemeClass} max-w-none ${containerClass}`}>
          {block.content?.root && (
            <LexicalRenderer
              node={block.content.root as unknown as LexicalNode}
            />
          )}
        </div>
      </Container>
    </section>
  );
}

export default ContentComponent;
