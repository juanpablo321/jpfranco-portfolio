import { describe, it, expect, beforeEach, vi } from "vitest";
import { MemoryCache, similarWebCache, pageSpeedCache } from "./cache";

describe("MemoryCache", () => {
  let cache: MemoryCache<string>;

  beforeEach(() => {
    cache = new MemoryCache<string>({ ttlMs: 1000, maxEntries: 5 });
  });

  it("should store and retrieve values", () => {
    cache.set("key1", "value1");
    expect(cache.get("key1")).toBe("value1");
  });

  it("should return null for non-existent keys", () => {
    expect(cache.get("nonexistent")).toBeNull();
  });

  it("should return null for expired entries", () => {
    cache.set("key1", "value1", 1); // 1ms TTL
    // Busy wait for expiration
    const start = Date.now();
    while (Date.now() - start < 10) {
      // busy wait 10ms to ensure expiration
    }
    expect(cache.get("key1")).toBeNull();
  });

  it("should report has() correctly", () => {
    cache.set("key1", "value1");
    expect(cache.has("key1")).toBe(true);
    expect(cache.has("nonexistent")).toBe(false);
  });

  it("should delete entries", () => {
    cache.set("key1", "value1");
    expect(cache.delete("key1")).toBe(true);
    expect(cache.get("key1")).toBeNull();
  });

  it("should clear all entries", () => {
    cache.set("key1", "value1");
    cache.set("key2", "value2");
    cache.clear();
    expect(cache.get("key1")).toBeNull();
    expect(cache.get("key2")).toBeNull();
    expect(cache.size).toBe(0);
  });

  it("should evict oldest entry when at max capacity", () => {
    for (let i = 1; i <= 5; i++) {
      cache.set(`key${i}`, `value${i}`);
    }
    // Adding a 6th entry should evict key1 (the oldest)
    cache.set("key6", "value6");
    expect(cache.get("key1")).toBeNull();
    expect(cache.get("key6")).toBe("value6");
  });

  it("should report correct stats", () => {
    cache.set("key1", "value1");
    cache.set("key2", "value2");
    const stats = cache.stats();
    expect(stats.entries).toBe(2);
    expect(stats.maxEntries).toBe(5);
    expect(stats.ttlMs).toBe(1000);
  });

  it("should use default TTL of 24 hours when not specified", () => {
    const defaultCache = new MemoryCache();
    const stats = defaultCache.stats();
    expect(stats.ttlMs).toBe(24 * 60 * 60 * 1000);
    expect(stats.maxEntries).toBe(500);
  });

  it("should allow custom TTL per entry", () => {
    // Set with very long TTL
    cache.set("longLived", "data", 60000);
    // Set with very short TTL
    cache.set("shortLived", "data", 1);

    const start = Date.now();
    while (Date.now() - start < 5) {
      // busy wait 5ms
    }

    expect(cache.get("longLived")).toBe("data");
    expect(cache.get("shortLived")).toBeNull();
  });
});

describe("Singleton caches", () => {
  it("similarWebCache should have 24h TTL and 500 max entries", () => {
    const stats = similarWebCache.stats();
    expect(stats.ttlMs).toBe(24 * 60 * 60 * 1000);
    expect(stats.maxEntries).toBe(500);
  });

  it("pageSpeedCache should have 12h TTL and 200 max entries", () => {
    const stats = pageSpeedCache.stats();
    expect(stats.ttlMs).toBe(12 * 60 * 60 * 1000);
    expect(stats.maxEntries).toBe(200);
  });

  it("similarWebCache should store and retrieve complex objects", () => {
    const testData = {
      metrics: { domain: "test.com", visits: 1000 } as Record<string, unknown>,
      apiAvailable: true,
      cachedAt: new Date().toISOString(),
    };
    similarWebCache.set("test:test.com", testData);
    const retrieved = similarWebCache.get("test:test.com");
    expect(retrieved).toEqual(testData);
    expect(retrieved?.apiAvailable).toBe(true);
    expect(retrieved?.cachedAt).toBeDefined();
    // Cleanup
    similarWebCache.delete("test:test.com");
  });
});
