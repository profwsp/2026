// Configurações da aplicação

export const CONFIG = {
  // Limites de vibração (em m/s²)
  VIBRATION_LIMITS: {
    NORMAL: 1.0,
    WARNING: 3.0,
    CRITICAL: 5.0,
  },

  // Limites de temperatura (em °C)
  TEMPERATURE_LIMITS: {
    NORMAL: 70,
    WARNING: 85,
    CRITICAL: 100,
  },

  // Intervalo de atualização dos sensores (em ms)
  SENSOR_UPDATE_INTERVAL: 500,

  // Quantidade de pontos no gráfico
  CHART_DATA_POINTS: 100,

  // Configurações de scanner
  SCANNER: {
    CAMERA_TYPE: 'back',
    AUTO_FOCUS: 'on',
    FLASH_MODE: 'off',
  },

  // Configurações de app
  APP: {
    version: '4.0.0',
    name: 'IndusMonitor 4.0',
    author: 'SENAI',
  },
};

export default CONFIG;
