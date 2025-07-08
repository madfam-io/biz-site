import { Button, Container, Heading } from '@madfam/ui';
import { serviceTiers, ServiceTier } from '@madfam/core';
import { ServiceCard } from '@/components/ServiceCard';

export default function HomePage() {
  const featuredServices = [
    serviceTiers[ServiceTier.L1_ESSENTIALS],
    serviceTiers[ServiceTier.L3_CONSULTING],
    serviceTiers[ServiceTier.L5_STRATEGIC],
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-obsidian via-obsidian/95 to-lavender/10 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sun rounded-full filter blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-lavender rounded-full filter blur-3xl animate-float animation-delay-400" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl">
            <Heading level={1} className="text-white mb-6 animate-fade-up">
              Donde la IA encuentra{' '}
              <span className="gradient-text">la creatividad humana</span>
            </Heading>
            <p className="text-xl text-white/90 mb-8 animate-fade-up animation-delay-200 max-w-3xl">
              MADFAM transforma empresas con soluciones impulsadas por IA. Desde diseño 3D hasta
              asociaciones estratégicas vCTO, entregamos innovación en cada nivel.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up animation-delay-400">
              <Button variant="secondary" size="lg">
                Explorar servicios
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-obsidian"
              >
                Ver productos
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Services Overview */}
      <section className="section bg-pearl">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="text-obsidian mb-4">
              Servicios de 5 niveles
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Desde soluciones rápidas hasta transformación estratégica, tenemos el nivel perfecto
              para tus necesidades.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                featured={service.id === ServiceTier.L3_CONSULTING}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="ghost" size="lg">
              Ver todos los servicios →
            </Button>
          </div>
        </Container>
      </section>

      {/* Products Section */}
      <section className="section">
        <Container>
          <div className="text-center mb-12">
            <Heading level={2} className="text-obsidian mb-4">
              Nuestros productos
            </Heading>
            <p className="text-lg text-obsidian/70 max-w-3xl mx-auto">
              Plataformas revolucionarias que automatizan y optimizan tu negocio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* SPARK Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-lavender to-sun p-1">
              <div className="relative bg-white rounded-[14px] p-8 h-full">
                <div className="mb-6">
                  <span className="text-4xl">⚡</span>
                </div>
                <h3 className="font-heading text-2xl mb-3">SPARK</h3>
                <p className="text-gray-600 mb-6">
                  Plataforma de orquestación de IA que conecta, automatiza y optimiza todos tus
                  procesos empresariales en un solo lugar.
                </p>
                <Button variant="creative">Conocer más</Button>
              </div>
            </div>

            {/* PENNY Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-leaf to-sun p-1">
              <div className="relative bg-white rounded-[14px] p-8 h-full">
                <div className="mb-6">
                  <span className="text-4xl">🤖</span>
                </div>
                <h3 className="font-heading text-2xl mb-3">PENNY</h3>
                <p className="text-gray-600 mb-6">
                  Automatización inteligente de procesos que aprende, adapta y mejora
                  continuamente tu flujo de trabajo.
                </p>
                <Button variant="primary">Solicitar demo</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-obsidian to-obsidian/90 text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <Heading level={2} className="text-white mb-6">
              ¿Listo para transformar tu negocio?
            </Heading>
            <p className="text-xl text-white/80 mb-8">
              Descubre cómo MADFAM puede llevar tu empresa al siguiente nivel con IA y creatividad.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Agendar consulta gratuita
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-obsidian"
              >
                Descargar portafolio
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}