import { WebView } from 'react-native-webview';
import {
  IRNResponse,
  IRNResponseGetViewedAndFavoriteNewsIds,
  IRNResponseRemoveById,
  ISearchNewsArticleResponse,
} from '@/types/news';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import WebViewContainer from '@/components/WebViewContainer';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFavorite,
  addViewed,
  removeFavorite,
} from '@/store/slices/newsSlice';
import { selectViewedIds } from '@/store/selectors/newsSelector';
import * as Notifications from 'expo-notifications';
import { RefreshControl, ScrollView } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const webViewRef = useRef<WebView | null>(null);
  const dispatch = useDispatch();
  const [needNotify, setNeedNotify] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // getting viewed and favorite news
  const viewedNewsIds = useSelector(selectViewedIds);
  const favoriteNewsIds = useSelector(selectViewedIds);

  const handleMessage = async (event: any) => {
    try {
      console.log(event.nativeEvent.data);
      const raw = JSON.parse(event.nativeEvent.data);
      if (raw === 'getViewedAndFavoriteNewsIds') {
        webViewRef.current?.injectJavaScript(injectData());
        return;
      }
      const { data, query } = raw as IRNResponse<ISearchNewsArticleResponse>;

      if (raw === 'notifyMe' && needNotify) {
        const delay = Math.max(Math.random() * 10, 5); // delay range random [5, 10]
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Новости!',
            body: 'У нас появились свежие новости! Проверьте!',
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: delay,
          },
        });
        setNeedNotify(false);
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
          pathname: '/(app)/home/article',
          params: { id: data.id },
        });
      }

      if (query === 'redirectToArticle') {
        router.push({
          pathname: '/(app)/home/article',
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

  const uri = `${process.env.EXPO_PUBLIC_WEBVIEW_BASE_URL}?webview=true${
    needNotify ? '&notify=true' : ''
  }`;
  const INJECTED_JAVASCRIPT = `(function() {
    const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
  })();`;

  const handleRefresh = () => {
    setIsRefreshing(true);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  if (viewedNewsIds === null || favoriteNewsIds === null) return null;

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
    >
      <WebViewContainer
        source={{ uri }}
        showsVerticalScrollIndicator={false}
        onMessage={handleMessage}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        ref={webViewRef}
      />
    </ScrollView>
  );
}
