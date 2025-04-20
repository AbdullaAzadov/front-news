import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ISearchNewsArticleResponse } from '@/types/news';
import { useRouter } from 'expo-router';

export default function NewsListScreen() {
  const router = useRouter();

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(
        event.nativeEvent.data
      ) as ISearchNewsArticleResponse;

      AsyncStorage.setItem('viewedNews', JSON.stringify(data)).then(() => {
        router.push({
          pathname: '/articleDetails',
          params: { id: data.id },
        });
      });

      console.log(data);
    } catch (error) {
      console.warn('❌ Ошибка при обработке сообщения:', error);
    }
  };

  console.log('render');

  return (
    <WebView
      source={{ uri: 'http://192.168.0.95:3000?webview=true' }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      overScrollMode='never'
      setBuiltInZoomControls={false}
      setDisplayZoomControls={false}
      onMessage={handleMessage}
    />
  );
}
