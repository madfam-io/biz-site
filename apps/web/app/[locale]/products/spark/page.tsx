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
        locale === 'en'
          ? 'Universal Integrations'
          : locale === 'pt-br'
            ? 'Integrações Universais'
            : 'Integraciones Universales',
      description:
        locale === 'en'
          ? 'Connect with over 1000 tools and platforms through our robust API ecosystem'
          : locale === 'pt-br'
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
        locale === 'en'
          ? 'Visual Workflow Builder'
          : locale === 'pt-br'
            ? 'Construtor de Fluxo Visual'
            : 'Constructor de Flujo Visual',
      description:
        locale === 'en'
          ? 'Create complex automations with our intuitive drag-and-drop interface'
          : locale === 'pt-br'
            ? 'Crie automações complexas com nossa interface intuitiva de arrastar e soltar'
            : 'Crea automatizaciones complejas con nuestra interfaz intuitiva de arrastrar y soltar',
      benefits: [
        locale === 'en'
          ? 'No-code automation'
          : locale === 'pt-br'
            ? 'Automação sem código'
            : 'Automatización sin código',
        locale === 'en'
          ? 'Real-time testing'
          : locale === 'pt-br'
            ? 'Teste em tempo real'
            : 'Pruebas en tiempo real',
        locale === 'en'
          ? 'Version control'
          : locale === 'pt-br'
            ? 'Controle de versão'
            : 'Control de versiones',
        locale === 'en'
          ? 'Collaborative editing'
          : locale === 'pt-br'
            ? 'Edição colaborativa'
            : 'Edición colaborativa',
      ],
    },
    {
      icon: '🤖',
      title:
        locale === 'en'
          ? 'AI-Powered Intelligence'
          : locale === 'pt-br'
            ? 'Inteligência Alimentada por IA'
            : 'Inteligencia Alimentada por IA',
      description:
        locale === 'en'
          ? 'Leverage advanced AI to make your workflows smarter and more efficient'
          : locale === 'pt-br'
            ? 'Aproveite a IA avançada para tornar seus fluxos de trabalho mais inteligentes e eficientes'
            : 'Aprovecha la IA avanzada para hacer tus flujos de trabajo más inteligentes y eficientes',
      benefits: [
        locale === 'en'
          ? 'Natural language processing'
          : locale === 'pt-br'
            ? 'Processamento de linguagem natural'
            : 'Procesamiento de lenguaje natural',
        locale === 'en'
          ? 'Predictive analytics'
          : locale === 'pt-br'
            ? 'Análise preditiva'
            : 'Análisis predictivo',
        locale === 'en'
          ? 'Intelligent routing'
          : locale === 'pt-br'
            ? 'Roteamento inteligente'
            : 'Enrutamiento inteligente',
        locale === 'en'
          ? 'Anomaly detection'
          : locale === 'pt-br'
            ? 'Detecção de anomalias'
            : 'Detección de anomalías',
      ],
    },
    {
      icon: '📊',
      title:
        locale === 'en'
          ? 'Real-time Analytics'
          : locale === 'pt-br'
            ? 'Análise em Tempo Real'
            : 'Análisis en Tiempo Real',
      description:
        locale === 'en'
          ? 'Monitor performance, identify bottlenecks, and optimize your processes'
          : locale === 'pt-br'
            ? 'Monitore o desempenho, identifique gargalos e otimize seus processos'
            : 'Monitorea el rendimiento, identifica cuellos de botella y optimiza tus procesos',
      benefits: [
        locale === 'en'
          ? 'Live dashboard'
          : locale === 'pt-br'
            ? 'Painel ao vivo'
            : 'Panel en vivo',
        locale === 'en'
          ? 'Custom metrics'
          : locale === 'pt-br'
            ? 'Métricas personalizadas'
            : 'Métricas personalizadas',
        locale === 'en'
          ? 'Automated alerts'
          : locale === 'pt-br'
            ? 'Alertas automatizados'
            : 'Alertas automatizadas',
        locale === 'en'
          ? 'Performance insights'
          : locale === 'pt-br'
            ? 'Insights de performance'
            : 'Insights de rendimiento',
      ],
    },
  ];

  const useCases = [
    {
      title:
        locale === 'en'
          ? 'Customer Onboarding'
          : locale === 'pt-br'
            ? 'Onboarding de Clientes'
            : 'Onboarding de Clientes',
      description:
        locale === 'en'
          ? 'Automate welcome sequences, document collection, and account setup'
          : locale === 'pt-br'
            ? 'Automatize sequências de boas-vindas, coleta de documentos e configuração de conta'
            : 'Automatiza secuencias de bienvenida, recolección de documentos y configuración de cuenta',
      metrics: {
        reduction: '75%',
        time: locale === 'en' ? '2 hours' : locale === 'pt-br' ? '2 horas' : '2 horas',
        satisfaction: '94%',
      },
      icon: '👥',
    },
    {
      title:
        locale === 'en'
          ? 'Sales Pipeline'
          : locale === 'pt-br'
            ? 'Pipeline de Vendas'
            : 'Pipeline de Ventas',
      description:
        locale === 'en'
          ? 'Streamline lead qualification, follow-ups, and deal progression'
          : locale === 'pt-br'
            ? 'Otimize qualificação de leads, acompanhamentos e progressão de negócios'
            : 'Optimiza la calificación de leads, seguimientos y progresión de negocios',
      metrics: {
        reduction: '60%',
        time: locale === 'en' ? '30 minutes' : locale === 'pt-br' ? '30 minutos' : '30 minutos',
        satisfaction: '89%',
      },
      icon: '💰',
    },
    {
      title:
        locale === 'en'
          ? 'HR & Recruitment'
          : locale === 'pt-br'
            ? 'RH e Recrutamento'
            : 'RH y Reclutamiento',
      description:
        locale === 'en'
          ? 'Automate candidate screening, interview scheduling, and onboarding'
          : locale === 'pt-br'
            ? 'Automatize triagem de candidatos, agendamento de entrevistas e onboarding'
            : 'Automatiza la selección de candidatos, programación de entrevistas y onboarding',
      metrics: {
        reduction: '80%',
        time: locale === 'en' ? '4 hours' : locale === 'pt-br' ? '4 horas' : '4 horas',
        satisfaction: '92%',
      },
      icon: '🎯',
    },
  ];

  const testimonials = [
    {
      id: 'tech-corp',
      content:
        locale === 'en'
          ? 'SPARK transformed our entire operation. We automated 15 critical processes and reduced manual work by 70%. The ROI was immediate and substantial.'
          : locale === 'pt-br'
            ? 'SPARK transformou toda nossa operação. Automatizamos 15 processos críticos e reduzimos o trabalho manual em 70%. O ROI foi imediato e substancial.'
            : 'SPARK transformó toda nuestra operación. Automatizamos 15 procesos críticos y redujimos el trabajo manual en 70%. El ROI fue inmediato y sustancial.',
      author: {
        name: 'Ana María Santos',
        title:
          locale === 'en'
            ? 'Operations Director'
            : locale === 'pt-br'
              ? 'Diretora de Operações'
              : 'Directora de Operaciones',
        role:
          locale === 'en'
            ? 'Operations Director'
            : locale === 'pt-br'
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
            locale === 'en'
              ? 'Process automation'
              : locale === 'pt-br'
                ? 'Automação de processos'
                : 'Automatización de procesos',
          value: '15',
          description:
            locale === 'en'
              ? 'Critical workflows'
              : locale === 'pt-br'
                ? 'Fluxos críticos'
                : 'Flujos críticos',
        },
        {
          metric:
            locale === 'en'
              ? 'Time savings'
              : locale === 'pt-br'
                ? 'Economia de tempo'
                : 'Ahorro de tiempo',
          value: '70%',
          description:
            locale === 'en'
              ? 'Manual work reduction'
              : locale === 'pt-br'
                ? 'Redução de trabalho manual'
                : 'Reducción de trabajo manual',
        },
      ],
      featured: true,
      verified: true,
    },
    {
      id: 'innovate-group',
      content:
        locale === 'en'
          ? 'The integration capabilities of SPARK are outstanding. We connected our entire tech stack in weeks, not months. Our team productivity increased by 40%.'
          : locale === 'pt-br'
            ? 'As capacidades de integração do SPARK são excepcionais. Conectamos toda nossa stack tecnológica em semanas, não meses. A produtividade da equipe aumentou 40%.'
            : 'Las capacidades de integración de SPARK son excepcionales. Conectamos toda nuestra stack tecnológica en semanas, no meses. La productividad del equipo aumentó 40%.',
      author: {
        name: 'Carlos Mendoza',
        title: 'CTO',
        role: 'CTO',
        company: 'Innovate Group',
        image: '/testimonials/carlos-mendoza.jpg',
      },
      rating: 5,
      service: 'SPARK',
      results: [
        {
          metric:
            locale === 'en'
              ? 'Integration speed'
              : locale === 'pt-br'
                ? 'Velocidade de integração'
                : 'Velocidad de integración',
          value: '5x',
          description:
            locale === 'en'
              ? 'Faster than manual'
              : locale === 'pt-br'
                ? 'Mais rápido que manual'
                : 'Más rápido que manual',
        },
        {
          metric:
            locale === 'en'
              ? 'Productivity gain'
              : locale === 'pt-br'
                ? 'Ganho de produtividade'
                : 'Ganancia de productividad',
          value: '40%',
          description:
            locale === 'en'
              ? 'Team efficiency'
              : locale === 'pt-br'
                ? 'Eficiência da equipe'
                : 'Eficiencia del equipo',
        },
      ],
      featured: true,
      verified: true,
    },
  ];

  const pricingPlans = [
    {
      name: locale === 'en' ? 'Professional' : locale === 'pt-br' ? 'Profissional' : 'Profesional',
      price: '50,000',
      currency: 'MXN',
      period: locale === 'en' ? 'month' : locale === 'pt-br' ? 'mês' : 'mes',
      description:
        locale === 'en'
          ? 'Perfect for growing businesses'
          : locale === 'pt-br'
            ? 'Perfeito para negócios em crescimento'
            : 'Perfecto para negocios en crecimiento',
      features: [
        locale === 'en'
          ? 'Up to 500 integrations'
          : locale === 'pt-br'
            ? 'Até 500 integrações'
            : 'Hasta 500 integraciones',
        locale === 'en'
          ? 'Visual workflow builder'
          : locale === 'pt-br'
            ? 'Construtor de fluxo visual'
            : 'Constructor de flujo visual',
        locale === 'en'
          ? 'Real-time analytics'
          : locale === 'pt-br'
            ? 'Análise em tempo real'
            : 'Análisis en tiempo real',
        locale === 'en'
          ? 'Priority support'
          : locale === 'pt-br'
            ? 'Suporte prioritário'
            : 'Soporte prioritario',
        locale === 'en'
          ? 'Custom workflows'
          : locale === 'pt-br'
            ? 'Fluxos personalizados'
            : 'Flujos personalizados',
      ],
      cta:
        locale === 'en'
          ? 'Start Professional'
          : locale === 'pt-br'
            ? 'Começar Profissional'
            : 'Iniciar Profesional',
      popular: true,
    },
    {
      name: locale === 'en' ? 'Enterprise' : locale === 'pt-br' ? 'Empresarial' : 'Empresarial',
      price: locale === 'en' ? 'Custom' : locale === 'pt-br' ? 'Personalizado' : 'Personalizado',
      currency: '',
      period: '',
      description:
        locale === 'en'
          ? 'For large organizations'
          : locale === 'pt-br'
            ? 'Para grandes organizações'
            : 'Para grandes organizaciones',
      features: [
        locale === 'en'
          ? 'Unlimited integrations'
          : locale === 'pt-br'
            ? 'Integrações ilimitadas'
            : 'Integraciones ilimitadas',
        locale === 'en'
          ? 'Advanced AI features'
          : locale === 'pt-br'
            ? 'Recursos avançados de IA'
            : 'Características avanzadas de IA',
        locale === 'en'
          ? 'Dedicated success manager'
          : locale === 'pt-br'
            ? 'Gerente de sucesso dedicado'
            : 'Gerente de éxito dedicado',
        locale === 'en' ? 'SLA guarantee' : locale === 'pt-br' ? 'Garantia SLA' : 'Garantía SLA',
        locale === 'en'
          ? 'Custom integrations'
          : locale === 'pt-br'
            ? 'Integrações personalizadas'
            : 'Integraciones personalizadas',
        locale === 'en'
          ? 'White-label options'
          : locale === 'pt-br'
            ? 'Opções white-label'
            : 'Opciones white-label',
      ],
      cta:
        locale === 'en'
          ? 'Contact Sales'
          : locale === 'pt-br'
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
