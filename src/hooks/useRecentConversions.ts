import { useCallback, useEffect, useState } from "react";

export interface RecentItem {
  text: string;
  at: number;
}

/** Stores the last few conversions locally in the visitor's own browser (localStorage). */
export function useRecentConversions(key: string, limit = 5) {
  const storageKey = `converthub:recent:${key}`;
  const [items, setItems] = useState<RecentItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setItems(JSON.parse(raw) as RecentItem[]);
    } catch {
      setItems([]);
    }
  }, [storageKey]);

  const add = useCallback(
    (text: string) => {
      setItems((prev) => {
        const next = [{ text, at: Date.now() }, ...prev.filter((p) => p.text !== text)].slice(0, limit);
        try {
          localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {
          /* storage unavailable */
        }
        return next;
      });
    },
    [storageKey, limit]
  );

  const clear = useCallback(() => {
    setItems([]);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  return { items, add, clear };
}
