import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const role = user?.role || 'aluno';

  const handleLogout = async () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair?', [
      {
        text: 'Cancelar',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Sair',
        onPress: async () => {
          try {
            await logout();
            navigation.replace('Login');
          } catch (error) {
            Alert.alert('Erro', 'Erro ao fazer logout');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header com Nome do Usuário */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <MaterialCommunityIcons name="account-circle" size={32} color="#0066CC" />
          <Text style={styles.userName}>{user?.displayName || 'Usuário'}</Text>
        </View>
        <Button
          mode="text"
          onPress={handleLogout}
          icon="logout"
          labelStyle={{ color: '#D32F2F' }}
        >
          Sair
        </Button>
      </View>

      <ScrollView style={styles.content}>
        {/* App Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.appTitle}>LabApp Didático</Text>
          <Text style={styles.subtitle}>Reserva de bancadas e controle do laboratório</Text>
        </View>

        {/* Cards de Informações */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="information" size={24} color="#0066CC" />
              <Text variant="headlineSmall" style={styles.cardTitle}>Informações da Conta</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{user?.email || 'Não disponível'}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.infoLabel}>Perfil:</Text>
              <Text style={styles.infoValue}>{role}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.infoLabel}>Usuário ID:</Text>
              <Text style={styles.infoValue}>{user?.uid || 'Não disponível'}</Text>
            </View>
          </Card.Content>
        </Card>

        {/* Cards de Navegação */}
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="view-grid" size={24} color="#0066CC" />
              <Text variant="headlineSmall" style={styles.cardTitle}>Seções Disponíveis</Text>
            </View>
            <Button
              mode="contained-tonal"
              onPress={() => navigation.navigate('Bancadas')}
              style={styles.sectionButton}
              icon="seat"
            >
              Agendar Bancada
            </Button>
            <Button
              mode="contained-tonal"
              onPress={() => navigation.navigate('Avarias')}
              style={styles.sectionButton}
              icon="alert-circle"
            >
              Relatar Avaria
            </Button>

            {role === 'admin' ? (
              <Button
                mode="contained-tonal"
                onPress={() => navigation.navigate('Equipamentos')}
                style={styles.sectionButton}
                icon="keyboard"
              >
                Equipamentos (Admin)
              </Button>
            ) : null}

            {role === 'professor' ? (
              <Button
                mode="contained-tonal"
                onPress={() => navigation.navigate('Historico')}
                style={styles.sectionButton}
                icon="clipboard-text"
              >
                Histórico de Uso (Professor)
              </Button>
            ) : null}
          </Card.Content>
        </Card>

        {/* Versão */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>LabApp Didático v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    maxWidth: 180,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  cardTitle: {
    color: '#333333',
    fontWeight: '600',
  },
  cardInfo: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '500',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  sectionButton: {
    marginBottom: 8,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 16,
  },
  versionText: {
    fontSize: 12,
    color: '#999999',
  },
});
