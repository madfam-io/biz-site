import { serviceTiers, ServiceTier } from '@madfam/core';
import { getLocalizedContent, type Locale } from '@madfam/i18n';
import { Container, Heading, Button } from '@madfam/ui';
import Link from 'next/link';
import { unstable_setRequestLocale } from 'next-intl/server';
import { ServiceCard } from '@/components/ServiceCard';
import {
  engagementModels,
  transformationJourney,
  differentiators,
} from '@/lib/data/engagement-models/vcto-engagement';
import { vCTOServices, successMetrics, caseStudies } from '@/lib/data/service-tiers/vcto-services';
import { getLocalizedText, getLocalizedContent as getContent } from '@/lib/utils/locale-helpers';

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

  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-obsidian via-obsidian/95 to-obsidian/90 text-pearl py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sun rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-lavender rounded-full filter blur-3xl animate-pulse" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-4 py-2 bg-sun/20 text-sun rounded-full text-sm font-medium">
                {currentLocale === 'en' ? 'Level 5' : 'Nivel 5'} - Strategic
              </span>
              <span className="text-pearl/60">vCTO Partnership</span>
            </div>

            <Heading level={1} className="mb-6 text-5xl">
              {getLocalizedText(
                {
                  en: 'Transform Your Business with Strategic Technology Leadership',
                  es: 'Transforma tu Negocio con Liderazgo Tecnológico Estratégico',
                  'pt-br': 'Transforme seu Negócio com Liderança Tecnológica Estratégica',
                },
                locale
              )}
            </Heading>

            <p className="text-xl text-pearl/80 mb-8 leading-relaxed">{serviceDescription}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#engagement">
                <Button size="lg" variant="creative">
                  {getLocalizedText(
                    {
                      en: 'Explore Partnership Models',
                      es: 'Explorar Modelos de Asociación',
                      'pt-br': 'Explorar Modelos de Parceria',
                    },
                    locale
                  )}
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-pearl text-pearl hover:bg-pearl/10"
                >
                  {getLocalizedText(
                    {
                      en: 'Schedule Executive Meeting',
                      es: 'Agendar Reunión Ejecutiva',
                      'pt-br': 'Agendar Reunião Executiva',
                    },
                    locale
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* vCTO Services Section */}
      <section className="py-20 bg-gradient-to-b from-pearl to-obsidian/5">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {getLocalizedText(
                {
                  en: 'Complete Technology Leadership',
                  es: 'Liderazgo Tecnológico Completo',
                  'pt-br': 'Liderança Tecnológica Completa',
                },
                locale
              )}
            </Heading>
            <p className="text-xl text-obsidian/70 max-w-3xl mx-auto">
              {getLocalizedText(
                {
                  en: 'Our vCTO partners bring world-class expertise to guide your digital transformation',
                  es: 'Nuestros socios vCTO aportan experiencia de clase mundial para guiar tu transformación digital',
                  'pt-br':
                    'Nossos parceiros vCTO trazem experiência de classe mundial para guiar sua transformação digital',
                },
                locale
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {vCTOServices.map((svc, index) => (
              <div key={index} className="bg-pearl rounded-2xl p-8 shadow-lg">
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-4xl">{svc.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{getLocalizedText(svc.area, locale)}</h3>
                  </div>
                </div>
                <ul className="space-y-3">
                  {getContent(svc.responsibilities, locale).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-leaf mt-1">✓</span>
                      <span className="text-obsidian/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Success Metrics */}
          <div className="bg-obsidian rounded-3xl p-12 text-pearl">
            <h3 className="text-2xl font-bold mb-8 text-center">
              {getLocalizedText(
                {
                  en: 'Proven Impact Across Industries',
                  es: 'Impacto Comprobado en Todas las Industrias',
                  'pt-br': 'Impacto Comprovado em Todas as Indústrias',
                },
                locale
              )}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {successMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-2">{metric.icon}</div>
                  <div className="text-3xl font-bold text-sun mb-2">{metric.improvement}</div>
                  <div className="text-sm text-pearl/70">
                    {getLocalizedText(metric.metric, locale)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Engagement Models */}
      <section id="engagement" className="py-20 bg-gradient-to-b from-obsidian/5 to-pearl">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {getLocalizedText(
                {
                  en: 'Flexible Engagement Models',
                  es: 'Modelos de Colaboración Flexibles',
                  'pt-br': 'Modelos de Engajamento Flexíveis',
                },
                locale
              )}
            </Heading>
            <p className="text-xl text-obsidian/70 max-w-3xl mx-auto">
              {getLocalizedText(
                {
                  en: 'Choose the partnership model that best fits your needs and growth stage',
                  es: 'Elige el modelo de asociación que mejor se adapte a tus necesidades y etapa de crecimiento',
                  'pt-br':
                    'Escolha o modelo de parceria que melhor se adequa às suas necessidades e estágio de crescimento',
                },
                locale
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {engagementModels.map((model, index) => (
              <div
                key={index}
                className="bg-pearl rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-lavender transition-all"
              >
                <h3 className="text-xl font-bold mb-2">{getLocalizedText(model.type, locale)}</h3>
                <div className="text-obsidian/60 mb-4">
                  {getLocalizedText(model.duration, locale)}
                </div>
                <div className="text-3xl font-bold text-lavender mb-6">
                  {getLocalizedText(model.price, locale)}
                </div>
                <p className="text-obsidian/70 mb-6">{getLocalizedText(model.ideal, locale)}</p>
                <ul className="space-y-2">
                  {getContent(model.includes, locale).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-leaf mt-1">✓</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Transformation Journey */}
          <div className="bg-gradient-to-r from-lavender/10 to-sun/10 rounded-3xl p-12">
            <h3 className="text-2xl font-bold mb-8 text-center">
              {getLocalizedText(
                {
                  en: 'Your Transformation Journey',
                  es: 'Tu Viaje de Transformación',
                  'pt-br': 'Sua Jornada de Transformação',
                },
                locale
              )}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {transformationJourney.map((phase, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-obsidian text-pearl rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    {index + 1}
                  </div>
                  <h4 className="font-bold mb-2">{getLocalizedText(phase.phase, locale)}</h4>
                  <div className="text-sm text-obsidian/60 mb-2">
                    {getLocalizedText(phase.duration, locale)}
                  </div>
                  <p className="text-sm">{getLocalizedText(phase.focus, locale)}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gradient-to-b from-pearl to-obsidian/5">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {getLocalizedText(
                {
                  en: 'Success Stories',
                  es: 'Historias de Éxito',
                  'pt-br': 'Histórias de Sucesso',
                },
                locale
              )}
            </Heading>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-pearl rounded-2xl p-8 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{study.company}</h3>
                  <span className="px-3 py-1 bg-lavender/20 text-lavender rounded-full text-sm">
                    {getLocalizedText(study.industry, locale)}
                  </span>
                </div>

                <div className="mb-6">
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
                  <p className="text-obsidian/80">{getLocalizedText(study.challenge, locale)}</p>
                </div>

                <div className="mb-6">
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
                  <p className="text-obsidian/80">{getLocalizedText(study.solution, locale)}</p>
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
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-leaf mt-1">→</span>
                        <span className="text-obsidian/80">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why MADFAM */}
      <section className="py-20 bg-gradient-to-b from-obsidian/5 to-pearl">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {getLocalizedText(
                {
                  en: 'Why Partner with MADFAM?',
                  es: '¿Por qué Asociarse con MADFAM?',
                  'pt-br': 'Por que Parceria com MADFAM?',
                },
                locale
              )}
            </Heading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((diff, index) => (
              <div key={index} className="bg-pearl rounded-xl p-6 text-center">
                <div className="text-4xl mb-4">{diff.icon}</div>
                <h3 className="font-bold mb-2">{getLocalizedText(diff.title, locale)}</h3>
                <p className="text-sm text-obsidian/70">
                  {getLocalizedText(diff.description, locale)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-obsidian via-obsidian/95 to-obsidian/90 text-pearl">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading level={2} className="mb-6">
              {getLocalizedText(
                {
                  en: 'Ready to Transform Your Technology Leadership?',
                  es: '¿Listo para Transformar tu Liderazgo Tecnológico?',
                  'pt-br': 'Pronto para Transformar sua Liderança Tecnológica?',
                },
                locale
              )}
            </Heading>
            <p className="text-xl text-pearl/80 mb-8">
              {getLocalizedText(
                {
                  en: "Let's discuss how our vCTO partnership can accelerate your growth",
                  es: 'Hablemos de cómo nuestra asociación vCTO puede acelerar tu crecimiento',
                  'pt-br': 'Vamos discutir como nossa parceria vCTO pode acelerar seu crescimento',
                },
                locale
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="creative">
                  {getLocalizedText(
                    {
                      en: 'Schedule Executive Meeting',
                      es: 'Agendar Reunión Ejecutiva',
                      'pt-br': 'Agendar Reunião Executiva',
                    },
                    locale
                  )}
                </Button>
              </Link>
              <Link href="/assessment">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-pearl text-pearl hover:bg-pearl/10"
                >
                  {getLocalizedText(
                    {
                      en: 'Take Technology Assessment',
                      es: 'Realizar Evaluación Tecnológica',
                      'pt-br': 'Fazer Avaliação Tecnológica',
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
      <section className="py-20">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {otherServices.map(otherService => (
              <ServiceCard key={otherService.id} service={otherService} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
