'use client';
import SearchPage from '@/pages/search/ui/searchPage';
import { Suspense } from 'react';

export default async function Page() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}
