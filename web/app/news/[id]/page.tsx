'use client';
import NewsDetailsPage from '@/pages/newsDetails/ui/newsDetailsPage';
import NewsDetailsPageRN from '@/pages/newsDetails/ui/newsDetailsPageRN';
import { useIsWebview } from '@/shared/hooks/useIsWebview';

const Page = () => {
  const { isWebview } = useIsWebview();

  if (isWebview) return <NewsDetailsPageRN />;
  return <NewsDetailsPage />;
};

export default Page;
