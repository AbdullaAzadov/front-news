export function reactNativePostMessage<T>(data: T) {
  if (typeof window !== 'undefined' && window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(data));
  }
}
