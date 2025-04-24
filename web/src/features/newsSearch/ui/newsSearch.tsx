'use client';
import { IFetchSearchProps } from '@/shared/api/search';
import { useNewsPagination } from '@/shared/hooks/useNewsPagination';
import NewsCardList from '@/entities/newsList/ui/newsCardList';
import { useIsWebview } from '@/shared/hooks/useIsWebview';
import NewsCardListRN from '@/entities/newsList/ui/newsCardListRN';
import { useEffect } from 'react';
import { reactNativePostMessage } from '@/shared/api/reactNative';

type Props = {
  params: IFetchSearchProps;
  paramsInString?: string;
  queryRes?: string;
};

const NewsSearch = ({ params, paramsInString, queryRes }: Props) => {
  const { articles, loaderRef, isLoading, stopFetching } = useNewsPagination({
    params,
    paramsInString,
  });

  const { isWebview, notify } = useIsWebview();

  useEffect(() => {
    if (notify) {
      reactNativePostMessage('notifyMe');
    }
  }, [notify]);

  return (
    <div className="space-y-4">
      {queryRes && (
        <h2 className="text-xl font-semibold text-indigo-950">
          Результаты поиска по запросу: {queryRes}
        </h2>
      )}
      {isWebview ? (
        <NewsCardListRN articles={articles} isLoading={isLoading} />
      ) : (
        <NewsCardList articles={articles} isLoading={isLoading} />
      )}
      {articles.length > 0 && (
        <div
          ref={loaderRef}
          className="h-10 mt-4 flex justify-center items-center"
        >
          {isLoading && (
            <span className="text-sm text-gray-500">Загрузка...</span>
          )}
          {stopFetching && (
            <span className="text-sm text-gray-500">Все новости загружены</span>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsSearch;
