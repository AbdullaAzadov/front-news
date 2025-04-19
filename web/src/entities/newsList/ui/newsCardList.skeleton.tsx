import { AspectRatio } from '@/shared/shadcn/components/ui/aspect-ratio';
import { Skeleton } from '@/shared/shadcn/components/ui/skeleton';
import React from 'react';

const NewsCardListSkeleton = () => {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className='bg-card text-card-foreground flex flex-col gap-3 rounded-xl border py-3 shadow-sm animate-pulse px-3'
        >
          <AspectRatio ratio={16 / 9}>
            <Skeleton className='h-full w-full' />
          </AspectRatio>
          <div className='space-y-4'>
            <Skeleton className='h-6 w-1/2' />
            <Skeleton className='h-8 w-3/4' />
            <Skeleton className='h-4 w-3/4' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsCardListSkeleton;
