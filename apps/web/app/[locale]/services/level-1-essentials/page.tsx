import { serviceTiers, ServiceTier } from '@madfam/core';
import { getLocalizedContent, type Locale } from '@madfam/i18n';
import { Container, Heading, Button } from '@madfam/ui';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { ServiceCard } from '@/components/ServiceCard';

export default function Level1EssentialsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const service = serviceTiers[ServiceTier.L1_ESSENTIALS];
  const t = useTranslations('services');
  const currentLocale = locale as Locale;

  // Get localized content from service object
  const serviceDescription = getLocalizedContent(service.description, currentLocale);

  const otherServices = [
    serviceTiers[ServiceTier.L2_ADVANCED],
    serviceTiers[ServiceTier.L3_CONSULTING],
  ];

  const projects = [
    {
      title:
        currentLocale === 'en-US'
          ? 'Product Render'
          : currentLocale === 'pt-BR'
            ? 'Render de Produto'
            : 'Render de Producto',
      description:
        currentLocale === 'en-US'
          ? 'Photorealistic 3D visualization for e-commerce'
          : currentLocale === 'pt-BR'
            ? 'Visualização 3D fotorrealista para e-commerce'
            : 'Visualización 3D fotorrealista para e-commerce',
      time: `48 ${currentLocale === 'en-US' ? 'hours' : currentLocale === 'pt-BR' ? 'horas' : 'horas'}`,
      result: `+45% ${currentLocale === 'en-US' ? 'conversion' : currentLocale === 'pt-BR' ? 'conversão' : 'conversión'}`,
    },
    {
      title:
        currentLocale === 'en-US'
          ? 'Logo Animation'
          : currentLocale === 'pt-BR'
            ? 'Animação de Logo'
            : 'Animación de Logo',
      description:
        currentLocale === 'en-US'
          ? 'Animated intro for corporate videos'
          : currentLocale === 'pt-BR'
            ? 'Intro animada para vídeos corporativos'
            : 'Intro animada para videos corporativos',
      time: `72 ${currentLocale === 'en-US' ? 'hours' : currentLocale === 'pt-BR' ? 'horas' : 'horas'}`,
      result: 'Brand awareness x3',
    },
    {
      title:
        currentLocale === 'en-US'
          ? 'Packaging Design'
          : currentLocale === 'pt-BR'
            ? 'Design de Embalagem'
            : 'Diseño de Packaging',
      description:
        currentLocale === 'en-US'
          ? '3D proposal for product line'
          : currentLocale === 'pt-BR'
            ? 'Proposta 3D para linha de produtos'
            : 'Propuesta 3D para línea de productos',
      time: `5 ${currentLocale === 'en-US' ? 'days' : currentLocale === 'pt-BR' ? 'dias' : 'días'}`,
      result: `25% ${currentLocale === 'en-US' ? 'more sales' : currentLocale === 'pt-BR' ? 'mais vendas' : 'más ventas'}`,
    },
  ];

  const process = [
    {
      step: 1,
      title: t('level1.process.steps.brief.title'),
      description: t('level1.process.steps.brief.description'),
      time: '5 min',
    },
    {
      step: 2,
      title:
        currentLocale === 'en-US'
          ? 'Instant Proposal'
          : currentLocale === 'pt-BR'
            ? 'Proposta Instantânea'
            : 'Propuesta Instantánea',
      description:
        currentLocale === 'en-US'
          ? 'Receive quote and timeline in less than 1 hour'
          : currentLocale === 'pt-BR'
            ? 'Receba orçamento e cronograma em menos de 1 hora'
            : 'Recibe cotización y timeline en menos de 1 hora',
      time: `< 1 ${currentLocale === 'en-US' ? 'hour' : currentLocale === 'pt-BR' ? 'hora' : 'hora'}`,
    },
    {
      step: 3,
      title: t('level1.process.steps.design.title'),
      description: t('level1.process.steps.design.description'),
      time: '24-72 hrs',
    },
    {
      step: 4,
      title: t('level1.process.steps.delivery.title'),
      description:
        currentLocale === 'en-US'
          ? 'Receive final files with unlimited revisions for 7 days'
          : currentLocale === 'pt-BR'
            ? 'Receba arquivos finais com revisões ilimitadas por 7 dias'
            : 'Recibe archivos finales con revisiones ilimitadas por 7 días',
      time: `7 ${currentLocale === 'en-US' ? 'days' : currentLocale === 'pt-BR' ? 'dias' : 'días'}`,
    },
  ];

  const faqs = [
    {
      question:
        currentLocale === 'en-US'
          ? 'What does the Essentials service include?'
          : currentLocale === 'pt-BR'
            ? 'O que inclui o serviço Essentials?'
            : '¿Qué incluye el servicio Essentials?',
      answer:
        currentLocale === 'en-US'
          ? 'Includes complete 3D design, professional rendering, graphic design for digital/print, basic animations and unlimited revisions for 7 days.'
          : currentLocale === 'pt-BR'
            ? 'Inclui design 3D completo, renderização profissional, design gráfico para digital/impresso, animações básicas e revisões ilimitadas por 7 dias.'
            : 'Incluye diseño 3D completo, renderizado profesional, diseño gráfico para digital/impreso, animaciones básicas y revisiones ilimitadas durante 7 días.',
    },
    {
      question:
        currentLocale === 'en-US'
          ? 'How long does a typical project take?'
          : currentLocale === 'pt-BR'
            ? 'Quanto tempo leva um projeto típico?'
            : '¿Cuánto tiempo toma un proyecto típico?',
      answer:
        currentLocale === 'en-US'
          ? 'Most projects are delivered in 48-72 hours. More complex projects may take up to 5 business days.'
          : currentLocale === 'pt-BR'
            ? 'A maioria dos projetos é entregue em 48-72 horas. Projetos mais complexos podem levar até 5 dias úteis.'
            : 'La mayoría de proyectos se entregan en 48-72 horas. Proyectos más complejos pueden tomar hasta 5 días hábiles.',
    },
    {
      question:
        currentLocale === 'en-US'
          ? 'What file formats do you deliver?'
          : currentLocale === 'pt-BR'
            ? 'Em quais formatos vocês entregam os arquivos?'
            : '¿En qué formatos entregan los archivos?',
      answer:
        currentLocale === 'en-US'
          ? 'We deliver in all standard formats: JPG, PNG, MP4, GIF for visuals, and source files in Blender, Cinema 4D or your preferred software.'
          : currentLocale === 'pt-BR'
            ? 'Entregamos em todos os formatos padrão: JPG, PNG, MP4, GIF para visuais, e arquivos fonte em Blender, Cinema 4D ou o software de sua preferência.'
            : 'Entregamos en todos los formatos estándar: JPG, PNG, MP4, GIF para visuales, y archivos fuente en Blender, Cinema 4D o el software de tu preferencia.',
    },
    {
      question:
        currentLocale === 'en-US'
          ? 'Can I request changes after delivery?'
          : currentLocale === 'pt-BR'
            ? 'Posso solicitar mudanças após a entrega?'
            : '¿Puedo solicitar cambios después de la entrega?',
      answer:
        currentLocale === 'en-US'
          ? 'Yes, we include unlimited revisions for 7 days after the initial delivery. After that period, changes are quoted separately.'
          : currentLocale === 'pt-BR'
            ? 'Sim, incluímos revisões ilimitadas por 7 dias após a entrega inicial. Após esse período, as alterações são cotadas separadamente.'
            : 'Sí, incluimos revisiones ilimitadas durante 7 días después de la entrega inicial. Después de ese período, los cambios se cotizan por separado.',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-leaf/10 to-sun/10 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-leaf rounded-full filter blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sun rounded-full filter blur-3xl animate-float animation-delay-400" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl">
            <div className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-leaf/20 text-leaf">
                {t('level1.hero.badge')}
              </span>
            </div>
            <Heading level={1} className="mb-6">
              {t('level1.hero.title')}
            </Heading>
            <p className="text-xl text-obsidian/70 mb-8 max-w-3xl">{serviceDescription}</p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Button variant="primary" size="lg" className="bg-leaf hover:bg-leaf/90">
                {t('level1.hero.getQuote')}
              </Button>
              <Button variant="outline" size="lg">
                {t('level1.hero.viewPortfolio')}
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-3xl font-heading font-bold text-leaf mb-1">48hrs</p>
                <p className="text-sm text-obsidian/60">{t('level1.hero.turnaround')}</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-leaf mb-1">$5,000</p>
                <p className="text-sm text-obsidian/60">{t('comparison.priceFrom')} MXN</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-leaf mb-1">500+</p>
                <p className="text-sm text-obsidian/60">
                  {currentLocale === 'en-US'
                    ? 'Projects completed'
                    : currentLocale === 'pt-BR'
                      ? 'Projetos concluídos'
                      : 'Proyectos completados'}
                </p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-leaf mb-1">4.9/5</p>
                <p className="text-sm text-obsidian/60">{t('level1.hero.satisfaction')}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {t('level1.services.title')}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {t('level1.services.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-leaf/10 hover:to-sun/10 transition-all">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-heading text-xl font-semibold mb-3">
                {t('level1.services.items.rendering.title')}
              </h3>
              <ul className="space-y-2 text-obsidian/70">
                <li>
                  •{' '}
                  {currentLocale === 'en-US'
                    ? 'Photorealistic products'
                    : currentLocale === 'pt-BR'
                      ? 'Produtos fotorrealistas'
                      : 'Productos fotorrealistas'}
                </li>
                <li>
                  •{' '}
                  {currentLocale === 'en-US'
                    ? 'Environments and scenes'
                    : currentLocale === 'pt-BR'
                      ? 'Ambientes e cenas'
                      : 'Ambientes y escenas'}
                </li>
                <li>
                  •{' '}
                  {currentLocale === 'en-US'
                    ? 'Materials and textures'
                    : currentLocale === 'pt-BR'
                      ? 'Materiais e texturas'
                      : 'Materiales y texturas'}
                </li>
                <li>
                  •{' '}
                  {currentLocale === 'en-US'
                    ? 'Professional lighting'
                    : currentLocale === 'pt-BR'
                      ? 'Iluminação profissional'
                      : 'Iluminación profesional'}
                </li>
              </ul>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-leaf/10 hover:to-sun/10 transition-all">
              <div className="text-4xl mb-4">✏️</div>
              <h3 className="font-heading text-xl font-semibold mb-3">
                {t('level1.services.items.graphic.title')}
              </h3>
              <ul className="space-y-2 text-obsidian/70">
                <li>
                  •{' '}
                  {currentLocale === 'en-US'
                    ? 'Visual identity'
                    : currentLocale === 'pt-BR'
                      ? 'Identidade visual'
                      : 'Identidad visual'}
                </li>
                <li>
                  •{' '}
                  {currentLocale === 'en-US'
                    ? 'Promotional material'
                    : currentLocale === 'pt-BR'
                      ? 'Material promocional'
                      : 'Material promocional'}
                </li>
                <li>
                  •{' '}
                  {currentLocale === 'en-US'
                    ? 'Presentations'
                    : currentLocale === 'pt-BR'
                      ? 'Apresentações'
                      : 'Presentaciones'}
                </li>
                <li>• Social media kits</li>
              </ul>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-leaf/10 hover:to-sun/10 transition-all">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="font-heading text-xl font-semibold mb-3">
                {t('level1.services.items.animation.title')}
              </h3>
              <ul className="space-y-2 text-obsidian/70">
                <li>
                  •{' '}
                  {currentLocale === 'en-US'
                    ? 'Video intros'
                    : currentLocale === 'pt-BR'
                      ? 'Intros de vídeo'
                      : 'Intros de video'}
                </li>
                <li>
                  •{' '}
                  {currentLocale === 'en-US'
                    ? 'Animated GIFs'
                    : currentLocale === 'pt-BR'
                      ? 'GIFs animados'
                      : 'GIFs animados'}
                </li>
                <li>
                  •{' '}
                  {currentLocale === 'en-US'
                    ? 'Product demos'
                    : currentLocale === 'pt-BR'
                      ? 'Demos de produto'
                      : 'Demos de producto'}
                </li>
                <li>• Motion graphics</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="section bg-pearl">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {t('level1.process.title')}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {t('level1.process.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((item, index) => (
              <div key={index} className="flex gap-8 mb-8 last:mb-0">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-leaf to-sun flex items-center justify-center text-white font-bold">
                    {item.step}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-heading text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-obsidian/70 mb-1">{item.description}</p>
                  <p className="text-sm text-leaf font-medium">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Recent Projects */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {currentLocale === 'en-US'
                ? 'Recent Projects'
                : currentLocale === 'pt-BR'
                  ? 'Projetos Recentes'
                  : 'Proyectos recientes'}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {currentLocale === 'en-US'
                ? 'Real results for real clients'
                : currentLocale === 'pt-BR'
                  ? 'Resultados reais para clientes reais'
                  : 'Resultados reales para clientes reales'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-square"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-leaf/80 to-sun/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex flex-col justify-end h-full p-8 text-white">
                    <h3 className="font-heading text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-white/90 mb-4">{project.description}</p>
                    <div className="flex justify-between text-sm">
                      <span>⏱️ {project.time}</span>
                      <span>📈 {project.result}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="section bg-gradient-to-br from-obsidian/5 to-leaf/5">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Heading level={2} className="text-center mb-12">
              {currentLocale === 'en-US'
                ? 'Frequently Asked Questions'
                : currentLocale === 'pt-BR'
                  ? 'Perguntas Frequentes'
                  : 'Preguntas frecuentes'}
            </Heading>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                  <h3 className="font-heading text-lg font-semibold mb-3">{faq.question}</h3>
                  <p className="text-obsidian/70">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Other Services */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              {currentLocale === 'en-US'
                ? 'Need something more advanced?'
                : currentLocale === 'pt-BR'
                  ? 'Precisa de algo mais avançado?'
                  : '¿Necesitas algo más avanzado?'}
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              {currentLocale === 'en-US'
                ? 'Explore our other service levels'
                : currentLocale === 'pt-BR'
                  ? 'Explore nossos outros níveis de serviço'
                  : 'Explora nuestros otros niveles de servicio'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {otherServices.map(otherService => (
              <ServiceCard key={otherService.id} service={otherService} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-leaf to-sun text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Heading level={2} className="text-white mb-6">
              {currentLocale === 'en-US'
                ? 'Ready to start your project?'
                : currentLocale === 'pt-BR'
                  ? 'Pronto para começar seu projeto?'
                  : '¿Listo para empezar tu proyecto?'}
            </Heading>
            <p className="text-xl text-white/90 mb-8">
              {currentLocale === 'en-US'
                ? 'Get your quote in less than 1 hour and start creating today'
                : currentLocale === 'pt-BR'
                  ? 'Receba seu orçamento em menos de 1 hora e comece a criar hoje'
                  : 'Obtén tu cotización en menos de 1 hora y comienza a crear hoy mismo'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="secondary" size="lg">
                {currentLocale === 'en-US'
                  ? 'Instant Quote'
                  : currentLocale === 'pt-BR'
                    ? 'Orçamento Instantâneo'
                    : 'Cotización instantánea'}
              </Button>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-leaf"
                >
                  {currentLocale === 'en-US'
                    ? 'Talk to an expert'
                    : currentLocale === 'pt-BR'
                      ? 'Falar com um especialista'
                      : 'Hablar con un experto'}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
