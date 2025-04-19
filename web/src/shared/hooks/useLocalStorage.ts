'use client';
import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage<T>(key: string) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored === null) {
      localStorage.setItem(key, JSON.stringify(null));
      setData(null);
    } else {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing localStorage:', e);
        setData(null);
      }
    }
  }, [key]);

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
    const stored = localStorage.getItem(key);
    if (stored === null) {
      localStorage.setItem(key, JSON.stringify(null));
      setData(null);
    } else {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        console.error('Error parsing localStorage:', e);
        setData(null);
      }
    }
  }, [key]);

  return { data, set, remove, refresh };
}
