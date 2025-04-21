import { WebView } from 'react-native-webview';
import { INewsListItemMessageResponse } from '@/types/news';
import { useRouter } from 'expo-router';
import { addViewedNews } from '@/storage/viewedNews';
import { addFavoriteNews, removeFavoriteNews } from '@/storage/favoriteNews';

export default function NewsListScreen() {
  const router = useRouter();

  const handleMessage = async (event: any) => {
    try {
      const raw = JSON.parse(event.nativeEvent.data);
      const { data, storage, action } = raw as INewsListItemMessageResponse;

      if (storage === 'favorite') {
        if (action === 'add') await addFavoriteNews(data);
        if (action === 'remove') await removeFavoriteNews(data);
        return;
      }

      await addViewedNews(data);
      router.push({
        pathname: '/articleDetails',
        params: { id: data.id },
      });

      console.log(data);
    } catch (error) {
      console.warn('❌ Ошибка при обработке сообщения:', error);
    }
  };

  return (
    <WebView
      source={{ uri: 'http://192.168.1.119:2005?webview=true' }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      overScrollMode="never"
      setBuiltInZoomControls={false}
      setDisplayZoomControls={false}
      onMessage={handleMessage}
    />
  );
}
