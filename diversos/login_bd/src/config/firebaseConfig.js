import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Configure com suas credenciais do Firebase
// Acesse https://console.firebase.google.com para obter essas informações
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  databaseURL: "https://your-project.firebaseio.com"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar autenticação
export const auth = getAuth(app);

// Inicializar banco de dados em tempo real (opcional)
export const database = getDatabase(app);

export default app;
