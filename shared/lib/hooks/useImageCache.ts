export function useImageCache(cacheKey: string = 'app-images-cache') {
  const cacheImage = async (url: string) => {
    try {
      const cache = await caches.open(cacheKey);
      await cache.add(url);
    } catch (error) {
      console.error('Failed to cache image:', error);
    }
  };

  const getCachedImage = async (url: string) => {
    try {
      const cache = await caches.open(cacheKey);
      const response = await cache.match(url);
      if (response) {
        return URL.createObjectURL(await response.blob());
      }
      return url;
    } catch (error) {
      return url;
    }
  };

  return { cacheImage, getCachedImage };
}
