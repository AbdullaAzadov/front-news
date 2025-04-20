import { getBaseUrl } from '../utils/fetchHelpers';
import { IRetrieveArticleResponse } from './types';

export async function getArticleById(
  id: string
): Promise<IRetrieveArticleResponse> {
  const res = await fetch(`${getBaseUrl()}/api/news/getArticleById?ids=${id}`);
  const data = await res.json();
  return data;
}
