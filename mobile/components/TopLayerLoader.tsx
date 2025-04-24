import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';

const TopLayerLoader = ({ style }: { style?: ViewStyle }) => {
  return (
    <View style={[s.topLayer, style]}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const s = StyleSheet.create({
  topLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f5f5f5',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TopLayerLoader;
