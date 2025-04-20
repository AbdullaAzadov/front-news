import { WebView } from 'react-native-webview';
// import { useRouter } from 'expo-router';

export default function NewsListScreen() {
  // const router = useRouter();

  // const handleNavigation = (event: any) => {
  //   const url = event.url;

  //   if (url.includes('/news/')) {
  //     router.push({
  //       pathname: '/[news]',
  //       params: { url },
  //     });
  //     return false;
  //   }

  //   return true;
  // };

  return (
    <WebView
      source={{ uri: 'http://172.20.10.9:3000?webview=true' }}
      // onShouldStartLoadWithRequest={handleNavigation}
      showsVerticalScrollIndicator={false}
      decelerationRate='fast'
      androidHardwareAccelerationDisabled={false}
      androidLayerType='hardware'
      overScrollMode='never'
    />
  );
}
