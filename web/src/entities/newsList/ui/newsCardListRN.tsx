'use client';
import NewsCard from '@/entities/newsList/ui/newsCardItem';
import { ISearchNewsArticleResponse } from '@/shared/api/types';
import NewsCardListSkeleton from './newsCardList.skeleton';
import { NewsCardListNoData } from './newsCardList';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToViewed,
  addToFavorite,
  removeFromFavorite,
} from '@/shared/store/slices/newsSlice';
import { RootState } from '@/shared/store/store';
import { redirectToArticle } from '@/shared/api/reactNative';

type Props = {
  articles: ISearchNewsArticleResponse[];
  isLoading: boolean | null;
  allFavorites?: boolean;
  onFavoriteChanged?: () => void;
};

const NewsCardListRN = ({ articles, isLoading, allFavorites }: Props) => {
  const dispatch = useDispatch();
  const {
    viewedIds,
    favoriteIds,
    loading: isLoadingStore,
  } = useSelector((state: RootState) => state.news);

  if (isLoadingStore) return <NewsCardListSkeleton />;
  if (isLoading && articles.length === 0) return <NewsCardListSkeleton />;
  if (isLoading === false && !articles.length) return <NewsCardListNoData />;

  function onCardClick(data: ISearchNewsArticleResponse) {
    dispatch(addToViewed(data));
    redirectToArticle(data);
  }

  return (
    <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {articles.map((item) => (
        <NewsCard
          key={item.id}
          data={item}
          defaultFavorited={allFavorites || favoriteIds.includes(item.id)}
          isViewed={viewedIds.includes(item.id)}
          onViewed={onCardClick}
          onFavorite={(data) => dispatch(addToFavorite(data))}
          onRemoveFavorite={(data) => dispatch(removeFromFavorite(data.id))}
        />
      ))}
    </div>
  );
};

export default NewsCardListRN;
