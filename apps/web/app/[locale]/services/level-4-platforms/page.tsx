import { serviceTiers, ServiceTier } from '@madfam/core';
import { getLocalizedContent, type Locale } from '@madfam/i18n';
import { Container, Heading, Button } from '@madfam/ui';
import Link from 'next/link';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { ServiceCard } from '@/components/ServiceCard';

export default async function Level4PlatformsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const service = serviceTiers[ServiceTier.L4_PLATFORMS];
  const t = await getTranslations('services');
  const currentLocale = locale as Locale;

  // Get localized content from service object
  const serviceDescription = getLocalizedContent(service.description, currentLocale);
  const otherServices = [
    serviceTiers[ServiceTier.L3_CONSULTING],
    serviceTiers[ServiceTier.L5_STRATEGIC],
  ];

  const platforms = [
    {
      name: 'SPARK',
      tagline: t('level4.platforms.spark.title'),
      description: t('level4.platforms.spark.description'),
      features: [
        t('level4.platforms.spark.features.0'),
        t('level4.platforms.spark.features.1'),
        t('level4.platforms.spark.features.2'),
        t('level4.platforms.spark.features.3'),
        currentLocale === 'en'
          ? 'Open API and webhooks'
          : currentLocale === 'pt-br'
            ? 'API aberta e webhooks'
            : 'API abierta y webhooks',
      ],
      benefits: [
        currentLocale === 'en'
          ? '70% reduction in process time'
          : currentLocale === 'pt-br'
            ? '70% redução no tempo de processos'
            : '70% reducción en tiempo de procesos',
        currentLocale === 'en'
          ? 'ROI in less than 6 months'
          : currentLocale === 'pt-br'
            ? 'ROI em menos de 6 meses'
            : 'ROI en menos de 6 meses',
        currentLocale === 'en'
          ? 'Infinite scalability'
          : currentLocale === 'pt-br'
            ? 'Escalabilidade infinita'
            : 'Escalabilidad infinita',
      ],
      icon: '⚡',
      color: 'from-lavender to-sun',
    },
    {
      name: 'PENNY',
      tagline: t('level4.platforms.penny.title'),
      description: t('level4.platforms.penny.description'),
      features: [
        t('level4.platforms.penny.features.0'),
        t('level4.platforms.penny.features.1'),
        t('level4.platforms.penny.features.2'),
        t('level4.platforms.penny.features.3'),
        'Self-healing workflows',
      ],
      benefits: [
        currentLocale === 'en'
          ? '85% fewer human errors'
          : currentLocale === 'pt-br'
            ? '85% menos erros humanos'
            : '85% menos errores humanos',
        currentLocale === 'en'
          ? '24/7 continuous operation'
          : currentLocale === 'pt-br'
            ? '24/7 operação contínua'
            : '24/7 operación continua',
        currentLocale === 'en'
          ? '3x team productivity'
          : currentLocale === 'pt-br'
            ? '3x produtividade da equipe'
            : '3x productividad del equipo',
      ],
      icon: '🤖',
      color: 'from-leaf to-sun',
    },
  ];

  const implementation = {
    phases: [
      {
        name: 'Discovery & Planning',
        duration: `2-3 ${currentLocale === 'en' ? 'weeks' : currentLocale === 'pt-br' ? 'semanas' : 'semanas'}`,
        deliverables: [
          currentLocale === 'en'
            ? 'Current process audit'
            : currentLocale === 'pt-br'
              ? 'Auditoria de processos atuais'
              : 'Auditoría de procesos actuales',
          currentLocale === 'en'
            ? 'Automation opportunities map'
            : currentLocale === 'pt-br'
              ? 'Mapa de oportunidades de automação'
              : 'Mapa de oportunidades de automatización',
          currentLocale === 'en'
            ? 'Solution architecture'
            : currentLocale === 'pt-br'
              ? 'Arquitetura de solução'
              : 'Arquitectura de solución',
          currentLocale === 'en'
            ? 'Implementation roadmap'
            : currentLocale === 'pt-br'
              ? 'Roadmap de implementação'
              : 'Roadmap de implementación',
        ],
      },
      {
        name: 'Setup & Configuration',
        duration: `4-6 ${currentLocale === 'en' ? 'weeks' : currentLocale === 'pt-br' ? 'semanas' : 'semanas'}`,
        deliverables: [
          currentLocale === 'en'
            ? 'Installation and configuration'
            : currentLocale === 'pt-br'
              ? 'Instalação e configuração'
              : 'Instalación y configuración',
          currentLocale === 'en'
            ? 'Core integrations'
            : currentLocale === 'pt-br'
              ? 'Integrações principais'
              : 'Integraciones core',
          currentLocale === 'en'
            ? 'Main workflows'
            : currentLocale === 'pt-br'
              ? 'Workflows principais'
              : 'Workflows principales',
          currentLocale === 'en'
            ? 'Test environment'
            : currentLocale === 'pt-br'
              ? 'Ambiente de testes'
              : 'Ambiente de pruebas',
        ],
      },
      {
        name: 'Pilot & Testing',
        duration: `2-4 ${currentLocale === 'en' ? 'weeks' : currentLocale === 'pt-br' ? 'semanas' : 'semanas'}`,
        deliverables: [
          currentLocale === 'en'
            ? 'Pilot with selected team'
            : currentLocale === 'pt-br'
              ? 'Piloto com equipe selecionada'
              : 'Piloto con equipo selecto',
          currentLocale === 'en'
            ? 'Adjustments and optimization'
            : currentLocale === 'pt-br'
              ? 'Ajustes e otimização'
              : 'Ajustes y optimización',
          currentLocale === 'en'
            ? 'Process documentation'
            : currentLocale === 'pt-br'
              ? 'Documentação de processos'
              : 'Documentación de procesos',
          currentLocale === 'en'
            ? 'Performance metrics'
            : currentLocale === 'pt-br'
              ? 'Métricas de performance'
              : 'Métricas de performance',
        ],
      },
      {
        name: 'Rollout & Training',
        duration: `2-3 ${currentLocale === 'en' ? 'weeks' : currentLocale === 'pt-br' ? 'semanas' : 'semanas'}`,
        deliverables: [
          currentLocale === 'en'
            ? 'Full deployment'
            : currentLocale === 'pt-br'
              ? 'Implantação completa'
              : 'Despliegue completo',
          currentLocale === 'en'
            ? 'User training'
            : currentLocale === 'pt-br'
              ? 'Capacitação de usuários'
              : 'Capacitación de usuarios',
          currentLocale === 'en'
            ? 'Operational playbooks'
            : currentLocale === 'pt-br'
              ? 'Playbooks operacionais'
              : 'Playbooks operativos',
          currentLocale === 'en'
            ? 'Center of excellence'
            : currentLocale === 'pt-br'
              ? 'Centro de excelência'
              : 'Centro de excelencia',
        ],
      },
    ],
    support: {
      title:
        currentLocale === 'en'
          ? 'Continuous Support'
          : currentLocale === 'pt-br'
            ? 'Suporte Contínuo'
            : 'Soporte Continuo',
      features: [
        currentLocale === 'en'
          ? '99.9% guaranteed SLA'
          : currentLocale === 'pt-br'
            ? 'SLA garantido 99.9%'
            : 'SLA garantizado 99.9%',
        currentLocale === 'en'
          ? '24/7 support'
          : currentLocale === 'pt-br'
            ? 'Suporte 24/7'
            : 'Soporte 24/7',
        currentLocale === 'en'
          ? 'Monthly updates'
          : currentLocale === 'pt-br'
            ? 'Atualizações mensais'
            : 'Actualizaciones mensuales',
        currentLocale === 'en'
          ? 'Continuous optimization'
          : currentLocale === 'pt-br'
            ? 'Otimização contínua'
            : 'Optimización continua',
        currentLocale === 'en'
          ? 'Access to new features'
          : currentLocale === 'pt-br'
            ? 'Acesso a novas funcionalidades'
            : 'Acceso a nuevas features',
      ],
    },
  };

  const roi = {
    metrics: [
      {
        label:
          currentLocale === 'en'
            ? 'Operational cost reduction'
            : currentLocale === 'pt-br'
              ? 'Redução de custos operacionais'
              : 'Reducción de costos operativos',
        value: '45-60%',
      },
      {
        label:
          currentLocale === 'en'
            ? 'Productivity increase'
            : currentLocale === 'pt-br'
              ? 'Aumento de produtividade'
              : 'Incremento en productividad',
        value: '3-5x',
      },
      {
        label:
          currentLocale === 'en'
            ? 'Error reduction'
            : currentLocale === 'pt-br'
              ? 'Redução de erros'
              : 'Reducción de errores',
        value: '85-95%',
      },
      {
        label:
          currentLocale === 'en'
            ? 'ROI time'
            : currentLocale === 'pt-br'
              ? 'Tempo de ROI'
              : 'Tiempo de ROI',
        value: `4-8 ${currentLocale === 'en' ? 'months' : currentLocale === 'pt-br' ? 'meses' : 'meses'}`,
      },
    ],
    testimonial: {
      quote:
        currentLocale === 'en'
          ? 'SPARK completely transformed our operation. What used to take days, now takes hours.'
          : currentLocale === 'pt-br'
            ? 'SPARK transformou completamente nossa operação. O que antes levava dias, agora é feito em horas.'
            : 'SPARK transformó completamente nuestra operación. Lo que antes tomaba días, ahora se hace en horas.',
      author: 'María González',
      role: 'COO, TechCorp México',
      metric:
        currentLocale === 'en'
          ? '70% reduction in cycle time'
          : currentLocale === 'pt-br'
            ? '70% redução no tempo de ciclo'
            : '70% reducción en tiempo de ciclo',
    },
  };

  const integrations = [
    { name: 'Salesforce', category: 'CRM' },
    { name: 'HubSpot', category: 'Marketing' },
    { name: 'SAP', category: 'ERP' },
    {
      name: 'Slack',
      category:
        currentLocale === 'en'
          ? 'Communication'
          : currentLocale === 'pt-br'
            ? 'Comunicação'
            : 'Comunicación',
    },
    {
      name: 'Google Workspace',
      category:
        currentLocale === 'en'
          ? 'Productivity'
          : currentLocale === 'pt-br'
            ? 'Produtividade'
            : 'Productividad',
    },
    {
      name: 'Microsoft 365',
      category:
        currentLocale === 'en'
          ? 'Productivity'
          : currentLocale === 'pt-br'
            ? 'Produtividade'
            : 'Productividad',
    },
    { name: 'AWS', category: 'Cloud' },
    {
      name: 'Stripe',
      category:
        currentLocale === 'en' ? 'Payments' : currentLocale === 'pt-br' ? 'Pagamentos' : 'Pagos',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-lavender/10 to-leaf/10 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-lavender rounded-full filter blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-leaf rounded-full filter blur-3xl animate-float animation-delay-400" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-lavender/20 to-leaf/20 text-obsidian">
                {t('level4.hero.badge')}
              </span>
            </div>
            <Heading level={1} className="mb-6">
              {t('level4.hero.title')}
            </Heading>
            <p className="text-xl text-obsidian/70 mb-8 max-w-3xl">{serviceDescription}</p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Button variant="creative" size="lg">
                {t('level4.hero.requestDemo')}
              </Button>
              <Button variant="outline" size="lg">
                {currentLocale === 'en'
                  ? 'Calculate ROI'
                  : currentLocale === 'pt-br'
                    ? 'Calcular ROI'
                    : 'Calcular ROI'}
              </Button>
            </div>

            {/* Platform badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur">
                <span className="text-2xl">⚡</span>
                <span className="font-semibold">SPARK Platform</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur">
                <span className="text-2xl">🤖</span>
                <span className="font-semibold">PENNY Automation</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Platforms Detail */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {t('level4.platforms.title')}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {t('level4.platforms.subtitle')}
            </p>
          </div>

          <div className="space-y-12">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden"
              >
                <div className="p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-5xl">{platform.icon}</span>
                        <div>
                          <h3 className="font-heading text-3xl font-bold">{platform.name}</h3>
                          <p className="text-lg text-obsidian/60">{platform.tagline}</p>
                        </div>
                      </div>

                      <p className="text-lg text-obsidian/70 mb-6">{platform.description}</p>

                      <div className="mb-8">
                        <h4 className="font-semibold mb-3">
                          {currentLocale === 'en'
                            ? 'Main features:'
                            : currentLocale === 'pt-br'
                              ? 'Características principais:'
                              : 'Características principales:'}
                        </h4>
                        <ul className="space-y-2">
                          {platform.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-green-500 mr-2 mt-0.5">✓</span>
                              <span className="text-obsidian/70">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button variant="primary" className={`bg-gradient-to-r ${platform.color}`}>
                        {currentLocale === 'en'
                          ? 'Explore'
                          : currentLocale === 'pt-br'
                            ? 'Explorar'
                            : 'Explorar'}{' '}
                        {platform.name}
                      </Button>
                    </div>

                    <div>
                      <div
                        className={`relative h-96 rounded-2xl bg-gradient-to-br ${platform.color} p-8`}
                      >
                        <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow-xl">
                          <h4 className="font-semibold mb-4">
                            {currentLocale === 'en'
                              ? 'Key benefits:'
                              : currentLocale === 'pt-br'
                                ? 'Benefícios chave:'
                                : 'Beneficios clave:'}
                          </h4>
                          <ul className="space-y-3">
                            {platform.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-center">
                                <span className="text-2xl mr-3">📈</span>
                                <span className="font-medium">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Implementation Process */}
      <section className="section bg-pearl">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {t('level4.implementation.title')}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {t('level4.implementation.subtitle')}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {implementation.phases.map((phase, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-lavender">{index + 1}</span>
                    <span className="text-sm text-obsidian/60">{phase.duration}</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-3">{phase.name}</h3>
                  <ul className="space-y-1">
                    {phase.deliverables.map((item, idx) => (
                      <li key={idx} className="text-sm text-obsidian/70">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-obsidian to-obsidian/90 rounded-3xl p-8 text-white text-center">
              <h3 className="font-heading text-2xl font-bold mb-6">
                {implementation.support.title}
              </h3>
              <div className="grid md:grid-cols-5 gap-6">
                {implementation.support.features.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl mb-2">✨</div>
                    <p className="text-sm">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ROI Section */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {currentLocale === 'en'
                ? 'Guaranteed ROI'
                : currentLocale === 'pt-br'
                  ? 'ROI garantido'
                  : 'ROI garantizado'}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {currentLocale === 'en'
                ? 'Numbers that speak for themselves'
                : currentLocale === 'pt-br'
                  ? 'Números que falam por si mesmos'
                  : 'Números que hablan por sí solos'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <div className="grid grid-cols-2 gap-6">
                {roi.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="text-center p-6 rounded-2xl bg-gradient-to-br from-lavender/10 to-leaf/10"
                  >
                    <p className="text-3xl font-heading font-bold mb-2">{metric.value}</p>
                    <p className="text-sm text-obsidian/70">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-5xl mb-4">💬</div>
              <blockquote className="text-lg mb-6 italic">
                &quot;{roi.testimonial.quote}&quot;
              </blockquote>
              <div>
                <p className="font-semibold">{roi.testimonial.author}</p>
                <p className="text-obsidian/60">{roi.testimonial.role}</p>
                <p className="text-green-600 font-medium mt-2">{roi.testimonial.metric}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Integrations */}
      <section className="section bg-gradient-to-br from-lavender/5 to-leaf/5">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {currentLocale === 'en'
                ? 'Connect your entire ecosystem'
                : currentLocale === 'pt-br'
                  ? 'Conecte todo o seu ecossistema'
                  : 'Conecta todo tu ecosistema'}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {currentLocale === 'en'
                ? 'Over 100 ready-to-use integrations'
                : currentLocale === 'pt-br'
                  ? 'Mais de 100 integrações prontas para usar'
                  : 'Más de 100 integraciones listas para usar'}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
            {integrations.map((integration, index) => (
              <div key={index} className="px-6 py-3 rounded-full bg-white shadow-sm">
                <span className="font-medium">{integration.name}</span>
                <span className="text-obsidian/40 ml-2">• {integration.category}</span>
              </div>
            ))}
            <div className="px-6 py-3 rounded-full bg-gradient-to-r from-lavender to-leaf text-white">
              <span className="font-medium">
                +90{' '}
                {currentLocale === 'en'
                  ? 'more...'
                  : currentLocale === 'pt-br'
                    ? 'mais...'
                    : 'más...'}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Other Services */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {currentLocale === 'en'
                ? 'Complementary services'
                : currentLocale === 'pt-br'
                  ? 'Serviços complementares'
                  : 'Servicios complementarios'}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {currentLocale === 'en'
                ? 'Maximize your investment value with additional services'
                : currentLocale === 'pt-br'
                  ? 'Maximize o valor do seu investimento com serviços adicionais'
                  : 'Maximiza el valor de tu inversión con servicios adicionales'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {otherServices.map(relatedService => (
              <ServiceCard key={relatedService.id} service={relatedService} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-lavender to-leaf text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Heading level={2} className="text-white mb-6">
              {currentLocale === 'en'
                ? 'Transform your business with SPARK and PENNY'
                : currentLocale === 'pt-br'
                  ? 'Transforme sua empresa com SPARK e PENNY'
                  : 'Transforma tu empresa con SPARK y PENNY'}
            </Heading>
            <p className="text-xl text-white/90 mb-8">
              {currentLocale === 'en'
                ? 'Schedule a personalized demo and discover how to automate your entire operation'
                : currentLocale === 'pt-br'
                  ? 'Agende uma demonstração personalizada e descubra como automatizar toda a sua operação'
                  : 'Agenda una demo personalizada y descubre cómo automatizar tu operación completa'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="secondary" size="lg">
                {currentLocale === 'en'
                  ? 'Schedule executive demo'
                  : currentLocale === 'pt-br'
                    ? 'Agendar demo executiva'
                    : 'Agendar demo ejecutivo'}
              </Button>
              <Link href="/calculator">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-lavender"
                >
                  {currentLocale === 'en'
                    ? 'Calculate potential savings'
                    : currentLocale === 'pt-br'
                      ? 'Calcular economia potencial'
                      : 'Calcular ahorro potencial'}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
