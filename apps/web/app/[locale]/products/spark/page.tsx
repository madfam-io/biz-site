import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { SparkProductClient } from '@/components/SparkProductClient';

interface SparkProductPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({
  params: { locale },
}: SparkProductPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'products.spark' });

  return {
    title: `SPARK - ${t('title')}`,
    description: t('description'),
  };
}

export default async function SparkProductPage({ params: { locale } }: SparkProductPageProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('products.spark');
  const tCommon = await getTranslations('common');

  const translations = {
    heroTitle: 'SPARK',
    heroSubtitle: t('tagline'),
    heroDescription: t('description'),
    requestDemo: t('cta.demo'),
    viewDocumentation: tCommon('products.documentation'),
    integrations: 'Integrations',
    timeSaved: 'Time saved',
    support: 'Support',
    featuresTitle: 'Powerful features for modern businesses',
    featuresSubtitle:
      'SPARK provides enterprise-grade capabilities with an intuitive interface, making automation accessible to everyone in your organization.',
    useCasesTitle: 'Real-world use cases',
    useCasesSubtitle:
      'See how companies like yours are using SPARK to transform their operations and achieve remarkable results.',
    testimonialsTitle: 'What our customers say',
    testimonialsSubtitle:
      'Join hundreds of companies that have transformed their operations with SPARK.',
    pricingTitle: 'Choose the right plan',
    pricingSubtitle:
      'Start with our Professional plan or get a custom Enterprise solution for your organization.',
    roiTitle: 'Calculate your SPARK ROI',
    roiSubtitle:
      'See the potential impact SPARK can have on your business operations and bottom line.',
    roiCalculatorTitle: 'SPARK ROI Calculator',
    demoTitle: 'Request a personalized demo',
    demoSubtitle:
      'See SPARK in action with a tailored demonstration based on your specific use cases and industry.',
    demoFormTitle: 'Request SPARK demo',
    demoFormDescription:
      "Tell us about your business needs and we'll customize the demo to show you exactly how SPARK can help.",
    scheduleDemo: 'Schedule demo',
    newsletterTitle: 'Stay updated with SPARK',
    newsletterDescription:
      'Get the latest product updates, automation tips, and industry insights.',
    subscribe: 'Subscribe',
    mostPopular: 'Most Popular',
    reduction: 'Reduction',
    toComplete: 'To complete',
    satisfaction: 'Satisfaction',
  };

  // Features data with translations
  const sparkFeatures = [
    {
      icon: '🔗',
      title:
        locale === 'en-US'
          ? 'Universal Integrations'
          : locale === 'pt-BR'
            ? 'Integrações Universais'
            : 'Integraciones Universales',
      description:
        locale === 'en-US'
          ? 'Connect with over 1000 tools and platforms through our robust API ecosystem'
          : locale === 'pt-BR'
            ? 'Conecte-se com mais de 1000 ferramentas e plataformas através do nosso ecossistema robusto de APIs'
            : 'Conecta con más de 1000 herramientas y plataformas a través de nuestro robusto ecosistema de APIs',
      benefits: [
        'Slack',
        'Salesforce',
        'HubSpot',
        'Microsoft 365',
        'Google Workspace',
        'Zapier',
        'Webhooks',
        'Custom APIs',
      ],
    },
    {
      icon: '⚡',
      title:
        locale === 'en-US'
          ? 'Visual Workflow Builder'
          : locale === 'pt-BR'
            ? 'Construtor de Fluxo Visual'
            : 'Constructor de Flujo Visual',
      description:
        locale === 'en-US'
          ? 'Create complex automations with our intuitive drag-and-drop interface'
          : locale === 'pt-BR'
            ? 'Crie automações complexas com nossa interface intuitiva de arrastar e soltar'
            : 'Crea automatizaciones complejas con nuestra interfaz intuitiva de arrastrar y soltar',
      benefits: [
        locale === 'en-US'
          ? 'No-code automation'
          : locale === 'pt-BR'
            ? 'Automação sem código'
            : 'Automatización sin código',
        locale === 'en-US'
          ? 'Real-time testing'
          : locale === 'pt-BR'
            ? 'Teste em tempo real'
            : 'Pruebas en tiempo real',
        locale === 'en-US'
          ? 'Version control'
          : locale === 'pt-BR'
            ? 'Controle de versão'
            : 'Control de versiones',
        locale === 'en-US'
          ? 'Collaborative editing'
          : locale === 'pt-BR'
            ? 'Edição colaborativa'
            : 'Edición colaborativa',
      ],
    },
    {
      icon: '🤖',
      title:
        locale === 'en-US'
          ? 'AI-Powered Intelligence'
          : locale === 'pt-BR'
            ? 'Inteligência Alimentada por IA'
            : 'Inteligencia Alimentada por IA',
      description:
        locale === 'en-US'
          ? 'Leverage advanced AI to make your workflows smarter and more efficient'
          : locale === 'pt-BR'
            ? 'Aproveite a IA avançada para tornar seus fluxos de trabalho mais inteligentes e eficientes'
            : 'Aprovecha la IA avanzada para hacer tus flujos de trabajo más inteligentes y eficientes',
      benefits: [
        locale === 'en-US'
          ? 'Natural language processing'
          : locale === 'pt-BR'
            ? 'Processamento de linguagem natural'
            : 'Procesamiento de lenguaje natural',
        locale === 'en-US'
          ? 'Predictive analytics'
          : locale === 'pt-BR'
            ? 'Análise preditiva'
            : 'Análisis predictivo',
        locale === 'en-US'
          ? 'Intelligent routing'
          : locale === 'pt-BR'
            ? 'Roteamento inteligente'
            : 'Enrutamiento inteligente',
        locale === 'en-US'
          ? 'Anomaly detection'
          : locale === 'pt-BR'
            ? 'Detecção de anomalias'
            : 'Detección de anomalías',
      ],
    },
    {
      icon: '📊',
      title:
        locale === 'en-US'
          ? 'Real-time Analytics'
          : locale === 'pt-BR'
            ? 'Análise em Tempo Real'
            : 'Análisis en Tiempo Real',
      description:
        locale === 'en-US'
          ? 'Monitor performance, identify bottlenecks, and optimize your processes'
          : locale === 'pt-BR'
            ? 'Monitore o desempenho, identifique gargalos e otimize seus processos'
            : 'Monitorea el rendimiento, identifica cuellos de botella y optimiza tus procesos',
      benefits: [
        locale === 'en-US'
          ? 'Live dashboard'
          : locale === 'pt-BR'
            ? 'Painel ao vivo'
            : 'Panel en vivo',
        locale === 'en-US'
          ? 'Custom metrics'
          : locale === 'pt-BR'
            ? 'Métricas personalizadas'
            : 'Métricas personalizadas',
        locale === 'en-US'
          ? 'Automated alerts'
          : locale === 'pt-BR'
            ? 'Alertas automatizados'
            : 'Alertas automatizadas',
        locale === 'en-US'
          ? 'Performance insights'
          : locale === 'pt-BR'
            ? 'Insights de performance'
            : 'Insights de rendimiento',
      ],
    },
  ];

  const useCases = [
    {
      title:
        locale === 'en-US'
          ? 'Customer Onboarding'
          : locale === 'pt-BR'
            ? 'Onboarding de Clientes'
            : 'Onboarding de Clientes',
      description:
        locale === 'en-US'
          ? 'Automate welcome sequences, document collection, and account setup'
          : locale === 'pt-BR'
            ? 'Automatize sequências de boas-vindas, coleta de documentos e configuração de conta'
            : 'Automatiza secuencias de bienvenida, recolección de documentos y configuración de cuenta',
      metrics: {
        reduction: '75%',
        time: locale === 'en-US' ? '2 hours' : locale === 'pt-BR' ? '2 horas' : '2 horas',
        satisfaction: '94%',
      },
      icon: '👥',
    },
    {
      title:
        locale === 'en-US'
          ? 'Sales Pipeline'
          : locale === 'pt-BR'
            ? 'Pipeline de Vendas'
            : 'Pipeline de Ventas',
      description:
        locale === 'en-US'
          ? 'Streamline lead qualification, follow-ups, and deal progression'
          : locale === 'pt-BR'
            ? 'Otimize qualificação de leads, acompanhamentos e progressão de negócios'
            : 'Optimiza la calificación de leads, seguimientos y progresión de negocios',
      metrics: {
        reduction: '60%',
        time: locale === 'en-US' ? '30 minutes' : locale === 'pt-BR' ? '30 minutos' : '30 minutos',
        satisfaction: '89%',
      },
      icon: '💰',
    },
    {
      title:
        locale === 'en-US'
          ? 'HR & Recruitment'
          : locale === 'pt-BR'
            ? 'RH e Recrutamento'
            : 'RH y Reclutamiento',
      description:
        locale === 'en-US'
          ? 'Automate candidate screening, interview scheduling, and onboarding'
          : locale === 'pt-BR'
            ? 'Automatize triagem de candidatos, agendamento de entrevistas e onboarding'
            : 'Automatiza la selección de candidatos, programación de entrevistas y onboarding',
      metrics: {
        reduction: '80%',
        time: locale === 'en-US' ? '4 hours' : locale === 'pt-BR' ? '4 horas' : '4 horas',
        satisfaction: '92%',
      },
      icon: '🎯',
    },
  ];

  const testimonials = [
    {
      id: 'tech-corp',
      content:
        locale === 'en-US'
          ? 'SPARK transformed our entire operation. We automated 15 critical processes and reduced manual work by 70%. The ROI was immediate and substantial.'
          : locale === 'pt-BR'
            ? 'SPARK transformou toda nossa operação. Automatizamos 15 processos críticos e reduzimos o trabalho manual em 70%. O ROI foi imediato e substancial.'
            : 'SPARK transformó toda nuestra operación. Automatizamos 15 procesos críticos y redujimos el trabajo manual en 70%. El ROI fue inmediato y sustancial.',
      author: {
        name: 'Ana María Santos',
        role:
          locale === 'en-US'
            ? 'Operations Director'
            : locale === 'pt-BR'
              ? 'Diretora de Operações'
              : 'Directora de Operaciones',
        company: 'TechCorp Solutions',
        image: '/testimonials/ana-santos.jpg',
      },
      rating: 5,
      service: 'SPARK',
      results: [
        {
          metric:
            locale === 'en-US'
              ? 'Process automation'
              : locale === 'pt-BR'
                ? 'Automação de processos'
                : 'Automatización de procesos',
          value: '15',
          description:
            locale === 'en-US'
              ? 'Critical workflows'
              : locale === 'pt-BR'
                ? 'Fluxos críticos'
                : 'Flujos críticos',
        },
        {
          metric:
            locale === 'en-US'
              ? 'Time savings'
              : locale === 'pt-BR'
                ? 'Economia de tempo'
                : 'Ahorro de tiempo',
          value: '70%',
          description:
            locale === 'en-US'
              ? 'Manual work reduction'
              : locale === 'pt-BR'
                ? 'Redução de trabalho manual'
                : 'Reducción de trabajo manual',
        },
      ],
    },
    {
      id: 'innovate-group',
      content:
        locale === 'en-US'
          ? 'The integration capabilities of SPARK are outstanding. We connected our entire tech stack in weeks, not months. Our team productivity increased by 40%.'
          : locale === 'pt-BR'
            ? 'As capacidades de integração do SPARK são excepcionais. Conectamos toda nossa stack tecnológica em semanas, não meses. A produtividade da equipe aumentou 40%.'
            : 'Las capacidades de integración de SPARK son excepcionales. Conectamos toda nuestra stack tecnológica en semanas, no meses. La productividad del equipo aumentó 40%.',
      author: {
        name: 'Carlos Mendoza',
        role: 'CTO',
        company: 'Innovate Group',
        image: '/testimonials/carlos-mendoza.jpg',
      },
      rating: 5,
      service: 'SPARK',
      results: [
        {
          metric:
            locale === 'en-US'
              ? 'Integration speed'
              : locale === 'pt-BR'
                ? 'Velocidade de integração'
                : 'Velocidad de integración',
          value: '5x',
          description:
            locale === 'en-US'
              ? 'Faster than manual'
              : locale === 'pt-BR'
                ? 'Mais rápido que manual'
                : 'Más rápido que manual',
        },
        {
          metric:
            locale === 'en-US'
              ? 'Productivity gain'
              : locale === 'pt-BR'
                ? 'Ganho de produtividade'
                : 'Ganancia de productividad',
          value: '40%',
          description:
            locale === 'en-US'
              ? 'Team efficiency'
              : locale === 'pt-BR'
                ? 'Eficiência da equipe'
                : 'Eficiencia del equipo',
        },
      ],
    },
  ];

  const pricingPlans = [
    {
      name:
        locale === 'en-US' ? 'Professional' : locale === 'pt-BR' ? 'Profissional' : 'Profesional',
      price: '50,000',
      currency: 'MXN',
      period: locale === 'en-US' ? 'month' : locale === 'pt-BR' ? 'mês' : 'mes',
      description:
        locale === 'en-US'
          ? 'Perfect for growing businesses'
          : locale === 'pt-BR'
            ? 'Perfeito para negócios em crescimento'
            : 'Perfecto para negocios en crecimiento',
      features: [
        locale === 'en-US'
          ? 'Up to 500 integrations'
          : locale === 'pt-BR'
            ? 'Até 500 integrações'
            : 'Hasta 500 integraciones',
        locale === 'en-US'
          ? 'Visual workflow builder'
          : locale === 'pt-BR'
            ? 'Construtor de fluxo visual'
            : 'Constructor de flujo visual',
        locale === 'en-US'
          ? 'Real-time analytics'
          : locale === 'pt-BR'
            ? 'Análise em tempo real'
            : 'Análisis en tiempo real',
        locale === 'en-US'
          ? 'Priority support'
          : locale === 'pt-BR'
            ? 'Suporte prioritário'
            : 'Soporte prioritario',
        locale === 'en-US'
          ? 'Custom workflows'
          : locale === 'pt-BR'
            ? 'Fluxos personalizados'
            : 'Flujos personalizados',
      ],
      cta:
        locale === 'en-US'
          ? 'Start Professional'
          : locale === 'pt-BR'
            ? 'Começar Profissional'
            : 'Iniciar Profesional',
      popular: true,
    },
    {
      name: locale === 'en-US' ? 'Enterprise' : locale === 'pt-BR' ? 'Empresarial' : 'Empresarial',
      price: locale === 'en-US' ? 'Custom' : locale === 'pt-BR' ? 'Personalizado' : 'Personalizado',
      currency: '',
      period: '',
      description:
        locale === 'en-US'
          ? 'For large organizations'
          : locale === 'pt-BR'
            ? 'Para grandes organizações'
            : 'Para grandes organizaciones',
      features: [
        locale === 'en-US'
          ? 'Unlimited integrations'
          : locale === 'pt-BR'
            ? 'Integrações ilimitadas'
            : 'Integraciones ilimitadas',
        locale === 'en-US'
          ? 'Advanced AI features'
          : locale === 'pt-BR'
            ? 'Recursos avançados de IA'
            : 'Características avanzadas de IA',
        locale === 'en-US'
          ? 'Dedicated success manager'
          : locale === 'pt-BR'
            ? 'Gerente de sucesso dedicado'
            : 'Gerente de éxito dedicado',
        locale === 'en-US' ? 'SLA guarantee' : locale === 'pt-BR' ? 'Garantia SLA' : 'Garantía SLA',
        locale === 'en-US'
          ? 'Custom integrations'
          : locale === 'pt-BR'
            ? 'Integrações personalizadas'
            : 'Integraciones personalizadas',
        locale === 'en-US'
          ? 'White-label options'
          : locale === 'pt-BR'
            ? 'Opções white-label'
            : 'Opciones white-label',
      ],
      cta:
        locale === 'en-US'
          ? 'Contact Sales'
          : locale === 'pt-BR'
            ? 'Contatar Vendas'
            : 'Contactar Ventas',
      popular: false,
    },
  ];

  return (
    <SparkProductClient
      locale={locale}
      translations={translations}
      features={sparkFeatures}
      useCases={useCases}
      testimonials={testimonials}
      pricingPlans={pricingPlans}
    />
  );
}
