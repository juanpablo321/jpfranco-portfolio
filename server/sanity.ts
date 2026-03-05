import { createClient } from "@sanity/client";
import { ENV } from "./_core/env";

export const sanityClient = createClient({
  projectId: ENV.sanityProjectId,
  dataset: ENV.sanityDataset,
  apiVersion: "2024-01-01",
  token: ENV.sanityApiToken,
  useCdn: false, // Use live API for fresh content
});

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SanityBlogArticle {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: number;
  keywords: string[];
  mainImage?: {
    asset: { url: string };
    alt?: string;
  };
  body?: unknown; // Portable Text blocks
}

export interface BlogArticleSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  keywords: string[];
  imageUrl?: string;
}

export interface BlogArticleDetail extends BlogArticleSummary {
  body: unknown; // Portable Text blocks for rendering
}

// ─── GROQ Queries ─────────────────────────────────────────────────────────────

const ARTICLE_SUMMARY_FIELDS = `
  _id,
  title,
  slug,
  excerpt,
  category,
  publishedAt,
  readTime,
  keywords,
  mainImage { asset->{ url }, alt }
`;

export async function getAllBlogArticles(): Promise<BlogArticleSummary[]> {
  const query = `*[_type == "blog"] | order(publishedAt desc) {
    ${ARTICLE_SUMMARY_FIELDS}
  }`;

  const results: SanityBlogArticle[] = await sanityClient.fetch(query);
  return results.map(mapToSummary);
}

export async function getBlogArticleBySlug(
  slug: string
): Promise<BlogArticleDetail | null> {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    ${ARTICLE_SUMMARY_FIELDS},
    body
  }`;

  const result: SanityBlogArticle | null = await sanityClient.fetch(query, {
    slug,
  });

  if (!result) return null;
  return mapToDetail(result);
}

export async function getBlogArticlesByCategory(
  category: string
): Promise<BlogArticleSummary[]> {
  const query = `*[_type == "blog" && category == $category] | order(publishedAt desc) {
    ${ARTICLE_SUMMARY_FIELDS}
  }`;

  const results: SanityBlogArticle[] = await sanityClient.fetch(query, {
    category,
  });
  return results.map(mapToSummary);
}

// ─── Mappers ──────────────────────────────────────────────────────────────────

function mapToSummary(article: SanityBlogArticle): BlogArticleSummary {
  return {
    id: article._id,
    title: article.title,
    slug: article.slug?.current ?? "",
    excerpt: article.excerpt ?? "",
    category: article.category ?? "",
    date: article.publishedAt ?? "",
    readTime: article.readTime ?? 5,
    keywords: article.keywords ?? [],
    imageUrl: article.mainImage?.asset?.url,
  };
}

function mapToDetail(article: SanityBlogArticle): BlogArticleDetail {
  return {
    ...mapToSummary(article),
    body: article.body ?? [],
  };
}
