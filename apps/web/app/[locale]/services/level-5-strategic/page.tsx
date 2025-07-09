import { Container, Heading, Button } from '@madfam/ui';
import { serviceTiers, ServiceTier } from '@madfam/core';
import { ServiceCard } from '@/components/ServiceCard';

export default function Level5StrategicPage() {
  const service = serviceTiers[ServiceTier.L5_STRATEGIC];
  const otherServices = [
    serviceTiers[ServiceTier.L3_CONSULTING],
    serviceTiers[ServiceTier.L4_PLATFORMS],
  ];

  const vCTOServices = [
    {
      area: 'Estrategia Tecnológica',
      icon: '🎯',
      responsibilities: [
        'Roadmap tecnológico a 3-5 años',
        'Evaluación y selección de tecnologías',
        'Arquitectura empresarial',
        'Innovación y transformación digital',
        'Gobierno de TI y políticas',
      ],
    },
    {
      area: 'Liderazgo de Equipos',
      icon: '👥',
      responsibilities: [
        'Reclutamiento de talento tech',
        'Desarrollo y mentoría de equipos',
        'Cultura de innovación',
        'Metodologías ágiles',
        'Gestión de proveedores',
      ],
    },
    {
      area: 'Operaciones & Delivery',
      icon: '⚡',
      responsibilities: [
        'Gestión de proyectos estratégicos',
        'Optimización de procesos',
        'DevOps y CI/CD',
        'Seguridad y compliance',
        'Continuidad del negocio',
      ],
    },
    {
      area: 'Innovación & Growth',
      icon: '🚀',
      responsibilities: [
        'Nuevos modelos de negocio',
        'Productos digitales',
        'Partnerships tecnológicos',
        'Ecosistemas de innovación',
        'Venture building',
      ],
    },
  ];

  const engagement = {
    models: [
      {
        type: 'vCTO Dedicado',
        commitment: 'Full-time',
        ideal: 'Transformación completa',
        includes: [
          'CTO virtual exclusivo',
          'Presencia ejecutiva',
          'Equipo de soporte MADFAM',
          'Acceso total a recursos',
        ],
      },
      {
        type: 'vCTO Fractional',
        commitment: 'Part-time (50-80%)',
        ideal: 'Scale-ups en crecimiento',
        includes: [
          'CTO compartido',
          'Reuniones ejecutivas semanales',
          'Soporte de especialistas',
          'Recursos on-demand',
        ],
      },
      {
        type: 'vCTO Advisory',
        commitment: '20-40 hrs/mes',
        ideal: 'Consultoría estratégica',
        includes: [
          'Asesoría mensual',
          'Revisiones trimestrales',
          'Acceso a red de expertos',
          'Workshops ejecutivos',
        ],
      },
    ],
    timeline: [
      { phase: 'Diagnóstico', duration: '2-4 semanas', focus: 'Evaluación 360° de capacidades actuales' },
      { phase: 'Estrategia', duration: '4-6 semanas', focus: 'Definición de visión y roadmap' },
      { phase: 'Ejecución', duration: '6-12 meses', focus: 'Implementación de iniciativas clave' },
      { phase: 'Evolución', duration: 'Continuo', focus: 'Optimización y nuevas oportunidades' },
    ],
  };

  const impact = {
    metrics: [
      { label: 'Velocidad de innovación', improvement: '5x', icon: '⚡' },
      { label: 'Time-to-market', improvement: '-60%', icon: '⏱️' },
      { label: 'Eficiencia operativa', improvement: '+80%', icon: '📈' },
      { label: 'Retención de talento', improvement: '+90%', icon: '🎯' },
    ],
    caseStudy: {
      company: 'FinTech Unicornio LATAM',
      challenge: 'Escalar de 50 a 500 empleados manteniendo agilidad',
      solution: 'vCTO implementó arquitectura de microservicios, cultura DevOps y centros de excelencia',
      results: [
        'IPO exitoso en 18 meses',
        'Expansión a 8 países',
        '10x crecimiento en usuarios',
        'NPS de 85+',
      ],
    },
  };

  const differentiators = [
    {
      title: 'Red Global de Expertos',
      description: 'Acceso a +200 especialistas en tecnologías emergentes',
      icon: '🌐',
    },
    {
      title: 'Metodología Probada',
      description: 'Framework MADFAM de transformación digital',
      icon: '📊',
    },
    {
      title: 'Ecosistema de Innovación',
      description: 'Conexión con startups, VCs y centros de I+D',
      icon: '🔗',
    },
    {
      title: 'Resultados Garantizados',
      description: 'KPIs claros y compensación basada en performance',
      icon: '🎯',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-obsidian to-obsidian/95 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-40 right-10 w-96 h-96 bg-lavender rounded-full filter blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-sun rounded-full filter blur-3xl animate-float animation-delay-400" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur text-white">
                Nivel 5 • Strategic
              </span>
            </div>
            <Heading level={1} className="text-white mb-6">
              Tu CTO virtual para la <span className="gradient-text">era digital</span>
            </Heading>
            <p className="text-xl text-white/90 mb-8 max-w-3xl">
              {service.description}. La solución definitiva para empresas que necesitan 
              liderazgo tecnológico de clase mundial sin los costos de un ejecutivo full-time.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Button variant="secondary" size="lg">
                Agendar reunión ejecutiva
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-obsidian"
              >
                Descargar caso de estudio
              </Button>
            </div>

            {/* Executive stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-white mb-1">50+</p>
                <p className="text-sm text-white/70">CTOs en red</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-white mb-1">$2B+</p>
                <p className="text-sm text-white/70">Valuación gestionada</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-white mb-1">15+</p>
                <p className="text-sm text-white/70">Años experiencia</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-white mb-1">8/10</p>
                <p className="text-sm text-white/70">Unicornios LATAM</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* vCTO Services */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">Liderazgo integral en tecnología</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Un CTO virtual que cubre todas las áreas críticas de tu organización
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vCTOServices.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="font-heading text-xl font-semibold mb-4">{service.area}</h3>
                <ul className="space-y-2">
                  {service.responsibilities.map((item, idx) => (
                    <li key={idx} className="text-sm text-obsidian/70 flex items-start">
                      <span className="text-obsidian mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Engagement Models */}
      <section className="section bg-pearl">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">Modelos de colaboración flexibles</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Adaptamos nuestro servicio a tus necesidades y etapa de crecimiento
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {engagement.models.map((model, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="text-center mb-6">
                  <h3 className="font-heading text-2xl font-bold mb-2">{model.type}</h3>
                  <p className="text-obsidian/60">{model.commitment}</p>
                </div>
                
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm text-center text-obsidian/70">
                    Ideal para: <span className="font-semibold">{model.ideal}</span>
                  </p>
                </div>
                
                <ul className="space-y-3">
                  {model.includes.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-0.5">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <Button variant="outline" className="w-full">
                    Más información
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="font-heading text-xl font-semibold text-center mb-8">
              Journey de transformación
            </h3>
            <div className="relative">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-obsidian/20 via-lavender to-obsidian/20"></div>
              <div className="grid grid-cols-4 gap-4">
                {engagement.timeline.map((phase, index) => (
                  <div key={index} className="relative">
                    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-lavender rounded-full"></div>
                      <h4 className="font-semibold text-sm mb-1">{phase.phase}</h4>
                      <p className="text-xs text-obsidian/60 mb-2">{phase.duration}</p>
                      <p className="text-xs text-obsidian/70">{phase.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Impact & Case Study */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">Impacto transformador comprobado</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Resultados que hablan más que las palabras
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Metrics */}
            <div>
              <h3 className="font-heading text-xl font-semibold mb-6">Mejoras promedio</h3>
              <div className="space-y-4">
                {impact.metrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-obsidian/5 to-lavender/5">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{metric.icon}</span>
                      <span className="font-medium">{metric.label}</span>
                    </div>
                    <span className="text-2xl font-bold text-lavender">{metric.improvement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Study */}
            <div className="bg-gradient-to-br from-obsidian to-obsidian/90 rounded-2xl p-8 text-white">
              <h3 className="font-heading text-xl font-semibold mb-4">Caso de éxito</h3>
              <p className="font-semibold text-sun mb-2">{impact.caseStudy.company}</p>
              
              <div className="mb-4">
                <p className="text-sm text-white/70 mb-1">Desafío:</p>
                <p className="text-white/90">{impact.caseStudy.challenge}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-white/70 mb-1">Solución:</p>
                <p className="text-white/90">{impact.caseStudy.solution}</p>
              </div>
              
              <div>
                <p className="text-sm text-white/70 mb-2">Resultados:</p>
                <ul className="space-y-1">
                  {impact.caseStudy.results.map((result, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-sun mr-2">★</span>
                      <span className="text-white/90">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Differentiators */}
      <section className="section bg-gradient-to-br from-lavender/5 to-sun/5">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">La diferencia MADFAM</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Por qué los líderes más visionarios nos eligen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentiators.map((diff, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-lavender/20 to-sun/20 mb-4">
                  <span className="text-4xl">{diff.icon}</span>
                </div>
                <h3 className="font-heading text-lg font-semibold mb-3">{diff.title}</h3>
                <p className="text-obsidian/70">{diff.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Other Services */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">Servicios complementarios</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Potencia tu transformación con servicios adicionales
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {otherServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* Executive CTA */}
      <section className="section bg-obsidian text-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Heading level={2} className="text-white mb-6">
                  ¿Listo para liderar el futuro?
                </Heading>
                <p className="text-xl text-white/90 mb-8">
                  Agenda una conversación ejecutiva con nuestro equipo de liderazgo y descubre 
                  cómo un vCTO puede transformar tu organización.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-sun mr-3">✓</span>
                    <span className="text-white/80">Evaluación ejecutiva gratuita</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sun mr-3">✓</span>
                    <span className="text-white/80">Propuesta personalizada en 48 hrs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sun mr-3">✓</span>
                    <span className="text-white/80">Inicio inmediato disponible</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Button variant="secondary" size="lg">
                    Agendar reunión
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white hover:text-obsidian"
                  >
                    Descargar brochure
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                  <h3 className="font-heading text-xl font-semibold mb-4">Contacto directo</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-white/60 text-sm mb-1">Email ejecutivo</p>
                      <p className="font-semibold">strategic@madfam.io</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">WhatsApp Business</p>
                      <p className="font-semibold">+52 55 1234 5678</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">Calendario</p>
                      <p className="font-semibold">calendly.com/madfam-cto</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}