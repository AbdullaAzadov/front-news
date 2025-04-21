'use client';
import { useState, useEffect } from 'react';
import {
  addArticleToFavorite,
  addArticleToViewed,
  reactNativePostMessage,
  removeArticleFromFavorite,
} from '../utils/reactNative';
import { ISearchNewsArticleResponse } from '../api/types';

export type TGetRNStorageRequest = {
  key: string;
  id: ISearchNewsArticleResponse['id'] | null;
};

export function useRNStorage(
  key: string,
  id?: ISearchNewsArticleResponse['id']
) {
  const [data, setData] = useState<ISearchNewsArticleResponse[] | null>(null);
  const [isRecieved, setIsRecieved] = useState(false);

  useEffect(() => {
    const handleRecievedMessage = (event: MessageEvent) => {
      try {
        const parsed = JSON.parse(event.data) as ISearchNewsArticleResponse[];
        setData(parsed);
        setIsRecieved(true);
        reactNativePostMessage('webViewRecieved');
      } catch (e) {
        alert('Произошла ошибка');
      }
    };

    window.addEventListener('message', handleRecievedMessage as EventListener);

    // Get Articles Request
    const request = { key, id: id ?? null } as TGetRNStorageRequest;
    reactNativePostMessage(request);
    return () =>
      window.removeEventListener(
        'message',
        handleRecievedMessage as EventListener
      );
  }, []);

  function add(value: ISearchNewsArticleResponse) {
    if (data !== null) {
      setData(data ? [...data, value] : [value]);
    }
    if (key === 'favoriteNews') addArticleToFavorite(value);
    if (key === 'viewedNews') addArticleToViewed(value);
  }

  function remove(value: ISearchNewsArticleResponse) {
    if (data !== null) {
      setData(data.filter((item) => item.id !== value.id));
    }
    if (key === 'favoriteNews') removeArticleFromFavorite(value);
  }

  return { data, isRecieved, add, remove };
}
