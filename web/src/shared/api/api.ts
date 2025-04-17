import { ISearchNewsResponse } from './types';

type FetchMainPageProps = {
  page: number;
  q?: string;
  pageSize?: number;
  language?: string;
};

export async function fetchMainPageNews({
  q = 'a',
  pageSize = 20,
  language = 'en',
  page,
}: FetchMainPageProps): Promise<ISearchNewsResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/news?q=${q}&language=${language}&page=${page}&pageSize=${pageSize}`
  );
  const data = await res.json();
  console.log(data);

  return data;
}

type FetchSearchProps = {
  page: number;
  q: string;
  pageSize?: number;
  language?: string;
  from?: string;
  to?: string;
  sortBy?: string;
};

export async function fetchSearchNews({
  q,
  pageSize = 20,
  language = 'en',
  page,
}: FetchSearchProps): Promise<ISearchNewsResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/news?q=${q}&language=${language}&page=${page}&pageSize=${pageSize}`
  );
  const data = await res.json();
  console.log(data);

  return data;
}
