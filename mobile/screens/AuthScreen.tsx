import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useSession } from '@/context/authContext';
import { router } from 'expo-router';

export default function AuthScreen() {
  const { isAuthenticated, signIn } = useSession();
  const [pin, setPin] = useState('');
  const [showPinInput, setShowPinInput] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) return;

    router.replace('/');
  }, [isAuthenticated]);

  const authenticateWithBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Войдите с помощью Face ID или Touch ID',
        fallbackLabel: 'Использовать код устройства',
      });

      if (result.success) {
        signIn();
      } else {
        setShowPinInput(true);
        setError('Не удалось войти в приложение с проверкой биометрий');
      }
    } else {
      setShowPinInput(true);
      setError('Не удалось войти в приложение с проверкой биометрий');
    }
  };

  const handlePinSubmit = () => {
    signIn();
  };

  return (
    <View style={styles.container}>
      {showPinInput ? (
        <>
          <Text style={styles.title}>Введите код устройства</Text>
          <TextInput
            value={pin}
            onChangeText={setPin}
            placeholder="****"
            keyboardType="numeric"
            secureTextEntry
            style={styles.input}
          />
          <Button title="Продолжить" onPress={handlePinSubmit} />
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </>
      ) : (
        <View style={styles.main}>
          <Image
            source={require('../assets/images/news-paper.png')}
            style={styles.img}
          />
          <Text style={styles.title}>Front News</Text>
          <Button onPress={authenticateWithBiometrics} title="Войти" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1e1a4d',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 18,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 8,
    textAlign: 'center',
  },

  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  img: {
    width: 200,
    height: 200,
  },
});
