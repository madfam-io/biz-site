import { Container, Heading, Button } from '@madfam/ui';
import { serviceTiers, ServiceTier } from '@madfam/core';
import Link from 'next/link';
import { ServiceCard } from '@/components/ServiceCard';

export default function Level2AdvancedPage() {
  const service = serviceTiers[ServiceTier.L2_ADVANCED];
  const otherServices = [
    serviceTiers[ServiceTier.L1_ESSENTIALS],
    serviceTiers[ServiceTier.L3_CONSULTING],
  ];

  const technologies = [
    {
      name: 'Diseño Paramétrico',
      description: 'Creación de diseños adaptativos con Grasshopper y Dynamo',
      icon: '🔧',
      tools: ['Grasshopper', 'Dynamo', 'Houdini'],
    },
    {
      name: 'Realidad Aumentada',
      description: 'Experiencias AR para productos y espacios',
      icon: '📱',
      tools: ['ARKit', 'ARCore', 'Spark AR'],
    },
    {
      name: 'Realidad Virtual',
      description: 'Ambientes inmersivos para presentaciones y training',
      icon: '🥽',
      tools: ['Unity', 'Unreal', 'WebXR'],
    },
    {
      name: 'Visualización de Datos',
      description: 'Dashboards 3D interactivos y data art',
      icon: '📊',
      tools: ['Three.js', 'D3.js', 'Processing'],
    },
  ];

  const caseStudies = [
    {
      client: 'TechCorp México',
      project: 'Dashboard 3D Interactivo',
      challenge: 'Visualizar datos complejos de IoT en tiempo real',
      solution: 'Sistema paramétrico que adapta la visualización según el volumen de datos',
      results: ['85% mejor comprensión de datos', '3x velocidad en toma de decisiones', 'ROI en 2 meses'],
      tech: ['Three.js', 'Node.js', 'WebGL'],
    },
    {
      client: 'Museo de Arte Digital',
      project: 'Experiencia AR para Exposición',
      challenge: 'Crear una capa digital interactiva sobre obras físicas',
      solution: 'App AR que revela historias y animaciones al apuntar a las obras',
      results: ['50K+ descargas', '+120% tiempo en museo', 'Premio a innovación cultural'],
      tech: ['ARCore', 'Unity', 'Cloud Anchors'],
    },
  ];

  const process = [
    {
      phase: 'Descubrimiento',
      duration: '3-5 días',
      activities: [
        'Workshop de ideación',
        'Análisis técnico',
        'Definición de alcance',
        'Prototipo conceptual',
      ],
    },
    {
      phase: 'Diseño',
      duration: '1-2 semanas',
      activities: [
        'Arquitectura paramétrica',
        'Diseño de interacciones',
        'Pruebas de usuario',
        'Iteraciones rápidas',
      ],
    },
    {
      phase: 'Desarrollo',
      duration: '2-3 semanas',
      activities: [
        'Implementación técnica',
        'Integración de sistemas',
        'Optimización',
        'Testing QA',
      ],
    },
    {
      phase: 'Lanzamiento',
      duration: '3-5 días',
      activities: [
        'Deployment',
        'Capacitación',
        'Documentación',
        'Soporte inicial',
      ],
    },
  ];

  const benefits = [
    {
      title: 'Flexibilidad Total',
      description: 'Diseños que se adaptan automáticamente a cambios en datos o requerimientos',
      icon: '🔄',
    },
    {
      title: 'Experiencias Memorables',
      description: 'Interacciones que tus usuarios nunca olvidarán',
      icon: '✨',
    },
    {
      title: 'Ventaja Competitiva',
      description: 'Tecnología que te posiciona años adelante de la competencia',
      icon: '🚀',
    },
    {
      title: 'Escalabilidad',
      description: 'Soluciones que crecen con tu negocio sin rehacer todo',
      icon: '📈',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-sun/10 to-lavender/10 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-40 right-20 w-96 h-96 bg-sun rounded-full filter blur-3xl animate-float" />
          <div className="absolute bottom-10 left-20 w-72 h-72 bg-lavender rounded-full filter blur-3xl animate-float animation-delay-400" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-sun/20 text-sun">
                Nivel 2 • Advanced
              </span>
            </div>
            <Heading level={1} className="mb-6">
              Diseño paramétrico y experiencias <span className="text-sun">inmersivas</span>
            </Heading>
            <p className="text-xl text-obsidian/70 mb-8 max-w-3xl">
              {service.description}. Ideal para empresas que buscan diferenciarse con 
              tecnología de vanguardia y experiencias únicas.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Button variant="primary" size="lg" className="bg-sun hover:bg-sun/90">
                Agendar consulta técnica
              </Button>
              <Button variant="outline" size="lg">
                Ver demos interactivos
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-3xl font-heading font-bold text-sun mb-1">2-4</p>
                <p className="text-sm text-obsidian/60">Semanas promedio</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-sun mb-1">$25K</p>
                <p className="text-sm text-obsidian/60">Desde MXN</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-sun mb-1">100+</p>
                <p className="text-sm text-obsidian/60">Experiencias creadas</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-sun mb-1">15+</p>
                <p className="text-sm text-obsidian/60">Premios ganados</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Technologies */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">Tecnologías avanzadas a tu alcance</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Utilizamos las herramientas más poderosas para crear experiencias extraordinarias
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <div key={index} className="group">
                <div className="p-8 rounded-2xl bg-white border border-gray-100 hover:border-sun/50 hover:shadow-lg transition-all h-full">
                  <div className="text-5xl mb-4">{tech.icon}</div>
                  <h3 className="font-heading text-xl font-semibold mb-3">{tech.name}</h3>
                  <p className="text-obsidian/70 mb-4">{tech.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {tech.tools.map((tool, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 rounded bg-sun/10 text-sun">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Case Studies */}
      <section className="section bg-pearl">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">Casos de éxito</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Proyectos que transformaron la forma de hacer negocios
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-6">
                      <p className="text-sm text-sun font-medium mb-2">{study.client}</p>
                      <h3 className="font-heading text-2xl font-bold">{study.project}</h3>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Desafío</h4>
                      <p className="text-obsidian/70">{study.challenge}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Solución</h4>
                      <p className="text-obsidian/70">{study.solution}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {study.tech.map((tech, idx) => (
                        <span key={idx} className="text-sm px-3 py-1 rounded-full bg-obsidian/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="h-64 rounded-2xl bg-gradient-to-br from-sun/20 to-lavender/20 mb-6"></div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Resultados</h4>
                      <ul className="space-y-2">
                        {study.results.map((result, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-sun mr-2">✓</span>
                            <span className="text-obsidian/70">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">Proceso colaborativo y ágil</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              De la idea a la implementación en 2-4 semanas
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {process.map((phase, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-sun/10 to-lavender/10 rounded-2xl p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-heading text-lg font-semibold">{phase.phase}</h3>
                    <span className="text-sm text-sun font-medium">{phase.duration}</span>
                  </div>
                  <ul className="space-y-2">
                    {phase.activities.map((activity, idx) => (
                      <li key={idx} className="text-sm text-obsidian/70 flex items-start">
                        <span className="text-sun mr-2">•</span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-sun">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="section bg-gradient-to-br from-sun/5 to-lavender/5">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">Por qué elegir Advanced</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Ventajas que transforman tu inversión en resultados tangibles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-6xl mb-4">{benefit.icon}</div>
                <h3 className="font-heading text-lg font-semibold mb-3">{benefit.title}</h3>
                <p className="text-obsidian/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Other Services */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">Explora otros niveles</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Encuentra el servicio perfecto para tu etapa actual
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
      <section className="section bg-gradient-to-br from-sun to-lavender text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Heading level={2} className="text-white mb-6">
              ¿Listo para crear algo extraordinario?
            </Heading>
            <p className="text-xl text-white/90 mb-8">
              Agenda una consulta técnica y descubre cómo llevar tu proyecto al siguiente nivel
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Agendar consulta gratuita
              </Button>
              <Link href="/assessment">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-sun"
                >
                  Evaluación de proyecto
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}