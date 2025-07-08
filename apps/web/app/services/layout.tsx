import { Container } from '@madfam/ui';

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Services Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <Container>
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <a href="/" className="font-heading text-xl font-bold text-obsidian">
                MADFAM
              </a>
              <div className="hidden md:flex items-center space-x-6">
                <a href="/services" className="text-sm font-medium text-obsidian/70 hover:text-obsidian">
                  Todos los servicios
                </a>
                <a href="/products" className="text-sm font-medium text-obsidian/70 hover:text-obsidian">
                  Productos
                </a>
                <a href="/about" className="text-sm font-medium text-obsidian/70 hover:text-obsidian">
                  Nosotros
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/contact"
                className="text-sm font-medium text-obsidian/70 hover:text-obsidian"
              >
                Contacto
              </a>
              <button className="px-4 py-2 bg-lavender text-white rounded-lg hover:bg-lavender/90 transition-colors">
                Consulta gratuita
              </button>
            </div>
          </div>
        </Container>
      </nav>
      {children}
    </>
  );
}