import MainPage from '@/pages/main/ui/mainPage';
import { fetchMainPageNews } from '@/shared/api/api';

export default async function Page() {
  const data = await fetchMainPageNews({ page: 1, pageSize: 50 });

  return <MainPage initialData={data} />;
}
