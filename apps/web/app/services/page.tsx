import { Container, Heading, Button } from '@madfam/ui';
import { serviceTiers, ServiceTier } from '@madfam/core';

export default function ServicesPage() {
  const allServices = Object.values(serviceTiers);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-obsidian/5 to-lavender/10">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading level={1} className="mb-6">
              Servicios diseñados para{' '}
              <span className="gradient-text">cada etapa de tu crecimiento</span>
            </Heading>
            <p className="text-xl text-obsidian/70 mb-8">
              Desde soluciones rápidas hasta transformación estratégica completa. 
              Encuentra el nivel perfecto para impulsar tu negocio con IA.
            </p>
          </div>
        </Container>
      </section>

      {/* Service Tiers Grid */}
      <section className="section">
        <Container>
          <div className="grid gap-8 max-w-6xl mx-auto">
            {allServices.map((service, index) => (
              <div
                key={service.id}
                className={`grid md:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Service Info */}
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-obsidian/5 text-obsidian">
                      Nivel {service.level}
                    </span>
                  </div>
                  <Heading level={2} className="mb-4">
                    {service.name}
                  </Heading>
                  <p className="text-lg text-obsidian/70 mb-6">
                    {service.description}
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <h3 className="font-heading text-lg font-semibold">Incluye:</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-leaf mr-3 mt-0.5">✓</span>
                          <span className="text-obsidian/70">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-baseline gap-4 mb-8">
                    <div>
                      <p className="text-sm text-obsidian/60">Desde</p>
                      <p className="text-3xl font-heading font-bold text-obsidian">
                        ${service.startingPrice.toLocaleString()} {service.currency}
                      </p>
                    </div>
                    {service.duration && (
                      <div className="text-sm text-obsidian/60">
                        • {service.duration}
                      </div>
                    )}
                  </div>

                  <Button
                    variant={service.id === ServiceTier.L3_CONSULTING ? 'creative' : 'primary'}
                    size="lg"
                  >
                    {service.cta.text}
                  </Button>
                </div>

                {/* Visual Element */}
                <div className={`relative ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    {/* Placeholder for service illustration */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl opacity-20">{service.icon}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Comparison Table */}
      <section className="section bg-pearl">
        <Container>
          <div className="max-w-5xl mx-auto">
            <Heading level={2} className="text-center mb-12">
              Compara nuestros servicios
            </Heading>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4">Características</th>
                    {allServices.map((service) => (
                      <th key={service.id} className="text-center py-4 px-4">
                        <div className="font-heading font-semibold">{service.name}</div>
                        <div className="text-sm text-gray-500 font-normal">Nivel {service.level}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">Precio desde</td>
                    {allServices.map((service) => (
                      <td key={service.id} className="text-center py-4 px-4">
                        ${service.startingPrice.toLocaleString()} {service.currency}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">Duración</td>
                    {allServices.map((service) => (
                      <td key={service.id} className="text-center py-4 px-4">
                        {service.duration || 'Variable'}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">Ideal para</td>
                    {allServices.map((service) => (
                      <td key={service.id} className="text-center py-4 px-4 text-sm">
                        {service.idealFor[0]}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section">
        <Container>
          <div className="bg-gradient-to-br from-obsidian to-obsidian/90 rounded-3xl p-12 text-center text-white">
            <Heading level={2} className="text-white mb-4">
              ¿No estás seguro qué nivel necesitas?
            </Heading>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Nuestro equipo te ayudará a identificar la solución perfecta para tu empresa
            </p>
            <Button variant="secondary" size="lg">
              Agendar evaluación gratuita
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}