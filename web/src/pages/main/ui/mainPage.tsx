import NewsCardList from '@/features/newsCardList/ui/newsCardList';
import NewsControls from '@/features/newsControls/ui/newsControls';

const MainPage = () => {
  return (
    <div className='space-y-10'>
      <NewsControls />
      <NewsCardList params={{ 'source-country': 'us' }} />
    </div>
  );
};

export default MainPage;
