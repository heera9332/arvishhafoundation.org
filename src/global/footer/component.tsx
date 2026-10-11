import React from "react";
import { getFooterData } from "./api";
import { Footer as FooterClient } from "@/components/layout/Footer";

/**
 * Server Component that securely fetches Footer global data from Payload CMS
 * and renders the interactive client Footer with full fallback resilience.
 */
export async function Footer() {
  const data = await getFooterData();
  return <FooterClient data={data} />;
}

export default Footer;
