'use client';

import NewsDetails from '@/entities/newsDetails/ui/newsDetails';
import NewsDetailsSkeleton from '@/entities/newsDetails/ui/newsDetails.skeleton';
import { ISearchNewsArticleResponse } from '@/shared/api/types';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const NewsDetailsPageWithData = () => {
  const [data, setData] = useState<ISearchNewsArticleResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params?.id ?? null;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const parsed = JSON.parse(event.data);

        if (parsed?.id?.toString() !== id) return;
        setData(parsed);
        setIsLoading(false);
      } catch (e) {
        alert('Произошла ошибка');
      }
    };

    window.addEventListener('message', handleMessage as EventListener);
    if (typeof window !== 'undefined' && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage('listeningMessage');
    }
    return () =>
      window.removeEventListener('message', handleMessage as EventListener);
  }, []);

  if (isLoading || !data) return <NewsDetailsSkeleton />;

  return <NewsDetails data={data} />;
};

export default NewsDetailsPageWithData;
