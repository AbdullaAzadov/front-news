import { IRetrieveArticleResponse } from './types';

export async function fetchSearchNews(
  id: string
): Promise<IRetrieveArticleResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/getArticleById?ids=${id}}`
  );
  const data = await res.json();
  return data;
}
