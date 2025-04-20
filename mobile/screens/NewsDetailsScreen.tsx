import React from 'react';
import WebView from 'react-native-webview';

const NewsDetailsScreen = ({ url }: { url: string }) => {
  console.log('new WebView', url);

  return (
    <WebView
      source={{ uri: String(url) }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      overScrollMode='never'
    />
  );
};

export default NewsDetailsScreen;
