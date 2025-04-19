'use client';
import NewsCardList from '@/features/newsCardList/ui/newsCardList';
import NewsControls from '@/features/newsControls/ui/newsControls';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const SearchPage = () => {
  const urlParams = useSearchParams();
  const query = urlParams?.get('q') ?? 'apple';
  const [params, setParams] = useState<string>('');

  const key = query + params;

  return (
    <div className='space-y-8'>
      <NewsControls params={params} setParams={setParams} />
      <hr />
      <NewsCardList
        key={key}
        params={{ text: query }}
        paramsInString={params}
      />
    </div>
  );
};

export default SearchPage;
