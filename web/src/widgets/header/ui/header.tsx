import React from 'react';
import SearchInput from '@/features/searchInput/ui/searchInput';
import Logo from '@/shared/ui/logo';

const Header = () => {
  return (
    <header className='bg-white w-full py-4 shadow-xs'>
      <div className='container mx-auto relative'>
        <Logo />
        <div className='absolute w-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2'>
          <SearchInput />
        </div>
      </div>
    </header>
  );
};

export default Header;
