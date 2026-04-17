## SIGALab — Quick Start

### Offline/local com Emuladores do Firebase (opção C)

Terminal 1:

```bash
cd diversos/SIGALab
npm run emulators
```

Terminal 2 (Web):

```bash
cd diversos/SIGALab
set EXPO_PUBLIC_USE_EMULATORS=true
set EXPO_PUBLIC_EMULATOR_HOST=localhost
npm run web
```

Terminal 2 (Android Emulator):

```bash
cd diversos/SIGALab
set EXPO_PUBLIC_USE_EMULATORS=true
set EXPO_PUBLIC_EMULATOR_HOST=10.0.2.2
npm run android
```

UI dos emuladores: `http://localhost:4000`

### Rodar no Web

```bash
cd diversos/SIGALab
npm install
npm run web
```

### Rodar no Android (Expo Go)

```bash
cd diversos/SIGALab
npm install
npm run android
```

### Firebase

- Leia `FIREBASE_SETUP.md`
- Crie `src/config/firebaseConfig.js` a partir do exemplo

