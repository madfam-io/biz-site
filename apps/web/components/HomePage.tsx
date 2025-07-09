'use client';

import { Button, Container, Heading } from '@madfam/ui';
import { AnimatedText } from '@/components/AnimatedText';
import { ScrollProgress } from '@/components/ScrollProgress';
import { useTranslations } from 'next-intl';

export function HomePage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen">
      <ScrollProgress />
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-obsidian via-obsidian/95 to-lavender/10 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sun rounded-full filter blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-lavender rounded-full filter blur-3xl animate-float animation-delay-400" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl">
            <AnimatedText variant="fadeUp" className="mb-6">
              <Heading level={1} className="text-white">
                {t('home.hero.title').split('human creativity')[0]}
                <span className="gradient-text">
                  {t('home.hero.title').split('meets ')[1]}
                </span>
              </Heading>
            </AnimatedText>
            <AnimatedText variant="fadeUp" delay={0.2}>
              <p className="text-xl text-white/90 mb-8 max-w-3xl">
                {t('home.hero.subtitle')}
              </p>
            </AnimatedText>
            <div className="flex flex-wrap gap-4 animate-fade-up animation-delay-400">
              <Button variant="secondary" size="lg">
                {t('home.hero.exploreServices')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-obsidian"
              >
                {t('home.hero.viewProducts')}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Rest of the component content... */}
    </main>
  );
}