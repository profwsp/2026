# IndusMonitor 4.0 - Estrutura & Documentação

## 📋 Visão Geral

IndusMonitor 4.0 é uma aplicação React Native com Expo para monitoramento industrial em tempo real, desenvolvida para o SENAI. A aplicação oferece:

- **Dashboard**: Visualização de máquinas com status em tempo real
- **Scanner**: Leitura de QR Codes para identificação de máquinas
- **Sensores**: Monitoramento de vibração via acelerômetro

## 📁 Estrutura do Projeto

```
IndusMonitor/
├── App.js                          # Ponto de entrada da aplicação
├── app.json                        # Configuração do Expo
├── package.json                    # Dependências do projeto
├── assets/                         # Imagens e ícones
└── src/
    ├── theme/
    │   └── darkIndustrialTheme.js  # Tema Dark Industrial (cores e estilos)
    ├── components/
    │   └── MachineCard.js          # Componente de card de máquina
    ├── screens/
    │   ├── DashboardScreen.js      # Tela principal com lista de máquinas
    │   ├── ScannerScreen.js        # Tela de leitura de QR Code
    │   └── SensorsScreen.js        # Tela de monitoramento de vibração
    └── navigation/
        └── RootNavigator.js        # Configuração de navegação com tabs
```

## 🎨 Tema Dark Industrial

O tema visual "Dark Industrial" utiliza:
- **Cores principais**: Cyan (#00BCD4), Orange (#FF6B00), Green (#00E676)
- **Cores neutras**: Tons de cinza/azul escuro para fundo
- **Status**: Verde (Operando), Laranja (Alerta), Vermelho (Parada)

**Localização**: `src/theme/darkIndustrialTheme.js`

## 📦 Dependências Principais

```json
{
  "react-native-paper": "^5.12.0",        // UI Components
  "@react-navigation/native": "^6.1.9",   // Navigation
  "@react-navigation/bottom-tabs": "^6.5.8", // Bottom Tabs
  "expo-barcode-scanner": "~14.0.0",      // QR Code Scanner
  "expo-sensors": "~14.0.0",              // Acelerômetro
  "react-native-svg-charts": "^5.4.0"     // Gráficos de vibração
}
```

## 🖥️ Screens

### 1. Dashboard Screen
- **Arquivo**: `src/screens/DashboardScreen.js`
- **Componentes**: 
  - Status summary (resumo de máquinas por status)
  - Lista de MachineCard com dados em tempo real
- **Dados de exemplo**: 5 máquinas com diferentes status
- **Recurso**: FAB para atualizar dados

### 2. Scanner Screen
- **Arquivo**: `src/screens/ScannerScreen.js`
- **Funcionalidades**:
  - Captura de QR Codes usando câmera
  - Visualização com overlay de identificação
  - Exibição de código lido com tipo
- **Permissões**: Requer permissão de câmera

### 3. Sensors Screen
- **Arquivo**: `src/screens/SensorsScreen.js`
- **Funcionalidades**:
  - Monitoramento em tempo real do acelerômetro
  - Gráfico dinâmico de vibração (últimos 100 pontos)
  - Métricas: Média, Pico, Eixos X, Y, Z
  - Seleção de eixo (Combinado, X, Y, Z)
- **Status automático**: Normal, Alerta, Crítico

## 🧩 Componentes

### MachineCard
- **Arquivo**: `src/components/MachineCard.js`
- **Props**:
  - `machineId`: ID da máquina
  - `name`: Nome da máquina
  - `status`: Status (Operando, Alerta, Parada)
  - `temperature`: Temperatura em °C
  - `vibration`: Vibração em mm/s
- **Features**: Borda colorida cor status, chip de status, métricas

## 🧭 Navegação

### RootNavigator
- **Arquivo**: `src/navigation/RootNavigator.js`
- **Tipo**: Bottom Tab Navigation
- **Tabs**:
  - Dashboard (ícone: grid)
  - Scanner (ícone: qrcode-scan)
  - Sensores (ícone: vibrate)

## 🚀 Como Executar

### Instalar dependências
```bash
npm install
# ou
yarn install
```

### Iniciar o app
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

## 📱 Permissões Necessárias

O app requer:
- **Câmera**: Para scanning de QR Codes
- **Acelerômetro**: Para monitoramento de sensores (usuário já possui no dispositivo)

As permissões estão configuradas em `app.json` usando plugins do Expo.

## 🎯 Convenções de Código

- **Componentes funcionais** com React Hooks
- **StyleSheet do React Native** para estilos
- **React Native Paper** para componentes UI
- **Padrão de cores**: Usar `darkIndustrialColors` do tema

## 📝 Licença

SENAI 2026

---

**Desenvolvido com ❤️ para IndusMonitor 4.0**
