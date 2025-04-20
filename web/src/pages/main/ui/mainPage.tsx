import NewsCardSearch from '@/features/newsSearch/ui/newsSearch';

const MainPage = () => {
  return (
    <div className='space-y-2 md:space-y-10'>
      <h2 className='text-2xl font-bold'>Последние новости</h2>
      <NewsCardSearch params={{ 'source-country': 'us' }} />
    </div>
  );
};

export default MainPage;
