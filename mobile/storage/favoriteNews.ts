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
    alert('Добавлено в избранное');
    return 'ok';
  }
  alert('Такая новость уже есть в избранном');

  return 'error';
}

export async function removeFavoriteNews(
  data: ISearchNewsArticleResponse
): Promise<'ok' | 'error'> {
  const favoriteNews = await getFavoriteNews();
  const find = await getFavoriteNewsById(favoriteNews, data.id);

  if (find) {
    const filtered = favoriteNews.filter((item) => item.id !== data.id);
    await AsyncStorage.setItem('favoriteNews', JSON.stringify(filtered));
    alert('Удалено из избранного');
    return 'ok';
  }
  alert('Такой новости нет в избранном');

  return 'error';
}

export async function getFavoriteNewsById(
  data: ISearchNewsArticleResponse[] | undefined,
  id: ISearchNewsArticleResponse['id']
): Promise<ISearchNewsArticleResponse | null> {
  const favoriteNews = data ?? (await getFavoriteNews());
  return favoriteNews.find((item) => item.id === id) ?? null;
}
