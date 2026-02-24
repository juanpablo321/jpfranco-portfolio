/**
 * In-memory cache with configurable TTL.
 * General-purpose cache for API responses.
 *
 * Cache is per-process and resets on server restart.
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

export class MemoryCache<T = unknown> {
  private store = new Map<string, CacheEntry<T>>();
  private readonly defaultTtlMs: number;
  private readonly maxEntries: number;

  constructor(options?: { ttlMs?: number; maxEntries?: number }) {
    this.defaultTtlMs = options?.ttlMs ?? 24 * 60 * 60 * 1000; // 24 hours
    this.maxEntries = options?.maxEntries ?? 500;
  }

  get(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return entry.data;
  }

  set(key: string, data: T, ttlMs?: number): void {
    // Evict oldest entries if at capacity
    if (this.store.size >= this.maxEntries) {
      const oldestKey = this.store.keys().next().value;
      if (oldestKey) this.store.delete(oldestKey);
    }

    this.store.set(key, {
      data,
      expiresAt: Date.now() + (ttlMs ?? this.defaultTtlMs),
    });
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    return this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  get size(): number {
    // Clean expired entries first
    this.cleanup();
    return this.store.size;
  }

  /** Remove all expired entries */
  cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];
    this.store.forEach((entry, key) => {
      if (now > entry.expiresAt) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach((key) => this.store.delete(key));
  }

  /** Get cache stats for monitoring */
  stats(): { entries: number; maxEntries: number; ttlMs: number } {
    this.cleanup();
    return {
      entries: this.store.size,
      maxEntries: this.maxEntries,
      ttlMs: this.defaultTtlMs,
    };
  }
}

// ─── Singleton caches ──────────────────────────────────────────────────────

/** PageSpeed API response cache (12h TTL, max 200 URLs) */
export const pageSpeedCache = new MemoryCache<Record<string, unknown>>({
  ttlMs: 12 * 60 * 60 * 1000, // 12 hours
  maxEntries: 200,
});
