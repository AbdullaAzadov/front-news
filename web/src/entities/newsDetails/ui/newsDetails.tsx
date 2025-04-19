import { SearchCategoryTags } from '@/features/newsControls/model/data';
import {
  ISearchNewsArticleResponse,
  TSearchCategory,
} from '@/shared/api/types';
import { AspectRatio } from '@/shared/shadcn/components/ui/aspect-ratio';
import { Button } from '@/shared/shadcn/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/shared/shadcn/components/ui/card';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ExternalLinkIcon } from 'lucide-react';
import React from 'react';

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

  return (
    <Card>
      <CardHeader className='grid grid-cols-2 gap-10'>
        <div>
          <AspectRatio ratio={16 / 9}>
            <img
              src={data.image || noImageSrc}
              alt={data.title}
              className='rounded-md h-full w-full object-cover bg-gray-300'
              onError={(e) => (e.currentTarget.src = noImageSrc)}
            />
          </AspectRatio>
        </div>

        <div className='h-full flex flex-col gap-6 justify-center py-2'>
          <hr />
          <h1 className='font-bold text-2xl select-none text-indigo-950'>
            {data.title}
          </h1>

          <div className='space-y-2.5'>
            <p className='text-lg'>Категория: {category}</p>
            <p className='text-lg'>Дата публикации: {date ?? 'Не указана'}</p>
            <p className='text-lg'>Автор: {data.author ?? 'Не указан'}</p>
            <p className='text-lg'>
              Краткое содержание: {data.summary ?? 'Не указано'}
            </p>
            <a
              href={data.url}
              target='_blank'
              rel='noreferrer'
              className='flex items-center text-white bg-indigo-800 w-fit hover:bg-indigo-900 transition-colors px-4 py-2 rounded-2xl gap-2'
            >
              <span className='text-lg'>Посмотреть источник</span>
              <ExternalLinkIcon className='size-5 stroke-2' />
            </a>
          </div>
          <hr />
        </div>
      </CardHeader>
      <CardContent className='flex flex-col justify-between h-full gap-2'>
        <h3 className='font-semibold text-2xl text-indigo-950'>Описание</h3>
        <p className='text-neutral-800 select-none text-lg'>{data.text}</p>
      </CardContent>
    </Card>
  );
};

export default NewsDetails;
