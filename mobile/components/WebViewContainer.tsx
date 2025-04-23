import React, { ForwardedRef, forwardRef } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Button,
} from 'react-native';
import { WebView, WebViewProps } from 'react-native-webview';
import Entypo from '@expo/vector-icons/Entypo';
import TopLayerLoader from './TopLayerLoader';

const WebViewContainer = forwardRef(
  (props: WebViewProps, ref: ForwardedRef<WebView>) => {
    const { onLoadStart, onLoadEnd } = props;
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState<boolean>(true);

    const handleLoadStart = (event: any) => {
      setIsLoading(true);
      onLoadStart?.(event);
    };

    const handleLoadEnd = (event: any) => {
      setIsLoading(false);
      onLoadEnd?.(event);
    };

    const handleRefresh = () => {
      if (isError) setIsError(false);
      if (ref && 'current' in ref) {
        ref.current?.reload();
      }
    };

    return (
      <View style={s.wrapper}>
        <WebView
          ref={ref}
          onLoadStart={handleLoadStart}
          onLoadEnd={handleLoadEnd}
          onError={() => setIsError(true)}
          {...props}
        />
        {isLoading && <TopLayerLoader />}
        {isError && (
          <View style={[s.topLayer, s.error]}>
            <Entypo name='warning' size={48} color='red' />
            <Text style={s.text}>Что-то пошло не так при загрузке</Text>
            <Button title='Попробовать еще раз' onPress={handleRefresh} />
          </View>
        )}
      </View>
    );
  }
);

const s = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  topLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 10,
  },
  error: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    width: '80%',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default WebViewContainer;
