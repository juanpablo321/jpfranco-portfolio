/**
 * Script to download images from Unsplash and upload them to Sanity Assets,
 * then update the corresponding Sanity documents to reference the uploaded images.
 *
 * Usage: node scripts/upload-images-to-sanity.mjs
 */

import { createClient } from "@sanity/client";
import https from "https";
import http from "http";
import { URL } from "url";
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
});

// All 27 articles with their slug and Unsplash image URL
const articles = [
  { slug: "preparar-catalogo-b2b-agentes-compra-ia-comercio-agentico-2026", imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=675&fit=crop" },
  { slug: "comercio-conversacional-agentes-ia-ventas-b2b-2026", imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=675&fit=crop" },
  { slug: "integracion-sistemas-legacy-comercio-digital-2026", imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=675&fit=crop" },
  { slug: "ai-sdr-tools-prospeccion-leads-b2b-2026", imageUrl: "https://images.unsplash.com/photo-1552581234-26160f608093?w=1200&h=675&fit=crop" },
  { slug: "sistemas-ia-multi-agente-marketing-b2b-2026", imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1200&h=675&fit=crop" },
  { slug: "geo-generative-engine-optimization-b2b", imageUrl: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=1200&h=675&fit=crop" },
  { slug: "ia-agentica-marketing-b2b-2026", imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=675&fit=crop" },
  { slug: "guia-expansion-digital-b2b-2026", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=675&fit=crop" },
  { slug: "estrategias-omnicanalidad-b2b", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop" },
  { slug: "marketplaces-b2b-comercio-electronico", imageUrl: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=1200&h=675&fit=crop" },
  { slug: "escalar-ecommerce-b2b-internacional", imageUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1200&h=675&fit=crop" },
  { slug: "transformacion-digital-legacy-nube", imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=675&fit=crop" },
  { slug: "inteligencia-artificial-ecommerce-2026", imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=675&fit=crop" },
  { slug: "chatbots-ia-atencion-cliente-b2b", imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200&h=675&fit=crop" },
  { slug: "personalizacion-ia-experiencia-cliente", imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=675&fit=crop" },
  { slug: "analisis-predictivo-ventas-b2b", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop&q=80" },
  { slug: "automatizacion-procesos-ia-b2b", imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=675&fit=crop" },
  { slug: "estrategia-contenidos-b2b-2026", imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=675&fit=crop" },
  { slug: "linkedin-marketing-b2b-estrategias", imageUrl: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=1200&h=675&fit=crop" },
  { slug: "account-based-marketing-abm", imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&h=675&fit=crop" },
  { slug: "seo-b2b-posicionamiento-organico", imageUrl: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1200&h=675&fit=crop" },
  { slug: "email-marketing-b2b-nurturing", imageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1200&h=675&fit=crop" },
  { slug: "marketing-automation-b2b", imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=675&fit=crop" },
  { slug: "video-marketing-b2b-estrategia", imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&h=675&fit=crop" },
  { slug: "webinars-b2b-generacion-leads", imageUrl: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=1200&h=675&fit=crop" },
  { slug: "datos-analytics-marketing-b2b", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop&q=85" },
  { slug: "tendencias-marketing-b2b-2026", imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=675&fit=crop" },
];

/**
 * Download image from URL and return a Buffer
 */
function downloadImage(imageUrl) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(imageUrl);
    const protocol = parsedUrl.protocol === "https:" ? https : http;

    const request = protocol.get(imageUrl, (response) => {
      // Handle redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        resolve(downloadImage(response.headers.location));
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode} for ${imageUrl}`));
        return;
      }

      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => resolve(Buffer.concat(chunks)));
      response.on("error", reject);
    });

    request.on("error", reject);
    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error(`Timeout downloading ${imageUrl}`));
    });
  });
}

/**
 * Upload image buffer to Sanity Assets
 */
async function uploadToSanity(imageBuffer, filename) {
  const asset = await client.assets.upload("image", imageBuffer, {
    filename,
    contentType: "image/jpeg",
  });
  return asset;
}

/**
 * Update Sanity document to reference the uploaded image
 */
async function updateDocumentImage(slug, assetId) {
  // Find the document by slug
  const doc = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]`,
    { slug }
  );

  if (!doc) {
    console.warn(`  ⚠️  Document not found for slug: ${slug}`);
    return false;
  }

  // Update the mainImage field
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

  return true;
}

async function main() {
  console.log(`🚀 Starting image upload to Sanity Assets`);
  console.log(`📦 Project: ${SANITY_PROJECT_ID} / Dataset: ${SANITY_DATASET}`);
  console.log(`📸 Articles to process: ${articles.length}\n`);

  // Track unique image URLs to avoid duplicate uploads
  const uploadedImages = new Map(); // imageUrl -> assetId
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < articles.length; i++) {
    const { slug, imageUrl } = articles[i];
    console.log(`[${i + 1}/${articles.length}] Processing: ${slug}`);

    try {
      let assetId;

      // Check if we already uploaded this exact image URL
      if (uploadedImages.has(imageUrl)) {
        assetId = uploadedImages.get(imageUrl);
        console.log(`  ♻️  Reusing already-uploaded asset: ${assetId}`);
      } else {
        // Download the image
        console.log(`  📥 Downloading: ${imageUrl.substring(0, 60)}...`);
        const imageBuffer = await downloadImage(imageUrl);
        console.log(`  ✅ Downloaded: ${Math.round(imageBuffer.length / 1024)}KB`);

        // Upload to Sanity
        const filename = `${slug}.jpg`;
        console.log(`  📤 Uploading to Sanity as: ${filename}`);
        const asset = await uploadToSanity(imageBuffer, filename);
        assetId = asset._id;
        uploadedImages.set(imageUrl, assetId);
        console.log(`  ✅ Uploaded: ${assetId}`);
      }

      // Update the Sanity document
      const updated = await updateDocumentImage(slug, assetId);
      if (updated) {
        console.log(`  ✅ Document updated with mainImage reference`);
        successCount++;
      } else {
        errorCount++;
      }

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error) {
      console.error(`  ❌ Error: ${error.message}`);
      errorCount++;
    }

    console.log("");
  }

  console.log(`\n🎉 Done!`);
  console.log(`✅ Success: ${successCount}/${articles.length}`);
  console.log(`❌ Errors: ${errorCount}/${articles.length}`);
  console.log(`♻️  Unique images uploaded: ${uploadedImages.size}`);
}

main().catch(console.error);
