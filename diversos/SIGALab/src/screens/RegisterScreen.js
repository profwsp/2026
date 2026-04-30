import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Button, Card, RadioButton, Text, TextInput } from 'react-native-paper';

import { ROLES } from '../config/config';
import { useAuth } from '../context/AuthContext';
import { friendlyFirebaseAuthError } from '../utils/firebaseErrors';

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(ROLES.ALUNO);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const disabled = useMemo(() => {
    return !displayName.trim() || !email.trim() || password.length < 6 || loading;
  }, [displayName, email, password, loading]);

  async function onSubmit() {
    setError('');
    setLoading(true);
    try {
      await register({ displayName: displayName.trim(), email: email.trim(), password, role });
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
          <Card.Title title="Criar conta" subtitle="Perfil didático (aluno/professor)" />
          <Card.Content style={{ gap: 12 }}>
            <TextInput label="Nome" value={displayName} onChangeText={setDisplayName} />
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput label="Senha (mín. 6)" value={password} onChangeText={setPassword} secureTextEntry />

            <Text variant="labelLarge">Perfil</Text>
            <RadioButton.Group onValueChange={setRole} value={role}>
              <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value={ROLES.ALUNO} />
                  <Text>Aluno</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value={ROLES.PROFESSOR} />
                  <Text>Professor</Text>
                </View>
              </View>
            </RadioButton.Group>

            {!!error && <Text style={{ color: '#b91c1c' }}>{error}</Text>}
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => navigation.goBack()}>Voltar</Button>
            <Button mode="contained" onPress={onSubmit} loading={loading} disabled={disabled}>
              Cadastrar
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </KeyboardAvoidingView>
  );
}

