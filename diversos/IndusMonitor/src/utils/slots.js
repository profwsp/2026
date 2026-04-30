export function pad2(n) {
  return String(n).padStart(2, '0');
}

// Slot didático: uma reserva por bancada por data+hora (sem sobreposição).
// Exemplo: 2026-04-14_19-00
export function toSlotKey(dateObj) {
  const y = dateObj.getFullYear();
  const m = pad2(dateObj.getMonth() + 1);
  const d = pad2(dateObj.getDate());
  const hh = pad2(dateObj.getHours());
  const mm = pad2(dateObj.getMinutes());
  return `${y}-${m}-${d}_${hh}-${mm}`;
}

// Parse simples de "YYYY-MM-DD" e "HH:MM" (para inputs didáticos).
export function parseDateAndTime(dateStr, timeStr) {
  // dateStr: 2026-04-14
  // timeStr: 19:00
  const [y, m, d] = (dateStr || '').split('-').map((x) => parseInt(x, 10));
  const [hh, mm] = (timeStr || '').split(':').map((x) => parseInt(x, 10));

  if (!y || !m || !d || Number.isNaN(hh) || Number.isNaN(mm)) return null;

  const dt = new Date(y, m - 1, d, hh, mm, 0, 0);
  if (Number.isNaN(dt.getTime())) return null;
  return dt;
}

export function buildReservationId(benchId, slotKey) {
  return `${benchId}_${slotKey}`;
}

