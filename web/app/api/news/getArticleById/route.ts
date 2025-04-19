export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams.toString();
    const endpoint = `https://api.worldnewsapi.com/retrieve-news?${
      searchParams ? '&' + searchParams : ''
    }`;

    const res = await fetch(endpoint, {
      headers: { 'x-api-key': process.env.NEWS_API_KEY! },
    });

    console.log(res);

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
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: 'Internal Server Error',
        message: error?.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
