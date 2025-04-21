export interface ISearchNewsResponse {
  offset: number;
  number: number;
  available: number;
  news: ISearchNewsArticleResponse[];
}

export interface ISearchNewsArticleResponse {
  id: number;
  title: string;
  text: string;
  summary: string;
  url: string;
  image: string;
  video: string | null;
  publish_date: string;
  author: string | null;
  language: TSearchLanguage;
  category: TSearchCategory;
  source_country: TSearchSourceCountry;
}

export interface IRetrieveArticleResponse {
  news: ISearchNewsArticleResponse[];
}

export type TSearchCategory =
  | 'politics'
  | 'sports'
  | 'business'
  | 'technology'
  | 'entertainment'
  | 'health'
  | 'science'
  | 'lifestyle'
  | 'travel'
  | 'culture'
  | 'education'
  | 'environment'
  | 'other';
export type TSearchLanguage = 'en' | 'ru';
export type TSearchSourceCountry = 'us' | 'ru' | 'kz';
export type TSearchSort = 'publish_date';
export type TSearchSortDirection = 'ASC' | 'DESC';
export type TSearchTextMatch = 'title' | 'content';

export interface INewsListItemMessageResponse {
  data: ISearchNewsArticleResponse;
  storage: 'viewed' | 'favorite';
  action: 'add' | 'remove';
}
