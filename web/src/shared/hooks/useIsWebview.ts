'use client';
import { useSearchParams } from 'next/navigation';

export function useIsWebview() {
  const params = useSearchParams();
  const raw = params?.get('platform') as string | null;

  const isWebview = params?.get('webview') === 'true';
  const platform = ['ios', 'android'].includes(raw ?? '') ? raw : undefined;

  return { isWebview, platform };
}
