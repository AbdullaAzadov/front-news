'use client';
import { ROUTES } from '@/app/routes/routes';
import NewsDetails from '@/entities/newsDetails/ui/newsDetails';
import NewsDetailsSkeleton from '@/entities/newsDetails/ui/newsDetails.skeleton';
import { getArticleById } from '@/shared/api/getArticleById';
import { ISearchNewsArticleResponse } from '@/shared/api/types';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { redirect, useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const NewsDetailsPage = () => {
  const [data, setData] = useState<ISearchNewsArticleResponse | null>(null);
  const [canFetch, setCanFetch] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const params = useParams();
  const id = params?.id ?? null;

  const { set: setViewedNews, get: getViewedNews } =
    useLocalStorage<ISearchNewsArticleResponse[]>('viewedNews');

  useEffect(() => {
    // Redirect to main page if id is not a string
    if (typeof id !== 'string') redirect(ROUTES.MAIN);

    // Search in LocalStorage first
    async function checkLS() {
      setIsLoading(true);
      const viewedNewsLS = await getViewedNews();
      if (!viewedNewsLS) {
        setCanFetch(true);
        console.log('viewedNewsLS is null');
        return;
      }
      const find = viewedNewsLS.find((item) => item.id.toString() === id!);
      if (!find) {
        setCanFetch(true);
        console.log('not found in ls');
        return;
      }
      setData(find);
      setCanFetch(false);
      console.log('found in ls');
      setIsLoading(false);
    }
    checkLS();
  }, []);

  // If data is missing, fetch from API
  useEffect(() => {
    if (canFetch !== true || data !== null) return;
    console.log('going to fetch');
    console.log(data, canFetch);

    (async () => {
      try {
        setIsLoading(true);
        const data = await getArticleById(id as string);
        setData(data.news[0]);

        const viewedNewsLS = await getViewedNews();
        if (viewedNewsLS !== null) {
          const find = viewedNewsLS.find((item) => item.id === data.news[0].id);
          if (!find) setViewedNews([...viewedNewsLS, data.news[0]]);
        } else {
          setViewedNews([data.news[0]]);
        }
      } catch (error) {
        console.error(error);
        setError('Что то пошло не так');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [canFetch, id, data]);

  if (isLoading || !data) return <NewsDetailsSkeleton />;
  if (error) console.log(error);

  return <NewsDetails data={data} />;
};

export default NewsDetailsPage;
