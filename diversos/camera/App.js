import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library'; // Importante para salvar
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

function CameraInterface() {
  const [ladoCamera, setLadoCamera] = useState('back');
  const [permissaoCamera, solicitarPermissaoCamera] = useCameraPermissions();
  const [permissaoMedia, solicitarPermissaoMedia] = MediaLibrary.usePermissions();
  const cameraRef = useRef(null);
  const insets = useSafeAreaInsets();

  // 1. Verificação de permissões (Câmera e Galeria)
  if (!permissaoCamera || !permissaoMedia) return <View style={styles.container} />;

  if (!permissaoCamera.granted || permissaoMedia.status !== 'granted') {
    return (
      <View style={styles.container}>
        <Text style={styles.mensagem}>Precisamos de acesso à câmera e galeria.</Text>
        <TouchableOpacity 
          style={styles.botaoPermissao} 
          onPress={() => {
            solicitarPermissaoCamera();
            solicitarPermissaoMedia();
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>CONCEDER PERMISSÕES</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // 2. Função para tirar a foto e salvar
  async function tirarFoto() {
    if (cameraRef.current) {
      try {
        // Tira a foto
        const foto = await cameraRef.current.takePictureAsync();
        
        // Salva na galeria do celular
        await MediaLibrary.saveToLibraryAsync(foto.uri);
        
        Alert.alert('Sucesso!', 'Foto salva na sua galeria!');
      } catch (error) {
        console.log("Erro ao tirar foto:", error);
        Alert.alert('Erro', 'Não foi possível salvar a foto.');
      }
    }
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={ladoCamera} 
        ref={cameraRef}
      >
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="flash-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
          <View style={styles.controlesPrincipais}>
            
            <View style={styles.botaoSecundario}>
              {/* Placeholder para última foto */}
              <View style={styles.miniaturaGaleria} />
            </View>

            <TouchableOpacity 
              style={styles.botaoDisparoExterno} 
              onPress={tirarFoto} // Chama a função de salvar
            >
              <View style={styles.botaoDisparoInterno} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.botaoSecundario} 
              onPress={() => setLadoCamera(a => a === 'back' ? 'front' : 'back')}
            >
              <Ionicons name="camera-reverse-outline" size={28} color="white" />
            </TouchableOpacity>

          </View>
        </View>
      </CameraView>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <CameraInterface />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', justifyContent: 'center' },
  camera: { flex: 1, justifyContent: 'space-between' },
  mensagem: { color: 'white', textAlign: 'center', marginBottom: 20 },
  botaoPermissao: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignSelf: 'center' },
  header: { flexDirection: 'row', justifyContent: 'flex-end', paddingHorizontal: 20 },
  footer: { width: '100%' },
  controlesPrincipais: { flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' },
  botaoDisparoExterno: {
    width: 80, height: 80, borderRadius: 40, borderWidth: 5, borderColor: 'white',
    justifyContent: 'center', alignItems: 'center',
  },
  botaoDisparoInterno: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'white' },
  botaoSecundario: { width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  miniaturaGaleria: { width: 35, height: 35, borderRadius: 5, backgroundColor: '#444', borderWidth: 1, borderColor: 'white' },
  iconButton: { padding: 10, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 25 }
});