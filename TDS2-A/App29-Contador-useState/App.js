import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contador</Text>

      <Text style={styles.numero}>{contador}</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => setContador(contador + 1)}
      >
        <Text style={styles.botaoTexto}>Aumentar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={ styles.botaoSecundario}
        onPress={() => setContador(contador - 1)}
      >
        <Text style={styles.botaoTexto}>Diminuir</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoReset}
        onPress={() => setContador(0)}
      >
        <Text style={styles.botaoTexto}>Resetar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  numero: {
    color: '#00ff99',
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  botao: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 8,
    width: 200,
    alignItems: 'center',
  },
  botaoSecundario: {
    backgroundColor: '#ff9800',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 8,
    width: 200,
    alignItems: 'center',
  },
  botaoReset: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 8,
    width: 200,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});