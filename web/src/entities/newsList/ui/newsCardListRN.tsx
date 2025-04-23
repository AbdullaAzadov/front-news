'use client';
import NewsCard from '@/entities/newsList/ui/newsCardItem';
import { ISearchNewsArticleResponse } from '@/shared/api/types';
import NewsCardListSkeleton from './newsCardList.skeleton';
import { NewsCardListNoData } from './newsCardList';
import { useRNStorage } from '@/shared/hooks/useRNStorage';

type Props = {
  articles: ISearchNewsArticleResponse[];
  isLoading: boolean | null;
  allFavorites?: boolean;
  onFavoriteChanged?: () => void;
};

const NewsCardListRN = ({ articles, isLoading, allFavorites }: Props) => {
  const {
    favoriteIds,
    viewedIds,
    addToFavorite,
    addToViewed,
    removeFromFavorite,
  } = useRNStorage('getViewedAndFavoriteNewsIds');
  if (!favoriteIds || !viewedIds) return <NewsCardListSkeleton />;
  if (isLoading && articles.length === 0) return <NewsCardListSkeleton />;
  if (isLoading === false && !articles.length) return <NewsCardListNoData />;

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {articles.map((item) => {
        const isFavorited = allFavorites || !!favoriteIds?.includes(item.id);
        return (
          <NewsCard
            key={item.id}
            data={item}
            onFavorite={addToFavorite}
            onRemoveFavorite={removeFromFavorite}
            defaultFavorited={isFavorited}
            onViewed={addToViewed}
            isViewed={!!viewedIds?.includes(item.id)}
          />
        );
      })}
    </div>
  );
};

export default NewsCardListRN;
