import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Image, Alert } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from '../config/firebaseConfig';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useAuth } from '../context/AuthContext';

export default function DamageReportScreen() {
  const { user } = useAuth();

  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null); // { uri }
  const [busy, setBusy] = useState(false);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'damageReports'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(
      q,
      (snap) => setReports(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (err) => {
        console.error(err);
        Alert.alert('Erro', 'Falha ao carregar avarias.');
      }
    );
    return () => unsub();
  }, []);

  const pickPhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permissão', 'Permita acesso à câmera para tirar foto.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: true,
    });

    if (result.canceled) return;
    const asset = result.assets && result.assets[0];
    if (!asset?.uri) return;
    setPhoto({ uri: asset.uri });
  };

  const submit = async () => {
    if (!user?.uid) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Validação', 'Descreva a avaria.');
      return;
    }
    if (!photo?.uri) {
      Alert.alert('Validação', 'Tire uma foto para anexar ao alerta.');
      return;
    }

    setBusy(true);
    try {
      // 1) Upload da foto para Firebase Storage
      const resp = await fetch(photo.uri);
      const blob = await resp.blob();
      const path = `damageReports/${user.uid}/${Date.now()}.jpg`;
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, blob, { contentType: 'image/jpeg' });
      const photoUrl = await getDownloadURL(storageRef);

      // 2) Salva o relatório no Firestore
      await addDoc(collection(db, 'damageReports'), {
        description: description.trim(),
        photoUrl,
        photoPath: path,
        userId: user.uid,
        userEmail: user.email || null,
        userDisplayName: user.displayName || null,
        createdAt: serverTimestamp(),
        status: 'aberto',
      });

      setDescription('');
      setPhoto(null);
      Alert.alert('Enviado', 'Avaria registrada com sucesso.');
    } catch (e) {
      console.error(e);
      Alert.alert('Erro', 'Não foi possível enviar o relatório.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.title}>
            Relatar avaria (RF04)
          </Text>
          <TextInput
            label="Descrição"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
          />

          {photo?.uri ? <Image source={{ uri: photo.uri }} style={styles.preview} /> : null}

          <View style={styles.actionsRow}>
            <Button mode="outlined" onPress={pickPhoto} disabled={busy} icon="camera">
              Tirar foto
            </Button>
            <Button mode="contained" onPress={submit} disabled={busy} loading={busy} style={styles.sendBtn} icon="send">
              Enviar
            </Button>
          </View>
        </Card.Content>
      </Card>

      <Text style={styles.sectionTitle}>Últimos alertas</Text>
      <FlatList
        data={reports}
        keyExtractor={(it) => it.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Card style={styles.reportCard}>
            <Card.Content>
              <Text style={styles.reportDesc}>{item.description}</Text>
              {item.photoUrl ? <Image source={{ uri: item.photoUrl }} style={styles.reportImg} /> : null}
              <Text style={styles.muted}>
                Por: {item.userDisplayName || item.userEmail || item.userId} • Status: {item.status || 'aberto'}
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
  input: { backgroundColor: '#FFFFFF', marginBottom: 12 },
  preview: { width: '100%', height: 180, borderRadius: 12, marginBottom: 12 },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  sendBtn: { backgroundColor: '#0066CC', flex: 1 },
  sectionTitle: { marginTop: 16, marginBottom: 8, fontSize: 16, fontWeight: '700', color: '#333333' },
  reportCard: { backgroundColor: '#FFFFFF', marginBottom: 12 },
  reportDesc: { fontWeight: '700', color: '#333333', marginBottom: 8 },
  reportImg: { width: '100%', height: 160, borderRadius: 12, marginBottom: 8 },
  muted: { color: '#666666' },
});

