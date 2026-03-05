/**
 * Migration script: Import all blog articles from static TypeScript files to Sanity CMS
 *
 * Usage: node scripts/migrate-to-sanity.mjs
 *
 * Requirements:
 *   - SANITY_PROJECT_ID env variable
 *   - SANITY_API_TOKEN env variable (needs write permissions - Editor or above)
 *   - @sanity/client installed in project node_modules
 *   - @sanity/block-tools and jsdom installed globally (npm install -g @sanity/block-tools jsdom)
 */

import { readFileSync } from "fs";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

// Load environment variables
dotenv.config({ path: join(projectRoot, ".env") });

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
const SANITY_API_TOKEN = process.env.SANITY_API_TOKEN;
const SANITY_DATASET = process.env.SANITY_DATASET || "production";

if (!SANITY_PROJECT_ID || !SANITY_API_TOKEN) {
  console.error("❌ Missing SANITY_PROJECT_ID or SANITY_API_TOKEN environment variables");
  process.exit(1);
}

// Load @sanity/client from project node_modules
const require = createRequire(import.meta.url);
const { createClient } = require(join(projectRoot, "node_modules/@sanity/client/dist/index.cjs"));

// Load @sanity/block-tools and jsdom from global node_modules
const GLOBAL_NM = "/home/ubuntu/.nvm/versions/node/v22.13.0/lib/node_modules";
const { htmlToBlocks } = require(`${GLOBAL_NM}/@sanity/block-tools`);
const { JSDOM } = require(`${GLOBAL_NM}/jsdom`);

// Load marked from project node_modules (ESM version for proper exports)
const markedPath = join(projectRoot, "node_modules/.pnpm/marked@16.4.1/node_modules/marked/lib/marked.esm.js");
const markedModule = require(markedPath);
const marked = markedModule.marked || markedModule;

// ─── Sanity Client ────────────────────────────────────────────────────────────

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: SANITY_API_TOKEN,
  useCdn: false,
});

// ─── Block Content Schema ─────────────────────────────────────────────────────

const blockContentType = {
  name: "body",
  jsonType: "array",
  of: [
    {
      name: "block",
      jsonType: "object",
      fields: [
        {
          name: "children",
          type: {
            jsonType: "array",
            of: [
              {
                name: "span",
                jsonType: "object",
                annotations: [
                  {
                    name: "link",
                    title: "Link",
                    type: { name: "link", jsonType: "object" },
                  },
                ],
                decorators: [
                  { title: "Strong", value: "strong" },
                  { title: "Emphasis", value: "em" },
                  { title: "Code", value: "code" },
                ],
              },
            ],
          },
        },
        {
          name: "style",
          type: {
            jsonType: "string",
            options: {
              list: [
                { title: "Normal", value: "normal" },
                { title: "H2", value: "h2" },
                { title: "H3", value: "h3" },
                { title: "H4", value: "h4" },
                { title: "Quote", value: "blockquote" },
              ],
            },
          },
        },
        {
          name: "listItem",
          type: {
            jsonType: "string",
            options: {
              list: [
                { title: "Bullet", value: "bullet" },
                { title: "Number", value: "number" },
              ],
            },
          },
        },
      ],
    },
  ],
};

// ─── Helper: Convert Markdown to Portable Text ────────────────────────────────

function markdownToPortableText(markdown) {
  if (!markdown) return [];
  // Remove the first H1 heading (it's the article title, already stored separately)
  const cleanedMarkdown = markdown.replace(/^# .+\n/, "").trim();
  // Convert markdown to HTML
  const html = marked.parse(cleanedMarkdown);
  // Convert HTML to Portable Text blocks
  try {
    return htmlToBlocks(html, blockContentType, {
      parseHtml: (h) => new JSDOM(h).window.document,
    });
  } catch (e) {
    console.warn(`  ⚠️  Could not convert content to blocks: ${e.message}`);
    // Fallback: create a single text block with the raw content
    return [
      {
        _type: "block",
        _key: `fallback-${Date.now()}`,
        style: "normal",
        children: [{ _type: "span", text: cleanedMarkdown.substring(0, 5000), marks: [] }],
        markDefs: [],
      },
    ];
  }
}

// ─── Helper: Parse Spanish date string to ISO ─────────────────────────────────

const MONTHS_ES = {
  enero: "01", febrero: "02", marzo: "03", abril: "04",
  mayo: "05", junio: "06", julio: "07", agosto: "08",
  septiembre: "09", octubre: "10", noviembre: "11", diciembre: "12",
};

function parseSpanishDate(dateStr) {
  if (!dateStr) return new Date().toISOString().split("T")[0];
  const match = dateStr.match(/(\d+)\s+de\s+(\w+)[,\s]+(\d{4})/i);
  if (!match) return new Date().toISOString().split("T")[0];
  const [, day, monthStr, year] = match;
  const month = MONTHS_ES[monthStr.toLowerCase()];
  if (!month) return new Date().toISOString().split("T")[0];
  return `${year}-${month}-${day.padStart(2, "0")}`;
}

// ─── Helper: Extract readTime number from string ──────────────────────────────

function parseReadTime(readTimeStr) {
  if (!readTimeStr) return 5;
  const match = readTimeStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 5;
}

// ─── Load Static Data ─────────────────────────────────────────────────────────

function loadArticles() {
  const articlesPath = join(projectRoot, "client/src/data/blogArticles.ts");
  const source = readFileSync(articlesPath, "utf-8");

  const articles = [];
  const articleRegex = /\{\s*slug:\s*"([^"]+)"[\s\S]*?keywords:\s*\[([^\]]*)\]\s*\}/g;
  let match;
  while ((match = articleRegex.exec(source)) !== null) {
    const block = match[0];
    const slug = match[1];

    const titleMatch = block.match(/title:\s*"((?:[^"\\]|\\.)*)"/);
    const excerptMatch = block.match(/excerpt:\s*"((?:[^"\\]|\\.)*)"/);
    const categoryMatch = block.match(/category:\s*"([^"]+)"/);
    const dateMatch = block.match(/date:\s*"([^"]+)"/);
    const readTimeMatch = block.match(/readTime:\s*"([^"]+)"/);
    const imageMatch = block.match(/image:\s*"([^"]+)"/);
    const keywordsStr = match[2];
    const keywords = keywordsStr.match(/"([^"]+)"/g)?.map((k) => k.replace(/"/g, "")) || [];

    articles.push({
      slug,
      title: titleMatch ? titleMatch[1].replace(/\\"/g, '"') : slug,
      excerpt: excerptMatch ? excerptMatch[1].replace(/\\"/g, '"') : "",
      category: categoryMatch ? categoryMatch[1] : "",
      date: dateMatch ? dateMatch[1] : "",
      readTime: readTimeMatch ? readTimeMatch[1] : "5 min",
      image: imageMatch ? imageMatch[1] : "",
      keywords,
    });
  }

  return articles;
}

function loadContentMap() {
  const contentPath = join(projectRoot, "client/src/data/blogContent.ts");
  const source = readFileSync(contentPath, "utf-8");

  // Extract the object body
  const objStart = source.indexOf("{");
  const objEnd = source.lastIndexOf("}");
  const objBody = source.substring(objStart + 1, objEnd);

  const entries = {};
  let i = 0;

  while (i < objBody.length) {
    // Find next key
    const keyMatch = /\"([a-z][a-z0-9-]+)\":\s*/.exec(objBody.substring(i));
    if (!keyMatch) break;

    const key = keyMatch[1];
    const valStart = i + keyMatch.index + keyMatch[0].length;

    if (valStart >= objBody.length) break;

    if (objBody[valStart] === "`") {
      // Backtick template literal
      let end = valStart + 1;
      while (end < objBody.length) {
        if (objBody[end] === "`" && objBody[end - 1] !== "\\") break;
        end++;
      }
      entries[key] = objBody.substring(valStart + 1, end);
      i = end + 1;
    } else if (objBody[valStart] === '"') {
      // Double-quoted string - find the closing quote (handling escapes)
      let end = valStart + 1;
      while (end < objBody.length) {
        if (objBody[end] === '"' && objBody[end - 1] !== "\\") break;
        end++;
      }
      const raw = objBody.substring(valStart, end + 1);
      try {
        entries[key] = JSON.parse(raw);
      } catch {
        // Manual unescape
        entries[key] = raw.slice(1, -1)
          .replace(/\\n/g, "\n")
          .replace(/\\t/g, "\t")
          .replace(/\\"/g, '"')
          .replace(/\\\\/g, "\\");
      }
      i = end + 1;
    } else {
      i = valStart + 1;
    }
  }

  return entries;
}

// ─── Check existing documents in Sanity ──────────────────────────────────────

async function getExistingSlugs() {
  try {
    const existing = await client.fetch(`*[_type == "blog"]{ "slug": slug.current }`);
    return new Set(existing.map((doc) => doc.slug));
  } catch (e) {
    console.warn(`  ⚠️  Could not fetch existing slugs: ${e.message}`);
    return new Set();
  }
}

// ─── Create Sanity document ───────────────────────────────────────────────────

function buildSanityDocument(article, content) {
  const body = content ? markdownToPortableText(content) : [];
  const publishedAt = parseSpanishDate(article.date);
  const readTime = parseReadTime(article.readTime);

  return {
    _type: "blog",
    title: article.title,
    slug: { _type: "slug", current: article.slug },
    excerpt: article.excerpt,
    category: article.category,
    publishedAt,
    readTime,
    keywords: article.keywords,
    body,
    // Store Unsplash image URL for reference (can be replaced with Sanity assets)
    mainImageUrl: article.image,
  };
}

// ─── Main Migration ───────────────────────────────────────────────────────────

async function migrate() {
  console.log("🚀 Starting Sanity CMS migration...");
  console.log(`   Project: ${SANITY_PROJECT_ID}`);
  console.log(`   Dataset: ${SANITY_DATASET}`);
  console.log("");

  // Load static data
  console.log("📖 Loading static blog data...");
  const articles = loadArticles();
  const contentMap = loadContentMap();
  console.log(`   Found ${articles.length} articles`);
  console.log(`   Found ${Object.keys(contentMap).length} content entries`);

  const withContent = articles.filter((a) => contentMap[a.slug]);
  const withoutContent = articles.filter((a) => !contentMap[a.slug]);
  console.log(`   Articles with full content: ${withContent.length}`);
  console.log(`   Articles with metadata only: ${withoutContent.length}`);
  console.log("");

  // Check existing documents
  console.log("🔍 Checking existing Sanity documents...");
  const existingSlugs = await getExistingSlugs();
  console.log(`   ${existingSlugs.size} documents already in Sanity`);
  console.log("");

  // Migrate articles
  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const article of articles) {
    if (existingSlugs.has(article.slug)) {
      console.log(`⏭️  Skipping (already exists): ${article.slug}`);
      skipped++;
      continue;
    }

    const content = contentMap[article.slug];
    const contentStatus = content ? `${Math.round(content.length / 1000)}k chars` : "metadata only";

    try {
      const doc = buildSanityDocument(article, content);
      await client.create(doc);
      console.log(`✅ Created: ${article.slug} (${contentStatus})`);
      created++;
    } catch (e) {
      console.error(`❌ Error creating ${article.slug}: ${e.message}`);
      errors++;
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  console.log("");
  console.log("─────────────────────────────────────────────");
  console.log(`✅ Migration complete!`);
  console.log(`   Created: ${created}`);
  console.log(`   Skipped: ${skipped} (already existed)`);
  console.log(`   Errors:  ${errors}`);
  console.log("");

  if (created > 0) {
    console.log("📝 Next steps:");
    console.log("   1. Open Sanity Studio to review the migrated articles");
    console.log("   2. The website will now serve content from Sanity CMS");
    console.log("   3. Articles with 'metadata only' have no body content yet");
  }
}

migrate().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
