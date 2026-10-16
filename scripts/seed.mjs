/**
 * Master Database Seeder from Snapshot Data
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed.mjs           # Seed all (users, media, forms, pages, posts, globals)
 *   node --env-file=.env.local scripts/seed.mjs --users   # Seed users only
 *   node --env-file=.env.local scripts/seed.mjs --globals # Seed globals only (header, footer, etc.)
 *   node --env-file=.env.local scripts/seed.mjs --header  # Seed header only
 *   node --env-file=.env.local scripts/seed.mjs --footer  # Seed footer only
 *   node --env-file=.env.local scripts/seed.mjs --posts   # Seed posts only
 *   node --env-file=.env.local scripts/seed.mjs --pages   # Seed pages only
 */

import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const rootDir = path.resolve(dirname, "..");

// Resolve MongoDB client from installed pnpm package
const mongodbPath = path.join(
  rootDir,
  "node_modules/.pnpm/mongodb@6.20.0/node_modules/mongodb/lib/index.js"
);
const { MongoClient, ObjectId } = await import(mongodbPath);

async function loadSnapshot(file) {
  const filePath = path.join(rootDir, "data/seed", file);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[seed] Warning: could not load snapshot file ${file}:`, err.message);
    return null;
  }
}

async function resolvePasswordCredentials(user) {
  const { password, salt: existingSalt, hash: existingHash } = user;
  let salt = existingSalt;
  let hash = existingHash;

  if (password) {
    if (salt && hash) {
      const derived = await new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 600000, 32, "sha256", (err, key) => {
          if (err) reject(err);
          else resolve(key);
        });
      });
      const expectedHash = `pbkdf2-sha256-v1:${derived.toString("hex")}`;
      if (expectedHash !== hash) {
        hash = expectedHash;
      }
    } else {
      const saltBuffer = crypto.randomBytes(32);
      salt = saltBuffer.toString("hex");
      const derived = await new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 600000, 32, "sha256", (err, key) => {
          if (err) reject(err);
          else resolve(key);
        });
      });
      hash = `pbkdf2-sha256-v1:${derived.toString("hex")}`;
    }
  }

  return { salt, hash };
}

async function runSeed() {
  const uri = process.env.DATABASE_URL;
  if (!uri) {
    console.error("[seed] Error: DATABASE_URL environment variable is missing.");
    process.exit(1);
  }

  const args = process.argv.slice(2);
  const seedUsersOnly = args.includes("--users");
  const seedGlobalsOnly = args.includes("--globals");
  const seedHeaderOnly = args.includes("--header");
  const seedFooterOnly = args.includes("--footer");
  const seedPostsOnly = args.includes("--posts");
  const seedPagesOnly = args.includes("--pages");
  const seedAll =
    !seedUsersOnly &&
    !seedGlobalsOnly &&
    !seedHeaderOnly &&
    !seedFooterOnly &&
    !seedPostsOnly &&
    !seedPagesOnly;

  console.log("==========================================");
  console.log("   🌱 Arvishha Foundation Database Seeder  ");
  console.log("==========================================");

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db();
  console.log("[seed] Connected to MongoDB database.");

  // --- 1. SEED USERS ---
  if (seedAll || seedUsersOnly) {
    const users = await loadSnapshot("users.json");
    if (Array.isArray(users) && users.length > 0) {
      console.log(`\n[seed:users] Seeding ${users.length} users...`);
      for (const u of users) {
        const { _id, createdAt, updatedAt, password, sessions, ...rest } = u;
        const { salt, hash } = await resolvePasswordCredentials(u);
        const now = new Date();

        const updateData = {
          ...rest,
          ...(salt ? { salt } : {}),
          ...(hash ? { hash } : {}),
          updatedAt: new Date(updatedAt || now),
        };

        const existing = await db.collection("users").findOne({
          $or: [
            { email: rest.email },
            ...(_id ? [{ _id: new ObjectId(_id) }] : []),
          ],
        });

        if (existing) {
          await db.collection("users").updateOne(
            { _id: existing._id },
            { $set: updateData }
          );
        } else {
          await db.collection("users").insertOne({
            ...(_id ? { _id: new ObjectId(_id) } : {}),
            ...updateData,
            createdAt: new Date(createdAt || now),
            loginAttempts: rest.loginAttempts ?? 0,
          });
        }
        console.log(`  ✓ User: ${rest.email}`);
      }
      console.log(`[seed:users] ✓ ${users.length} users verified.`);
    }
  }

  // --- 2. SEED MEDIA ---
  if (seedAll) {
    const media = await loadSnapshot("media.json");
    if (Array.isArray(media) && media.length > 0) {
      console.log(`\n[seed:media] Seeding ${media.length} media records...`);
      for (const m of media) {
        const { _id, createdAt, updatedAt, ...rest } = m;
        await db.collection("media").updateOne(
          { _id: new ObjectId(_id) },
          {
            $set: { ...rest, updatedAt: new Date(updatedAt || Date.now()) },
            $setOnInsert: { _id: new ObjectId(_id), createdAt: new Date(createdAt || Date.now()) },
          },
          { upsert: true }
        );
      }
      console.log(`[seed:media] ✓ ${media.length} media records verified.`);
    }
  }

  // --- 3. SEED FORMS ---
  if (seedAll) {
    const forms = await loadSnapshot("forms.json");
    if (Array.isArray(forms) && forms.length > 0) {
      console.log(`\n[seed:forms] Seeding ${forms.length} forms...`);
      for (const f of forms) {
        const { _id, createdAt, updatedAt, ...rest } = f;
        await db.collection("forms").updateOne(
          { _id: new ObjectId(_id) },
          {
            $set: { ...rest, updatedAt: new Date(updatedAt || Date.now()) },
            $setOnInsert: { _id: new ObjectId(_id), createdAt: new Date(createdAt || Date.now()) },
          },
          { upsert: true }
        );
      }
      console.log(`[seed:forms] ✓ ${forms.length} forms verified.`);
    }
  }

  // --- 4. SEED PAGES ---
  if (seedAll || seedPagesOnly) {
    const pages = await loadSnapshot("pages.json");
    if (Array.isArray(pages) && pages.length > 0) {
      console.log(`\n[seed:pages] Seeding ${pages.length} pages...`);
      for (const p of pages) {
        const { _id, createdAt, updatedAt, ...rest } = p;
        const now = new Date();
        const doc = await db.collection("pages").findOneAndUpdate(
          { slug: rest.slug },
          {
            $set: { ...rest, updatedAt: new Date(updatedAt || now) },
            $setOnInsert: { _id: new ObjectId(_id), createdAt: new Date(createdAt || now) },
          },
          { upsert: true, returnDocument: "after" }
        );
        if (doc) {
          await db.collection("_pages_versions").updateMany({ parent: doc._id }, { $set: { latest: false } });
          await db.collection("_pages_versions").insertOne({
            parent: doc._id,
            version: doc,
            latest: true,
            autosave: false,
            createdAt: now,
            updatedAt: now,
            __v: 0,
          });
          console.log(`  ✓ Page: ${rest.title} (/${rest.slug})`);
        }
      }
      console.log(`[seed:pages] ✓ All pages seeded with versions.`);
    }
  }

  // --- 5. SEED POSTS ---
  if (seedAll || seedPostsOnly) {
    const posts = await loadSnapshot("posts.json");
    if (Array.isArray(posts) && posts.length > 0) {
      console.log(`\n[seed:posts] Seeding ${posts.length} posts...`);
      for (const p of posts) {
        const { _id, createdAt, updatedAt, ...rest } = p;
        const now = new Date();
        const doc = await db.collection("posts").findOneAndUpdate(
          { slug: rest.slug },
          {
            $set: { ...rest, updatedAt: new Date(updatedAt || now) },
            $setOnInsert: { _id: new ObjectId(_id), createdAt: new Date(createdAt || now) },
          },
          { upsert: true, returnDocument: "after" }
        );
        if (doc) {
          await db.collection("_posts_versions").updateMany({ parent: doc._id }, { $set: { latest: false } });
          await db.collection("_posts_versions").insertOne({
            parent: doc._id,
            version: doc,
            latest: true,
            autosave: false,
            createdAt: now,
            updatedAt: now,
            __v: 0,
          });
          console.log(`  ✓ Post: [${rest.postType}] ${rest.title}`);
        }
      }
      console.log(`[seed:posts] ✓ All posts seeded with versions.`);
    }
  }

  // --- 6. SEED GLOBALS ---
  if (seedAll || seedGlobalsOnly || seedHeaderOnly || seedFooterOnly) {
    const globals = await loadSnapshot("globals.json");
    if (Array.isArray(globals) && globals.length > 0) {
      console.log(`\n[seed:globals] Seeding global configurations...`);
      for (const g of globals) {
        if (seedHeaderOnly && g.globalType !== "header") continue;
        if (seedFooterOnly && g.globalType !== "footer") continue;

        const { _id, createdAt, updatedAt, ...rest } = g;
        await db.collection("globals").updateOne(
          { globalType: rest.globalType },
          {
            $set: {
              ...rest,
              updatedAt: new Date(updatedAt || Date.now()),
            },
            $setOnInsert: {
              _id: new ObjectId(_id),
              createdAt: new Date(createdAt || Date.now()),
            },
          },
          { upsert: true }
        );
        console.log(`  ✓ Global: ${rest.globalType}`);
      }
      console.log(`[seed:globals] ✓ Globals seeded.`);
    }
  }

  await client.close();
  console.log("\n==========================================");
  console.log("   ✅ Seeding Completed Successfully!     ");
  console.log("==========================================");
}

runSeed().catch((err) => {
  console.error("\n[seed] ❌ Seeding failed:", err);
  process.exit(1);
});
