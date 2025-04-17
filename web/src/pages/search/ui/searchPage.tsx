'use client';
import { INewsCard } from '@/entities/newsCard/model/types';
import NewsCard from '@/entities/newsCard/ui/newsCard';
import { useNewsPagination } from '@/shared/hooks/useNewsPagination';
import { useSearchParams } from 'next/navigation';

type Props = {
  query: string
};

const SearchPage = () => {
  const params = useSearchParams();
  const query = params?.get('q') ?? 'a';

  return <SearchPageInner key={query} query={query} />;
};

const SearchPageInner = ({query}: Props) => {
  const { articles, loaderRef, loading, hasMore } = useNewsPagination({q: query });

  if (!articles.length) return null;

  return (
    <div>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
        {articles.map((item, idx) => {
          const data: INewsCard = {
            title: item.title,
            description: item.description,
            image: item.urlToImage,
            source: item.source.name,
            date: new Date(item.publishedAt).toLocaleString('ru', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }),
          };

          return <NewsCard key={idx} data={data} />;
        })}
      </div>
      <div
        ref={loaderRef}
        className='h-10 mt-4 flex justify-center items-center'
      >
        {loading && <span className='text-sm text-gray-500'>Загрузка...</span>}
        {!hasMore && <span className='text-sm text-gray-500'>Все новости загружены</span>}
      </div>
    </div>
  );
};

export default SearchPage;
