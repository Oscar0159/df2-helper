type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

const memoryCache = new Map<string, CacheEntry<unknown>>();

export function getFromCache<T>(key: string, ttl: number): T | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > ttl;
  return isExpired ? null : (entry.data as T);
}

export function setToCache<T>(key: string, data: T): void {
  memoryCache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

export function clearCache(key?: string): void {
  if (key) memoryCache.delete(key);
  else memoryCache.clear();
}
