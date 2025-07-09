import { Container, Heading, Button } from '@madfam/ui';
import { serviceTiers, ServiceTier } from '@madfam/core';
import Link from 'next/link';
import { ServiceCard } from '@/components/ServiceCard';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function Level4PlatformsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const service = serviceTiers[ServiceTier.L4_PLATFORMS];
  const otherServices = [
    serviceTiers[ServiceTier.L3_CONSULTING],
    serviceTiers[ServiceTier.L5_STRATEGIC],
  ];

  const platforms = [
    {
      name: 'SPARK',
      tagline: 'Orquestación de IA Empresarial',
      description: 'Plataforma que conecta, automatiza y optimiza todos tus procesos con inteligencia artificial',
      features: [
        'Integración con 100+ herramientas',
        'Workflows visuales sin código',
        'IA conversacional integrada',
        'Analytics en tiempo real',
        'API abierta y webhooks',
      ],
      benefits: [
        '70% reducción en tiempo de procesos',
        'ROI en menos de 6 meses',
        'Escalabilidad infinita',
      ],
      icon: '⚡',
      color: 'from-lavender to-sun',
    },
    {
      name: 'PENNY',
      tagline: 'Automatización Inteligente',
      description: 'RPA de nueva generación que aprende, adapta y mejora continuamente tus operaciones',
      features: [
        'Aprendizaje automático',
        'Procesamiento de documentos',
        'Automatización de decisiones',
        'Monitoreo predictivo',
        'Self-healing workflows',
      ],
      benefits: [
        '85% menos errores humanos',
        '24/7 operación continua',
        '3x productividad del equipo',
      ],
      icon: '🤖',
      color: 'from-leaf to-sun',
    },
  ];

  const implementation = {
    phases: [
      {
        name: 'Discovery & Planning',
        duration: '2-3 semanas',
        deliverables: [
          'Auditoría de procesos actuales',
          'Mapa de oportunidades de automatización',
          'Arquitectura de solución',
          'Roadmap de implementación',
        ],
      },
      {
        name: 'Setup & Configuration',
        duration: '4-6 semanas',
        deliverables: [
          'Instalación y configuración',
          'Integraciones core',
          'Workflows principales',
          'Ambiente de pruebas',
        ],
      },
      {
        name: 'Pilot & Testing',
        duration: '2-4 semanas',
        deliverables: [
          'Piloto con equipo selecto',
          'Ajustes y optimización',
          'Documentación de procesos',
          'Métricas de performance',
        ],
      },
      {
        name: 'Rollout & Training',
        duration: '2-3 semanas',
        deliverables: [
          'Despliegue completo',
          'Capacitación de usuarios',
          'Playbooks operativos',
          'Centro de excelencia',
        ],
      },
    ],
    support: {
      title: 'Soporte Continuo',
      features: [
        'SLA garantizado 99.9%',
        'Soporte 24/7',
        'Actualizaciones mensuales',
        'Optimización continua',
        'Acceso a nuevas features',
      ],
    },
  };

  const roi = {
    metrics: [
      { label: 'Reducción de costos operativos', value: '45-60%' },
      { label: 'Incremento en productividad', value: '3-5x' },
      { label: 'Reducción de errores', value: '85-95%' },
      { label: 'Tiempo de ROI', value: '4-8 meses' },
    ],
    testimonial: {
      quote: 'SPARK transformó completamente nuestra operación. Lo que antes tomaba días, ahora se hace en horas.',
      author: 'María González',
      role: 'COO, TechCorp México',
      metric: '70% reducción en tiempo de ciclo',
    },
  };

  const integrations = [
    { name: 'Salesforce', category: 'CRM' },
    { name: 'HubSpot', category: 'Marketing' },
    { name: 'SAP', category: 'ERP' },
    { name: 'Slack', category: 'Comunicación' },
    { name: 'Google Workspace', category: 'Productividad' },
    { name: 'Microsoft 365', category: 'Productividad' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Stripe', category: 'Pagos' },
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
                Nivel 4 • Platforms
              </span>
            </div>
            <Heading level={1} className="mb-6">
              Plataformas empresariales que <span className="gradient-text">transforman negocios</span>
            </Heading>
            <p className="text-xl text-obsidian/70 mb-8 max-w-3xl">
              {service.description}. La solución definitiva para empresas que buscan 
              automatización total y ventaja competitiva sostenible.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Button variant="creative" size="lg">
                Ver demo personalizado
              </Button>
              <Button variant="outline" size="lg">
                Calcular ROI
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
            <Heading level={2} className="mb-4">Nuestras plataformas estrella</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Tecnología probada que impulsa a las empresas más innovadoras de LATAM
            </p>
          </div>

          <div className="space-y-12">
            {platforms.map((platform, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden">
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
                        <h4 className="font-semibold mb-3">Características principales:</h4>
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
                        Explorar {platform.name}
                      </Button>
                    </div>
                    
                    <div>
                      <div className={`relative h-96 rounded-2xl bg-gradient-to-br ${platform.color} p-8`}>
                        <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow-xl">
                          <h4 className="font-semibold mb-4">Beneficios clave:</h4>
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
            <Heading level={2} className="mb-4">Implementación sin fricciones</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Metodología probada que garantiza éxito desde el día uno
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
                      <li key={idx} className="text-sm text-obsidian/70">• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-obsidian to-obsidian/90 rounded-3xl p-8 text-white text-center">
              <h3 className="font-heading text-2xl font-bold mb-6">{implementation.support.title}</h3>
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
            <Heading level={2} className="mb-4">ROI garantizado</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Números que hablan por sí solos
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <div className="grid grid-cols-2 gap-6">
                {roi.metrics.map((metric, index) => (
                  <div key={index} className="text-center p-6 rounded-2xl bg-gradient-to-br from-lavender/10 to-leaf/10">
                    <p className="text-3xl font-heading font-bold mb-2">{metric.value}</p>
                    <p className="text-sm text-obsidian/70">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-5xl mb-4">💬</div>
              <blockquote className="text-lg mb-6 italic">"{roi.testimonial.quote}"</blockquote>
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
            <Heading level={2} className="mb-4">Conecta todo tu ecosistema</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Más de 100 integraciones listas para usar
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
              <span className="font-medium">+90 más...</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Other Services */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">Servicios complementarios</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Maximiza el valor de tu inversión con servicios adicionales
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {otherServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-lavender to-leaf text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Heading level={2} className="text-white mb-6">
              Transforma tu empresa con SPARK y PENNY
            </Heading>
            <p className="text-xl text-white/90 mb-8">
              Agenda una demo personalizada y descubre cómo automatizar tu operación completa
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Agendar demo ejecutivo
              </Button>
              <Link href="/calculator">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-lavender"
                >
                  Calcular ahorro potencial
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}