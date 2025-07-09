import { Container, Heading, Button, Card, CardContent } from '@madfam/ui';
import { unstable_setRequestLocale } from 'next-intl/server';

interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  benefits: { icon: string; title: string; description: string }[];
  gradient: string;
  icon: string;
}

const products: Product[] = [
  {
    id: 'spark',
    name: 'SPARK',
    tagline: 'Plataforma de Orquestación de IA',
    description:
      'SPARK conecta, automatiza y optimiza todos tus procesos empresariales con inteligencia artificial. Una plataforma unificada que transforma la forma en que trabajas.',
    features: [
      'Integración con más de 1000 herramientas',
      'Workflows visuales sin código',
      'IA conversacional integrada',
      'Analytics en tiempo real',
      'API robusta y webhooks',
      'Seguridad empresarial',
    ],
    benefits: [
      {
        icon: '⚡',
        title: 'Automatización instantánea',
        description: 'Reduce tareas manuales en un 80% desde el día uno.',
      },
      {
        icon: '🔗',
        title: 'Conectividad total',
        description: 'Integra todas tus herramientas en un solo lugar.',
      },
      {
        icon: '📊',
        title: 'Insights accionables',
        description: 'Toma decisiones basadas en datos en tiempo real.',
      },
    ],
    gradient: 'from-lavender to-sun',
    icon: '⚡',
  },
  {
    id: 'penny',
    name: 'PENNY',
    tagline: 'Automatización Inteligente de Procesos',
    description:
      'PENNY es tu asistente de IA que aprende, adapta y mejora continuamente tus flujos de trabajo. Diseñado para empresas que buscan eficiencia sin complejidad.',
    features: [
      'Aprendizaje automático continuo',
      'Automatización de documentos',
      'Procesamiento de lenguaje natural',
      'Gestión inteligente de tareas',
      'Reportes automáticos',
      'Interfaz conversacional',
    ],
    benefits: [
      {
        icon: '🤖',
        title: 'IA que aprende',
        description: 'Se adapta a tus procesos y mejora con el tiempo.',
      },
      {
        icon: '⏱️',
        title: 'Ahorro de tiempo',
        description: 'Automatiza tareas repetitivas en segundos.',
      },
      {
        icon: '💡',
        title: 'Sugerencias inteligentes',
        description: 'Identifica oportunidades de optimización.',
      },
    ],
    gradient: 'from-leaf to-sun',
    icon: '🤖',
  },
];

export default function ProductsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-obsidian/5 to-lavender/10">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading level={1} className="mb-6">
              Productos que{' '}
              <span className="gradient-text">revolucionan tu negocio</span>
            </Heading>
            <p className="text-xl text-obsidian/70">
              Plataformas de IA diseñadas para transformar la forma en que trabajas.
              Potentes, intuitivas y listas para escalar contigo.
            </p>
          </div>
        </Container>
      </section>

      {/* Products Section */}
      <section className="section">
        <Container>
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`mb-24 ${index === products.length - 1 ? 'mb-0' : ''}`}
            >
              {/* Product Hero */}
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="mb-6">
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r ${product.gradient} text-white`}
                    >
                      {product.tagline}
                    </span>
                  </div>
                  <Heading level={2} className="mb-6 text-5xl">
                    {product.name}
                  </Heading>
                  <p className="text-xl text-obsidian/70 mb-8">{product.description}</p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="creative" size="lg">
                      Solicitar demo
                    </Button>
                    <Button variant="outline" size="lg">
                      Ver documentación
                    </Button>
                  </div>
                </div>
                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div
                    className={`aspect-square rounded-3xl bg-gradient-to-br ${product.gradient} p-1`}
                  >
                    <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center">
                      <span className="text-[180px] opacity-20">{product.icon}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features & Benefits */}
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Features List */}
                <div>
                  <h3 className="font-heading text-2xl mb-6">Características principales</h3>
                  <ul className="space-y-4">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-2xl text-leaf mt-1">✓</span>
                        <span className="text-lg text-obsidian/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits Cards */}
                <div className="space-y-4">
                  <h3 className="font-heading text-2xl mb-6">Beneficios clave</h3>
                  {product.benefits.map((benefit, idx) => (
                    <Card key={idx} variant="default">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <span className="text-3xl">{benefit.icon}</span>
                          <div>
                            <h4 className="font-heading text-lg mb-1">{benefit.title}</h4>
                            <p className="text-obsidian/70">{benefit.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* Comparison Section */}
      <section className="section bg-pearl">
        <Container>
          <div className="max-w-5xl mx-auto">
            <Heading level={2} className="text-center mb-12">
              ¿Cuál es mejor para ti?
            </Heading>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4">Característica</th>
                    <th className="text-center py-4 px-4">
                      <div className="font-heading text-xl">SPARK</div>
                    </th>
                    <th className="text-center py-4 px-4">
                      <div className="font-heading text-xl">PENNY</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">Ideal para</td>
                    <td className="text-center py-4 px-4">Empresas medianas/grandes</td>
                    <td className="text-center py-4 px-4">PyMEs y startups</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">Enfoque principal</td>
                    <td className="text-center py-4 px-4">Orquestación completa</td>
                    <td className="text-center py-4 px-4">Automatización simple</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">Tiempo de implementación</td>
                    <td className="text-center py-4 px-4">4-8 semanas</td>
                    <td className="text-center py-4 px-4">1-2 semanas</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">Integraciones</td>
                    <td className="text-center py-4 px-4">1000+ herramientas</td>
                    <td className="text-center py-4 px-4">100+ herramientas</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-medium">Precio desde</td>
                    <td className="text-center py-4 px-4">$50,000 MXN/mes</td>
                    <td className="text-center py-4 px-4">$15,000 MXN/mes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-8 text-center">
              <p className="text-obsidian/70 mb-4">
                ¿No estás seguro? Nuestro equipo te ayudará a elegir
              </p>
              <Button variant="creative" size="lg">
                Hablar con un experto
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section">
        <Container>
          <div className="bg-gradient-to-br from-obsidian to-obsidian/90 rounded-3xl p-12 text-center text-white">
            <Heading level={2} className="text-white mb-4">
              Experimenta el poder de la IA
            </Heading>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Solicita una demostración personalizada y descubre cómo SPARK o PENNY pueden
              transformar tu empresa
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Demo de SPARK
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-obsidian"
              >
                Demo de PENNY
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}