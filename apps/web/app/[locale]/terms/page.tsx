import { Container, Heading } from '@madfam/ui';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function TermsPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return (
    <main className="min-h-screen">
      <section className="pt-20 pb-16 bg-gradient-to-br from-obsidian/5 to-lavender/5">
        <Container>
          <div className="max-w-4xl mx-auto">
            <Heading level={1} className="mb-6">Términos y Condiciones</Heading>
            <p className="text-lg text-obsidian/70">
              Última actualización: Enero 2024
            </p>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar los servicios de MADFAM ("nosotros", "nuestro" o "la empresa"), 
              aceptas estar sujeto a estos Términos y Condiciones. Si no estás de acuerdo con alguna 
              parte de estos términos, no debes usar nuestros servicios.
            </p>

            <h2>2. Descripción de los Servicios</h2>
            <p>
              MADFAM proporciona servicios de consultoría tecnológica, diseño 3D, desarrollo de software, 
              implementación de plataformas y servicios estratégicos de transformación digital, incluyendo 
              pero no limitado a:
            </p>
            <ul>
              <li>Diseño 3D y servicios gráficos (Level 1 - Essentials)</li>
              <li>Diseño paramétrico y experiencias interactivas (Level 2 - Advanced)</li>
              <li>Consultoría y capacitación (Level 3 - Consulting)</li>
              <li>Implementación de plataformas SPARK y PENNY (Level 4 - Platforms)</li>
              <li>Servicios de CTO virtual (Level 5 - Strategic)</li>
            </ul>

            <h2>3. Uso del Sitio Web</h2>
            <h3>3.1 Licencia de Uso</h3>
            <p>
              Te otorgamos una licencia limitada, no exclusiva, no transferible para acceder y usar 
              nuestro sitio web para fines informativos y para contratar nuestros servicios.
            </p>

            <h3>3.2 Restricciones</h3>
            <p>No debes:</p>
            <ul>
              <li>Usar el sitio para fines ilegales o no autorizados</li>
              <li>Intentar acceder a áreas restringidas del sitio</li>
              <li>Interferir con la seguridad o funcionamiento del sitio</li>
              <li>Copiar, modificar o distribuir contenido sin autorización</li>
              <li>Usar bots, scrapers o herramientas automatizadas</li>
            </ul>

            <h2>4. Propiedad Intelectual</h2>
            <h3>4.1 Nuestro Contenido</h3>
            <p>
              Todo el contenido del sitio, incluyendo textos, gráficos, logos, imágenes y software, 
              es propiedad de MADFAM o sus licenciantes y está protegido por leyes de propiedad 
              intelectual.
            </p>

            <h3>4.2 Tu Contenido</h3>
            <p>
              Mantienes todos los derechos sobre el contenido que nos proporciones. Al compartir 
              contenido con nosotros, nos otorgas una licencia para usarlo en la prestación de 
              nuestros servicios.
            </p>

            <h2>5. Servicios Profesionales</h2>
            <h3>5.1 Propuestas y Cotizaciones</h3>
            <p>
              Las propuestas y cotizaciones tienen una validez de 30 días, salvo que se indique 
              lo contrario. Los precios están sujetos a cambios sin previo aviso.
            </p>

            <h3>5.2 Contratación de Servicios</h3>
            <p>
              La contratación de servicios específicos se regirá por contratos individuales que 
              complementan estos términos generales.
            </p>

            <h3>5.3 Pagos</h3>
            <ul>
              <li>Los pagos se realizarán según lo acordado en cada contrato</li>
              <li>Los precios no incluyen impuestos aplicables</li>
              <li>El incumplimiento de pago puede resultar en la suspensión de servicios</li>
            </ul>

            <h2>6. Confidencialidad</h2>
            <p>
              Ambas partes acuerdan mantener confidencial toda información no pública compartida 
              durante la relación comercial. Esta obligación sobrevive a la terminación de los servicios.
            </p>

            <h2>7. Garantías y Limitaciones</h2>
            <h3>7.1 Garantías</h3>
            <p>
              Garantizamos que nuestros servicios se prestarán con profesionalismo y de acuerdo 
              con los estándares de la industria.
            </p>

            <h3>7.2 Limitación de Responsabilidad</h3>
            <p>
              En ningún caso MADFAM será responsable por daños indirectos, incidentales, especiales 
              o consecuentes. Nuestra responsabilidad total no excederá el monto pagado por los 
              servicios en cuestión.
            </p>

            <h2>8. Indemnización</h2>
            <p>
              Aceptas indemnizar y mantener indemne a MADFAM de cualquier reclamo, daño o gasto 
              derivado de tu uso de nuestros servicios o violación de estos términos.
            </p>

            <h2>9. Terminación</h2>
            <p>
              Podemos terminar o suspender tu acceso a nuestros servicios inmediatamente, sin previo 
              aviso, por cualquier motivo, incluyendo el incumplimiento de estos términos.
            </p>

            <h2>10. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios 
              entrarán en vigor al publicarse en el sitio web.
            </p>

            <h2>11. Ley Aplicable</h2>
            <p>
              Estos términos se regirán e interpretarán de acuerdo con las leyes de México. 
              Cualquier disputa se someterá a los tribunales competentes de la Ciudad de México.
            </p>

            <h2>12. Divisibilidad</h2>
            <p>
              Si alguna disposición de estos términos se considera inválida o inaplicable, las 
              demás disposiciones continuarán en pleno vigor y efecto.
            </p>

            <h2>13. Acuerdo Completo</h2>
            <p>
              Estos términos, junto con nuestra Política de Privacidad y cualquier contrato 
              específico, constituyen el acuerdo completo entre tú y MADFAM.
            </p>

            <h2>14. Contacto</h2>
            <p>
              Para preguntas sobre estos Términos y Condiciones, contáctanos:
            </p>
            <ul>
              <li>Email: legal@madfam.io</li>
              <li>Teléfono: +52 55 1234 5678</li>
              <li>Dirección: Ciudad de México, México</li>
            </ul>

            <h2>15. Disposiciones Especiales para Servicios</h2>
            <h3>15.1 Servicios de Diseño</h3>
            <p>
              Los derechos de propiedad intelectual de los diseños se transferirán al cliente 
              únicamente después del pago completo.
            </p>

            <h3>15.2 Servicios de Plataforma</h3>
            <p>
              El uso de SPARK y PENNY está sujeto a términos de servicio adicionales y acuerdos 
              de nivel de servicio (SLA) específicos.
            </p>

            <h3>15.3 Servicios vCTO</h3>
            <p>
              Los servicios de CTO virtual incluyen cláusulas de no competencia y exclusividad 
              que se detallarán en contratos específicos.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}