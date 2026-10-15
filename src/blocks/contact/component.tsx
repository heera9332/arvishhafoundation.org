import React from "react";
import type { ContactBlock } from "@/payload-types";
import { ContactSection } from "@/components/home/ContactSection";

export function ContactComponent(block: ContactBlock) {
  return <ContactSection data={block} />;
}

export default ContactComponent;
