import { Container, Heading, Button, Card, CardContent } from '@madfam/ui';
import { serviceTiers, ServiceTier } from '@madfam/core';
import { ROICalculator } from '@/components/ROICalculator';
import { ServiceStructuredData } from '@/components/StructuredData';
import { seoService } from '@/lib/seo';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return seoService.generateServiceMetadata(
    'Consultoría en Transformación Digital',
    'Roadmap personalizado, capacitación de equipos y métricas de impacto para tu transformación digital',
    'L3 - Consulting',
    'es-MX'
  );
}

export default function Level3ConsultingPage() {
  const service = serviceTiers[ServiceTier.L3_CONSULTING];

  const benefits = [
    {
      icon: '🎯',
      title: 'Estrategia personalizada',
      description: 'Roadmap de transformación digital adaptado a tu industria y objetivos específicos.',
    },
    {
      icon: '👥',
      title: 'Capacitación integral',
      description: 'Workshops prácticos para que tu equipo domine las herramientas de IA.',
    },
    {
      icon: '📊',
      title: 'Métricas de impacto',
      description: 'KPIs claros para medir el ROI de tu transformación digital.',
    },
    {
      icon: '🔄',
      title: 'Mejora continua',
      description: 'Sesiones de seguimiento mensuales para optimizar resultados.',
    },
  ];

  const process = [
    {
      step: 1,
      title: 'Diagnóstico inicial',
      description: 'Análisis profundo de tus procesos actuales y oportunidades de mejora.',
      duration: '1 semana',
    },
    {
      step: 2,
      title: 'Diseño de estrategia',
      description: 'Creación de un plan de transformación con objetivos claros y alcanzables.',
      duration: '2 semanas',
    },
    {
      step: 3,
      title: 'Implementación guiada',
      description: 'Workshops y capacitación práctica para tu equipo.',
      duration: '4-8 semanas',
    },
    {
      step: 4,
      title: 'Optimización continua',
      description: 'Seguimiento mensual y ajustes basados en resultados.',
      duration: 'Ongoing',
    },
  ];

  const testimonials = [
    {
      quote: 'MADFAM transformó completamente nuestra forma de trabajar. Los workshops fueron increíblemente prácticos.',
      author: 'María González',
      role: 'CTO, TechCorp México',
    },
    {
      quote: 'El ROI fue evidente desde el primer mes. Automatizamos procesos que tomaban días en minutos.',
      author: 'Carlos Ramírez',
      role: 'Director de Innovación, Grupo Industrial',
    },
  ];

  return (
    <>
      <ServiceStructuredData
        name="Consultoría en Transformación Digital"
        description="Roadmap personalizado, capacitación de equipos y métricas de impacto para tu transformación digital"
        serviceType="Consulting"
      />
      <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-lavender/10 to-sun/10">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-lavender/20 text-lavender">
                  Nivel 3 - Consulting
                </span>
              </div>
              <Heading level={1} className="mb-6">
                Transforma tu empresa con{' '}
                <span className="gradient-text">consultoría experta en IA</span>
              </Heading>
              <p className="text-xl text-obsidian/70 mb-8">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <Button variant="creative" size="lg">
                  Agendar consulta inicial
                </Button>
                <Button variant="outline" size="lg">
                  Descargar caso de estudio
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-obsidian/60">
                <div>
                  <span className="font-semibold text-obsidian">3-6 meses</span> duración típica
                </div>
                <div>
                  <span className="font-semibold text-obsidian">87%</span> satisfacción cliente
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-lavender/20 to-sun/20 flex items-center justify-center">
                <span className="text-[200px] opacity-20">💡</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              ¿Qué obtienes con nuestro servicio de consultoría?
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Más que asesoría: un socio estratégico para tu transformación digital
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} variant="default">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{benefit.icon}</div>
                    <div>
                      <h3 className="font-heading text-xl mb-2">{benefit.title}</h3>
                      <p className="text-obsidian/70">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="section bg-pearl">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">
              Nuestro proceso probado
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Un enfoque estructurado para garantizar resultados medibles
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {process.map((phase, index) => (
              <div key={phase.step} className="relative">
                {/* Connection line */}
                {index < process.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-24 bg-lavender/30" />
                )}
                
                <div className="flex gap-6 mb-12">
                  <div className="flex-shrink-0 w-16 h-16 bg-lavender text-white rounded-full flex items-center justify-center font-heading text-xl font-bold">
                    {phase.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl mb-2">{phase.title}</h3>
                    <p className="text-obsidian/70 mb-2">{phase.description}</p>
                    <span className="text-sm font-mono text-lavender">{phase.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Included Services */}
      <section className="section">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Heading level={2} className="mb-6">
                Todo lo que incluye tu consultoría
              </Heading>
              <ul className="space-y-4">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-2xl text-leaf">✓</span>
                    <span className="text-lg text-obsidian/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-obsidian to-obsidian/90 text-white rounded-2xl p-8">
              <h3 className="font-heading text-2xl mb-4">Inversión</h3>
              <div className="mb-6">
                <p className="text-sm opacity-80">Desde</p>
                <p className="text-4xl font-heading font-bold">
                  ${service.startingPrice.toLocaleString()} {service.currency}
                </p>
                <p className="text-sm opacity-80 mt-2">Proyecto de 3-6 meses</p>
              </div>
              <div className="space-y-2 mb-6">
                <p className="text-sm opacity-80">✓ Plan de pagos disponible</p>
                <p className="text-sm opacity-80">✓ ROI garantizado en 6 meses</p>
                <p className="text-sm opacity-80">✓ Soporte post-implementación</p>
              </div>
              <Button variant="secondary" size="lg" className="w-full">
                Solicitar propuesta
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="section bg-pearl">
        <Container>
          <Heading level={2} className="text-center mb-12">
            Lo que dicen nuestros clientes
          </Heading>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} variant="elevated">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <svg className="w-10 h-10 text-lavender/20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-lg text-obsidian/80 mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-obsidian/60">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ROI Calculator */}
      <section className="section">
        <Container>
          <div className="max-w-5xl mx-auto">
            <Heading level={2} className="text-center mb-4">
              Calcula tu retorno de inversión
            </Heading>
            <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
              Usa nuestra calculadora interactiva para estimar el impacto que nuestros servicios de consultoría 
              pueden tener en tu negocio.
            </p>
            <ROICalculator serviceTier={ServiceTier.L3_CONSULTING} />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section">
        <Container>
          <div className="bg-gradient-to-r from-lavender to-sun rounded-3xl p-12 text-center text-white">
            <Heading level={2} className="text-white mb-4">
              ¿Listo para transformar tu empresa?
            </Heading>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Agenda una consulta gratuita de 30 minutos para explorar cómo podemos ayudarte
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Agendar consulta ahora
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-lavender"
              >
                Descargar brochure
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
    </>
  );
}