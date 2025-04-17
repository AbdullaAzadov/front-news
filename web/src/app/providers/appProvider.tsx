'use client';
import { Toaster } from '@/shared/shadcn/components/ui/sonner';
import { BanIcon, CircleCheckIcon, InfoIcon } from 'lucide-react';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster
        duration={2000}
        icons={{
          success: <CircleCheckIcon className='stroke-indigo-700' size={20} />,
          error: <BanIcon className='stroke-red-700' size={20} />,
          info: <InfoIcon className='stroke-gray-700' size={20} />,
        }}
      />
    </>
  );
};

export default AppProvider;
