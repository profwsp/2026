export function toISODate(date) {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function makeSlotKey(date, startHHmm) {
  // Ex: 2026-04-14_19-00
  return `${toISODate(date)}_${startHHmm.replace(':', '-')}`;
}

