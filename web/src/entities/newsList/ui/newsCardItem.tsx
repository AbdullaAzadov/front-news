'use client';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/shared/shadcn/components/ui/card';
import { useState } from 'react';
import { BookmarkIcon } from 'lucide-react';
import { cn } from '@/shared/shadcn/lib/utils';
import { toast } from 'sonner';
import { AspectRatio } from '@/shared/shadcn/components/ui/aspect-ratio';
import { ISearchNewsArticleResponse } from '@/shared/api/types';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

type Props = {
  data: ISearchNewsArticleResponse;
  onFavorite?: (data: ISearchNewsArticleResponse) => void;
  onRemoveFavorite?: (data: ISearchNewsArticleResponse) => void;
  defaultFavorited?: boolean;
};

const NewsCardItem = ({
  data,
  onFavorite,
  onRemoveFavorite,
  defaultFavorited = false,
}: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(defaultFavorited);
  const noImageSrc = `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/no-image.png`;

  function onClickFavorite() {
    if (!isFavorite) {
      onFavorite?.(data);
      toast.success('Новость добавлена в избранное');
    } else {
      onRemoveFavorite?.(data);
      toast.info('Новость удалена из избранных');
    }
    setIsFavorite(!isFavorite);
  }

  const date = format(
    new Date(data.publish_date.replace(' ', 'T')),
    'd MMMM yyyy',
    { locale: ru }
  );

  return (
    <Card className='max-w-fit cursor-pointer hover:shadow-lg border hover:border-gray-400 transition-all'>
      <CardHeader
        className='relative'
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
      >
        <AspectRatio ratio={16 / 9}>
          <img
            src={data.image || noImageSrc}
            alt={data.title}
            className='rounded-md h-full w-full object-cover bg-gray-300'
            loading='lazy'
            onError={(e) => (e.currentTarget.src = noImageSrc)}
          />
        </AspectRatio>
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
        <p className='text-neutral-800 select-none line-clamp-2'>{data.text}</p>
        <p className='text-sm pt-2 text-neutral-500'>{date}</p>
      </CardContent>
    </Card>
  );
};

export default NewsCardItem;
