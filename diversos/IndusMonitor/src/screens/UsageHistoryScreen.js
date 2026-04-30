import React, { useMemo, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useAuth } from '../context/AuthContext';

export default function UsageHistoryScreen() {
  const { user } = useAuth();
  const role = user?.role || 'aluno';

  const [dateStr, setDateStr] = useState(() => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });
  const [benchId, setBenchId] = useState('');
  const [busy, setBusy] = useState(false);
  const [rows, setRows] = useState([]);

  const canView = role === 'professor' || role === 'admin';

  const datePrefix = useMemo(() => `${dateStr}_`, [dateStr]);

  const load = async () => {
    if (!canView) {
      Alert.alert('Sem permissão', 'Apenas professor (ou admin) pode gerar relatório de histórico.');
      return;
    }
    if (!dateStr || dateStr.length !== 10) {
      Alert.alert('Validação', 'Informe a data no formato YYYY-MM-DD.');
      return;
    }
    setBusy(true);
    try {
      let q = query(
        collection(db, 'reservations'),
        where('slotKey', '>=', datePrefix),
        where('slotKey', '<', `${dateStr}_\uf8ff`),
        orderBy('slotKey', 'asc')
      );

      // Se quiser filtrar por bancada (B01, B02...)
      const trimmedBench = benchId.trim().toUpperCase();
      if (trimmedBench) {
        q = query(
          collection(db, 'reservations'),
          where('benchId', '==', trimmedBench),
          where('slotKey', '>=', datePrefix),
          where('slotKey', '<', `${dateStr}_\uf8ff`),
          orderBy('slotKey', 'asc')
        );
      }

      const snap = await getDocs(q);
      setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
      Alert.alert('Erro', 'Falha ao carregar histórico. Verifique índices do Firestore se necessário.');
    } finally {
      setBusy(false);
    }
  };

  if (!canView) {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.title}>
              Histórico de Uso
            </Text>
            <Text style={styles.muted}>
              RF05: apenas **professor** pode gerar relatório por data/bancada.
            </Text>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.title}>
            Relatório por data
          </Text>
          <View style={styles.row}>
            <TextInput
              label="Data"
              value={dateStr}
              onChangeText={setDateStr}
              mode="outlined"
              placeholder="YYYY-MM-DD"
              style={styles.input}
            />
            <TextInput
              label="Bancada (opcional)"
              value={benchId}
              onChangeText={setBenchId}
              mode="outlined"
              placeholder="B01"
              style={styles.input}
              autoCapitalize="characters"
            />
          </View>
          <Button mode="contained" onPress={load} loading={busy} disabled={busy} style={styles.loadBtn} icon="magnify">
            Gerar
          </Button>
        </Card.Content>
      </Card>

      <FlatList
        data={rows}
        keyExtractor={(it) => it.id}
        contentContainerStyle={{ paddingVertical: 12, paddingBottom: 24 }}
        ListEmptyComponent={
          <Text style={styles.mutedCenter}>Nenhuma reserva encontrada para o filtro.</Text>
        }
        renderItem={({ item }) => (
          <Card style={styles.itemCard}>
            <Card.Content>
              <Text style={styles.itemTitle}>
                {item.benchId} • {item.slotKey}
              </Text>
              <Text style={styles.muted}>
                Usuário: {item.userDisplayName || item.userEmail || item.userId}
              </Text>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5F5' },
  card: { backgroundColor: '#FFFFFF' },
  title: { fontWeight: '800', marginBottom: 12 },
  row: { flexDirection: 'row', gap: 12 },
  input: { flex: 1, backgroundColor: '#FFFFFF' },
  loadBtn: { marginTop: 12, backgroundColor: '#0066CC' },
  itemCard: { backgroundColor: '#FFFFFF', marginBottom: 12 },
  itemTitle: { fontWeight: '800', color: '#333333', marginBottom: 4 },
  muted: { color: '#666666' },
  mutedCenter: { color: '#666666', textAlign: 'center', marginTop: 16 },
});

