import React from "react";
import Image from "next/image";
import type { MediaBlock as MediaBlockType } from "@/payload-types";
import { Container } from "@/components/layout/Container";
import { getMediaUrl } from "@/blocks/shared/getMediaUrl";

export function MediaBlockComponent(block: MediaBlockType) {
  const mediaUrl = getMediaUrl(block.media) || block.mediaUrl;
  const alt = block.alt || "Arvishha Foundation Initiative";

  if (!mediaUrl) return null;

  const sizeClasses: Record<string, string> = {
    normal: "max-w-4xl mx-auto rounded-3xl aspect-16/9",
    wide: "max-w-6xl mx-auto rounded-3xl aspect-16/9",
    fullscreen: "w-full aspect-[21/9]",
  };

  const sizeClass = sizeClasses[block.size || "wide"] || sizeClasses.wide;

  return (
    <section className="py-12 bg-white">
      <Container
        size={block.size === "wide" ? "wide" : "default"}
        className={block.size === "fullscreen" ? "max-w-none px-0" : undefined}
      >
        <div className={`relative overflow-hidden shadow-xl bg-slate-100 ${sizeClass}`}>
          <Image
            src={mediaUrl}
            alt={alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {block.caption && (
          <p className="text-center text-xs text-slate-500 mt-3 italic max-w-2xl mx-auto">
            {block.caption}
          </p>
        )}
      </Container>
    </section>
  );
}

export default MediaBlockComponent;
