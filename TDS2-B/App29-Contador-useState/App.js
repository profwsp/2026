import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Contador() {
  const [contador, setContador] = useState(0);
 

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Contador</Text>

      <Text style={estilos.numero}>{contador}</Text>

      <TouchableOpacity>
        <Text>Aumentar</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>Diminuir</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>Resetar</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    color: '#000',
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
  botaoAumentar: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 8,
    width: 200,
    alignItems: 'center',
  },
  botaoDiminuir: {
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