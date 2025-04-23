import { Redirect } from 'expo-router';

import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useSession } from '@/context/authContext';

export default function RootLayout() {
  const { isAuthenticated } = useSession();

  if (!isAuthenticated) {
    return <Redirect href={'/auth'} />;
  }
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarLabel: 'Главная',
          headerShown: false,
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarLabel: 'Поиск',
          headerShown: false,

          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name={focused ? 'search' : 'search'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: 'Избранное',
          tabBarLabel: 'Избранное',
          headerShown: false,

          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name={focused ? 'bookmark' : 'bookmark-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Профиль',
          tabBarIcon: ({ size, color, focused }) => (
            <FontAwesome5
              name={focused ? 'user-alt' : 'user'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
