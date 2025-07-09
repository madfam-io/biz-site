'use client';

import { Container, Heading, Button } from '@madfam/ui';
import { serviceTiers, ServiceTier } from '@madfam/core';
import { ServiceCard } from '@/components/ServiceCard';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getLocalizedContent, type Locale, useTypedTranslations } from '@madfam/i18n';

export default function Level5StrategicPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const service = serviceTiers[ServiceTier.L5_STRATEGIC];
  const t = useTypedTranslations('services');
  const currentLocale = locale as Locale;
  
  // Get localized content from service object
  const serviceName = getLocalizedContent(service.name, currentLocale);
  const serviceDescription = getLocalizedContent(service.description, currentLocale);
  const otherServices = [
    serviceTiers[ServiceTier.L3_CONSULTING],
    serviceTiers[ServiceTier.L4_PLATFORMS],
  ];

  const vCTOServices = [
    {
      area: currentLocale === 'en-US' ? 'Technology Strategy' : currentLocale === 'pt-BR' ? 'Estratégia Tecnológica' : 'Estrategia Tecnológica',
      icon: '🎯',
      responsibilities: [
        currentLocale === 'en-US' ? '3-5 year technology roadmap' : currentLocale === 'pt-BR' ? 'Roadmap tecnológico de 3-5 anos' : 'Roadmap tecnológico a 3-5 años',
        currentLocale === 'en-US' ? 'Technology evaluation and selection' : currentLocale === 'pt-BR' ? 'Avaliação e seleção de tecnologias' : 'Evaluación y selección de tecnologías',
        currentLocale === 'en-US' ? 'Enterprise architecture' : currentLocale === 'pt-BR' ? 'Arquitetura empresarial' : 'Arquitectura empresarial',
        currentLocale === 'en-US' ? 'Innovation and digital transformation' : currentLocale === 'pt-BR' ? 'Inovação e transformação digital' : 'Innovación y transformación digital',
        currentLocale === 'en-US' ? 'IT governance and policies' : currentLocale === 'pt-BR' ? 'Governança de TI e políticas' : 'Gobierno de TI y políticas',
      ],
    },
    {
      area: currentLocale === 'en-US' ? 'Team Leadership' : currentLocale === 'pt-BR' ? 'Liderança de Equipes' : 'Liderazgo de Equipos',
      icon: '👥',
      responsibilities: [
        currentLocale === 'en-US' ? 'Tech talent recruitment' : currentLocale === 'pt-BR' ? 'Recrutamento de talentos tech' : 'Reclutamiento de talento tech',
        currentLocale === 'en-US' ? 'Team development and mentoring' : currentLocale === 'pt-BR' ? 'Desenvolvimento e mentoria de equipes' : 'Desarrollo y mentoría de equipos',
        currentLocale === 'en-US' ? 'Innovation culture' : currentLocale === 'pt-BR' ? 'Cultura de inovação' : 'Cultura de innovación',
        currentLocale === 'en-US' ? 'Agile methodologies' : currentLocale === 'pt-BR' ? 'Metodologias ágeis' : 'Metodologías ágiles',
        currentLocale === 'en-US' ? 'Vendor management' : currentLocale === 'pt-BR' ? 'Gestão de fornecedores' : 'Gestión de proveedores',
      ],
    },
    {
      area: currentLocale === 'en-US' ? 'Operations & Delivery' : currentLocale === 'pt-BR' ? 'Operações & Entrega' : 'Operaciones & Delivery',
      icon: '⚡',
      responsibilities: [
        currentLocale === 'en-US' ? 'Strategic project management' : currentLocale === 'pt-BR' ? 'Gestão de projetos estratégicos' : 'Gestión de proyectos estratégicos',
        currentLocale === 'en-US' ? 'Process optimization' : currentLocale === 'pt-BR' ? 'Otimização de processos' : 'Optimización de procesos',
        'DevOps ' + (currentLocale === 'en-US' ? 'and' : currentLocale === 'pt-BR' ? 'e' : 'y') + ' CI/CD',
        currentLocale === 'en-US' ? 'Security and compliance' : currentLocale === 'pt-BR' ? 'Segurança e conformidade' : 'Seguridad y compliance',
        currentLocale === 'en-US' ? 'Business continuity' : currentLocale === 'pt-BR' ? 'Continuidade de negócios' : 'Continuidad del negocio',
      ],
    },
    {
      area: currentLocale === 'en-US' ? 'Innovation & Growth' : currentLocale === 'pt-BR' ? 'Inovação & Crescimento' : 'Innovación & Growth',
      icon: '🚀',
      responsibilities: [
        currentLocale === 'en-US' ? 'New business models' : currentLocale === 'pt-BR' ? 'Novos modelos de negócio' : 'Nuevos modelos de negocio',
        currentLocale === 'en-US' ? 'Digital products' : currentLocale === 'pt-BR' ? 'Produtos digitais' : 'Productos digitales',
        currentLocale === 'en-US' ? 'Technology partnerships' : currentLocale === 'pt-BR' ? 'Parcerias tecnológicas' : 'Partnerships tecnológicos',
        currentLocale === 'en-US' ? 'Innovation ecosystems' : currentLocale === 'pt-BR' ? 'Ecossistemas de inovação' : 'Ecosistemas de innovación',
        'Venture building',
      ],
    },
  ];

  const engagement = {
    models: [
      {
        type: currentLocale === 'en-US' ? 'Dedicated vCTO' : currentLocale === 'pt-BR' ? 'vCTO Dedicado' : 'vCTO Dedicado',
        commitment: 'Full-time',
        ideal: currentLocale === 'en-US' ? 'Complete transformation' : currentLocale === 'pt-BR' ? 'Transformação completa' : 'Transformación completa',
        includes: [
          currentLocale === 'en-US' ? 'Exclusive virtual CTO' : currentLocale === 'pt-BR' ? 'CTO virtual exclusivo' : 'CTO virtual exclusivo',
          currentLocale === 'en-US' ? 'Executive presence' : currentLocale === 'pt-BR' ? 'Presença executiva' : 'Presencia ejecutiva',
          currentLocale === 'en-US' ? 'MADFAM support team' : currentLocale === 'pt-BR' ? 'Equipe de suporte MADFAM' : 'Equipo de soporte MADFAM',
          currentLocale === 'en-US' ? 'Full resource access' : currentLocale === 'pt-BR' ? 'Acesso total a recursos' : 'Acceso total a recursos',
        ],
      },
      {
        type: 'vCTO Fractional',
        commitment: 'Part-time (50-80%)',
        ideal: currentLocale === 'en-US' ? 'Growing scale-ups' : currentLocale === 'pt-BR' ? 'Scale-ups em crescimento' : 'Scale-ups en crecimiento',
        includes: [
          currentLocale === 'en-US' ? 'Shared CTO' : currentLocale === 'pt-BR' ? 'CTO compartilhado' : 'CTO compartido',
          currentLocale === 'en-US' ? 'Weekly executive meetings' : currentLocale === 'pt-BR' ? 'Reuniões executivas semanais' : 'Reuniones ejecutivas semanales',
          currentLocale === 'en-US' ? 'Specialist support' : currentLocale === 'pt-BR' ? 'Suporte de especialistas' : 'Soporte de especialistas',
          currentLocale === 'en-US' ? 'On-demand resources' : currentLocale === 'pt-BR' ? 'Recursos sob demanda' : 'Recursos on-demand',
        ],
      },
      {
        type: 'vCTO Advisory',
        commitment: '20-40 hrs/' + (currentLocale === 'en-US' ? 'month' : currentLocale === 'pt-BR' ? 'mês' : 'mes'),
        ideal: currentLocale === 'en-US' ? 'Strategic consulting' : currentLocale === 'pt-BR' ? 'Consultoria estratégica' : 'Consultoría estratégica',
        includes: [
          currentLocale === 'en-US' ? 'Monthly advisory' : currentLocale === 'pt-BR' ? 'Assessoria mensal' : 'Asesoría mensual',
          currentLocale === 'en-US' ? 'Quarterly reviews' : currentLocale === 'pt-BR' ? 'Revisões trimestrais' : 'Revisiones trimestrales',
          currentLocale === 'en-US' ? 'Expert network access' : currentLocale === 'pt-BR' ? 'Acesso à rede de especialistas' : 'Acceso a red de expertos',
          currentLocale === 'en-US' ? 'Executive workshops' : currentLocale === 'pt-BR' ? 'Workshops executivos' : 'Workshops ejecutivos',
        ],
      },
    ],
    timeline: [
      { phase: currentLocale === 'en-US' ? 'Diagnosis' : currentLocale === 'pt-BR' ? 'Diagnóstico' : 'Diagnóstico', duration: '2-4 ' + (currentLocale === 'en-US' ? 'weeks' : currentLocale === 'pt-BR' ? 'semanas' : 'semanas'), focus: currentLocale === 'en-US' ? '360° evaluation of current capabilities' : currentLocale === 'pt-BR' ? 'Avaliação 360° das capacidades atuais' : 'Evaluación 360° de capacidades actuales' },
      { phase: currentLocale === 'en-US' ? 'Strategy' : currentLocale === 'pt-BR' ? 'Estratégia' : 'Estrategia', duration: '4-6 ' + (currentLocale === 'en-US' ? 'weeks' : currentLocale === 'pt-BR' ? 'semanas' : 'semanas'), focus: currentLocale === 'en-US' ? 'Vision and roadmap definition' : currentLocale === 'pt-BR' ? 'Definição de visão e roadmap' : 'Definición de visión y roadmap' },
      { phase: currentLocale === 'en-US' ? 'Execution' : currentLocale === 'pt-BR' ? 'Execução' : 'Ejecución', duration: '6-12 ' + (currentLocale === 'en-US' ? 'months' : currentLocale === 'pt-BR' ? 'meses' : 'meses'), focus: currentLocale === 'en-US' ? 'Key initiative implementation' : currentLocale === 'pt-BR' ? 'Implementação de iniciativas-chave' : 'Implementación de iniciativas clave' },
      { phase: currentLocale === 'en-US' ? 'Evolution' : currentLocale === 'pt-BR' ? 'Evolução' : 'Evolución', duration: currentLocale === 'en-US' ? 'Continuous' : currentLocale === 'pt-BR' ? 'Contínuo' : 'Continuo', focus: currentLocale === 'en-US' ? 'Optimization and new opportunities' : currentLocale === 'pt-BR' ? 'Otimização e novas oportunidades' : 'Optimización y nuevas oportunidades' },
    ],
  };

  const impact = {
    metrics: [
      { label: currentLocale === 'en-US' ? 'Innovation speed' : currentLocale === 'pt-BR' ? 'Velocidade de inovação' : 'Velocidad de innovación', improvement: '5x', icon: '⚡' },
      { label: 'Time-to-market', improvement: '-60%', icon: '⏱️' },
      { label: currentLocale === 'en-US' ? 'Operational efficiency' : currentLocale === 'pt-BR' ? 'Eficiência operacional' : 'Eficiencia operativa', improvement: '+80%', icon: '📈' },
      { label: currentLocale === 'en-US' ? 'Talent retention' : currentLocale === 'pt-BR' ? 'Retenção de talentos' : 'Retención de talento', improvement: '+90%', icon: '🎯' },
    ],
    caseStudy: {
      company: currentLocale === 'en-US' ? 'LATAM FinTech Unicorn' : currentLocale === 'pt-BR' ? 'Unicórnio FinTech LATAM' : 'FinTech Unicornio LATAM',
      challenge: currentLocale === 'en-US' ? 'Scale from 50 to 500 employees while maintaining agility' : currentLocale === 'pt-BR' ? 'Escalar de 50 para 500 funcionários mantendo agilidade' : 'Escalar de 50 a 500 empleados manteniendo agilidad',
      solution: currentLocale === 'en-US' ? 'vCTO implemented microservices architecture, DevOps culture and centers of excellence' : currentLocale === 'pt-BR' ? 'vCTO implementou arquitetura de microsserviços, cultura DevOps e centros de excelência' : 'vCTO implementó arquitectura de microservicios, cultura DevOps y centros de excelencia',
      results: [
        currentLocale === 'en-US' ? 'Successful IPO in 18 months' : currentLocale === 'pt-BR' ? 'IPO bem-sucedido em 18 meses' : 'IPO exitoso en 18 meses',
        currentLocale === 'en-US' ? 'Expansion to 8 countries' : currentLocale === 'pt-BR' ? 'Expansão para 8 países' : 'Expansión a 8 países',
        currentLocale === 'en-US' ? '10x user growth' : currentLocale === 'pt-BR' ? '10x crescimento de usuários' : '10x crecimiento en usuarios',
        'NPS ' + (currentLocale === 'en-US' ? 'of' : currentLocale === 'pt-BR' ? 'de' : 'de') + ' 85+',
      ],
    },
  };

  const differentiators = [
    {
      title: currentLocale === 'en-US' ? 'Global Expert Network' : currentLocale === 'pt-BR' ? 'Rede Global de Especialistas' : 'Red Global de Expertos',
      description: currentLocale === 'en-US' ? 'Access to 200+ specialists in emerging technologies' : currentLocale === 'pt-BR' ? 'Acesso a +200 especialistas em tecnologias emergentes' : 'Acceso a +200 especialistas en tecnologías emergentes',
      icon: '🌐',
    },
    {
      title: currentLocale === 'en-US' ? 'Proven Methodology' : currentLocale === 'pt-BR' ? 'Metodologia Comprovada' : 'Metodología Probada',
      description: currentLocale === 'en-US' ? 'MADFAM digital transformation framework' : currentLocale === 'pt-BR' ? 'Framework MADFAM de transformação digital' : 'Framework MADFAM de transformación digital',
      icon: '📊',
    },
    {
      title: currentLocale === 'en-US' ? 'Innovation Ecosystem' : currentLocale === 'pt-BR' ? 'Ecossistema de Inovação' : 'Ecosistema de Innovación',
      description: currentLocale === 'en-US' ? 'Connection with startups, VCs and R&D centers' : currentLocale === 'pt-BR' ? 'Conexão com startups, VCs e centros de P&D' : 'Conexión con startups, VCs y centros de I+D',
      icon: '🔗',
    },
    {
      title: currentLocale === 'en-US' ? 'Guaranteed Results' : currentLocale === 'pt-BR' ? 'Resultados Garantidos' : 'Resultados Garantizados',
      description: currentLocale === 'en-US' ? 'Clear KPIs and performance-based compensation' : currentLocale === 'pt-BR' ? 'KPIs claros e compensação baseada em performance' : 'KPIs claros y compensación basada en performance',
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
                {currentLocale === 'en-US' ? 'Level 5 • Strategic' : currentLocale === 'pt-BR' ? 'Nível 5 • Estratégico' : 'Nivel 5 • Strategic'}
              </span>
            </div>
            <Heading level={1} className="text-white mb-6">
              {currentLocale === 'en-US' ? <>Your virtual CTO for the <span className="gradient-text">digital era</span></> : currentLocale === 'pt-BR' ? <>Seu CTO virtual para a <span className="gradient-text">era digital</span></> : <>Tu CTO virtual para la <span className="gradient-text">era digital</span></>}
            </Heading>
            <p className="text-xl text-white/90 mb-8 max-w-3xl">
              {serviceDescription}
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Button variant="secondary" size="lg">
                {currentLocale === 'en-US' ? 'Schedule executive meeting' : currentLocale === 'pt-BR' ? 'Agendar reunião executiva' : 'Agendar reunión ejecutiva'}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-obsidian"
              >
                {currentLocale === 'en-US' ? 'Download case study' : currentLocale === 'pt-BR' ? 'Baixar estudo de caso' : 'Descargar caso de estudio'}
              </Button>
            </div>

            {/* Executive stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-white mb-1">50+</p>
                <p className="text-sm text-white/70">{currentLocale === 'en-US' ? 'CTOs in network' : currentLocale === 'pt-BR' ? 'CTOs na rede' : 'CTOs en red'}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-white mb-1">$2B+</p>
                <p className="text-sm text-white/70">{currentLocale === 'en-US' ? 'Valuation managed' : currentLocale === 'pt-BR' ? 'Avaliação gerenciada' : 'Valuación gestionada'}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-white mb-1">15+</p>
                <p className="text-sm text-white/70">{currentLocale === 'en-US' ? 'Years experience' : currentLocale === 'pt-BR' ? 'Anos de experiência' : 'Años experiencia'}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-white mb-1">8/10</p>
                <p className="text-sm text-white/70">{currentLocale === 'en-US' ? 'LATAM Unicorns' : currentLocale === 'pt-BR' ? 'Unicórnios LATAM' : 'Unicornios LATAM'}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* vCTO Services */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">{currentLocale === 'en-US' ? 'Comprehensive technology leadership' : currentLocale === 'pt-BR' ? 'Liderança tecnológica integral' : 'Liderazgo integral en tecnología'}</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {currentLocale === 'en-US' ? 'A virtual CTO covering all critical areas of your organization' : currentLocale === 'pt-BR' ? 'Um CTO virtual que cobre todas as áreas críticas da sua organização' : 'Un CTO virtual que cubre todas las áreas críticas de tu organización'}
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
            <Heading level={2} className="mb-4">{currentLocale === 'en-US' ? 'Flexible collaboration models' : currentLocale === 'pt-BR' ? 'Modelos de colaboração flexíveis' : 'Modelos de colaboración flexibles'}</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {currentLocale === 'en-US' ? 'We adapt our service to your needs and growth stage' : currentLocale === 'pt-BR' ? 'Adaptamos nosso serviço às suas necessidades e estágio de crescimento' : 'Adaptamos nuestro servicio a tus necesidades y etapa de crecimiento'}
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
                    {currentLocale === 'en-US' ? 'Ideal for:' : currentLocale === 'pt-BR' ? 'Ideal para:' : 'Ideal para:'} <span className="font-semibold">{model.ideal}</span>
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
                    {currentLocale === 'en-US' ? 'More information' : currentLocale === 'pt-BR' ? 'Mais informações' : 'Más información'}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="font-heading text-xl font-semibold text-center mb-8">
              {currentLocale === 'en-US' ? 'Transformation journey' : currentLocale === 'pt-BR' ? 'Jornada de transformação' : 'Journey de transformación'}
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
            <Heading level={2} className="mb-4">{currentLocale === 'en-US' ? 'Proven transformative impact' : currentLocale === 'pt-BR' ? 'Impacto transformador comprovado' : 'Impacto transformador comprobado'}</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {currentLocale === 'en-US' ? 'Results that speak louder than words' : currentLocale === 'pt-BR' ? 'Resultados que falam mais que palavras' : 'Resultados que hablan más que las palabras'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Metrics */}
            <div>
              <h3 className="font-heading text-xl font-semibold mb-6">{currentLocale === 'en-US' ? 'Average improvements' : currentLocale === 'pt-BR' ? 'Melhorias médias' : 'Mejoras promedio'}</h3>
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
              <h3 className="font-heading text-xl font-semibold mb-4">{currentLocale === 'en-US' ? 'Success story' : currentLocale === 'pt-BR' ? 'Caso de sucesso' : 'Caso de éxito'}</h3>
              <p className="font-semibold text-sun mb-2">{impact.caseStudy.company}</p>
              
              <div className="mb-4">
                <p className="text-sm text-white/70 mb-1">{currentLocale === 'en-US' ? 'Challenge:' : currentLocale === 'pt-BR' ? 'Desafio:' : 'Desafío:'}</p>
                <p className="text-white/90">{impact.caseStudy.challenge}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-white/70 mb-1">{currentLocale === 'en-US' ? 'Solution:' : currentLocale === 'pt-BR' ? 'Solução:' : 'Solución:'}</p>
                <p className="text-white/90">{impact.caseStudy.solution}</p>
              </div>
              
              <div>
                <p className="text-sm text-white/70 mb-2">{currentLocale === 'en-US' ? 'Results:' : currentLocale === 'pt-BR' ? 'Resultados:' : 'Resultados:'}</p>
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
            <Heading level={2} className="mb-4">{currentLocale === 'en-US' ? 'The MADFAM difference' : currentLocale === 'pt-BR' ? 'A diferença MADFAM' : 'La diferencia MADFAM'}</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {currentLocale === 'en-US' ? 'Why the most visionary leaders choose us' : currentLocale === 'pt-BR' ? 'Por que os líderes mais visionários nos escolhem' : 'Por qué los líderes más visionarios nos eligen'}
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
            <Heading level={2} className="mb-4">{currentLocale === 'en-US' ? 'Complementary services' : currentLocale === 'pt-BR' ? 'Serviços complementares' : 'Servicios complementarios'}</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {currentLocale === 'en-US' ? 'Boost your transformation with additional services' : currentLocale === 'pt-BR' ? 'Potencialize sua transformação com serviços adicionais' : 'Potencia tu transformación con servicios adicionales'}
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
                  {currentLocale === 'en-US' ? 'Ready to lead the future?' : currentLocale === 'pt-BR' ? 'Pronto para liderar o futuro?' : '¿Listo para liderar el futuro?'}
                </Heading>
                <p className="text-xl text-white/90 mb-8">
                  {currentLocale === 'en-US' ? 'Schedule an executive conversation with our leadership team and discover how a vCTO can transform your organization.' : currentLocale === 'pt-BR' ? 'Agende uma conversa executiva com nossa equipe de liderança e descubra como um vCTO pode transformar sua organização.' : 'Agenda una conversación ejecutiva con nuestro equipo de liderazgo y descubre cómo un vCTO puede transformar tu organización.'}
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <span className="text-sun mr-3">✓</span>
                    <span className="text-white/80">{currentLocale === 'en-US' ? 'Free executive evaluation' : currentLocale === 'pt-BR' ? 'Avaliação executiva gratuita' : 'Evaluación ejecutiva gratuita'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sun mr-3">✓</span>
                    <span className="text-white/80">{currentLocale === 'en-US' ? 'Personalized proposal in 48 hrs' : currentLocale === 'pt-BR' ? 'Proposta personalizada em 48 hrs' : 'Propuesta personalizada en 48 hrs'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-sun mr-3">✓</span>
                    <span className="text-white/80">{currentLocale === 'en-US' ? 'Immediate start available' : currentLocale === 'pt-BR' ? 'Início imediato disponível' : 'Inicio inmediato disponible'}</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-4">
                  <Button variant="secondary" size="lg">
                    {currentLocale === 'en-US' ? 'Schedule meeting' : currentLocale === 'pt-BR' ? 'Agendar reunião' : 'Agendar reunión'}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white text-white hover:bg-white hover:text-obsidian"
                  >
                    {currentLocale === 'en-US' ? 'Download brochure' : currentLocale === 'pt-BR' ? 'Baixar brochura' : 'Descargar brochure'}
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
                  <h3 className="font-heading text-xl font-semibold mb-4">{currentLocale === 'en-US' ? 'Direct contact' : currentLocale === 'pt-BR' ? 'Contato direto' : 'Contacto directo'}</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-white/60 text-sm mb-1">{currentLocale === 'en-US' ? 'Executive email' : currentLocale === 'pt-BR' ? 'Email executivo' : 'Email ejecutivo'}</p>
                      <p className="font-semibold">strategic@madfam.io</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">WhatsApp Business</p>
                      <p className="font-semibold">+52 55 1234 5678</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm mb-1">{currentLocale === 'en-US' ? 'Calendar' : currentLocale === 'pt-BR' ? 'Calendário' : 'Calendario'}</p>
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