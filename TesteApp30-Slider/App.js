import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

export default function App() {






 

  return (
    <View >
      
      <View >
        <View >
          <Text >Seletor de Cores</Text>
          <Text ></Text>
          <Text ></Text>
        </View>

        <View style={estilos.controls}>
          
        </View>
      </View>
    </View>
  );
}



  <View >
    <View >
      <Text ></Text>
      <Text ></Text>
    </View>
    <Slider
      minimumValue={0}
      maximumValue={255}
      step={1}
      value={''}
      onValueChange={''}
      minimumTrackTintColor={''}
      maximumTrackTintColor="#ddd"
      thumbTintColor={''}
      style={estilos.slider}
    />
  </View>


const estilos = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  infoCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontWeight: '600',
    opacity: 0.8,
  },
  hexText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 8,
    fontFamily: 'System', // Ou Monospace se disponível
  },
  rgbText: {
    fontSize: 16,
    opacity: 0.7,
  },
  controls: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 20,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  valueText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});