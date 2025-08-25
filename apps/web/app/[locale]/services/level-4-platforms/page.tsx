import { serviceTiers, ServiceTier } from '@madfam/core';
import { getLocalizedContent, type Locale } from '@madfam/i18n';
import { Container, Heading, Button } from '@madfam/ui';
import Link from 'next/link';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { ServiceCard } from '@/components/ServiceCard';
import {
  platforms,
  implementationPhases,
  supportDetails,
  roiMetrics,
  testimonial,
  integrations,
} from '@/lib/data/service-tiers/platform-services';
import { getLocalizedText, getLocalizedContent as getContent } from '@/lib/utils/locale-helpers';

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
                {getLocalizedText(
                  {
                    en: 'Calculate ROI',
                    es: 'Calcular ROI',
                    'pt-br': 'Calcular ROI',
                  },
                  locale
                )}
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
                          <p className="text-lg text-obsidian/60">
                            {getLocalizedText(platform.tagline, locale)}
                          </p>
                        </div>
                      </div>

                      <p className="text-lg text-obsidian/70 mb-6">
                        {getLocalizedText(platform.description, locale)}
                      </p>

                      <div className="mb-8">
                        <h4 className="font-semibold mb-3">
                          {getLocalizedText(
                            {
                              en: 'Main features:',
                              es: 'Características principales:',
                              'pt-br': 'Características principais:',
                            },
                            locale
                          )}
                        </h4>
                        <ul className="space-y-2">
                          {getContent(platform.features, locale).map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-green-500 mr-2 mt-0.5">✓</span>
                              <span className="text-obsidian/70">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button variant="primary" className={`bg-gradient-to-r ${platform.color}`}>
                        {getLocalizedText(
                          {
                            en: 'Explore',
                            es: 'Explorar',
                            'pt-br': 'Explorar',
                          },
                          locale
                        )}{' '}
                        {platform.name}
                      </Button>
                    </div>

                    <div>
                      <div
                        className={`relative h-96 rounded-2xl bg-gradient-to-br ${platform.color} p-8`}
                      >
                        <div className="bg-white/90 backdrop-blur rounded-xl p-6 shadow-xl">
                          <h4 className="font-semibold mb-4">
                            {getLocalizedText(
                              {
                                en: 'Key benefits:',
                                es: 'Beneficios clave:',
                                'pt-br': 'Benefícios chave:',
                              },
                              locale
                            )}
                          </h4>
                          <ul className="space-y-3">
                            {getContent(platform.benefits, locale).map((benefit, idx) => (
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
              {implementationPhases.map((phase, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-lavender">{index + 1}</span>
                    <span className="text-sm text-obsidian/60">
                      {getLocalizedText(phase.duration, locale)}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-3">{phase.name}</h3>
                  <ul className="space-y-1">
                    {getContent(phase.deliverables, locale).map((item, idx) => (
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
                {getLocalizedText(supportDetails.title, locale)}
              </h3>
              <div className="grid md:grid-cols-5 gap-6">
                {getContent(supportDetails.features, locale).map((feature, index) => (
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
              {getLocalizedText(
                {
                  en: 'Guaranteed ROI',
                  es: 'ROI garantizado',
                  'pt-br': 'ROI garantido',
                },
                locale
              )}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {getLocalizedText(
                {
                  en: 'Numbers that speak for themselves',
                  es: 'Números que hablan por sí solos',
                  'pt-br': 'Números que falam por si mesmos',
                },
                locale
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <div className="grid grid-cols-2 gap-6">
                {roiMetrics.map((metric, index) => (
                  <div
                    key={index}
                    className="text-center p-6 rounded-2xl bg-gradient-to-br from-lavender/10 to-leaf/10"
                  >
                    <p className="text-3xl font-heading font-bold mb-2">
                      {metric.value}
                      {metric.label.en === 'ROI time' &&
                        ` ${getLocalizedText({ en: 'months', es: 'meses', 'pt-br': 'meses' }, locale)}`}
                    </p>
                    <p className="text-sm text-obsidian/70">
                      {getLocalizedText(metric.label, locale)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-5xl mb-4">💬</div>
              <blockquote className="text-lg mb-6 italic">
                &quot;{getLocalizedText(testimonial.quote, locale)}&quot;
              </blockquote>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-obsidian/60">{testimonial.role}</p>
                <p className="text-green-600 font-medium mt-2">
                  {getLocalizedText(testimonial.metric, locale)}
                </p>
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
              {getLocalizedText(
                {
                  en: 'Connect your entire ecosystem',
                  es: 'Conecta todo tu ecosistema',
                  'pt-br': 'Conecte todo o seu ecossistema',
                },
                locale
              )}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {getLocalizedText(
                {
                  en: 'Over 100 ready-to-use integrations',
                  es: 'Más de 100 integraciones listas para usar',
                  'pt-br': 'Mais de 100 integrações prontas para usar',
                },
                locale
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
            {integrations.map((integration, index) => (
              <div key={index} className="px-6 py-3 rounded-full bg-white shadow-sm">
                <span className="font-medium">{integration.name}</span>
                <span className="text-obsidian/40 ml-2">
                  •{' '}
                  {typeof integration.category === 'string'
                    ? integration.category
                    : getLocalizedText(integration.category, locale)}
                </span>
              </div>
            ))}
            <div className="px-6 py-3 rounded-full bg-gradient-to-r from-lavender to-leaf text-white">
              <span className="font-medium">
                +90{' '}
                {getLocalizedText(
                  {
                    en: 'more...',
                    es: 'más...',
                    'pt-br': 'mais...',
                  },
                  locale
                )}
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
              {getLocalizedText(
                {
                  en: 'Complementary services',
                  es: 'Servicios complementarios',
                  'pt-br': 'Serviços complementares',
                },
                locale
              )}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {getLocalizedText(
                {
                  en: 'Maximize your investment value with additional services',
                  es: 'Maximiza el valor de tu inversión con servicios adicionales',
                  'pt-br': 'Maximize o valor do seu investimento com serviços adicionais',
                },
                locale
              )}
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
              {getLocalizedText(
                {
                  en: 'Transform your business with SPARK and PENNY',
                  es: 'Transforma tu empresa con SPARK y PENNY',
                  'pt-br': 'Transforme sua empresa com SPARK e PENNY',
                },
                locale
              )}
            </Heading>
            <p className="text-xl text-white/90 mb-8">
              {getLocalizedText(
                {
                  en: 'Schedule a personalized demo and discover how to automate your entire operation',
                  es: 'Agenda una demo personalizada y descubre cómo automatizar tu operación completa',
                  'pt-br':
                    'Agende uma demonstração personalizada e descubra como automatizar toda a sua operação',
                },
                locale
              )}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="secondary" size="lg">
                {getLocalizedText(
                  {
                    en: 'Schedule executive demo',
                    es: 'Agendar demo ejecutivo',
                    'pt-br': 'Agendar demo executiva',
                  },
                  locale
                )}
              </Button>
              <Link href="/calculator">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-lavender"
                >
                  {getLocalizedText(
                    {
                      en: 'Calculate potential savings',
                      es: 'Calcular ahorro potencial',
                      'pt-br': 'Calcular economia potencial',
                    },
                    locale
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
