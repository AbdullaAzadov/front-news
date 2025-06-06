import { ISearchNewsArticleResponse } from '@/shared/api/types';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';

type THookReturn = {
  handleAddFavorite: (data: ISearchNewsArticleResponse) => void;
  handleRemoveFavorite: (data: ISearchNewsArticleResponse) => void;
  handleAddViewed: (data: ISearchNewsArticleResponse) => void;
  findFavorite: (
    data: ISearchNewsArticleResponse
  ) => ISearchNewsArticleResponse | false;
  findViewed: (
    data: ISearchNewsArticleResponse
  ) => ISearchNewsArticleResponse | false;
};

type TProps = {
  allFavorites?: boolean;
  onFavoriteChanged?: () => void;
};

// WEB LOGIC
export const useNewsList = ({
  allFavorites,
  onFavoriteChanged,
}: TProps): THookReturn => {
  const { data: favoriteNews, set: setFavoriteNews } =
    useLocalStorage<ISearchNewsArticleResponse[]>('favoriteNews');
  const { data: viewedNews, set: setViewedNews } =
    useLocalStorage<ISearchNewsArticleResponse[]>('viewedNews');

  function handleAddFavorite(data: ISearchNewsArticleResponse) {
    if (allFavorites) return;
    if (favoriteNews?.find((item) => item.id === data.id)) return;

    if (favoriteNews) {
      setFavoriteNews([...favoriteNews, data]);
    } else {
      setFavoriteNews([data]);
    }
    onFavoriteChanged?.();
  }

  function handleRemoveFavorite(data: ISearchNewsArticleResponse) {
    if (!favoriteNews?.find((item) => item.id === data.id)) return;

    if (favoriteNews) {
      setFavoriteNews(favoriteNews.filter((item) => item.id !== data.id));
    } else {
      setFavoriteNews([]);
    }
    onFavoriteChanged?.();
  }

  function handleAddViewed(data: ISearchNewsArticleResponse) {
    // if viewedNews is null (empty), set viewedNews to [data]
    if (viewedNews === null) {
      setViewedNews([data]);
      return;
    }
    // if data is already in viewedNews, return
    if (viewedNews.find((item) => item.id === data.id)) return;
    setViewedNews([...viewedNews, data]);
  }

  function findFavorite(data: ISearchNewsArticleResponse) {
    return favoriteNews?.find((item) => item.id === data.id) ?? false;
  }

  function findViewed(data: ISearchNewsArticleResponse) {
    return viewedNews?.find((item) => item.id === data.id) ?? false;
  }

  return {
    handleAddFavorite,
    handleRemoveFavorite,
    handleAddViewed,
    findFavorite,
    findViewed,
  };
};

export default useNewsList;
