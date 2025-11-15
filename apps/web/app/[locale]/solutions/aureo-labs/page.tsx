import { ArrowUpRightIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Badge } from '@/components/corporate/Badge';
import { ProductCard } from '@/components/corporate/ProductCard';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'corporate.solutions.aureoLabs' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
    },
  };
}

export default async function AureoLabsPage({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: 'corporate.solutions.aureoLabs' });
  const commonT = await getTranslations({ locale: params.locale, namespace: 'common' });

  const products = [
    {
      name: 'AVALA',
      comingSoon: true,
      description: t('products.avala.description'),
      audience: t('products.avala.audience'),
      badge: 'by Aureo Labs, a MADFAM Company',
      primaryCta: {
        label: 'Coming Soon',
        url: '#',
        comingSoon: true,
      },
      secondaryCta: {
        label: commonT('cta.contact'),
        url: '/contact',
      },
      features: [
        t('products.avala.features.0'),
        t('products.avala.features.1'),
        t('products.avala.features.2'),
      ],
    },
    {
      name: 'Forge Sight',
      description: t('products.forgeSight.description'),
      audience: t('products.forgeSight.audience'),
      badge: 'by Aureo Labs, a MADFAM Company',
      primaryCta: {
        label: t('products.forgeSight.cta'),
        url: 'https://www.forgesight.quest',
        external: true,
      },
      secondaryCta: {
        label: commonT('cta.contact'),
        url: '/contact',
      },
      features: [
        t('products.forgeSight.features.0'),
        t('products.forgeSight.features.1'),
        t('products.forgeSight.features.2'),
      ],
    },
    {
      name: 'Dhanam',
      description: t('products.dhanam.description'),
      audience: t('products.dhanam.audience'),
      badge: 'by Aureo Labs, a MADFAM Company',
      primaryCta: {
        label: t('products.dhanam.cta'),
        url: 'https://www.dhan.am',
        external: true,
      },
      secondaryCta: {
        label: commonT('cta.contact'),
        url: '/contact',
      },
      features: [
        t('products.dhanam.features.0'),
        t('products.dhanam.features.1'),
        t('products.dhanam.features.2'),
      ],
    },
  ];

  // Split products into ready and coming soon
  const readyProducts = products.filter(p => !p.comingSoon);
  const comingSoonProducts = products.filter(p => p.comingSoon);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link
                href="/solutions"
                className="text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                {commonT('nav.solutions')}
              </Link>
              <span className="mx-2 text-neutral-300">/</span>
              <span className="text-neutral-900">Aureo Labs</span>
            </nav>

            {/* Logo & Badge */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900">Aureo Labs</h1>
                <Badge variant="by-madfam" />
              </div>
              <p className="text-xl text-neutral-600 font-medium">{t('tagline')}</p>
            </div>

            {/* Main Pitch */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold text-amber-900 mb-4">{t('pitch.title')}</h2>
              <p className="text-amber-800 leading-relaxed">{t('pitch.description')}</p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="https://www.aureolabs.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
              >
                {t('links.website')}
                <ArrowUpRightIcon className="w-4 h-4" />
              </Link>
              <Link
                href="/security"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-900 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <ShieldCheckIcon className="w-4 h-4" />
                {t('links.security')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Ready */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-900 mb-12 text-center">
              {t('products.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {readyProducts.map(product => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Coming Soon */}
      {comingSoonProducts.length > 0 && (
        <section className="py-16 bg-amber-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4 text-center">Coming Soon</h2>
              <p className="text-xl text-neutral-600 text-center mb-12">
                New platforms and solutions in development
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {comingSoonProducts.map(product => (
                  <div key={product.name} className="relative">
                    <div className="absolute top-4 right-4 z-10">
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full font-medium">
                        Coming Soon
                      </span>
                    </div>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Capabilities Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-900 mb-12 text-center">
              {t('capabilities.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-amber-600 font-semibold text-sm">AI</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">
                      {t('capabilities.agentic.title')}
                    </h3>
                    <p className="text-neutral-600">{t('capabilities.agentic.description')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-semibold text-sm">WEB</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">
                      {t('capabilities.platforms.title')}
                    </h3>
                    <p className="text-neutral-600">{t('capabilities.platforms.description')}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-600 font-semibold text-sm">API</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">
                      {t('capabilities.integrations.title')}
                    </h3>
                    <p className="text-neutral-600">{t('capabilities.integrations.description')}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-purple-600 font-semibold text-sm">SRE</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 mb-2">
                      {t('capabilities.sre.title')}
                    </h3>
                    <p className="text-neutral-600">{t('capabilities.sre.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl font-medium text-neutral-900 mb-8">
              &ldquo;{t('philosophy.quote')}&rdquo;
            </blockquote>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-amber-900 mb-4">
                {t('philosophy.principles.title')}
              </h3>
              <div className="flex flex-wrap justify-center gap-4 text-amber-800">
                <span className="px-3 py-1 bg-amber-100 rounded-full text-sm">
                  {t('philosophy.principles.approve')}
                </span>
                <span className="px-3 py-1 bg-amber-100 rounded-full text-sm">
                  {t('philosophy.principles.observe')}
                </span>
                <span className="px-3 py-1 bg-amber-100 rounded-full text-sm">
                  {t('philosophy.principles.undo')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
