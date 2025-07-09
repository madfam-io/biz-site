import { Container, Heading, Button, Card, CardContent, Hero, LeadForm, ROICalculator, TestimonialGrid, Newsletter } from '@madfam/ui';
import { unstable_setRequestLocale } from 'next-intl/server';
import { logServiceInquiry } from '@/lib/logger';
import { type Locale } from '@madfam/i18n';

export default function SparkProductPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const currentLocale = locale as Locale;

  const sparkFeatures = [
    {
      icon: '🔗',
      title: currentLocale === 'en-US' ? 'Universal Integrations' : currentLocale === 'pt-BR' ? 'Integrações Universais' : 'Integraciones Universales',
      description: currentLocale === 'en-US' ? 'Connect with over 1000 tools and platforms through our robust API ecosystem' : currentLocale === 'pt-BR' ? 'Conecte-se com mais de 1000 ferramentas e plataformas através do nosso ecossistema robusto de APIs' : 'Conecta con más de 1000 herramientas y plataformas a través de nuestro robusto ecosistema de APIs',
      benefits: ['Slack', 'Salesforce', 'HubSpot', 'Microsoft 365', 'Google Workspace', 'Zapier', 'Webhooks', 'Custom APIs'],
    },
    {
      icon: '⚡',
      title: currentLocale === 'en-US' ? 'Visual Workflow Builder' : currentLocale === 'pt-BR' ? 'Construtor de Fluxo Visual' : 'Constructor de Flujo Visual',
      description: currentLocale === 'en-US' ? 'Create complex automations with our intuitive drag-and-drop interface' : currentLocale === 'pt-BR' ? 'Crie automações complexas com nossa interface intuitiva de arrastar e soltar' : 'Crea automatizaciones complejas con nuestra interfaz intuitiva de arrastrar y soltar',
      benefits: [
        currentLocale === 'en-US' ? 'No-code automation' : currentLocale === 'pt-BR' ? 'Automação sem código' : 'Automatización sin código',
        currentLocale === 'en-US' ? 'Real-time testing' : currentLocale === 'pt-BR' ? 'Teste em tempo real' : 'Pruebas en tiempo real',
        currentLocale === 'en-US' ? 'Version control' : currentLocale === 'pt-BR' ? 'Controle de versão' : 'Control de versiones',
        currentLocale === 'en-US' ? 'Collaborative editing' : currentLocale === 'pt-BR' ? 'Edição colaborativa' : 'Edición colaborativa',
      ],
    },
    {
      icon: '🤖',
      title: currentLocale === 'en-US' ? 'AI-Powered Intelligence' : currentLocale === 'pt-BR' ? 'Inteligência Alimentada por IA' : 'Inteligencia Alimentada por IA',
      description: currentLocale === 'en-US' ? 'Leverage advanced AI to make your workflows smarter and more efficient' : currentLocale === 'pt-BR' ? 'Aproveite a IA avançada para tornar seus fluxos de trabalho mais inteligentes e eficientes' : 'Aprovecha la IA avanzada para hacer tus flujos de trabajo más inteligentes y eficientes',
      benefits: [
        currentLocale === 'en-US' ? 'Natural language processing' : currentLocale === 'pt-BR' ? 'Processamento de linguagem natural' : 'Procesamiento de lenguaje natural',
        currentLocale === 'en-US' ? 'Predictive analytics' : currentLocale === 'pt-BR' ? 'Análise preditiva' : 'Análisis predictivo',
        currentLocale === 'en-US' ? 'Intelligent routing' : currentLocale === 'pt-BR' ? 'Roteamento inteligente' : 'Enrutamiento inteligente',
        currentLocale === 'en-US' ? 'Anomaly detection' : currentLocale === 'pt-BR' ? 'Detecção de anomalias' : 'Detección de anomalías',
      ],
    },
    {
      icon: '📊',
      title: currentLocale === 'en-US' ? 'Real-time Analytics' : currentLocale === 'pt-BR' ? 'Análise em Tempo Real' : 'Análisis en Tiempo Real',
      description: currentLocale === 'en-US' ? 'Monitor performance, identify bottlenecks, and optimize your processes' : currentLocale === 'pt-BR' ? 'Monitore o desempenho, identifique gargalos e otimize seus processos' : 'Monitorea el rendimiento, identifica cuellos de botella y optimiza tus procesos',
      benefits: [
        currentLocale === 'en-US' ? 'Live dashboard' : currentLocale === 'pt-BR' ? 'Painel ao vivo' : 'Panel en vivo',
        currentLocale === 'en-US' ? 'Custom metrics' : currentLocale === 'pt-BR' ? 'Métricas personalizadas' : 'Métricas personalizadas',
        currentLocale === 'en-US' ? 'Automated alerts' : currentLocale === 'pt-BR' ? 'Alertas automatizados' : 'Alertas automatizadas',
        currentLocale === 'en-US' ? 'Performance insights' : currentLocale === 'pt-BR' ? 'Insights de performance' : 'Insights de rendimiento',
      ],
    },
  ];

  const useCases = [
    {
      title: currentLocale === 'en-US' ? 'Customer Onboarding' : currentLocale === 'pt-BR' ? 'Onboarding de Clientes' : 'Onboarding de Clientes',
      description: currentLocale === 'en-US' ? 'Automate welcome sequences, document collection, and account setup' : currentLocale === 'pt-BR' ? 'Automatize sequências de boas-vindas, coleta de documentos e configuração de conta' : 'Automatiza secuencias de bienvenida, recolección de documentos y configuración de cuenta',
      metrics: {
        reduction: '75%',
        time: currentLocale === 'en-US' ? '2 hours' : currentLocale === 'pt-BR' ? '2 horas' : '2 horas',
        satisfaction: '94%',
      },
      icon: '👥',
    },
    {
      title: currentLocale === 'en-US' ? 'Sales Pipeline' : currentLocale === 'pt-BR' ? 'Pipeline de Vendas' : 'Pipeline de Ventas',
      description: currentLocale === 'en-US' ? 'Streamline lead qualification, follow-ups, and deal progression' : currentLocale === 'pt-BR' ? 'Otimize qualificação de leads, acompanhamentos e progressão de negócios' : 'Optimiza la calificación de leads, seguimientos y progresión de negocios',
      metrics: {
        reduction: '60%',
        time: currentLocale === 'en-US' ? '30 minutes' : currentLocale === 'pt-BR' ? '30 minutos' : '30 minutos',
        satisfaction: '89%',
      },
      icon: '💰',
    },
    {
      title: currentLocale === 'en-US' ? 'HR & Recruitment' : currentLocale === 'pt-BR' ? 'RH e Recrutamento' : 'RH y Reclutamiento',
      description: currentLocale === 'en-US' ? 'Automate candidate screening, interview scheduling, and onboarding' : currentLocale === 'pt-BR' ? 'Automatize triagem de candidatos, agendamento de entrevistas e onboarding' : 'Automatiza la selección de candidatos, programación de entrevistas y onboarding',
      metrics: {
        reduction: '80%',
        time: currentLocale === 'en-US' ? '4 hours' : currentLocale === 'pt-BR' ? '4 horas' : '4 horas',
        satisfaction: '92%',
      },
      icon: '🎯',
    },
  ];

  const testimonials = [
    {
      id: 'tech-corp',
      content: currentLocale === 'en-US' ? 'SPARK transformed our entire operation. We automated 15 critical processes and reduced manual work by 70%. The ROI was immediate and substantial.' : currentLocale === 'pt-BR' ? 'SPARK transformou toda nossa operação. Automatizamos 15 processos críticos e reduzimos o trabalho manual em 70%. O ROI foi imediato e substancial.' : 'SPARK transformó toda nuestra operación. Automatizamos 15 procesos críticos y redujimos el trabajo manual en 70%. El ROI fue inmediato y sustancial.',
      author: {
        name: 'Ana María Santos',
        role: currentLocale === 'en-US' ? 'Operations Director' : currentLocale === 'pt-BR' ? 'Diretora de Operações' : 'Directora de Operaciones',
        company: 'TechCorp Solutions',
        image: '/testimonials/ana-santos.jpg',
      },
      rating: 5,
      service: 'SPARK',
      results: [
        { 
          metric: currentLocale === 'en-US' ? 'Process automation' : currentLocale === 'pt-BR' ? 'Automação de processos' : 'Automatización de procesos', 
          value: '15', 
          description: currentLocale === 'en-US' ? 'Critical workflows' : currentLocale === 'pt-BR' ? 'Fluxos críticos' : 'Flujos críticos' 
        },
        { 
          metric: currentLocale === 'en-US' ? 'Time savings' : currentLocale === 'pt-BR' ? 'Economia de tempo' : 'Ahorro de tiempo', 
          value: '70%', 
          description: currentLocale === 'en-US' ? 'Manual work reduction' : currentLocale === 'pt-BR' ? 'Redução de trabalho manual' : 'Reducción de trabajo manual' 
        },
      ],
    },
    {
      id: 'innovate-group',
      content: currentLocale === 'en-US' ? 'The integration capabilities of SPARK are outstanding. We connected our entire tech stack in weeks, not months. Our team productivity increased by 40%.' : currentLocale === 'pt-BR' ? 'As capacidades de integração do SPARK são excepcionais. Conectamos toda nossa stack tecnológica em semanas, não meses. A produtividade da equipe aumentou 40%.' : 'Las capacidades de integración de SPARK son excepcionales. Conectamos toda nuestra stack tecnológica en semanas, no meses. La productividad del equipo aumentó 40%.',
      author: {
        name: 'Carlos Mendoza',
        role: currentLocale === 'en-US' ? 'CTO' : currentLocale === 'pt-BR' ? 'CTO' : 'CTO',
        company: 'Innovate Group',
        image: '/testimonials/carlos-mendoza.jpg',
      },
      rating: 5,
      service: 'SPARK',
      results: [
        { 
          metric: currentLocale === 'en-US' ? 'Integration speed' : currentLocale === 'pt-BR' ? 'Velocidade de integração' : 'Velocidad de integración', 
          value: '5x', 
          description: currentLocale === 'en-US' ? 'Faster than manual' : currentLocale === 'pt-BR' ? 'Mais rápido que manual' : 'Más rápido que manual' 
        },
        { 
          metric: currentLocale === 'en-US' ? 'Productivity gain' : currentLocale === 'pt-BR' ? 'Ganho de produtividade' : 'Ganancia de productividad', 
          value: '40%', 
          description: currentLocale === 'en-US' ? 'Team efficiency' : currentLocale === 'pt-BR' ? 'Eficiência da equipe' : 'Eficiencia del equipo' 
        },
      ],
    },
  ];

  const pricingPlans = [
    {
      name: currentLocale === 'en-US' ? 'Professional' : currentLocale === 'pt-BR' ? 'Profissional' : 'Profesional',
      price: '50,000',
      currency: 'MXN',
      period: currentLocale === 'en-US' ? 'month' : currentLocale === 'pt-BR' ? 'mês' : 'mes',
      description: currentLocale === 'en-US' ? 'Perfect for growing businesses' : currentLocale === 'pt-BR' ? 'Perfeito para negócios em crescimento' : 'Perfecto para negocios en crecimiento',
      features: [
        currentLocale === 'en-US' ? 'Up to 500 integrations' : currentLocale === 'pt-BR' ? 'Até 500 integrações' : 'Hasta 500 integraciones',
        currentLocale === 'en-US' ? 'Visual workflow builder' : currentLocale === 'pt-BR' ? 'Construtor de fluxo visual' : 'Constructor de flujo visual',
        currentLocale === 'en-US' ? 'Real-time analytics' : currentLocale === 'pt-BR' ? 'Análise em tempo real' : 'Análisis en tiempo real',
        currentLocale === 'en-US' ? 'Priority support' : currentLocale === 'pt-BR' ? 'Suporte prioritário' : 'Soporte prioritario',
        currentLocale === 'en-US' ? 'Custom workflows' : currentLocale === 'pt-BR' ? 'Fluxos personalizados' : 'Flujos personalizados',
      ],
      cta: currentLocale === 'en-US' ? 'Start Professional' : currentLocale === 'pt-BR' ? 'Começar Profissional' : 'Iniciar Profesional',
      popular: true,
    },
    {
      name: currentLocale === 'en-US' ? 'Enterprise' : currentLocale === 'pt-BR' ? 'Empresarial' : 'Empresarial',
      price: currentLocale === 'en-US' ? 'Custom' : currentLocale === 'pt-BR' ? 'Personalizado' : 'Personalizado',
      currency: '',
      period: '',
      description: currentLocale === 'en-US' ? 'For large organizations' : currentLocale === 'pt-BR' ? 'Para grandes organizações' : 'Para grandes organizaciones',
      features: [
        currentLocale === 'en-US' ? 'Unlimited integrations' : currentLocale === 'pt-BR' ? 'Integrações ilimitadas' : 'Integraciones ilimitadas',
        currentLocale === 'en-US' ? 'Advanced AI features' : currentLocale === 'pt-BR' ? 'Recursos avançados de IA' : 'Características avanzadas de IA',
        currentLocale === 'en-US' ? 'Dedicated success manager' : currentLocale === 'pt-BR' ? 'Gerente de sucesso dedicado' : 'Gerente de éxito dedicado',
        currentLocale === 'en-US' ? 'SLA guarantee' : currentLocale === 'pt-BR' ? 'Garantia SLA' : 'Garantía SLA',
        currentLocale === 'en-US' ? 'Custom integrations' : currentLocale === 'pt-BR' ? 'Integrações personalizadas' : 'Integraciones personalizadas',
        currentLocale === 'en-US' ? 'White-label options' : currentLocale === 'pt-BR' ? 'Opções white-label' : 'Opciones white-label',
      ],
      cta: currentLocale === 'en-US' ? 'Contact Sales' : currentLocale === 'pt-BR' ? 'Contatar Vendas' : 'Contactar Ventas',
      popular: false,
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero
        variant="product"
        title="SPARK"
        subtitle={currentLocale === 'en-US' ? 'AI Orchestration Platform' : currentLocale === 'pt-BR' ? 'Plataforma de Orquestração de IA' : 'Plataforma de Orquestación de IA'}
        description={currentLocale === 'en-US' ? 'Connect, automate, and optimize all your business processes with artificial intelligence. A unified platform that transforms the way you work.' : currentLocale === 'pt-BR' ? 'Conecte, automatize e otimize todos os seus processos empresariais com inteligência artificial. Uma plataforma unificada que transforma a forma como você trabalha.' : 'Conecta, automatiza y optimiza todos tus procesos empresariales con inteligencia artificial. Una plataforma unificada que transforma la forma en que trabajas.'}
        cta={{
          primary: {
            text: currentLocale === 'en-US' ? 'Request demo' : currentLocale === 'pt-BR' ? 'Solicitar demo' : 'Solicitar demo',
            href: '#demo',
            variant: 'creative',
          },
          secondary: {
            text: currentLocale === 'en-US' ? 'View documentation' : currentLocale === 'pt-BR' ? 'Ver documentação' : 'Ver documentación',
            href: '#documentation',
            variant: 'outline',
          },
        }}
        background="gradient"
        className="pt-20"
      >
        <div className="grid grid-cols-3 gap-8 text-center text-white/90">
          <div>
            <div className="text-2xl font-bold text-sun">1000+</div>
            <div className="text-sm">{currentLocale === 'en-US' ? 'Integrations' : currentLocale === 'pt-BR' ? 'Integrações' : 'Integraciones'}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-sun">80%</div>
            <div className="text-sm">{currentLocale === 'en-US' ? 'Time saved' : currentLocale === 'pt-BR' ? 'Tempo economizado' : 'Tiempo ahorrado'}</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-sun">24/7</div>
            <div className="text-sm">{currentLocale === 'en-US' ? 'Support' : currentLocale === 'pt-BR' ? 'Suporte' : 'Soporte'}</div>
          </div>
        </div>
      </Hero>

      {/* Features Section */}
      <section className="section">
        <Container>
          <div className="text-center mb-16">
            <Heading level={2} className="mb-4">
              {currentLocale === 'en-US' ? 'Powerful features for modern businesses' : currentLocale === 'pt-BR' ? 'Recursos poderosos para negócios modernos' : 'Características poderosas para negocios modernos'}
            </Heading>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {currentLocale === 'en-US' ? 'SPARK provides enterprise-grade capabilities with an intuitive interface, making automation accessible to everyone in your organization.' : currentLocale === 'pt-BR' ? 'SPARK fornece capacidades de nível empresarial com uma interface intuitiva, tornando a automação acessível para todos na sua organização.' : 'SPARK proporciona capacidades de nivel empresarial con una interfaz intuitiva, haciendo la automatización accesible para todos en tu organización.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {sparkFeatures.map((feature, index) => (
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
              {currentLocale === 'en-US' ? 'Real-world use cases' : currentLocale === 'pt-BR' ? 'Casos de uso do mundo real' : 'Casos de uso del mundo real'}
            </Heading>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {currentLocale === 'en-US' ? 'See how companies like yours are using SPARK to transform their operations and achieve remarkable results.' : currentLocale === 'pt-BR' ? 'Veja como empresas como a sua estão usando SPARK para transformar suas operações e alcançar resultados notáveis.' : 'Mira cómo empresas como la tuya están usando SPARK para transformar sus operaciones y lograr resultados notables.'}
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
                      <div className="text-2xl font-bold text-leaf">{useCase.metrics.reduction}</div>
                      <div className="text-gray-500">{currentLocale === 'en-US' ? 'Reduction' : currentLocale === 'pt-BR' ? 'Redução' : 'Reducción'}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-sun">{useCase.metrics.time}</div>
                      <div className="text-gray-500">{currentLocale === 'en-US' ? 'To complete' : currentLocale === 'pt-BR' ? 'Para completar' : 'Para completar'}</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-lavender">{useCase.metrics.satisfaction}</div>
                      <div className="text-gray-500">{currentLocale === 'en-US' ? 'Satisfaction' : currentLocale === 'pt-BR' ? 'Satisfação' : 'Satisfacción'}</div>
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
              {currentLocale === 'en-US' ? 'What our customers say' : currentLocale === 'pt-BR' ? 'O que nossos clientes dizem' : 'Lo que dicen nuestros clientes'}
            </Heading>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {currentLocale === 'en-US' ? 'Join hundreds of companies that have transformed their operations with SPARK.' : currentLocale === 'pt-BR' ? 'Junte-se a centenas de empresas que transformaram suas operações com SPARK.' : 'Únete a cientos de empresas que han transformado sus operaciones con SPARK.'}
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
              {currentLocale === 'en-US' ? 'Choose the right plan' : currentLocale === 'pt-BR' ? 'Escolha o plano certo' : 'Elige el plan correcto'}
            </Heading>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {currentLocale === 'en-US' ? 'Start with our Professional plan or get a custom Enterprise solution for your organization.' : currentLocale === 'pt-BR' ? 'Comece com nosso plano Profissional ou obtenha uma solução Empresarial personalizada para sua organização.' : 'Comienza con nuestro plan Profesional u obtén una solución Empresarial personalizada para tu organización.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-lavender ring-2 ring-lavender/20' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-lavender text-white px-4 py-1 rounded-full text-sm font-medium">
                      {currentLocale === 'en-US' ? 'Most Popular' : currentLocale === 'pt-BR' ? 'Mais Popular' : 'Más Popular'}
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="font-heading text-2xl mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.currency && (
                      <>
                        <span className="text-lg text-gray-600 dark:text-gray-400 ml-1">{plan.currency}</span>
                        <span className="text-gray-600 dark:text-gray-400">/{plan.period}</span>
                      </>
                    )}
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
                    onClick={() => logServiceInquiry('L4_PLATFORMS', 'spark-pricing', { plan: plan.name, locale: currentLocale })}
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
                {currentLocale === 'en-US' ? 'Calculate your SPARK ROI' : currentLocale === 'pt-BR' ? 'Calcule seu ROI do SPARK' : 'Calcula tu ROI de SPARK'}
              </Heading>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {currentLocale === 'en-US' ? 'See the potential impact SPARK can have on your business operations and bottom line.' : currentLocale === 'pt-BR' ? 'Veja o impacto potencial que SPARK pode ter em suas operações empresariais e resultado final.' : 'Mira el impacto potencial que SPARK puede tener en tus operaciones empresariales y resultado final.'}
              </p>
            </div>
            
            <ROICalculator
              serviceTier="L4_PLATFORMS"
              title={currentLocale === 'en-US' ? 'SPARK ROI Calculator' : currentLocale === 'pt-BR' ? 'Calculadora ROI SPARK' : 'Calculadora ROI SPARK'}
              onCalculate={(results) => {
                logServiceInquiry('L4_PLATFORMS', 'spark-roi-calculator', {
                  results,
                  locale: currentLocale,
                });
              }}
            />
          </div>
        </Container>
      </section>

      {/* Demo Request Section */}
      <section id="demo" className="section bg-pearl">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Heading level={2} className="mb-4">
                {currentLocale === 'en-US' ? 'Request a personalized demo' : currentLocale === 'pt-BR' ? 'Solicite uma demonstração personalizada' : 'Solicita una demostración personalizada'}
              </Heading>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {currentLocale === 'en-US' ? 'See SPARK in action with a tailored demonstration based on your specific use cases and industry.' : currentLocale === 'pt-BR' ? 'Veja SPARK em ação com uma demonstração personalizada baseada em seus casos de uso específicos e indústria.' : 'Mira SPARK en acción con una demostración personalizada basada en tus casos de uso específicos e industria.'}
              </p>
            </div>
            
            <LeadForm
              variant="progressive"
              tier="L4_PLATFORMS"
              source="spark-demo-request"
              title={currentLocale === 'en-US' ? 'Request SPARK demo' : currentLocale === 'pt-BR' ? 'Solicitar demo SPARK' : 'Solicitar demo SPARK'}
              description={currentLocale === 'en-US' ? 'Tell us about your business needs and we\'ll customize the demo to show you exactly how SPARK can help.' : currentLocale === 'pt-BR' ? 'Conte-nos sobre suas necessidades empresariais e personalizaremos a demonstração para mostrar exatamente como SPARK pode ajudar.' : 'Cuéntanos sobre tus necesidades empresariales y personalizaremos la demostración para mostrar exactamente cómo SPARK puede ayudar.'}
              submitText={currentLocale === 'en-US' ? 'Schedule demo' : currentLocale === 'pt-BR' ? 'Agendar demo' : 'Agendar demo'}
              onSubmit={async (data) => {
                logServiceInquiry('L4_PLATFORMS', 'spark-demo-form', {
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
              title={currentLocale === 'en-US' ? 'Stay updated with SPARK' : currentLocale === 'pt-BR' ? 'Mantenha-se atualizado com SPARK' : 'Mantente actualizado con SPARK'}
              description={currentLocale === 'en-US' ? 'Get the latest product updates, automation tips, and industry insights.' : currentLocale === 'pt-BR' ? 'Receba as últimas atualizações do produto, dicas de automação e insights da indústria.' : 'Recibe las últimas actualizaciones del producto, consejos de automatización e insights de la industria.'}
              buttonText={currentLocale === 'en-US' ? 'Subscribe' : currentLocale === 'pt-BR' ? 'Inscrever' : 'Suscribirse'}
              onSubscribe={async (email) => {
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