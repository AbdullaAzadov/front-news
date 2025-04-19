'use client';
import { ROUTES } from '@/app/routes/routes';
import { Input } from '@/shared/shadcn/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { redirect, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const SearchInput = () => {
  const params = useSearchParams();
  const [search, setSearch] = React.useState<string>(getQuery() ?? '');

  const handleSearch = () => {
    redirect(`${ROUTES.SEARCH}?q=${search}`);
  };

  useEffect(() => {
    const qParam = getQuery();
    if (qParam && qParam !== search) setSearch(qParam);
  }, [params]);

  function getQuery(): string | null {
    return params?.get('q') ?? null;
  }

  return (
    <div className='relative w-full'>
      <Input
        className='w-full border-neutral-300 rounded-full text-lg!'
        placeholder='Поиск...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
          }
        }}
      />
      <SearchIcon
        size={20}
        strokeWidth={2.5}
        onClick={handleSearch}
        className='absolute top-1/2 right-4 -translate-y-1/2 stroke-neutral-600 cursor-pointer active:stroke-neutral-950'
      />
    </div>
  );
};

export default SearchInput;
