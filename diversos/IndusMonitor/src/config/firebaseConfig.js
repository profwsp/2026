import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Configuração do Firebase - IMPORTANTE: Substitua com suas credenciais reais
const firebaseConfig = {
  apiKey: "AIzaSyDxxxxxxxxxxxxxxxxxxx", // Substitua com sua API Key
  authDomain: "indusmonitor.firebaseapp.com",
  projectId: "indusmonitor-xxxxx",
  storageBucket: "indusmonitor.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar serviços
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
