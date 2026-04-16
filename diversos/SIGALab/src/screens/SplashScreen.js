import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

import { APP_NAME } from '../config/config';

export default function SplashScreen() {
  useEffect(() => {}, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <Text variant="titleLarge">{APP_NAME}</Text>
      <ActivityIndicator />
    </View>
  );
}

