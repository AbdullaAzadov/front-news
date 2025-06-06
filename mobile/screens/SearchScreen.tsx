import { WebView } from 'react-native-webview';
import {
  IRNResponse,
  IRNResponseGetViewedAndFavoriteNewsIds,
  IRNResponseRemoveById,
  ISearchNewsArticleResponse,
} from '@/types/news';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import WebViewContainer from '@/components/WebViewContainer';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavorite,
  addViewed,
  removeFavorite,
} from '@/store/slices/newsSlice';
import {
  selectFavoriteIds,
  selectViewedIds,
} from '@/store/selectors/newsSelector';

export default function SearchScreen({ query }: { query: string }) {
  const router = useRouter();
  const webViewRef = useRef<WebView | null>(null);
  const dispatch = useDispatch();

  // getting viewed and favorite news
  const viewedNewsIds = useSelector(selectViewedIds);
  const favoriteNewsIds = useSelector(selectFavoriteIds);

  const handleMessage = async (event: any) => {
    try {
      const raw = JSON.parse(event.nativeEvent.data);
      if (raw === 'getViewedAndFavoriteNewsIds') {
        webViewRef.current?.injectJavaScript(injectData());
        return;
      }
      const { data, query } = raw as IRNResponse<ISearchNewsArticleResponse>;

      if (query === 'addToFavorite') {
        dispatch(addFavorite(data));
      }
      if (query === 'removeFromFavorite') {
        dispatch(removeFavorite(data.id as IRNResponseRemoveById['id']));
      }

      if (query === 'addToViewed') {
        dispatch(addViewed(data));
        router.push({
          pathname: '/(app)/search/article',
          params: { id: data.id },
        });
      }

      if (query === 'redirectToArticle') {
        router.push({
          pathname: '/(app)/search/article',
          params: { id: data.id },
        });
      }
    } catch (error) {
      console.warn('❌ Ошибка при обработке сообщения:', error);
    }
  };

  // inject viewed and favorite news
  function injectData() {
    const injectData: IRNResponse<IRNResponseGetViewedAndFavoriteNewsIds> = {
      query: 'getViewedAndFavoriteNewsIds',
      data: {
        viewedIds: viewedNewsIds || [],
        favoriteIds: favoriteNewsIds || [],
      },
    };

    return `window.dispatchEvent(new MessageEvent('message', { data: ${JSON.stringify(
      JSON.stringify(injectData)
    )} }));`;
  }

  const uri = `${process.env.EXPO_PUBLIC_WEBVIEW_BASE_URL}/search?q=${query}&webview=true`;
  const INJECTED_JAVASCRIPT = `(function() {
    const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
  })();`;

  if (viewedNewsIds === null || favoriteNewsIds === null) return null;

  return (
    <WebViewContainer
      source={{ uri }}
      showsVerticalScrollIndicator={false}
      onMessage={handleMessage}
      injectedJavaScript={INJECTED_JAVASCRIPT}
      ref={webViewRef}
      style={{ backgroundColor: '#f5f5f5' }}
    />
  );
}
