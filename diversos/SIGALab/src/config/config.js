export const APP_NAME = 'SIGALab';

export const ROLES = {
  ALUNO: 'aluno',
  PROFESSOR: 'professor',
  ADMIN: 'admin',
};

// Mapa didático do laboratório (bancadas em grid).
// Ajuste linhas/colunas conforme o layout real.
export const LAB_LAYOUT = {
  rows: 4,
  cols: 5,
  benchPrefix: 'B',
};

// Slots de aula (didático). Você pode trocar por intervalos reais.
export const DEFAULT_TIME_SLOTS = [
  { label: '07:30–09:10', start: '07:30', end: '09:10' },
  { label: '09:20–11:00', start: '09:20', end: '11:00' },
  { label: '13:30–15:10', start: '13:30', end: '15:10' },
  { label: '15:20–17:00', start: '15:20', end: '17:00' },
  { label: '19:00–20:40', start: '19:00', end: '20:40' },
];

