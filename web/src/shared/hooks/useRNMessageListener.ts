import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  IRNResponse,
  IRNResponseGetViewedAndFavoriteNewsIds,
} from '@/shared/api/reactNative';
import {
  setViewedIds,
  setFavoriteIds,
  setFavoriteNews,
  setViewingArticle,
} from '@/shared/store/slices/newsSlice';
import { ISearchNewsArticleResponse } from '@/shared/api/types';

export function useRNMessageListener() {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleRecievedMessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data);
        const response = message as IRNResponse<object>;

        if (!response.data) return;

        switch (response.query) {
          case 'getViewedAndFavoriteNewsIds': {
            const { viewedIds, favoriteIds } =
              response.data as IRNResponseGetViewedAndFavoriteNewsIds;
            dispatch(setViewedIds(viewedIds));
            dispatch(setFavoriteIds(favoriteIds));
            break;
          }
          case 'getFavoriteNews': {
            dispatch(
              setFavoriteNews(response.data as ISearchNewsArticleResponse[])
            );
            break;
          }
          case 'getViewedNewsItem': {
            dispatch(
              setViewingArticle(response.data as ISearchNewsArticleResponse)
            );
            break;
          }
        }
      } catch {}
    };

    window.addEventListener('message', handleRecievedMessage);
    return () => window.removeEventListener('message', handleRecievedMessage);
  }, [dispatch]);
}
