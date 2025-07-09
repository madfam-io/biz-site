import { Container, Heading, Button } from '@madfam/ui';
import { serviceTiers, ServiceTier, ServiceTierConfig } from '@madfam/core';
import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export default function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('services');
  const allServices = Object.values(serviceTiers);
  
  // Helper function to get localized service data
  const getLocalizedServiceData = (service: ServiceTierConfig) => {
    const isEnglish = locale === 'en-US';
    return {
      name: isEnglish ? service.nameEn : service.name,
      description: isEnglish ? service.descriptionEn : service.description,
      features: isEnglish ? service.featuresEn : service.features,
      idealFor: isEnglish ? service.idealForEn : service.idealFor,
      duration: isEnglish ? service.durationEn : service.duration,
      ctaText: isEnglish ? service.cta.textEn : service.cta.text,
    };
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-obsidian/5 to-lavender/10">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading level={1} className="mb-6">
              {t('hero.title').replace(t('hero.titleHighlight'), '')}{' '}
              <span className="gradient-text">{t('hero.titleHighlight')}</span>
            </Heading>
            <p className="text-xl text-obsidian/70 mb-8">
              {t('hero.subtitle')}
            </p>
          </div>
        </Container>
      </section>

      {/* Service Tiers Grid */}
      <section className="section">
        <Container>
          <div className="grid gap-8 max-w-6xl mx-auto">
            {allServices.map((service, index) => {
              const localizedData = getLocalizedServiceData(service);
              return (
                <div
                  key={service.id}
                  className={`grid md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Service Info */}
                  <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                    <div className="mb-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-obsidian/5 text-obsidian">
                        {locale === 'en-US' ? 'Level' : 'Nivel'} {service.level}
                      </span>
                    </div>
                    <Heading level={2} className="mb-4">
                      {localizedData.name}
                    </Heading>
                    <p className="text-lg text-obsidian/70 mb-6">
                      {localizedData.description}
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      <h3 className="font-heading text-lg font-semibold">
                        {locale === 'en-US' ? 'Includes:' : 'Incluye:'}
                      </h3>
                      <ul className="space-y-2">
                        {localizedData.features.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-leaf mr-3 mt-0.5">✓</span>
                            <span className="text-obsidian/70">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-baseline gap-4 mb-8">
                      <div>
                        <p className="text-sm text-obsidian/60">
                          {locale === 'en-US' ? 'From' : 'Desde'}
                        </p>
                        <p className="text-3xl font-heading font-bold text-obsidian">
                          ${service.startingPrice.toLocaleString()} {service.currency}
                        </p>
                      </div>
                      {localizedData.duration && (
                        <div className="text-sm text-obsidian/60">
                          • {localizedData.duration}
                        </div>
                      )}
                    </div>

                    <Button
                      variant={service.id === ServiceTier.L3_CONSULTING ? 'creative' : 'primary'}
                      size="lg"
                    >
                      {localizedData.ctaText}
                    </Button>
                  </div>

                  {/* Visual Element */}
                  <div className={`relative ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      {/* Placeholder for service illustration */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-8xl opacity-20">{service.icon}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Comparison Table */}
      <section className="section bg-pearl">
        <Container>
          <div className="max-w-5xl mx-auto">
            <Heading level={2} className="text-center mb-12">
              {t('comparison.title')}
            </Heading>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4">{t('comparison.features')}</th>
                    {allServices.map((service) => {
                      const localizedData = getLocalizedServiceData(service);
                      return (
                        <th key={service.id} className="text-center py-4 px-4">
                          <div className="font-heading font-semibold">{localizedData.name}</div>
                          <div className="text-sm text-gray-500 font-normal">
                            {locale === 'en-US' ? 'Level' : 'Nivel'} {service.level}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">{t('comparison.priceFrom')}</td>
                    {allServices.map((service) => (
                      <td key={service.id} className="text-center py-4 px-4">
                        ${service.startingPrice.toLocaleString()} {service.currency}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">{t('comparison.duration')}</td>
                    {allServices.map((service) => {
                      const localizedData = getLocalizedServiceData(service);
                      return (
                        <td key={service.id} className="text-center py-4 px-4">
                          {localizedData.duration || (locale === 'en-US' ? 'Variable' : 'Variable')}
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">{t('comparison.idealFor')}</td>
                    {allServices.map((service) => {
                      const localizedData = getLocalizedServiceData(service);
                      return (
                        <td key={service.id} className="text-center py-4 px-4 text-sm">
                          {localizedData.idealFor[0]}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section">
        <Container>
          <div className="bg-gradient-to-br from-obsidian to-obsidian/90 rounded-3xl p-12 text-center text-white">
            <Heading level={2} className="text-white mb-4">
              {t('notSure.title')}
            </Heading>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {t('notSure.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/estimator">
                <Button variant="secondary" size="lg">
                  {t('notSure.getEstimate')}
                </Button>
              </a>
              <a href="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-obsidian">
                  {t('notSure.cta')}
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}