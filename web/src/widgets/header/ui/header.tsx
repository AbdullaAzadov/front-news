'use client';
import { ROUTES } from '@/app/routes/routes';
import SearchInput from '@/features/searchInput/ui/searchInput';
import { useIsWebview } from '@/shared/hooks/useIsWebview';
import Logo from '@/shared/ui/logo';
import { BookMarkedIcon } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const { isWebview } = useIsWebview();

  if (isWebview) return null;
  return (
    <header className='bg-white w-full py-4 shadow-xs'>
      <div className='container mx-auto relative flex justify-between'>
        <Logo />
        <div className='absolute w-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2'>
          <SearchInput />
        </div>
        <Link
          href={ROUTES.FAVORITES}
          className='flex gap-2 items-center text-indigo-950 hover:text-indigo-800 transition-colors cursor-pointer'
        >
          <BookMarkedIcon className='w-5 h-5' />
          <span className='text-base'>Избранное</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
