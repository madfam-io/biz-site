import { getLocalizedUrl, type Locale } from '@madfam/i18n';
import { Container } from '@madfam/ui';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const currentYear = new Date().getFullYear();

  const navigation = {
    servicios: [
      {
        name: t('footer.programs.designFabrication'),
        href: `${getLocalizedUrl('programs', locale)}#design-fabrication`,
      },
      {
        name: t('footer.programs.strategyEnablement'),
        href: `${getLocalizedUrl('programs', locale)}#strategy-enablement`,
      },
      {
        name: t('footer.programs.platformPilots'),
        href: `${getLocalizedUrl('programs', locale)}#platform-pilots`,
      },
      {
        name: t('footer.programs.strategicPartnerships'),
        href: `${getLocalizedUrl('programs', locale)}#strategic-partnerships`,
      },
    ],
    productos: [
      { name: 'Aureo Studio', href: 'https://aureo.studio' },
      { name: 'PENNY', href: `${getLocalizedUrl('products', locale)}#penny` },
      { name: 'Cotiza Studio', href: 'https://cotiza.studio' },
      { name: 'Forge Sight', href: 'https://forgesight.quest' },
    ],
    empresa: [
      { name: t('footer.company.about'), href: getLocalizedUrl('about', locale) },
      { name: t('footer.company.units'), href: getLocalizedUrl('arms', locale) },
      { name: t('footer.company.caseStudies'), href: getLocalizedUrl('work', locale) },
      { name: t('footer.company.careers'), href: `/${locale}/careers` },
    ],
    recursos: [
      { name: t('footer.resources.assessment'), href: `/${locale}/assessment` },
      { name: t('footer.resources.calculator'), href: `/${locale}/calculator` },
      { name: t('footer.resources.guides'), href: `/${locale}/guides` },
      { name: t('footer.resources.contact'), href: getLocalizedUrl('contact', locale) },
    ],
  };

  const social = [
    { name: t('footer.social.linkedin'), href: 'https://linkedin.com/company/madfam', icon: 'in' },
    { name: t('footer.social.twitter'), href: 'https://twitter.com/madfam_io', icon: 'X' },
    { name: t('footer.social.github'), href: 'https://github.com/madfam-io', icon: 'gh' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-obsidian text-obsidian dark:text-white border-t border-gray-200 dark:border-gray-800">
      <Container>
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-heading text-lg mb-4">{t('footer.sections.programs')}</h3>
              <ul className="space-y-3">
                {navigation.servicios.map(item => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-obsidian/70 dark:text-white/70 hover:text-obsidian dark:hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-lg mb-4">{t('footer.sections.products')}</h3>
              <ul className="space-y-3">
                {navigation.productos.map(item => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-obsidian/70 dark:text-white/70 hover:text-obsidian dark:hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-lg mb-4">{t('footer.sections.company')}</h3>
              <ul className="space-y-3">
                {navigation.empresa.map(item => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-obsidian/70 dark:text-white/70 hover:text-obsidian dark:hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-lg mb-4">{t('footer.sections.resources')}</h3>
              <ul className="space-y-3">
                {navigation.recursos.map(item => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-obsidian/70 dark:text-white/70 hover:text-obsidian dark:hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="font-heading text-2xl font-bold">MADFAM</span>
                <span className="text-white/50">•</span>
                <p className="text-white/70">{t('footer.tagline')}</p>
              </div>

              <div className="flex items-center gap-6">
                {social.map(item => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors"
                    aria-label={item.name}
                  >
                    {item.icon === 'in' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    )}
                    {item.icon === 'X' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    )}
                    {item.icon === 'gh' && (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
                <p>
                  © {currentYear} MADFAM. {t('common.footer.rights')}
                </p>
                <div className="flex gap-6">
                  <Link
                    href={`/${locale}/privacy`}
                    className="hover:text-white/70 transition-colors"
                  >
                    {t('common.footer.privacy')}
                  </Link>
                  <Link href={`/${locale}/terms`} className="hover:text-white/70 transition-colors">
                    {t('common.footer.terms')}
                  </Link>
                  <Link
                    href={`/${locale}/cookies`}
                    className="hover:text-white/70 transition-colors"
                  >
                    {t('footer.cookies')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
