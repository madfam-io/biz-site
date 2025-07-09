import { Container, Heading } from '@madfam/ui';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <section className="pt-20 pb-16 bg-gradient-to-br from-obsidian/5 to-lavender/5">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Heading level={1} className="mb-6">Política de Privacidad</Heading>
            <p className="text-lg text-obsidian/70">
              Última actualización: Enero 2024
            </p>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Introducción</h2>
            <p>
              En MADFAM ("nosotros", "nuestro" o "la empresa"), valoramos y respetamos tu privacidad. 
              Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos 
              tu información personal cuando utilizas nuestro sitio web y servicios.
            </p>

            <h2>2. Información que Recopilamos</h2>
            <h3>2.1 Información que nos proporcionas</h3>
            <ul>
              <li>Nombre completo y datos de contacto (email, teléfono)</li>
              <li>Información de tu empresa (nombre, industria, tamaño)</li>
              <li>Detalles sobre tus necesidades y proyectos</li>
              <li>Comunicaciones que tengas con nosotros</li>
            </ul>

            <h3>2.2 Información recopilada automáticamente</h3>
            <ul>
              <li>Dirección IP y ubicación aproximada</li>
              <li>Tipo de navegador y dispositivo</li>
              <li>Páginas visitadas y tiempo de permanencia</li>
              <li>Fuente de referencia (cómo llegaste a nuestro sitio)</li>
            </ul>

            <h2>3. Uso de la Información</h2>
            <p>Utilizamos tu información para:</p>
            <ul>
              <li>Proporcionar y mejorar nuestros servicios</li>
              <li>Comunicarnos contigo sobre proyectos y oportunidades</li>
              <li>Personalizar tu experiencia en nuestro sitio</li>
              <li>Enviarte información relevante sobre nuestros servicios (con tu consentimiento)</li>
              <li>Cumplir con obligaciones legales y contractuales</li>
              <li>Analizar y mejorar nuestros procesos de negocio</li>
            </ul>

            <h2>4. Compartir Información</h2>
            <p>
              No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto en 
              los siguientes casos:
            </p>
            <ul>
              <li>Con tu consentimiento explícito</li>
              <li>Para cumplir con obligaciones legales</li>
              <li>Con proveedores de servicios que nos ayudan a operar nuestro negocio</li>
              <li>En caso de fusión, adquisición o venta de activos</li>
            </ul>

            <h2>5. Seguridad de Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu información:
            </p>
            <ul>
              <li>Encriptación SSL/TLS para todas las transmisiones de datos</li>
              <li>Acceso restringido a información personal</li>
              <li>Monitoreo continuo de seguridad</li>
              <li>Actualizaciones regulares de seguridad</li>
            </ul>

            <h2>6. Cookies y Tecnologías Similares</h2>
            <p>
              Utilizamos cookies y tecnologías similares para:
            </p>
            <ul>
              <li>Mantener tus preferencias</li>
              <li>Analizar el tráfico del sitio (mediante Plausible Analytics)</li>
              <li>Mejorar la funcionalidad del sitio</li>
            </ul>
            <p>
              Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar 
              la funcionalidad del sitio.
            </p>

            <h2>7. Tus Derechos</h2>
            <p>Tienes derecho a:</p>
            <ul>
              <li>Acceder a tu información personal</li>
              <li>Corregir información inexacta</li>
              <li>Solicitar la eliminación de tu información</li>
              <li>Oponerte al procesamiento de tus datos</li>
              <li>Recibir tus datos en formato portable</li>
              <li>Retirar tu consentimiento en cualquier momento</li>
            </ul>

            <h2>8. Retención de Datos</h2>
            <p>
              Conservamos tu información personal solo durante el tiempo necesario para cumplir 
              con los propósitos descritos en esta política, a menos que la ley requiera o permita 
              un período de retención más largo.
            </p>

            <h2>9. Menores de Edad</h2>
            <p>
              Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos 
              intencionalmente información de menores de edad.
            </p>

            <h2>10. Cambios a esta Política</h2>
            <p>
              Podemos actualizar esta política ocasionalmente. Te notificaremos sobre cambios 
              significativos publicando la nueva política en nuestro sitio web.
            </p>

            <h2>11. Contacto</h2>
            <p>
              Si tienes preguntas sobre esta Política de Privacidad o sobre cómo manejamos tu 
              información, contáctanos:
            </p>
            <ul>
              <li>Email: privacidad@madfam.io</li>
              <li>Teléfono: +52 55 1234 5678</li>
              <li>Dirección: Ciudad de México, México</li>
            </ul>

            <h2>12. Autoridad de Protección de Datos</h2>
            <p>
              Si no estás satisfecho con nuestra respuesta a tus inquietudes, tienes derecho a 
              presentar una queja ante el Instituto Nacional de Transparencia, Acceso a la 
              Información y Protección de Datos Personales (INAI).
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}