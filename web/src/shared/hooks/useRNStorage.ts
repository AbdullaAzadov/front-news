'use client';
import { useState, useEffect } from 'react';
import { ISearchNewsArticleResponse } from '../api/types';
import {
  addArticleToFavorite,
  addArticleToViewed,
  IRNResponse,
  IRNResponseGetViewedAndFavoriteNewsIds,
  IRNResponseQueries,
  reactNativePostMessage,
  removeArticleFromFavorite,
} from '../api/reactNative';

export function useRNStorage(query: IRNResponseQueries) {
  const [favoriteIds, setFavoriteIds] = useState<
    ISearchNewsArticleResponse['id'][] | null
  >(null);
  const [viewedIds, setViewedIds] = useState<
    ISearchNewsArticleResponse['id'][] | null
  >(null);

  useEffect(() => {
    // recieve data from RN
    const handleRecievedMessage = (event: MessageEvent) => {
      try {
        const response = JSON.parse(event.data) as IRNResponse<object>;

        if (!response.data) return;

        if (response.query === 'getViewedAndFavoriteNewsIds') {
          const casted =
            response.data as IRNResponseGetViewedAndFavoriteNewsIds;
          if (Object(response.data).hasOwnProperty('viewedIds')) {
            setViewedIds(casted.viewedIds);
          }

          if (Object(response.data).hasOwnProperty('favoriteIds')) {
            setFavoriteIds(casted.favoriteIds);
          }
          return;
        }
      } catch (e) {
        alert('Произошла ошибка');
      }
    };

    window.addEventListener('message', handleRecievedMessage);

    // send base request with query
    reactNativePostMessage(query);

    return () => {
      window.removeEventListener('message', handleRecievedMessage);
    };
  }, []);

  function addToViewed(data: ISearchNewsArticleResponse) {
    const ourRecievedData = viewedIds;

    if (ourRecievedData?.includes(data.id) === false) {
      setViewedIds([...ourRecievedData, data.id]);
      addArticleToViewed(data);
    }
  }

  function addToFavorite(data: ISearchNewsArticleResponse) {
    const ourRecievedData = favoriteIds;

    if (ourRecievedData?.includes(data.id) === false) {
      setFavoriteIds([...ourRecievedData, data.id]);
      addArticleToFavorite(data);
    }
  }

  function removeFromFavorite(data: ISearchNewsArticleResponse) {
    const ourRecievedData = favoriteIds;

    if (ourRecievedData?.includes(data.id) === true) {
      setFavoriteIds(ourRecievedData.filter((id) => id !== data.id));
      removeArticleFromFavorite(data.id);
    }
  }

  return {
    viewedIds,
    favoriteIds,
    addToFavorite,
    addToViewed,
    removeFromFavorite,
  };
}
