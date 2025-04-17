export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams.toString();

    const endpoint = `https://newsapi.org/v2/everything?${
      searchParams ? `&${searchParams}` : "q=apple"
    }`;

    const apiRes = await fetch(endpoint, {
      headers: {
        "X-Api-Key": process.env.NEWS_API_KEY!,
      },
    });

    const data = await apiRes.json();

    if (!apiRes.ok) {
      console.error("Ошибка от NewsAPI:", data);
      return new Response(JSON.stringify({ error: data }), {
        status: apiRes.status,
      });
    }

    return Response.json(data);
  } catch (error) {
    console.error("Ошибка в API:", error);
    return new Response(JSON.stringify({ error: "Ошибка на сервере" }), {
      status: 500,
    });
  }
}
