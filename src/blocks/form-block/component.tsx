import React from "react";
import type { FormBlock as FormBlockType } from "@/payload-types";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { LexicalRenderer, type LexicalNode } from "@/blocks/shared/LexicalRenderer";
import { ScrollReveal } from "@/components/animation/ScrollReveal";

export function FormBlockComponent(block: FormBlockType) {
  return (
    <section className="py-16 sm:py-24 bg-[#faf9f5] overflow-hidden">
      <Container size="narrow">
        <ScrollReveal variant="zoom-in" duration={700}>
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md">
            {block.enableIntro && block.introContent?.root && (
              <div className="mb-8">
                <LexicalRenderer
                  node={block.introContent.root as unknown as LexicalNode}
                />
              </div>
            )}
            <ContactForm />
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

export default FormBlockComponent;
