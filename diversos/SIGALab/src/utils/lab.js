import { LAB_LAYOUT } from '../config/config';

export function benchIdFromIndex(index) {
  const n = index + 1;
  return `${LAB_LAYOUT.benchPrefix}${String(n).padStart(2, '0')}`;
}

export function buildBenches() {
  const total = LAB_LAYOUT.rows * LAB_LAYOUT.cols;
  return Array.from({ length: total }, (_, i) => ({
    id: benchIdFromIndex(i),
    index: i,
    row: Math.floor(i / LAB_LAYOUT.cols),
    col: i % LAB_LAYOUT.cols,
  }));
}

