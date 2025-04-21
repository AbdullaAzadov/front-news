import { getViewedNews, getViewedNewsById } from '@/storage/viewedNews';
import { ISearchNewsArticleResponse } from '@/types/news';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import WebView from 'react-native-webview';

export default function ArticleDetails() {
  const { id } = useLocalSearchParams();
  const [messageSent, setMessageSent] = useState(false);
  const [isLoadedInWeb, setIsLoadedInWeb] = useState(false);
  const webViewRef = useRef(null);
  const [newsData, setNewsData] = useState<ISearchNewsArticleResponse | null>(
    null
  );
  const isReady = newsData && messageSent && isLoadedInWeb;

  useEffect(() => {
    const loadData = async () => {
      const viewedNews = await getViewedNews();
      viewedNews.map((item) => console.log(item.id));
      const data = await getViewedNewsById(viewedNews, Number(id));
      setNewsData(data);
    };
    loadData();
  }, [id]);

  const handleMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      if (message === 'successMessage') {
        setIsLoadedInWeb(true);
      }
    } catch (error) {
      console.warn('❌ Ошибка при обработке сообщения:', error);
    }

    if (newsData && webViewRef.current && !messageSent) {
      (webViewRef.current as any).injectJavaScript(
        `window.dispatchEvent(new MessageEvent('message', { data: ${JSON.stringify(
          JSON.stringify(newsData)
        )} }));`
      );
      setTimeout(() => {
        setMessageSent(true);
      }, 300);
    }
  };

  if (!newsData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formattedUrl = `http://192.168.1.119:2005/news/${id}?webview=true&withData=true`;
  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: formattedUrl }}
        javaScriptEnabled={true}
        originWhitelist={['*']}
        onMessage={handleMessage}
      />
      {!isReady && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            zIndex: 10,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}
