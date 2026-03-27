import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [ladoCamera, setLadoCamera] = useState('back');
  const [permissao, solicitarPermissao] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permissao) return <View style={styles.container} />;

  if (!permissao.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.mensagem}>Precisamos da sua permissão para acessar a câmera</Text>
        <TouchableOpacity style={styles.botaoPermissao} onPress={solicitarPermissao}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>CONCEDER ACESSO</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function alternarLadoCamera() {
    setLadoCamera(atual => (atual === 'back' ? 'front' : 'back'));
  }

  async function tirarFoto() {
    if (cameraRef.current) {
      const foto = await cameraRef.current.takePictureAsync();
      console.log('Foto capturada:', foto.uri);
      // Aqui você pode salvar na galeria ou navegar para uma tela de preview
    }
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={ladoCamera} 
        ref={cameraRef}
      >
        {/* Header - Opções como Flash ou Fechar */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="flash-outline" size={28} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={28} color="white" />
          </TouchableOpacity>
        </View>

        {/* Footer - Controles Principais */}
        <View style={styles.footer}>
          <View style={styles.controlesPrincipais}>
            
            {/* Miniatura da Galeria (Placeholder) */}
            <TouchableOpacity style={styles.botaoSecundario}>
              <View style={styles.miniaturaGaleria} />
            </TouchableOpacity>

            {/* Botão de Disparo (Shutter) */}
            <TouchableOpacity 
              style={styles.botaoDisparoExterno} 
              onPress={tirarFoto}
            >
              <View style={styles.botaoDisparoInterno} />
            </TouchableOpacity>

            {/* Alternar Câmera */}
            <TouchableOpacity 
              style={styles.botaoSecundario} 
              onPress={alternarLadoCamera}
            >
              <Ionicons name="camera-reverse-outline" size={32} color="white" />
            </TouchableOpacity>

          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  mensagem: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
    paddingHorizontal: 30
  },
  botaoPermissao: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 8,
    alignSelf: 'center'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 40,
  },
  footer: {
    paddingBottom: 40,
  },
  controlesPrincipais: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  botaoDisparoExterno: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  botaoDisparoInterno: {
    width: 65,
    height: 65,
    borderRadius: 35,
    backgroundColor: 'white',
  },
  botaoSecundario: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniaturaGaleria: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#333', // Simula a última foto tirada
    borderWidth: 1,
    borderColor: 'white'
  }
});