'use client';
import { ScrollTextIcon } from 'lucide-react';
import React from 'react';
import { cn } from '../shadcn/lib/utils';
import { redirect } from 'next/navigation';
import { ROUTES } from '@/app/routes/routes';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: () => void;
}

const Logo = ({ className, onClick, ...props }: Props) => {
  function handleClick() {
    if (onClick) {
      onClick();
      return;
    }

    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
    redirect(ROUTES.MAIN);
  }

  return (
    <div
      className={cn(
        'flex items-center gap-2 cursor-pointer hover:opacity-75 transition-opacity w-fit',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <ScrollTextIcon size={36} strokeWidth={2} className='stroke-indigo-950' />
      <span className='text-xl font-bold text-indigo-950 select-none'>
        FrontNews
      </span>
    </div>
  );
};

export default Logo;
