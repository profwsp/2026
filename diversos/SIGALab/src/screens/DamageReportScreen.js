import React, { useMemo, useState } from 'react';
import { Alert, Image, View } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { db, storage } from '../config/firebase';
import { useAuth } from '../context/AuthContext';

async function uriToBlob(uri) {
  const res = await fetch(uri);
  return await res.blob();
}

export default function DamageReportScreen() {
  const { user, profile } = useAuth();
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState('');
  const [loading, setLoading] = useState(false);

  const disabled = useMemo(() => !description.trim() || !imageUri || loading, [description, imageUri, loading]);

  async function pickImage() {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permissão', 'Permita acesso à câmera para registrar a avaria.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: true,
    });

    if (result.canceled) return;
    setImageUri(result.assets?.[0]?.uri || '');
  }

  async function submit() {
    if (!user) return;
    setLoading(true);
    try {
      const blob = await uriToBlob(imageUri);
      const photoPath = `damageReports/${user.uid}/${Date.now()}.jpg`;
      const photoRef = ref(storage, photoPath);
      await uploadBytes(photoRef, blob);
      const photoUrl = await getDownloadURL(photoRef);

      await addDoc(collection(db, 'damageReports'), {
        description: description.trim(),
        photoUrl,
        photoPath,
        status: 'aberto',
        userId: user.uid,
        userEmail: profile?.email || user.email || '',
        userDisplayName: profile?.displayName || user.displayName || '',
        createdAt: serverTimestamp(),
      });

      setDescription('');
      setImageUri('');
      Alert.alert('Enviado', 'Avaria registrada com sucesso.');
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível enviar o relatório. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Card>
        <Card.Title title="Relatório de avarias" subtitle="RF04 - descrição + foto" />
        <Card.Content style={{ gap: 10 }}>
          <TextInput
            label="Descrição"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <Button mode="outlined" onPress={pickImage}>
            Tirar foto
          </Button>

          {!!imageUri && (
            <View style={{ gap: 8 }}>
              <Text variant="labelLarge">Prévia</Text>
              <Image source={{ uri: imageUri }} style={{ width: '100%', height: 220, borderRadius: 12 }} />
            </View>
          )}
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={submit} loading={loading} disabled={disabled}>
            Enviar
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

