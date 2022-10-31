export const createCache = <T = any>() => {
  const cache: Record<string, T> = {};

  return async (key: string, promise: () => Promise<T>) => {
    if (!cache[key]) {
      cache[key] = await promise();
    }

    return cache[key];
  };
};
