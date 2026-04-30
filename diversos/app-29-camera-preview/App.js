import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// Importação dos ícones (Ionicons é um dos conjuntos mais completos)
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [ladoCamera, setLadoCamera] = useState('back');
  const [permissao, solicitarPermissao] = useCameraPermissions();

  if (!permissao) {
    return (
      <View style={styles.container}>
        <Text>Carregando permissões...</Text>
      </View>
    );
  }

  if (!permissao.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.mensagem}>
          Precisamos da sua permissão para exibir a câmera
        </Text>
        <Button onPress={solicitarPermissao} title="Conceder Permissão" />
      </View>
    );
  }

  function alternarLadoCamera() {
    setLadoCamera(atual => (atual === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={ladoCamera} />

      <View style={styles.containerBotao}>
        <TouchableOpacity style={styles.botaoCircular} onPress={alternarLadoCamera}>
          {/* O ícone substitui o componente <Text> */}
          <Ionicons name="camera-reverse" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  mensagem: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'white',
  },
  camera: {
    flex: 1,
  },
  containerBotao: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center', // Centraliza o botão horizontalmente
  },
  botaoCircular: {
    width: 70,
    height: 70,
    borderRadius: 35, // Metade do tamanho para ser um círculo perfeito
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.8)',
    // Sombra para dar destaque
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});