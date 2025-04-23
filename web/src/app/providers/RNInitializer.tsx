import { useRNMessageListener } from '@/shared/hooks/useRNMessageListener';
import { initializeNewsStore } from '@/shared/store/slices/newsSlice';
import { store } from '@/shared/store/store';
import { useEffect } from 'react';

function RNInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = store.dispatch;
  useEffect(() => {
    dispatch(initializeNewsStore());
  }, [dispatch]);

  useRNMessageListener();

  return <>{children}</>;
}
export default RNInitializer;
