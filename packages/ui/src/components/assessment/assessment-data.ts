import type { AssessmentQuestion } from './types';

export const defaultAssessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'ai_current',
    question: '¿Cuál es el estado actual de implementación de IA en su organización?',
    options: [
      { value: 'none', text: 'No hemos comenzado', score: 0 },
      { value: 'exploring', text: 'Explorando posibilidades', score: 25 },
      { value: 'piloting', text: 'Proyectos piloto', score: 50 },
      { value: 'implementing', text: 'Implementación activa', score: 75 },
      { value: 'optimizing', text: 'Optimización continua', score: 100 },
    ],
    category: 'technology',
  },
  {
    id: 'data_maturity',
    question: '¿Cómo describiría la madurez de datos de su empresa?',
    options: [
      { value: 'siloed', text: 'Datos en silos', score: 0 },
      { value: 'basic', text: 'Integración básica', score: 25 },
      { value: 'centralized', text: 'Datos centralizados', score: 50 },
      { value: 'governed', text: 'Gobernanza establecida', score: 75 },
      { value: 'strategic', text: 'Activo estratégico', score: 100 },
    ],
    category: 'data',
  },
  {
    id: 'team_skills',
    question: '¿Qué nivel de habilidades de IA tiene su equipo?',
    options: [
      { value: 'none', text: 'Sin experiencia', score: 0 },
      { value: 'basic', text: 'Conocimiento básico', score: 25 },
      { value: 'intermediate', text: 'Competencia media', score: 50 },
      { value: 'advanced', text: 'Equipo especializado', score: 75 },
      { value: 'expert', text: 'Centro de excelencia', score: 100 },
    ],
    category: 'culture',
  },
  {
    id: 'business_alignment',
    question: '¿Cómo está alineada la IA con su estrategia de negocio?',
    options: [
      { value: 'none', text: 'Sin alineación', score: 0 },
      { value: 'adhoc', text: 'Proyectos ad-hoc', score: 25 },
      { value: 'tactical', text: 'Iniciativas tácticas', score: 50 },
      { value: 'strategic', text: 'Parte de la estrategia', score: 75 },
      { value: 'core', text: 'Core del negocio', score: 100 },
    ],
    category: 'strategy',
  },
  {
    id: 'process_automation',
    question: '¿Qué porcentaje de procesos están automatizados?',
    options: [
      { value: 'manual', text: '0-20% (Manual)', score: 0 },
      { value: 'low', text: '20-40% (Bajo)', score: 25 },
      { value: 'medium', text: '40-60% (Medio)', score: 50 },
      { value: 'high', text: '60-80% (Alto)', score: 75 },
      { value: 'full', text: '80-100% (Completo)', score: 100 },
    ],
    category: 'processes',
  },
  {
    id: 'budget_allocation',
    question: '¿Cuál es su presupuesto anual para iniciativas de IA?',
    options: [
      { value: 'none', text: 'Sin presupuesto', score: 0 },
      { value: 'minimal', text: '< $50k USD', score: 25 },
      { value: 'moderate', text: '$50k - $250k USD', score: 50 },
      { value: 'significant', text: '$250k - $1M USD', score: 75 },
      { value: 'strategic', text: '> $1M USD', score: 100 },
    ],
    category: 'strategy',
  },
  {
    id: 'innovation_culture',
    question: '¿Cómo describiría la cultura de innovación?',
    options: [
      { value: 'resistant', text: 'Resistente al cambio', score: 0 },
      { value: 'cautious', text: 'Cautelosa', score: 25 },
      { value: 'open', text: 'Abierta a nuevas ideas', score: 50 },
      { value: 'proactive', text: 'Proactiva', score: 75 },
      { value: 'innovative', text: 'Innovación continua', score: 100 },
    ],
    category: 'culture',
  },
  {
    id: 'tech_infrastructure',
    question: '¿Cuál es el estado de su infraestructura tecnológica?',
    options: [
      { value: 'legacy', text: 'Sistemas legacy', score: 0 },
      { value: 'mixed', text: 'Mixto legacy/moderno', score: 25 },
      { value: 'modern', text: 'Mayormente moderno', score: 50 },
      { value: 'cloud', text: 'Cloud-first', score: 75 },
      { value: 'cutting_edge', text: 'Vanguardia tecnológica', score: 100 },
    ],
    category: 'technology',
  },
  {
    id: 'governance_framework',
    question: '¿Tiene un framework de gobernanza de IA?',
    options: [
      { value: 'none', text: 'No existe', score: 0 },
      { value: 'informal', text: 'Informal', score: 25 },
      { value: 'documented', text: 'Documentado', score: 50 },
      { value: 'implemented', text: 'Implementado', score: 75 },
      { value: 'mature', text: 'Maduro y optimizado', score: 100 },
    ],
    category: 'processes',
  },
  {
    id: 'measurement_roi',
    question: '¿Cómo mide el ROI de sus iniciativas de IA?',
    options: [
      { value: 'none', text: 'No medimos', score: 0 },
      { value: 'basic', text: 'Métricas básicas', score: 25 },
      { value: 'kpis', text: 'KPIs definidos', score: 50 },
      { value: 'comprehensive', text: 'Framework completo', score: 75 },
      { value: 'optimized', text: 'Optimización continua', score: 100 },
    ],
    category: 'data',
  },
];
