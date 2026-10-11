import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload";

import { Media } from "@/collections/media";
import { Header } from "@/global/header/schema";
import { Footer } from "@/global/footer/schema";
import { s3Storage } from "@payloadcms/storage-s3";

const s3Bucket = process.env.S3_BUCKET || process.env.S3_BUCKET_NAME || "";
const s3AccessKeyId = process.env.S3_ACCESS_KEY_ID || process.env.S3_ACCESS_KEY || "";
const s3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY || process.env.S3_SECRET_KEY || "";
const s3Endpoint = process.env.S3_ENDPOINT;
const s3Region = process.env.S3_REGION || "ap-northeast-1";
const s3Prefix = process.env.S3_PREFIX ?? "media";
const isS3Configured = Boolean(s3Bucket && s3AccessKeyId && s3SecretAccessKey);

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [Media],

  // Define and configure your Globals in this array
  globals: [Header, Footer],

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

