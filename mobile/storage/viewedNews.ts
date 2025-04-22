import { ISearchNewsArticleResponse } from '@/types/news';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getViewedNews(): Promise<ISearchNewsArticleResponse[]> {
  const raw = await AsyncStorage.getItem('viewedNews');

  if (raw) return JSON.parse(raw);

  const init: ISearchNewsArticleResponse[] = [];
  await AsyncStorage.setItem('viewedNews', JSON.stringify(init));
  return init;
}

export async function addViewedNews(
  data: ISearchNewsArticleResponse
): Promise<'ok' | 'error'> {
  const viewedNews = await getViewedNews();
  const find = await getViewedNewsById(viewedNews, data.id);

  if (!find) {
    viewedNews.push(data);
    await AsyncStorage.setItem('viewedNews', JSON.stringify(viewedNews));
    return 'ok';
  }

  return 'error';
}

export async function removeViewedNews(
  data: ISearchNewsArticleResponse
): Promise<'ok' | 'error'> {
  const viewedNews = await getViewedNews();
  const find = await getViewedNewsById(viewedNews, data.id);

  if (find) {
    const filtered = viewedNews.filter((item) => item.id !== data.id);
    await AsyncStorage.setItem('viewedNews', JSON.stringify(filtered));
    return 'ok';
  }
  return 'error';
}

export async function getViewedNewsById(
  data: ISearchNewsArticleResponse[] | undefined,
  id: ISearchNewsArticleResponse['id']
): Promise<ISearchNewsArticleResponse | null> {
  const viewedNews = data ?? (await getViewedNews());
  return viewedNews.find((item) => item.id === id) ?? null;
}

export async function getAllViewedNewsId(): Promise<
  ISearchNewsArticleResponse['id'][]
> {
  const viewedNews = await getViewedNews();
  return viewedNews.map((item) => item.id);
}
