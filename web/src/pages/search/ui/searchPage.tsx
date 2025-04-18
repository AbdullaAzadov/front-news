'use client';
import NewsCardList from '@/features/newsCardList/ui/newsCardList';
import { useSearchParams } from 'next/navigation';

const SearchPage = () => {
  const params = useSearchParams();
  const query = params?.get('q') ?? 'apple';

  return <NewsCardList key={query} params={{ text: query }} />;
};

export default SearchPage;
