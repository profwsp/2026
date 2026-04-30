import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import { toISODate } from '../utils/date';

export default function UsageHistoryScreen() {
  const { isProfessor } = useAuth();
  const [date, setDate] = useState(toISODate(new Date()));
  const [benchId, setBenchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const disabled = useMemo(() => !isProfessor || !date.trim() || loading, [isProfessor, date, loading]);

  async function runQuery() {
    if (!isProfessor) return;
    setLoading(true);
    try {
      const base = [where('date', '==', date.trim())];
      if (benchId.trim()) base.push(where('benchId', '==', benchId.trim().toUpperCase()));
      const q = query(collection(db, 'reservations'), ...base);
      const snap = await getDocs(q);
      setResults(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      {!isProfessor && (
        <Card>
          <Card.Content>
            <Text>Somente professores podem consultar o histórico de uso.</Text>
          </Card.Content>
        </Card>
      )}

      <Card>
        <Card.Title title="Histórico de uso" subtitle="RF05 - quem usou cada bancada" />
        <Card.Content style={{ gap: 10 }}>
          <TextInput label="Data (YYYY-MM-DD)" value={date} onChangeText={setDate} autoCapitalize="none" />
          <TextInput label="Bancada (opcional, ex: B01)" value={benchId} onChangeText={setBenchId} autoCapitalize="characters" />
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={runQuery} loading={loading} disabled={disabled}>
            Consultar
          </Button>
        </Card.Actions>
      </Card>

      {results.map((r) => (
        <Card key={r.id}>
          <Card.Title title={`${r.benchId} • ${r.start}–${r.end}`} subtitle={`${r.userDisplayName || r.userEmail || 'usuário'} • ${r.date}`} />
        </Card>
      ))}
    </View>
  );
}

