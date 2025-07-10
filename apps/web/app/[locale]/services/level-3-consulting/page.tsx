import { serviceTiers, ServiceTier } from '@madfam/core';
import { getLocalizedContent, type Locale } from '@madfam/i18n';
import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Level3ConsultingClient } from '@/components/Level3ConsultingClient';

interface Level3ConsultingPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({
  params: { locale },
}: Level3ConsultingPageProps): Promise<Metadata> {
  const service = serviceTiers[ServiceTier.L3_CONSULTING];
  const serviceName = getLocalizedContent(service.name, locale as Locale);
  const serviceDescription = getLocalizedContent(service.description, locale as Locale);

  return {
    title: serviceName,
    description: serviceDescription,
  };
}

export default async function Level3ConsultingPage({
  params: { locale },
}: Level3ConsultingPageProps) {
  unstable_setRequestLocale(locale);
  const service = serviceTiers[ServiceTier.L3_CONSULTING];
  const t = await getTranslations('services');
  const currentLocale = locale as Locale;

  // Get localized content from service object
  const serviceName = getLocalizedContent(service.name, currentLocale);
  const serviceDescription = getLocalizedContent(service.description, currentLocale);

  const translations = {
    heroSubtitle: t('level3.hero.badge'),
    scheduleInitial: t('level3.hero.scheduleInitial'),
    downloadCase: t('level3.hero.downloadCase'),
    typicalDuration: t('level3.hero.typicalDuration'),
    satisfaction: t('level3.hero.satisfaction'),
    benefitsTitle: t('level3.benefits.title'),
    benefitsSubtitle: t('level3.benefits.subtitle'),
    processTitle: t('level3.process.title'),
    processSubtitle: t('level3.process.subtitle'),
    includedTitle: t('level3.included.title'),
    investment: t('level3.included.investment'),
    from: t('level3.included.from'),
    projectDuration: t('level3.included.projectDuration'),
    paymentPlan: t('level3.included.paymentPlan'),
    guaranteedROI: t('level3.included.guaranteedROI'),
    postSupport: t('level3.included.postSupport'),
    requestProposal: t('level3.included.requestProposal'),
    testimonialsTitle: t('level3.testimonials.title'),
    ctaTitle: t('level3.cta.title'),
    ctaSubtitle: t('level3.cta.subtitle'),
    scheduleNow: t('level3.cta.scheduleNow'),
    leadFormTitle: 'Schedule Your AI Transformation',
    leadFormDescription:
      "Tell us about your challenges and we'll create a customized roadmap for your digital transformation",
    submitText: 'Schedule consultation',
  };

  const benefits = [
    {
      icon: '🎯',
      title: t('level3.benefits.items.strategy.title'),
      description: t('level3.benefits.items.strategy.description'),
    },
    {
      icon: '👥',
      title: t('level3.benefits.items.training.title'),
      description: t('level3.benefits.items.training.description'),
    },
    {
      icon: '📊',
      title: t('level3.benefits.items.metrics.title'),
      description: t('level3.benefits.items.metrics.description'),
    },
    {
      icon: '🔄',
      title: t('level3.benefits.items.continuous.title'),
      description: t('level3.benefits.items.continuous.description'),
    },
  ];

  const processSteps = [
    {
      icon: '🔍',
      title: t('level3.process.steps.diagnosis.title'),
      description: t('level3.process.steps.diagnosis.description'),
    },
    {
      icon: '📋',
      title: t('level3.process.steps.strategy.title'),
      description: t('level3.process.steps.strategy.description'),
    },
    {
      icon: '🚀',
      title: t('level3.process.steps.implementation.title'),
      description: t('level3.process.steps.implementation.description'),
    },
    {
      icon: '📈',
      title: t('level3.process.steps.optimization.title'),
      description: t('level3.process.steps.optimization.description'),
    },
  ];

  const testimonials = [
    {
      id: 'manufacture-leader',
      content:
        currentLocale === 'en-US'
          ? "MADFAM's AI consulting transformed our manufacturing process. We reduced waste by 30% and increased efficiency by 50%. The ROI was evident within the first quarter."
          : currentLocale === 'pt-BR'
            ? 'A consultoria de IA da MADFAM transformou nosso processo de fabricação. Reduzimos o desperdício em 30% e aumentamos a eficiência em 50%. O ROI foi evidente no primeiro trimestre.'
            : 'La consultoría de IA de MADFAM transformó nuestro proceso de manufactura. Redujimos el desperdicio en 30% y aumentamos la eficiencia en 50%. El ROI fue evidente en el primer trimestre.',
      author: {
        name: 'María Fernanda López',
        role:
          currentLocale === 'en-US'
            ? 'Operations Director'
            : currentLocale === 'pt-BR'
              ? 'Diretora de Operações'
              : 'Directora de Operaciones',
        company: 'ManufactureLeader',
        image: '/testimonials/maria-lopez.jpg',
      },
      rating: 5,
      service: 'L3 - AI Consulting',
      results: [
        {
          metric:
            currentLocale === 'en-US'
              ? 'Waste reduction'
              : currentLocale === 'pt-BR'
                ? 'Redução de desperdício'
                : 'Reducción de desperdicio',
          value: '30%',
          description:
            currentLocale === 'en-US'
              ? 'In manufacturing process'
              : currentLocale === 'pt-BR'
                ? 'No processo de fabricação'
                : 'En proceso de manufactura',
        },
        {
          metric:
            currentLocale === 'en-US'
              ? 'Efficiency gain'
              : currentLocale === 'pt-BR'
                ? 'Ganho de eficiência'
                : 'Ganancia de eficiencia',
          value: '50%',
          description:
            currentLocale === 'en-US'
              ? 'Overall operations'
              : currentLocale === 'pt-BR'
                ? 'Operações gerais'
                : 'Operaciones generales',
        },
      ],
    },
    {
      id: 'retail-chain',
      content:
        currentLocale === 'en-US'
          ? 'The AI strategy workshops were eye-opening. Our team now understands how to leverage AI for customer insights and inventory optimization. Sales increased by 25%.'
          : currentLocale === 'pt-BR'
            ? 'Os workshops de estratégia de IA foram reveladores. Nossa equipe agora entende como aproveitar a IA para insights de clientes e otimização de estoque. As vendas aumentaram 25%.'
            : 'Los talleres de estrategia de IA fueron reveladores. Nuestro equipo ahora entiende cómo aprovechar la IA para insights de clientes y optimización de inventario. Las ventas aumentaron 25%.',
      author: {
        name: 'Diego Rodríguez',
        role: currentLocale === 'en-US' ? 'CEO' : currentLocale === 'pt-BR' ? 'CEO' : 'CEO',
        company: 'RetailChain',
        image: '/testimonials/diego-rodriguez.jpg',
      },
      rating: 5,
      service: 'L3 - AI Consulting',
      results: [
        {
          metric:
            currentLocale === 'en-US'
              ? 'Sales increase'
              : currentLocale === 'pt-BR'
                ? 'Aumento de vendas'
                : 'Aumento de ventas',
          value: '25%',
          description:
            currentLocale === 'en-US'
              ? 'After AI implementation'
              : currentLocale === 'pt-BR'
                ? 'Após implementação de IA'
                : 'Después de implementación de IA',
        },
        {
          metric:
            currentLocale === 'en-US'
              ? 'Team capability'
              : currentLocale === 'pt-BR'
                ? 'Capacidade da equipe'
                : 'Capacidad del equipo',
          value: '100%',
          description:
            currentLocale === 'en-US'
              ? 'AI-ready workforce'
              : currentLocale === 'pt-BR'
                ? 'Força de trabalho pronta para IA'
                : 'Fuerza laboral lista para IA',
        },
      ],
    },
  ];

  return (
    <Level3ConsultingClient
      locale={locale}
      service={service}
      serviceName={serviceName}
      serviceDescription={serviceDescription}
      translations={translations}
      benefits={benefits}
      processSteps={processSteps}
      testimonials={testimonials}
    />
  );
}
