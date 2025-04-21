'use client';

import NewsDetails from '@/entities/newsDetails/ui/newsDetails';
import NewsDetailsSkeleton from '@/entities/newsDetails/ui/newsDetails.skeleton';
import { useRNStorage } from '@/shared/hooks/useRNStorage';
import { useParams } from 'next/navigation';

const NewsDetailsPageWithData = () => {
  const params = useParams();
  const id = Number(params?.id as string) ?? null;

  if (typeof id !== 'number') return <p>Неверный id</p>;
  const { data, isRecieved } = useRNStorage('favoriteNews', id);

  if (!isRecieved || !data) return <NewsDetailsSkeleton />;

  return <NewsDetails data={data[0]} />;
};

export default NewsDetailsPageWithData;
