# Configuração do Firebase

## 📋 Pré-requisitos

- Conta Google
- Projeto criado no [Firebase Console](https://console.firebase.google.com/)

## 🔧 Passos para Configurar

### 1. Criar Projeto Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em **"Adicionar projeto"**
3. Insira o nome do projeto (ex: "IndusMonitor")
4. Siga as instruções até criar o projeto

### 2. Ativar Autenticação por Email/Senha

1. No Firebase Console, vá para **Autenticação**
2. Clique em **"Primeiros passos"**
3. Na seção **"Métodos de entrada"**, selecione **"Email/Senha"**
4. Ative a opção **"Email/Senha"** e clique em **"Salvar"**

### 3. Criar Banco de Dados Firestore

1. No Firebase Console, vá para **Firestore Database**
2. Clique em **"Criar banco de dados"**
3. Selecione **"Iniciar no modo de produção"**
4. Escolha a localização mais próxima
5. Clique em **"Criar"**

### 4. Configurar Regras de Segurança (Desenvolvimento)

1. Na aba **"Regras"** do Firestore, substitua o conteúdo por:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

5. Clique em **"Publicar"**

### 5. Obter Credenciais do Firebase

1. No Firebase Console, clique no ícone de engrenagem (Configurações do Projeto)
2. Vá para **"Aplicativos Web"** ou clique em **"Adicionar aplicativo"**
3. Selecione **"Web"**
4. Dê um nome ao aplicativo (ex: "IndusMonitor Web")
5. Clique em **"Registrar aplicativo"**
6. Copie as credenciais exibidas (firebaseConfig)

### 6. Atualizar firebaseConfig.js

1. Abra o arquivo `src/config/firebaseConfig.js`
2. Substitua os valores do objeto `firebaseConfig` com suas credenciais:

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};
```

## 📱 Como Usar a Aplicação

### Tela Splash Screen
- Exibida por 3 segundos com o logo do IndusMonitor
- Cores: Fundo azul, texto branco
- Versão exibida na parte inferior

### Tela de Login
- Email e Senha conectados ao Firebase
- Opção para criar nova conta

### Tela de Home
- Nome do usuário exibido no topo à esquerda
- Nome da aplicação centralizado
- Acesso ao Dashboard e Sensores
- Opção de logout

## 🧪 Testando a Aplicação

1. Instale as dependências:
```bash
npm install
# ou
yarn install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm start
# ou
yarn start
```

3. Escaneie o código QR com o Expo Go (mobile):
   - iOS: Abra a câmera e aponte para o código QR
   - Android: Abra o Expo Go e escaneie o código QR

4. Teste as funcionalidades:
   - Veja a tela splash screen aparecer por 3 segundos
   - Faça login com uma conta existente ou crie uma nova
   - Verifique se o nome do usuário aparece na tela home
   - Teste a navegação entre abas

## ⚠️ Notas Importantes

- **Não compartilhe suas credenciais Firebase** publicamente
- Em produção, considere usar variáveis de ambiente ou secrets
- As regras de segurança do Firestore acima são apenas para desenvolvimento
- Sempre atualize as regras para produção conforme necessário

## 🔗 Recursos Úteis

- [Documentação Firebase](https://firebase.google.com/docs)
- [React Native Firebase](https://rnfirebase.io/)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firestore Database](https://firebase.google.com/docs/firestore)
