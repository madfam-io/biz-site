import { Container, Heading } from '@madfam/ui';
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';

// Force dynamic rendering to bypass SSG issue
export const dynamic = 'force-dynamic';

export default async function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('legal');

  return (
    <main className="min-h-screen">
      <section className="pt-20 pb-16 bg-gradient-to-br from-obsidian/5 to-lavender/5">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Heading level={1} className="mb-6">
              {t('privacy.title')}
            </Heading>
            <p className="text-lg text-obsidian/70">
              {t('privacy.lastUpdated', { date: 'Enero 2024' })}
            </p>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>{t('privacy.intro.title')}</h2>
            <p>{t('privacy.intro.content')}</p>

            <h2>{t('privacy.dataCollection.title')}</h2>
            <h3>{t('privacy.dataCollection.providedInfo.title')}</h3>
            <ul>
              {(
                t('privacy.dataCollection.providedInfo.items', {
                  returnObjects: true,
                }) as unknown as string[]
              ).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h3>{t('privacy.dataCollection.automaticInfo.title')}</h3>
            <ul>
              {(
                t('privacy.dataCollection.automaticInfo.items', {
                  returnObjects: true,
                }) as unknown as string[]
              ).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h2>{t('privacy.dataUse.title')}</h2>
            <p>{t('privacy.dataUse.description')}</p>
            <ul>
              {(t('privacy.dataUse.items', { returnObjects: true }) as unknown as string[]).map(
                (item: string, index: number) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>

            <h2>{t('privacy.dataSharing.title')}</h2>
            <p>{t('privacy.dataSharing.description')}</p>
            <ul>
              {(t('privacy.dataSharing.items', { returnObjects: true }) as unknown as string[]).map(
                (item: string, index: number) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>

            <h2>{t('privacy.dataSecurity.title')}</h2>
            <p>{t('privacy.dataSecurity.description')}</p>
            <ul>
              {(
                t('privacy.dataSecurity.items', { returnObjects: true }) as unknown as string[]
              ).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h2>{t('privacy.cookies.title')}</h2>
            <p>{t('privacy.cookies.description')}</p>
            <ul>
              {(t('privacy.cookies.items', { returnObjects: true }) as unknown as string[]).map(
                (item: string, index: number) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
            <p>{t('privacy.cookies.note')}</p>

            <h2>{t('privacy.userRights.title')}</h2>
            <p>{t('privacy.userRights.description')}</p>
            <ul>
              {(t('privacy.userRights.items', { returnObjects: true }) as unknown as string[]).map(
                (item: string, index: number) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>

            <h2>{t('privacy.dataRetention.title')}</h2>
            <p>{t('privacy.dataRetention.content')}</p>

            <h2>{t('privacy.minors.title')}</h2>
            <p>{t('privacy.minors.content')}</p>

            <h2>{t('privacy.changes.title')}</h2>
            <p>{t('privacy.changes.content')}</p>

            <h2>{t('privacy.contact.title')}</h2>
            <p>{t('privacy.contact.description')}</p>
            <ul>
              <li>{t('privacy.contact.email')}</li>
              <li>{t('privacy.contact.phone')}</li>
              <li>{t('privacy.contact.address')}</li>
            </ul>

            <h2>{t('privacy.authority.title')}</h2>
            <p>{t('privacy.authority.content')}</p>
          </div>
        </Container>
      </section>
    </main>
  );
}
