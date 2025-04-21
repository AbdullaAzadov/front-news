import {
  INewsListItemMessageResponse,
  ISearchNewsArticleResponse,
} from '../api/types';

export function reactNativePostMessage<T>(data: T) {
  if (typeof window !== 'undefined' && window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  }
}

export function addArticleToFavorite(data: ISearchNewsArticleResponse) {
  const message = {
    data: data,
    storage: 'favorite',
    action: 'add',
  } as INewsListItemMessageResponse;
  reactNativePostMessage(message);
}

export function removeArticleFromFavorite(data: ISearchNewsArticleResponse) {
  const message = {
    data: data,
    storage: 'favorite',
    action: 'remove',
  } as INewsListItemMessageResponse;
  reactNativePostMessage(message);
}

export function addArticleToViewed(data: ISearchNewsArticleResponse) {
  const message = {
    data: data,
    storage: 'viewed',
    action: 'add',
  } as INewsListItemMessageResponse;
  reactNativePostMessage(message);
}
