import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, View } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

import { db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import { DEFAULT_TIME_SLOTS } from '../config/config';
import { makeSlotKey, toISODate } from '../utils/date';
import { buildBenches } from '../utils/lab';

function benchDocId(benchId, slotKey) {
  return `${benchId}_${slotKey}`;
}

export default function BenchesScreen() {
  const { user, profile } = useAuth();
  const benches = useMemo(() => buildBenches(), []);
  const [selectedBench, setSelectedBench] = useState(benches[0]?.id || 'B01');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(DEFAULT_TIME_SLOTS[0]);
  const [status, setStatus] = useState({ loading: false, availability: null });

  const slotKey = useMemo(() => makeSlotKey(selectedDate, selectedSlot.start), [selectedDate, selectedSlot.start]);

  useEffect(() => {
    let alive = true;
    async function load() {
      setStatus({ loading: true, availability: null });
      try {
        const id = benchDocId(selectedBench, slotKey);
        const snap = await getDoc(doc(db, 'reservations', id));
        if (!alive) return;
        setStatus({ loading: false, availability: snap.exists() ? { reserved: true, ...snap.data() } : { reserved: false } });
      } catch (e) {
        if (!alive) return;
        setStatus({ loading: false, availability: { reserved: null, error: true } });
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, [selectedBench, slotKey]);

  async function reserve() {
    if (!user) return;
    const id = benchDocId(selectedBench, slotKey);
    setStatus((s) => ({ ...s, loading: true }));
    try {
      // Estratégia didática (RNF03): 1 doc por bancada+slot → conflito natural por ID.
      const ref = doc(db, 'reservations', id);
      const existing = await getDoc(ref);
      if (existing.exists()) {
        Alert.alert('Indisponível', 'Esta bancada já está reservada para este horário.');
        return;
      }
      await setDoc(ref, {
        benchId: selectedBench,
        slotKey,
        date: toISODate(selectedDate),
        start: selectedSlot.start,
        end: selectedSlot.end,
        userId: user.uid,
        userEmail: profile?.email || user.email || '',
        userDisplayName: profile?.displayName || user.displayName || '',
        createdAt: serverTimestamp(),
      });
      Alert.alert('Reserva criada', `Bancada ${selectedBench} reservada em ${toISODate(selectedDate)} (${selectedSlot.label}).`);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível reservar. Tente novamente.');
    } finally {
      setStatus((s) => ({ ...s, loading: false }));
    }
  }

  function changeDate(deltaDays) {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + deltaDays);
    setSelectedDate(d);
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Card>
        <Card.Title title="Agendamento de bancadas" subtitle="RF03 - mapa + reserva" />
        <Card.Content style={{ gap: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Button mode="outlined" onPress={() => changeDate(-1)}>
              -1 dia
            </Button>
            <Text variant="titleMedium">{toISODate(selectedDate)}</Text>
            <Button mode="outlined" onPress={() => changeDate(1)}>
              +1 dia
            </Button>
          </View>

          <Divider />

          <Text variant="labelLarge">Horário</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {DEFAULT_TIME_SLOTS.map((s) => {
              const selected = s.start === selectedSlot.start;
              return (
                <Button key={s.start} mode={selected ? 'contained' : 'outlined'} onPress={() => setSelectedSlot(s)}>
                  {s.label}
                </Button>
              );
            })}
          </View>

          <Divider />

          <Text variant="labelLarge">Mapa (toque para selecionar)</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {benches.map((b) => {
              const selected = b.id === selectedBench;
              return (
                <Pressable
                  key={b.id}
                  onPress={() => setSelectedBench(b.id)}
                  style={{
                    width: 64,
                    height: 48,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: selected ? '#1e40af' : '#cbd5e1',
                    backgroundColor: selected ? '#dbeafe' : '#ffffff',
                  }}
                >
                  <Text>{b.id}</Text>
                </Pressable>
              );
            })}
          </View>

          <Divider />

          <Text>
            Selecionado: <Text style={{ fontWeight: '700' }}>{selectedBench}</Text> • {selectedSlot.label}
          </Text>
          <Text>
            Status:{' '}
            {status.loading
              ? 'consultando...'
              : status.availability?.reserved
                ? `reservado por ${status.availability.userDisplayName || status.availability.userEmail || 'usuário'}`
                : 'disponível'}
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={reserve} loading={status.loading} disabled={status.loading || status.availability?.reserved}>
            Reservar
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

