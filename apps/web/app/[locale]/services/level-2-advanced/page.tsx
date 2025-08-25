import { serviceTiers, ServiceTier } from '@madfam/core';
import { getLocalizedContent, type Locale } from '@madfam/i18n';
import { Container, Heading, Button } from '@madfam/ui';
import Link from 'next/link';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { ServiceCard } from '@/components/ServiceCard';
import {
  caseStudies,
  processPhases,
  pricingOptions,
  faqs,
} from '@/lib/data/service-tiers/advanced-services';
import { getLocalizedText, getLocalizedContent as getContent } from '@/lib/utils/locale-helpers';

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

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-sun/10 to-leaf/10 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-sun rounded-full filter blur-3xl animate-float" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-leaf rounded-full filter blur-3xl animate-float animation-delay-200" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-sun/20 to-leaf/20 text-obsidian">
                {t('level2.hero.badge')}
              </span>
            </div>
            <Heading level={1} className="mb-6">
              {t('level2.hero.title')}
            </Heading>
            <p className="text-xl text-obsidian/70 mb-8 max-w-3xl">{serviceDescription}</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="creative" size="lg">
                {t('level2.hero.cta')}
              </Button>
              <Button variant="outline" size="lg">
                {t('level2.hero.viewWork')}
              </Button>
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

          <div className="grid md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-pearl rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl">{tech.icon}</span>
                  <div>
                    <h3 className="font-heading text-xl font-semibold mb-2">{tech.name}</h3>
                    <p className="text-obsidian/70 mb-4">{tech.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {tech.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-obsidian/5 rounded-full text-sm font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Case Studies */}
      <section className="section bg-gradient-to-br from-lavender/5 to-sun/5">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {t('level2.caseStudies.title')}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {t('level2.caseStudies.subtitle')}
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-white rounded-3xl shadow-lg overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="p-8 md:p-12">
                    <h3 className="font-heading text-2xl font-bold mb-2">
                      {getLocalizedText(study.client, locale)}
                    </h3>
                    <p className="text-xl text-sun mb-6">
                      {getLocalizedText(study.project, locale)}
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-obsidian/60 mb-2">
                          {getLocalizedText(
                            {
                              en: 'Challenge',
                              es: 'Desafío',
                              'pt-br': 'Desafio',
                            },
                            locale
                          )}
                        </h4>
                        <p className="text-obsidian/80">
                          {getLocalizedText(study.challenge, locale)}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-obsidian/60 mb-2">
                          {getLocalizedText(
                            {
                              en: 'Solution',
                              es: 'Solución',
                              'pt-br': 'Solução',
                            },
                            locale
                          )}
                        </h4>
                        <p className="text-obsidian/80">
                          {getLocalizedText(study.solution, locale)}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-obsidian/60 mb-2">
                          {getLocalizedText(
                            {
                              en: 'Results',
                              es: 'Resultados',
                              'pt-br': 'Resultados',
                            },
                            locale
                          )}
                        </h4>
                        <ul className="space-y-2">
                          {getContent(study.results, locale).map((result, idx) => (
                            <li key={idx} className="flex items-center">
                              <span className="text-green-500 mr-2">✓</span>
                              <span className="text-obsidian/80">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-4">
                        {study.tech.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-lavender/20 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="relative min-h-[400px] bg-gradient-to-br from-lavender/20 to-sun/20">
                    {/* Placeholder for case study visual */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-20">{index === 0 ? '📊' : '🎨'}</div>
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
              {t('level2.process.title')}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {t('level2.process.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processPhases.map((phase, index) => (
              <div key={index} className="relative">
                {index < processPhases.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-lavender to-transparent z-0" />
                )}
                <div className="relative bg-pearl rounded-2xl p-6 z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-bold text-lavender">0{index + 1}</span>
                    <span className="text-sm text-obsidian/60">
                      {getLocalizedText(phase.duration, locale)}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-3">
                    {getLocalizedText(phase.phase, locale)}
                  </h3>
                  <ul className="space-y-1">
                    {getContent(phase.activities, locale).map((activity, idx) => (
                      <li key={idx} className="text-sm text-obsidian/70">
                        • {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section className="section bg-pearl">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {t('level2.pricing.title')}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {t('level2.pricing.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingOptions.map((option, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 ${
                  index === 1 ? 'ring-2 ring-sun shadow-xl scale-105' : 'shadow-lg'
                }`}
              >
                {index === 1 && (
                  <span className="inline-block px-3 py-1 bg-sun text-white rounded-full text-sm font-medium mb-4">
                    {getLocalizedText(
                      {
                        en: 'Most Popular',
                        es: 'Más Popular',
                        'pt-br': 'Mais Popular',
                      },
                      locale
                    )}
                  </span>
                )}
                <h3 className="font-heading text-2xl font-bold mb-2">
                  {getLocalizedText(option.type, locale)}
                </h3>
                <p className="text-3xl font-bold text-sun mb-2">
                  {getLocalizedText(option.price, locale)}
                </p>
                <p className="text-obsidian/60 mb-4">{getLocalizedText(option.timeline, locale)}</p>
                <p className="text-obsidian/70 mb-6">{getLocalizedText(option.ideal, locale)}</p>
                <ul className="space-y-3 mb-8">
                  {getContent(option.includes, locale).map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-0.5">✓</span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={index === 1 ? 'creative' : 'outline'} className="w-full">
                  {getLocalizedText(
                    {
                      en: 'Get Started',
                      es: 'Comenzar',
                      'pt-br': 'Começar',
                    },
                    locale
                  )}
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {t('level2.faq.title')}
            </Heading>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-pearl rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-2">
                  {getLocalizedText(faq.question, locale)}
                </h3>
                <p className="text-obsidian/70">{getLocalizedText(faq.answer, locale)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-sun to-leaf text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Heading level={2} className="text-white mb-6">
              {getLocalizedText(
                {
                  en: 'Ready to Create Something Amazing?',
                  es: '¿Listo para Crear Algo Increíble?',
                  'pt-br': 'Pronto para Criar Algo Incrível?',
                },
                locale
              )}
            </Heading>
            <p className="text-xl text-white/90 mb-8">
              {getLocalizedText(
                {
                  en: "Let's transform your ideas into reality with cutting-edge technology",
                  es: 'Transformemos tus ideas en realidad con tecnología de vanguardia',
                  'pt-br': 'Vamos transformar suas ideias em realidade com tecnologia de ponta',
                },
                locale
              )}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="secondary" size="lg">
                {getLocalizedText(
                  {
                    en: 'Start Your Project',
                    es: 'Iniciar Tu Proyecto',
                    'pt-br': 'Iniciar Seu Projeto',
                  },
                  locale
                )}
              </Button>
              <Link href="/showcase">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-sun"
                >
                  {getLocalizedText(
                    {
                      en: 'View Portfolio',
                      es: 'Ver Portafolio',
                      'pt-br': 'Ver Portfólio',
                    },
                    locale
                  )}
                </Button>
              </Link>
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
                  en: 'Explore Other Services',
                  es: 'Explora Otros Servicios',
                  'pt-br': 'Explore Outros Serviços',
                },
                locale
              )}
            </Heading>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {otherServices.map(relatedService => (
              <ServiceCard key={relatedService.id} service={relatedService} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
