# 🚀 Guia Rápido de Início - LabApp Didático

## ⚡ 5 Passos para Começar

### 1️⃣ Instalar Dependências
```bash
cd IndusMonitor
npm install
```

### 2️⃣ Configurar Firebase

**Opção A: Rápido (apenas teste)**
- Abra `src/config/firebaseConfig.js`
- Substitua com suas credenciais do Firebase
 - Habilite no Console: Auth (Email/Senha), Firestore e Storage

**Opção B: Detalhado**
- Leia [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) para instruções passo-a-passo
- Crie um projeto em [firebase.google.com](https://firebase.google.com)

### 3️⃣ Iniciar o Servidor
```bash
npm start
```

Você verá um código QR no terminal.

### 4️⃣ Abrir no Dispositivo

**Android:**
- Abra "Expo Go"
- Escaneie o código QR

**iPhone:**
- Abra a câmera
- Aponte para o código QR
- Toque em "Abrir em Expo Go"

**Web:**
- Pressione `w` no terminal

### 5️⃣ Testar

1. Veja a **Splash Screen** aparecer (3 segundos)
2. Vá para a **Tela de Login**
3. **Crie uma nova conta** ou use uma existente
4. Veja seu **nome no topo da Home Screen**
5. Teste:
   - `Bancadas` (RF03): reserve uma bancada por data/hora
   - `Avarias` (RF04): envie descrição + foto
   - (Opcional) mude seu `role` para `admin` no Firestore e teste `Equipamentos` (RF02)
   - (Opcional) crie um usuário `professor` e teste `Histórico` (RF05)

## ✅ Checklist de Setup

- [ ] Node.js instalado (`node --version`)
- [ ] NPM instalado (`npm --version`)
- [ ] Projeto clonado/baixado
- [ ] Google/Firebase account criada
- [ ] Firebase project criado
- [ ] Credenciais copiadas
- [ ] `firebaseConfig.js` atualizado
- [ ] `npm install` executado
- [ ] `npm start` funcionando

## 📱 O que Você Verá

```
TELA 1: Splash Screen (3s)
├─ Fundo: Azul (#0066CC)
└─ Texto: "IndusMonitor" (branco)
   Versão: "v1.0.0" (abaixo)

       ↓ (após 3 segundos)

TELA 2: Login
├─ Campo: Email
├─ Campo: Senha
├─ Botão: Entrar
└─ Link: Criar Conta

       ↓ (após autenticação)

TELA 3: Home
├─ Topo Esquerda: Seu Nome
├─ Centro: "LabApp Didático"
└─ Menu:
   ├─ Agendar Bancada
   ├─ Relatar Avaria
   ├─ Equipamentos (admin)
   └─ Histórico (professor)
```

## 🆘 Problemas Comuns

### ❌ "Cannot find module 'firebase'"
```bash
npm install firebase
```

### ❌ "Firebase config is undefined"
1. Abra `src/config/firebaseConfig.js`
2. Verifique se os valores não são vazios
3. Copie novamente as credenciais do Firebase

### ❌ "PERMISSION_DENIED"
1. Vá ao Firebase Console
2. Regras → Altere para:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    allow read, write: if true;
  }
}
```
> ⚠️ **Apenas para desenvolvimento!** Nunca use em produção.

### ❌ "Cannot find module 'expo'"
```bash
npm install expo expo-splash-screen expo-status-bar
```

### ❌ Port já em uso
```bash
npm start -- --port 19001
```

### ❌ App não recarrega
```bash
npm start -- --clear
```

## 📚 Documentação Completa

- **Firebase Setup**: [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)
- **README Completo**: [README.md](./README.md)
- **Firebase Docs**: https://firebase.google.com/docs
- **React Native Docs**: https://reactnative.dev

## 💡 Dicas Importantes

✅ Sempre use `npm start -- --clear` se tiver problemas  
✅ Recarregue o app pressionando `r` no terminal  
✅ Verifique a console do seu telefone com `j` (Android)  
✅ Verifique logs pressionando `m` (menu)  

## 🎯 Próximos Passos

Depois que funcionar:
1. Customize as cores em `src/theme/darkIndustrialTheme.js`
2. Adicione mais dados no Dashboard
3. Configure notificações push
4. Deploy para produção

---

**Pronto?** Execute `npm start`! 🎉

### iOS
1. Baixe o app **Expo Go** na App Store
2. Escaneie o QR code exibido no terminal
3. O app carregará no dispositivo

## 🛠️ Comandos Úteis

```bash
# Limpar cache do Expo
expo start -c

# Resetar watchman (se usando Mac)
watchman watch-del-all

# Instalar dependência específica
npm install <package-name>

# Remover dependência
npm uninstall <package-name>

# Atualizar todas as dependências
npm update
```

## 📚 Documentação Útil

- [React Native Docs](https://reactnative.dev)
- [Expo Docs](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [React Native Paper](https://callstack.github.io/react-native-paper)

## 💡 Dicas de Desenvolvimento

1. Use `console.log()` para debug
2. Verifique os erros no terminal do Expo
3. Use hot reload (tecla `r` no terminal para recarregar)
4. Mantenha componentes limpos e reutilizáveis
5. Sempre adicione comentários ao código

## ❓ Mais Ajuda

Se encontrar problemas:
1. Verifique a seção Troubleshooting acima
2. Consulte a documentação do Expo
3. Limpe cache: `expo start -c`
4. Reinstale dependências: `rm -rf node_modules && npm install`

---

**Desenvolvido para SENAI - IndusMonitor 4.0**
