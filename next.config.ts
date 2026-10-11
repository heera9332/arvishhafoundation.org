import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const remotePatterns: NonNullable<NonNullable<NextConfig["images"]>["remotePatterns"]> = [
  {
    protocol: "https",
    hostname: "media.arvishhafoundation.org",
  },
  {
    protocol: "https",
    hostname: "images.unsplash.com",
  },
  {
    protocol: "https",
    hostname: "plus.unsplash.com",
  },
  {
    protocol: "http",
    hostname: "localhost",
  },
  {
    protocol: "https",
    hostname: "**.storage.supabase.co",
  },
  {
    protocol: "https",
    hostname: "**.supabase.co",
  },
  {
    protocol: "https",
    hostname: "**.amazonaws.com",
  },
];

if (process.env.S3_ENDPOINT) {
  try {
    const url = new URL(process.env.S3_ENDPOINT);
    const protocol = url.protocol.replace(":", "") as "http" | "https";
    if (!remotePatterns.some((p) => p.hostname === url.hostname)) {
      remotePatterns.push({ protocol, hostname: url.hostname });
    }
  } catch {}
}

if (process.env.S3_PUBLIC_URL) {
  try {
    const url = new URL(process.env.S3_PUBLIC_URL);
    const protocol = url.protocol.replace(":", "") as "http" | "https";
    if (!remotePatterns.some((p) => p.hostname === url.hostname)) {
      remotePatterns.push({ protocol, hostname: url.hostname });
    }
  } catch {}
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
    localPatterns: [
      {
        pathname: "/api/media/file/**",
      },
      {
        pathname: "/api/**",
      },
      {
        pathname: "/**",
      },
    ],
  },
};

export default withPayload(nextConfig); 

