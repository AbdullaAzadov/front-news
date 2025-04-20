'use client';
import NewsCard from '@/entities/newsList/ui/newsCardItem';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { ISearchNewsArticleResponse } from '@/shared/api/types';
import NewsCardListSkeleton from './newsCardList.skeleton';
import { SearchXIcon } from 'lucide-react';

type Props = {
  articles: ISearchNewsArticleResponse[];
  isLoading: boolean | null;
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
    if (allFavorites) return;
    if (favoriteNews?.find((item) => item.id === data.id)) return;

    if (favoriteNews) {
      setFavoriteNews([...favoriteNews, data]);
    } else {
      setFavoriteNews([data]);
    }
    onFavoriteChanged?.();
  }

  function handleRemoveFavorite(data: ISearchNewsArticleResponse) {
    if (allFavorites) return;
    if (!favoriteNews?.find((item) => item.id === data.id)) return;

    if (favoriteNews) {
      setFavoriteNews(favoriteNews.filter((item) => item.id !== data.id));
    } else {
      setFavoriteNews([]);
    }
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

  if (isLoading === false && !articles.length) return <NewsCardListNoData />;

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
            onViewed={handleAddViewed}
            isViewed={!!viewedNews?.find((i) => i.id === item.id)}
          />
        );
      })}
    </div>
  );
};

function NewsCardListNoData() {
  return (
    <div className='py-10 flex flex-col gap-4 items-center justify-center'>
      <SearchXIcon className='size-40 stroke-indigo-900' />
      <h2 className='text-2xl font-semibold text-indigo-950'>
        Ничего не найдено
      </h2>
    </div>
  );
}

export default NewsCardList;
