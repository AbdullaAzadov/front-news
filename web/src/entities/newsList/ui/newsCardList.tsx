'use client';
import NewsCard from '@/entities/newsList/ui/newsCardItem';
import { ISearchNewsArticleResponse } from '@/shared/api/types';
import NewsCardListSkeleton from './newsCardList.skeleton';
import { SearchXIcon } from 'lucide-react';
import useNewsList from '../hooks/useNewsList';

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
  const {
    handleAddFavorite,
    handleRemoveFavorite,
    handleAddViewed,
    findFavorite,
    findViewed,
  } = useNewsList({ allFavorites, onFavoriteChanged });

  if (isLoading && articles.length === 0) return <NewsCardListSkeleton />;

  if (isLoading === false && !articles.length) return <NewsCardListNoData />;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      {articles.map((item) => {
        const isFavorited = allFavorites || !!findFavorite(item);
        return (
          <NewsCard
            key={item.id}
            data={item}
            onFavorite={handleAddFavorite}
            onRemoveFavorite={handleRemoveFavorite}
            defaultFavorited={isFavorited}
            onViewed={handleAddViewed}
            isViewed={!!findViewed(item)}
          />
        );
      })}
    </div>
  );
};

function NewsCardListNoData() {
  return (
    <div className="py-10 flex flex-col gap-4 items-center justify-center">
      <SearchXIcon className="size-40 stroke-indigo-900" />
      <h2 className="text-2xl font-semibold text-indigo-950">
        Ничего не найдено
      </h2>
    </div>
  );
}

export default NewsCardList;
