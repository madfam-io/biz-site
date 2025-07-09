import { Container, Heading, Button } from '@madfam/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-lavender rounded-full filter blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sun rounded-full filter blur-3xl animate-float animation-delay-400" />
        </div>

        <Container className="relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            {/* 404 Graphic */}
            <div className="mb-8">
              <div className="text-[150px] font-heading font-bold leading-none">
                <span className="gradient-text">404</span>
              </div>
              <div className="text-6xl mb-4">🤔</div>
            </div>

            <Heading level={1} className="mb-4">
              Ups, esta página no existe
            </Heading>
            
            <p className="text-xl text-obsidian/70 mb-8">
              Parece que te has perdido en el espacio digital. No te preocupes, 
              hasta los mejores exploradores necesitan un mapa a veces.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link href="/">
                <Button variant="creative" size="lg">
                  Volver al inicio
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg">
                  Explorar servicios
                </Button>
              </Link>
            </div>

            {/* Helpful links */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-obsidian/60 mb-4">Enlaces útiles:</p>
              <div className="flex flex-wrap gap-6 justify-center text-sm">
                <Link href="/products" className="text-lavender hover:text-lavender/80 transition-colors">
                  Productos
                </Link>
                <Link href="/about" className="text-lavender hover:text-lavender/80 transition-colors">
                  Nosotros
                </Link>
                <Link href="/contact" className="text-lavender hover:text-lavender/80 transition-colors">
                  Contacto
                </Link>
                <Link href="/assessment" className="text-lavender hover:text-lavender/80 transition-colors">
                  Evaluación IA
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}