import { type Locale } from '@madfam/i18n';
import {
  Container,
  Heading,
  Button,
  Card,
  CardContent,
  Hero,
  LeadForm,
  ROICalculator,
  TestimonialGrid,
  Newsletter,
} from '@madfam/ui';
import { unstable_setRequestLocale } from 'next-intl/server';
import { logServiceInquiry } from '@/lib/logger';

export default function PennyProductPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const currentLocale = locale as Locale;

  const pennyFeatures = [
    {
      icon: '🧠',
      title:
        currentLocale === 'en-US'
          ? 'Continuous Learning'
          : currentLocale === 'pt-BR'
            ? 'Aprendizado Contínuo'
            : 'Aprendizaje Continuo',
      description:
        currentLocale === 'en-US'
          ? 'PENNY learns from your processes and improves automation over time'
          : currentLocale === 'pt-BR'
            ? 'PENNY aprende com seus processos e melhora a automação ao longo do tempo'
            : 'PENNY aprende de tus procesos y mejora la automatización con el tiempo',
      benefits: [
        currentLocale === 'en-US'
          ? 'Machine learning algorithms'
          : currentLocale === 'pt-BR'
            ? 'Algoritmos de aprendizado de máquina'
            : 'Algoritmos de aprendizaje automático',
        currentLocale === 'en-US'
          ? 'Pattern recognition'
          : currentLocale === 'pt-BR'
            ? 'Reconhecimento de padrões'
            : 'Reconocimiento de patrones',
        currentLocale === 'en-US'
          ? 'Process optimization'
          : currentLocale === 'pt-BR'
            ? 'Otimização de processos'
            : 'Optimización de procesos',
        currentLocale === 'en-US'
          ? 'Predictive suggestions'
          : currentLocale === 'pt-BR'
            ? 'Sugestões preditivas'
            : 'Sugerencias predictivas',
      ],
    },
    {
      icon: '📄',
      title:
        currentLocale === 'en-US'
          ? 'Document Intelligence'
          : currentLocale === 'pt-BR'
            ? 'Inteligência de Documentos'
            : 'Inteligencia de Documentos',
      description:
        currentLocale === 'en-US'
          ? 'Extract, process, and organize information from any document type'
          : currentLocale === 'pt-BR'
            ? 'Extraia, processe e organize informações de qualquer tipo de documento'
            : 'Extrae, procesa y organiza información de cualquier tipo de documento',
      benefits: [
        currentLocale === 'en-US'
          ? 'OCR and text extraction'
          : currentLocale === 'pt-BR'
            ? 'OCR e extração de texto'
            : 'OCR y extracción de texto',
        currentLocale === 'en-US'
          ? 'Data classification'
          : currentLocale === 'pt-BR'
            ? 'Classificação de dados'
            : 'Clasificación de datos',
        currentLocale === 'en-US'
          ? 'Automated filing'
          : currentLocale === 'pt-BR'
            ? 'Arquivamento automatizado'
            : 'Archivado automatizado',
        currentLocale === 'en-US'
          ? 'Content validation'
          : currentLocale === 'pt-BR'
            ? 'Validação de conteúdo'
            : 'Validación de contenido',
      ],
    },
    {
      icon: '💬',
      title:
        currentLocale === 'en-US'
          ? 'Natural Language Processing'
          : currentLocale === 'pt-BR'
            ? 'Processamento de Linguagem Natural'
            : 'Procesamiento de Lenguaje Natural',
      description:
        currentLocale === 'en-US'
          ? 'Communicate with PENNY using natural language for easier task management'
          : currentLocale === 'pt-BR'
            ? 'Comunique-se com PENNY usando linguagem natural para gerenciamento de tarefas mais fácil'
            : 'Comunícate con PENNY usando lenguaje natural para una gestión de tareas más fácil',
      benefits: [
        currentLocale === 'en-US'
          ? 'Conversational interface'
          : currentLocale === 'pt-BR'
            ? 'Interface conversacional'
            : 'Interfaz conversacional',
        currentLocale === 'en-US'
          ? 'Voice commands'
          : currentLocale === 'pt-BR'
            ? 'Comandos de voz'
            : 'Comandos de voz',
        currentLocale === 'en-US'
          ? 'Multi-language support'
          : currentLocale === 'pt-BR'
            ? 'Suporte a múltiplos idiomas'
            : 'Soporte multiidioma',
        currentLocale === 'en-US'
          ? 'Intent recognition'
          : currentLocale === 'pt-BR'
            ? 'Reconhecimento de intenção'
            : 'Reconocimiento de intención',
      ],
    },
    {
      icon: '⚡',
      title:
        currentLocale === 'en-US'
          ? 'Smart Task Management'
          : currentLocale === 'pt-BR'
            ? 'Gerenciamento Inteligente de Tarefas'
            : 'Gestión Inteligente de Tareas',
      description:
        currentLocale === 'en-US'
          ? 'Automatically prioritize, schedule, and execute tasks based on business rules'
          : currentLocale === 'pt-BR'
            ? 'Priorize, programe e execute tarefas automaticamente com base em regras de negócio'
            : 'Prioriza, programa y ejecuta tareas automáticamente basándose en reglas de negocio',
      benefits: [
        currentLocale === 'en-US'
          ? 'Intelligent scheduling'
          : currentLocale === 'pt-BR'
            ? 'Agendamento inteligente'
            : 'Programación inteligente',
        currentLocale === 'en-US'
          ? 'Priority management'
          : currentLocale === 'pt-BR'
            ? 'Gerenciamento de prioridade'
            : 'Gestión de prioridades',
        currentLocale === 'en-US'
          ? 'Automated workflows'
          : currentLocale === 'pt-BR'
            ? 'Fluxos automatizados'
            : 'Flujos automatizados',
        currentLocale === 'en-US'
          ? 'Progress tracking'
          : currentLocale === 'pt-BR'
            ? 'Rastreamento de progresso'
            : 'Seguimiento de progreso',
      ],
    },
  ];

  const useCases = [
    {
      title:
        currentLocale === 'en-US'
          ? 'Invoice Processing'
          : currentLocale === 'pt-BR'
            ? 'Processamento de Faturas'
            : 'Procesamiento de Facturas',
      description:
        currentLocale === 'en-US'
          ? 'Automate invoice extraction, validation, and approval workflows'
          : currentLocale === 'pt-BR'
            ? 'Automatize extração, validação e fluxos de aprovação de faturas'
            : 'Automatiza extracción, validación y flujos de aprobación de facturas',
      metrics: {
        reduction: '85%',
        time:
          currentLocale === 'en-US'
            ? '5 minutes'
            : currentLocale === 'pt-BR'
              ? '5 minutos'
              : '5 minutos',
        satisfaction: '96%',
      },
      icon: '📋',
    },
    {
      title:
        currentLocale === 'en-US'
          ? 'Customer Support'
          : currentLocale === 'pt-BR'
            ? 'Suporte ao Cliente'
            : 'Soporte al Cliente',
      description:
        currentLocale === 'en-US'
          ? 'Intelligent ticket routing, response suggestions, and case management'
          : currentLocale === 'pt-BR'
            ? 'Roteamento inteligente de tickets, sugestões de resposta e gerenciamento de casos'
            : 'Enrutamiento inteligente de tickets, sugerencias de respuesta y gestión de casos',
      metrics: {
        reduction: '70%',
        time:
          currentLocale === 'en-US' ? '2 hours' : currentLocale === 'pt-BR' ? '2 horas' : '2 horas',
        satisfaction: '91%',
      },
      icon: '🎧',
    },
    {
      title:
        currentLocale === 'en-US'
          ? 'Report Generation'
          : currentLocale === 'pt-BR'
            ? 'Geração de Relatórios'
            : 'Generación de Reportes',
      description:
        currentLocale === 'en-US'
          ? 'Automated data collection, analysis, and formatted report creation'
          : currentLocale === 'pt-BR'
            ? 'Coleta automatizada de dados, análise e criação de relatórios formatados'
            : 'Recolección automatizada de datos, análisis y creación de reportes formateados',
      metrics: {
        reduction: '90%',
        time:
          currentLocale === 'en-US'
            ? '15 minutes'
            : currentLocale === 'pt-BR'
              ? '15 minutos'
              : '15 minutos',
        satisfaction: '88%',
      },
      icon: '📊',
    },
  ];

  const testimonials = [
    {
      id: 'sofia-martinez',
      content:
        currentLocale === 'en-US'
          ? 'PENNY has been a game-changer for our small business. It handles all our routine tasks and has freed up our team to focus on growth. The learning capability is incredible.'
          : currentLocale === 'pt-BR'
            ? 'PENNY foi uma revolução para nossa pequena empresa. Ela cuida de todas as tarefas rotineiras e liberou nossa equipe para focar no crescimento. A capacidade de aprendizado é incrível.'
            : 'PENNY ha sido revolucionario para nuestro pequeño negocio. Maneja todas nuestras tareas rutinarias y ha liberado a nuestro equipo para enfocarse en el crecimiento. La capacidad de aprendizaje es increíble.',
      author: {
        name: 'Sofía Martínez',
        role:
          currentLocale === 'en-US'
            ? 'Operations Manager'
            : currentLocale === 'pt-BR'
              ? 'Gerente de Operações'
              : 'Gerente de Operaciones',
        company: 'Verde Consulting',
        image: '/testimonials/sofia-martinez.jpg',
      },
      rating: 5,
      service: 'PENNY',
      results: [
        {
          metric:
            currentLocale === 'en-US'
              ? 'Task automation'
              : currentLocale === 'pt-BR'
                ? 'Automação de tarefas'
                : 'Automatización de tareas',
          value: '25',
          description:
            currentLocale === 'en-US'
              ? 'Daily processes'
              : currentLocale === 'pt-BR'
                ? 'Processos diários'
                : 'Procesos diarios',
        },
        {
          metric:
            currentLocale === 'en-US'
              ? 'Cost savings'
              : currentLocale === 'pt-BR'
                ? 'Economia de custos'
                : 'Ahorro de costos',
          value: '40%',
          description:
            currentLocale === 'en-US'
              ? 'Operational expenses'
              : currentLocale === 'pt-BR'
                ? 'Despesas operacionais'
                : 'Gastos operacionales',
        },
      ],
    },
    {
      id: 'ricardo-silva',
      content:
        currentLocale === 'en-US'
          ? 'The document processing capabilities of PENNY are outstanding. We process hundreds of invoices daily with 99% accuracy. It has transformed our accounting department.'
          : currentLocale === 'pt-BR'
            ? 'As capacidades de processamento de documentos do PENNY são excepcionais. Processamos centenas de faturas diariamente com 99% de precisão. Transformou nosso departamento contábil.'
            : 'Las capacidades de procesamiento de documentos de PENNY son excepcionales. Procesamos cientos de facturas diariamente con 99% de precisión. Ha transformado nuestro departamento contable.',
      author: {
        name: 'Ricardo Silva',
        role:
          currentLocale === 'en-US'
            ? 'Finance Director'
            : currentLocale === 'pt-BR'
              ? 'Diretor Financeiro'
              : 'Director Financiero',
        company: 'Constructora Lima',
        image: '/testimonials/ricardo-silva.jpg',
      },
      rating: 5,
      service: 'PENNY',
      results: [
        {
          metric:
            currentLocale === 'en-US'
              ? 'Processing accuracy'
              : currentLocale === 'pt-BR'
                ? 'Precisão de processamento'
                : 'Precisión de procesamiento',
          value: '99%',
          description:
            currentLocale === 'en-US'
              ? 'Document accuracy'
              : currentLocale === 'pt-BR'
                ? 'Precisão de documentos'
                : 'Precisión de documentos',
        },
        {
          metric:
            currentLocale === 'en-US'
              ? 'Processing speed'
              : currentLocale === 'pt-BR'
                ? 'Velocidade de processamento'
                : 'Velocidad de procesamiento',
          value: '10x',
          description:
            currentLocale === 'en-US'
              ? 'Faster than manual'
              : currentLocale === 'pt-BR'
                ? 'Mais rápido que manual'
                : 'Más rápido que manual',
        },
      ],
    },
  ];

  const pricingPlans = [
    {
      name:
        currentLocale === 'en-US' ? 'Starter' : currentLocale === 'pt-BR' ? 'Iniciante' : 'Inicial',
      price: '15,000',
      currency: 'MXN',
      period: currentLocale === 'en-US' ? 'month' : currentLocale === 'pt-BR' ? 'mês' : 'mes',
      description:
        currentLocale === 'en-US'
          ? 'Perfect for small businesses'
          : currentLocale === 'pt-BR'
            ? 'Perfeito para pequenas empresas'
            : 'Perfecto para pequeñas empresas',
      features: [
        currentLocale === 'en-US'
          ? 'Up to 100 tasks/month'
          : currentLocale === 'pt-BR'
            ? 'Até 100 tarefas/mês'
            : 'Hasta 100 tareas/mes',
        currentLocale === 'en-US'
          ? 'Document processing'
          : currentLocale === 'pt-BR'
            ? 'Processamento de documentos'
            : 'Procesamiento de documentos',
        currentLocale === 'en-US'
          ? 'Basic integrations'
          : currentLocale === 'pt-BR'
            ? 'Integrações básicas'
            : 'Integraciones básicas',
        currentLocale === 'en-US'
          ? 'Email support'
          : currentLocale === 'pt-BR'
            ? 'Suporte por email'
            : 'Soporte por email',
        currentLocale === 'en-US'
          ? 'Learning algorithms'
          : currentLocale === 'pt-BR'
            ? 'Algoritmos de aprendizado'
            : 'Algoritmos de aprendizaje',
      ],
      cta:
        currentLocale === 'en-US'
          ? 'Start with PENNY'
          : currentLocale === 'pt-BR'
            ? 'Começar com PENNY'
            : 'Iniciar con PENNY',
      popular: true,
    },
    {
      name:
        currentLocale === 'en-US'
          ? 'Professional'
          : currentLocale === 'pt-BR'
            ? 'Profissional'
            : 'Profesional',
      price: '35,000',
      currency: 'MXN',
      period: currentLocale === 'en-US' ? 'month' : currentLocale === 'pt-BR' ? 'mês' : 'mes',
      description:
        currentLocale === 'en-US'
          ? 'For growing companies'
          : currentLocale === 'pt-BR'
            ? 'Para empresas em crescimento'
            : 'Para empresas en crecimiento',
      features: [
        currentLocale === 'en-US'
          ? 'Up to 500 tasks/month'
          : currentLocale === 'pt-BR'
            ? 'Até 500 tarefas/mês'
            : 'Hasta 500 tareas/mes',
        currentLocale === 'en-US'
          ? 'Advanced NLP features'
          : currentLocale === 'pt-BR'
            ? 'Recursos avançados de NLP'
            : 'Características avanzadas de NLP',
        currentLocale === 'en-US'
          ? 'Custom workflows'
          : currentLocale === 'pt-BR'
            ? 'Fluxos personalizados'
            : 'Flujos personalizados',
        currentLocale === 'en-US'
          ? 'Priority support'
          : currentLocale === 'pt-BR'
            ? 'Suporte prioritário'
            : 'Soporte prioritario',
        currentLocale === 'en-US'
          ? 'API access'
          : currentLocale === 'pt-BR'
            ? 'Acesso à API'
            : 'Acceso a API',
        currentLocale === 'en-US'
          ? 'Analytics dashboard'
          : currentLocale === 'pt-BR'
            ? 'Painel de análise'
            : 'Panel de análisis',
      ],
      cta:
        currentLocale === 'en-US'
          ? 'Upgrade to Pro'
          : currentLocale === 'pt-BR'
            ? 'Atualizar para Pro'
            : 'Actualizar a Pro',
      popular: false,
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero
        variant="product"
        title="PENNY"
        subtitle={
          currentLocale === 'en-US'
            ? 'Intelligent Process Automation'
            : currentLocale === 'pt-BR'
              ? 'Automação Inteligente de Processos'
              : 'Automatización Inteligente de Procesos'
        }
        description={
          currentLocale === 'en-US'
            ? 'Your AI assistant that learns, adapts, and continuously improves your workflows. Designed for businesses seeking efficiency without complexity.'
            : currentLocale === 'pt-BR'
              ? 'Seu assistente de IA que aprende, se adapta e melhora continuamente seus fluxos de trabalho. Projetado para empresas que buscam eficiência sem complexidade.'
              : 'Tu asistente de IA que aprende, se adapta y mejora continuamente tus flujos de trabajo. Diseñado para empresas que buscan eficiencia sin complejidad.'
        }
        cta={{
          primary: {
            text:
              currentLocale === 'en-US'
                ? 'Start free trial'
                : currentLocale === 'pt-BR'
                  ? 'Iniciar teste gratuito'
                  : 'Iniciar prueba gratuita',
            href: '#trial',
            variant: 'creative',
          },
          secondary: {
            text:
              currentLocale === 'en-US'
                ? 'Watch demo'
                : currentLocale === 'pt-BR'
                  ? 'Assistir demo'
                  : 'Ver demo',
            href: '#demo',
            variant: 'outline',
          },
        }}
        background="gradient"
        className="pt-20"
      >
        <div className="grid grid-cols-3 gap-8 text-center text-white/90">
          <div>
            <div className="text-2xl font-bold text-sun">100+</div>
            <div className="text-sm">
              {currentLocale === 'en-US'
                ? 'Tools connected'
                : currentLocale === 'pt-BR'
                  ? 'Ferramentas conectadas'
                  : 'Herramientas conectadas'}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-sun">90%</div>
            <div className="text-sm">
              {currentLocale === 'en-US'
                ? 'Task reduction'
                : currentLocale === 'pt-BR'
                  ? 'Redução de tarefas'
                  : 'Reducción de tareas'}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-sun">2 weeks</div>
            <div className="text-sm">
              {currentLocale === 'en-US'
                ? 'Setup time'
                : currentLocale === 'pt-BR'
                  ? 'Tempo de configuração'
                  : 'Tiempo de configuración'}
            </div>
          </div>
        </div>
      </Hero>

      {/* Features Section */}
      <section className="section">
        <Container>
          <div className="text-center mb-16">
            <Heading level={2} className="mb-4">
              {currentLocale === 'en-US'
                ? 'AI-powered features for every business'
                : currentLocale === 'pt-BR'
                  ? 'Recursos alimentados por IA para cada negócio'
                  : 'Características impulsadas por IA para cada negocio'}
            </Heading>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {currentLocale === 'en-US'
                ? 'PENNY combines advanced AI with intuitive design to deliver automation solutions that grow with your business.'
                : currentLocale === 'pt-BR'
                  ? 'PENNY combina IA avançada com design intuitivo para fornecer soluções de automação que crescem com seu negócio.'
                  : 'PENNY combina IA avanzada con diseño intuitivo para ofrecer soluciones de automatización que crecen con tu negocio.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {pennyFeatures.map((feature, index) => (
              <Card key={index} className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="text-4xl">{feature.icon}</div>
                    <div>
                      <h3 className="font-heading text-xl mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-leaf">✓</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Use Cases Section */}
      <section className="section bg-pearl">
        <Container>
          <div className="text-center mb-16">
            <Heading level={2} className="mb-4">
              {currentLocale === 'en-US'
                ? 'Common use cases'
                : currentLocale === 'pt-BR'
                  ? 'Casos de uso comuns'
                  : 'Casos de uso comunes'}
            </Heading>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {currentLocale === 'en-US'
                ? 'See how businesses like yours are using PENNY to automate critical processes and achieve measurable results.'
                : currentLocale === 'pt-BR'
                  ? 'Veja como empresas como a sua estão usando PENNY para automatizar processos críticos e alcançar resultados mensuráveis.'
                  : 'Mira cómo empresas como la tuya están usando PENNY para automatizar procesos críticos y lograr resultados medibles.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="text-5xl mb-4">{useCase.icon}</div>
                  <h3 className="font-heading text-xl mb-4">{useCase.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{useCase.description}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-2xl font-bold text-leaf">
                        {useCase.metrics.reduction}
                      </div>
                      <div className="text-gray-500">
                        {currentLocale === 'en-US'
                          ? 'Reduction'
                          : currentLocale === 'pt-BR'
                            ? 'Redução'
                            : 'Reducción'}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-sun">{useCase.metrics.time}</div>
                      <div className="text-gray-500">
                        {currentLocale === 'en-US'
                          ? 'To complete'
                          : currentLocale === 'pt-BR'
                            ? 'Para completar'
                            : 'Para completar'}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-lavender">
                        {useCase.metrics.satisfaction}
                      </div>
                      <div className="text-gray-500">
                        {currentLocale === 'en-US'
                          ? 'Satisfaction'
                          : currentLocale === 'pt-BR'
                            ? 'Satisfação'
                            : 'Satisfacción'}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <Container>
          <div className="text-center mb-16">
            <Heading level={2} className="mb-4">
              {currentLocale === 'en-US'
                ? 'What our customers say'
                : currentLocale === 'pt-BR'
                  ? 'O que nossos clientes dizem'
                  : 'Lo que dicen nuestros clientes'}
            </Heading>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {currentLocale === 'en-US'
                ? 'Join thousands of businesses that have transformed their operations with PENNY.'
                : currentLocale === 'pt-BR'
                  ? 'Junte-se a milhares de empresas que transformaram suas operações com PENNY.'
                  : 'Únete a miles de empresas que han transformado sus operaciones con PENNY.'}
            </p>
          </div>

          <TestimonialGrid testimonials={testimonials} columns={2} />
        </Container>
      </section>

      {/* Pricing Section */}
      <section className="section bg-pearl">
        <Container>
          <div className="text-center mb-16">
            <Heading level={2} className="mb-4">
              {currentLocale === 'en-US'
                ? 'Simple, transparent pricing'
                : currentLocale === 'pt-BR'
                  ? 'Preços simples e transparentes'
                  : 'Precios simples y transparentes'}
            </Heading>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {currentLocale === 'en-US'
                ? 'Start with our Starter plan or scale up to Professional as your automation needs grow.'
                : currentLocale === 'pt-BR'
                  ? 'Comece com nosso plano Iniciante ou escale para Profissional conforme suas necessidades de automação crescem.'
                  : 'Comienza con nuestro plan Inicial o escala a Profesional a medida que crecen tus necesidades de automatización.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? 'border-lavender ring-2 ring-lavender/20' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-lavender text-white px-4 py-1 rounded-full text-sm font-medium">
                      {currentLocale === 'en-US'
                        ? 'Most Popular'
                        : currentLocale === 'pt-BR'
                          ? 'Mais Popular'
                          : 'Más Popular'}
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="font-heading text-2xl mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-lg text-gray-600 dark:text-gray-400 ml-1">
                      {plan.currency}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-leaf">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.popular ? 'creative' : 'primary'}
                    className="w-full"
                    onClick={() =>
                      logServiceInquiry('L4_PLATFORMS', 'penny-pricing', {
                        plan: plan.name,
                        locale: currentLocale,
                      })
                    }
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ROI Calculator Section */}
      <section className="section">
        <Container>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Heading level={2} className="mb-4">
                {currentLocale === 'en-US'
                  ? 'Calculate your PENNY ROI'
                  : currentLocale === 'pt-BR'
                    ? 'Calcule seu ROI do PENNY'
                    : 'Calcula tu ROI de PENNY'}
              </Heading>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {currentLocale === 'en-US'
                  ? 'Discover how much time and money PENNY can save your business with our interactive calculator.'
                  : currentLocale === 'pt-BR'
                    ? 'Descubra quanto tempo e dinheiro PENNY pode economizar para seu negócio com nossa calculadora interativa.'
                    : 'Descubre cuánto tiempo y dinero puede ahorrar PENNY a tu negocio con nuestra calculadora interactiva.'}
              </p>
            </div>

            <ROICalculator
              serviceTier="L4_PLATFORMS"
              title={
                currentLocale === 'en-US'
                  ? 'PENNY ROI Calculator'
                  : currentLocale === 'pt-BR'
                    ? 'Calculadora ROI PENNY'
                    : 'Calculadora ROI PENNY'
              }
              onCalculate={results => {
                logServiceInquiry('L4_PLATFORMS', 'penny-roi-calculator', {
                  results,
                  locale: currentLocale,
                });
              }}
            />
          </div>
        </Container>
      </section>

      {/* Trial Section */}
      <section id="trial" className="section bg-pearl">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Heading level={2} className="mb-4">
                {currentLocale === 'en-US'
                  ? 'Start your free trial'
                  : currentLocale === 'pt-BR'
                    ? 'Comece seu teste gratuito'
                    : 'Comienza tu prueba gratuita'}
              </Heading>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {currentLocale === 'en-US'
                  ? 'Experience PENNY risk-free for 30 days. No credit card required, full access to all features.'
                  : currentLocale === 'pt-BR'
                    ? 'Experimente PENNY sem risco por 30 dias. Não é necessário cartão de crédito, acesso completo a todos os recursos.'
                    : 'Experimenta PENNY sin riesgo por 30 días. No se requiere tarjeta de crédito, acceso completo a todas las características.'}
              </p>
            </div>

            <LeadForm
              variant="progressive"
              tier="L4_PLATFORMS"
              source="penny-trial-request"
              title={
                currentLocale === 'en-US'
                  ? 'Request free trial'
                  : currentLocale === 'pt-BR'
                    ? 'Solicitar teste gratuito'
                    : 'Solicitar prueba gratuita'
              }
              description={
                currentLocale === 'en-US'
                  ? 'Get started with PENNY today and see the difference intelligent automation can make'
                  : currentLocale === 'pt-BR'
                    ? 'Comece com PENNY hoje e veja a diferença que a automação inteligente pode fazer'
                    : 'Comienza con PENNY hoy y mira la diferencia que la automatización inteligente puede hacer'
              }
              submitText={
                currentLocale === 'en-US'
                  ? 'Start free trial'
                  : currentLocale === 'pt-BR'
                    ? 'Iniciar teste gratuito'
                    : 'Iniciar prueba gratuita'
              }
              onSubmit={async data => {
                logServiceInquiry('L4_PLATFORMS', 'penny-trial-form', {
                  ...data,
                  locale: currentLocale,
                });
                // TODO: Implement actual form submission
              }}
            />
          </div>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="section">
        <Container>
          <div className="max-w-2xl mx-auto">
            <Newsletter
              title={
                currentLocale === 'en-US'
                  ? 'Stay updated with PENNY'
                  : currentLocale === 'pt-BR'
                    ? 'Mantenha-se atualizado com PENNY'
                    : 'Mantente actualizado con PENNY'
              }
              description={
                currentLocale === 'en-US'
                  ? 'Get automation tips, feature updates, and success stories from the PENNY community.'
                  : currentLocale === 'pt-BR'
                    ? 'Receba dicas de automação, atualizações de recursos e histórias de sucesso da comunidade PENNY.'
                    : 'Recibe consejos de automatización, actualizaciones de características e historias de éxito de la comunidad PENNY.'
              }
              buttonText={
                currentLocale === 'en-US'
                  ? 'Subscribe'
                  : currentLocale === 'pt-BR'
                    ? 'Inscrever'
                    : 'Suscribirse'
              }
              onSubscribe={async email => {
                // TODO: Implement newsletter subscription
                console.log('Newsletter subscription:', email);
              }}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}
