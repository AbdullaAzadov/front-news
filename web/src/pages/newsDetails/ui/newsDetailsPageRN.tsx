'use client';

import NewsDetailsSkeleton from '@/entities/newsDetails/ui/newsDetails.skeleton';
import NewsDetailsRN from '@/entities/newsDetails/ui/newsDetailsRN';
import { useRNStorage } from '@/shared/hooks/useRNStorage';
import { useParams } from 'next/navigation';

const NewsDetailsPageRN = () => {
  const params = useParams();
  const id = Number(params?.id as string) ?? null;

  if (typeof id !== 'number') return <p>Неверный id</p>;
  const { viewedNewsItem } = useRNStorage('getViewedNewsItem');

  if (viewedNewsItem === null) return <NewsDetailsSkeleton />;

  return <NewsDetailsRN data={viewedNewsItem} />;
};

export default NewsDetailsPageRN;
