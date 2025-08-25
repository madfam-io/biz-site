export type ServiceTier =
  | 'L1_ESSENTIALS'
  | 'L2_ADVANCED'
  | 'L3_CONSULTING'
  | 'L4_PLATFORMS'
  | 'L5_STRATEGIC';

export interface SelectOption {
  value: string;
  label: string;
}

export const serviceOptions: SelectOption[] = [
  { value: 'L1_ESSENTIALS', label: 'L1 - Essentials (Diseño 3D y Gráficos)' },
  { value: 'L2_ADVANCED', label: 'L2 - Advanced (Diseño Paramétrico)' },
  { value: 'L3_CONSULTING', label: 'L3 - Consulting (Talleres y Consultoría)' },
  { value: 'L4_PLATFORMS', label: 'L4 - Platforms (SPARK y PENNY)' },
  { value: 'L5_STRATEGIC', label: 'L5 - Strategic (vCTO y Estrategia)' },
];

export const industryOptions: string[] = [
  'Tecnología',
  'Manufactura',
  'Finanzas',
  'Salud',
  'Educación',
  'Retail',
  'Construcción',
  'Consultoría',
  'Servicios',
  'Otro',
];

export const companySizeOptions: string[] = [
  '1-10 empleados',
  '11-50 empleados',
  '51-200 empleados',
  '201-1000 empleados',
  '1000+ empleados',
];

export const budgetOptions: string[] = [
  'Menos de $50,000 MXN',
  '$50,000 - $200,000 MXN',
  '$200,000 - $500,000 MXN',
  '$500,000 - $1,000,000 MXN',
  'Más de $1,000,000 MXN',
];

export const timeframeOptions: string[] = [
  'Inmediato (1-4 semanas)',
  'Corto plazo (1-3 meses)',
  'Mediano plazo (3-6 meses)',
  'Largo plazo (6+ meses)',
  'Solo explorando opciones',
];

export const challengeOptions: string[] = [
  'Automatización de procesos',
  'Transformación digital',
  'Optimización de costos',
  'Mejora de eficiencia',
  'Innovación en productos',
  'Capacitación del equipo',
  'Implementación de IA',
  'Escalabilidad',
];
