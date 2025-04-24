'use client';
import { useIsWebview } from '@/shared/hooks/useIsWebview';
import { Toaster } from '@/shared/shadcn/components/ui/sonner';
import { BanIcon, CircleCheckIcon, InfoIcon } from 'lucide-react';
import RNInitializer from './RNInitializer';
import { Provider } from 'react-redux';
import { store } from '@/shared/store/store';
import { Suspense } from 'react';

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <AppProviderContent>{children}</AppProviderContent>
    </Suspense>
  );
};

function AppProviderContent({ children }: { children: React.ReactNode }) {
  const { isWebview } = useIsWebview();

  return (
    <Provider store={store}>
      <RNInitializer>{children}</RNInitializer>
      <Toaster
        duration={2000}
        position={isWebview ? 'top-center' : 'bottom-right'}
        icons={{
          success: <CircleCheckIcon className="stroke-indigo-700" size={20} />,
          error: <BanIcon className="stroke-red-700" size={20} />,
          info: <InfoIcon className="stroke-gray-700" size={20} />,
        }}
      />
    </Provider>
  );
}

export default AppProvider;
