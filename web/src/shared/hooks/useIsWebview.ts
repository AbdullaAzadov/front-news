'use client';
import { useSearchParams } from 'next/navigation';

export function useIsWebview() {
  const params = useSearchParams();
  const rawNotify = params?.get('notify') as string | null;
  const rawPlatform = params?.get('platform') as string | null;

  const isWebview = params?.get('webview') === 'true';
  const platform = ['ios', 'android'].includes(rawPlatform ?? '')
    ? rawPlatform
    : undefined;
  const notify = rawNotify === 'true';

  return { isWebview, platform, notify };
}
