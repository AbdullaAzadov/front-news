import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

const selectViewed = (state: RootState) => state.news.viewed;
const selectFavorite = (state: RootState) => state.news.favorite;

export const selectViewedIds = createSelector([selectViewed], (viewed) =>
  viewed.map((item) => item.id)
);

export const selectFavoriteIds = createSelector([selectFavorite], (favorite) =>
  favorite.map((item) => item.id)
);
