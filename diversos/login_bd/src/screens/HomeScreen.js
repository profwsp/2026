import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = () => {
  const { user } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Extrair o nome do e-mail
  const userName = user?.email?.split('@')[0] || 'Usuário';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.appName}>Login BD</Text>
        <Text style={styles.welcomeText}>Bem-vindo!</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>

      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    backgroundColor: '#F5F5F5',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 16,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#0066CC',
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
