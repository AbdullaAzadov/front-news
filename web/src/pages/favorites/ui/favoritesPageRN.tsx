'use client';
import NewsCardListRN from '@/entities/newsList/ui/newsCardListRN';
import { useRNStorage } from '@/shared/hooks/useRNStorage';
import React from 'react';

const FavoritesPageRN = () => {
  const { favoriteNews: data } = useRNStorage('getFavoriteNews');

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold'>Список избранных новостей</h2>
      <hr />
      {!!data?.length || (data === null && <div>Избранных новостей нет</div>)}
      {data !== null && (
        <NewsCardListRN articles={data} isLoading={false} allFavorites />
      )}
    </div>
  );
};

export default FavoritesPageRN;
