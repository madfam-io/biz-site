import { serviceTiers, ServiceTier } from '@madfam/core';
import { getLocalizedContent, type Locale } from '@madfam/i18n';
import { Container, Heading, Button } from '@madfam/ui';
import { unstable_setRequestLocale } from 'next-intl/server';
import { ServiceCard } from '@/components/ServiceCard';

export default function Level5StrategicPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const service = serviceTiers[ServiceTier.L5_STRATEGIC];
  const currentLocale = locale as Locale;

  // Get localized content from service object
  const serviceDescription = getLocalizedContent(service.description, currentLocale);
  const otherServices = [
    serviceTiers[ServiceTier.L3_CONSULTING],
    serviceTiers[ServiceTier.L4_PLATFORMS],
  ];

  const vCTOServices = [
    {
      area:
        currentLocale === 'en'
          ? 'Technology Strategy'
          : currentLocale === 'pt-br'
            ? 'Estratégia Tecnológica'
            : 'Estrategia Tecnológica',
      icon: '🎯',
      responsibilities: [
        currentLocale === 'en'
          ? '3-5 year technology roadmap'
          : currentLocale === 'pt-br'
            ? 'Roadmap tecnológico de 3-5 anos'
            : 'Roadmap tecnológico a 3-5 años',
        currentLocale === 'en'
          ? 'Technology evaluation and selection'
          : currentLocale === 'pt-br'
            ? 'Avaliação e seleção de tecnologias'
            : 'Evaluación y selección de tecnologías',
        currentLocale === 'en'
          ? 'Enterprise architecture'
          : currentLocale === 'pt-br'
            ? 'Arquitetura empresarial'
            : 'Arquitectura empresarial',
        currentLocale === 'en'
          ? 'Innovation and digital transformation'
          : currentLocale === 'pt-br'
            ? 'Inovação e transformação digital'
            : 'Innovación y transformación digital',
        currentLocale === 'en'
          ? 'IT governance and policies'
          : currentLocale === 'pt-br'
            ? 'Governança de TI e políticas'
            : 'Gobierno de TI y políticas',
      ],
    },
    {
      area:
        currentLocale === 'en'
          ? 'Team Leadership'
          : currentLocale === 'pt-br'
            ? 'Liderança de Equipes'
            : 'Liderazgo de Equipos',
      icon: '👥',
      responsibilities: [
        currentLocale === 'en'
          ? 'Tech talent recruitment'
          : currentLocale === 'pt-br'
            ? 'Recrutamento de talentos tech'
            : 'Reclutamiento de talento tech',
        currentLocale === 'en'
          ? 'Team development and mentoring'
          : currentLocale === 'pt-br'
            ? 'Desenvolvimento e mentoria de equipes'
            : 'Desarrollo y mentoría de equipos',
        currentLocale === 'en'
          ? 'Innovation culture'
          : currentLocale === 'pt-br'
            ? 'Cultura de inovação'
            : 'Cultura de innovación',
        currentLocale === 'en'
          ? 'Agile methodologies'
          : currentLocale === 'pt-br'
            ? 'Metodologias ágeis'
            : 'Metodologías ágiles',
        currentLocale === 'en'
          ? 'Vendor management'
          : currentLocale === 'pt-br'
            ? 'Gestão de fornecedores'
            : 'Gestión de proveedores',
      ],
    },
    {
      area:
        currentLocale === 'en'
          ? 'Operations & Delivery'
          : currentLocale === 'pt-br'
            ? 'Operações & Entrega'
            : 'Operaciones & Delivery',
      icon: '⚡',
      responsibilities: [
        currentLocale === 'en'
          ? 'Strategic project management'
          : currentLocale === 'pt-br'
            ? 'Gestão de projetos estratégicos'
            : 'Gestión de proyectos estratégicos',
        currentLocale === 'en'
          ? 'Process optimization'
          : currentLocale === 'pt-br'
            ? 'Otimização de processos'
            : 'Optimización de procesos',
        `DevOps ${currentLocale === 'en' ? 'and' : currentLocale === 'pt-br' ? 'e' : 'y'} CI/CD`,
        currentLocale === 'en'
          ? 'Security and compliance'
          : currentLocale === 'pt-br'
            ? 'Segurança e conformidade'
            : 'Seguridad y compliance',
        currentLocale === 'en'
          ? 'Business continuity'
          : currentLocale === 'pt-br'
            ? 'Continuidade de negócios'
            : 'Continuidad del negocio',
      ],
    },
    {
      area:
        currentLocale === 'en'
          ? 'Innovation & Growth'
          : currentLocale === 'pt-br'
            ? 'Inovação & Crescimento'
            : 'Innovación & Growth',
      icon: '🚀',
      responsibilities: [
        currentLocale === 'en'
          ? 'New business models'
          : currentLocale === 'pt-br'
            ? 'Novos modelos de negócio'
            : 'Nuevos modelos de negocio',
        currentLocale === 'en'
          ? 'Digital products'
          : currentLocale === 'pt-br'
            ? 'Produtos digitais'
            : 'Productos digitales',
        currentLocale === 'en'
          ? 'Technology partnerships'
          : currentLocale === 'pt-br'
            ? 'Parcerias tecnológicas'
            : 'Partnerships tecnológicos',
        currentLocale === 'en'
          ? 'Innovation ecosystems'
          : currentLocale === 'pt-br'
            ? 'Ecossistemas de inovação'
            : 'Ecosistemas de innovación',
        'Venture building',
      ],
    },
  ];

  const engagement = {
    models: [
      {
        type:
          currentLocale === 'en'
            ? 'Dedicated vCTO'
            : currentLocale === 'pt-br'
              ? 'vCTO Dedicado'
              : 'vCTO Dedicado',
        commitment: 'Full-time',
        ideal:
          currentLocale === 'en'
            ? 'Complete transformation'
            : currentLocale === 'pt-br'
              ? 'Transformação completa'
              : 'Transformación completa',
        includes: [
          currentLocale === 'en'
            ? 'Exclusive virtual CTO'
            : currentLocale === 'pt-br'
              ? 'CTO virtual exclusivo'
              : 'CTO virtual exclusivo',
          currentLocale === 'en'
            ? 'Executive presence'
            : currentLocale === 'pt-br'
              ? 'Presença executiva'
              : 'Presencia ejecutiva',
          currentLocale === 'en'
            ? 'MADFAM support team'
            : currentLocale === 'pt-br'
              ? 'Equipe de suporte MADFAM'
              : 'Equipo de soporte MADFAM',
          currentLocale === 'en'
            ? 'Full resource access'
            : currentLocale === 'pt-br'
              ? 'Acesso total a recursos'
              : 'Acceso total a recursos',
        ],
      },
      {
        type: 'vCTO Fractional',
        commitment: 'Part-time (50-80%)',
        ideal:
          currentLocale === 'en'
            ? 'Growing scale-ups'
            : currentLocale === 'pt-br'
              ? 'Scale-ups em crescimento'
              : 'Scale-ups en crecimiento',
        includes: [
          currentLocale === 'en'
            ? 'Shared CTO'
            : currentLocale === 'pt-br'
              ? 'CTO compartilhado'
              : 'CTO compartido',
          currentLocale === 'en'
            ? 'Weekly executive meetings'
            : currentLocale === 'pt-br'
              ? 'Reuniões executivas semanais'
              : 'Reuniones ejecutivas semanales',
          currentLocale === 'en'
            ? 'Specialist support'
            : currentLocale === 'pt-br'
              ? 'Suporte de especialistas'
              : 'Soporte de especialistas',
          currentLocale === 'en'
            ? 'On-demand resources'
            : currentLocale === 'pt-br'
              ? 'Recursos sob demanda'
              : 'Recursos on-demand',
        ],
      },
      {
        type: 'vCTO Advisory',
        commitment: `20-40 hrs/${currentLocale === 'en' ? 'month' : currentLocale === 'pt-br' ? 'mês' : 'mes'}`,
        ideal:
          currentLocale === 'en'
            ? 'Strategic consulting'
            : currentLocale === 'pt-br'
              ? 'Consultoria estratégica'
              : 'Consultoría estratégica',
        includes: [
          currentLocale === 'en'
            ? 'Monthly advisory'
            : currentLocale === 'pt-br'
              ? 'Assessoria mensal'
              : 'Asesoría mensual',
          currentLocale === 'en'
            ? 'Quarterly reviews'
            : currentLocale === 'pt-br'
              ? 'Revisões trimestrais'
              : 'Revisiones trimestrales',
          currentLocale === 'en'
            ? 'Expert network access'
            : currentLocale === 'pt-br'
              ? 'Acesso à rede de especialistas'
              : 'Acceso a red de expertos',
          currentLocale === 'en'
            ? 'Executive workshops'
            : currentLocale === 'pt-br'
              ? 'Workshops executivos'
              : 'Workshops ejecutivos',
        ],
      },
    ],
    timeline: [
      {
        phase:
          currentLocale === 'en'
            ? 'Diagnosis'
            : currentLocale === 'pt-br'
              ? 'Diagnóstico'
              : 'Diagnóstico',
        duration: `2-4 ${currentLocale === 'en' ? 'weeks' : currentLocale === 'pt-br' ? 'semanas' : 'semanas'}`,
        focus:
          currentLocale === 'en'
            ? '360° evaluation of current capabilities'
            : currentLocale === 'pt-br'
              ? 'Avaliação 360° das capacidades atuais'
              : 'Evaluación 360° de capacidades actuales',
      },
      {
        phase:
          currentLocale === 'en'
            ? 'Strategy'
            : currentLocale === 'pt-br'
              ? 'Estratégia'
              : 'Estrategia',
        duration: `4-6 ${currentLocale === 'en' ? 'weeks' : currentLocale === 'pt-br' ? 'semanas' : 'semanas'}`,
        focus:
          currentLocale === 'en'
            ? 'Vision and roadmap definition'
            : currentLocale === 'pt-br'
              ? 'Definição de visão e roadmap'
              : 'Definición de visión y roadmap',
      },
      {
        phase:
          currentLocale === 'en'
            ? 'Execution'
            : currentLocale === 'pt-br'
              ? 'Execução'
              : 'Ejecución',
        duration: `6-12 ${currentLocale === 'en' ? 'months' : currentLocale === 'pt-br' ? 'meses' : 'meses'}`,
        focus:
          currentLocale === 'en'
            ? 'Key initiative implementation'
            : currentLocale === 'pt-br'
              ? 'Implementação de iniciativas-chave'
              : 'Implementación de iniciativas clave',
      },
      {
        phase:
          currentLocale === 'en'
            ? 'Evolution'
            : currentLocale === 'pt-br'
              ? 'Evolução'
              : 'Evolución',
        duration:
          currentLocale === 'en'
            ? 'Continuous'
            : currentLocale === 'pt-br'
              ? 'Contínuo'
              : 'Continuo',
        focus:
          currentLocale === 'en'
            ? 'Optimization and new opportunities'
            : currentLocale === 'pt-br'
              ? 'Otimização e novas oportunidades'
              : 'Optimización y nuevas oportunidades',
      },
    ],
  };

  const impact = {
    metrics: [
      {
        label:
          currentLocale === 'en'
            ? 'Innovation speed'
            : currentLocale === 'pt-br'
              ? 'Velocidade de inovação'
              : 'Velocidad de innovación',
        improvement: '5x',
        icon: '⚡',
      },
      { label: 'Time-to-market', improvement: '-60%', icon: '⏱️' },
      {
        label:
          currentLocale === 'en'
            ? 'Operational efficiency'
            : currentLocale === 'pt-br'
              ? 'Eficiência operacional'
              : 'Eficiencia operativa',
        improvement: '+80%',
        icon: '📈',
      },
      {
        label:
          currentLocale === 'en'
            ? 'Talent retention'
            : currentLocale === 'pt-br'
              ? 'Retenção de talentos'
              : 'Retención de talento',
        improvement: '+90%',
        icon: '🎯',
      },
    ],
    caseStudy: {
      company:
        currentLocale === 'en'
          ? 'LATAM FinTech Unicorn'
          : currentLocale === 'pt-br'
            ? 'Unicórnio FinTech LATAM'
            : 'FinTech Unicornio LATAM',
      challenge:
        currentLocale === 'en'
          ? 'Scale from 50 to 500 employees while maintaining agility'
          : currentLocale === 'pt-br'
            ? 'Escalar de 50 para 500 funcionários mantendo agilidade'
            : 'Escalar de 50 a 500 empleados manteniendo agilidad',
      solution:
        currentLocale === 'en'
          ? 'vCTO implemented microservices architecture, DevOps culture and centers of excellence'
          : currentLocale === 'pt-br'
            ? 'vCTO implementou arquitetura de microsserviços, cultura DevOps e centros de excelência'
            : 'vCTO implementó arquitectura de microservicios, cultura DevOps y centros de excelencia',
      results: [
        currentLocale === 'en'
          ? 'Successful IPO in 18 months'
          : currentLocale === 'pt-br'
            ? 'IPO bem-sucedido em 18 meses'
            : 'IPO exitoso en 18 meses',
        currentLocale === 'en'
          ? 'Expansion to 8 countries'
          : currentLocale === 'pt-br'
            ? 'Expansão para 8 países'
            : 'Expansión a 8 países',
        currentLocale === 'en'
          ? '10x user growth'
          : currentLocale === 'pt-br'
            ? '10x crescimento de usuários'
            : '10x crecimiento en usuarios',
        `NPS ${currentLocale === 'en' ? 'of' : currentLocale === 'pt-br' ? 'de' : 'de'} 85+`,
      ],
    },
  };

  const differentiators = [
    {
      title:
        currentLocale === 'en'
          ? 'Global Expert Network'
          : currentLocale === 'pt-br'
            ? 'Rede Global de Especialistas'
            : 'Red Global de Expertos',
      description:
        currentLocale === 'en'
          ? 'Access to 200+ specialists in emerging technologies'
          : currentLocale === 'pt-br'
            ? 'Acesso a +200 especialistas em tecnologias emergentes'
            : 'Acceso a +200 especialistas en tecnologías emergentes',
      icon: '🌐',
    },
    {
      title:
        currentLocale === 'en'
          ? 'Proven Methodology'
          : currentLocale === 'pt-br'
            ? 'Metodologia Comprovada'
            : 'Metodología Probada',
      description:
        currentLocale === 'en'
          ? 'MADFAM digital transformation framework'
          : currentLocale === 'pt-br'
            ? 'Framework MADFAM de transformação digital'
            : 'Framework MADFAM de transformación digital',
      icon: '📊',
    },
    {
      title:
        currentLocale === 'en'
          ? 'Innovation Ecosystem'
          : currentLocale === 'pt-br'
            ? 'Ecossistema de Inovação'
            : 'Ecosistema de Innovación',
      description:
        currentLocale === 'en'
          ? 'Connection with startups, VCs and R&D centers'
          : currentLocale === 'pt-br'
            ? 'Conexão com startups, VCs e centros de P&D'
            : 'Conexión con startups, VCs y centros de I+D',
      icon: '🔗',
    },
    {
      title:
        currentLocale === 'en'
          ? 'Guaranteed Results'
          : currentLocale === 'pt-br'
            ? 'Resultados Garantidos'
            : 'Resultados Garantizados',
      description:
        currentLocale === 'en'
          ? 'Clear KPIs and performance-based compensation'
          : currentLocale === 'pt-br'
            ? 'KPIs claros e compensação baseada em performance'
            : 'KPIs claros y compensación basada en performance',
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
                {currentLocale === 'en'
                  ? 'Level 5 • Strategic'
                  : currentLocale === 'pt-br'
                    ? 'Nível 5 • Estratégico'
                    : 'Nivel 5 • Strategic'}
              </span>
            </div>
            <Heading level={1} className="text-white mb-6">
              {currentLocale === 'en' ? (
                <>
                  Your virtual CTO for the <span className="gradient-text">digital era</span>
                </>
              ) : currentLocale === 'pt-br' ? (
                <>
                  Seu CTO virtual para a <span className="gradient-text">era digital</span>
                </>
              ) : (
                <>
                  Tu CTO virtual para la <span className="gradient-text">era digital</span>
                </>
              )}
            </Heading>
            <p className="text-xl text-white/90 mb-8 max-w-3xl">{serviceDescription}</p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Button variant="secondary" size="lg">
                {currentLocale === 'en'
                  ? 'Schedule executive meeting'
                  : currentLocale === 'pt-br'
                    ? 'Agendar reunião executiva'
                    : 'Agendar reunión ejecutiva'}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-obsidian"
              >
                {currentLocale === 'en'
                  ? 'Download case study'
                  : currentLocale === 'pt-br'
                    ? 'Baixar estudo de caso'
                    : 'Descargar caso de estudio'}
              </Button>
            </div>

            {/* Executive stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-white mb-1">50+</p>
                <p className="text-sm text-white/70">
                  {currentLocale === 'en'
                    ? 'CTOs in network'
                    : currentLocale === 'pt-br'
                      ? 'CTOs na rede'
                      : 'CTOs en red'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-white mb-1">$2B+</p>
                <p className="text-sm text-white/70">
                  {currentLocale === 'en'
                    ? 'Valuation managed'
                    : currentLocale === 'pt-br'
                      ? 'Avaliação gerenciada'
                      : 'Valuación gestionada'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-white mb-1">15+</p>
                <p className="text-sm text-white/70">
                  {currentLocale === 'en'
                    ? 'Years experience'
                    : currentLocale === 'pt-br'
                      ? 'Anos de experiência'
                      : 'Años experiencia'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-white mb-1">8/10</p>
                <p className="text-sm text-white/70">
                  {currentLocale === 'en'
                    ? 'LATAM Unicorns'
                    : currentLocale === 'pt-br'
                      ? 'Unicórnios LATAM'
                      : 'Unicornios LATAM'}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* vCTO Services */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {currentLocale === 'en'
                ? 'Comprehensive technology leadership'
                : currentLocale === 'pt-br'
                  ? 'Liderança tecnológica integral'
                  : 'Liderazgo integral en tecnología'}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {currentLocale === 'en'
                ? 'A virtual CTO covering all critical areas of your organization'
                : currentLocale === 'pt-br'
                  ? 'Um CTO virtual que cobre todas as áreas críticas da sua organização'
                  : 'Un CTO virtual que cubre todas las áreas críticas de tu organización'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {vCTOServices.map((vCTOService, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-5xl mb-4">{vCTOService.icon}</div>
                <h3 className="font-heading text-xl font-semibold mb-4">{vCTOService.area}</h3>
                <ul className="space-y-2">
                  {vCTOService.responsibilities.map((item, idx) => (
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
            <Heading level={2} className="mb-4">
              {currentLocale === 'en'
                ? 'Flexible collaboration models'
                : currentLocale === 'pt-br'
                  ? 'Modelos de colaboração flexíveis'
                  : 'Modelos de colaboración flexibles'}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {currentLocale === 'en'
                ? 'We adapt our service to your needs and growth stage'
                : currentLocale === 'pt-br'
                  ? 'Adaptamos nosso serviço às suas necessidades e estágio de crescimento'
                  : 'Adaptamos nuestro servicio a tus necesidades y etapa de crecimiento'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {engagement.models.map((model, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="text-center mb-6">
                  <h3 className="font-heading text-2xl font-bold mb-2">{model.type}</h3>
                  <p className="text-obsidian/60">{model.commitment}</p>
                </div>

                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm text-center text-obsidian/70">
                    {currentLocale === 'en'
                      ? 'Ideal for:'
                      : currentLocale === 'pt-br'
                        ? 'Ideal para:'
                        : 'Ideal para:'}{' '}
                    <span className="font-semibold">{model.ideal}</span>
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
                    {currentLocale === 'en'
                      ? 'More information'
                      : currentLocale === 'pt-br'
                        ? 'Mais informações'
                        : 'Más información'}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="font-heading text-xl font-semibold text-center mb-8">
              {currentLocale === 'en'
                ? 'Transformation journey'
                : currentLocale === 'pt-br'
                  ? 'Jornada de transformação'
                  : 'Journey de transformación'}
            </h3>
            <div className="relative">
              <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-obsidian/20 via-lavender to-obsidian/20" />
              <div className="grid grid-cols-4 gap-4">
                {engagement.timeline.map((phase, index) => (
                  <div key={index} className="relative">
                    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-lavender rounded-full" />
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
            <Heading level={2} className="mb-4">
              {currentLocale === 'en'
                ? 'Proven transformative impact'
                : currentLocale === 'pt-br'
                  ? 'Impacto transformador comprovado'
                  : 'Impacto transformador comprobado'}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {currentLocale === 'en'
                ? 'Results that speak louder than words'
                : currentLocale === 'pt-br'
                  ? 'Resultados que falam mais que palavras'
                  : 'Resultados que hablan más que las palabras'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Metrics */}
            <div>
              <h3 className="font-heading text-xl font-semibold mb-6">
                {currentLocale === 'en'
                  ? 'Average improvements'
                  : currentLocale === 'pt-br'
                    ? 'Melhorias médias'
                    : 'Mejoras promedio'}
              </h3>
              <div className="space-y-4">
                {impact.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-obsidian/5 to-lavender/5"
                  >
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
              <h3 className="font-heading text-xl font-semibold mb-4">
                {currentLocale === 'en'
                  ? 'Success story'
                  : currentLocale === 'pt-br'
                    ? 'Caso de sucesso'
                    : 'Caso de éxito'}
              </h3>
              <p className="font-semibold text-sun mb-2">{impact.caseStudy.company}</p>

              <div className="mb-4">
                <p className="text-sm text-white/70 mb-1">
                  {currentLocale === 'en'
                    ? 'Challenge:'
                    : currentLocale === 'pt-br'
                      ? 'Desafio:'
                      : 'Desafío:'}
                </p>
                <p className="text-white/90">{impact.caseStudy.challenge}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-white/70 mb-1">
                  {currentLocale === 'en'
                    ? 'Solution:'
                    : currentLocale === 'pt-br'
                      ? 'Solução:'
                      : 'Solución:'}
                </p>
                <p className="text-white/90">{impact.caseStudy.solution}</p>
              </div>

              <div>
                <p className="text-sm text-white/70 mb-2">
                  {currentLocale === 'en'
                    ? 'Results:'
                    : currentLocale === 'pt-br'
                      ? 'Resultados:'
                      : 'Resultados:'}
                </p>
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
            <Heading level={2} className="mb-4">
              {currentLocale === 'en'
                ? 'The MADFAM difference'
                : currentLocale === 'pt-br'
                  ? 'A diferença MADFAM'
                  : 'La diferencia MADFAM'}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {currentLocale === 'en'
                ? 'Why the most visionary leaders choose us'
                : currentLocale === 'pt-br'
                  ? 'Por que os líderes mais visionários nos escolhem'
                  : 'Por qué los líderes más visionarios nos eligen'}
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
            <Heading level={2} className="mb-4">
              {currentLocale === 'en'
                ? 'Complementary services'
                : currentLocale === 'pt-br'
                  ? 'Serviços complementares'
                  : 'Servicios complementarios'}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {currentLocale === 'en'
                ? 'Boost your transformation with additional services'
                : currentLocale === 'pt-br'
                  ? 'Potencialize sua transformação com serviços adicionais'
                  : 'Potencia tu transformación con servicios adicionales'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {otherServices.map(relatedService => (
              <ServiceCard key={relatedService.id} service={relatedService} />
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
                  {currentLocale === 'en'
                    ? 'Ready to lead the future?'
                    : currentLocale === 'pt-br'
                      ? 'Pronto para liderar o futuro?'
                      : '¿Listo para liderar el futuro?'}
                </Heading>
                <p className="text-xl text-white/90 mb-8">
                  {currentLocale === 'en'
                    ? 'Schedule an executive conversation with our leadership team and discover how a vCTO can transform your organization.'
                    : currentLocale === 'pt-br'
                      ? 'Agende uma conversa executiva com nossa equipe de liderança e descubra como um vCTO pode transformar sua organização.'
                      : 'Agenda una conversación ejecutiva con nuestro equipo de liderazgo y descubre cómo un vCTO puede transformar tu organización.'}
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-sun mr-3">✓</span>
                    <span className="text-white/80">
                      {currentLocale === 'en'
                        ? 'Free executive evaluation'
                        : currentLocale === 'pt-br'
                          ? 'Avaliação executiva gratuita'
                          : 'Evaluación ejecutiva gratuita'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sun mr-3">✓</span>
                    <span className="text-white/80">
                      {currentLocale === 'en'
                        ? 'Personalized proposal in 48 hrs'
                        : currentLocale === 'pt-br'
                          ? 'Proposta personalizada em 48 hrs'
                          : 'Propuesta personalizada en 48 hrs'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sun mr-3">✓</span>
                    <span className="text-white/80">
                      {currentLocale === 'en'
                        ? 'Immediate start available'
                        : currentLocale === 'pt-br'
                          ? 'Início imediato disponível'
                          : 'Inicio inmediato disponible'}
                    </span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Button variant="secondary" size="lg">
                    {currentLocale === 'en'
                      ? 'Schedule meeting'
                      : currentLocale === 'pt-br'
                        ? 'Agendar reunião'
                        : 'Agendar reunión'}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-obsidian"
                  >
                    {currentLocale === 'en'
                      ? 'Download brochure'
                      : currentLocale === 'pt-br'
                        ? 'Baixar brochura'
                        : 'Descargar brochure'}
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                  <h3 className="font-heading text-xl font-semibold mb-4">
                    {currentLocale === 'en'
                      ? 'Direct contact'
                      : currentLocale === 'pt-br'
                        ? 'Contato direto'
                        : 'Contacto directo'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-white/60 text-sm mb-1">
                        {currentLocale === 'en'
                          ? 'Executive email'
                          : currentLocale === 'pt-br'
                            ? 'Email executivo'
                            : 'Email ejecutivo'}
                      </p>
                      <p className="font-semibold">strategic@madfam.io</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">WhatsApp Business</p>
                      <p className="font-semibold">+52 55 1234 5678</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">
                        {currentLocale === 'en'
                          ? 'Calendar'
                          : currentLocale === 'pt-br'
                            ? 'Calendário'
                            : 'Calendario'}
                      </p>
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
