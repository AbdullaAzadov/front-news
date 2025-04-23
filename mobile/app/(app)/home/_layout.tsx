import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerTitle: 'Лента новостей' }} />
      <Stack.Screen
        name='article'
        options={{ headerTitle: 'Лента новостей', headerBackTitle: 'Назад' }}
      />
    </Stack>
  );
}
