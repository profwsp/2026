import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import DashboardScreen from '../screens/DashboardScreen';
import ScannerScreen from '../screens/ScannerScreen';
import SensorsScreen from '../screens/SensorsScreen';
import { darkIndustrialColors } from '../theme/darkIndustrialTheme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const NavigationContainer = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: darkIndustrialColors.darkCard,
          borderTopColor: darkIndustrialColors.darkBorder,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: darkIndustrialColors.cyan,
        tabBarInactiveTintColor: darkIndustrialColors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      {/* Dashboard Tab */}
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="view-grid"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Scanner Tab */}
      <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          tabBarLabel: 'Scanner',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Sensors Tab */}
      <Tab.Screen
        name="Sensors"
        component={SensorsScreen}
        options={{
          tabBarLabel: 'Sensores',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="vibrate"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default NavigationContainer;
