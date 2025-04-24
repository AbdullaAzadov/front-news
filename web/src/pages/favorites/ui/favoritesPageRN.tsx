'use client';
import NewsCardListRN from '@/entities/newsList/ui/newsCardListRN';
import { RootState } from '@/shared/store/store';
import React from 'react';
import { useSelector } from 'react-redux';

const FavoritesPageRN = () => {
  const { favoriteNews: data } = useSelector((state: RootState) => state.news);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Список избранных новостей</h2>
      <hr />
      {!!data?.length || (data === null && <div>Избранных новостей нет</div>)}
      {data !== null && (
        <NewsCardListRN articles={data} isLoading={false} allFavorites />
      )}
    </div>
  );
};

export default FavoritesPageRN;
