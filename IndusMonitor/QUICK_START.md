# 🚀 Guia de Inicio Rápido - IndusMonitor 4.0

## Pré-requisitos

- **Node.js** versão 16+ (baixe em https://nodejs.org)
- **Expo CLI** instalado globalmente
- **Android Studio** ou **Xcode** (para rodar em emulador/dispositivo)

## 📦 Instalação

### 1. Instalar dependências
```bash
cd IndusMonitor
npm install
```

Ou se preferir usar yarn:
```bash
yarn install
```

### 2. Instalar Expo CLI globalmente (se não tiver)
```bash
npm install -g expo-cli
```

## ▶️ Executando a Aplicação

### Iniciar servidor de desenvolvimento
```bash
npm start
```

Ou use o comando direto do Expo:
```bash
expo start
```

### Executar em plataforma específica

#### Android
```bash
npm run android
```

#### iOS (apenas em Mac)
```bash
npm run ios
```

#### Web
```bash
npm run web
```

## 🔧 Troubleshooting

### Problema: "Cannot find module expo-barcode-scanner"
**Solução**: Certifique-se de que rodou `npm install`

### Problema: Port 19000 já em uso
**Solução**: Use outro port: `expo start --port 19001`

### Problema: Permissões de câmera negadas (Android)
**Solução**: Limpe o app e tente novamente, conceda permissões quando solicitado

### Problema: App não inicia no iOS
**Solução**: Limpe cache com `expo start -c` (clear cache)

## 📁 Estrutura do Projeto

```
IndusMonitor/
├── App.js                      # Entrada principal
├── app.json                    # Configuração Expo
├── package.json                # Dependências
├── src/
│   ├── theme/                  # Temas visuais
│   ├── components/             # Componentes reutilizáveis
│   ├── screens/                # Telas da app
│   ├── navigation/             # Configuração de navegação
│   ├── config/                 # Configurações globais
│   ├── constants/              # Constantes e enums
│   └── data/                   # Dados de exemplo
└── assets/                     # Imagens e ícones
```

## 🎯 Funcionalidades Principais

### Dashboard
- Visualização de máquinas em tempo real
- Status: Operando, Alerta, Parada
- Temperatura e vibração de cada máquina

### Scanner QR Code
- Lê QR codes usando câmera
- Identifica máquinas por código unique
- Registra informações do códigoidentificado

### Sensores
- Monitoramento de vibração em tempo real
- Acelerômetro nos eixos X, Y, Z
- Gráfico dinâmico dos dados
- Classificação automática de status

## 📱 Testando em Simulador

### Android Emulator
1. Abra o Android Studio
2. Crie um dispositivo virtual (AVD)
3. Inicie o emulador
4. Na CLI do Expo, pressione `a`

### iOS Simulator (Mac)
1. Tenha Xcode instalado
2. Na CLI do Expo, pressione `i`

## 🔌 Testando em Dispositivo Real

### Android
1. Baixe o app **Expo Go** no Google Play
2. Escaneie o QR code exibido no terminal com o app
3. O app carregará no dispositivo

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
