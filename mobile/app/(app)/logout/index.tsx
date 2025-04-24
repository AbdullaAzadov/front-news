import { useSession } from '@/context/authContext';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text } from 'react-native';

const Logout = () => {
  const { signOut } = useSession();
  const router = useRouter();

  useEffect(() => {
    signOut();
    router.push('/auth');
  }, []);

  return <Text>Logout Screen</Text>;
};

export default Logout;
