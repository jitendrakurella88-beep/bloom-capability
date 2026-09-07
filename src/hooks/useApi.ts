import { useCallback, useEffect, useState } from "react";

/** Small fetch-state helper so every page gets loading / error / retry for free. */
export function useApi<T>(fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const run = useCallback(fetcher, deps);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);
    run()
      .then((res) => alive && setData(res))
      .catch((e: unknown) => alive && setError(e instanceof Error ? e.message : "Request failed"))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [run, nonce]);

  return { data, loading, error, retry: () => setNonce((n) => n + 1) };
}
