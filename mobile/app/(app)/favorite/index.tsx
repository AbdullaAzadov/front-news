import { WebView } from 'react-native-webview';
import {
  IRNResponse,
  IRNResponseGetViewedAndFavoriteNewsIds,
  IRNResponseRemoveById,
  ISearchNewsArticleResponse,
} from '@/types/news';
import { useRouter } from 'expo-router';
import { addViewedNews, getAllViewedNewsId } from '@/storage/viewedNews';
import {
  addFavoriteNews,
  getAllFavoriteNews,
  getAllFavoriteNewsId,
  removeFavoriteNews,
} from '@/storage/favoriteNews';
import { useEffect, useRef, useState } from 'react';
import WebViewContainer from '@/components/WebViewContainer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  addFavorite,
  addViewed,
  removeFavorite,
} from '@/store/slices/newsSlice';

export default function FavoriteScreen() {
  const router = useRouter();
  const webViewRef = useRef<WebView | null>(null);
  const dispatch = useDispatch();

  const { viewed, favorite } = useSelector((state: RootState) => state.news);
  const viewedIds = viewed.map((item) => item.id);
  const favoriteIds = favorite.map((item) => item.id);

  const handleMessage = async (event: any) => {
    try {
      const raw = JSON.parse(event.nativeEvent.data);
      if (raw === 'getFavoriteNews') {
        webViewRef.current?.injectJavaScript(injectFavData());
        return;
      }

      if (raw === 'getViewedAndFavoriteNewsIds') {
        webViewRef.current?.injectJavaScript(injectIdsData());
        return;
      }
      const { data, query } = raw as IRNResponse<ISearchNewsArticleResponse>;

      if (query === 'getFavoriteNews') {
      }

      if (query === 'addToFavorite') {
        dispatch(addFavorite(data));
      }
      if (query === 'removeFromFavorite') {
        dispatch(removeFavorite(data.id as IRNResponseRemoveById['id']));
      }

      if (query === 'addToViewed') {
        dispatch(addViewed(data));
        router.push({
          pathname: '/(app)/favorite/article',
          params: { id: data.id },
        });
      }

      if (query === 'redirectToArticle') {
        router.push({
          pathname: '/(app)/favorite/article',
          params: { id: data.id },
        });
      }
    } catch (error) {
      console.warn('❌ Ошибка при обработке сообщения:', error);
    }
  };

  // inject viewed and favorite news
  function injectFavData() {
    let injectData: IRNResponse<ISearchNewsArticleResponse[]> = {
      query: 'getFavoriteNews',
      data: favorite || [],
    };
    return `window.dispatchEvent(new MessageEvent('message', { data: ${JSON.stringify(
      JSON.stringify(injectData)
    )} }));`;
  }
  function injectIdsData() {
    let injectData: IRNResponse<IRNResponseGetViewedAndFavoriteNewsIds> = {
      query: 'getViewedAndFavoriteNewsIds',
      data: {
        viewedIds: viewedIds || [],
        favoriteIds: favoriteIds || [],
      },
    };

    return `window.dispatchEvent(new MessageEvent('message', { data: ${JSON.stringify(
      JSON.stringify(injectData)
    )} }));`;
  }

  const uri = `${process.env.EXPO_PUBLIC_WEBVIEW_BASE_URL}/favorites?webview=true`;
  const INJECTED_JAVASCRIPT = `(function() {
    const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
  })();`;

  if (favorite === null) return null;

  return (
    <WebViewContainer
      source={{ uri }}
      showsVerticalScrollIndicator={false}
      onMessage={handleMessage}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      ref={webViewRef}
    />
  );
}
