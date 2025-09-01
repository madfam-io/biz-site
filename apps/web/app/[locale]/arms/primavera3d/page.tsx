import { ArrowUpRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'corporate.arms.primavera3d',
  });

  return {
    title: `Primavera3D - ${t('tagline')} | MADFAM`,
    description: t('description'),
    openGraph: {
      title: `Primavera3D - ${t('tagline')}`,
      description: t('description'),
      type: 'website',
    },
  };
}

export default async function Primavera3DPage({ params }: Props) {
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: 'corporate.arms' });

  const capabilities = [
    t('primavera3d.capabilities.0'),
    t('primavera3d.capabilities.1'),
    t('primavera3d.capabilities.2'),
    t('primavera3d.capabilities.3'),
  ];

  const services = [
    {
      name: 'Diseño 3D',
      description: 'Modelado y visualización 3D profesional para arquitectura e industria',
      icon: '🎨',
    },
    {
      name: 'Modelado Paramétrico',
      description: 'Diseño generativo y paramétrico para manufactura avanzada',
      icon: '⚙️',
    },
    {
      name: 'Visualización',
      description: 'Renderizado fotorrealista y experiencias inmersivas',
      icon: '👁️',
    },
    {
      name: 'Fabricación Digital',
      description: 'Preparación de archivos para impresión 3D y CNC',
      icon: '🏭',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Link
          href={`/${params.locale}/arms`}
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          {t('viewAll')}
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-neutral-900">Primavera3D</h1>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
                una Empresa MADFAM
              </span>
            </div>

            <p className="text-2xl text-green-600 font-medium mb-6">{t('primavera3d.tagline')}</p>

            <p className="text-xl text-neutral-600 leading-relaxed mb-8">
              {t('primavera3d.description')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="https://www.primavera3d.pro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Visitar sitio web
                <ArrowUpRightIcon className="w-5 h-5" />
              </Link>

              <Link
                href={`/${params.locale}/contact`}
                className="inline-flex items-center px-6 py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors font-medium"
              >
                Solicitar cotización
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">Capacidades principales</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {capabilities.map((capability, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-100"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <p className="text-neutral-700">{capability}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-900 mb-8">Servicios especializados</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-xl border border-green-200 hover:border-green-300 transition-colors"
                >
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">{service.name}</h3>
                  <p className="text-sm text-neutral-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para transformar tus ideas en realidad?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Primavera3D combina tecnología avanzada con creatividad para dar vida a tus proyectos.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="https://www.primavera3d.pro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
            >
              Explorar portafolio
              <ArrowUpRightIcon className="w-5 h-5" />
            </Link>
            <Link
              href={`/${params.locale}/contact`}
              className="inline-flex items-center px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium"
            >
              Contactar ahora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
