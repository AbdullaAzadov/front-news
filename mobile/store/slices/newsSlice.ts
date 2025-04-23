import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISearchNewsArticleResponse } from '@/types/news';
import { addFavoriteNews, removeFavoriteNews } from '@/storage/favoriteNews';
import { addViewedNews } from '@/storage/viewedNews';

interface NewsState {
  viewed: ISearchNewsArticleResponse[];
  favorite: ISearchNewsArticleResponse[];
}
const initialState: NewsState = { viewed: [], favorite: [] };

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setViewed(state, action: PayloadAction<ISearchNewsArticleResponse[]>) {
      state.viewed = action.payload;
    },
    addViewed(state, action: PayloadAction<ISearchNewsArticleResponse>) {
      if (!state.viewed.find((n) => n.id === action.payload.id)) {
        state.viewed.push(action.payload);
        addViewedNews(action.payload);
      }
    },
    setFavorite(state, action: PayloadAction<ISearchNewsArticleResponse[]>) {
      state.favorite = action.payload;
    },
    addFavorite(state, action: PayloadAction<ISearchNewsArticleResponse>) {
      if (!state.favorite.find((n) => n.id === action.payload.id)) {
        state.favorite.push(action.payload);
        addFavoriteNews(action.payload);
      }
    },
    removeFavorite(
      state,
      action: PayloadAction<ISearchNewsArticleResponse['id']>
    ) {
      if (!state.favorite.find((n) => n.id === action.payload)) return;
      state.favorite = state.favorite.filter((n) => n.id !== action.payload);
      removeFavoriteNews(action.payload);
    },
  },
});

export const {
  setViewed,
  addViewed,
  setFavorite,
  addFavorite,
  removeFavorite,
} = newsSlice.actions;
export default newsSlice.reducer;
