import { useEffect, useState } from "react";

export const useAsync = <T>(
  promise: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isLoading = !data && !error;

  useEffect(() => {
    let isSubscribed = true;
    (async () => {
      try {
        const result = await promise();
        if (result && isSubscribed) setData(result);
      } catch (e) {
        setError((e as any).message);
      }
    })();

    return () => {
      isSubscribed = false;
    };
  }, dependencies);

  return { data, isLoading, error, setData };
};
