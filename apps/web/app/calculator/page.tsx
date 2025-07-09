import { Metadata } from 'next';
import { Container, Heading } from '@madfam/ui';
import { ROICalculator } from '@/components/ROICalculator';
import { ServiceTier } from '@madfam/core';

export const metadata: Metadata = {
  title: 'Calculadora de ROI - MADFAM',
  description: 'Descubre el retorno de inversión potencial de nuestros servicios de transformación digital y consultoría AI.',
};

export default function CalculatorPage() {
  return (
    <main className="py-section">
      <Container>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Heading level={1} gradient>
              Calculadora de ROI
            </Heading>
            <p className="text-lg mt-4 text-gray-600 dark:text-gray-400">
              Visualiza el impacto que MADFAM puede tener en tu negocio
            </p>
          </div>

          <div className="mb-8">
            <p className="text-center text-gray-600 dark:text-gray-400">
              Selecciona un nivel de servicio para calcular el ROI específico, 
              o usa los valores predeterminados para una estimación general.
            </p>
          </div>

          <div className="space-y-8">
            <ROICalculator serviceTier={ServiceTier.L3_CONSULTING} />
            
            <div className="bg-gradient-to-r from-sun/10 to-leaf/10 rounded-2xl p-8 text-center">
              <h3 className="font-heading text-xl mb-4">
                ¿Listo para transformar tu negocio?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Nuestro equipo de expertos puede ayudarte a implementar soluciones 
                que generen resultados reales y medibles.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-obsidian hover:bg-obsidian/90 transition-colors"
                >
                  Solicitar consulta
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-lg text-obsidian dark:text-pearl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Ver servicios
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}