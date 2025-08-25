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
        locale === 'en'
          ? 'Continuous Learning'
          : locale === 'pt-br'
            ? 'Aprendizado Contínuo'
            : 'Aprendizaje Continuo',
      description:
        locale === 'en'
          ? 'PENNY learns from your processes and improves automation over time'
          : locale === 'pt-br'
            ? 'PENNY aprende com seus processos e melhora a automação ao longo do tempo'
            : 'PENNY aprende de tus procesos y mejora la automatización con el tiempo',
      benefits: [
        locale === 'en'
          ? 'Machine learning algorithms'
          : locale === 'pt-br'
            ? 'Algoritmos de aprendizado de máquina'
            : 'Algoritmos de aprendizaje automático',
        locale === 'en'
          ? 'Pattern recognition'
          : locale === 'pt-br'
            ? 'Reconhecimento de padrões'
            : 'Reconocimiento de patrones',
        locale === 'en'
          ? 'Process optimization'
          : locale === 'pt-br'
            ? 'Otimização de processos'
            : 'Optimización de procesos',
        locale === 'en'
          ? 'Predictive suggestions'
          : locale === 'pt-br'
            ? 'Sugestões preditivas'
            : 'Sugerencias predictivas',
      ],
    },
    {
      icon: '📄',
      title:
        locale === 'en'
          ? 'Document Intelligence'
          : locale === 'pt-br'
            ? 'Inteligência de Documentos'
            : 'Inteligencia de Documentos',
      description:
        locale === 'en'
          ? 'Extract, process, and organize information from any document type'
          : locale === 'pt-br'
            ? 'Extraia, processe e organize informações de qualquer tipo de documento'
            : 'Extrae, procesa y organiza información de cualquier tipo de documento',
      benefits: [
        locale === 'en'
          ? 'OCR and text extraction'
          : locale === 'pt-br'
            ? 'OCR e extração de texto'
            : 'OCR y extracción de texto',
        locale === 'en'
          ? 'Data classification'
          : locale === 'pt-br'
            ? 'Classificação de dados'
            : 'Clasificación de datos',
        locale === 'en'
          ? 'Automated filing'
          : locale === 'pt-br'
            ? 'Arquivamento automatizado'
            : 'Archivado automatizado',
        locale === 'en'
          ? 'Content validation'
          : locale === 'pt-br'
            ? 'Validação de conteúdo'
            : 'Validación de contenido',
      ],
    },
    {
      icon: '💬',
      title:
        locale === 'en'
          ? 'Natural Language Interface'
          : locale === 'pt-br'
            ? 'Interface de Linguagem Natural'
            : 'Interfaz de Lenguaje Natural',
      description:
        locale === 'en'
          ? 'Communicate with PENNY naturally, as you would with a human assistant'
          : locale === 'pt-br'
            ? 'Comunique-se com PENNY naturalmente, como faria com um assistente humano'
            : 'Comunícate con PENNY naturalmente, como lo harías con un asistente humano',
      benefits: [
        locale === 'en'
          ? 'Voice commands'
          : locale === 'pt-br'
            ? 'Comandos de voz'
            : 'Comandos de voz',
        locale === 'en'
          ? 'Multi-language support'
          : locale === 'pt-br'
            ? 'Suporte multi-idioma'
            : 'Soporte multiidioma',
        locale === 'en'
          ? 'Context awareness'
          : locale === 'pt-br'
            ? 'Consciência de contexto'
            : 'Conciencia de contexto',
        locale === 'en'
          ? 'Smart responses'
          : locale === 'pt-br'
            ? 'Respostas inteligentes'
            : 'Respuestas inteligentes',
      ],
    },
    {
      icon: '🔐',
      title:
        locale === 'en'
          ? 'Enterprise Security'
          : locale === 'pt-br'
            ? 'Segurança Empresarial'
            : 'Seguridad Empresarial',
      description:
        locale === 'en'
          ? 'Bank-level security to protect your sensitive business data'
          : locale === 'pt-br'
            ? 'Segurança de nível bancário para proteger seus dados empresariais sensíveis'
            : 'Seguridad de nivel bancario para proteger tus datos empresariales sensibles',
      benefits: [
        locale === 'en'
          ? 'End-to-end encryption'
          : locale === 'pt-br'
            ? 'Criptografia de ponta a ponta'
            : 'Cifrado de extremo a extremo',
        locale === 'en'
          ? 'GDPR compliant'
          : locale === 'pt-br'
            ? 'Conformidade GDPR'
            : 'Cumplimiento GDPR',
        locale === 'en'
          ? 'Role-based access'
          : locale === 'pt-br'
            ? 'Acesso baseado em função'
            : 'Acceso basado en roles',
        locale === 'en'
          ? 'Audit trails'
          : locale === 'pt-br'
            ? 'Trilhas de auditoria'
            : 'Rastros de auditoría',
      ],
    },
  ];

  const useCases = [
    {
      title:
        locale === 'en'
          ? 'Invoice Processing'
          : locale === 'pt-br'
            ? 'Processamento de Faturas'
            : 'Procesamiento de Facturas',
      description:
        locale === 'en'
          ? 'Automatically extract, validate, and process invoices from any format'
          : locale === 'pt-br'
            ? 'Extraia, valide e processe faturas automaticamente de qualquer formato'
            : 'Extrae, valida y procesa facturas automáticamente de cualquier formato',
      metrics: {
        reduction: '85%',
        time: locale === 'en' ? '5 minutes' : locale === 'pt-br' ? '5 minutos' : '5 minutos',
        accuracy: '99.8%',
      },
      icon: '📋',
    },
    {
      title:
        locale === 'en'
          ? 'Customer Support'
          : locale === 'pt-br'
            ? 'Suporte ao Cliente'
            : 'Soporte al Cliente',
      description:
        locale === 'en'
          ? 'Handle customer inquiries 24/7 with intelligent, context-aware responses'
          : locale === 'pt-br'
            ? 'Atenda consultas de clientes 24/7 com respostas inteligentes e contextuais'
            : 'Atiende consultas de clientes 24/7 con respuestas inteligentes y contextuales',
      metrics: {
        reduction: '70%',
        time: locale === 'en' ? 'Instant' : locale === 'pt-br' ? 'Instantâneo' : 'Instantáneo',
        accuracy: '95%',
      },
      icon: '🎧',
    },
    {
      title:
        locale === 'en'
          ? 'Data Entry'
          : locale === 'pt-br'
            ? 'Entrada de Dados'
            : 'Entrada de Datos',
      description:
        locale === 'en'
          ? 'Eliminate manual data entry with intelligent form filling and validation'
          : locale === 'pt-br'
            ? 'Elimine entrada manual de dados com preenchimento e validação inteligente de formulários'
            : 'Elimina la entrada manual de datos con llenado y validación inteligente de formularios',
      metrics: {
        reduction: '90%',
        time: locale === 'en' ? '10 seconds' : locale === 'pt-br' ? '10 segundos' : '10 segundos',
        accuracy: '99.5%',
      },
      icon: '⌨️',
    },
  ];

  const testimonials = [
    {
      id: 'retail-plus',
      content:
        locale === 'en'
          ? "PENNY transformed our customer service. Response times dropped from hours to seconds, and customer satisfaction increased by 40%. It's like having a team of experts available 24/7."
          : locale === 'pt-br'
            ? 'PENNY transformou nosso atendimento ao cliente. Os tempos de resposta caíram de horas para segundos, e a satisfação do cliente aumentou 40%. É como ter uma equipe de especialistas disponível 24/7.'
            : 'PENNY transformó nuestro servicio al cliente. Los tiempos de respuesta bajaron de horas a segundos, y la satisfacción del cliente aumentó 40%. Es como tener un equipo de expertos disponible 24/7.',
      author: {
        name: 'Patricia González',
        role:
          locale === 'en'
            ? 'Customer Service Director'
            : locale === 'pt-br'
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
            locale === 'en'
              ? 'Response time'
              : locale === 'pt-br'
                ? 'Tempo de resposta'
                : 'Tiempo de respuesta',
          value: '90%',
          description:
            locale === 'en'
              ? 'Faster responses'
              : locale === 'pt-br'
                ? 'Respostas mais rápidas'
                : 'Respuestas más rápidas',
        },
        {
          metric:
            locale === 'en'
              ? 'Customer satisfaction'
              : locale === 'pt-br'
                ? 'Satisfação do cliente'
                : 'Satisfacción del cliente',
          value: '40%',
          description: locale === 'en' ? 'Improvement' : locale === 'pt-br' ? 'Melhoria' : 'Mejora',
        },
      ],
    },
    {
      id: 'finance-corp',
      content:
        locale === 'en'
          ? 'The document processing capabilities of PENNY are incredible. We process thousands of invoices monthly, and PENNY reduced our processing time by 85% with near-perfect accuracy.'
          : locale === 'pt-br'
            ? 'As capacidades de processamento de documentos do PENNY são incríveis. Processamos milhares de faturas mensalmente, e PENNY reduziu nosso tempo de processamento em 85% com precisão quase perfeita.'
            : 'Las capacidades de procesamiento de documentos de PENNY son increíbles. Procesamos miles de facturas mensualmente, y PENNY redujo nuestro tiempo de procesamiento en 85% con precisión casi perfecta.',
      author: {
        name: 'Roberto Silva',
        role:
          locale === 'en'
            ? 'Finance Manager'
            : locale === 'pt-br'
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
            locale === 'en'
              ? 'Processing time'
              : locale === 'pt-br'
                ? 'Tempo de processamento'
                : 'Tiempo de procesamiento',
          value: '85%',
          description: locale === 'en' ? 'Reduction' : locale === 'pt-br' ? 'Redução' : 'Reducción',
        },
        {
          metric:
            locale === 'en'
              ? 'Accuracy rate'
              : locale === 'pt-br'
                ? 'Taxa de precisão'
                : 'Tasa de precisión',
          value: '99.8%',
          description:
            locale === 'en'
              ? 'Document processing'
              : locale === 'pt-br'
                ? 'Processamento de documentos'
                : 'Procesamiento de documentos',
        },
      ],
    },
  ];

  const pricingPlans = [
    {
      name: locale === 'en' ? 'Business' : locale === 'pt-br' ? 'Negócios' : 'Negocios',
      price: '30,000',
      currency: 'MXN',
      period: locale === 'en' ? 'month' : locale === 'pt-br' ? 'mês' : 'mes',
      description:
        locale === 'en'
          ? 'Ideal for small to medium businesses'
          : locale === 'pt-br'
            ? 'Ideal para pequenas e médias empresas'
            : 'Ideal para pequeñas y medianas empresas',
      features: [
        locale === 'en'
          ? 'Up to 10,000 tasks/month'
          : locale === 'pt-br'
            ? 'Até 10.000 tarefas/mês'
            : 'Hasta 10,000 tareas/mes',
        locale === 'en'
          ? 'Document processing'
          : locale === 'pt-br'
            ? 'Processamento de documentos'
            : 'Procesamiento de documentos',
        locale === 'en'
          ? 'Natural language interface'
          : locale === 'pt-br'
            ? 'Interface de linguagem natural'
            : 'Interfaz de lenguaje natural',
        locale === 'en'
          ? 'Email support'
          : locale === 'pt-br'
            ? 'Suporte por email'
            : 'Soporte por correo',
        locale === 'en'
          ? 'Basic integrations'
          : locale === 'pt-br'
            ? 'Integrações básicas'
            : 'Integraciones básicas',
      ],
      cta:
        locale === 'en'
          ? 'Start Business'
          : locale === 'pt-br'
            ? 'Começar Negócios'
            : 'Iniciar Negocios',
      popular: true,
    },
    {
      name: locale === 'en' ? 'Enterprise' : locale === 'pt-br' ? 'Empresarial' : 'Empresarial',
      price: locale === 'en' ? 'Custom' : locale === 'pt-br' ? 'Personalizado' : 'Personalizado',
      currency: '',
      period: '',
      description:
        locale === 'en'
          ? 'For large organizations with custom needs'
          : locale === 'pt-br'
            ? 'Para grandes organizações com necessidades personalizadas'
            : 'Para grandes organizaciones con necesidades personalizadas',
      features: [
        locale === 'en'
          ? 'Unlimited tasks'
          : locale === 'pt-br'
            ? 'Tarefas ilimitadas'
            : 'Tareas ilimitadas',
        locale === 'en'
          ? 'Advanced AI customization'
          : locale === 'pt-br'
            ? 'Personalização avançada de IA'
            : 'Personalización avanzada de IA',
        locale === 'en'
          ? 'Dedicated success team'
          : locale === 'pt-br'
            ? 'Equipe de sucesso dedicada'
            : 'Equipo de éxito dedicado',
        locale === 'en'
          ? '24/7 priority support'
          : locale === 'pt-br'
            ? 'Suporte prioritário 24/7'
            : 'Soporte prioritario 24/7',
        locale === 'en'
          ? 'Custom integrations'
          : locale === 'pt-br'
            ? 'Integrações personalizadas'
            : 'Integraciones personalizadas',
        locale === 'en'
          ? 'On-premise option'
          : locale === 'pt-br'
            ? 'Opção on-premise'
            : 'Opción on-premise',
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
