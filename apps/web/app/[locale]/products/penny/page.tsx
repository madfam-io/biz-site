import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { PennyProductClient } from '@/components/PennyProductClient';

interface PennyProductPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({
  params: { locale },
}: PennyProductPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'products.penny' });

  return {
    title: `PENNY - ${t('title')}`,
    description: t('description'),
  };
}

export default async function PennyProductPage({ params: { locale } }: PennyProductPageProps) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('products.penny');
  const tCommon = await getTranslations('common');

  const translations = {
    heroTitle: 'PENNY',
    heroSubtitle: t('tagline'),
    heroDescription: t('description'),
    requestDemo: t('cta.demo'),
    viewDocumentation: tCommon('products.documentation'),
    activeUsers: 'Active users',
    tasksAutomated: 'Tasks automated',
    accuracy: 'Accuracy',
    featuresTitle: 'Intelligent features that evolve with your business',
    featuresSubtitle:
      'PENNY adapts to your unique processes, learning and improving with every interaction.',
    useCasesTitle: 'Transform your operations',
    useCasesSubtitle:
      'See how PENNY revolutionizes different business processes with intelligent automation.',
    testimonialsTitle: 'Success stories with PENNY',
    testimonialsSubtitle:
      'Learn how businesses have transformed their operations with our intelligent assistant.',
    pricingTitle: 'Simple, transparent pricing',
    pricingSubtitle: 'Choose the plan that fits your business needs and scale as you grow.',
    roiTitle: 'Calculate your PENNY ROI',
    roiSubtitle: 'Discover how much time and money PENNY can save your organization.',
    roiCalculatorTitle: 'PENNY ROI Calculator',
    demoTitle: 'Experience PENNY in action',
    demoSubtitle:
      'See how PENNY can transform your specific business processes with a personalized demonstration.',
    demoFormTitle: 'Request PENNY demo',
    demoFormDescription:
      "Share your automation challenges and we'll show you exactly how PENNY can solve them.",
    scheduleDemo: 'Schedule demo',
    newsletterTitle: 'Stay updated with PENNY',
    newsletterDescription:
      'Get the latest updates on intelligent automation and process optimization.',
    subscribe: 'Subscribe',
    mostPopular: 'Most Popular',
    reduction: 'Reduction',
    toComplete: 'To complete',
    accuracyLabel: 'Accuracy',
  };

  // Features data with translations
  const pennyFeatures = [
    {
      icon: '🧠',
      title:
        locale === 'en-US'
          ? 'Continuous Learning'
          : locale === 'pt-BR'
            ? 'Aprendizado Contínuo'
            : 'Aprendizaje Continuo',
      description:
        locale === 'en-US'
          ? 'PENNY learns from your processes and improves automation over time'
          : locale === 'pt-BR'
            ? 'PENNY aprende com seus processos e melhora a automação ao longo do tempo'
            : 'PENNY aprende de tus procesos y mejora la automatización con el tiempo',
      benefits: [
        locale === 'en-US'
          ? 'Machine learning algorithms'
          : locale === 'pt-BR'
            ? 'Algoritmos de aprendizado de máquina'
            : 'Algoritmos de aprendizaje automático',
        locale === 'en-US'
          ? 'Pattern recognition'
          : locale === 'pt-BR'
            ? 'Reconhecimento de padrões'
            : 'Reconocimiento de patrones',
        locale === 'en-US'
          ? 'Process optimization'
          : locale === 'pt-BR'
            ? 'Otimização de processos'
            : 'Optimización de procesos',
        locale === 'en-US'
          ? 'Predictive suggestions'
          : locale === 'pt-BR'
            ? 'Sugestões preditivas'
            : 'Sugerencias predictivas',
      ],
    },
    {
      icon: '📄',
      title:
        locale === 'en-US'
          ? 'Document Intelligence'
          : locale === 'pt-BR'
            ? 'Inteligência de Documentos'
            : 'Inteligencia de Documentos',
      description:
        locale === 'en-US'
          ? 'Extract, process, and organize information from any document type'
          : locale === 'pt-BR'
            ? 'Extraia, processe e organize informações de qualquer tipo de documento'
            : 'Extrae, procesa y organiza información de cualquier tipo de documento',
      benefits: [
        locale === 'en-US'
          ? 'OCR and text extraction'
          : locale === 'pt-BR'
            ? 'OCR e extração de texto'
            : 'OCR y extracción de texto',
        locale === 'en-US'
          ? 'Data classification'
          : locale === 'pt-BR'
            ? 'Classificação de dados'
            : 'Clasificación de datos',
        locale === 'en-US'
          ? 'Automated filing'
          : locale === 'pt-BR'
            ? 'Arquivamento automatizado'
            : 'Archivado automatizado',
        locale === 'en-US'
          ? 'Content validation'
          : locale === 'pt-BR'
            ? 'Validação de conteúdo'
            : 'Validación de contenido',
      ],
    },
    {
      icon: '💬',
      title:
        locale === 'en-US'
          ? 'Natural Language Interface'
          : locale === 'pt-BR'
            ? 'Interface de Linguagem Natural'
            : 'Interfaz de Lenguaje Natural',
      description:
        locale === 'en-US'
          ? 'Communicate with PENNY naturally, as you would with a human assistant'
          : locale === 'pt-BR'
            ? 'Comunique-se com PENNY naturalmente, como faria com um assistente humano'
            : 'Comunícate con PENNY naturalmente, como lo harías con un asistente humano',
      benefits: [
        locale === 'en-US'
          ? 'Voice commands'
          : locale === 'pt-BR'
            ? 'Comandos de voz'
            : 'Comandos de voz',
        locale === 'en-US'
          ? 'Multi-language support'
          : locale === 'pt-BR'
            ? 'Suporte multi-idioma'
            : 'Soporte multiidioma',
        locale === 'en-US'
          ? 'Context awareness'
          : locale === 'pt-BR'
            ? 'Consciência de contexto'
            : 'Conciencia de contexto',
        locale === 'en-US'
          ? 'Smart responses'
          : locale === 'pt-BR'
            ? 'Respostas inteligentes'
            : 'Respuestas inteligentes',
      ],
    },
    {
      icon: '🔐',
      title:
        locale === 'en-US'
          ? 'Enterprise Security'
          : locale === 'pt-BR'
            ? 'Segurança Empresarial'
            : 'Seguridad Empresarial',
      description:
        locale === 'en-US'
          ? 'Bank-level security to protect your sensitive business data'
          : locale === 'pt-BR'
            ? 'Segurança de nível bancário para proteger seus dados empresariais sensíveis'
            : 'Seguridad de nivel bancario para proteger tus datos empresariales sensibles',
      benefits: [
        locale === 'en-US'
          ? 'End-to-end encryption'
          : locale === 'pt-BR'
            ? 'Criptografia de ponta a ponta'
            : 'Cifrado de extremo a extremo',
        locale === 'en-US'
          ? 'GDPR compliant'
          : locale === 'pt-BR'
            ? 'Conformidade GDPR'
            : 'Cumplimiento GDPR',
        locale === 'en-US'
          ? 'Role-based access'
          : locale === 'pt-BR'
            ? 'Acesso baseado em função'
            : 'Acceso basado en roles',
        locale === 'en-US'
          ? 'Audit trails'
          : locale === 'pt-BR'
            ? 'Trilhas de auditoria'
            : 'Rastros de auditoría',
      ],
    },
  ];

  const useCases = [
    {
      title:
        locale === 'en-US'
          ? 'Invoice Processing'
          : locale === 'pt-BR'
            ? 'Processamento de Faturas'
            : 'Procesamiento de Facturas',
      description:
        locale === 'en-US'
          ? 'Automatically extract, validate, and process invoices from any format'
          : locale === 'pt-BR'
            ? 'Extraia, valide e processe faturas automaticamente de qualquer formato'
            : 'Extrae, valida y procesa facturas automáticamente de cualquier formato',
      metrics: {
        reduction: '85%',
        time: locale === 'en-US' ? '5 minutes' : locale === 'pt-BR' ? '5 minutos' : '5 minutos',
        accuracy: '99.8%',
      },
      icon: '📋',
    },
    {
      title:
        locale === 'en-US'
          ? 'Customer Support'
          : locale === 'pt-BR'
            ? 'Suporte ao Cliente'
            : 'Soporte al Cliente',
      description:
        locale === 'en-US'
          ? 'Handle customer inquiries 24/7 with intelligent, context-aware responses'
          : locale === 'pt-BR'
            ? 'Atenda consultas de clientes 24/7 com respostas inteligentes e contextuais'
            : 'Atiende consultas de clientes 24/7 con respuestas inteligentes y contextuales',
      metrics: {
        reduction: '70%',
        time: locale === 'en-US' ? 'Instant' : locale === 'pt-BR' ? 'Instantâneo' : 'Instantáneo',
        accuracy: '95%',
      },
      icon: '🎧',
    },
    {
      title:
        locale === 'en-US'
          ? 'Data Entry'
          : locale === 'pt-BR'
            ? 'Entrada de Dados'
            : 'Entrada de Datos',
      description:
        locale === 'en-US'
          ? 'Eliminate manual data entry with intelligent form filling and validation'
          : locale === 'pt-BR'
            ? 'Elimine entrada manual de dados com preenchimento e validação inteligente de formulários'
            : 'Elimina la entrada manual de datos con llenado y validación inteligente de formularios',
      metrics: {
        reduction: '90%',
        time:
          locale === 'en-US' ? '10 seconds' : locale === 'pt-BR' ? '10 segundos' : '10 segundos',
        accuracy: '99.5%',
      },
      icon: '⌨️',
    },
  ];

  const testimonials = [
    {
      id: 'retail-plus',
      content:
        locale === 'en-US'
          ? "PENNY transformed our customer service. Response times dropped from hours to seconds, and customer satisfaction increased by 40%. It's like having a team of experts available 24/7."
          : locale === 'pt-BR'
            ? 'PENNY transformou nosso atendimento ao cliente. Os tempos de resposta caíram de horas para segundos, e a satisfação do cliente aumentou 40%. É como ter uma equipe de especialistas disponível 24/7.'
            : 'PENNY transformó nuestro servicio al cliente. Los tiempos de respuesta bajaron de horas a segundos, y la satisfacción del cliente aumentó 40%. Es como tener un equipo de expertos disponible 24/7.',
      author: {
        name: 'Patricia González',
        role:
          locale === 'en-US'
            ? 'Customer Service Director'
            : locale === 'pt-BR'
              ? 'Diretora de Atendimento ao Cliente'
              : 'Directora de Servicio al Cliente',
        company: 'RetailPlus',
        image: '/testimonials/patricia-gonzalez.jpg',
      },
      rating: 5,
      service: 'PENNY',
      results: [
        {
          metric:
            locale === 'en-US'
              ? 'Response time'
              : locale === 'pt-BR'
                ? 'Tempo de resposta'
                : 'Tiempo de respuesta',
          value: '90%',
          description:
            locale === 'en-US'
              ? 'Faster responses'
              : locale === 'pt-BR'
                ? 'Respostas mais rápidas'
                : 'Respuestas más rápidas',
        },
        {
          metric:
            locale === 'en-US'
              ? 'Customer satisfaction'
              : locale === 'pt-BR'
                ? 'Satisfação do cliente'
                : 'Satisfacción del cliente',
          value: '40%',
          description:
            locale === 'en-US' ? 'Improvement' : locale === 'pt-BR' ? 'Melhoria' : 'Mejora',
        },
      ],
    },
    {
      id: 'finance-corp',
      content:
        locale === 'en-US'
          ? 'The document processing capabilities of PENNY are incredible. We process thousands of invoices monthly, and PENNY reduced our processing time by 85% with near-perfect accuracy.'
          : locale === 'pt-BR'
            ? 'As capacidades de processamento de documentos do PENNY são incríveis. Processamos milhares de faturas mensalmente, e PENNY reduziu nosso tempo de processamento em 85% com precisão quase perfeita.'
            : 'Las capacidades de procesamiento de documentos de PENNY son increíbles. Procesamos miles de facturas mensualmente, y PENNY redujo nuestro tiempo de procesamiento en 85% con precisión casi perfecta.',
      author: {
        name: 'Roberto Silva',
        role:
          locale === 'en-US'
            ? 'Finance Manager'
            : locale === 'pt-BR'
              ? 'Gerente Financeiro'
              : 'Gerente Financiero',
        company: 'FinanceCorp',
        image: '/testimonials/roberto-silva.jpg',
      },
      rating: 5,
      service: 'PENNY',
      results: [
        {
          metric:
            locale === 'en-US'
              ? 'Processing time'
              : locale === 'pt-BR'
                ? 'Tempo de processamento'
                : 'Tiempo de procesamiento',
          value: '85%',
          description:
            locale === 'en-US' ? 'Reduction' : locale === 'pt-BR' ? 'Redução' : 'Reducción',
        },
        {
          metric:
            locale === 'en-US'
              ? 'Accuracy rate'
              : locale === 'pt-BR'
                ? 'Taxa de precisão'
                : 'Tasa de precisión',
          value: '99.8%',
          description:
            locale === 'en-US'
              ? 'Document processing'
              : locale === 'pt-BR'
                ? 'Processamento de documentos'
                : 'Procesamiento de documentos',
        },
      ],
    },
  ];

  const pricingPlans = [
    {
      name: locale === 'en-US' ? 'Business' : locale === 'pt-BR' ? 'Negócios' : 'Negocios',
      price: '30,000',
      currency: 'MXN',
      period: locale === 'en-US' ? 'month' : locale === 'pt-BR' ? 'mês' : 'mes',
      description:
        locale === 'en-US'
          ? 'Ideal for small to medium businesses'
          : locale === 'pt-BR'
            ? 'Ideal para pequenas e médias empresas'
            : 'Ideal para pequeñas y medianas empresas',
      features: [
        locale === 'en-US'
          ? 'Up to 10,000 tasks/month'
          : locale === 'pt-BR'
            ? 'Até 10.000 tarefas/mês'
            : 'Hasta 10,000 tareas/mes',
        locale === 'en-US'
          ? 'Document processing'
          : locale === 'pt-BR'
            ? 'Processamento de documentos'
            : 'Procesamiento de documentos',
        locale === 'en-US'
          ? 'Natural language interface'
          : locale === 'pt-BR'
            ? 'Interface de linguagem natural'
            : 'Interfaz de lenguaje natural',
        locale === 'en-US'
          ? 'Email support'
          : locale === 'pt-BR'
            ? 'Suporte por email'
            : 'Soporte por correo',
        locale === 'en-US'
          ? 'Basic integrations'
          : locale === 'pt-BR'
            ? 'Integrações básicas'
            : 'Integraciones básicas',
      ],
      cta:
        locale === 'en-US'
          ? 'Start Business'
          : locale === 'pt-BR'
            ? 'Começar Negócios'
            : 'Iniciar Negocios',
      popular: true,
    },
    {
      name: locale === 'en-US' ? 'Enterprise' : locale === 'pt-BR' ? 'Empresarial' : 'Empresarial',
      price: locale === 'en-US' ? 'Custom' : locale === 'pt-BR' ? 'Personalizado' : 'Personalizado',
      currency: '',
      period: '',
      description:
        locale === 'en-US'
          ? 'For large organizations with custom needs'
          : locale === 'pt-BR'
            ? 'Para grandes organizações com necessidades personalizadas'
            : 'Para grandes organizaciones con necesidades personalizadas',
      features: [
        locale === 'en-US'
          ? 'Unlimited tasks'
          : locale === 'pt-BR'
            ? 'Tarefas ilimitadas'
            : 'Tareas ilimitadas',
        locale === 'en-US'
          ? 'Advanced AI customization'
          : locale === 'pt-BR'
            ? 'Personalização avançada de IA'
            : 'Personalización avanzada de IA',
        locale === 'en-US'
          ? 'Dedicated success team'
          : locale === 'pt-BR'
            ? 'Equipe de sucesso dedicada'
            : 'Equipo de éxito dedicado',
        locale === 'en-US'
          ? '24/7 priority support'
          : locale === 'pt-BR'
            ? 'Suporte prioritário 24/7'
            : 'Soporte prioritario 24/7',
        locale === 'en-US'
          ? 'Custom integrations'
          : locale === 'pt-BR'
            ? 'Integrações personalizadas'
            : 'Integraciones personalizadas',
        locale === 'en-US'
          ? 'On-premise option'
          : locale === 'pt-BR'
            ? 'Opção on-premise'
            : 'Opción on-premise',
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
    <PennyProductClient
      locale={locale}
      translations={translations}
      features={pennyFeatures}
      useCases={useCases}
      testimonials={testimonials}
      pricingPlans={pricingPlans}
    />
  );
}
