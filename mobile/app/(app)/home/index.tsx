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
  getAllFavoriteNewsId,
  removeFavoriteNews,
} from '@/storage/favoriteNews';
import { useEffect, useRef, useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const webViewRef = useRef<WebView | null>(null);
  const [viewedNewsIds, setViewedNewsIds] = useState<
    ISearchNewsArticleResponse['id'][] | null
  >([]);
  const [favoriteNewsIds, setFavoriteNewsIds] = useState<
    ISearchNewsArticleResponse['id'][] | null
  >([]);

  function injectData() {
    let injectData: IRNResponse<IRNResponseGetViewedAndFavoriteNewsIds> = {
      query: 'getViewedAndFavoriteNewsIds',
      data: {
        viewedIds: [],
        favoriteIds: [],
      },
    };
    if (viewedNewsIds) injectData.data.viewedIds = viewedNewsIds;
    if (favoriteNewsIds) injectData.data.favoriteIds = favoriteNewsIds;

    return `window.dispatchEvent(new MessageEvent('message', { data: ${JSON.stringify(
      JSON.stringify(injectData)
    )} }));`;
  }

  useEffect(() => {
    (async () => {
      setViewedNewsIds(await getAllViewedNewsId());
      setFavoriteNewsIds(await getAllFavoriteNewsId());
    })();
  }, []);

  const handleMessage = async (event: any) => {
    try {
      console.log(event.nativeEvent.data);
      const raw = JSON.parse(event.nativeEvent.data);
      if (raw === 'getViewedAndFavoriteNewsIds') {
        webViewRef.current?.injectJavaScript(injectData());
        return;
      }

      const { data, query } = raw as IRNResponse<ISearchNewsArticleResponse>;

      if (query === 'addToFavorite') await addFavoriteNews(data);
      if (query === 'removeFromFavorite') {
        const casted = data as IRNResponseRemoveById;
        await removeFavoriteNews(casted.id);
      }

      if (query === 'addToViewed') {
        await addViewedNews(data);
        // router.push({
        //   pathname: '/articleDetails',
        //   params: { id: data.id },
        // });
      }
    } catch (error) {
      console.warn('❌ Ошибка при обработке сообщения:', error);
    }
  };

  if (viewedNewsIds === null || favoriteNewsIds === null) return null;

  return (
    <WebView
      source={{ uri: 'http://192.168.1.124:2005?webview=true' }}
      showsVerticalScrollIndicator={false}
      onMessage={handleMessage}
      ref={webViewRef}
    />
  );
}
