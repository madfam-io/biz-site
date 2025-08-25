'use client';

import { Button, Container, Heading } from '@madfam/ui';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { AnimatedText } from '@/components/AnimatedText';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ArmCard } from '@/components/corporate/ArmCard';
import { ProductCard } from '@/components/corporate/ProductCard';
import { Badge } from '@/components/corporate/Badge';
import {
  ArrowRightIcon,
  CubeIcon,
  CogIcon,
  RocketLaunchIcon,
  BuildingOffice2Icon,
} from '@heroicons/react/24/outline';

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
      badge: 'por MADFAM',
      accent: 'copper' as const,
      capabilities: [
        'Automatización inteligente',
        'Plataformas web',
        'Integraciones API',
        'SRE y seguridad',
      ],
      products: [
        { name: 'Aureo Studio', url: 'https://aureo.studio' },
        { name: 'PENNY', url: '/products/penny' },
        { name: 'Cotiza Studio', url: 'https://cotiza.studio' },
      ],
      externalUrl: 'https://aureolabs.dev',
    },
    {
      id: 'primavera3d',
      name: 'Primavera3D',
      tagline: t('corporate.arms.primavera3d.tagline'),
      description: t('corporate.arms.primavera3d.description'),
      badge: 'por MADFAM',
      accent: 'green' as const,
      capabilities: ['Modelado 3D', 'Diseño paramétrico', 'Visualización', 'Fabricación digital'],
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
      description:
        'Plataforma de orquestación de IA que gobierna y automatiza procesos empresariales complejos.',
      audience: 'Empresas medianas a grandes',
      badge: 'un producto de Aureo Labs',
      primaryCta: {
        label: 'Visitar Aureo Studio',
        url: 'https://aureo.studio',
        external: true,
      },
      secondaryCta: {
        label: 'Contactar',
        url: '/contact',
      },
      features: [
        'Control de flujos inteligente',
        'Integraciones empresariales',
        'Monitoreo en tiempo real',
      ],
    },
    {
      name: 'PENNY',
      description:
        'Interfaz de workspace que facilita la automatización y mejora la experiencia del usuario.',
      audience: 'Equipos y organizaciones',
      badge: 'un producto de Aureo Labs',
      primaryCta: {
        label: 'Ver PENNY',
        url: '/products/penny',
      },
      secondaryCta: {
        label: 'Contactar',
        url: '/contact',
      },
      features: ['Interfaz intuitiva', 'Colaboración en equipo', 'Automatización visual'],
    },
  ];

  // Programs Preview
  const programsPreview = [
    {
      name: t('corporate.programs.strategyEnablement.name'),
      icon: CogIcon,
      description: 'Talleres y capacitación estratégica',
      color: 'amber',
    },
    {
      name: t('corporate.programs.platformPilots.name'),
      icon: RocketLaunchIcon,
      description: 'Implementación de Aureo Studio + PENNY',
      color: 'blue',
    },
    {
      name: t('corporate.programs.strategicPartnerships.name'),
      icon: BuildingOffice2Icon,
      description: 'Asociaciones vCTO y transformación',
      color: 'purple',
    },
  ];

  return (
    <main className="min-h-screen">
      <ScrollProgress />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full filter blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-pulse animation-delay-1000" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-5xl">
            <AnimatedText variant="fadeUp" className="mb-8">
              <div className="mb-4">
                <Badge variant="by-madfam" className="text-white bg-white/10 border-white/20">
                  Casa matriz
                </Badge>
              </div>
              <Heading level={1} className="text-white mb-6">
                {t('corporate.hero.title')}
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
                  Ver unidades
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href={`/${locale}/products`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Ver productos
                </Button>
              </Link>
            </div>

            {/* Corporate Structure Visualization */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 animate-fade-up animation-delay-600">
              <div className="flex items-center justify-center gap-8 text-white/80">
                <span className="text-lg font-semibold text-white">MADFAM</span>
                <ArrowRightIcon className="w-5 h-5" />
                <span>Unidades especializadas</span>
                <ArrowRightIcon className="w-5 h-5" />
                <span>Productos premium</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Operating Arms Section */}
      <section className="py-20 bg-neutral-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Nuestras unidades operativas
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Equipos especializados que entregan excelencia en software, manufactura y más.
            </p>
            <Badge variant="by-madfam" className="mt-4">
              Todas las unidades por MADFAM
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
                Ver todas las unidades
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
              Productos destacados
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Plataformas y herramientas desarrolladas por nuestras unidades especializadas.
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
                Ver todos los productos
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
              Programas de transformación
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              Proceso estratégico en 3 fases: Estrategia → Piloto → Escala
            </p>

            {/* Migration Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <p className="text-blue-800 text-sm">
                <strong>Actualización:</strong> Nuestros servicios L1-L5 ahora son Programas
                especializados por unidad.
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
                Ver todos los programas
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
              ¿Por qué MADFAM?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="p-6">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="font-bold text-sm">LATAM</span>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">LATAM-first</h3>
                <p className="text-neutral-600 text-sm">
                  Construido desde y para América Latina, con alcance global.
                </p>
              </div>

              <div className="p-6">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="font-bold text-sm">🔒</span>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Privacy-first</h3>
                <p className="text-neutral-600 text-sm">
                  Seguridad y privacidad de datos como principio fundamental.
                </p>
              </div>

              <div className="p-6">
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                  <span className="font-bold text-sm">✨</span>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">Excelencia en diseño</h3>
                <p className="text-neutral-600 text-sm">
                  Donde la IA encuentra la creatividad humana.
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
              ¿Listo para transformar tu organización?
            </h2>
            <p className="text-xl text-white/80 mb-12">
              Descubre qué unidad y programa son perfectos para tu proyecto.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/assessment`}>
                <Button size="lg" variant="secondary">
                  Tomar evaluación IA
                </Button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  Contactar ahora
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
