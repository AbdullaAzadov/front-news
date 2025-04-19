'use client';
import NewsCardList from '@/entities/newsList/ui/newsCardList';
import { ISearchNewsArticleResponse } from '@/shared/api/types';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import React from 'react';

const FavoritesPage = () => {
  const { data, refresh } =
    useLocalStorage<ISearchNewsArticleResponse[]>('favoriteNews');

  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold'>Список избранных новостей</h2>
      <hr />
      {!!data?.length || (data === null && <div>Избранных новостей нет</div>)}
      {data !== null && (
        <NewsCardList
          articles={data}
          isLoading={false}
          onFavoriteChanged={refresh}
          allFavorites
        />
      )}
    </div>
  );
};

export default FavoritesPage;
