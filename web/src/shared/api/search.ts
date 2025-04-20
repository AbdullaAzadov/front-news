import { getBaseUrl, propToParam } from '../utils/fetchHelpers';
import {
  ISearchNewsResponse,
  TSearchLanguage,
  TSearchCategory,
  TSearchSourceCountry,
  TSearchSort,
  TSearchSortDirection,
  TSearchTextMatch,
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
  'text-match-indexes'?: TSearchTextMatch;
}

export async function fetchSearchNews(
  params: IFetchSearchProps,
  paramsInString?: string
): Promise<ISearchNewsResponse> {
  const country: TSearchSourceCountry = 'us';
  let searchParams = '?';

  Object.keys(params).forEach((key) => {
    const defaultValue = key === 'source-country' ? country : undefined;

    searchParams += propToParam(
      params,
      key as keyof IFetchSearchProps,
      defaultValue
    );
  });

  const res = await fetch(
    `${getBaseUrl()}/api/news/search${searchParams}${paramsInString}`
  );
  const data = await res.json();
  return data;
}
