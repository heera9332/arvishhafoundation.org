import React from "react";
import type { ContactBlock } from "@/payload-types";
import { ContactSection } from "@/components/home/ContactSection";
import { getSiteSettings } from "@/global/site-settings";

export async function ContactComponent(block: ContactBlock) {
  const settings = await getSiteSettings();
  const enhancedBlock = {
    ...block,
    info: {
      phone: settings.phone,
      email: settings.contactEmail,
    },
  };
  return <ContactSection data={enhancedBlock as any} />;
}

export default ContactComponent;
