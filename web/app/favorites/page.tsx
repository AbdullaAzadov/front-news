'use client';
import FavoritesPage from '@/pages/favorites/ui/favoritesPage';
import FavoritesPageRN from '@/pages/favorites/ui/favoritesPageRN';
import { useIsWebview } from '@/shared/hooks/useIsWebview';

const Page = () => {
  const { isWebview } = useIsWebview();
  return isWebview ? <FavoritesPageRN /> : <FavoritesPage />;
};

export default Page;
