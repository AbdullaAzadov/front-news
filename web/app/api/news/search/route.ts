export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams.toString();
    const endpoint = `https://api.worldnewsapi.com/search-news?${
      searchParams ? '&' + searchParams : ''
    }`;

    console.log(endpoint);

    const res = await fetch(endpoint, {
      headers: { 'x-api-key': process.env.NEWS_API_KEY! },
    });

    const data = await res.json();

    if (!res.ok) {
      return new Response(
        JSON.stringify({
          error: `Failed to fetch news`,
          statusCode: res.status,
          details: data,
        }),
        {
          status: res.status,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        message: error,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
