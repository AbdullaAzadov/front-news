import { getFavoriteNews, getFavoriteNewsById } from '@/storage/favoriteNews';
import { ISearchNewsArticleResponse } from '@/types/news';
import { useEffect, useState } from 'react';

const useFavoriteData = (id: ISearchNewsArticleResponse['id'] | undefined) => {
  const [favoriteData, setFavoriteData] = useState<
    ISearchNewsArticleResponse[] | null
  >(null);
  useEffect(() => {
    const loadData = async () => {
      if (!id) {
        setFavoriteData(await getFavoriteNews());
        return;
      }
      const idData = [await getFavoriteNewsById(undefined, id)];
      if (idData[0] !== null)
        setFavoriteData(idData as ISearchNewsArticleResponse[]);
    };
    loadData();
  }, []);

  return favoriteData;
};

export default useFavoriteData;
