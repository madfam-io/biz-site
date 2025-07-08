import { Container, Heading } from '@madfam/ui';
import { AIAssessment } from '@/components/AIAssessment';

export default function AssessmentPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-lavender/10 to-sun/10">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading level={1} className="mb-6">
              Descubre tu nivel de{' '}
              <span className="gradient-text">madurez digital con IA</span>
            </Heading>
            <p className="text-xl text-obsidian/70">
              Responde 5 preguntas rápidas y obtén una recomendación personalizada
              para transformar tu empresa con inteligencia artificial.
            </p>
          </div>
        </Container>
      </section>

      {/* Assessment Section */}
      <section className="section">
        <Container>
          <AIAssessment />
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="section bg-pearl">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-leaf/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-heading text-lg mb-2">Resultados inmediatos</h3>
                <p className="text-sm text-gray-600">
                  Obtén tu puntuación y recomendación al instante
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-lavender/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-heading text-lg mb-2">100% personalizado</h3>
                <p className="text-sm text-gray-600">
                  Recomendaciones adaptadas a tu situación actual
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-sun/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="font-heading text-lg mb-2">Sin compromiso</h3>
                <p className="text-sm text-gray-600">
                  No requiere registro ni información personal
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}