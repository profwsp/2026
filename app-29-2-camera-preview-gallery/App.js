import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Alert, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  const [ladoCamera, setLadoCamera] = useState('back');
  const [fotoCapturada, setFotoCapturada] = useState(null);
  
  const [permissaoCamera, solicitarPermissaoCamera] = useCameraPermissions();
  const [permissaoMedia, solicitarPermissaoMedia] = MediaLibrary.usePermissions();
  
  const cameraRef = useRef(null);

  if (!permissaoCamera || !permissaoMedia) return <View style={styles.container} />;

  if (!permissaoCamera.granted || permissaoMedia.status !== 'granted') {
    return (
      <View style={styles.container}>
        <Text style={styles.mensagem}>Ajuste as permissões nas configurações</Text>
        <TouchableOpacity style={styles.botaoPermissao} onPress={() => { solicitarPermissaoCamera(); solicitarPermissaoMedia(); }}>
          <Text style={{ color: '#fff' }}>CONCEDER PERMISSÕES</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const abrirGaleria = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled) {
      setFotoCapturada(resultado.assets[0].uri);
    }
  };

  async function tirarFoto() {
    if (cameraRef.current) {
      const foto = await cameraRef.current.takePictureAsync();
      setFotoCapturada(foto.uri);
    }
  }

  // --- TELA DE PREVIEW ---
  if (fotoCapturada) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: fotoCapturada }} style={styles.preview} />
        <View style={styles.menuPreview}>
          <TouchableOpacity style={styles.botaoActionPreview} onPress={() => setFotoCapturada(null)}>
            <Ionicons name="close-circle" size={45} color="white" />
            <Text style={styles.textoBotaoAction}>Voltar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.botaoActionPreview} 
            onPress={async () => {
              await MediaLibrary.saveToLibraryAsync(fotoCapturada);
              Alert.alert('Sucesso', 'Foto salva!');
              setFotoCapturada(null);
            }}
          >
            <Ionicons name="checkmark-circle" size={45} color="#28a745" />
            <Text style={styles.textoBotaoAction}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- TELA DA CÂMERA ---
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <CameraView style={styles.camera} facing={ladoCamera} ref={cameraRef}>
        
        {/* Espaçador superior manual para Android */}
        <View style={styles.spacer} />

        <View style={styles.footer}>
          <View style={styles.controlesPrincipais}>
            
            <TouchableOpacity style={styles.botaoSecundario} onPress={abrirGaleria}>
              <Ionicons name="images" size={28} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoDisparoExterno} onPress={tirarFoto}>
              <View style={styles.botaoDisparoInterno} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoSecundario} onPress={() => setLadoCamera(a => a === 'back' ? 'front' : 'back')}>
              <Ionicons name="camera-reverse" size={28} color="white" />
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
    backgroundColor: '#000' 
  },
  spacer: {
    height: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 40,
  },
  camera: { 
    flex: 1, 
    justifyContent: 'space-between' 
  },
  preview: { 
    flex: 1,
    backgroundColor: '#000'
  },
  footer: { 
    width: '100%',
    paddingBottom: 40 
  },
  controlesPrincipais: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center' 
  },
  botaoDisparoExterno: {
    width: 80, height: 80, borderRadius: 40, borderWidth: 5, borderColor: 'white',
    justifyContent: 'center', alignItems: 'center',
  },
  botaoDisparoInterno: { width: 62, height: 62, borderRadius: 31, backgroundColor: 'white' },
  botaoSecundario: {
    width: 55, height: 55, borderRadius: 30, backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  menuPreview: {
    position: 'absolute', 
    bottom: 50, 
    flexDirection: 'row', 
    width: '100%',
    justifyContent: 'space-evenly',
  },
  botaoActionPreview: { alignItems: 'center' },
  textoBotaoAction: { color: 'white', fontWeight: 'bold', marginTop: 5 },
  mensagem: { color: 'white', textAlign: 'center', marginTop: 100 },
  botaoPermissao: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, alignSelf: 'center', marginTop: 20 }
});