'use client';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/shared/shadcn/components/ui/card';
import React, { useState } from 'react';
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
import noImage from '@/../public/assets/images/no-image.png';
import { useIsWebview } from '@/shared/hooks/useIsWebview';

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
  const router = useRouter();
  const { isWebview } = useIsWebview();

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

  function onClickCardMobile() {
    onViewed?.(data);
    if (typeof window !== 'undefined' && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(data));
    }
    // router.push(`${ROUTES.NEWS}/${data.id}`);
    // window.open(`${ROUTES.NEWS}/${data.id}`, '_blank');
  }

  const date = format(
    new Date(data.publish_date.replace(' ', 'T')),
    'd MMMM yyyy',
    { locale: ru }
  );

  return (
    <Card
      className='max-w-fit hover:shadow-lg border hover:border-gray-400 transition-all'
      onClick={() => isWebview && onClickCardMobile()}
    >
      <CardHeader
        className='relative'
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
      >
        <AspectRatio ratio={16 / 9}>
          <LinkNode
            href={`${ROUTES.NEWS}/${data.id}`}
            onClick={() => onViewed?.(data)}
            target='_blank'
            isWebview={isWebview}
          >
            <img
              src={data.image || noImage.src}
              alt={data.title}
              className='rounded-md h-full w-full object-cover bg-gray-300'
              loading='lazy'
              onError={(e) => (e.currentTarget.src = noImage.src)}
            />
          </LinkNode>
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
      <LinkNode
        href={`${ROUTES.NEWS}/${data.id}`}
        onClick={() => onViewed?.(data)}
        target='_blank'
        className='cursor-pointer'
        isWebview={isWebview}
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
      </LinkNode>
    </Card>
  );
};

function LinkNode({
  isWebview,
  children,
  ...rest
}: React.ComponentProps<typeof Link> & { isWebview: boolean }) {
  if (isWebview) return <>{children}</>;
  return <Link {...rest}>{children}</Link>;
}

export default NewsCardItem;
