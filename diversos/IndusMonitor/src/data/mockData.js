// Mock data for testing
import { MACHINE_STATUS } from '../constants/constants';

export const mockMachines = [
  {
    id: 'MQ-001',
    name: 'Torno CNC',
    status: MACHINE_STATUS.OPERATING,
    temperature: 65,
    vibration: 2.3,
  },
  {
    id: 'MQ-002',
    name: 'Fresadora',
    status: MACHINE_STATUS.ALERT,
    temperature: 85,
    vibration: 5.8,
  },
  {
    id: 'MQ-003',
    name: 'Prensa Hidráulica',
    status: MACHINE_STATUS.STOPPED,
    temperature: 45,
    vibration: 0.1,
  },
  {
    id: 'MQ-004',
    name: 'Impressora 3D',
    status: MACHINE_STATUS.OPERATING,
    temperature: 72,
    vibration: 1.2,
  },
  {
    id: 'MQ-005',
    name: 'Compressor de Ar',
    status: MACHINE_STATUS.ALERT,
    temperature: 78,
    vibration: 4.5,
  },
  {
    id: 'MQ-006',
    name: 'Soldador Industrial',
    status: MACHINE_STATUS.OPERATING,
    temperature: 58,
    vibration: 3.1,
  },
  {
    id: 'MQ-007',
    name: 'Cortadora Laser',
    status: MACHINE_STATUS.STOPPED,
    temperature: 42,
    vibration: 0.0,
  },
];

export const mockQRCodes = [
  {
    id: 'MQ-001',
    data: 'MQ-001|Torno CNC|Setor A',
    type: 'org.iso.QRCode',
  },
  {
    id: 'MQ-002',
    data: 'MQ-002|Fresadora|Setor B',
    type: 'org.iso.QRCode',
  },
  {
    id: 'MQ-003',
    data: 'MQ-003|Prensa Hidráulica|Setor C',
    type: 'org.iso.QRCode',
  },
];
