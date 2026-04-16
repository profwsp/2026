import React from 'react';
import { View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

import { useAuth } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { profile, logout, isAdmin, isProfessor } = useAuth();

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Card>
        <Card.Title title="SIGALab" subtitle="Sistema de Gestão de Inventário e Agendamento" />
        <Card.Content style={{ gap: 6 }}>
          <Text>Usuário: {profile?.displayName || '-'}</Text>
          <Text>Email: {profile?.email || '-'}</Text>
          <Text>Perfil: {profile?.role || '-'}</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={logout}>Sair</Button>
        </Card.Actions>
      </Card>

      <Card>
        <Card.Title title="Acesso rápido" />
        <Card.Content style={{ gap: 8 }}>
          <Button mode="outlined" onPress={() => navigation.navigate('Benches')}>
            Agendar bancadas
          </Button>
          <Button mode="outlined" onPress={() => navigation.navigate('DamageReport')}>
            Relatar avaria
          </Button>
          {isProfessor && (
            <Button mode="outlined" onPress={() => navigation.navigate('UsageHistory')}>
              Histórico de uso
            </Button>
          )}
          {isAdmin && (
            <Button mode="outlined" onPress={() => navigation.navigate('Equipments')}>
              Equipamentos (admin)
            </Button>
          )}
        </Card.Content>
      </Card>
    </View>
  );
}

