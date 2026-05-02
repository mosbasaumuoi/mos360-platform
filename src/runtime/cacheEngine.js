const memoryCache = new Map();

export const cacheEngine = {

  get(key) {

    const item = memoryCache.get(key);

    if (!item) {
      return null;
    }

    if (Date.now() > item.expireAt) {
      memoryCache.delete(key);
      return null;
    }

    return item.value;
  },

  set(key, value, ttl = 60000) {

    memoryCache.set(key, {
      value,
      expireAt: Date.now() + ttl,
      createdAt: Date.now(),
    });
  },

  delete(key) {
    memoryCache.delete(key);
  },

  clear() {
    memoryCache.clear();
  },

  stats() {

    return {
      size: memoryCache.size,
      keys: [...memoryCache.keys()],
    };
  },

};
