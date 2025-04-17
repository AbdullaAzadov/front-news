'use client';
import { useEffect, useRef, useState } from 'react';
import { ISearchNewsArticleResponse } from '@/shared/api/types';
import { fetchMainPageNews } from '../api/api';

const PAGE_SIZE = 50;

type Props = {
  initialData?: ISearchNewsArticleResponse[];
  initialLimit?: number;
  q?: string;
};

export const useNewsPagination = ({
  initialData,
  initialLimit = PAGE_SIZE * 3,
  q = 'a',
}: Props) => {
  const [articles, setArticles] = useState<ISearchNewsArticleResponse[]>([]);
  const [limit, setLimit] = useState<number>(initialLimit);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const hasMore = articles.length < limit;

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchNews = async (page: number) => {
    setLoading(true);
    try {
      const data = await fetchMainPageNews({ page, pageSize: PAGE_SIZE, q });
      if (data.totalResults !== limit) setLimit(data.totalResults);

      if (data.status === 'ok') {
        setArticles((prev) => [...prev, ...data.articles]);
      }
    } catch (e) {
      console.error('Ошибка при загрузке новостей:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1 && !!initialData) {
      setArticles(initialData);
      setPage(2);
    } else {
      fetchNews(page);
    }
  }, [page]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore || loading) return;

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
  }, [loading, hasMore]);

  return { articles, loaderRef, loading, hasMore };
};
