/**
 * Tests for Sanity CMS integration
 * Validates the sanity.ts helper module functions
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// ─── Mock @sanity/client ──────────────────────────────────────────────────────
// Use vi.hoisted to ensure mockFetch is available before vi.mock is hoisted

const { mockFetch } = vi.hoisted(() => ({
  mockFetch: vi.fn(),
}));

vi.mock("@sanity/client", () => ({
  createClient: vi.fn(() => ({
    fetch: mockFetch,
  })),
}));

// ─── Import after mocking ─────────────────────────────────────────────────────

import {
  getAllBlogArticles,
  getBlogArticleBySlug,
  getBlogArticlesByCategory,
  type BlogArticleSummary,
  type BlogArticleDetail,
} from "./sanity";

// ─── Test Data ────────────────────────────────────────────────────────────────

const mockSanityPost = {
  _id: "test-id-1",
  _type: "blog",
  title: "Comercio Conversacional: Cómo los Agentes de IA Transforman las Ventas B2B",
  slug: { current: "comercio-conversacional-agentes-ia-ventas-b2b-2026" },
  excerpt: "Descubre cómo los agentes de IA autónomos están revolucionando las ventas B2B.",
  category: "Inteligencia Artificial",
  publishedAt: "2026-02-17",
  readTime: 8,
  keywords: ["IA", "B2B", "comercio conversacional", "agentes"],
  mainImage: {
    asset: { url: "https://images.unsplash.com/photo-test" },
    alt: "Agentes de IA en ventas B2B",
  },
  body: [
    {
      _type: "block",
      _key: "block1",
      style: "normal",
      children: [{ _type: "span", text: "El panorama de las ventas B2B está cambiando.", marks: [] }],
      markDefs: [],
    },
    {
      _type: "block",
      _key: "block2",
      style: "h2",
      children: [{ _type: "span", text: "¿Qué Son los Agentes de IA para Ventas?", marks: [] }],
      markDefs: [],
    },
  ],
};

const mockSanityPost2 = {
  _id: "test-id-2",
  _type: "blog",
  title: "Guía Completa de Expansión Digital para Empresas B2B en 2026",
  slug: { current: "guia-expansion-digital-b2b-2026" },
  excerpt: "Roadmap completo con estrategias probadas para empresas que buscan expandirse digitalmente.",
  category: "Expansión Digital",
  publishedAt: "2026-02-13",
  readTime: 8,
  keywords: ["expansión digital", "B2B", "2026"],
  mainImage: undefined,
  body: [],
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("Sanity CMS Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllBlogArticles", () => {
    it("should return an array of mapped blog article summaries", async () => {
      mockFetch.mockResolvedValueOnce([mockSanityPost, mockSanityPost2]);

      const articles = await getAllBlogArticles();

      expect(mockFetch).toHaveBeenCalledOnce();
      expect(Array.isArray(articles)).toBe(true);
      expect(articles).toHaveLength(2);
    });

    it("should map Sanity document fields to BlogArticleSummary shape", async () => {
      mockFetch.mockResolvedValueOnce([mockSanityPost]);

      const articles = await getAllBlogArticles();
      const article = articles[0];

      expect(article.id).toBe("test-id-1");
      expect(article.title).toBe(mockSanityPost.title);
      expect(article.slug).toBe("comercio-conversacional-agentes-ia-ventas-b2b-2026");
      expect(article.excerpt).toBe(mockSanityPost.excerpt);
      expect(article.category).toBe("Inteligencia Artificial");
      expect(article.date).toBe("2026-02-17");
      expect(article.readTime).toBe(8);
      expect(article.keywords).toEqual(["IA", "B2B", "comercio conversacional", "agentes"]);
      expect(article.imageUrl).toBe("https://images.unsplash.com/photo-test");
    });

    it("should handle articles without mainImage gracefully", async () => {
      mockFetch.mockResolvedValueOnce([mockSanityPost2]);

      const articles = await getAllBlogArticles();
      const article = articles[0];

      expect(article.imageUrl).toBeUndefined();
    });

    it("should return empty array when no articles exist", async () => {
      mockFetch.mockResolvedValueOnce([]);

      const articles = await getAllBlogArticles();

      expect(articles).toHaveLength(0);
    });

    it("should use a GROQ query ordered by publishedAt desc", async () => {
      mockFetch.mockResolvedValueOnce([]);

      await getAllBlogArticles();

      const [query] = mockFetch.mock.calls[0];
      expect(query).toContain("order(publishedAt desc)");
      expect(query).toContain('_type == "blog"');
    });

    it("should propagate Sanity API errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Sanity connection refused"));

      await expect(getAllBlogArticles()).rejects.toThrow("Sanity connection refused");
    });
  });

  describe("getBlogArticleBySlug", () => {
    it("should return a BlogArticleDetail with body when found", async () => {
      mockFetch.mockResolvedValueOnce(mockSanityPost);

      const article = await getBlogArticleBySlug("comercio-conversacional-agentes-ia-ventas-b2b-2026");

      expect(article).not.toBeNull();
      expect(article?.title).toBe(mockSanityPost.title);
      expect(article?.slug).toBe("comercio-conversacional-agentes-ia-ventas-b2b-2026");
    });

    it("should include body (Portable Text blocks) in the detail response", async () => {
      mockFetch.mockResolvedValueOnce(mockSanityPost);

      const article = await getBlogArticleBySlug("comercio-conversacional-agentes-ia-ventas-b2b-2026");

      expect(article?.body).toBeDefined();
      expect(Array.isArray(article?.body)).toBe(true);
      expect((article?.body as unknown[]).length).toBe(2);
    });

    it("should return null when article is not found", async () => {
      mockFetch.mockResolvedValueOnce(null);

      const article = await getBlogArticleBySlug("non-existent-slug");

      expect(article).toBeNull();
    });

    it("should pass the slug as a GROQ parameter", async () => {
      mockFetch.mockResolvedValueOnce(mockSanityPost);

      await getBlogArticleBySlug("test-slug");

      const [query, params] = mockFetch.mock.calls[0];
      expect(query).toContain("slug.current == $slug");
      expect(params).toEqual({ slug: "test-slug" });
    });

    it("should propagate Sanity API errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network timeout"));

      await expect(getBlogArticleBySlug("test-slug")).rejects.toThrow("Network timeout");
    });
  });

  describe("getBlogArticlesByCategory", () => {
    it("should return articles filtered by category", async () => {
      mockFetch.mockResolvedValueOnce([mockSanityPost]);

      const articles = await getBlogArticlesByCategory("Inteligencia Artificial");

      expect(mockFetch).toHaveBeenCalledOnce();
      expect(articles).toHaveLength(1);
      expect(articles[0].category).toBe("Inteligencia Artificial");
    });

    it("should pass the category as a GROQ parameter", async () => {
      mockFetch.mockResolvedValueOnce([]);

      await getBlogArticlesByCategory("Marketing Digital B2B");

      const [query, params] = mockFetch.mock.calls[0];
      expect(query).toContain("category == $category");
      expect(params).toEqual({ category: "Marketing Digital B2B" });
    });

    it("should return empty array when no articles match the category", async () => {
      mockFetch.mockResolvedValueOnce([]);

      const articles = await getBlogArticlesByCategory("Non Existent Category");

      expect(articles).toHaveLength(0);
    });

    it("should return mapped BlogArticleSummary objects", async () => {
      mockFetch.mockResolvedValueOnce([mockSanityPost]);

      const articles = await getBlogArticlesByCategory("Inteligencia Artificial");

      // Verify it returns summary (no body field)
      expect(articles[0]).not.toHaveProperty("body");
      expect(articles[0]).toHaveProperty("id");
      expect(articles[0]).toHaveProperty("slug");
    });
  });
});
