import NewsCardList from '@/features/newsSearch/ui/newsSearch';

const MainPage = () => {
  return (
    <div className='space-y-10'>
      <h2 className='text-2xl font-bold'>Последние новости</h2>
      <NewsCardList params={{ 'source-country': 'us' }} />
    </div>
  );
};

export default MainPage;
