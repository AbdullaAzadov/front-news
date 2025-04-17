'use client';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/shared/shadcn/components/ui/card';
import { INewsCard } from '../model/types';
import { useState } from 'react';
import { BookmarkIcon } from 'lucide-react';
import { cn } from '@/shared/shadcn/lib/utils';
import { toast } from 'sonner';

type Props = {
  data: INewsCard;
};

const NewsCard = ({ data }: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  function onClickFavorite() {
    if (!isFavorite) {
      // TODO: add to favorites
      toast.success('Новость добавлена в избранное');
    } else {
      // TODO: remove from favorites
      toast.info('Новость удалена из избранных');
    }
    setIsFavorite(!isFavorite);
  }

  return (
    <Card className='max-w-fit cursor-pointer hover:shadow-lg border hover:border-gray-400 transition-all'>
      <CardHeader
        className='relative'
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
      >
        <img
          src={data.image}
          alt={data.title}
          className='rounded-md aspect-video object-cover'
          loading='lazy'
        />
        {isFocused && (
          <div
            className='absolute w-fit p-1 rounded-sm right-1/12 top-2 flex items-center justify-center bg-gray-800/50 backdrop-blur-3xl'
            onClick={onClickFavorite}
          >
            <BookmarkIcon
              className={cn(
                'stroke-white transition-colors',
                isFavorite && 'stroke-indigo-500 fill-indigo-500'
              )}
            />
          </div>
        )}
      </CardHeader>
      <CardContent className='flex flex-col justify-between h-full gap-2'>
        <h3 className='font-semibold text-lg text-neutral-950 select-none line-clamp-2 hover:text-indigo-950'>
          {data.title}
        </h3>
        <p className='text-neutral-800 select-none line-clamp-2'>
          {data.description}
        </p>
        <div className='flex gap-2 text-sm pt-2 text-neutral-500'>
          <span>{data.source}</span>
          <span>&#8226;</span>
          <span>{data.date.toString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
