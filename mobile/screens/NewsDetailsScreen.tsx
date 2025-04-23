import WebViewContainer from '@/components/WebViewContainer';
import { IRNResponse, ISearchNewsArticleResponse } from '@/types/news';
import { useRef, useState } from 'react';

type Props = {
  data: ISearchNewsArticleResponse;
};

export default function NewsDetailsScreen({ data }: Props) {
  const webViewRef = useRef(null);

  // flags for loading
  const [messageSent, setMessageSent] = useState(false);
  const [isWebWaitingData, setIsWebWaitingData] = useState(false);

  // web send message to RN, when web is loaded and ready to recieve data
  const handleMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      if (message === 'getViewedNewsItem') {
        setIsWebWaitingData(true);
      }
    } catch (error) {
      console.warn('❌ Ошибка при обработке сообщения:', error);
    }

    // send viewed news
    if (webViewRef.current && !messageSent && isWebWaitingData) {
      (webViewRef.current as any).injectJavaScript(injectData());
      setTimeout(() => {
        setMessageSent(true);
      }, 300);
    }

    // inject viewed data for send to web
    function injectData() {
      let injectData: IRNResponse<ISearchNewsArticleResponse> = {
        query: 'getViewedNewsItem',
        data,
      };

      return `window.dispatchEvent(new MessageEvent('message', { data: ${JSON.stringify(
        JSON.stringify(injectData)
      )} }));`;
    }
  };

  const formattedUrl = `${process.env.NEXT_PUBLIC_API_URL}/news/${data.id}?webview=true`;

  return (
    <WebViewContainer
      ref={webViewRef}
      source={{ uri: formattedUrl }}
      javaScriptEnabled={true}
      originWhitelist={['*']}
      onMessage={handleMessage}
    />
  );
}
