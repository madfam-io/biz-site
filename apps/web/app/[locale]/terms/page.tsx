import { Container, Heading } from '@madfam/ui';
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { TranslationList } from '@/components/TranslationList';

// Force dynamic rendering to bypass SSG issue
export const dynamic = 'force-dynamic';

export default async function TermsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('legal');

  return (
    <main className="min-h-screen">
      <section className="pt-20 pb-16 bg-gradient-to-br from-obsidian/5 to-lavender/5">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Heading level={1} className="mb-6">
              {t('terms.title')}
            </Heading>
            <p className="text-lg text-obsidian/70">
              {t('terms.lastUpdated', { date: 'Enero 2024' })}
            </p>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>{t('terms.acceptance.title')}</h2>
            <p>{t('terms.acceptance.content')}</p>

            <h2>{t('terms.services.title')}</h2>
            <p>{t('terms.services.description')}</p>
            <TranslationList t={t} translationKey="terms.services.items" />

            <h2>{t('terms.websiteUse.title')}</h2>
            <h3>{t('terms.websiteUse.license.title')}</h3>
            <p>{t('terms.websiteUse.license.content')}</p>

            <h3>{t('terms.websiteUse.restrictions.title')}</h3>
            <p>{t('terms.websiteUse.restrictions.description')}</p>
            <TranslationList t={t} translationKey="terms.websiteUse.restrictions.items" />

            <h2>{t('terms.intellectualProperty.title')}</h2>
            <h3>{t('terms.intellectualProperty.ourContent.title')}</h3>
            <p>{t('terms.intellectualProperty.ourContent.content')}</p>

            <h3>{t('terms.intellectualProperty.yourContent.title')}</h3>
            <p>{t('terms.intellectualProperty.yourContent.content')}</p>

            <h2>{t('terms.contact.title')}</h2>
            <p>{t('terms.contact.description')}</p>
            <ul>
              <li>{t('terms.contact.email')}</li>
              <li>{t('terms.contact.phone')}</li>
              <li>{t('terms.contact.address')}</li>
            </ul>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                {locale === 'es' &&
                  'Este documento ha sido simplificado para demostrar la internacionalización. La versión completa estará disponible próximamente.'}
                {locale === 'en' &&
                  'This document has been simplified to demonstrate internationalization. The complete version will be available soon.'}
                {locale === 'pt-br' &&
                  'Este documento foi simplificado para demonstrar a internacionalização. A versão completa estará disponível em breve.'}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
