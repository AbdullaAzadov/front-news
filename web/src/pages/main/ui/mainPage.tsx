'use client';
import NewsCardSearch from '@/features/newsSearch/ui/newsSearch';
import { Suspense } from 'react';

const MainPage = () => {
  return (
    <div className="space-y-2 md:space-y-10">
      <h2 className="text-2xl font-bold">Последние новости</h2>
      <Suspense fallback={<div>Загрузка...</div>}>
        <NewsCardSearch
          params={{
            'source-country': 'kz',
            sort: 'publish-time',
            'sort-direction': 'DESC',
          }}
        />
      </Suspense>
    </div>
  );
};

export default MainPage;
