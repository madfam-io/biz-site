import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { ArmCard } from '@/components/corporate/ArmCard';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'corporate.arms' });

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

export default async function ArmsPage({ params }: Props) {
  const t = await getTranslations({ locale: params.locale, namespace: 'corporate.arms' });

  const arms = [
    {
      id: 'aureo-labs',
      name: 'Aureo Labs',
      tagline: t('aureoLabs.tagline'),
      description: t('aureoLabs.description'),
      badge: 'por MADFAM',
      accent: 'copper',
      capabilities: [
        t('aureoLabs.capabilities.0'),
        t('aureoLabs.capabilities.1'),
        t('aureoLabs.capabilities.2'),
        t('aureoLabs.capabilities.3'),
      ],
      products: [
        { name: 'Aureo Studio', url: 'https://aureo.studio' },
        { name: 'PENNY', url: '/products/penny' },
        { name: 'Cotiza Studio', url: 'https://cotiza.studio' },
        { name: 'Forge Sight', url: 'https://forgesight.quest' },
      ],
      externalUrl: 'https://aureolabs.dev',
    },
    {
      id: 'primavera3d',
      name: 'Primavera3D',
      tagline: t('primavera3d.tagline'),
      description: t('primavera3d.description'),
      badge: 'por MADFAM',
      accent: 'green',
      capabilities: [
        t('primavera3d.capabilities.0'),
        t('primavera3d.capabilities.1'),
        t('primavera3d.capabilities.2'),
        t('primavera3d.capabilities.3'),
      ],
      products: [
        { name: 'Diseño 3D', url: '/programs#design-fabrication' },
        { name: 'Modelado Paramétrico', url: '/programs#design-fabrication' },
        { name: 'Visualización', url: '/programs#design-fabrication' },
      ],
    },
    {
      id: 'health',
      name: 'MADFAM Health',
      tagline: t('health.tagline'),
      description: t('health.description'),
      badge: 'por MADFAM',
      accent: 'teal',
      capabilities: [
        t('health.capabilities.0'),
        t('health.capabilities.1'),
        t('health.capabilities.2'),
        t('health.capabilities.3'),
      ],
      products: [
        { name: 'MedSync', url: '#', comingSoon: true },
        { name: 'HealthFlow', url: '#', comingSoon: true },
      ],
      comingSoon: true,
    },
    {
      id: 'aero',
      name: 'MADFAM Aero',
      tagline: t('aero.tagline'),
      description: t('aero.description'),
      badge: 'por MADFAM',
      accent: 'blue',
      capabilities: [
        t('aero.capabilities.0'),
        t('aero.capabilities.1'),
        t('aero.capabilities.2'),
        t('aero.capabilities.3'),
      ],
      products: [
        { name: 'AeroControl', url: '#', comingSoon: true },
        { name: 'DroneHub', url: '#', comingSoon: true },
      ],
      comingSoon: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">{t('hero.subtitle')}</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full text-sm text-neutral-600">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              {t('hero.badge')}
            </div>
          </div>
        </div>
      </section>

      {/* Arms Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {arms.map(arm => (
              <ArmCard key={arm.id} arm={arm} />
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Structure */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">{t('structure.title')}</h2>
          <div className="flex items-center justify-center gap-4 text-lg text-neutral-600">
            <span className="font-semibold text-neutral-900">MADFAM</span>
            <span>→</span>
            <span>Unidades</span>
            <span>→</span>
            <span>Productos</span>
          </div>
          <p className="mt-6 text-neutral-600 leading-relaxed">{t('structure.description')}</p>
        </div>
      </section>
    </div>
  );
}
