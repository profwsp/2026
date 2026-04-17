import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ActivityIndicator, View } from 'react-native';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import { useAuth } from '../context/AuthContext';

import BenchesScreen from '../screens/BenchesScreen';
import DamageReportScreen from '../screens/DamageReportScreen';
import EquipmentsScreen from '../screens/EquipmentsScreen';
import UsageHistoryScreen from '../screens/UsageHistoryScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack de Autenticação
const AuthStack = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

// Stack da Aplicação Principal
const MainStack = () => {
  const { user } = useAuth();
  const role = user?.role || 'aluno';

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E0E0E0',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#0066CC',
        tabBarInactiveTintColor: '#999999',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
          borderBottomColor: '#E0E0E0',
          borderBottomWidth: 1,
        },
        headerTintColor: '#0066CC',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          title: 'LabApp Didático',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Bancadas"
        component={BenchesScreen}
        options={{
          tabBarLabel: 'Bancadas',
          title: 'Agendamento',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="seat"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Avarias"
        component={DamageReportScreen}
        options={{
          tabBarLabel: 'Avarias',
          title: 'Relatar Avaria',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="alert-circle" size={size} color={color} />
          ),
        }}
      />

      {role === 'admin' ? (
        <Tab.Screen
          name="Equipamentos"
          component={EquipmentsScreen}
          options={{
            tabBarLabel: 'Equipamentos',
            title: 'Equipamentos',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="keyboard" size={size} color={color} />
            ),
          }}
        />
      ) : null}

      {role === 'professor' ? (
        <Tab.Screen
          name="Historico"
          component={UsageHistoryScreen}
          options={{
            tabBarLabel: 'Histórico',
            title: 'Histórico de Uso',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="clipboard-text" size={size} color={color} />
            ),
          }}
        />
      ) : null}
    </Tab.Navigator>
  );
};

// Navegador Raiz
const RootNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="MainApp" component={MainStack} />
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
