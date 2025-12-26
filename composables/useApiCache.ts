interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

const cache = new Map<string, CacheEntry<any>>();

export function useApiCache() {
  const getCached = <T>(key: string): T | null => {
    const entry = cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > entry.ttl) {
      cache.delete(key);
      return null;
    }
    return entry.data;
  };

  const setCache = <T>(key: string, data: T, ttl = 5 * 60 * 1000) => {
    cache.set(key, { data, timestamp: Date.now(), ttl });
  };

  const invalidate = (key: string) => cache.delete(key);
  const invalidateAll = () => cache.clear();

  return { getCached, setCache, invalidate, invalidateAll };
}
