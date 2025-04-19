'use client';
import { INewsCard } from '@/entities/newsCard/model/types';
import NewsCard from '@/entities/newsCard/ui/newsCard';
import { IFetchSearchProps } from '@/shared/api/api';
import { useNewsPagination } from '@/shared/hooks/useNewsPagination';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import NewsCardListSkeleton from './newsCardList.skeleton';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

type Props = {
  params: IFetchSearchProps;
  paramsInString?: string;
};

const NewsCardList = ({ params, paramsInString }: Props) => {
  const { articles, loaderRef, isLoading, stopFetching } = useNewsPagination({
    params,
    paramsInString,
  });
  const { data: favoriteNews, set } =
    useLocalStorage<INewsCard[]>('favoriteNews');

  function handleAddFavorite(data: INewsCard) {
    favoriteNews ? set([...favoriteNews, data]) : set([data]);
  }

  function handleRemoveFavorite(data: INewsCard) {
    favoriteNews
      ? set(favoriteNews.filter((item) => item.id !== data.id))
      : set([]);
  }

  if (isLoading && articles.length === 0) return <NewsCardListSkeleton />;

  if (!articles.length) return <div>Новостей нет</div>;

  return (
    <div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
        {articles.map((item, idx) => {
          const data: INewsCard = {
            id: item.id,
            title: item.title,
            description: item.text,
            image: item.image,
            date: format(
              new Date(item.publish_date.replace(' ', 'T')),
              'd MMMM yyyy',
              { locale: ru }
            ),
          };

          return (
            <NewsCard
              key={idx}
              data={data}
              onFavorite={handleAddFavorite}
              onRemoveFavorite={handleRemoveFavorite}
            />
          );
        })}
      </div>
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
    </div>
  );
};

export default NewsCardList;
