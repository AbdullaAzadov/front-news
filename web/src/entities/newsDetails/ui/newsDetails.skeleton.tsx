import { AspectRatio } from '@/shared/shadcn/components/ui/aspect-ratio';
import { Skeleton } from '@/shared/shadcn/components/ui/skeleton';
import React from 'react';

const NewsDetailsSkeleton = () => {
  return (
    <div className='bg-red-50 h-[80vh]'>
      <div className='bg-card text-card-foreground flex flex-col gap-8 rounded-xl border p-3 h-full shadow-sm'>
        <div className='flex-1/2 flex gap-3'>
          <Skeleton className='h-full w-1/2' />
          <div className='w-1/2 flex flex-col justify-around gap-4'>
            <Skeleton className='h-1/6 w-full' />
            <Skeleton className='h-2/8 w-full' />
            <Skeleton className='h-2/5 w-full' />
            <Skeleton className='h-1/12 w-full' />
          </div>
        </div>
        <div className='flex-1/2 flex flex-col gap-4'>
          <Skeleton className='h-6 w-1/2' />
          <Skeleton className='h-full w-full' />
        </div>
      </div>
    </div>
  );
};

export default NewsDetailsSkeleton;
