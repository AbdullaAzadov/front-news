import { getViewedNews } from '@/storage/viewedNews';
import { ISearchNewsArticleResponse } from '@/types/news';
import { useEffect, useState } from 'react';

const useViewedData = () => {
  const [viewedData, setViewedData] = useState<
    ISearchNewsArticleResponse[] | null
  >(null);
  useEffect(() => {
    const loadData = async () => {
      setViewedData(await getViewedNews());
    };
    loadData();
  }, []);

  return viewedData;
};

export default useViewedData;
