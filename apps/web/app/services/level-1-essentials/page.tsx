import { Container, Heading, Button } from '@madfam/ui';
import { serviceTiers, ServiceTier } from '@madfam/core';
import Link from 'next/link';
import { ServiceCard } from '@/components/ServiceCard';

export default function Level1EssentialsPage() {
  const service = serviceTiers[ServiceTier.L1_ESSENTIALS];
  const otherServices = [
    serviceTiers[ServiceTier.L2_ADVANCED],
    serviceTiers[ServiceTier.L3_CONSULTING],
  ];

  const projects = [
    {
      title: 'Render de Producto',
      description: 'Visualización 3D fotorrealista para e-commerce',
      time: '48 horas',
      result: '+45% conversión',
    },
    {
      title: 'Animación de Logo',
      description: 'Intro animada para videos corporativos',
      time: '72 horas',
      result: 'Brand awareness x3',
    },
    {
      title: 'Diseño de Packaging',
      description: 'Propuesta 3D para línea de productos',
      time: '5 días',
      result: '25% más ventas',
    },
  ];

  const process = [
    {
      step: 1,
      title: 'Brief Express',
      description: 'Completa nuestro formulario rápido en 5 minutos',
      time: '5 min',
    },
    {
      step: 2,
      title: 'Propuesta Instantánea',
      description: 'Recibe cotización y timeline en menos de 1 hora',
      time: '< 1 hora',
    },
    {
      step: 3,
      title: 'Producción Ágil',
      description: 'Nuestro equipo trabaja en tu proyecto inmediatamente',
      time: '24-72 hrs',
    },
    {
      step: 4,
      title: 'Entrega y Revisiones',
      description: 'Recibe archivos finales con revisiones ilimitadas por 7 días',
      time: '7 días',
    },
  ];

  const faqs = [
    {
      question: '¿Qué incluye el servicio Essentials?',
      answer: 'Incluye diseño 3D completo, renderizado profesional, diseño gráfico para digital/impreso, animaciones básicas y revisiones ilimitadas durante 7 días.',
    },
    {
      question: '¿Cuánto tiempo toma un proyecto típico?',
      answer: 'La mayoría de proyectos se entregan en 48-72 horas. Proyectos más complejos pueden tomar hasta 5 días hábiles.',
    },
    {
      question: '¿En qué formatos entregan los archivos?',
      answer: 'Entregamos en todos los formatos estándar: JPG, PNG, MP4, GIF para visuales, y archivos fuente en Blender, Cinema 4D o el software de tu preferencia.',
    },
    {
      question: '¿Puedo solicitar cambios después de la entrega?',
      answer: 'Sí, incluimos revisiones ilimitadas durante 7 días después de la entrega inicial. Después de ese período, los cambios se cotizan por separado.',
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
                Nivel 1 • Essentials
              </span>
            </div>
            <Heading level={1} className="mb-6">
              Diseño 3D y gráficos <span className="text-leaf">express</span>
            </Heading>
            <p className="text-xl text-obsidian/70 mb-8 max-w-3xl">
              {service.description}. Perfecto para startups y equipos que necesitan resultados 
              profesionales sin la complejidad de una agencia tradicional.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Button variant="primary" size="lg" className="bg-leaf hover:bg-leaf/90">
                Obtener cotización instantánea
              </Button>
              <Button variant="outline" size="lg">
                Ver portafolio
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-3xl font-heading font-bold text-leaf mb-1">48hrs</p>
                <p className="text-sm text-obsidian/60">Entrega promedio</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-leaf mb-1">$5,000</p>
                <p className="text-sm text-obsidian/60">Desde MXN</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-leaf mb-1">500+</p>
                <p className="text-sm text-obsidian/60">Proyectos completados</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-leaf mb-1">4.9/5</p>
                <p className="text-sm text-obsidian/60">Satisfacción</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="mb-4">¿Qué puedes crear con Essentials?</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Desde visualizaciones de producto hasta material de marketing, todo con la velocidad que tu negocio necesita
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-leaf/10 hover:to-sun/10 transition-all">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-heading text-xl font-semibold mb-3">Renderizado 3D</h3>
              <ul className="space-y-2 text-obsidian/70">
                <li>• Productos fotorrealistas</li>
                <li>• Ambientes y escenas</li>
                <li>• Materiales y texturas</li>
                <li>• Iluminación profesional</li>
              </ul>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-leaf/10 hover:to-sun/10 transition-all">
              <div className="text-4xl mb-4">✏️</div>
              <h3 className="font-heading text-xl font-semibold mb-3">Diseño Gráfico</h3>
              <ul className="space-y-2 text-obsidian/70">
                <li>• Identidad visual</li>
                <li>• Material promocional</li>
                <li>• Presentaciones</li>
                <li>• Social media kits</li>
              </ul>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-leaf/10 hover:to-sun/10 transition-all">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="font-heading text-xl font-semibold mb-3">Animación Básica</h3>
              <ul className="space-y-2 text-obsidian/70">
                <li>• Intros de video</li>
                <li>• GIFs animados</li>
                <li>• Demos de producto</li>
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
            <Heading level={2} className="mb-4">Proceso simple, resultados rápidos</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              De la idea a la entrega en tiempo récord
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
            <Heading level={2} className="mb-4">Proyectos recientes</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Resultados reales para clientes reales
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-square">
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
            <Heading level={2} className="text-center mb-12">Preguntas frecuentes</Heading>
            
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
            <Heading level={2} className="mb-4">¿Necesitas algo más avanzado?</Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Explora nuestros otros niveles de servicio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {otherServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-leaf to-sun text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Heading level={2} className="text-white mb-6">
              ¿Listo para empezar tu proyecto?
            </Heading>
            <p className="text-xl text-white/90 mb-8">
              Obtén tu cotización en menos de 1 hora y comienza a crear hoy mismo
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Cotización instantánea
              </Button>
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white hover:text-leaf"
                >
                  Hablar con un experto
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}