import NewsCardList from '@/features/newsCardList/ui/newsCardList';

const MainPage = () => {
  return <NewsCardList params={{ 'source-country': 'us' }} />;
};

export default MainPage;
