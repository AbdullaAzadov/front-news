'use client';

import NewsDetailsSkeleton from '@/entities/newsDetails/ui/newsDetails.skeleton';
import NewsDetailsRN from '@/entities/newsDetails/ui/newsDetailsRN';
import { RootState } from '@/shared/store/store';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';

const NewsDetailsPageRN = () => {
  const params = useParams();
  const id = Number(params?.id as string) ?? null;

  if (typeof id !== 'number') return <p>Неверный id</p>;
  const { viewingArticle } = useSelector((state: RootState) => state.news);

  if (viewingArticle === null) return <NewsDetailsSkeleton />;

  return <NewsDetailsRN data={viewingArticle} />;
};

export default NewsDetailsPageRN;
