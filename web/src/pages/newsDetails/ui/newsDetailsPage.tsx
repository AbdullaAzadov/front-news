'use client';
import { ROUTES } from '@/app/routes/routes';
import NewsDetails from '@/entities/newsDetails/ui/newsDetails';
import { ISearchNewsArticleResponse } from '@/shared/api/types';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { redirect, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const NewsDetailsPage = () => {
  const [data, setData] = useState<ISearchNewsArticleResponse | null>(null);
  const [notInLS, setNotInLS] = useState(false);

  const params = useParams();
  const id = params?.id ?? null;

  const { data: viewedNewsLS } =
    useLocalStorage<ISearchNewsArticleResponse[]>('viewedNews');

  // Search in LocalStorage first
  useEffect(() => {
    if (!viewedNewsLS) {
      setNotInLS(true);
      return;
    }
    const find = viewedNewsLS?.find((item) => item.id.toString() === id!);
    if (!find) {
      setNotInLS(true);
      return;
    }
    setData(find);
  }, [viewedNewsLS]);

  // If data is missing, fetch from API
  // TODO
  id === null && redirect(ROUTES.MAIN);

  if (!data) return <div>Нет данных!</div>;

  return <NewsDetails data={data} />;
};

export default NewsDetailsPage;
