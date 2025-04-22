import useViewedData from '@/hooks/useViewedData';
import { useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import WebView from 'react-native-webview';

export default function ArticleDetails() {
  const { id } = useLocalSearchParams();
  const webViewRef = useRef(null);

  // flags for loading
  const [messageSent, setMessageSent] = useState(false);
  const [isLoadedInWeb, setIsLoadedInWeb] = useState(false);

  // getting from AsyncStorage and extracting current news
  const viewedNews = useViewedData();
  const viewedNewsItem =
    !!viewedNews && viewedNews.filter((item) => item.id === Number(id));

  // main isReady flag
  const isReady = !!viewedNewsItem && messageSent && isLoadedInWeb;

  const handleMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);

      // if message is loaded in web
      if (message === 'webViewRecieved') {
        setIsLoadedInWeb(true);
      }
    } catch (error) {
      console.warn('❌ Ошибка при обработке сообщения:', error);
    }

    // send viewed news
    if (!!viewedNewsItem && webViewRef.current && !messageSent) {
      (webViewRef.current as any).injectJavaScript(
        `window.dispatchEvent(new MessageEvent('message', { data: ${JSON.stringify(
          JSON.stringify(viewedNewsItem)
        )} }));`
      );
      setTimeout(() => {
        setMessageSent(true);
      }, 300);
    }
  };

  const formattedUrl = `http://192.168.1.111:2005/news/${id}?webview=true&withData=true`;
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
