import { Metadata } from 'next';
import { Container, Heading } from '@madfam/ui';
import { ProjectEstimator } from '@/components/ProjectEstimator';
import { unstable_setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Estimador de Proyectos - MADFAM',
  description: 'Obtén una estimación instantánea para tu proyecto de transformación digital. Precio, tiempo y equipo recomendado.',
};

export default function EstimatorPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return (
    <main className="py-section">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Heading level={1} gradient>
              Estimador de Proyectos
            </Heading>
            <p className="text-lg mt-4 text-gray-600 dark:text-gray-400">
              Obtén una cotización instantánea para tu proyecto
            </p>
          </div>

          <ProjectEstimator />

          <div className="mt-12 bg-gradient-to-r from-obsidian/5 to-lavender/5 dark:from-obsidian/20 dark:to-lavender/20 rounded-2xl p-8">
            <h3 className="font-heading text-xl mb-4">
              ¿Por qué confiar en nuestras estimaciones?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-2 text-sun">Experiencia comprobada</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Más de 100 proyectos exitosos nos respaldan
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-leaf">Transparencia total</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Sin costos ocultos ni sorpresas en el camino
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-lavender">Metodología ágil</h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Entregas incrementales y ajustes sobre la marcha
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Estas estimaciones son aproximadas y pueden variar según los requisitos específicos del proyecto.
              Contáctanos para obtener una propuesta detallada y personalizada.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}