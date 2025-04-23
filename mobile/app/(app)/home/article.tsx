import TopLayerLoader from '@/components/TopLayerLoader';
import NewsDetailsScreen from '@/screens/NewsDetailsScreen';
import { getViewedNewsById } from '@/storage/viewedNews';
import { addViewed } from '@/store/slices/newsSlice';
import { RootState } from '@/store/store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const HomeArticle = () => {
  const { id } = useLocalSearchParams();
  const articleId = Number(id);
  const router = useRouter();
  const { viewed } = useSelector((state: RootState) => state.news);

  const data = viewed.find((item) => item.id === articleId);

  useEffect(() => {
    async function fetchData() {
      const res = await getViewedNewsById(undefined, articleId);
      res && addViewed(res);
    }

    if (!data) fetchData();
  }, [data]);

  useEffect(() => {
    if (!id || isNaN(Number(id))) router.back();
  }, []);

  if (!data) return <TopLayerLoader />;

  return <NewsDetailsScreen data={data} />;
};

export default HomeArticle;
