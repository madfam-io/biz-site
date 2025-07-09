'use client';

import { Container, Heading, Button, Card, CardContent } from '@madfam/ui';
import { serviceTiers, ServiceTier } from '@madfam/core';
import { ROICalculator } from '@/components/ROICalculator';
import { ServiceStructuredData } from '@/components/StructuredData';
import { getLocalizedContent, type Locale, useTypedTranslations } from '@madfam/i18n';

export default function Level3ConsultingPage({ params: { locale } }: { params: { locale: string } }) {
  const service = serviceTiers[ServiceTier.L3_CONSULTING];
  const t = useTypedTranslations('services');
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
      duration: '1 ' + (currentLocale === 'en-US' ? 'week' : currentLocale === 'pt-BR' ? 'semana' : 'semana'),
    },
    {
      step: 2,
      title: t('level3.process.steps.strategy.title'),
      description: t('level3.process.steps.strategy.description'),
      duration: '2 ' + (currentLocale === 'en-US' ? 'weeks' : currentLocale === 'pt-BR' ? 'semanas' : 'semanas'),
    },
    {
      step: 3,
      title: t('level3.process.steps.implementation.title'),
      description: t('level3.process.steps.implementation.description'),
      duration: '4-8 ' + (currentLocale === 'en-US' ? 'weeks' : currentLocale === 'pt-BR' ? 'semanas' : 'semanas'),
    },
    {
      step: 4,
      title: t('level3.process.steps.optimization.title'),
      description: t('level3.process.steps.optimization.description'),
      duration: currentLocale === 'en-US' ? 'Ongoing' : currentLocale === 'pt-BR' ? 'Contínuo' : 'Continuo',
    },
  ];

  const testimonials = [
    {
      quote: currentLocale === 'en-US' ? 'MADFAM completely transformed the way we work. The workshops were incredibly practical.' : currentLocale === 'pt-BR' ? 'MADFAM transformou completamente nossa forma de trabalhar. Os workshops foram incrivelmente práticos.' : 'MADFAM transformó completamente nuestra forma de trabajar. Los workshops fueron increíblemente prácticos.',
      author: 'María González',
      role: 'CTO, TechCorp México',
    },
    {
      quote: currentLocale === 'en-US' ? 'The ROI was evident from the first month. We automated processes that took days in minutes.' : currentLocale === 'pt-BR' ? 'O ROI foi evidente desde o primeiro mês. Automatizamos processos que levavam dias em minutos.' : 'El ROI fue evidente desde el primer mes. Automatizamos procesos que tomaban días en minutos.',
      author: 'Carlos Ramírez',
      role: currentLocale === 'en-US' ? 'Innovation Director, Industrial Group' : currentLocale === 'pt-BR' ? 'Diretor de Inovação, Grupo Industrial' : 'Director de Innovación, Grupo Industrial',
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
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-lavender/10 to-sun/10">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-lavender/20 text-lavender">
                  {t('level3.hero.badge')}
                </span>
              </div>
              <Heading level={1} className="mb-6">
                {t('level3.hero.title')}
              </Heading>
              <p className="text-xl text-obsidian/70 mb-8">
                {serviceDescription}
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Button variant="creative" size="lg">
                  {t('level3.hero.scheduleInitial')}
                </Button>
                <Button variant="outline" size="lg">
                  {t('level3.hero.downloadCase')}
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-obsidian/60">
                <div>
                  <span className="font-semibold text-obsidian">3-6 {currentLocale === 'en-US' ? 'months' : currentLocale === 'pt-BR' ? 'meses' : 'meses'}</span> {t('level3.hero.typicalDuration')}
                </div>
                <div>
                  <span className="font-semibold text-obsidian">87%</span> {t('level3.hero.satisfaction')}
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-lavender/20 to-sun/20 flex items-center justify-center">
                <span className="text-[200px] opacity-20">💡</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

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
              <h3 className="font-heading text-2xl mb-4">{t('level3.included.investment')}</h3>
              <div className="mb-6">
                <p className="text-sm opacity-80">{t('level3.included.from')}</p>
                <p className="text-4xl font-heading font-bold">
                  ${service.startingPrice.toLocaleString()} {service.currency}
                </p>
                <p className="text-sm opacity-80 mt-2">{t('level3.included.projectDuration')}</p>
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
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} variant="elevated">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <svg className="w-10 h-10 text-lavender/20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-lg text-obsidian/80 mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-obsidian/60">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ROI Calculator */}
      <section className="section">
        <Container>
          <div className="max-w-5xl mx-auto">
            <Heading level={2} className="text-center mb-4">
              {currentLocale === 'en-US' ? 'Calculate your return on investment' : currentLocale === 'pt-BR' ? 'Calcule seu retorno de investimento' : 'Calcula tu retorno de inversión'}
            </Heading>
            <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
              {currentLocale === 'en-US' ? 'Use our interactive calculator to estimate the impact our consulting services can have on your business.' : currentLocale === 'pt-BR' ? 'Use nossa calculadora interativa para estimar o impacto que nossos serviços de consultoria podem ter em seu negócio.' : 'Usa nuestra calculadora interactiva para estimar el impacto que nuestros servicios de consultoría pueden tener en tu negocio.'}
            </p>
            <ROICalculator serviceTier={ServiceTier.L3_CONSULTING} />
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
                {currentLocale === 'en-US' ? 'Download brochure' : currentLocale === 'pt-BR' ? 'Baixar brochura' : 'Descargar brochure'}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
    </>
  );
}