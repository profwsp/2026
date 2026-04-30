# 🚀 Setup Rápido - Login BD

## Passo 1: Install dependências
```bash
npm install
```

## Passo 2: Configurar Firebase 

1. Vá para https://console.firebase.google.com
2. Crie um novo projeto ou use um existente
3. Em **Authentication**, ative **Email/Password Sign-in**
4. Copie suas credenciais

## Passo 3: Adicionar Credenciais

Abra `src/config/firebaseConfig.js` e substitua:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",                    // ← Substitua
  authDomain: "your-project.firebaseapp.com", // ← Substitua
  projectId: "your-project-id",               // ← Substitua
  storageBucket: "your-project.appspot.com",  // ← Substitua
  messagingSenderId: "your-messaging-sender-id", // ← Substitua
  appId: "your-app-id",                       // ← Substitua
  databaseURL: "https://your-project.firebaseio.com" // ← Substitua
};
```

## Passo 4: Executar App

```bash
npm start
```

Então pressione:
- `a` para Android
- `i` para iOS
- `w` para Web

## ✅ Pronto!

O app mostrará:
1. **Splash Screen** por 3 segundos (azul com "Login BD")
2. **Tela de Login** (e-mail e senha)
3. **Home** após autenticação (nome do usuário + nome do app)

## 📝 Testar

- Email: `teste@example.com`
- Senha: `senha123`

Clique em "Não tem conta? Criar nova" para registrar um novo usuário.

---

**Dúvidas?** Veja o `README.md` completo para mais detalhes.
