import { Stack } from 'expo-router';

export default function SearchLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerTitle: 'Поиск' }} />
      <Stack.Screen
        name='article'
        options={{ headerTitle: 'Поиск', headerBackTitle: 'Назад' }}
      />
    </Stack>
  );
}
