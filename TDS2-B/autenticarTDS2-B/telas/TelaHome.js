import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { autenticacao } from '../config/firebaseConfig';

export default function TelaHome() {
  const fazerLogout = () => {
    signOut(autenticacao);
  };

  const nomeUsuario = autenticacao.currentUser?.displayName
    || 'Usuário';

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Bem-vindo, {nomeUsuario}!</Text>
      <Button title="Sair" onPress={fazerLogout} />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});