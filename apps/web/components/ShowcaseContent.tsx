'use client';

import {
  Button,
  Hero,
  CTA,
  Features,
  ProductCard,
  TestimonialCard,
  Container,
  Heading,
} from '@madfam/ui';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FeatureFlag, FeatureFlagDebug } from '@/components/FeatureFlag';

export function ShowcaseContent() {
  const t = useTranslations();
  const [darkMode, setDarkMode] = useState(false);

  // Example icons as simple SVGs
  const CubeIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );

  const SparkIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );

  const RocketIcon = () => (
    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.13 5.09C18.21 3.9 16.56 3 14.5 3c-3.08 0-5.5 2.5-5.5 5.58 0 3.08 2.42 5.5 5.5 5.5 2.06 0 3.71-.9 4.63-2.09l-2.04-1.29c-.56.81-1.54 1.38-2.59 1.38-1.97 0-3.5-1.53-3.5-3.5s1.53-3.5 3.5-3.5c1.05 0 2.03.57 2.59 1.38l2.04-1.29z" />
    </svg>
  );

  const features = [
    {
      icon: <CubeIcon />,
      title: t('showcase.features.automation'),
      description: t('showcase.features.automationDesc'),
      link: { text: t('common.learnMore'), href: '/programs' },
    },
    {
      icon: <SparkIcon />,
      title: t('showcase.features.ai'),
      description: t('showcase.features.aiDesc'),
      badge: 'Popular',
    },
    {
      icon: <RocketIcon />,
      title: t('showcase.features.transformation'),
      description: t('showcase.features.transformationDesc'),
    },
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-pearl dark:bg-obsidian">
        {/* Feature Flag Debug (dev only) */}
        {process.env.NODE_ENV === 'development' && <FeatureFlagDebug />}

        {/* Header with dark mode toggle */}
        <div className="p-4 border-b border-gray-200 dark:border-obsidian/20">
          <Container>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-obsidian dark:text-pearl">
                {t('showcase.title')}
              </h1>
              <Button variant="ghost" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? '☀️' : '🌙'} {t('showcase.toggleDarkMode')}
              </Button>
            </div>
          </Container>
        </div>

        {/* Hero Section */}
        <Hero
          variant="home"
          title={t('home.hero.title')}
          subtitle="MADFAM COMPONENTS"
          description={t('home.hero.subtitle')}
          cta={{
            primary: {
              text: t('home.hero.cta'),
              href: '#services',
              variant: 'creative',
            },
            secondary: {
              text: t('common.learnMore'),
              href: '#features',
            },
          }}
          background="gradient"
        />

        {/* Buttons Section */}
        <section className="py-16">
          <Container>
            <Heading level={2} className="mb-8 text-center">
              {t('showcase.sections.buttons')}
            </Heading>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary">{t('showcase.buttons.primary')}</Button>
              <Button variant="secondary">{t('showcase.buttons.secondary')}</Button>
              <Button variant="creative">{t('showcase.buttons.creative')}</Button>
              <Button variant="outline">{t('showcase.buttons.outline')}</Button>
              <Button variant="ghost">{t('showcase.buttons.ghost')}</Button>
              <Button variant="danger">{t('showcase.buttons.danger')}</Button>
              <Button variant="success">{t('showcase.buttons.success')}</Button>
              <Button variant="primary" loading>
                {t('showcase.buttons.loading')}
              </Button>
              <Button variant="primary" icon={<SparkIcon />}>
                {t('showcase.buttons.withIcon')}
              </Button>
            </div>
          </Container>
        </section>

        {/* Feature Flag Example */}
        <FeatureFlag
          flag="INTERACTIVE_CALCULATOR"
          fallback={
            <section className="py-16">
              <Container>
                <div className="text-center p-8 bg-gray-100 dark:bg-obsidian/10 rounded-lg">
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('showcase.featureFlag.comingSoon')}
                  </p>
                </div>
              </Container>
            </section>
          }
        >
          <section className="py-16">
            <Container>
              <div className="text-center p-8 bg-gradient-to-r from-lavender to-sun text-white rounded-lg">
                <h3 className="text-2xl font-bold mb-4">{t('showcase.featureFlag.active')}</h3>
                <p>{t('showcase.featureFlag.activeDescription')}</p>
              </div>
            </Container>
          </section>
        </FeatureFlag>

        {/* Product Cards */}
        <section className="py-16 bg-gray-50 dark:bg-obsidian/5">
          <Container>
            <Heading level={2} className="mb-8 text-center">
              {t('showcase.sections.products')}
            </Heading>
            <div className="grid md:grid-cols-2 gap-6">
              <ProductCard
                name="SPARK"
                tagline={t('products.spark.tagline')}
                description={t('products.spark.shortDescription')}
                features={[
                  { icon: <SparkIcon />, text: t('products.spark.features.0') },
                  { text: t('products.spark.features.1') },
                  { text: t('products.spark.features.2') },
                ]}
                badge={{ text: 'NEW', variant: 'new' }}
                cta={{
                  primary: { text: t('common.getStarted'), href: '#' },
                  secondary: { text: t('common.learnMore'), href: '#' },
                }}
                logo={<SparkIcon />}
              />
              <ProductCard
                name="PENNY"
                tagline={t('products.penny.tagline')}
                description={t('products.penny.shortDescription')}
                features={[
                  { text: t('products.penny.features.0') },
                  { text: t('products.penny.features.1') },
                ]}
                badge={{ text: 'BETA', variant: 'beta' }}
                cta={{
                  primary: { text: t('common.tryFree'), href: '#' },
                }}
                gradient="from-sun/10 to-leaf/10"
                logo={<CubeIcon />}
              />
            </div>
          </Container>
        </section>

        {/* Features Section */}
        <Features
          variant="grid"
          title={t('showcase.sections.features')}
          subtitle={t('showcase.features.subtitle')}
          description={t('showcase.features.description')}
          features={features}
          columns={3}
          centered
          iconStyle="gradient"
        />

        {/* Testimonials */}
        <section className="py-16 bg-gray-50 dark:bg-obsidian/5">
          <Container>
            <Heading level={2} className="mb-8 text-center">
              {t('showcase.sections.testimonials')}
            </Heading>
            <div className="grid md:grid-cols-3 gap-6">
              <TestimonialCard
                quote="MADFAM transformed our operations with their AI solutions. The ROI was evident within weeks."
                author={{
                  name: 'Maria González',
                  role: 'CEO',
                  company: 'TechCorp México',
                }}
                rating={5}
              />
              <TestimonialCard
                quote="The team's expertise in both AI and design thinking sets them apart. Highly recommended!"
                author={{
                  name: 'Carlos Rivera',
                  role: 'Innovation Director',
                  company: 'StartupMX',
                }}
                rating={5}
                variant="featured"
              />
              <TestimonialCard
                quote="Professional, innovative, and results-driven. MADFAM is our go-to AI partner."
                author={{
                  name: 'Ana Martínez',
                  role: 'CTO',
                  company: 'FinTech Solutions',
                }}
                rating={4}
                variant="compact"
              />
            </div>
          </Container>
        </section>

        {/* CTA Section */}
        <CTA
          variant="centered"
          title={t('home.cta.title')}
          description={t('home.cta.subtitle')}
          cta={{
            text: t('home.cta.button'),
            href: '/contact',
            variant: 'primary',
          }}
          background="gradient"
        />
      </div>
    </div>
  );
}
