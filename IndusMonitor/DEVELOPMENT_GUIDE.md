# 📖 Guia de Desenvolvimento - IndusMonitor 4.0

## Estrutura e Padrões de Código

### Padrão de Screen

Toda screen deve seguir este padrão:

```javascript
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Text, Appbar } from 'react-native-paper';
import { darkIndustrialColors } from '../theme/darkIndustrialTheme';

const NovaScreen = () => {
  const [state, setState] = useState(initialValue);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Appbar.Header style={styles.appbar}>
        <Appbar.Content
          title="Título"
          subtitle="Subtítulo"
          titleStyle={styles.appbarTitle}
          subtitleStyle={styles.appbarSubtitle}
        />
      </Appbar.Header>

      {/* Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Content aqui */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: darkIndustrialColors.darkBg,
  },
  appbar: {
    backgroundColor: darkIndustrialColors.darkCard,
    borderBottomWidth: 1,
    borderBottomColor: darkIndustrialColors.darkBorder,
  },
  appbarTitle: {
    color: darkIndustrialColors.cyan,
    fontSize: 20,
    fontWeight: 'bold',
  },
  appbarSubtitle: {
    color: darkIndustrialColors.textSecondary,
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
});

export default NovaScreen;
```

### Padrão de Componente

```javascript
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { darkIndustrialColors } from '../theme/darkIndustrialTheme';

const MeuComponente = ({ prop1, prop2, onPress }) => {
  const handlePress = () => {
    onPress && onPress();
  };

  return (
    <Card style={styles.container} onPress={handlePress}>
      <View style={styles.content}>
        <Text style={styles.title}>{prop1}</Text>
        <Text style={styles.subtitle}>{prop2}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkIndustrialColors.darkCard,
    marginBottom: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    color: darkIndustrialColors.textPrimary,
    fontWeight: 'bold',
  },
  subtitle: {
    color: darkIndustrialColors.textSecondary,
    marginTop: 8,
  },
});

export default MeuComponente;
```

## 🎨 Usando o Tema

Sempre use as cores do tema ao invés de Hard-code:

```javascript
// ✅ BOM
backgroundColor: darkIndustrialColors.darkBg
color: darkIndustrialColors.cyan

// ❌ RUIM
backgroundColor: '#121212'
color: '#00BCD4'
```

Cores disponíveis em `darkIndustrialColors`:
- `darkBg` - Fundo escuro principal
- `darkSurface` - Superfície escura
- `darkCard` - Card de conteúdo
- `darkBorder` - Bordas
- `cyan` - Cor primária
- `orange` - Cor secundária
- `green` - Cor de sucesso/operando
- `red` - Cor de erro/parada
- `yellow` - Cor de aviso
- `textPrimary` - Texto principal
- `textSecondary` - Texto secundário
- `textMuted` - Texto desabilitado
- `operating` - Status operando (verde)
- `warning` - Status alerta (laranja)
- `stopped` - Status parada (vermelho)
- `maintenance` - Status manutenção (amarelo)

## 📱 Adicionando Nova Tab

Para adicionar uma nova aba na navegação:

1. Crie a screen em `src/screens/`
2. Adicione em `src/navigation/RootNavigator.js`:

```javascript
import NovaScreen from '../screens/NovaScreen';

// Dentro de Tab.Navigator
<Tab.Screen
  name="Nova"
  component={NovaScreen}
  options={{
    tabBarLabel: 'Nova',
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons
        name="icon-name"
        size={size}
        color={color}
      />
    ),
  }}
/>
```

3. Importe a nova screen no RootNavigator

## 🗂️ Adicionando Novo Componente

1. Crie o arquivo em `src/components/MeuComponente.js`
2. Defina as props com TypeScript JSDoc (opcional):

```javascript
/**
 * MeuComponente
 * @param {string} prop1 - Descrição da prop1
 * @param {function} onPress - Callback ao pressionar
 */
const MeuComponente = ({ prop1, onPress }) => {
  // ...
};
```

3. Exporte e use em outras partes do app

## 🔄 Padrão de Estado

Use hooks corretamente:

```javascript
// useState para estado simples
const [count, setCount] = useState(0);

// useState para objetos complexos
const [user, setUser] = useState({ name: '', email: '' });

// Atualizar estado de objeto
setUser(prev => ({ ...prev, name: 'João' }));

// useEffect para side effects
useEffect(() => {
  // Setup
  return () => {
    // Cleanup
  };
}, [dependency]);
```

## 📊 Adicionando Gráficos

Use a biblioteca `react-native-svg-charts`:

```javascript
import { LineChart, AreaChart, BarChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

<LineChart
  style={{ height: 200 }}
  data={data}
  svg={{ stroke: darkIndustrialColors.cyan, strokeWidth: 2 }}
  contentInset={{ top: 10, bottom: 10 }}
  curve={shape.curveNatural}
/>
```

## 🔧 Usando Constantes

Sempre use constantes ao invés de valores hardcoded:

```javascript
// Em src/constants/constants.js
export const MACHINE_STATUS = {
  OPERATING: 'Operando',
  ALERT: 'Alerta',
  STOPPED: 'Parada',
};

// No seu componente
import { MACHINE_STATUS } from '../constants/constants';

if (status === MACHINE_STATUS.OPERATING) {
  // ...
}
```

## 📝 Boas Práticas

### 1. Nomenclatura
- **Screens**: NovoScreen.js (PascalCase + "Screen")
- **Componentes**: MeuComponente.js (PascalCase)
- **Funções**: minhaFuncao() (camelCase)
- **Constantes**: MINHA_CONSTANTE (UPPER_SNAKE_CASE)

### 2. Organização
- Imports de cima para baixo: React, RN, 3rd-party, local
- Lógica de negócio antes da renderização
- Estilos sempre no final do arquivo

### 3. Performance
- Use `React.memo()` para componentes que recebem muitas props
- Otimize re-renders com `useCallback` e `useMemo`
- Apenas subscribe a eventos quando necessário

### 4. Segurança
- Valide dados de entrada
- Nunca exponha tokens em console.log
- Use variáveis de ambiente para dados sensíveis

## 🧪 Testando

Para testar em diferentes cenários:

```javascript
// Sugerir dados de teste
import { mockMachines } from '../data/mockData';

// Usar em development
if (__DEV__) {
  console.log('Development mode');
}
```

## 📚 Recursos Úteis

- [React Hook Rules](https://react.dev/warnings/invalid-hook-call-warning)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Navigation Best Practices](https://reactnavigation.org)
- [React Native Paper Components](https://callstack.github.io/react-native-paper/docs/components/ActivityIndicator)

## 🐛 Debug

```javascript
// Adicionar logging
console.log('Variável:', variavel);

// React DevTools profiler
// Metro debugger no browser

// Inspect element (web)
// React Native Debugger (app externa)
```

## 🚀 Performance Tips

1. Lazy load screens quando possível
2. Use FlatList ao invés de ScrollView para listas grandes
3. Memorize callbacks com useCallback
4. Memoize valores com useMemo
5. Evite criar novos objetos/funções em render

---

**Bom desenvolvimento! 💻**
