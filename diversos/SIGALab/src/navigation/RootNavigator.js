import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import EquipmentsScreen from '../screens/EquipmentsScreen';
import BenchesScreen from '../screens/BenchesScreen';
import DamageReportScreen from '../screens/DamageReportScreen';
import UsageHistoryScreen from '../screens/UsageHistoryScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { initializing, isAuthenticated } = useAuth();

  if (initializing) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'SIGALab' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Criar conta' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'SIGALab' }} />
          <Stack.Screen name="Benches" component={BenchesScreen} options={{ title: 'Bancadas' }} />
          <Stack.Screen name="DamageReport" component={DamageReportScreen} options={{ title: 'Avarias' }} />
          <Stack.Screen name="UsageHistory" component={UsageHistoryScreen} options={{ title: 'Histórico' }} />
          <Stack.Screen name="Equipments" component={EquipmentsScreen} options={{ title: 'Equipamentos' }} />
        </>
      )}
    </Stack.Navigator>
  );
}

