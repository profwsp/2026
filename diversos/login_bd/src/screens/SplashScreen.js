import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Login BD</Text>
      <Text style={styles.version}>v1.0.0</Text>
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0066CC', // Azul
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF', // Branco
    textAlign: 'center',
  },
  version: {
    position: 'absolute',
    bottom: 40,
    fontSize: 14,
    color: '#FFFFFF', // Branco
    textAlign: 'center',
  },
});

export default SplashScreen;
