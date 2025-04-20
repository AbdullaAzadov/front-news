'use client';
import NewsDetailsPage from '@/pages/newsDetails/ui/newsDetailsPage';
import NewsDetailsPageWithData from '@/pages/newsDetails/ui/newsDetailsPageWithData';
import { useIsWebview } from '@/shared/hooks/useIsWebview';

const Page = () => {
  const { isWebview, isWithData } = useIsWebview();

  if (isWebview && isWithData) return <NewsDetailsPageWithData />;
  return <NewsDetailsPage />;
};

export default Page;
