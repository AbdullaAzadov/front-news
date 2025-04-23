import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Text } from 'react-native';

export default function NewsListScreen() {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  });
  return <Text>NewsList</Text>;
}
