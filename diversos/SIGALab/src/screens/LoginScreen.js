import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';

import { useAuth } from '../context/AuthContext';
import { friendlyFirebaseAuthError } from '../utils/firebaseErrors';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const disabled = useMemo(() => !email.trim() || password.length < 6 || loading, [email, password, loading]);

  async function onSubmit() {
    setError('');
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (e) {
      setError(friendlyFirebaseAuthError(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16, justifyContent: 'center' }}>
        <Card>
          <Card.Title title="Entrar" subtitle="Acesso com credenciais institucionais" />
          <Card.Content style={{ gap: 12 }}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput label="Senha" value={password} onChangeText={setPassword} secureTextEntry />
            {!!error && <Text style={{ color: '#b91c1c' }}>{error}</Text>}
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.navigate('Register')}>Criar conta</Button>
            <Button mode="contained" onPress={onSubmit} loading={loading} disabled={disabled}>
              Entrar
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}

