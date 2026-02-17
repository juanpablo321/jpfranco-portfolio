import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("seoAnalyzer", () => {
  it("analyze returns a valid result structure for a given URL", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.seoAnalyzer.analyze({ url: "example.com" });

    // Check top-level structure
    expect(result).toHaveProperty("url");
    expect(result).toHaveProperty("domain");
    expect(result).toHaveProperty("overallScore");
    expect(result).toHaveProperty("analyzedAt");
    expect(result).toHaveProperty("crawl");
    expect(result).toHaveProperty("pageSpeed");
    expect(result).toHaveProperty("similarWeb");

    // Check domain extraction
    expect(result.domain).toBe("example.com");

    // Check URL normalization
    expect(result.url).toMatch(/^https?:\/\//);

    // Check score is a number between 0-100
    expect(typeof result.overallScore).toBe("number");
    expect(result.overallScore).toBeGreaterThanOrEqual(0);
    expect(result.overallScore).toBeLessThanOrEqual(100);

    // Check crawl structure
    expect(result.crawl).toHaveProperty("hasHttps");
    expect(result.crawl).toHaveProperty("hasViewport");
    expect(result.crawl).toHaveProperty("hasRobotsTxt");
    expect(result.crawl).toHaveProperty("hasSitemap");
    expect(result.crawl).toHaveProperty("hasFavicon");
    expect(result.crawl).toHaveProperty("wordCount");
    expect(result.crawl).toHaveProperty("totalImages");
    expect(result.crawl).toHaveProperty("issues");
    expect(Array.isArray(result.crawl.issues)).toBe(true);

    // Check pageSpeed structure
    expect(result.pageSpeed).toHaveProperty("performanceScore");
    expect(result.pageSpeed).toHaveProperty("seoScore");
    expect(result.pageSpeed).toHaveProperty("accessibilityScore");

    // Check similarWeb structure
    expect(result.similarWeb).toHaveProperty("globalRank");
    expect(result.similarWeb).toHaveProperty("bounceRate");
    expect(result.similarWeb).toHaveProperty("totalVisits");
    expect(result.similarWeb).toHaveProperty("trafficByCountry");
    expect(result.similarWeb).toHaveProperty("trafficSources");
  }, 60000); // 60s timeout for external API calls

  it("analyze rejects empty URL", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(caller.seoAnalyzer.analyze({ url: "" })).rejects.toThrow();
  });

  it("analyze handles URL with protocol prefix", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.seoAnalyzer.analyze({ url: "https://example.com" });

    expect(result.domain).toBe("example.com");
    expect(result.url).toBe("https://example.com");
  }, 60000);
});
