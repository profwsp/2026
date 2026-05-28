import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { autenticacao } from '../config/firebaseConfig';

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [nomeUsuarioLogado, setNomeUsuarioLogado] = useState('');

  const fazerLogin = async () => {
    try {
      await signInWithEmailAndPassword(autenticacao, email, senha);
      // Obter o nome do usuário logado
      const nomeUsuario = autenticacao.currentUser?.displayName || 'Usuário';
      setNomeUsuarioLogado(nomeUsuario);
    } catch (erro) {
      console.error("Erro de Login:", erro);
      setErro('Erro ao fazer login. Verifique seus dados. Detalhe: ' + erro.message);
    }
  };

  return (
    <View style={estilos.container}>
      {nomeUsuarioLogado ? (
        <>
          <Text style={estilos.titulo}>Bem-vindo, {nomeUsuarioLogado}!</Text>
          <Button title="Continuar" onPress={() => navigation.navigate('Home')} />
        </>
      ) : (
        <>
          <Text>Email</Text>
          <TextInput style={estilos.input} value={email} onChangeText={setEmail} />
          <Text>Senha</Text>
          <TextInput style={estilos.input} value={senha} onChangeText={setSenha} secureTextEntry={true} />
          <Button title="Entrar" onPress={fazerLogin} />
          {erro ? <Text style={estilos.erro}>{erro}</Text> : null}
          <Button title="Cadastrar" onPress={() => navigation.navigate('Cadastro')} />
        </>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
  erro: { color: 'red', marginTop: 10 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});