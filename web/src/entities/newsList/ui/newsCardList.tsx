'use client';
import { INewsCard } from '@/entities/newsList/model/types';
import NewsCard from '@/entities/newsList/ui/newsCardItem';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { ISearchNewsArticleResponse } from '@/shared/api/types';
import NewsCardListSkeleton from './newsCardList.skeleton';

type Props = {
  articles: ISearchNewsArticleResponse[];
  isLoading: boolean;
};

const NewsCardList = ({ articles, isLoading }: Props) => {
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
  );
};

export default NewsCardList;
