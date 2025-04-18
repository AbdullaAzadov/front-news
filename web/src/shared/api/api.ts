import {
  ISearchNewsResponse,
  TSearchLanguage,
  TSearchCategory,
  TSearchSourceCountry,
  TSearchSort,
  TSearchSortDirection,
} from './types';

export interface IFetchSearchProps {
  text?: string;
  categories?: TSearchCategory;
  'source-country'?: TSearchSourceCountry;
  language?: TSearchLanguage;
  'earliest-publish-date'?: Date;
  'latest-publish-date'?: Date;
  sort?: TSearchSort;
  'sort-direction'?: TSearchSortDirection;
  offset?: number;
  number?: number;
}

export async function fetchSearchNews(
  params: IFetchSearchProps
): Promise<ISearchNewsResponse> {
  const lang: TSearchLanguage = 'en';
  const country: TSearchSourceCountry = 'us';
  let searchParams = '?';

  if (params.text) searchParams += `text=${params.text}&`;
  if (params.categories) searchParams += `categories=${params.categories}&`;
  searchParams += `source-country=${params['source-country'] ?? country}&`;
  searchParams += `language=${params.language ?? lang}&`;
  if (params['earliest-publish-date'])
    searchParams += `earliest-publish-date=${params['earliest-publish-date']}&`;
  if (params['latest-publish-date'])
    searchParams += `latest-publish-date=${params['latest-publish-date']}&`;
  if (params.sort) searchParams += `sort=${params.sort}&`;
  if (params['sort-direction'])
    searchParams += `sort-direction=${params['sort-direction']}&`;
  if (params.offset) searchParams += `offset=${params.offset}&`;
  if (params.number) searchParams += `number=${params.number}&`;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/search${searchParams}`
  );
  const data = await res.json();
  return data;
}
