import React, { useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Button, Card, Text, TextInput, Dialog, Portal, SegmentedButtons } from 'react-native-paper';
import { db } from '../config/firebaseConfig';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const EQUIPMENT_TYPES = [
  { value: 'monitor', label: 'Monitor' },
  { value: 'teclado', label: 'Teclado' },
  { value: 'mouse', label: 'Mouse' },
  { value: 'robotica', label: 'Kit Robótica' },
];

export default function EquipmentsScreen() {
  const { user } = useAuth();
  const role = user?.role || 'aluno';

  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('monitor');
  const [serial, setSerial] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'equipments'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      },
      (err) => {
        console.error(err);
        Alert.alert('Erro', 'Falha ao carregar equipamentos.');
      }
    );
    return () => unsub();
  }, []);

  const canEdit = role === 'admin';

  const openNew = () => {
    setEditing(null);
    setName('');
    setType('monitor');
    setSerial('');
    setDialogOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setName(item.name || '');
    setType(item.type || 'monitor');
    setSerial(item.serial || '');
    setDialogOpen(true);
  };

  const save = async () => {
    if (!canEdit) {
      Alert.alert('Sem permissão', 'Apenas admin pode cadastrar/editar/excluir equipamentos.');
      return;
    }
    if (!name.trim()) {
      Alert.alert('Validação', 'Informe o nome do equipamento.');
      return;
    }
    setBusy(true);
    try {
      if (editing) {
        await updateDoc(doc(db, 'equipments', editing.id), {
          name: name.trim(),
          type,
          serial: serial.trim() || null,
          updatedAt: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, 'equipments'), {
          name: name.trim(),
          type,
          serial: serial.trim() || null,
          createdAt: serverTimestamp(),
        });
      }
      setDialogOpen(false);
    } catch (e) {
      console.error(e);
      Alert.alert('Erro', 'Não foi possível salvar.');
    } finally {
      setBusy(false);
    }
  };

  const remove = async (item) => {
    if (!canEdit) return;
    Alert.alert('Excluir', `Excluir "${item.name}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          setBusy(true);
          try {
            await deleteDoc(doc(db, 'equipments', item.id));
          } catch (e) {
            console.error(e);
            Alert.alert('Erro', 'Não foi possível excluir.');
          } finally {
            setBusy(false);
          }
        },
      },
    ]);
  };

  const typeLabel = useMemo(() => {
    const map = new Map(EQUIPMENT_TYPES.map((t) => [t.value, t.label]));
    return (v) => map.get(v) || v;
  }, []);

  if (role !== 'admin') {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.title}>
              Equipamentos
            </Text>
            <Text style={styles.muted}>
              Esta tela é o RF02 (CRUD). Para fins didáticos, apenas o perfil **admin** pode gerenciar.
            </Text>
          </Card.Content>
        </Card>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          Equipamentos (Admin)
        </Text>
        <Button mode="contained" onPress={openNew} disabled={busy} style={styles.addBtn} icon="plus">
          Novo
        </Button>
      </View>

      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Card style={styles.itemCard}>
            <Card.Content>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.muted}>
                Tipo: {typeLabel(item.type)} {item.serial ? `• Série: ${item.serial}` : ''}
              </Text>
              <View style={styles.actionsRow}>
                <Button mode="outlined" onPress={() => openEdit(item)} disabled={busy} icon="pencil">
                  Editar
                </Button>
                <Button mode="text" onPress={() => remove(item)} disabled={busy} textColor="#D32F2F" icon="delete">
                  Excluir
                </Button>
              </View>
            </Card.Content>
          </Card>
        )}
      />

      <Portal>
        <Dialog visible={dialogOpen} onDismiss={() => setDialogOpen(false)}>
          <Dialog.Title>{editing ? 'Editar equipamento' : 'Novo equipamento'}</Dialog.Title>
          <Dialog.Content>
            <Text style={styles.dialogLabel}>Tipo</Text>
            <SegmentedButtons
              value={type}
              onValueChange={setType}
              buttons={EQUIPMENT_TYPES.map((t) => ({ value: t.value, label: t.label }))}
              style={{ marginBottom: 12 }}
            />
            <TextInput label="Nome" value={name} onChangeText={setName} mode="outlined" style={styles.dialogInput} />
            <TextInput
              label="Número de série (opcional)"
              value={serial}
              onChangeText={setSerial}
              mode="outlined"
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogOpen(false)} disabled={busy}>
              Cancelar
            </Button>
            <Button onPress={save} disabled={busy} loading={busy}>
              Salvar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5F5' },
  card: { backgroundColor: '#FFFFFF' },
  title: { fontWeight: '800', marginBottom: 8 },
  muted: { color: '#666666' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, gap: 12 },
  headerTitle: { fontWeight: '800' },
  addBtn: { backgroundColor: '#0066CC' },
  itemCard: { backgroundColor: '#FFFFFF', marginBottom: 12 },
  itemName: { fontSize: 16, fontWeight: '800', color: '#333333', marginBottom: 4 },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, alignItems: 'center' },
  dialogLabel: { fontSize: 12, color: '#666666', fontWeight: '700', marginBottom: 8 },
  dialogInput: { marginBottom: 12, backgroundColor: '#FFFFFF' },
});

