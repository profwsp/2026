# SIGALab — Sistema de Gestão de Inventário e Agendamento (Lab de Informática)

Aplicativo didático **multiplataforma (Web/Mobile)** feito em **React Native (Expo)**, **JavaScript (sem TypeScript)** e **Firebase**, baseado em requisitos funcionais e não funcionais levantados por entrevistas.

## Objetivos

- **Geral**: gerir inventário e agendamento de bancadas do laboratório de informática.
- **Específicos**:
  - catalogar kits de Arduino, computadores e periféricos
  - reservar bancadas em “tempo real” (conflito por documento)
  - registrar avarias com foto
  - consultar histórico de uso por data (professor)

## Requisitos cobertos (mapeamento)

- **RF01 – Autenticação**: `Login` / `Register` via Firebase Auth
- **RF02 – Cadastro de Equipamentos**: `Equipments` (CRUD) com restrição didática para admin
- **RF03 – Agendamento de Bancadas**: `Benches` com mapa em grid e reserva por data/slot
- **RF04 – Relatório de Avarias**: `DamageReport` (descrição + foto → Storage)
- **RF05 – Histórico de Uso**: `UsageHistory` (professor) por data e opcionalmente bancada

RNF:
- **RNF01** (responsivo): Expo roda em Android/iOS/Web
- **RNF02** (segurança): senhas no Firebase Auth (hash gerenciado pelo provedor)
- **RNF03** (desempenho): consulta por docId \(O(1)\) por `benchId + slotKey`
- **RNF05** (tecnologia): React Native (Expo)

## Estrutura

```
SIGALab/
├─ App.js
├─ FIREBASE_SETUP.md
└─ src/
   ├─ config/
   ├─ context/
   ├─ navigation/
   ├─ screens/
   ├─ theme/
   └─ utils/
```

## Como rodar

### 0) (Opcional) Rodar com Emuladores do Firebase (offline/local)

O app pode apontar para **Auth/Firestore/Storage emulado no seu PC**, sem depender do Firebase “na nuvem”.

- Inicie os emuladores:

```bash
npm run emulators
```

- Em outro terminal, rode o app habilitando emuladores:

**Web (localhost):**

```bash
set EXPO_PUBLIC_USE_EMULATORS=true
set EXPO_PUBLIC_EMULATOR_HOST=localhost
npm run web
```

**Android Emulator (host do PC = 10.0.2.2):**

```bash
set EXPO_PUBLIC_USE_EMULATORS=true
set EXPO_PUBLIC_EMULATOR_HOST=10.0.2.2
npm run android
```

**Dispositivo físico (use o IP do seu PC na rede Wi‑Fi):**

```bash
set EXPO_PUBLIC_USE_EMULATORS=true
set EXPO_PUBLIC_EMULATOR_HOST=192.168.0.10
npm start
```

Depois, acesse a UI dos emuladores em `http://localhost:4000`.

### 1) Instalar dependências

```bash
npm install
```

### 2) Configurar Firebase

- Siga o guia em `FIREBASE_SETUP.md`
- Copie `src/config/firebaseConfig.example.js` para `src/config/firebaseConfig.js` e preencha.

### 3) Iniciar

```bash
npm start
```

Atalhos:

```bash
npm run android
npm run web
```

## Observações didáticas importantes

- O papel **admin** é definido no Firestore em `users/{uid}.role`.
- Em produção, as regras do Firestore/Storage devem validar roles (não confiar só no app).

