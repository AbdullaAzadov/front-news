import { SearchCategoryTags } from '@/features/newsControls/model/data';
import { ISearchNewsArticleResponse } from '@/shared/api/types';
import { AspectRatio } from '@/shared/shadcn/components/ui/aspect-ratio';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/shared/shadcn/components/ui/card';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import React from 'react';
import noImage from '@/../public/assets/images/no-image.png';

type Props = {
  data: ISearchNewsArticleResponse;
};

const NewsDetailsRN = ({ data }: Props) => {
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
    <Card className='flex flex-col gap-4'>
      <CardHeader className='flex flex-col gap-4`'>
        <div className='flex flex-col justify-center h-full w-full'>
          <AspectRatio ratio={16 / 9}>
            <img
              src={data.image || noImage.src}
              alt={data.title}
              className='rounded-md h-full w-full object-cover bg-gray-300'
              onError={(e) => (e.currentTarget.src = noImage.src)}
            />
          </AspectRatio>
        </div>

        <div className='h-fit flex flex-col  gap-4 xl:gap-6 justify-center py-2'>
          <hr className=' hidden xl:block' />
          <h1 className='text-xl 2xl:text-2xl  font-bold text-indigo-950'>
            {data.title}
          </h1>

          <div className='flex flex-col gap-2'>
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
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col  justify-between h-fit gap-2'>
        <h3 className='font-semibold text-2xl text-indigo-950 whitespace-pre-line'>
          Описание
        </h3>
        <p className='text-neutral-700 select-none text-lg'>{data.text}</p>
      </CardContent>
    </Card>
  );
};

export default NewsDetailsRN;
