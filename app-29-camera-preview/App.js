import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

function CameraInterface() {
  const [ladoCamera, setLadoCamera] = useState('back');
  const [fotoCapturada, setFotoCapturada] = useState(null); // Estado para o Preview
  const [permissaoCamera, solicitarPermissaoCamera] = useCameraPermissions();
  const [permissaoMedia, solicitarPermissaoMedia] = MediaLibrary.usePermissions();
  
  const cameraRef = useRef(null);
  const insets = useSafeAreaInsets(); // Hook para gerenciar áreas seguras

  // 1. Verificação de Permissões
  if (!permissaoCamera || !permissaoMedia) return <View style={styles.container} />;

  if (!permissaoCamera.granted || permissaoMedia.status !== 'granted') {
    return (
      <View style={[styles.container, styles.containerPermissao]}>
        <Text style={styles.mensagem}>Precisamos de acesso à câmera e galeria.</Text>
        <TouchableOpacity style={styles.botaoPermissao} onPress={() => { solicitarPermissaoCamera(); solicitarPermissaoMedia(); }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>CONCEDER PERMISSÕES</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // --- FUNÇÕES DE AÇÃO ---

  // Ação 1: Abrir a Galeria Nativa (expo-media-library não abre, só gerencia. Usamos um alerta simulando a ação)
  const abrirGaleria = () => {
    Alert.alert('Simulação', 'Aqui abriríamos a galeria nativa do dispositivo.');
    // Nota: Para abrir a galeria nativa, você precisaria usar `expo-image-picker` e sua função `launchImageLibraryAsync`.
  };

  // Ação 2: Capturar Foto (abre o preview)
  async function tirarFoto() {
    if (cameraRef.current) {
      try {
        const foto = await cameraRef.current.takePictureAsync();
        setFotoCapturada(foto.uri);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível capturar a imagem.');
      }
    }
  }

  // Ação 3: Alternar Câmera (Frente/Trás)
  const alternarCamera = () => {
    setLadoCamera(atual => (atual === 'back' ? 'front' : 'back'));
  };

  // Função Auxiliar: Salvar a foto do preview na galeria
  async function confirmarESalvarFoto() {
    if (fotoCapturada) {
      await MediaLibrary.saveToLibraryAsync(fotoCapturada);
      Alert.alert('Sucesso', 'Foto salva na galeria!');
      setFotoCapturada(null); // Volta para a câmera
    }
  }

  // --- TELA DE PREVIEW (Mostrada após a captura) ---
  if (fotoCapturada) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: fotoCapturada }} style={styles.preview} />
        
        <View style={[styles.menuPreview, { paddingBottom: insets.bottom + 30 }]}>
          <TouchableOpacity 
            style={styles.botaoActionPreview} 
            onPress={() => setFotoCapturada(null)} // Descartar
          >
            <Ionicons name="trash-outline" size={28} color="white" />
            <Text style={styles.textoBotaoAction}>Descartar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.botaoActionPreview, styles.botaoConfirmar]} 
            onPress={confirmarESalvarFoto} // Salvar
          >
            <Ionicons name="checkmark-circle-outline" size={28} color="white" />
            <Text style={styles.textoBotaoAction}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- TELA PRINCIPAL DA CÂMERA ---
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={ladoCamera} ref={cameraRef}>
        
        {/* Header (Vazio ou para ícones como flash) */}
        <View style={[styles.header, { paddingTop: insets.top + 10 }]} />

        {/* Footer com os TRÊS botões solicitados */}
        <View style={[styles.footer, { paddingBottom: insets.bottom + 30 }]}>
          <View style={styles.controlesPrincipais}>
            
            {/* BOTÃO 1: Galeria (Esquerdo) */}
            <TouchableOpacity 
              style={styles.botaoSecundario} 
              onPress={abrirGaleria}
            >
              <Ionicons name="images-outline" size={28} color="white" />
            </TouchableOpacity>

            {/* BOTÃO 2: Captura (Central) */}
            <TouchableOpacity 
              style={styles.botaoDisparoExterno} 
              onPress={tirarFoto}
            >
              <View style={styles.botaoDisparoInterno} />
            </TouchableOpacity>

            {/* BOTÃO 3: Alternar Câmera (Direito) */}
            <TouchableOpacity 
              style={styles.botaoSecundario} 
              onPress={alternarCamera}
            >
              <Ionicons name="camera-reverse-outline" size={28} color="white" />
            </TouchableOpacity>

          </View>
        </View>
      </CameraView>
    </View>
  );
}

// Wrapper do App para fornecer o contexto de Área Segura
export default function App() {
  return (
    <SafeAreaProvider>
      <CameraInterface />
    </SafeAreaProvider>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1, justifyContent: 'space-between' },
  preview: { flex: 1, resizeMode: 'cover' },
  header: { height: 60, paddingHorizontal: 20 },
  footer: { width: '100%' },
  controlesPrincipais: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Distribui os 3 botões uniformemente
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  // Estilo do Botão Central de Disparo
  botaoDisparoExterno: {
    width: 80, height: 80, borderRadius: 40, borderWidth: 6, borderColor: 'white',
    justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent',
  },
  botaoDisparoInterno: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'white' },
  // Estilo dos Botões Laterais (Galeria e Alternar)
  botaoSecundario: {
    width: 50, height: 50, borderRadius: 25, backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center', alignItems: 'center',
  },
  // Estilos da Tela de Preview
  menuPreview: {
    position: 'absolute', bottom: 0, flexDirection: 'row', width: '100%',
    justifyContent: 'space-around', paddingHorizontal: 20,
  },
  botaoActionPreview: {
    alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)', paddingVertical: 12,
    paddingHorizontal: 20, borderRadius: 15, minWidth: 120,
  },
  botaoConfirmar: { backgroundColor: '#28a745', borderColor: 'white', borderWidth: 1 },
  textoBotaoAction: { color: 'white', marginTop: 5, fontWeight: 'bold', fontSize: 12 },
  // Estilos de Permissão
  containerPermissao: { justifyContent: 'center', alignItems: 'center', padding: 20 },
  mensagem: { color: 'white', textAlign: 'center', marginBottom: 20, fontSize: 16 },
  botaoPermissao: { backgroundColor: '#007AFF', padding: 15, borderRadius: 12 },
});