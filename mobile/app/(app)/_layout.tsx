import { Redirect } from 'expo-router';

import { Tabs } from 'expo-router';
import Octicons from '@expo/vector-icons/Octicons';
import { useSession } from '@/context/authContext';

export default function RootLayout() {
  const { isAuthenticated } = useSession();

  if (!isAuthenticated) {
    return <Redirect href={'/auth'} />;
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="favorite"
        options={{
          title: 'Favorite',
          tabBarLabel: 'Favorite',
          tabBarIcon: ({ size, color }) => (
            <Octicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ size, color }) => (
            <Octicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color }) => (
            <Octicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Octicons name="home" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
