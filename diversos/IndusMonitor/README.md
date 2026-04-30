# LabApp Didático (React Native + Firebase)

Aplicativo didático (sem TypeScript) para alunos, construído a partir de **requisitos funcionais (RF)** e **não funcionais (RNF)** levantados em entrevistas. O foco é demonstrar, na prática, autenticação, CRUD, agendamento, upload de imagens e relatórios usando **React Native (Expo)** + **Firebase**.

## ✅ Requisitos atendidos

- **RF01 – Autenticação de Usuário**
  - Login/registro via Firebase Auth (email/senha)
  - Perfis: `aluno` e `professor` no cadastro; `admin` definido no Firestore
- **RF02 – Cadastro de Equipamentos**
  - Tela `Equipamentos` (CRUD) visível apenas para `admin`
- **RF03 – Agendamento de Bancadas**
  - Tela `Bancadas` com “mapa” em grid e reserva por data/hora
  - Estratégia performática: 1 documento por `bancada + slot` (ID único)
- **RF04 – Relatório de Avarias**
  - Tela `Avarias` para enviar descrição + foto (Storage) e listar alertas
- **RF05 – Histórico de Uso**
  - Tela `Histórico` (professor) para consultar reservas por data e opcionalmente por bancada

## RNF (como foi coberto)

- **RNF01 – Usabilidade (responsivo)**: Expo + React Native Paper, funciona em Android/iOS e também no web (`npm run web`).
- **RNF02 – Segurança**: senhas ficam no Firebase Authentication (hash/criptografia gerenciada pelo provedor).
- **RNF03 – Desempenho**: consulta/conflito de reserva é O(1) por documento (`{benchId}_{slotKey}`), evitando varreduras.
- **RNF04 – Disponibilidade**: depende do Firebase (serviço gerenciado); para produção configure regras/índices e monitoração.
- **RNF05 – Tecnologia**: React Native (Expo) + Firebase.

## 📋 Pré-requisitos

- Node.js (v16 ou superior)
- npm ou yarn
- Expo CLI instalado
- Uma conta Google para Firebase
- Um smartphone com Expo Go instalado (para testar no celular)

## 📁 Estrutura do Projeto

```
IndusMonitor/
├── App.js                          # Ponto de entrada da aplicação
├── app.json                        # Configuração do Expo
├── package.json                    # Dependências do projeto
├── FIREBASE_SETUP.md               # Guia de configuração Firebase
├── assets/                         # Imagens e ícones
└── src/
    ├── config/
    │   ├── config.js               # Configurações gerais
    │   ├── firebaseConfig.js       # 🔒 Credenciais Firebase
    │   └── firebaseConfig.example.js # Arquivo de exemplo
    ├── context/
    │   └── AuthContext.js          # Autenticação e gerenciamento de usuário
    ├── screens/
    │   ├── SplashScreen.js         # Tela splash (3 segundos)
    │   ├── LoginScreen.js          # Tela de login
    │   ├── RegisterScreen.js       # Tela de registro
    │   ├── HomeScreen.js           # Tela home com perfil do usuário
    │   ├── BenchesScreen.js        # RF03 - mapa + reserva de bancadas
    │   ├── DamageReportScreen.js   # RF04 - avaria com foto
    │   ├── EquipmentsScreen.js     # RF02 - CRUD (admin)
    │   └── UsageHistoryScreen.js   # RF05 - histórico (professor)
    └── navigation/
        └── RootNavigator.js        # Navegação com autenticação
```

## 🗃️ Estrutura de dados (Firestore/Storage)

### `users/{uid}`
- `displayName` (string)
- `email` (string)
- `role` (`aluno` | `professor` | `admin`)
- `createdAt` (timestamp)

### `equipments/{id}` (RF02)
- `name` (string)
- `type` (`monitor` | `teclado` | `mouse` | `robotica`)
- `serial` (string|null)
- `createdAt` / `updatedAt` (timestamp)

### `reservations/{benchId}_{slotKey}` (RF03)
- `benchId` (string ex. `B01`)
- `slotKey` (string ex. `2026-04-14_19-00`)
- `startAt` (date/timestamp)
- `userId`, `userEmail`, `userDisplayName`
- `createdAt`

### `damageReports/{id}` + Storage (RF04)
- Firestore: `description`, `photoUrl`, `photoPath`, `user...`, `status`, `createdAt`
- Storage: `damageReports/{uid}/{timestamp}.jpg`

## 🚀 Como Executar

### 1) Instalar dependências
```bash
npm install
# ou
yarn install
```

### 2) Configurar Firebase
- Siga `FIREBASE_SETUP.md`
- Atualize `src/config/firebaseConfig.js`
- No Firebase Console, habilite:
  - Authentication → Email/Password
  - Firestore Database
  - Storage

### 3) Definir um usuário como admin (para testar RF02)
- Depois de criar uma conta no app, vá no Firestore:
  - `users/{uid}` → campo `role` = `admin`

### 4) Iniciar o app
```bash
npm start
# ou
expo start
```

### Executar em plataforma específica
```bash
npm run android    # Android
npm run ios        # iOS
npm run web        # Web
```

## 🔧 Próximas Melhorias

- [ ] Integração com backend/API
- [ ] Autenticação de usuário
- [ ] Persistência de dados com SQLite
- [ ] Histórico de vibração
- [ ] Notificações push para alertas
- [ ] Configurações de limites de vibração
- [ ] Export de relatórios
- [ ] Sincronização de dados em nuvem

## 📱 Permissões
- **Câmera**: usada em `Avarias` para tirar foto (Expo Image Picker).

## 🎯 Convenções de Código

- **Componentes funcionais** com React Hooks
- **StyleSheet do React Native** para estilos
- **React Native Paper** para componentes UI
- **Padrão de cores**: Usar `darkIndustrialColors` do tema

## 📝 Licença

SENAI 2026

---

**Desenvolvido para fins didáticos (SENAI 2026).**
