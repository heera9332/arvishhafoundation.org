/**
 * Snapshot Exporter
 * Captures current database state into data/seed/*.json snapshot files.
 *
 * Usage:
 *   node --env-file=.env.local scripts/export-snapshot.mjs
 */

import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const rootDir = path.resolve(dirname, "..");

const mongodbPath = path.join(
  rootDir,
  "node_modules/.pnpm/mongodb@6.20.0/node_modules/mongodb/lib/index.js"
);
const { MongoClient } = await import(mongodbPath);

async function exportSnapshot() {
  const uri = process.env.DATABASE_URL;
  if (!uri) {
    console.error("[snapshot] Error: DATABASE_URL is not set.");
    process.exit(1);
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db();

  const outDir = path.join(rootDir, "data/seed");
  await fs.mkdir(outDir, { recursive: true });

  console.log("==========================================");
  console.log("   📸 Database Snapshot Exporter          ");
  console.log("==========================================");

  // 1. Export Globals
  const globals = await db.collection("globals").find({}).toArray();
  await fs.writeFile(
    path.join(outDir, "globals.json"),
    JSON.stringify(globals, null, 2),
    "utf-8"
  );
  console.log(`  ✓ Globals exported: ${globals.length}`);

  // 2. Export Media
  const media = await db.collection("media").find({}).toArray();
  await fs.writeFile(
    path.join(outDir, "media.json"),
    JSON.stringify(media, null, 2),
    "utf-8"
  );
  console.log(`  ✓ Media exported: ${media.length}`);

  // 3. Export Forms
  const forms = await db.collection("forms").find({}).toArray();
  await fs.writeFile(
    path.join(outDir, "forms.json"),
    JSON.stringify(forms, null, 2),
    "utf-8"
  );
  console.log(`  ✓ Forms exported: ${forms.length}`);

  // 4. Export Pages
  const pages = await db.collection("pages").find({}).toArray();
  await fs.writeFile(
    path.join(outDir, "pages.json"),
    JSON.stringify(pages, null, 2),
    "utf-8"
  );
  console.log(`  ✓ Pages exported: ${pages.length}`);

  // 5. Export Posts
  const posts = await db.collection("posts").find({}).toArray();
  await fs.writeFile(
    path.join(outDir, "posts.json"),
    JSON.stringify(posts, null, 2),
    "utf-8"
  );
  console.log(`  ✓ Posts exported: ${posts.length}`);

  // 6. Export Versions (for complete archival)
  const pagesVersions = await db.collection("_pages_versions").find({}).toArray();
  await fs.writeFile(
    path.join(outDir, "pages-versions.json"),
    JSON.stringify(pagesVersions, null, 2),
    "utf-8"
  );
  console.log(`  ✓ Page versions exported: ${pagesVersions.length}`);

  const postsVersions = await db.collection("_posts_versions").find({}).toArray();
  await fs.writeFile(
    path.join(outDir, "posts-versions.json"),
    JSON.stringify(postsVersions, null, 2),
    "utf-8"
  );
  console.log(`  ✓ Post versions exported: ${postsVersions.length}`);

  await client.close();
  console.log("\n==========================================");
  console.log("   ✅ Snapshot Saved in data/seed/        ");
  console.log("==========================================");
}

exportSnapshot().catch((err) => {
  console.error("[snapshot] Failed to export snapshot:", err);
  process.exit(1);
});
