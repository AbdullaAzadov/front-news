'use client';
import NewsDetailsSkeleton from '@/entities/newsDetails/ui/newsDetails.skeleton';
import NewsDetailsRN from '@/entities/newsDetails/ui/newsDetailsRN';
import { RootState } from '@/shared/store/store';
import { useSelector } from 'react-redux';

const NewsDetailsPageRN = () => {
  const { viewingArticle } = useSelector((state: RootState) => state.news);

  if (viewingArticle === null) return <NewsDetailsSkeleton />;

  return <NewsDetailsRN data={viewingArticle} />;
};

export default NewsDetailsPageRN;
