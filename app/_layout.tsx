import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColorScheme } from '@/hooks/useColorScheme';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import { Link } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }



  // const { width, height } = Dimensions.get('window');

  return (
    <ThemeProvider value={ colorScheme === 'light' ? DarkTheme : DefaultTheme }>
      <GestureHandlerRootView>
        <Stack>
          {/* <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/signup" /> */}
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

