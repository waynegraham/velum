"use client";

import { useEffect, useMemo, useState } from "react";
import { parseManifest, type ManifestModel } from "@velum/core";

interface UseManifestState {
  manifest: ManifestModel | null;
  isLoading: boolean;
  error: Error | null;
}

export function useManifest(url: string): UseManifestState {
  const [raw, setRaw] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to load manifest: ${response.status}`);
        }

        const json = (await response.json()) as unknown;
        if (!cancelled) setRaw(json);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error("Unknown error"));
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [url]);

  const manifest = useMemo(() => (raw ? parseManifest(raw) : null), [raw]);

  return { manifest, isLoading, error };
}