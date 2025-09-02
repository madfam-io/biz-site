import { Container } from '@madfam/ui';
import { Metadata } from 'next';
import Link from 'next/link';
import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import { Badge } from '@/components/corporate/Badge';
import { ProductCard } from '@/components/corporate/ProductCard';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'corporate.products' });

  return {
    title: t('meta.title') || 'Productos | MADFAM',
    description:
      t('meta.description') ||
      'Plataformas y herramientas desarrolladas por nuestras unidades especializadas.',
    openGraph: {
      title: t('meta.title') || 'Productos | MADFAM',
      description:
        t('meta.description') ||
        'Plataformas y herramientas desarrolladas por nuestras unidades especializadas.',
      type: 'website',
    },
  };
}

export default async function ProductsPage({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  const commonT = await getTranslations({ locale: params.locale, namespace: 'common' });

  // All products with ownership badges
  const products = [
    // Aureo Labs Products
    {
      name: 'Penny',
      description:
        'User-friendly AI chat and workbench platform for consumers and enterprises. Your intelligent assistant for everyday tasks and business automation.',
      audience: 'Consumers and businesses of all sizes',
      badge: 'by Aureo Labs, a MADFAM Company',
      primaryCta: {
        label: 'Visit Penny',
        url: 'https://www.penny.onl',
        external: true,
      },
      secondaryCta: {
        label: commonT('nav.contact'),
        url: '/contact',
      },
      features: ['Interfaz intuitiva', 'Colaboración en equipo', 'Automatización visual'],
      category: 'Workspace',
      arm: 'aureo-labs',
    },
    {
      name: 'Cotiza Studio',
      description:
        'Workspace especializado para generación de cotizaciones y presupuestos inteligentes.',
      audience: 'Empresas de servicios y consultorías',
      badge: 'by Aureo Labs, a MADFAM Company',
      primaryCta: {
        label: 'Visitar Cotiza Studio',
        url: 'https://www.cotiza.studio',
        external: true,
      },
      secondaryCta: {
        label: commonT('nav.contact'),
        url: '/contact',
      },
      features: [
        'Cotizaciones inteligentes',
        'Plantillas personalizables',
        'Seguimiento de propuestas',
      ],
      category: 'Workspace',
      arm: 'aureo-labs',
    },
    {
      name: 'Forge Sight',
      description:
        'Plataforma de análisis y visualización de datos para toma de decisiones estratégicas.',
      audience: 'Analistas y tomadores de decisión',
      badge: 'by Aureo Labs, a MADFAM Company',
      primaryCta: {
        label: 'Visitar Forge Sight',
        url: 'https://www.forgesight.quest',
        external: true,
      },
      secondaryCta: {
        label: commonT('nav.contact'),
        url: '/contact',
      },
      features: ['Análisis predictivo', 'Dashboards interactivos', 'Alertas inteligentes'],
      category: 'Platform',
      arm: 'aureo-labs',
    },
    {
      name: 'Dhanam',
      description: 'Financial wellness and wealth management platform with AI-powered insights.',
      audience: 'Individuals and financial advisors',
      badge: 'by Aureo Labs, a MADFAM Company',
      primaryCta: {
        label: 'Visit Dhanam',
        url: 'https://www.dhan.am',
        external: true,
      },
      secondaryCta: {
        label: commonT('nav.contact'),
        url: '/contact',
      },
      features: [
        'AI-powered financial insights',
        'Personalized wealth strategies',
        'Real-time portfolio tracking',
      ],
      category: 'Platform',
      arm: 'aureo-labs',
    },
    {
      name: 'AVALA',
      description:
        'Plataforma de validación y cumplimiento normativo automatizado para empresas reguladas.',
      audience: 'Empresas con altos requerimientos de cumplimiento',
      badge: 'by Aureo Labs, a MADFAM Company',
      primaryCta: {
        label: 'Próximamente',
        url: '#',
        comingSoon: true,
      },
      secondaryCta: {
        label: commonT('nav.contact'),
        url: '/contact',
      },
      features: ['Cumplimiento automatizado', 'Auditorías inteligentes', 'Reportes regulatorios'],
      category: 'Platform',
      arm: 'aureo-labs',
      comingSoon: true,
    },
    // MADFAM Direct Products
    // TBD
    {
      name: 'Factlas',
      description: 'Plataforma de colaboración global para equipos distribuidos con IA contextual.',
      audience: 'Equipos remotos y empresas globales',
      badge: 'por determinar',
      primaryCta: {
        label: 'En definición',
        url: '#',
        comingSoon: true,
      },
      secondaryCta: {
        label: commonT('nav.contact'),
        url: '/contact',
      },
      features: ['Colaboración inteligente', 'Contexto cultural IA', 'Sincronización global'],
      category: 'TBD',
      arm: 'tbd',
      comingSoon: true,
    },
  ];

  // Featured products (ready for production)
  const featuredProducts = products.filter(p => !p.comingSoon);
  const upcomingProducts = products.filter(p => p.comingSoon);

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6">
              Nuestros productos
            </h1>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              Plataformas y herramientas desarrolladas por nuestras unidades especializadas para
              resolver problemas reales.
            </p>

            {/* Product Categories */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="program">Plataformas</Badge>
              <Badge variant="program">Workspaces</Badge>
              <Badge variant="program">Datos abiertos</Badge>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <Container>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">
              Productos disponibles
            </h2>
            <p className="text-xl text-neutral-600 text-center max-w-3xl mx-auto">
              Plataformas y herramientas listas para implementar en tu organización.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {featuredProducts.map(product => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* Upcoming Products */}
      {upcomingProducts.length > 0 && (
        <section className="py-16 bg-neutral-50">
          <Container>
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">Próximamente</h2>
              <p className="text-xl text-neutral-600 text-center max-w-3xl mx-auto">
                Productos y plataformas en desarrollo por nuestras unidades.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {upcomingProducts.map(product => (
                <div key={product.name} className="relative">
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
                      Próximamente
                    </span>
                  </div>
                  <div className="opacity-75">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-neutral-900">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              ¿Interesado en nuestros productos?
            </h2>
            <p className="text-xl text-white/80 mb-12">
              Contacta con la unidad responsable o agenda una demostración personalizada.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="px-8 py-3 bg-white text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors font-medium">
                  Contactar ahora
                </button>
              </Link>
              <Link href="/arms">
                <button className="px-8 py-3 border border-white text-white rounded-lg hover:bg-white/10 transition-colors font-medium">
                  Ver unidades
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
