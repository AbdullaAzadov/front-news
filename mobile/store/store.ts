import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import newsReducer from './slices/newsSlice';

const persistConfig = {
  key: 'news',
  storage: AsyncStorage,
  whitelist: ['viewed', 'favorite'],
};

const persistedReducer = persistReducer(persistConfig, newsReducer);

export const store = configureStore({
  reducer: { news: persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
        ignoredPaths: ['news.viewed', 'news.favorite'],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
