import { ISearchNewsArticleResponse } from '../api/types';

// RN API TYPES
export type IRNResponseQueries =
  | 'getViewedAndFavoriteNewsIds'
  | 'getFavoriteNews'
  | 'getViewedNews'
  | 'removeFromFavorite'
  | 'addToFavorite'
  | 'addToViewed';

export interface IRNResponse<T> {
  query: IRNResponseQueries;
  data: T;
}

export interface IRNResponseGetViewedAndFavoriteNewsIds {
  favoriteIds: ISearchNewsArticleResponse['id'][];
  viewedIds: ISearchNewsArticleResponse['id'][];
}

export interface IRNResponseRemoveById {
  id: ISearchNewsArticleResponse['id'];
}

export function reactNativePostMessage<T>(data: IRNResponse<T> | string) {
  if (typeof window !== 'undefined' && window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  }
}

export function addArticleToFavorite(data: ISearchNewsArticleResponse) {
  const message: IRNResponse<ISearchNewsArticleResponse> = {
    query: 'addToFavorite',
    data: data,
  };
  reactNativePostMessage(message);
}

export function removeArticleFromFavorite(
  id: ISearchNewsArticleResponse['id']
) {
  const message: IRNResponse<IRNResponseRemoveById> = {
    data: { id: id },
    query: 'removeFromFavorite',
  };
  reactNativePostMessage(message);
}

export function addArticleToViewed(data: ISearchNewsArticleResponse) {
  const message: IRNResponse<ISearchNewsArticleResponse> = {
    query: 'addToViewed',
    data: data,
  };
  reactNativePostMessage(message);
}
