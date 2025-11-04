// Simple in-memory cache for chapter data
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

class CacheService {
  private cache = new Map<string, CacheEntry<any>>();

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    
    const age = Date.now() - entry.timestamp;
    if (age > CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data as T;
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  clear(): void {
    this.cache.clear();
  }

  // Prefetch helper - doesn't wait, just triggers cache
  async prefetch<T>(key: string, fetcher: () => Promise<T>): Promise<void> {
    if (this.get(key)) return; // Already cached
    
    fetcher().then(data => this.set(key, data)).catch(() => {
      // Silently fail prefetch
    });
  }
}

export const cacheService = new CacheService();

