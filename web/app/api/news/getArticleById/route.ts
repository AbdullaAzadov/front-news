import { API_KEYS, pickBestKey, rotateKey } from '@/shared/api/apiKeyManager';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams.toString();
  const endpoint = `https://api.worldnewsapi.com/retrieve-news?${
    searchParams ? '&' + searchParams : ''
  }`;
  let attempt = 0;
  const maxAttempts = API_KEYS.length;

  while (attempt < maxAttempts) {
    const keyInfo = pickBestKey();
    const res = await fetch(endpoint, {
      headers: { 'x-api-key': keyInfo.key },
    });
    const data = await res.json();

    // Update key info
    const left = res.headers.get('X-API-Quota-Left');
    keyInfo.remaining = left !== null ? Number(left) : 0;

    if (res.ok) {
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if ([401, 402, 429].includes(res.status)) {
      rotateKey();
      attempt++;
      continue;
    }

    return new Response(
      JSON.stringify({
        error: 'Failed to fetch news',
        statusCode: res.status,
        details: data,
      }),
      {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  return new Response(
    JSON.stringify({ error: 'All API keys have reached their rate limit' }),
    { status: 429, headers: { 'Content-Type': 'application/json' } }
  );
}
