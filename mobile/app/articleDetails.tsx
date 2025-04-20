import NewsDetailsScreen from '@/screens/NewsDetailsScreen';
import { ISearchNewsArticleResponse } from '@/types/news';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import WebView from 'react-native-webview';

export default function ArticleDetails() {
  const { id } = useLocalSearchParams();
  const [messageSent, setMessageSent] = useState(false);
  const webViewRef = useRef(null);
  const [newsData, setNewsData] = useState<ISearchNewsArticleResponse | null>(
    null
  );

  useEffect(() => {
    const loadData = async () => {
      const viewedNews = await AsyncStorage.getItem('viewedNews');
      if (viewedNews) {
        const data = JSON.parse(viewedNews);
        if (data.id.toString() === id.toString()) {
          setNewsData(data);
        }
      }
    };
    loadData();
  }, [id]);

  const handleMessage = () => {
    if (newsData && webViewRef.current && !messageSent) {
      (webViewRef.current as any).injectJavaScript(
        `window.dispatchEvent(new MessageEvent('message', { data: ${JSON.stringify(
          JSON.stringify(newsData)
        )} }));`
      );
      setMessageSent(true);
    }
  };

  if (!newsData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  const formattedUrl = `http://192.168.0.95:3000/news/${id}?webview=true&withData=true`;
  return (
    <WebView
      ref={webViewRef}
      source={{ uri: formattedUrl }}
      javaScriptEnabled={true}
      originWhitelist={['*']}
      onMessage={handleMessage}
    />
  );
}
