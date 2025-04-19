'use client';
import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (!key) return;
    get().then(setData);
  }, [key]);

  async function get(): Promise<T | null> {
    const stored = localStorage.getItem(key);
    if (stored === null) {
      localStorage.setItem(key, JSON.stringify(null));
      return null;
    } else {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing localStorage:', e);
        return null;
      }
    }
  }

  const set = useCallback(
    (value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
      setData(value);
    },
    [key]
  );

  const remove = useCallback(() => {
    localStorage.removeItem(key);
    setData(null);
  }, [key]);

  const refresh = useCallback(() => {
    if (!key) return;
    get().then(setData);
  }, [key]);

  return { data, set, remove, refresh, get };
}
