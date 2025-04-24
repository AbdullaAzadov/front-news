import { API_KEYS, getCurrentKey, rotateKey } from '@/shared/api/apiKeyManager';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams.toString();
  const endpoint = `https://api.worldnewsapi.com/retrieve-news?${
    searchParams ? '&' + searchParams : ''
  }`;
  let attempt = 0;
  const maxAttempts = API_KEYS.length;

  while (attempt < maxAttempts) {
    const key = getCurrentKey();
    const res = await fetch(endpoint, {
      headers: { 'x-api-key': key },
    });
    const data = await res.json();

    if (res.ok) {
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (res.status === 401 || res.status === 402 || res.status === 429) {
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
      { status: res.status, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ error: 'All API keys have reached their rate limit' }),
    { status: 429, headers: { 'Content-Type': 'application/json' } }
  );
}
