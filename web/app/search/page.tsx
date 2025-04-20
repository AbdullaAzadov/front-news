'use client';
import SearchPage from '@/pages/search/ui/searchPage';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}
