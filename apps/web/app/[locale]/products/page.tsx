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
        'Enterprise-grade pricing intelligence platform for the global digital fabrication industry. Continuously harvests, normalizes, and benchmarks prices from 3D printing to CNC machining.',
      audience: 'Digital fabrication companies, 3D printing services, and procurement teams',
      badge: 'by Aureo Labs, a MADFAM Company',
      primaryCta: {
        label: 'Visit Platform',
        url: 'https://www.forgesight.quest',
        external: true,
      },
      secondaryCta: {
        label: commonT('nav.contact'),
        url: '/contact',
      },
      features: [
        'AI-powered price discovery from 1000+ vendors',
        'Real-time benchmarking with statistical analysis',
        'Enterprise security and compliance',
      ],
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
        'SaaS platform for designing, delivering, and verifying competency-based training aligned with Mexican EC/CONOCER standards. Generates DC-3 certificates and ensures regulatory compliance.',
      audience: 'Training organizations and enterprises in LATAM',
      badge: 'by Aureo Labs, a MADFAM Company',
      primaryCta: {
        label: 'Coming Soon',
        url: '#',
        comingSoon: true,
      },
      secondaryCta: {
        label: commonT('nav.contact'),
        url: '/contact',
      },
      features: [
        'EC/CONOCER aligned training',
        'DC-3 certificate generation',
        'Verifiable credentials (Open Badges 3.0)',
      ],
      category: 'Platform',
      arm: 'aureo-labs',
    },
    // MADFAM Direct Products
    // TBD
    {
      name: 'Factlas',
      description:
        'Geographic intelligence platform that converts geospatial signals into auditable facts with coordinates. STAC-compliant catalog for discovering and analyzing location data.',
      audience: 'Real estate developers, urban planners, and GIS analysts',
      badge: 'by Aureo Labs, a MADFAM Company',
      primaryCta: {
        label: 'Coming Soon',
        url: 'https://www.factl.as',
        external: true,
        comingSoon: true,
      },
      secondaryCta: {
        label: commonT('nav.contact'),
        url: '/contact',
      },
      features: [
        'Geospatial fact verification',
        'STAC-compliant data catalog',
        'AI-powered site selection',
      ],
      category: 'Platform',
      arm: 'aureo-labs',
      comingSoon: true,
    },
  ];

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

      {/* All Products */}
      <section className="py-16">
        <Container>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">
              Nuestro catálogo
            </h2>
            <p className="text-xl text-neutral-600 text-center max-w-3xl mx-auto">
              Plataformas y herramientas desarrolladas por nuestras unidades especializadas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {products.map(product => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </Container>
      </section>

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
