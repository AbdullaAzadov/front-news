'use client';
import NewsCard from '@/entities/newsList/ui/newsCardItem';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { ISearchNewsArticleResponse } from '@/shared/api/types';
import NewsCardListSkeleton from './newsCardList.skeleton';

type Props = {
  articles: ISearchNewsArticleResponse[];
  isLoading: boolean;
  allFavorites?: boolean;
  onFavoriteChanged?: () => void;
};

const NewsCardList = ({
  articles,
  isLoading,
  allFavorites,
  onFavoriteChanged,
}: Props) => {
  const { data: favoriteNews, set } =
    useLocalStorage<ISearchNewsArticleResponse[]>('favoriteNews');

  function handleAddFavorite(data: ISearchNewsArticleResponse) {
    favoriteNews ? set([...favoriteNews, data]) : set([data]);
    onFavoriteChanged?.();
  }

  function handleRemoveFavorite(data: ISearchNewsArticleResponse) {
    favoriteNews
      ? set(favoriteNews.filter((item) => item.id !== data.id))
      : set([]);
    onFavoriteChanged?.();
  }

  if (isLoading && articles.length === 0) return <NewsCardListSkeleton />;

  if (!articles.length) return <div>Новостей нет</div>;

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
      {articles.map((item) => {
        const isFavorited =
          allFavorites || !!favoriteNews?.find((i) => i.id === item.id);
        return (
          <NewsCard
            key={item.id}
            data={item}
            onFavorite={handleAddFavorite}
            onRemoveFavorite={handleRemoveFavorite}
            defaultFavorited={isFavorited}
          />
        );
      })}
    </div>
  );
};

export default NewsCardList;
