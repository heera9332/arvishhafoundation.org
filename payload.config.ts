import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { revalidatePath } from "next/cache";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";

import { Media } from "@/collections/media";
import { Pages } from "@/collections/pages";
import { Posts } from "@/collections/posts";
import { Categories } from "@/collections/categories";
import { Tags } from "@/collections/tags";
import { Header } from "@/global/header/schema";
import { Footer } from "@/global/footer/schema";
import { SiteSettings } from "@/global/site-settings/schema";
import { seedPosts } from "@/lib/seed-posts";
import { s3Storage } from "@payloadcms/storage-s3";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const s3Bucket = process.env.S3_BUCKET || process.env.S3_BUCKET_NAME || "";
const s3AccessKeyId = process.env.S3_ACCESS_KEY_ID || process.env.S3_ACCESS_KEY || "";
const s3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY || process.env.S3_SECRET_KEY || "";
const s3Endpoint = process.env.S3_ENDPOINT;
const s3Region = process.env.S3_REGION || "ap-northeast-1";
const s3Prefix = process.env.S3_PREFIX ?? "media";
const isS3Configured = Boolean(s3Bucket && s3AccessKeyId && s3SecretAccessKey);

export default buildConfig({
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [Media, Pages, Posts, Categories, Tags],

  // Define and configure your Globals in this array
  globals: [Header, Footer, SiteSettings],

  // Custom endpoints for on-demand revalidation
  endpoints: [
    {
      path: "/revalidate",
      method: "get",
      handler: async (req) => {
        const url = new URL(req.url || "", "http://localhost:3000");
        const pathParam = url.searchParams.get("path") || "/";
        try {
          revalidatePath(pathParam, "layout");
          revalidatePath(pathParam);
          revalidatePath("/sitemap.xml");
          return Response.json({ revalidated: true, path: pathParam, now: Date.now() });
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Revalidation error";
          return Response.json({ revalidated: false, error: message }, { status: 500 });
        }
      },
    },
    {
      path: "/seed-posts",
      method: "get",
      handler: async (req) => {
        try {
          const result = await seedPosts(req.payload);
          return Response.json(result);
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Seed posts error";
          return Response.json({ success: false, error: message }, { status: 500 });
        }
      },
    },
    {
      path: "/seed-site-settings",
      method: "get",
      handler: async (req) => {
        try {
          const { defaultSiteSettingsData } = await import("@/global/site-settings/defaults");
          const updated = await (req.payload.updateGlobal as any)({
            slug: "site-settings",
            data: {
              siteName: defaultSiteSettingsData.siteName,
              tagline: defaultSiteSettingsData.tagline,
              contactEmail: defaultSiteSettingsData.contactEmail,
              phone: defaultSiteSettingsData.phone,
              address: defaultSiteSettingsData.address,
              socialLinks: defaultSiteSettingsData.socialLinks.map((s) => ({
                platform: s.platform,
                url: s.url,
              })),
              footerCopyright: defaultSiteSettingsData.footerCopyright,
              maintenanceMode: false,
            },
          });
          return Response.json({ success: true, doc: updated });
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Seed site-settings error";
          return Response.json({ success: false, error: message }, { status: 500 });
        }
      },
    },
  ],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || "",
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
  plugins: [
    seoPlugin({
      collections: [],
      uploadsCollection: "media",
      tabbedUI: true,
      generateTitle: ({ doc }) => {
        const item = doc as { title?: unknown } | undefined;
        const title = typeof item?.title === "string" ? item.title : "Arvishha Foundation";
        return `${title} | Arvishha Foundation`;
      },
      generateDescription: ({ doc }) => {
        const item = doc as { description?: unknown } | undefined;
        return typeof item?.description === "string"
          ? item.description
          : "Arvishha Foundation is a dedicated non-governmental organization working towards inclusive education, youth development, women empowerment, healthcare access, and community growth.";
      },
      generateURL: ({ doc }) => {
        const item = doc as { slug?: unknown } | undefined;
        const slug = typeof item?.slug === "string" ? item.slug : "";
        return `https://arvishhafoundation.org/${slug}`;
      },
    }),
    nestedDocsPlugin({
      collections: ["categories"],
      generateLabel: (_, currentDoc) => {
        const item = currentDoc as { title?: unknown } | undefined;
        return typeof item?.title === "string" ? item.title : "";
      },
      generateURL: (docs) =>
        docs.reduce((url, doc) => {
          const item = doc as { slug?: unknown } | undefined;
          const slug = typeof item?.slug === "string" ? item.slug : "";
          return `${url}/${slug}`;
        }, ""),
    }),
    formBuilderPlugin({
      fields: {
        payment: false,
      },
      formOverrides: {
        admin: {
          group: "Content",
        },
      },
      formSubmissionOverrides: {
        admin: {
          group: "Content",
        },
      },
    }),
    ...(isS3Configured
      ? [
          s3Storage({
            collections: {
              media: {
                prefix: s3Prefix,
                ...(process.env.S3_PUBLIC_URL
                  ? {
                      generateFileURL: ({ filename, prefix }) => {
                        const baseUrl = process.env.S3_PUBLIC_URL!.replace(/\/+$/, "");
                        return prefix ? `${baseUrl}/${prefix}/${filename}` : `${baseUrl}/${filename}`;
                      },
                    }
                  : {}),
              },
            },
            bucket: s3Bucket,
            config: {
              forcePathStyle: true,
              region: s3Region,
              endpoint: s3Endpoint,
              credentials: {
                accessKeyId: s3AccessKeyId,
                secretAccessKey: s3SecretAccessKey,
              },
            },
          }),
        ]
      : []),
  ],
});

