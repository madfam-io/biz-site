import { serviceTiers, ServiceTier } from '@madfam/core';
import { getLocalizedContent, type Locale } from '@madfam/i18n';
import { Container, Heading, Button } from '@madfam/ui';
import Link from 'next/link';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { ServiceCard } from '@/components/ServiceCard';

export default async function Level2AdvancedPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const service = serviceTiers[ServiceTier.L2_ADVANCED];
  const t = await getTranslations('services');
  const currentLocale = locale as Locale;

  // Get localized content from service object
  const serviceDescription = getLocalizedContent(service.description, currentLocale);
  const otherServices = [
    serviceTiers[ServiceTier.L1_ESSENTIALS],
    serviceTiers[ServiceTier.L3_CONSULTING],
  ];

  const technologies = [
    {
      name: t('level2.capabilities.items.parametric.title'),
      description: t('level2.capabilities.items.parametric.description'),
      icon: '🔧',
      tools: ['Grasshopper', 'Dynamo', 'Houdini'],
    },
    {
      name: t('level2.capabilities.items.ar.title'),
      description: t('level2.capabilities.items.ar.description'),
      icon: '📱',
      tools: ['ARKit', 'ARCore', 'Spark AR'],
    },
    {
      name: t('level2.capabilities.items.vr.title'),
      description: t('level2.capabilities.items.vr.description'),
      icon: '🥽',
      tools: ['Unity', 'Unreal', 'WebXR'],
    },
    {
      name: t('level2.capabilities.items.data.title'),
      description: t('level2.capabilities.items.data.description'),
      icon: '📊',
      tools: ['Three.js', 'D3.js', 'Processing'],
    },
  ];

  const caseStudies = [
    {
      client: 'TechCorp México',
      project:
        currentLocale === 'en'
          ? 'Interactive 3D Dashboard'
          : currentLocale === 'pt-br'
            ? 'Dashboard 3D Interativo'
            : 'Dashboard 3D Interactivo',
      challenge:
        currentLocale === 'en'
          ? 'Visualize complex IoT data in real time'
          : currentLocale === 'pt-br'
            ? 'Visualizar dados complexos de IoT em tempo real'
            : 'Visualizar datos complejos de IoT en tiempo real',
      solution:
        currentLocale === 'en'
          ? 'Parametric system that adapts visualization based on data volume'
          : currentLocale === 'pt-br'
            ? 'Sistema paramétrico que adapta a visualização conforme o volume de dados'
            : 'Sistema paramétrico que adapta la visualización según el volumen de datos',
      results: [
        currentLocale === 'en'
          ? '85% better data comprehension'
          : currentLocale === 'pt-br'
            ? '85% melhor compreensão de dados'
            : '85% mejor comprensión de datos',
        currentLocale === 'en'
          ? '3x faster decision making'
          : currentLocale === 'pt-br'
            ? '3x velocidade na tomada de decisões'
            : '3x velocidad en toma de decisiones',
        currentLocale === 'en'
          ? 'ROI in 2 months'
          : currentLocale === 'pt-br'
            ? 'ROI em 2 meses'
            : 'ROI en 2 meses',
      ],
      tech: ['Three.js', 'Node.js', 'WebGL'],
    },
    {
      client:
        currentLocale === 'en'
          ? 'Digital Art Museum'
          : currentLocale === 'pt-br'
            ? 'Museu de Arte Digital'
            : 'Museo de Arte Digital',
      project:
        currentLocale === 'en'
          ? 'AR Experience for Exhibition'
          : currentLocale === 'pt-br'
            ? 'Experiência AR para Exposição'
            : 'Experiencia AR para Exposición',
      challenge:
        currentLocale === 'en'
          ? 'Create an interactive digital layer over physical works'
          : currentLocale === 'pt-br'
            ? 'Criar uma camada digital interativa sobre obras físicas'
            : 'Crear una capa digital interactiva sobre obras físicas',
      solution:
        currentLocale === 'en'
          ? 'AR app that reveals stories and animations when pointing at artworks'
          : currentLocale === 'pt-br'
            ? 'App AR que revela histórias e animações ao apontar para as obras'
            : 'App AR que revela historias y animaciones al apuntar a las obras',
      results: [
        currentLocale === 'en'
          ? '50K+ downloads'
          : currentLocale === 'pt-br'
            ? '50K+ downloads'
            : '50K+ descargas',
        currentLocale === 'en'
          ? '+120% time in museum'
          : currentLocale === 'pt-br'
            ? '+120% tempo no museu'
            : '+120% tiempo en museo',
        currentLocale === 'en'
          ? 'Cultural innovation award'
          : currentLocale === 'pt-br'
            ? 'Prêmio de inovação cultural'
            : 'Premio a innovación cultural',
      ],
      tech: ['ARCore', 'Unity', 'Cloud Anchors'],
    },
  ];

  const process = [
    {
      phase:
        currentLocale === 'en'
          ? 'Discovery'
          : currentLocale === 'pt-br'
            ? 'Descoberta'
            : 'Descubrimiento',
      duration: `3-5 ${currentLocale === 'en' ? 'days' : currentLocale === 'pt-br' ? 'dias' : 'días'}`,
      activities: [
        currentLocale === 'en'
          ? 'Ideation workshop'
          : currentLocale === 'pt-br'
            ? 'Workshop de ideação'
            : 'Workshop de ideación',
        currentLocale === 'en'
          ? 'Technical analysis'
          : currentLocale === 'pt-br'
            ? 'Análise técnica'
            : 'Análisis técnico',
        currentLocale === 'en'
          ? 'Scope definition'
          : currentLocale === 'pt-br'
            ? 'Definição de escopo'
            : 'Definición de alcance',
        currentLocale === 'en'
          ? 'Conceptual prototype'
          : currentLocale === 'pt-br'
            ? 'Protótipo conceitual'
            : 'Prototipo conceptual',
      ],
    },
    {
      phase: currentLocale === 'en' ? 'Design' : currentLocale === 'pt-br' ? 'Design' : 'Diseño',
      duration: `1-2 ${currentLocale === 'en' ? 'weeks' : currentLocale === 'pt-br' ? 'semanas' : 'semanas'}`,
      activities: [
        currentLocale === 'en'
          ? 'Parametric architecture'
          : currentLocale === 'pt-br'
            ? 'Arquitetura paramétrica'
            : 'Arquitectura paramétrica',
        currentLocale === 'en'
          ? 'Interaction design'
          : currentLocale === 'pt-br'
            ? 'Design de interações'
            : 'Diseño de interacciones',
        currentLocale === 'en'
          ? 'User testing'
          : currentLocale === 'pt-br'
            ? 'Testes de usuário'
            : 'Pruebas de usuario',
        currentLocale === 'en'
          ? 'Rapid iterations'
          : currentLocale === 'pt-br'
            ? 'Iterações rápidas'
            : 'Iteraciones rápidas',
      ],
    },
    {
      phase:
        currentLocale === 'en'
          ? 'Development'
          : currentLocale === 'pt-br'
            ? 'Desenvolvimento'
            : 'Desarrollo',
      duration: `2-3 ${currentLocale === 'en' ? 'weeks' : currentLocale === 'pt-br' ? 'semanas' : 'semanas'}`,
      activities: [
        currentLocale === 'en'
          ? 'Technical implementation'
          : currentLocale === 'pt-br'
            ? 'Implementação técnica'
            : 'Implementación técnica',
        currentLocale === 'en'
          ? 'System integration'
          : currentLocale === 'pt-br'
            ? 'Integração de sistemas'
            : 'Integración de sistemas',
        currentLocale === 'en'
          ? 'Optimization'
          : currentLocale === 'pt-br'
            ? 'Otimização'
            : 'Optimización',
        'Testing QA',
      ],
    },
    {
      phase:
        currentLocale === 'en'
          ? 'Launch'
          : currentLocale === 'pt-br'
            ? 'Lançamento'
            : 'Lanzamiento',
      duration: `3-5 ${currentLocale === 'en' ? 'days' : currentLocale === 'pt-br' ? 'dias' : 'días'}`,
      activities: [
        'Deployment',
        currentLocale === 'en'
          ? 'Training'
          : currentLocale === 'pt-br'
            ? 'Capacitação'
            : 'Capacitación',
        currentLocale === 'en'
          ? 'Documentation'
          : currentLocale === 'pt-br'
            ? 'Documentação'
            : 'Documentación',
        currentLocale === 'en'
          ? 'Initial support'
          : currentLocale === 'pt-br'
            ? 'Suporte inicial'
            : 'Soporte inicial',
      ],
    },
  ];

  const benefits = [
    {
      title:
        currentLocale === 'en'
          ? 'Total Flexibility'
          : currentLocale === 'pt-br'
            ? 'Flexibilidade Total'
            : 'Flexibilidad Total',
      description:
        currentLocale === 'en'
          ? 'Designs that automatically adapt to changes in data or requirements'
          : currentLocale === 'pt-br'
            ? 'Designs que se adaptam automaticamente a mudanças em dados ou requisitos'
            : 'Diseños que se adaptan automáticamente a cambios en datos o requerimientos',
      icon: '🔄',
    },
    {
      title:
        currentLocale === 'en'
          ? 'Memorable Experiences'
          : currentLocale === 'pt-br'
            ? 'Experiências Memoráveis'
            : 'Experiencias Memorables',
      description:
        currentLocale === 'en'
          ? 'Interactions your users will never forget'
          : currentLocale === 'pt-br'
            ? 'Interações que seus usuários nunca esquecerão'
            : 'Interacciones que tus usuarios nunca olvidarán',
      icon: '✨',
    },
    {
      title:
        currentLocale === 'en'
          ? 'Competitive Advantage'
          : currentLocale === 'pt-br'
            ? 'Vantagem Competitiva'
            : 'Ventaja Competitiva',
      description:
        currentLocale === 'en'
          ? 'Technology that positions you years ahead of the competition'
          : currentLocale === 'pt-br'
            ? 'Tecnologia que te posiciona anos à frente da concorrência'
            : 'Tecnología que te posiciona años adelante de la competencia',
      icon: '🚀',
    },
    {
      title:
        currentLocale === 'en'
          ? 'Scalability'
          : currentLocale === 'pt-br'
            ? 'Escalabilidade'
            : 'Escalabilidad',
      description:
        currentLocale === 'en'
          ? 'Solutions that grow with your business without rebuilding everything'
          : currentLocale === 'pt-br'
            ? 'Soluções que crescem com seu negócio sem refazer tudo'
            : 'Soluciones que crecen con tu negocio sin rehacer todo',
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
                {t('level2.hero.badge')}
              </span>
            </div>
            <Heading level={1} className="mb-6">
              {t('level2.hero.title')}
            </Heading>
            <p className="text-xl text-obsidian/70 mb-8 max-w-3xl">{serviceDescription}</p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Button variant="primary" size="lg" className="bg-sun hover:bg-sun/90">
                {t('level2.hero.scheduleDemo')}
              </Button>
              <Button variant="outline" size="lg">
                {currentLocale === 'en'
                  ? 'View interactive demos'
                  : currentLocale === 'pt-br'
                    ? 'Ver demos interativos'
                    : 'Ver demos interactivos'}
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-3xl font-heading font-bold text-sun mb-1">2-4</p>
                <p className="text-sm text-obsidian/60">{t('level2.hero.projectTime')}</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-sun mb-1">$25K</p>
                <p className="text-sm text-obsidian/60">{t('comparison.priceFrom')} MXN</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-sun mb-1">100+</p>
                <p className="text-sm text-obsidian/60">
                  {currentLocale === 'en'
                    ? 'Experiences created'
                    : currentLocale === 'pt-br'
                      ? 'Experiências criadas'
                      : 'Experiencias creadas'}
                </p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-sun mb-1">15+</p>
                <p className="text-sm text-obsidian/60">
                  {currentLocale === 'en'
                    ? 'Awards won'
                    : currentLocale === 'pt-br'
                      ? 'Prêmios ganhos'
                      : 'Premios ganados'}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Technologies */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {t('level2.capabilities.title')}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {t('level2.capabilities.subtitle')}
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
            <Heading level={2} className="mb-4">
              {currentLocale === 'en'
                ? 'Success Stories'
                : currentLocale === 'pt-br'
                  ? 'Casos de Sucesso'
                  : 'Casos de éxito'}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {currentLocale === 'en'
                ? 'Projects that transformed the way of doing business'
                : currentLocale === 'pt-br'
                  ? 'Projetos que transformaram a forma de fazer negócios'
                  : 'Proyectos que transformaron la forma de hacer negocios'}
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
                      <h4 className="font-semibold mb-2">
                        {currentLocale === 'en'
                          ? 'Challenge'
                          : currentLocale === 'pt-br'
                            ? 'Desafio'
                            : 'Desafío'}
                      </h4>
                      <p className="text-obsidian/70">{study.challenge}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">
                        {currentLocale === 'en'
                          ? 'Solution'
                          : currentLocale === 'pt-br'
                            ? 'Solução'
                            : 'Solución'}
                      </h4>
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
                    <div className="h-64 rounded-2xl bg-gradient-to-br from-sun/20 to-lavender/20 mb-6" />

                    <div>
                      <h4 className="font-semibold mb-3">
                        {currentLocale === 'en'
                          ? 'Results'
                          : currentLocale === 'pt-br'
                            ? 'Resultados'
                            : 'Resultados'}
                      </h4>
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
            <Heading level={2} className="mb-4">
              {currentLocale === 'en'
                ? 'Collaborative and agile process'
                : currentLocale === 'pt-br'
                  ? 'Processo colaborativo e ágil'
                  : 'Proceso colaborativo y ágil'}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {currentLocale === 'en'
                ? 'From idea to implementation in 2-4 weeks'
                : currentLocale === 'pt-br'
                  ? 'Da ideia à implementação em 2-4 semanas'
                  : 'De la idea a la implementación en 2-4 semanas'}
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
            <Heading level={2} className="mb-4">
              {currentLocale === 'en'
                ? 'Why choose Advanced'
                : currentLocale === 'pt-br'
                  ? 'Por que escolher Advanced'
                  : 'Por qué elegir Advanced'}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {currentLocale === 'en'
                ? 'Advantages that transform your investment into tangible results'
                : currentLocale === 'pt-br'
                  ? 'Vantagens que transformam seu investimento em resultados tangíveis'
                  : 'Ventajas que transforman tu inversión en resultados tangibles'}
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
            <Heading level={2} className="mb-4">
              {currentLocale === 'en'
                ? 'Explore other levels'
                : currentLocale === 'pt-br'
                  ? 'Explore outros níveis'
                  : 'Explora otros niveles'}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {currentLocale === 'en'
                ? 'Find the perfect service for your current stage'
                : currentLocale === 'pt-br'
                  ? 'Encontre o serviço perfeito para sua etapa atual'
                  : 'Encuentra el servicio perfecto para tu etapa actual'}
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
      <section className="section bg-gradient-to-br from-sun to-lavender text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Heading level={2} className="text-white mb-6">
              {currentLocale === 'en'
                ? 'Ready to create something extraordinary?'
                : currentLocale === 'pt-br'
                  ? 'Pronto para criar algo extraordinário?'
                  : '¿Listo para crear algo extraordinario?'}
            </Heading>
            <p className="text-xl text-white/90 mb-8">
              {currentLocale === 'en'
                ? 'Schedule a technical consultation and discover how to take your project to the next level'
                : currentLocale === 'pt-br'
                  ? 'Agende uma consulta técnica e descubra como levar seu projeto ao próximo nível'
                  : 'Agenda una consulta técnica y descubre cómo llevar tu proyecto al siguiente nivel'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="secondary" size="lg">
                {currentLocale === 'en'
                  ? 'Schedule free consultation'
                  : currentLocale === 'pt-br'
                    ? 'Agendar consulta gratuita'
                    : 'Agendar consulta gratuita'}
              </Button>
              <Link href="/assessment">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-sun"
                >
                  {currentLocale === 'en'
                    ? 'Project evaluation'
                    : currentLocale === 'pt-br'
                      ? 'Avaliação de projeto'
                      : 'Evaluación de proyecto'}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
