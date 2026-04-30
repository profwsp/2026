// Exemplo de estrutura do firebaseConfig.js
// IMPORTANTE: Substitua COM SUAS PRÓPRIAS CREDENCIAIS

const firebaseConfigExample = {
  // Obtenha esses valores em: Firebase Console > Configurações do Projeto > Apps > Web
  
  apiKey: "AIzaSyDxxxxxxxxxxxxxxxxxxx", 
  // Encontre em: Project Settings > Web App > SDK setup and configuration
  
  authDomain: "seu-projeto.firebaseapp.com",
  // Padrão: {projectId}.firebaseapp.com
  
  projectId: "seu-projeto-id",
  // ID exclusivo do seu projeto Firebase
  
  storageBucket: "seu-projeto.appspot.com",
  // Padrão: {projectId}.appspot.com
  
  messagingSenderId: "123456789012",
  // Encontre em: Project Settings > Cloud Messaging
  
  appId: "1:123456789012:web:abcdefghijklmnop",
  // Está em: Project Settings > Web App > App ID
  
  measurementId: "G-XXXXXXXXXX"
  // Opcional - para Google Analytics
};

// ════════════════════════════════════════════════════════════

// EXEMPLO COMPLETO COM DADOS FICTÍCIOS (NUNCA USE EM PRODUÇÃO)

const exampleFirebaseConfig = {
  apiKey: "AIzaSyCAZRQE7YzZ7p8q3K2L1M0N9O8P7Q",
  authDomain: "indusmonitor-demo.firebaseapp.com",
  projectId: "indusmonitor-demo-12345",
  storageBucket: "indusmonitor-demo-12345.appspot.com",
  messagingSenderId: "1234567890123",
  appId: "1:1234567890123:web:abcdefg1234567890"
};

// ════════════════════════════════════════════════════════════

// ESTRUTURA DE DADOS NO FIRESTORE

/*
Collection: users
├── Document: {userId} (gerado automaticamente pelo Firebase Auth)
│   ├── displayName: "João da Silva"
│   ├── email: "joao@example.com"
│   └── createdAt: Timestamp(April 10, 2026)

Collection: machines (opcional para futuro)
├── Document: machine_001
│   ├── name: "Máquina 01"
│   ├── status: "Operando"
│   ├── temperature: 45.2
│   └── vibration: 2.3
*/

// ════════════════════════════════════════════════════════════

// CONTAS DE TESTE RECOMENDADAS

const testAccounts = [
  {
    email: "teste1@example.com",
    password: "Senha123!",
    displayName: "Usuário Teste 1"
  },
  {
    email: "teste2@example.com",
    password: "Senha123!",
    displayName: "Usuário Teste 2"
  },
  {
    email: "admin@example.com",
    password: "Admin123!",
    displayName: "Administrador"
  }
];

// ════════════════════════════════════════════════════════════

// COMO OBTER SUAS CREDENCIAIS

/*
1. Vá para: https://console.firebase.google.com/
2. Selecione seu projeto
3. Clique no ícone de engrenagem (Configurações)
4. Selecione "Configurações do Projeto"
5. Vá para a aba "Apps"
6. Clique em seu aplicativo Web
7. Copie a configuração web completa

Ou:

1. No Firebase Console, clique no ícone </> do lado de "Web"
2. Você verá o firebaseConfig completo
3. Copie e cole em src/config/firebaseConfig.js
*/

// ════════════════════════════════════════════════════════════

// CONFIGURAÇÃO DO FIRESTORE PARA DESENVOLVIMENTO

/*
Regras recomendadas para DESENVOLVIMENTO:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}

⚠️ NUNCA USE EM PRODUÇÃO!

Para PRODUÇÃO, use regras mais restritivas:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId
        && request.auth.token.email_verified;
    }
  }
}
*/

// ════════════════════════════════════════════════════════════

// HABILITANDO AUTENTICAÇÃO NO FIREBASE

/*
1. Firebase Console > Projeto
2. Clique em "Autenticação"
3. Clique em "Primeiros passos" ou "Métodos de entrada"
4. Procure por "Email/Senha"
5. Clique no ícone de editar
6. Ative "Email/Senha"
7. Clique em "Salvar"
*/

// ════════════════════════════════════════════════════════════

// TESTANDO A CONEXÃO

/*
Se você receber um erro ao tentar fazer login:

1. Verifique se configurou o firebaseConfig correto
2. Verifique se o Email/Senha está ativado no Firebase
3. Confirme que a conta existe no Firebase Console
4. Verifique as regras do Firestore
5. Veja os logs no browser DevTools (F12)
*/

export default firebaseConfigExample;
