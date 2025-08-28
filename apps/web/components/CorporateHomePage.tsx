'use client';

import {
  ArrowRightIcon,
  CogIcon,
  RocketLaunchIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline';
import { Button, Container, Heading } from '@madfam/ui';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { AnimatedText } from '@/components/AnimatedText';
import { ArmCard } from '@/components/corporate/ArmCard';
import { Badge } from '@/components/corporate/Badge';
import { ProductCard } from '@/components/corporate/ProductCard';
import { ScrollProgress } from '@/components/ScrollProgress';

export function CorporateHomePage() {
  const t = useTranslations();
  const locale = useLocale();

  // Featured Arms
  const featuredArms = [
    {
      id: 'aureo-labs',
      name: 'Aureo Labs',
      tagline: t('corporate.arms.aureoLabs.tagline'),
      description: t('corporate.arms.aureoLabs.description'),
      badge: t('corporate.badges.byMadfam'),
      accent: 'copper' as const,
      capabilities: [
        t('corporate.arms.aureoLabs.capabilities.0'),
        t('corporate.arms.aureoLabs.capabilities.1'),
        t('corporate.arms.aureoLabs.capabilities.2'),
        t('corporate.arms.aureoLabs.capabilities.3'),
      ],
      products: [
        { name: 'Aureo Studio', url: 'https://aureo.studio' },
        { name: 'PENNY', url: '/products/penny' },
        { name: 'Cotiza Studio', url: 'https://cotiza.studio' },
        { name: 'Dhanam', url: 'https://www.dhan.am' },
      ],
      externalUrl: 'https://aureolabs.dev',
    },
    {
      id: 'primavera3d',
      name: 'Primavera3D',
      tagline: t('corporate.arms.primavera3d.tagline'),
      description: t('corporate.arms.primavera3d.description'),
      badge: t('corporate.badges.byMadfam'),
      accent: 'green' as const,
      capabilities: [
        t('corporate.arms.primavera3d.capabilities.0'),
        t('corporate.arms.primavera3d.capabilities.1'),
        t('corporate.arms.primavera3d.capabilities.2'),
        t('corporate.arms.primavera3d.capabilities.3'),
      ],
      products: [
        { name: 'Diseño 3D', url: '/programs#design-fabrication' },
        { name: 'Modelado Paramétrico', url: '/programs#design-fabrication' },
      ],
    },
  ];

  // Featured Products
  const featuredProducts = [
    {
      name: 'Aureo Studio',
      description: t('corporate.products.aureoStudio.description'),
      audience: t('corporate.products.aureoStudio.audience'),
      badge: t('corporate.badges.aureoLabsProduct'),
      primaryCta: {
        label: t('corporate.products.aureoStudio.cta'),
        url: 'https://aureo.studio',
        external: true,
      },
      secondaryCta: {
        label: t('common.cta.contact'),
        url: '/contact',
      },
      features: [
        t('corporate.products.aureoStudio.features.0'),
        t('corporate.products.aureoStudio.features.1'),
        t('corporate.products.aureoStudio.features.2'),
      ],
    },
    {
      name: 'PENNY',
      description: t('corporate.products.penny.description'),
      audience: t('corporate.products.penny.audience'),
      badge: t('corporate.badges.aureoLabsProduct'),
      primaryCta: {
        label: t('corporate.products.penny.cta'),
        url: '/products/penny',
      },
      secondaryCta: {
        label: t('common.cta.contact'),
        url: '/contact',
      },
      features: [
        t('corporate.products.penny.features.0'),
        t('corporate.products.penny.features.1'),
        t('corporate.products.penny.features.2'),
      ],
    },
  ];

  // Programs Preview
  const programsPreview = [
    {
      name: t('corporate.programs.strategyEnablement.name'),
      icon: CogIcon,
      description: t('corporate.programs.strategyEnablement.description'),
      color: 'amber',
    },
    {
      name: t('corporate.programs.platformPilots.name'),
      icon: RocketLaunchIcon,
      description: t('corporate.programs.platformPilots.description'),
      color: 'blue',
    },
    {
      name: t('corporate.programs.strategicPartnerships.name'),
      icon: BuildingOffice2Icon,
      description: t('corporate.programs.strategicPartnerships.description'),
      color: 'purple',
    },
  ];

  return (
    <main className="min-h-screen">
      <ScrollProgress />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 overflow-hidden">
        {/* Background decoration - Subtle solarpunk accents */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#2c8136] rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#58326f] rounded-full filter blur-3xl animate-pulse animation-delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#eebc15] rounded-full filter blur-3xl opacity-5" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-5xl">
            <AnimatedText variant="fadeUp" className="mb-8">
              <div className="mb-4">
                <Badge
                  variant="by-madfam"
                  className="text-white bg-white/10 border-[#2c8136]/20 backdrop-blur-sm"
                >
                  {t('corporate.hero.badge')}
                </Badge>
              </div>
              <Heading level={1} className="text-white mb-6 relative">
                <span className="relative z-10">{t('corporate.hero.title')}</span>
                <span className="absolute -inset-1 bg-gradient-to-r from-[#2c8136]/10 to-[#58326f]/10 blur-lg" />
              </Heading>
              <p className="text-xl text-white/90 mb-8 max-w-4xl leading-relaxed">
                {t('corporate.hero.subtitle')}
              </p>
            </AnimatedText>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-up animation-delay-400">
              <Link href={`/${locale}/arms`}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-neutral-900 hover:bg-neutral-100"
                >
                  {t('corporate.hero.viewArms')}
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href={`/${locale}/products`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  {t('corporate.hero.viewProducts')}
                </Button>
              </Link>
            </div>

            {/* Corporate Structure Visualization */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-fade-up animation-delay-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#2c8136]/5 via-transparent to-[#58326f]/5" />
              <div className="flex items-center justify-center gap-8 text-white/80 relative z-10">
                <span className="text-lg font-semibold text-white">MADFAM</span>
                <ArrowRightIcon className="w-5 h-5" />
                <span>{t('corporate.hero.specializedUnits')}</span>
                <ArrowRightIcon className="w-5 h-5" />
                <span>{t('corporate.hero.premiumProducts')}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Operating Arms Section */}
      <section className="py-20 bg-neutral-50 relative">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #2c8136 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, #58326f 0%, transparent 50%)`,
          }}
        />
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              {t('corporate.arms.title')}
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              {t('corporate.arms.subtitle')}
            </p>
            <Badge variant="by-madfam" className="mt-4">
              {t('corporate.arms.allByMadfam')}
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            {featuredArms.map(arm => (
              <ArmCard key={arm.id} arm={arm} />
            ))}
          </div>

          <div className="text-center">
            <Link href={`/${locale}/arms`}>
              <Button variant="outline" size="lg">
                {t('corporate.arms.viewAll')}
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Products Strip */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              {t('corporate.products.featuredTitle')}
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              {t('corporate.products.featuredSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            {featuredProducts.map(product => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href={`/${locale}/products`}>
              <Button variant="outline" size="lg">
                {t('corporate.products.viewAll')}
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Programs Rail */}
      <section className="py-20 bg-neutral-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              {t('corporate.programs.title')}
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              {t('corporate.programs.processDescription')}
            </p>

            {/* Migration Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <p className="text-blue-800 text-sm">
                <strong>{t('corporate.programs.updateLabel')}</strong>{' '}
                {t('corporate.programs.migrationNotice')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {programsPreview.map((program, index) => {
              const IconComponent = program.icon;
              return (
                <div
                  key={program.name}
                  className={`p-6 rounded-xl border-2 ${
                    program.color === 'amber'
                      ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'
                      : program.color === 'blue'
                        ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
                        : 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200'
                  }`}
                >
                  <div className="text-center">
                    <div
                      className={`w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center ${
                        program.color === 'amber'
                          ? 'bg-amber-100 text-amber-600'
                          : program.color === 'blue'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-purple-100 text-purple-600'
                      }`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-2xl font-bold text-neutral-600 mb-2">{index + 1}</div>
                    <h3 className="font-semibold text-neutral-900 mb-2">{program.name}</h3>
                    <p className="text-neutral-600 text-sm">{program.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link href={`/${locale}/programs`}>
              <Button size="lg">
                {t('corporate.programs.viewAll')}
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Why MADFAM Section */}
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-8">
              {t('corporate.whyMadfam.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-6">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="font-bold text-sm">LATAM</span>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">
                  {t('corporate.whyMadfam.latamFirst.title')}
                </h3>
                <p className="text-neutral-600 text-sm">
                  {t('corporate.whyMadfam.latamFirst.description')}
                </p>
              </div>

              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="font-bold text-sm">🔒</span>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">
                  {t('corporate.whyMadfam.privacyFirst.title')}
                </h3>
                <p className="text-neutral-600 text-sm">
                  {t('corporate.whyMadfam.privacyFirst.description')}
                </p>
              </div>

              <div className="p-6">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="font-bold text-sm">✨</span>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">
                  {t('corporate.whyMadfam.designExcellence.title')}
                </h3>
                <p className="text-neutral-600 text-sm">
                  {t('corporate.whyMadfam.designExcellence.description')}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-900">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              {t('corporate.cta.title')}
            </h2>
            <p className="text-xl text-white/80 mb-12">{t('corporate.cta.subtitle')}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/assessment`}>
                <Button size="lg" variant="secondary">
                  {t('corporate.cta.takeAssessment')}
                </Button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  {t('corporate.cta.contactNow')}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
