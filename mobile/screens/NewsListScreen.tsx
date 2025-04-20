import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet } from 'react-native';

const NewsListScreen = ({ navigation }) => {
  const webviewRef = useRef(null);

  const handleNavigation = (event: any) => {
    const url = event.url;

    // Здесь ты можешь изменить условие на своё (например: url.includes("/news/"))
    if (!url.includes('your-news-site.com/news')) {
      navigation.navigate('NewsDetail', { url });
      return false;
    }

    return true;
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ uri: 'http://localhost:3000' }}
        onShouldStartLoadWithRequest={handleNavigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NewsListScreen;
