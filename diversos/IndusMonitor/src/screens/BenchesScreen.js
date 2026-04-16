import React, { useMemo, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Button, Card, Text, TextInput, Chip } from 'react-native-paper';
import { db } from '../config/firebaseConfig';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { buildReservationId, parseDateAndTime, toSlotKey } from '../utils/slots';

const DEFAULT_BENCHES = Array.from({ length: 12 }).map((_, idx) => {
  const n = idx + 1;
  const id = `B${String(n).padStart(2, '0')}`;
  return { id, label: `Bancada ${String(n).padStart(2, '0')}` };
});

export default function BenchesScreen() {
  const { user } = useAuth();
  const [dateStr, setDateStr] = useState(() => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });
  const [timeStr, setTimeStr] = useState('19:00');
  const [busyId, setBusyId] = useState(null);

  const reservationDate = useMemo(() => parseDateAndTime(dateStr, timeStr), [dateStr, timeStr]);
  const slotKey = useMemo(() => (reservationDate ? toSlotKey(reservationDate) : null), [reservationDate]);

  const reserveBench = async (benchId) => {
    if (!reservationDate || !slotKey) {
      Alert.alert('Dados inválidos', 'Informe data (YYYY-MM-DD) e hora (HH:MM).');
      return;
    }
    if (!user?.uid) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    const reservationId = buildReservationId(benchId, slotKey);
    setBusyId(reservationId);
    try {
      const ref = doc(db, 'reservations', reservationId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        Alert.alert('Indisponível', 'Essa bancada já está reservada nesse horário.');
        return;
      }

      // Didático e performático: 1 doc por bancada+slot (consulta/validação rápida)
      await setDoc(ref, {
        benchId,
        slotKey,
        startAt: reservationDate,
        userId: user.uid,
        userEmail: user.email || null,
        userDisplayName: user.displayName || null,
        createdAt: serverTimestamp(),
      });

      Alert.alert('Reserva confirmada', `Você reservou a ${benchId} em ${dateStr} às ${timeStr}.`);
    } catch (e) {
      console.error(e);
      Alert.alert('Erro', 'Não foi possível reservar. Tente novamente.');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.title}>
            Selecione data e horário
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
              label="Hora"
              value={timeStr}
              onChangeText={setTimeStr}
              mode="outlined"
              placeholder="HH:MM"
              style={styles.input}
            />
          </View>

          <View style={styles.hintRow}>
            <Chip icon="information" compact>
              Dica didática: o “mapa” abaixo é um grid de bancadas
            </Chip>
          </View>
        </Card.Content>
      </Card>

      <Text style={styles.sectionTitle}>Mapa do laboratório</Text>
      <FlatList
        data={DEFAULT_BENCHES}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.columnWrap}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => {
          const reservationId = slotKey ? buildReservationId(item.id, slotKey) : `${item.id}_invalid`;
          const loading = busyId === reservationId;
          return (
            <Card style={styles.benchCard}>
              <Card.Content>
                <Text style={styles.benchId}>{item.id}</Text>
                <Text style={styles.benchLabel}>{item.label}</Text>
                <Button
                  mode="contained"
                  onPress={() => reserveBench(item.id)}
                  disabled={!slotKey || !!busyId}
                  loading={loading}
                  style={styles.reserveBtn}
                >
                  Reservar
                </Button>
              </Card.Content>
            </Card>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5F5' },
  card: { backgroundColor: '#FFFFFF' },
  title: { fontWeight: '700', marginBottom: 12 },
  row: { flexDirection: 'row', gap: 12 },
  input: { flex: 1, backgroundColor: '#FFFFFF' },
  hintRow: { marginTop: 12, alignItems: 'flex-start' },
  sectionTitle: { marginTop: 16, marginBottom: 8, fontSize: 16, fontWeight: '700', color: '#333333' },
  grid: { paddingBottom: 24 },
  columnWrap: { gap: 12 },
  benchCard: { flex: 1, marginBottom: 12, backgroundColor: '#FFFFFF' },
  benchId: { fontSize: 18, fontWeight: '800', color: '#0066CC' },
  benchLabel: { color: '#666666', marginBottom: 12 },
  reserveBtn: { backgroundColor: '#0066CC' },
});

