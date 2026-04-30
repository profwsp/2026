import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, Text, SegmentedButtons } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('aluno');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (!displayName || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não correspondem');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      await register(email, password, displayName, role);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      // A navegação principal é controlada pelo RootNavigator quando isAuthenticated muda.
    } catch (err) {
      Alert.alert('Erro ao Registrar', err.message || 'Falha ao criar conta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.registerContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Button
              mode="text"
              onPress={() => navigation.goBack()}
              disabled={loading}
              icon="arrow-left"
            >
              Voltar
            </Button>
          </View>

          <Text style={styles.logo}>IndusMonitor</Text>
          <Text style={styles.subtitle}>Criar nova conta</Text>

          <Text style={styles.roleLabel}>Perfil</Text>
          <SegmentedButtons
            value={role}
            onValueChange={setRole}
            buttons={[
              { value: 'aluno', label: 'Aluno' },
              { value: 'professor', label: 'Professor' },
            ]}
            style={styles.segmentedButtons}
          />

          {/* Display Name Input */}
          <TextInput
            label="Nome Completo"
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Seu nome"
            mode="outlined"
            style={styles.input}
            autoCapitalize="words"
            editable={!loading}
          />

          {/* Email Input */}
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />

          {/* Password Input */}
          <TextInput
            label="Senha"
            value={password}
            onChangeText={setPassword}
            placeholder="Mínimo 6 caracteres"
            mode="outlined"
            style={styles.input}
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? 'eye' : 'eye-off'}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            editable={!loading}
          />

          {/* Confirm Password Input */}
          <TextInput
            label="Confirmar Senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirme sua senha"
            mode="outlined"
            style={styles.input}
            secureTextEntry={!showConfirmPassword}
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? 'eye' : 'eye-off'}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
            editable={!loading}
          />

          {/* Register Button */}
          <Button
            mode="contained"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            style={styles.registerButton}
            contentStyle={styles.buttonContent}
          >
            {loading ? 'Criando conta...' : 'Criar Conta'}
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  registerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    marginBottom: 16,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0066CC',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
  },
  roleLabel: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '600',
    marginBottom: 8,
  },
  segmentedButtons: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  registerButton: {
    marginBottom: 16,
    backgroundColor: '#0066CC',
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
