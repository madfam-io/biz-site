'use client';

import { serviceTiers, ServiceTier } from '@madfam/core';
import { getLocalizedContent, type Locale } from '@madfam/i18n';
import {
  Container,
  Heading,
  Button,
  Card,
  CardContent,
  ROICalculator,
  LeadForm,
  TestimonialGrid,
  Hero,
} from '@madfam/ui';
import { useTranslations } from 'next-intl';
import { ServiceStructuredData } from '@/components/StructuredData';
import { logServiceInquiry } from '@/lib/logger';

export default function Level3ConsultingPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // unstable_setRequestLocale(locale); // Not needed in client component
  const service = serviceTiers[ServiceTier.L3_CONSULTING];
  const t = useTranslations('services');
  const currentLocale = locale as Locale;

  // Get localized content from service object
  const serviceName = getLocalizedContent(service.name, currentLocale);
  const serviceDescription = getLocalizedContent(service.description, currentLocale);

  const benefits = [
    {
      icon: '🎯',
      title: t('level3.benefits.items.strategy.title'),
      description: t('level3.benefits.items.strategy.description'),
    },
    {
      icon: '👥',
      title: t('level3.benefits.items.training.title'),
      description: t('level3.benefits.items.training.description'),
    },
    {
      icon: '📊',
      title: t('level3.benefits.items.metrics.title'),
      description: t('level3.benefits.items.metrics.description'),
    },
    {
      icon: '🔄',
      title: t('level3.benefits.items.continuous.title'),
      description: t('level3.benefits.items.continuous.description'),
    },
  ];

  const process = [
    {
      step: 1,
      title: t('level3.process.steps.diagnosis.title'),
      description: t('level3.process.steps.diagnosis.description'),
      duration: `1 ${currentLocale === 'en-US' ? 'week' : currentLocale === 'pt-BR' ? 'semana' : 'semana'}`,
    },
    {
      step: 2,
      title: t('level3.process.steps.strategy.title'),
      description: t('level3.process.steps.strategy.description'),
      duration: `2 ${currentLocale === 'en-US' ? 'weeks' : currentLocale === 'pt-BR' ? 'semanas' : 'semanas'}`,
    },
    {
      step: 3,
      title: t('level3.process.steps.implementation.title'),
      description: t('level3.process.steps.implementation.description'),
      duration: `4-8 ${currentLocale === 'en-US' ? 'weeks' : currentLocale === 'pt-BR' ? 'semanas' : 'semanas'}`,
    },
    {
      step: 4,
      title: t('level3.process.steps.optimization.title'),
      description: t('level3.process.steps.optimization.description'),
      duration:
        currentLocale === 'en-US' ? 'Ongoing' : currentLocale === 'pt-BR' ? 'Contínuo' : 'Continuo',
    },
  ];

  const testimonials = [
    {
      id: 'maria-gonzalez',
      content:
        currentLocale === 'en-US'
          ? 'MADFAM completely transformed the way we work. The workshops were incredibly practical and the team provided ongoing support throughout implementation.'
          : currentLocale === 'pt-BR'
            ? 'MADFAM transformou completamente nossa forma de trabalhar. Os workshops foram incrivelmente práticos e a equipe forneceu suporte contínuo durante a implementação.'
            : 'MADFAM transformó completamente nuestra forma de trabajar. Los workshops fueron increíblemente prácticos y el equipo brindó soporte continuo durante la implementación.',
      author: {
        name: 'María González',
        role: 'CTO',
        company: 'TechCorp México',
        image: '/testimonials/maria-gonzalez.jpg',
      },
      rating: 5,
      service: 'L3 - Consulting',
      results: [
        {
          metric:
            currentLocale === 'en-US'
              ? 'Efficiency gain'
              : currentLocale === 'pt-BR'
                ? 'Ganho de eficiência'
                : 'Ganancia de eficiencia',
          value: '45%',
          description:
            currentLocale === 'en-US'
              ? 'In process automation'
              : currentLocale === 'pt-BR'
                ? 'Na automação de processos'
                : 'En automatización de procesos',
        },
        {
          metric:
            currentLocale === 'en-US'
              ? 'Cost reduction'
              : currentLocale === 'pt-BR'
                ? 'Redução de custos'
                : 'Reducción de costos',
          value: '30%',
          description:
            currentLocale === 'en-US'
              ? 'In operational costs'
              : currentLocale === 'pt-BR'
                ? 'Em custos operacionais'
                : 'En costos operacionales',
        },
      ],
    },
    {
      id: 'carlos-ramirez',
      content:
        currentLocale === 'en-US'
          ? 'The ROI was evident from the first month. We automated processes that took days in minutes. The strategic guidance was invaluable.'
          : currentLocale === 'pt-BR'
            ? 'O ROI foi evidente desde o primeiro mês. Automatizamos processos que levavam dias em minutos. A orientação estratégica foi inestimável.'
            : 'El ROI fue evidente desde el primer mes. Automatizamos procesos que tomaban días en minutos. La guía estratégica fue invaluable.',
      author: {
        name: 'Carlos Ramírez',
        role:
          currentLocale === 'en-US'
            ? 'Innovation Director'
            : currentLocale === 'pt-BR'
              ? 'Diretor de Inovação'
              : 'Director de Innovación',
        company:
          currentLocale === 'en-US'
            ? 'Industrial Group'
            : currentLocale === 'pt-BR'
              ? 'Grupo Industrial'
              : 'Grupo Industrial',
        image: '/testimonials/carlos-ramirez.jpg',
      },
      rating: 5,
      service: 'L3 - Consulting',
      results: [
        {
          metric: 'ROI',
          value: '320%',
          description:
            currentLocale === 'en-US'
              ? 'In first 6 months'
              : currentLocale === 'pt-BR'
                ? 'Nos primeiros 6 meses'
                : 'En los primeros 6 meses',
        },
        {
          metric:
            currentLocale === 'en-US'
              ? 'Time saved'
              : currentLocale === 'pt-BR'
                ? 'Tempo economizado'
                : 'Tiempo ahorrado',
          value: '120',
          description:
            currentLocale === 'en-US'
              ? 'Hours per week'
              : currentLocale === 'pt-BR'
                ? 'Horas por semana'
                : 'Horas por semana',
        },
      ],
    },
  ];

  return (
    <>
      <ServiceStructuredData
        name={serviceName}
        description={serviceDescription}
        serviceType="Consulting"
      />
      <main className="min-h-screen">
        {/* Hero Section */}
        <Hero
          variant="service"
          title={t('level3.hero.title')}
          subtitle={t('level3.hero.badge')}
          description={serviceDescription}
          cta={{
            primary: {
              text: t('level3.hero.scheduleInitial'),
              href: '#consultation',
              variant: 'creative',
            },
            secondary: {
              text: t('level3.hero.downloadCase'),
              href: '#case-study',
              variant: 'outline',
            },
          }}
          background="gradient"
          className="pt-20"
        >
          <div className="flex items-center gap-6 text-sm text-white/80">
            <div>
              <span className="font-semibold text-white">
                3-6{' '}
                {currentLocale === 'en-US'
                  ? 'months'
                  : currentLocale === 'pt-BR'
                    ? 'meses'
                    : 'meses'}
              </span>{' '}
              {t('level3.hero.typicalDuration')}
            </div>
            <div>
              <span className="font-semibold text-white">87%</span> {t('level3.hero.satisfaction')}
            </div>
          </div>
        </Hero>

        {/* Benefits Section */}
        <section className="section">
          <Container>
            <div className="text-center mb-12">
              <Heading level={2} className="mb-4">
                {t('level3.benefits.title')}
              </Heading>
              <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
                {t('level3.benefits.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} variant="default">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{benefit.icon}</div>
                      <div>
                        <h3 className="font-heading text-xl mb-2">{benefit.title}</h3>
                        <p className="text-obsidian/70">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Process Section */}
        <section className="section bg-pearl">
          <Container>
            <div className="text-center mb-12">
              <Heading level={2} className="mb-4">
                {t('level3.process.title')}
              </Heading>
              <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
                {t('level3.process.subtitle')}
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {process.map((phase, index) => (
                <div key={phase.step} className="relative">
                  {/* Connection line */}
                  {index < process.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-24 bg-lavender/30" />
                  )}

                  <div className="flex gap-6 mb-12">
                    <div className="flex-shrink-0 w-16 h-16 bg-lavender text-white rounded-full flex items-center justify-center font-heading text-xl font-bold">
                      {phase.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-xl mb-2">{phase.title}</h3>
                      <p className="text-obsidian/70 mb-2">{phase.description}</p>
                      <span className="text-sm font-mono text-lavender">{phase.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Included Services */}
        <section className="section">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Heading level={2} className="mb-6">
                  {t('level3.included.title')}
                </Heading>
                <ul className="space-y-4">
                  {getLocalizedContent(service.features, currentLocale).map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-2xl text-leaf">✓</span>
                      <span className="text-lg text-obsidian/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-obsidian to-obsidian/90 text-white rounded-2xl p-8">
                <h3 className="font-heading text-2xl mb-4">
                  {currentLocale === 'en-US'
                    ? 'Investment'
                    : currentLocale === 'pt-BR'
                      ? 'Investimento'
                      : 'Inversión'}
                </h3>
                <div className="mb-6">
                  <p className="text-sm opacity-80">
                    {currentLocale === 'en-US'
                      ? 'Starting from'
                      : currentLocale === 'pt-BR'
                        ? 'A partir de'
                        : 'Desde'}
                  </p>
                  <p className="text-4xl font-heading font-bold">
                    ${service.startingPrice.toLocaleString()} {service.currency}
                  </p>
                  <p className="text-sm opacity-80 mt-2">
                    {currentLocale === 'en-US'
                      ? 'per project'
                      : currentLocale === 'pt-BR'
                        ? 'por projeto'
                        : 'por proyecto'}
                  </p>
                </div>
                <div className="space-y-2 mb-6">
                  <p className="text-sm opacity-80">✓ {t('level3.included.paymentPlan')}</p>
                  <p className="text-sm opacity-80">✓ {t('level3.included.guaranteedROI')}</p>
                  <p className="text-sm opacity-80">✓ {t('level3.included.postSupport')}</p>
                </div>
                <Button variant="secondary" size="lg" className="w-full">
                  {t('level3.included.requestProposal')}
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Testimonials */}
        <section className="section bg-pearl">
          <Container>
            <Heading level={2} className="text-center mb-12">
              {t('level3.testimonials.title')}
            </Heading>

            <TestimonialGrid testimonials={testimonials} columns={2} />
          </Container>
        </section>

        {/* ROI Calculator */}
        <section className="section">
          <Container>
            <div className="max-w-5xl mx-auto">
              <Heading level={2} className="text-center mb-4">
                {currentLocale === 'en-US'
                  ? 'Calculate your return on investment'
                  : currentLocale === 'pt-BR'
                    ? 'Calcule seu retorno de investimento'
                    : 'Calcula tu retorno de inversión'}
              </Heading>
              <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
                {currentLocale === 'en-US'
                  ? 'Use our interactive calculator to estimate the impact our consulting services can have on your business.'
                  : currentLocale === 'pt-BR'
                    ? 'Use nossa calculadora interativa para estimar o impacto que nossos serviços de consultoria podem ter em seu negócio.'
                    : 'Usa nuestra calculadora interactiva para estimar el impacto que nuestros servicios de consultoría pueden tener en tu negocio.'}
              </p>
              <ROICalculator
                serviceTier="L3_CONSULTING"
                title={
                  currentLocale === 'en-US'
                    ? 'L3 Consulting ROI Calculator'
                    : currentLocale === 'pt-BR'
                      ? 'Calculadora ROI L3 Consultoria'
                      : 'Calculadora ROI L3 Consultoría'
                }
                onCalculate={results => {
                  logServiceInquiry('L3_CONSULTING', 'roi-calculator', {
                    results,
                    locale: currentLocale,
                  });
                }}
              />
            </div>
          </Container>
        </section>

        {/* Consultation Form */}
        <section id="consultation" className="section bg-pearl">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Heading level={2} className="mb-4">
                  {currentLocale === 'en-US'
                    ? 'Schedule your strategic consultation'
                    : currentLocale === 'pt-BR'
                      ? 'Agende sua consulta estratégica'
                      : 'Agenda tu consulta estratégica'}
                </Heading>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  {currentLocale === 'en-US'
                    ? 'Get a personalized assessment of your business needs and learn how our consulting services can drive your transformation.'
                    : currentLocale === 'pt-BR'
                      ? 'Obtenha uma avaliação personalizada das necessidades do seu negócio e saiba como nossos serviços de consultoria podem impulsionar sua transformação.'
                      : 'Obtén una evaluación personalizada de las necesidades de tu negocio y aprende cómo nuestros servicios de consultoría pueden impulsar tu transformación.'}
                </p>
              </div>

              <LeadForm
                variant="progressive"
                tier="L3_CONSULTING"
                source="service-page-consultation"
                title={
                  currentLocale === 'en-US'
                    ? 'Request consultation'
                    : currentLocale === 'pt-BR'
                      ? 'Solicitar consulta'
                      : 'Solicitar consulta'
                }
                description={
                  currentLocale === 'en-US'
                    ? "Tell us about your business and we'll create a customized strategy proposal"
                    : currentLocale === 'pt-BR'
                      ? 'Conte-nos sobre seu negócio e criaremos uma proposta de estratégia personalizada'
                      : 'Cuéntanos sobre tu negocio y crearemos una propuesta de estrategia personalizada'
                }
                submitText={
                  currentLocale === 'en-US'
                    ? 'Schedule consultation'
                    : currentLocale === 'pt-BR'
                      ? 'Agendar consulta'
                      : 'Agendar consulta'
                }
                onSubmit={async data => {
                  logServiceInquiry('L3_CONSULTING', 'consultation-form', {
                    ...data,
                    locale: currentLocale,
                  });
                  // TODO: Implement actual form submission
                }}
              />
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="section">
          <Container>
            <div className="bg-gradient-to-r from-lavender to-sun rounded-3xl p-12 text-center text-white">
              <Heading level={2} className="text-white mb-4">
                {t('level3.cta.title')}
              </Heading>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                {t('level3.cta.subtitle')}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="secondary" size="lg">
                  {t('level3.cta.scheduleNow')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-lavender"
                >
                  {currentLocale === 'en-US'
                    ? 'Download brochure'
                    : currentLocale === 'pt-BR'
                      ? 'Baixar brochura'
                      : 'Descargar brochure'}
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
