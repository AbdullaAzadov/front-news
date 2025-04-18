'use client';
import { useEffect, useRef, useState } from 'react';
import { ISearchNewsArticleResponse } from '@/shared/api/types';
import { fetchSearchNews, IFetchSearchProps } from '../api/api';
import { SEARCH_NEWS_LIMIT } from '@/shared/utils/constants';

type Props = {
  params: IFetchSearchProps;
  articlesPerPage?: number;
  maxArticlesLimit?: number;
};

export const useNewsPagination = ({
  params,
  articlesPerPage = SEARCH_NEWS_LIMIT,
  maxArticlesLimit = 500,
}: Props) => {
  const [articles, setArticles] = useState<ISearchNewsArticleResponse[]>([]);
  const [page, setPage] = useState<number>(1);
  const [articlesLimit, setArticlesLimit] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const stopFetching =
    articlesLimit !== null && page * articlesPerPage >= articlesLimit;

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchNews = async (page: number) => {
    setIsLoading(true);
    try {
      const offset = (page - 1) * articlesPerPage;
      const data = await fetchSearchNews({
        ...params,
        offset,
        number: articlesPerPage,
      });
      if (articlesLimit === null)
        setArticlesLimit(Math.min(data.available, maxArticlesLimit));

      if (data.news.length > 0) {
        setArticles((prev) => [...prev, ...data.news]);
        console.log(articles);
      }
    } catch (e) {
      console.error('Ошибка при загрузке новостей:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (stopFetching) return;
    fetchNews(page);
  }, [page, stopFetching]);

  useEffect(() => {
    if (!loaderRef.current || stopFetching || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPage((prev) => prev + 1);
          }
        });
      },
      { threshold: 1 }
    );

    observer.observe(loaderRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isLoading, stopFetching, loaderRef.current]);

  return { articles, loaderRef, isLoading, stopFetching };
};
