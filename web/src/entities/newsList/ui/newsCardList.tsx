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
  const { data: favoriteNews, set: setFavoriteNews } =
    useLocalStorage<ISearchNewsArticleResponse[]>('favoriteNews');
  const { data: viewedNews, set: setViewedNews } =
    useLocalStorage<ISearchNewsArticleResponse[]>('viewedNews');

  function handleAddFavorite(data: ISearchNewsArticleResponse) {
    favoriteNews
      ? setFavoriteNews([...favoriteNews, data])
      : setFavoriteNews([data]);
    onFavoriteChanged?.();
  }

  function handleRemoveFavorite(data: ISearchNewsArticleResponse) {
    favoriteNews
      ? setFavoriteNews(favoriteNews.filter((item) => item.id !== data.id))
      : setFavoriteNews([]);
    onFavoriteChanged?.();
  }

  function handleAddViewed(data: ISearchNewsArticleResponse) {
    // if viewedNews is null (emty), set viewedNews to [data]
    if (viewedNews === null) {
      setViewedNews([data]);
      return;
    }
    // if data is already in viewedNews, return
    if (viewedNews.find((item) => item.id === data.id)) return;
    setViewedNews([...viewedNews, data]);
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
            onViewed={handleAddViewed}
            defaultFavorited={isFavorited}
          />
        );
      })}
    </div>
  );
};

export default NewsCardList;
