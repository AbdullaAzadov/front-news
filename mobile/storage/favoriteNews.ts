import { ISearchNewsArticleResponse } from '@/types/news';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getFavoriteNews(): Promise<ISearchNewsArticleResponse[]> {
  const raw = await AsyncStorage.getItem('favoriteNews');

  if (raw) return JSON.parse(raw);

  const init: ISearchNewsArticleResponse[] = [];
  await AsyncStorage.setItem('favoriteNews', JSON.stringify(init));
  return init;
}

export async function addFavoriteNews(
  data: ISearchNewsArticleResponse
): Promise<'ok' | 'error'> {
  const favoriteNews = await getFavoriteNews();
  const find = await getFavoriteNewsById(favoriteNews, data.id);

  if (!find) {
    favoriteNews.push(data);
    await AsyncStorage.setItem('favoriteNews', JSON.stringify(favoriteNews));
    return 'ok';
  }

  return 'error';
}

export async function removeFavoriteNews(
  id: ISearchNewsArticleResponse['id']
): Promise<'ok' | 'error'> {
  const favoriteNews = await getFavoriteNews();
  const find = await getFavoriteNewsById(favoriteNews, id);

  if (find) {
    const filtered = favoriteNews.filter((item) => item.id !== id);
    await AsyncStorage.setItem('favoriteNews', JSON.stringify(filtered));
    return 'ok';
  }

  return 'error';
}

export async function getFavoriteNewsById(
  data: ISearchNewsArticleResponse[] | undefined,
  id: ISearchNewsArticleResponse['id']
): Promise<ISearchNewsArticleResponse | null> {
  const favoriteNews = data ?? (await getFavoriteNews());
  return favoriteNews.find((item) => item.id === id) ?? null;
}

export async function getAllFavoriteNewsId(): Promise<
  ISearchNewsArticleResponse['id'][]
> {
  const news = await getFavoriteNews();
  return news.map((item) => item.id);
}

export async function getAllFavoriteNews(): Promise<
  ISearchNewsArticleResponse[]
> {
  const news = await getFavoriteNews();
  return news;
}
