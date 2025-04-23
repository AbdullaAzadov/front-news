import TopLayerLoader from '@/components/TopLayerLoader';
import useViewedData from '@/hooks/useViewedData';
import NewsDetailsScreen from '@/screens/NewsDetailsScreen';
import { getViewedNewsById } from '@/storage/viewedNews';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';

const HomeArticle = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      router.back();
    }
  }, []);

  const articleId = Number(id);
  const { viewedData, setViewedData } = useViewedData(articleId);

  useEffect(() => {
    if (!viewedData) return;
    if (viewedData.length > 0) return;
    const res = getViewedNewsById(undefined, articleId);
    res.then((data) => data && setViewedData([data]));
  }, [viewedData]);

  if (!viewedData || viewedData.length === 0) return <TopLayerLoader />;

  return <NewsDetailsScreen data={viewedData[0]} />;
};

export default HomeArticle;
