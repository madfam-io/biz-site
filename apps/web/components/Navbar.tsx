'use client';

import { getLocalizedUrl, type Locale } from '@madfam/i18n';
import { Container, Button } from '@madfam/ui';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { DarkModeToggle } from './DarkModeToggle';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Search } from './Search';
import { NavDropdown } from './NavDropdown';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = useTranslations('common.nav');
  const tCommon = useTranslations('common');
  const locale = useLocale() as Locale;

  // Business Units dropdown items
  const businessUnits = [
    {
      name: 'Aureo Labs',
      href: getLocalizedUrl('arms.aureo-labs', locale),
      description: t('aureoLabsDesc') || 'Digital innovation laboratory',
    },
    {
      name: 'Primavera3D',
      href: getLocalizedUrl('arms.primavera3d', locale),
      description: 'Advanced 3D manufacturing',
    },
    {
      name: 'MADFAM Co-Labs',
      href: getLocalizedUrl('arms.colabs', locale),
      description: 'Collaborative innovation spaces',
    },
  ];

  // Main navigation items (excluding dropdown items)
  const navigation = [
    { name: t('products'), href: getLocalizedUrl('products', locale) },
    { name: t('programs') || 'Programs', href: getLocalizedUrl('programs', locale) },
    { name: t('impact') || 'Impact', href: getLocalizedUrl('impact', locale) },
    { name: t('caseStudies') || 'Showcase', href: getLocalizedUrl('showcase', locale) },
    { name: t('about'), href: getLocalizedUrl('about', locale) },
    { name: t('contact'), href: getLocalizedUrl('contact', locale) },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-obsidian/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`/${locale}`} className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 transition-transform group-hover:scale-105">
                <Image
                  src="/assets/brand/madfam-logo.svg"
                  alt="MADFAM"
                  width={40}
                  height={40}
                  priority
                  className="w-full h-full"
                />
              </div>
              <span className="font-heading text-xl font-bold text-obsidian dark:text-pearl">
                MADFAM
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Business Units Dropdown */}
            <NavDropdown label={t('businessArms') || 'Business Units'} items={businessUnits} />

            {/* Regular Navigation Items */}
            {navigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-obsidian/70 dark:text-pearl/70 hover:text-obsidian dark:hover:text-pearl transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Search />
            <DarkModeToggle />
            <LanguageSwitcher />
            <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
            <Link href={`/${locale}/assessment`}>
              <Button variant="ghost" size="sm">
                {tCommon('aiAssessment')}
              </Button>
            </Link>
            <Link href={getLocalizedUrl('contact', locale)}>
              <Button variant="creative" size="sm">
                {tCommon('freeConsultation')}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-obsidian dark:text-pearl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-col space-y-4">
              {/* Business Units Section */}
              <div>
                <div className="text-sm font-semibold text-obsidian/50 dark:text-pearl/50 uppercase tracking-wider px-4 pb-2">
                  {t('businessArms') || 'Business Units'}
                </div>
                {businessUnits.map(unit => (
                  <Link
                    key={unit.name}
                    href={unit.href}
                    className="block px-4 py-2 text-base font-medium text-obsidian/70 dark:text-pearl/70 hover:text-obsidian dark:hover:text-pearl"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div>
                      <div>{unit.name}</div>
                      {unit.description && (
                        <div className="text-xs text-gray-500 dark:text-pearl/50 mt-0.5">
                          {unit.description}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 dark:border-gray-700" />

              {/* Main Navigation Items */}
              {navigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 text-base font-medium text-obsidian/70 dark:text-pearl/70 hover:text-obsidian dark:hover:text-pearl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
                <div className="px-4 py-2">
                  <Search />
                </div>
                <div className="px-4 py-2 flex items-center justify-between">
                  <LanguageSwitcher />
                  <DarkModeToggle />
                </div>
                <Link href={`/${locale}/assessment`} onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    {tCommon('aiAssessment')}
                  </Button>
                </Link>
                <Link
                  href={getLocalizedUrl('contact', locale)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="creative" size="sm" className="w-full">
                    {tCommon('freeConsultation')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
