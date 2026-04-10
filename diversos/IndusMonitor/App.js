import React from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { darkIndustrialTheme } from './src/theme/darkIndustrialTheme';

export default function App() {
  return (
    <PaperProvider theme={darkIndustrialTheme}>
      <RNNavigationContainer>a
        <SafeAreaProvider>
          <RootNavigator />
          <StatusBar barStyle="light-content" backgroundColor="#0A0E27" />
        </SafeAreaProvider>
      </RNNavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
