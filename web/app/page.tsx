import { INewsCard } from '@/entities/newsCard/model/types';
import NewsCard from '@/entities/newsCard/ui/newsCard';

async function getNews() {
  const res = await fetch('http://localhost:3000/api/news');
  const data = await res.json();
  return data.articles;
}

export default async function HomePage() {
  const data = await getNews();

  console.log(data);

  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
      {data.map((item, idx) => {
        const data: INewsCard = {
          title: item.title,
          description: item.description,
          image: item.urlToImage,
          source: item.source.name,
          date: new Date(item.publishedAt).toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }),
        };

        return <NewsCard key={idx} data={data} />;
      })}
    </div>
  );
}
