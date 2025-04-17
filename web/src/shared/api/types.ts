export interface ISearchNewsResponse {
  status: "ok" | "error";
  totalResults: number;
  articles: ISearchNewsArticleResponse[];
}

export interface ISearchNewsArticleResponse {
  source: ISearchNewsSourceResponse;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface ISearchNewsSourceResponse {
  id: string;
  name: string;
}
