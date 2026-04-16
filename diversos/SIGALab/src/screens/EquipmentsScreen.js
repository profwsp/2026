import React, { useEffect, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, Card, Chip, IconButton, Text, TextInput } from 'react-native-paper';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';

import { db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';

const TYPES = [
  { id: 'monitor', label: 'Monitor' },
  { id: 'teclado', label: 'Teclado' },
  { id: 'mouse', label: 'Mouse' },
  { id: 'arduino', label: 'Kit Arduino' },
  { id: 'pc', label: 'Computador' },
  { id: 'periferico', label: 'Periférico' },
];

export default function EquipmentsScreen() {
  const { isAdmin } = useAuth();
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [serial, setSerial] = useState('');
  const [type, setType] = useState(TYPES[0].id);

  useEffect(() => {
    const q = query(collection(db, 'equipments'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const disabled = useMemo(() => !isAdmin || !name.trim(), [isAdmin, name]);

  async function createItem() {
    if (!isAdmin) return;
    await addDoc(collection(db, 'equipments'), {
      name: name.trim(),
      serial: serial.trim() || null,
      type,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    setName('');
    setSerial('');
  }

  async function removeItem(id) {
    if (!isAdmin) return;
    const ok = await new Promise((resolve) => {
      Alert.alert('Excluir', 'Deseja excluir este item?', [
        { text: 'Cancelar', style: 'cancel', onPress: () => resolve(false) },
        { text: 'Excluir', style: 'destructive', onPress: () => resolve(true) },
      ]);
    });
    if (!ok) return;
    await deleteDoc(doc(db, 'equipments', id));
  }

  async function renameItem(id, currentName) {
    if (!isAdmin) return;
    // edição simples e didática
    Alert.prompt?.(
      'Editar nome',
      'Digite o novo nome',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salvar',
          onPress: async (value) => {
            const v = (value || '').trim();
            if (!v) return;
            await updateDoc(doc(db, 'equipments', id), { name: v, updatedAt: serverTimestamp() });
          },
        },
      ],
      'plain-text',
      currentName
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      {!isAdmin && (
        <Card>
          <Card.Content>
            <Text>Somente administradores podem cadastrar/editar/excluir equipamentos.</Text>
          </Card.Content>
        </Card>
      )}

      <Card>
        <Card.Title title="Cadastrar equipamento" subtitle="RF02 - CRUD (admin)" />
        <Card.Content style={{ gap: 10 }}>
          <TextInput label="Nome" value={name} onChangeText={setName} />
          <TextInput label="Serial (opcional)" value={serial} onChangeText={setSerial} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {TYPES.map((t) => (
              <Chip key={t.id} selected={type === t.id} onPress={() => setType(t.id)}>
                {t.label}
              </Chip>
            ))}
          </View>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" disabled={disabled} onPress={createItem}>
            Adicionar
          </Button>
        </Card.Actions>
      </Card>

      {items.map((it) => (
        <Card key={it.id}>
          <Card.Title
            title={it.name}
            subtitle={`${it.type}${it.serial ? ` • ${it.serial}` : ''}`}
            right={() =>
              isAdmin ? (
                <View style={{ flexDirection: 'row' }}>
                  <IconButton icon="pencil" onPress={() => renameItem(it.id, it.name)} />
                  <IconButton icon="delete" onPress={() => removeItem(it.id)} />
                </View>
              ) : null
            }
          />
        </Card>
      ))}
    </View>
  );
}

