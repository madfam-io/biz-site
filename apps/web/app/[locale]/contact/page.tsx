import { Container, Heading, Card, CardContent } from '@madfam/ui';
import { unstable_setRequestLocale } from 'next-intl/server';
import { LeadForm } from '@/components/LeadForm';

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-obsidian/5 to-lavender/10">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <Heading level={1} className="mb-6">
              Hablemos sobre tu <span className="gradient-text">próximo proyecto</span>
            </Heading>
            <p className="text-xl text-obsidian/70">
              Estamos listos para ayudarte a transformar tu empresa con IA. Cuéntanos tus
              necesidades y encontraremos la solución perfecta.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="section">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div>
              <Card variant="elevated">
                <CardContent className="p-8">
                  <h2 className="font-heading text-2xl mb-6">Solicita información</h2>
                  <LeadForm source="contact-page" />
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-xl mb-4">Otras formas de contactarnos</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-lavender/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">📧</span>
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:hello@madfam.io" className="text-lavender hover:underline">
                        hello@madfam.io
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-leaf/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">📱</span>
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <a href="https://wa.me/525512345678" className="text-leaf hover:underline">
                        +52 55 1234 5678
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sun/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">📍</span>
                    </div>
                    <div>
                      <p className="font-medium">Ubicación</p>
                      <p className="text-obsidian/70">Ciudad de México, México</p>
                      <p className="text-sm text-obsidian/60">Servicio remoto global</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-xl mb-4">Horario de atención</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-obsidian/70">Lunes - Viernes</span>
                    <span className="font-medium">9:00 - 18:00 CST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-obsidian/70">Sábado</span>
                    <span className="font-medium">10:00 - 14:00 CST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-obsidian/70">Domingo</span>
                    <span className="font-medium">Cerrado</span>
                  </div>
                </div>
                <p className="text-sm text-obsidian/60 mt-4">
                  Respondemos en menos de 24 horas hábiles
                </p>
              </div>

              <div className="bg-gradient-to-br from-lavender/10 to-sun/10 rounded-xl p-6">
                <h3 className="font-heading text-lg mb-2">¿Necesitas ayuda inmediata?</h3>
                <p className="text-sm text-obsidian/70 mb-4">
                  Agenda una videollamada de 15 minutos para resolver tus dudas
                </p>
                <a
                  href="https://calendly.com/madfam/quick-call"
                  className="inline-flex items-center text-lavender font-medium hover:underline"
                >
                  Agendar llamada rápida →
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
