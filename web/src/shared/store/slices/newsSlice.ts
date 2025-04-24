'use client';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { reactNativePostMessage } from '@/shared/api/reactNative';
import { ISearchNewsArticleResponse } from '@/shared/api/types';

export const initializeNewsStore = createAsyncThunk(
  'news/initialize',
  async () => {
    reactNativePostMessage('getViewedAndFavoriteNewsIds');
    reactNativePostMessage('getFavoriteNews');
    reactNativePostMessage('getViewedNewsItem');
  }
);

interface NewsState {
  viewedIds: ISearchNewsArticleResponse['id'][];
  favoriteIds: ISearchNewsArticleResponse['id'][];
  favoriteNews: ISearchNewsArticleResponse[];
  viewingArticle: ISearchNewsArticleResponse | null;
  loading: boolean;
}

const initialState: NewsState = {
  viewedIds: [],
  favoriteIds: [],
  favoriteNews: [],
  viewingArticle: null,
  loading: true,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setViewedIds(
      state,
      action: PayloadAction<ISearchNewsArticleResponse['id'][]>
    ) {
      state.viewedIds = action.payload;
    },
    setFavoriteIds(
      state,
      action: PayloadAction<ISearchNewsArticleResponse['id'][]>
    ) {
      state.favoriteIds = action.payload;
    },
    setFavoriteNews(
      state,
      action: PayloadAction<ISearchNewsArticleResponse[]>
    ) {
      state.favoriteNews = action.payload;
    },
    setViewingArticle(
      state,
      action: PayloadAction<ISearchNewsArticleResponse>
    ) {
      state.viewingArticle = action.payload;
    },

    addToViewed(state, action: PayloadAction<ISearchNewsArticleResponse>) {
      const id = action.payload.id;
      if (!state.viewedIds.includes(id)) {
        state.viewedIds.push(id);
        reactNativePostMessage({ query: 'addToViewed', data: action.payload });
      }
    },

    addToFavorite(state, action: PayloadAction<ISearchNewsArticleResponse>) {
      const id = action.payload.id;
      if (!state.favoriteIds.includes(id)) {
        state.favoriteIds.push(id);
        reactNativePostMessage({
          query: 'addToFavorite',
          data: action.payload,
        });
      }
    },

    removeFromFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (!state.favoriteIds.includes(id)) return;
      state.favoriteIds = state.favoriteIds.filter((i) => i !== id);
      reactNativePostMessage({ query: 'removeFromFavorite', data: { id } });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initializeNewsStore.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export const {
  setViewedIds,
  setFavoriteIds,
  setFavoriteNews,
  setViewingArticle,
  addToViewed,
  addToFavorite,
  removeFromFavorite,
} = newsSlice.actions;
export default newsSlice.reducer;
