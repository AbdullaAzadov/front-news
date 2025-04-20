'use client';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/shared/shadcn/components/ui/card';
import { useState } from 'react';
import { BookmarkIcon, EyeIcon } from 'lucide-react';
import { cn } from '@/shared/shadcn/lib/utils';
import { toast } from 'sonner';
import { AspectRatio } from '@/shared/shadcn/components/ui/aspect-ratio';
import { ISearchNewsArticleResponse } from '@/shared/api/types';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/routes/routes';
import Link from 'next/link';

type Props = {
  data: ISearchNewsArticleResponse;
  onFavorite?: (data: ISearchNewsArticleResponse) => void;
  onRemoveFavorite?: (data: ISearchNewsArticleResponse) => void;
  defaultFavorited?: boolean;
  onViewed?: (data: ISearchNewsArticleResponse) => void;
  isViewed?: boolean;
};

const NewsCardItem = ({
  data,
  onFavorite,
  onRemoveFavorite,
  defaultFavorited = false,
  onViewed,
  isViewed,
}: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(defaultFavorited);
  const noImageSrc = `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/no-image.png`;
  const router = useRouter();

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

  // TODO: logic in webview
  // function onClickCard() {
  //   onViewed?.(data);
  //   router.push(`${ROUTES.NEWS}/${data.id}`);
  // }

  const date = format(
    new Date(data.publish_date.replace(' ', 'T')),
    'd MMMM yyyy',
    { locale: ru }
  );

  return (
    <Card className='max-w-fit hover:shadow-lg border hover:border-gray-400 transition-all'>
      <CardHeader
        className='relative'
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
      >
        <AspectRatio ratio={16 / 9}>
          <Link
            href={`${ROUTES.NEWS}/${data.id}`}
            onClick={() => onViewed?.(data)}
            target='_blank'
            className='cursor-pointer'
          >
            <img
              src={data.image || noImageSrc}
              alt={data.title}
              className='rounded-md h-full w-full object-cover bg-gray-300'
              loading='lazy'
              onError={(e) => (e.currentTarget.src = noImageSrc)}
            />
          </Link>
        </AspectRatio>
        {isFocused && (
          <div
            className='absolute cursor-pointer w-fit p-1 rounded-sm right-1/12 top-2 flex items-center justify-center bg-gray-800/50 backdrop-blur-3xl'
            onClick={(e) => {
              e.stopPropagation();
              onClickFavorite();
            }}
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
      <Link
        href={`${ROUTES.NEWS}/${data.id}`}
        onClick={() => onViewed?.(data)}
        target='_blank'
        className='cursor-pointer'
      >
        <CardContent className='flex flex-col justify-between h-full gap-2'>
          <h3 className='font-semibold text-lg text-neutral-950 select-none line-clamp-2 hover:text-indigo-950'>
            {data.title}
          </h3>
          <p className='text-neutral-800 select-none line-clamp-2'>
            {data.text}
          </p>
          <div className='flex justify-between items-center'>
            <p className='text-sm text-neutral-500'>{date}</p>
            {isViewed && (
              <div className='text-sm flex items-center gap-1 text-neutral-500'>
                <span>Просмотрено</span>
                <EyeIcon className='size-4' />
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default NewsCardItem;
