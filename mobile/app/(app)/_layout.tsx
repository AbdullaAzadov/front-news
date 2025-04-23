import { Redirect } from 'expo-router';
import { PersistGate } from 'redux-persist/integration/react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useSession } from '@/context/authContext';
import { useEffect } from 'react';
import { getAllViewedNews } from '@/storage/viewedNews';
import { setFavorite, setViewed } from '@/store/slices/newsSlice';
import { store, persistor } from '@/store/store';
import { getAllFavoriteNews } from '@/storage/favoriteNews';
import { Provider } from 'react-redux';

export default function RootLayout() {
  const { isAuthenticated } = useSession();

  useEffect(() => {
    (async () => {
      const viewed = await getAllViewedNews();
      store.dispatch(setViewed(viewed));
      const fav = await getAllFavoriteNews();
      store.dispatch(setFavorite(fav));
    })();
  }, []);

  if (!isAuthenticated) {
    return <Redirect href={'/auth'} />;
  }
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Tabs screenOptions={{}}>
          <Tabs.Screen
            name='home'
            options={{
              title: 'Home',
              tabBarLabel: 'Главная',
              headerShown: false,
              popToTopOnBlur: true,
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
            name='search'
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
            name='favorite'
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
            name='profile'
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
          <Tabs.Screen name='index' options={{ href: null }} />
        </Tabs>
      </PersistGate>
    </Provider>
  );
}
