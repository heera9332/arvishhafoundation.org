import type { Payload } from "payload";
import type { Header, Footer, SiteSetting, SeoSetting } from "@/payload-types";
import fs from "fs";
import path from "path";

function loadSnapshot<T>(filename: string): T {
  const filePath = path.join(process.cwd(), "data/seed", filename);
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as T;
}

function cleanGlobalDoc(doc: Record<string, unknown>): Record<string, unknown> {
  const clone = { ...doc };
  delete clone._id;
  delete clone.globalType;
  delete clone.createdAt;
  delete clone.updatedAt;
  delete clone.__v;
  return clone;
}

export async function seedHeader(payload: Payload) {
  const globals = loadSnapshot<Array<{ globalType: string; [key: string]: unknown }>>("globals.json");
  const header = globals.find((g) => g.globalType === "header");
  if (!header) {
    throw new Error("Header data not found in snapshot");
  }

  const data = cleanGlobalDoc(header) as unknown as Header;
  const doc = await payload.updateGlobal({
    slug: "header",
    data,
  });

  return { success: true, doc };
}

export async function seedFooter(payload: Payload) {
  const globals = loadSnapshot<Array<{ globalType: string; [key: string]: unknown }>>("globals.json");
  const footer = globals.find((g) => g.globalType === "footer");
  if (!footer) {
    throw new Error("Footer data not found in snapshot");
  }

  const data = cleanGlobalDoc(footer) as unknown as Footer;
  const doc = await payload.updateGlobal({
    slug: "footer",
    data,
  });

  return { success: true, doc };
}

export async function seedSiteSettings(payload: Payload) {
  const globals = loadSnapshot<Array<{ globalType: string; [key: string]: unknown }>>("globals.json");
  const siteSettings = globals.find((g) => g.globalType === "site-settings");
  if (!siteSettings) {
    throw new Error("Site Settings data not found in snapshot");
  }

  const data = cleanGlobalDoc(siteSettings) as unknown as SiteSetting;
  const doc = await payload.updateGlobal({
    slug: "site-settings",
    data,
  });

  return { success: true, doc };
}

export async function seedSeoSettings(payload: Payload) {
  const globals = loadSnapshot<Array<{ globalType: string; [key: string]: unknown }>>("globals.json");
  const seoSettings = globals.find((g) => g.globalType === "seo-settings");
  if (!seoSettings) {
    throw new Error("SEO Settings data not found in snapshot");
  }

  const data = cleanGlobalDoc(seoSettings) as unknown as SeoSetting;
  const doc = await payload.updateGlobal({
    slug: "seo-settings",
    data,
  });

  return { success: true, doc };
}

export async function seedGlobals(payload: Payload) {
  const header = await seedHeader(payload);
  const footer = await seedFooter(payload);
  const siteSettings = await seedSiteSettings(payload);
  const seoSettings = await seedSeoSettings(payload);

  return {
    success: true,
    results: {
      header: header.success,
      footer: footer.success,
      "site-settings": siteSettings.success,
      "seo-settings": seoSettings.success,
    },
  };
}

export async function seedAll(payload: Payload) {
  const globalsRes = await seedGlobals(payload);

  return {
    success: globalsRes.success,
    globals: globalsRes,
  };
}
