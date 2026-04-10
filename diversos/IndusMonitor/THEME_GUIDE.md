# 🎨 Tema Dark Industrial - Guia Completo

## Paleta de Cores

### Cores Primárias

| Cor | Nome | Código HEX | RGB | Uso |
|-----|------|-----------|-----|-----|
| 🔵 | Cyan | #00BCD4 | rgb(0, 188, 212) | Cores primárias, destaque |
| 🟠 | Orange | #FF6B00 | rgb(255, 107, 0) | Advertências, ações secundárias |
| 🟢 | Green | #00E676 | rgb(0, 230, 118) | Status operacional, sucesso |
| 🔴 | Red | #FF5252 | rgb(255, 82, 82) | Erros, parada |
| 🟡 | Yellow | #FFC400 | rgb(255, 196, 0) | Aviso, manutenção |

### Cores de Fundo

| Cor | Nome | Código HEX | RGB | Uso |
|-----|------|-----------|-----|-----|
| ⬛ | Dark BG | #0A0E27 | rgb(10, 14, 39) | Fundo principal |
| ⬛ | Dark Surface | #151B36 | rgb(21, 27, 54) | Superfícies |
| ⬛ | Dark Card | #1F2847 | rgb(31, 40, 71) | Cards e componentes |
| ⬛ | Dark Border | #2D3561 | rgb(45, 53, 97) | Bordas e separadores |

### Cores de Texto

| Cor | Nome | Código HEX | RGB | Uso |
|-----|------|-----------|-----|-----|
| ⚪ | Text Primary | #E0E0E0 | rgb(224, 224, 224) | Texto principal |
| ⚪ | Text Secondary | #A0A0A0 | rgb(160, 160, 160) | Texto secundário |
| ⚪ | Text Muted | #757575 | rgb(117, 117, 117) | Texto desabilitado |

## Status Colors

### Estados de Máquina

```
Operando    🟢 #00E676 (Verde)
Alerta      🟠 #FF6B00 (Laranja)
Parada      🔴 #FF5252 (Vermelho)
Manutenção  🟡 #FFC400 (Amarelo)
```

### Indicadores de Vibração

```
Normal      🟢 < 1.0 m/s²
Alerta      🟠 1.0 - 3.0 m/s²
Crítico     🔴 > 3.0 m/s²
```

## Componentes e Estilos

### Appbar (Header)
- **Fundo**: Dark Card (#1F2847)
- **Borda**: Dark Border (#2D3561)
- **Texto Principal**: Cyan (#00BCD4)
- **Subtexto**: Text Secondary (#A0A0A0)

```javascript
<Appbar.Header style={{ backgroundColor: darkIndustrialColors.darkCard }}>
  <Appbar.Content
    title="Título"
    titleStyle={{ color: darkIndustrialColors.cyan }}
    subtitleStyle={{ color: darkIndustrialColors.textSecondary }}
  />
</Appbar.Header>
```

### Cards
- **Fundo**: Dark Card (#1F2847)
- **Borda Esquerda**: Cor do Status (verde/laranja/vermelho)
- **Padding**: 16px (padrão)
- **Border Radius**: 8px

```javascript
<Card style={{
  backgroundColor: darkIndustrialColors.darkCard,
  borderLeftWidth: 4,
  borderLeftColor: statusColor,
}}>
  {/* Conteúdo */}
</Card>
```

### Chips (Status)
- **Cores**: Variam conforme status (verde/laranja/vermelho)
- **Texto**: Preto (#000000) para contraste
- **Tamanho**: 12px de fonte

```javascript
<Chip
  style={{ backgroundColor: statusColor }}
  textStyle={{ color: '#000000' }}
  label="Operando"
/>
```

### Botões
- **Primário**: Cyan (#00BCD4)
- **Secundário**: Orange (#FF6B00)
- **Danger**: Red (#FF5252)

```javascript
<Button
  mode="contained"
  style={{ backgroundColor: darkIndustrialColors.cyan }}
>
  Ação
</Button>
```

### Inputs & Fields
- **Fundo**: Dark Surface (#151B36)
- **Borda**: Dark Border (#2D3561)
- **Texto**: Text Primary (#E0E0E0)
- **Placeholder**: Text Secondary (#A0A0A0)

```javascript
<TextInput
  style={{
    backgroundColor: darkIndustrialColors.darkSurface,
    borderColor: darkIndustrialColors.darkBorder,
    color: darkIndustrialColors.textPrimary,
  }}
/>
```

### Gráficos
- **Linha**: Cyan (#00BCD4)
- **Fundo**: Dark BG (#0A0E27)
- **Espessura**: 2px

```javascript
<LineChart
  data={data}
  svg={{ stroke: darkIndustrialColors.cyan, strokeWidth: 2 }}
  contentInset={{ top: 10, bottom: 10 }}
/>
```

## Tipografia

### Tamanhos de Fonte

| Variant | Tamanho | Uso |
|---------|--------|-----|
| headlineSmall | 24px | Títulos de seção |
| titleMedium | 16px | Títulos de card |
| bodySmall | 12px | Texto descritivo |
| labelSmall | 11px | Labels, IDs |
| labelLarge | 14px | Labels destacados |

```javascript
<Text variant="headlineSmall" style={{ color: darkIndustrialColors.textPrimary }}>
  Título Principal
</Text>

<Text variant="bodySmall" style={{ color: darkIndustrialColors.textSecondary }}>
  Texto descritivo
</Text>
```

## Espaçamento (Padding & Margin)

```javascript
// Padrão utilizado
padding: 16,        // Padrão geral
paddingHorizontal: 16,
paddingVertical: 12,

marginBottom: 12,   // Entre componentes
marginHorizontal: 16,

gap: 12,           // Entre items em flexbox
```

## Sombras e Elevação

Usar Paper's elevation prop:

```javascript
<Surface elevation={1}>
  {/* Conteúdo */}
</Surface>

<Card elevation={2}>
  {/* Conteúdo */}
</Card>
```

## Border Radius

```javascript
// Pequeno
borderRadius: 4,

// Médio (padrão)
borderRadius: 8,

// Grande
borderRadius: 12,

// Muito grande
borderRadius: 20,
```

## Animações

### Transições Recomendadas
- Cor: 200ms
- Tamanho: 300ms
- Opacidade: 200ms
- Movimento: 300ms

```javascript
import { Animated } from 'react-native';

const fadeAnim = new Animated.Value(0);

Animated.timing(fadeAnim, {
  toValue: 1,
  duration: 300,
  useNativeDriver: false,
}).start();
```

## Responsividade

Considerar diferentes tamanhos de tela:

```javascript
// Para tablets
@media (min-width: 768px) {
  // Ajustar tamanhos
}

// Usar Dimensions para calcular
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
```

## Modo Escuro

O tema já está configurado para Dark Mode:

```javascript
// Em app.json
"userInterfaceStyle": "dark"

// Força dark mode em componentes
<SafeAreaProvider>
  {/* Conteúdo */}
</SafeAreaProvider>
```

## Acessibilidade

- Contraste mínimo 4.5:1 entre texto e fundo
- Ícones descritivos com labels
- Cores não como único indicador (usar ícones/texto também)
- Tamanho mínimo de touch target: 48x48dp

```javascript
<Text accessibilityLabel="Máquina operando">
  ● Operando
</Text>

<TouchableOpacity
  accessible={true}
  accessibilityRole="button"
  accessibilityLabel="Botão de ação"
>
  {/* Conteúdo */}
</TouchableOpacity>
```

## Exportando Tema para Other Apps

Se precisar usar o mesmo tema em outros projetos:

```javascript
// Criar arquivo externo
export const darkIndustrialTheme = { /* ... */ };

// Usar em outro projeto
import { darkIndustrialTheme } from 'indusmonitor-theme';

// Em App.js
<PaperProvider theme={darkIndustrialTheme}>
  {/* App */}
</PaperProvider>
```

---

**Tema desenvolvido para IndusMonitor 4.0 - SENAI**
