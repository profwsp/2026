import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

import { firebaseConfig } from './firebaseConfig';

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

function getEmulatorHost() {
  // Expo: use EXPO_PUBLIC_* para ser acessível no app.
  // - Web: localhost funciona.
  // - Android Emulator: use 10.0.2.2
  // - Dispositivo físico: use o IP do seu PC na rede (ex: 192.168.0.10)
  return (process.env.EXPO_PUBLIC_EMULATOR_HOST || 'localhost').trim();
}

function shouldUseEmulators() {
  return String(process.env.EXPO_PUBLIC_USE_EMULATORS || '').toLowerCase() === 'true';
}

// Conecta aos emuladores quando habilitado (somente em desenvolvimento).
// Obs: chamar connect* duas vezes dá erro, então usamos flags globais.
if (__DEV__ && shouldUseEmulators()) {
  const host = getEmulatorHost();

  if (!globalThis.__SIGALAB_AUTH_EMU__) {
    connectAuthEmulator(auth, `http://${host}:9099`, { disableWarnings: true });
    globalThis.__SIGALAB_AUTH_EMU__ = true;
  }

  if (!globalThis.__SIGALAB_FIRESTORE_EMU__) {
    connectFirestoreEmulator(db, host, 8080);
    globalThis.__SIGALAB_FIRESTORE_EMU__ = true;
  }

  if (!globalThis.__SIGALAB_STORAGE_EMU__) {
    connectStorageEmulator(storage, host, 9199);
    globalThis.__SIGALAB_STORAGE_EMU__ = true;
  }
}

