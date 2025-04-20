'use client';
import { ROUTES } from '@/app/routes/routes';
import SearchInput from '@/features/searchInput/ui/searchInput';
import { useIsWebview } from '@/shared/hooks/useIsWebview';
import Logo from '@/shared/ui/logo';
import { BookMarkedIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

const Header = () => {
  const { isWebview } = useIsWebview();

  if (isWebview) return null;
  return (
    <header className='bg-white w-full py-4 shadow-xs'>
      <div className='container mx-auto relative flex justify-between'>
        <Logo />
        <div className='md:absolute md:w-1/3 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2'>
          <Suspense>
            <SearchInput />
          </Suspense>
        </div>
        <Link
          href={ROUTES.FAVORITES}
          className='flex gap-2 items-center text-indigo-950 hover:text-indigo-800 transition-colors cursor-pointer'
        >
          <BookMarkedIcon className='w-5 h-5' />
          <span className='text-base md:block hidden'>Избранное</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
