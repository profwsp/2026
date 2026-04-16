import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { NavigationStack } from './src/navigation/NavigationStack';

export default function App() {
  return (
    <AuthProvider>
      <NavigationStack />
    </AuthProvider>
  );
}
