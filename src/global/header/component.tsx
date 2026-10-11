import React from "react";
import { getHeaderData } from "./api";
import { Header as HeaderClient } from "@/components/layout/Header";

/**
 * Server Component that securely fetches Header global data from Payload CMS
 * and renders the interactive client Header with full fallback resilience.
 */
export async function Header() {
  const data = await getHeaderData();
  return <HeaderClient data={data} />;
}

export default Header;
