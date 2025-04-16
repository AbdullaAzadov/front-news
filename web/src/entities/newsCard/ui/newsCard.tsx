import {
  Card,
  CardContent,
  CardHeader,
} from '@/shared/shadcn/components/ui/card';
import { INewsCard } from '../model/types';

type props = {
  data: INewsCard;
};

const NewsCard = ({ data }: props) => {
  return (
    <Card className='max-w-fit cursor-pointer hover:shadow-md transition-shadow'>
      <CardHeader>
        <img
          src={data.image}
          alt={data.title}
          className='rounded-md w-full h-full object-cover'
        />
      </CardHeader>
      <CardContent className='space-y-2'>
        <h3 className='font-semibold text-lg text-neutral-950 hover:text-indigo-950 select-none'>
          {data.title}
        </h3>
        <p className='text-neutral-800 select-none '>{data.description}</p>
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
