import { SearchCategoryTags } from '@/features/newsControls/model/data';
import { ISearchNewsArticleResponse } from '@/shared/api/types';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import { AspectRatio } from '@/shared/shadcn/components/ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/shared/shadcn/components/ui/card';
import { cn } from '@/shared/shadcn/lib/utils';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { BookmarkIcon, ExternalLinkIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

type Props = {
  data: ISearchNewsArticleResponse;
};

const NewsDetails = ({ data }: Props) => {
  const noImageSrc = `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/no-image.png`;
  const date = format(
    new Date(data.publish_date.replace(' ', 'T')),
    'd MMMM yyyy',
    { locale: ru }
  );
  const category = data.category
    ? SearchCategoryTags.filter((item) => item.value === data.category)?.[0]
        .label ?? 'Не указана'
    : 'Не указана';

  const { data: favoriteNews, set: setFavoriteNews } =
    useLocalStorage<ISearchNewsArticleResponse[]>('favoriteNews');
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false);

  useEffect(() => {
    if (favoriteNews) {
      setIsFavorite(favoriteNews.some((item) => item.id === data.id));
    }
  }, [favoriteNews]);

  function handleAddFavorite(data: ISearchNewsArticleResponse) {
    favoriteNews
      ? setFavoriteNews([...favoriteNews, data])
      : setFavoriteNews([data]);
    setIsFavorite(true);
    toast.success('Новость добавлена в избранное');
  }

  function handleRemoveFavorite(data: ISearchNewsArticleResponse) {
    favoriteNews
      ? setFavoriteNews(favoriteNews.filter((item) => item.id !== data.id))
      : setFavoriteNews([]);
    setIsFavorite(false);
    toast.info('Новость удалена из избранных');
  }

  return (
    <Card>
      <CardHeader className='grid lg:grid-cols-2 gap-4 md:gap-6 xl:gap-8 2xl:gap-10'>
        <div className='flex flex-col justify-center h-full'>
          <AspectRatio ratio={16 / 9}>
            <img
              src={data.image || noImageSrc}
              alt={data.title}
              className='rounded-md h-full w-full object-cover bg-gray-300'
              onError={(e) => (e.currentTarget.src = noImageSrc)}
            />
          </AspectRatio>
        </div>

        <div className='h-full flex flex-col gap-4 xl:gap-6 justify-center py-2'>
          <hr className=' hidden xl:block' />
          <h1 className='text-xl 2xl:text-2xl  font-bold text-indigo-950'>
            {data.title}
          </h1>

          <div className='space-y-4'>
            <p className='2xl:text-lg text-base'>Категория: {category}</p>
            <p className='2xl:text-lg text-base'>
              Дата публикации: {date ?? 'Не указана'}
            </p>
            <p className='2xl:text-lg text-base'>
              Автор: {data.author ?? 'Не указан'}
            </p>
            <p className='2xl:text-lg text-base'>
              Краткое содержание: {data.summary ?? 'Не указано'}
            </p>
            <div className='flex gap-4 items-center'>
              <a
                href={data.url}
                target='_blank'
                rel='noreferrer'
                className='flex items-center text-white bg-indigo-800 w-fit hover:bg-indigo-900 transition-colors px-4 py-2 rounded-2xl gap-2'
              >
                <span className='2xl:text-lg text-base'>
                  Посмотреть источник
                </span>
                <ExternalLinkIcon className='size-5 stroke-2' />
              </a>
              <div
                className='text-white bg-indigo-800 p-2 rounded-lg hover:bg-indigo-900 transition-colors cursor-pointer'
                onClick={() =>
                  isFavorite
                    ? handleRemoveFavorite(data)
                    : handleAddFavorite(data)
                }
              >
                <BookmarkIcon
                  className={cn('size-6', isFavorite && 'fill-white')}
                />
              </div>
            </div>
          </div>
          <hr className=' hidden xl:block' />
        </div>
      </CardHeader>
      <CardContent className='flex flex-col justify-between h-full gap-2'>
        <h3 className='font-semibold text-2xl text-indigo-950'>Описание</h3>
        <p className='text-neutral-700 select-none text-lg'>{data.text}</p>
      </CardContent>
    </Card>
  );
};

export default NewsDetails;
