import { Stack } from 'expo-router';

export default function FavoriteLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{ headerTitle: 'Избранные новости' }}
      />
      <Stack.Screen
        name='article'
        options={{ headerTitle: 'Избранные новости', headerBackTitle: 'Назад' }}
      />
    </Stack>
  );
}
