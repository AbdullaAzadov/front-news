'use client';
import { IFetchSearchProps } from '@/shared/api/search';
import { useNewsPagination } from '@/shared/hooks/useNewsPagination';
import NewsCardList from '@/entities/newsList/ui/newsCardList';

type Props = {
  params: IFetchSearchProps;
  paramsInString?: string;
};

const NewsSearch = ({ params, paramsInString }: Props) => {
  const { articles, loaderRef, isLoading, stopFetching } = useNewsPagination({
    params,
    paramsInString,
  });

  return (
    <div>
      <NewsCardList articles={articles} isLoading={isLoading} />
      {articles.length > 0 && (
        <div
          ref={loaderRef}
          className='h-10 mt-4 flex justify-center items-center'
        >
          {isLoading && (
            <span className='text-sm text-gray-500'>Загрузка...</span>
          )}
          {stopFetching && (
            <span className='text-sm text-gray-500'>Все новости загружены</span>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsSearch;
