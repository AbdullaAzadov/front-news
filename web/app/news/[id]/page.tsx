'use client';
import NewsDetailsPage from '@/pages/newsDetails/ui/newsDetailsPage';
import NewsDetailsPageRN from '@/pages/newsDetails/ui/newsDetailsPageRN';
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

  if (isWebview) return <NewsDetailsPageRN />;
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <NewsDetailsPage />
    </Suspense>
  );
}

export default Page;
