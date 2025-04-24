import WebViewContainer from '@/components/WebViewContainer';
import { IRNResponse, ISearchNewsArticleResponse } from '@/types/news';
import { useRef, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { Alert, View } from 'react-native';
import TopLayerLoader from '@/components/TopLayerLoader';

type Props = {
  data: ISearchNewsArticleResponse;
};

export default function NewsDetailsScreen({ data }: Props) {
  const webViewRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  // web send message to RN, when web is loaded and ready to recieve data
  const handleMessage = (event: any) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      if (message === 'getViewedNewsItem') {
        (webViewRef.current as any).injectJavaScript(injectData());
        return;
      }

      const { query, data } = message as IRNResponse<string>;

      if (query === 'downloadImage') {
        handleDownload(data);
      }
      if (message === 'uploadImage') {
        const base_64 = handleUpload();
        base_64.then((data) => {
          if (data) injectImage(data);
        });
      }
    } catch (error) {
      console.warn('❌ Ошибка при обработке сообщения:', error);
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

  const handleDownload = async (url: string) => {
    if (!url) {
      alert('Ошибка: Изображение недоступно для скачивания.');
      return;
    }
    setIsDownloading(true);
    const date = new Date().toISOString();
    const fileUri = FileSystem.documentDirectory + `${date}.jpg`;

    try {
      const res = await FileSystem.downloadAsync(url, fileUri);
      saveFile(res.uri);
      Alert.alert('Успех', 'Изображение успешно cкачано и сохранено.');
    } catch (err) {
      console.log('Ошибка при скачивании файла: ', err);
      Alert.alert('Ошибка', 'Не удалось скачать изображение');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted) {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.75,
      });

      if (!pickerResult.canceled) {
        const { uri } = pickerResult.assets[0];

        const base64Data = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        return `data:image/jpeg;base64,${base64Data}`;
      } else {
        console.log('Выбор изображения отменен');
      }
    } else {
      Alert.alert('Разрешения не предоставлены');
    }
  };

  function injectImage(base64: string) {
    const injectData: IRNResponse<string> = {
      query: 'uploadImage',
      data: base64,
    };

    return `window.dispatchEvent(new MessageEvent('message', { data: ${JSON.stringify(
      JSON.stringify(injectData)
    )} }));`;
  }

  const saveFile = async (fileUri: string) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status === 'granted') {
      try {
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        const album = await MediaLibrary.getAlbumAsync('Download');

        if (album == null) {
          await MediaLibrary.createAlbumAsync('Download', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
      } catch (err) {
        console.log('Ошибка при сохранении: ', err);
        Alert.alert('Ошибка', 'Не удалось сохранить изображение.');
      }
    } else if (status === 'denied') {
      Alert.alert(
        'Разрешения',
        'Пожалуйста, разрешите доступ к медиатеке для скачивания изображений.'
      );
    }
  };

  const formattedUrl = `${process.env.EXPO_PUBLIC_WEBVIEW_BASE_URL}/news/${data.id}?webview=true`;
  const INJECTED_JAVASCRIPT = `(function() {
    const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
  })();`;

  return (
    <View style={{ flex: 1 }}>
      {isDownloading && (
        <TopLayerLoader style={{ backgroundColor: '#ffffff88' }} />
      )}

      <WebViewContainer
        ref={webViewRef}
        source={{ uri: formattedUrl }}
        javaScriptEnabled={true}
        originWhitelist={['*']}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={handleMessage}
      />
    </View>
  );
}
