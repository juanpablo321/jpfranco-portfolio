/**
 * Script to link already-uploaded Sanity image assets to their blog documents.
 * The images were uploaded with filenames matching the article slugs.
 *
 * Usage: node scripts/link-images-to-docs.mjs
 */

import { createClient } from "@sanity/client";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";

// Load .env file using dotenv
const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || "rjpa3i6l";
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN;
const SANITY_DATASET = "production";

if (!SANITY_API_TOKEN) {
  console.error("❌ SANITY_API_TOKEN is required");
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  token: SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
  perspective: "raw",
});

async function main() {
  console.log("🔗 Linking uploaded images to blog documents...\n");

  // 1. Fetch all uploaded image assets
  const assets = await client.fetch(
    `*[_type == "sanity.imageAsset"]{_id, originalFilename}`
  );
  console.log(`📸 Found ${assets.length} image assets in Sanity`);

  // Build a map: slug -> assetId
  const slugToAsset = new Map();
  for (const asset of assets) {
    if (asset.originalFilename) {
      // Remove .jpg extension to get the slug
      const slug = asset.originalFilename.replace(/\.jpg$/, "");
      slugToAsset.set(slug, asset._id);
    }
  }
  console.log(`📋 Mapped ${slugToAsset.size} assets by slug\n`);

  // 2. Fetch all blog documents
  const blogDocs = await client.fetch(
    `*[_type == "blog"]{_id, slug, title, mainImage}`
  );
  console.log(`📄 Found ${blogDocs.length} blog documents\n`);

  let successCount = 0;
  let alreadyLinked = 0;
  let notFound = 0;

  for (const doc of blogDocs) {
    const slug = doc.slug?.current;
    if (!slug) {
      console.warn(`  ⚠️  Document ${doc._id} has no slug, skipping`);
      continue;
    }

    // Check if already has mainImage
    if (doc.mainImage?.asset?._ref) {
      console.log(`  ✅ Already linked: ${slug}`);
      alreadyLinked++;
      continue;
    }

    const assetId = slugToAsset.get(slug);
    if (!assetId) {
      console.warn(`  ⚠️  No image found for slug: ${slug}`);
      notFound++;
      continue;
    }

    try {
      await client
        .patch(doc._id)
        .set({
          mainImage: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: assetId,
            },
          },
        })
        .commit();

      console.log(`  ✅ Linked: ${slug} → ${assetId}`);
      successCount++;
    } catch (error) {
      console.error(`  ❌ Error linking ${slug}: ${error.message}`);
    }
  }

  console.log(`\n🎉 Done!`);
  console.log(`✅ Newly linked: ${successCount}`);
  console.log(`♻️  Already linked: ${alreadyLinked}`);
  console.log(`⚠️  No image found: ${notFound}`);
}

main().catch(console.error);
