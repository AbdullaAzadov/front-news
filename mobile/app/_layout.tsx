import { SessionProvider } from '@/context/authContext';
import { Slot } from 'expo-router';

export default function Root() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
