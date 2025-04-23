import TopLayerLoader from '@/components/TopLayerLoader';
import NewsDetailsScreen from '@/screens/NewsDetailsScreen';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { addViewed } from '@/store/slices/newsSlice';
import { RootState } from '@/store/store';
import { getFavoriteNewsById } from '@/storage/favoriteNews';

const FavoriteArticle = () => {
  const { id } = useLocalSearchParams();
  const articleId = Number(id);
  const router = useRouter();
  const { favorite } = useSelector((state: RootState) => state.news);

  const data = favorite.find((item) => item.id === articleId);

  useEffect(() => {
    async function fetchData() {
      const res = await getFavoriteNewsById(undefined, articleId);
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

export default FavoriteArticle;
