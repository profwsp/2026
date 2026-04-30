# Login BD - Aplicativo React Native

Um aplicativo completo de autenticação em React Native com Firebase, incluindo tela splash, login e home.

## Funcionalidades

✅ **Tela Splash Screen** - Exibição de 3 segundos com nome do app e versão em fundo azul
✅ **Tela de Login** - Autenticação por e-mail e senha
✅ **Criar Conta** - Opção para registrar novos usuários
✅ **Tela Home** - Dashboard pós-autenticação com nome do usuário
✅ **Integração Firebase** - Autenticação segura e banco de dados online
✅ **Navegação RN** - Sistema de rotas responsivo

## Instalação

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Crie um novo projeto
3. Configure autenticação:
   - Vá para **Authentication** → **Sign-in method**
   - Ative **Email/Password**
4. Copie as credenciais do projeto
5. Abra `src/config/firebaseConfig.js` e atualize com suas informações:

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "seu-messaging-id",
  appId: "seu-app-id",
  databaseURL: "https://seu-projeto.firebaseio.com"
};
```

### 3. Executar no Expo

```bash
npm start
```

**Android:** Pressione `a`
**iOS:** Pressione `i`
**Web:** Pressione `w`

## Estrutura do Projeto

```
login_bd/
├── src/
│   ├── config/
│   │   └── firebaseConfig.js      # Configuração do Firebase
│   ├── context/
│   │   └── AuthContext.js          # Contexto de autenticação
│   ├── navigation/
│   │   └── NavigationStack.js      # Sistema de navegação
│   └── screens/
│       ├── SplashScreen.js         # Tela inicial (3s)
│       ├── LoginScreen.js          # Autenticação
│       └── HomeScreen.js           # Dashboard
├── App.js                          # Arquivo principal
├── app.json                        # Configuração Expo
├── package.json                    # Dependências
└── README.md                       # Este arquivo
```

## Fluxo da Aplicação

1. **Splash Screen** (3 segundos)
   - Fundo azul (#0066CC)
   - Texto "Login BD" em branco centralizado
   - Versão no rodapé

2. **Login Screen**
   - Entrada de e-mail e senha
   - Opção de criar nova conta
   - Validação de campos
   - Autenticação com Firebase

3. **Home Screen** (após autenticação)
   - Nome do usuário no topo à esquerda
   - Nome do app centralizado
   - Botão para fazer logout

## Dependências

- **expo**: Framework React Native
- **react-navigation**: Navegação entre telas
- **firebase**: Autenticação e banco de dados
- **expo-status-bar**: Barra de status

## Próximos Passos

Para expandir este projeto:

- [ ] Adicionar tela de recuperação de senha
- [ ] Implementar perfil de usuário editável
- [ ] Adicionar armazenamento de dados pessoais
- [ ] Integrar notificações push
- [ ] Implementar temas claro/escuro
- [ ] Adicionar testes unitários

## Troubleshooting

### Erro "firebase not initialized"
- Verifique se o `firebaseConfig.js` está preenchido corretamente

### Tela branca
- Limpe o cache: `npm start -- --clear`
- Reinstale as dependências: `npm install`

### Autenticação não funciona
- Confirme que a autenticação por Email/Password está ativada no Firebase
- Verifique as credenciais do projeto em `firebaseConfig.js`

## Licença

MIT - Livre para usar e modificar

**Desenvolvido com ❤️ usando React Native e Firebase**
