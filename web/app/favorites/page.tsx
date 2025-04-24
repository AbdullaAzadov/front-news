'use client';
import FavoritesPage from '@/pages/favorites/ui/favoritesPage';
import FavoritesPageRN from '@/pages/favorites/ui/favoritesPageRN';
import { useIsWebview } from '@/shared/hooks/useIsWebview';
import { Suspense } from 'react';

const Page = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <PageContent />
    </Suspense>
  );
};

function PageContent() {
  const { isWebview } = useIsWebview();

  return isWebview ? <FavoritesPageRN /> : <FavoritesPage />;
}

export default Page;
