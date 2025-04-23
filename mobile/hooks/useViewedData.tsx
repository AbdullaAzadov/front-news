import { getViewedNews, getViewedNewsById } from '@/storage/viewedNews';
import { ISearchNewsArticleResponse } from '@/types/news';
import { useEffect, useState } from 'react';

type useViewedDataReturnProps = {
  viewedData: ISearchNewsArticleResponse[] | null;
  setViewedData: React.Dispatch<
    React.SetStateAction<ISearchNewsArticleResponse[] | null>
  >;
};

const useViewedData = (
  id: ISearchNewsArticleResponse['id'] | undefined
): useViewedDataReturnProps => {
  const [viewedData, setViewedData] = useState<
    ISearchNewsArticleResponse[] | null
  >(null);
  useEffect(() => {
    const loadData = async () => {
      if (!id) {
        setViewedData(await getViewedNews());
        return;
      }
      const idData = [await getViewedNewsById(undefined, id)];

      if (idData[0] !== null)
        setViewedData(idData as ISearchNewsArticleResponse[]);
    };
    loadData();
  }, []);

  return { viewedData, setViewedData };
};

export default useViewedData;
