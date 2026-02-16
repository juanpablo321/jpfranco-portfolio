/* Privacy Policy Page
 * Professional corporate style
 * Spanish language, compliant with Colombian data protection law (Ley 1581 de 2012)
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function Privacy() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 pt-32 pb-20">
        <article className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Política de Privacidad
            </h1>
            <p className="text-muted-foreground mb-12">
              Última actualización: 16 de febrero de 2026
            </p>

            <div className="prose prose-lg prose-headings:text-foreground prose-p:text-foreground max-w-none">
              <h2>1. Información General</h2>
              <p>
                Juan Pablo Franco ("nosotros", "nuestro" o "el sitio"), con domicilio en Bogotá D.C., Colombia, es responsable del tratamiento de los datos personales recopilados a través del sitio web <strong>franco.com.co</strong>. Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos y protegemos su información personal, en cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013 de la República de Colombia.
              </p>

              <h2>2. Datos Personales que Recopilamos</h2>
              <p>Podemos recopilar los siguientes tipos de datos personales:</p>
              <ul>
                <li><strong>Datos de identificación:</strong> nombre completo, correo electrónico, número de teléfono y empresa.</li>
                <li><strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas visitadas, tiempo de permanencia y cookies.</li>
                <li><strong>Datos de comunicación:</strong> mensajes enviados a través del formulario de contacto o correo electrónico.</li>
                <li><strong>Datos profesionales:</strong> cargo, empresa, industria y necesidades de consultoría.</li>
              </ul>

              <h2>3. Finalidad del Tratamiento</h2>
              <p>Los datos personales recopilados serán utilizados para las siguientes finalidades:</p>
              <ul>
                <li>Responder a consultas y solicitudes de información.</li>
                <li>Agendar y gestionar consultas de consultoría.</li>
                <li>Enviar comunicaciones comerciales y contenido relevante sobre marketing digital, eCommerce e inteligencia artificial (solo con su consentimiento previo).</li>
                <li>Mejorar la experiencia de navegación y el contenido del sitio web.</li>
                <li>Realizar análisis estadísticos y de rendimiento del sitio.</li>
                <li>Cumplir con obligaciones legales y regulatorias.</li>
              </ul>

              <h2>4. Base Legal del Tratamiento</h2>
              <p>
                El tratamiento de sus datos personales se fundamenta en:
              </p>
              <ul>
                <li><strong>Consentimiento:</strong> otorgado al completar formularios o aceptar cookies en nuestro sitio.</li>
                <li><strong>Interés legítimo:</strong> para mejorar nuestros servicios y comunicarnos con potenciales clientes.</li>
                <li><strong>Obligación legal:</strong> para cumplir con la normativa colombiana vigente.</li>
              </ul>

              <h2>5. Cookies y Tecnologías de Seguimiento</h2>
              <p>
                Nuestro sitio web utiliza cookies y tecnologías similares para mejorar la experiencia del usuario. Las cookies que utilizamos incluyen:
              </p>
              <ul>
                <li><strong>Cookies esenciales:</strong> necesarias para el funcionamiento básico del sitio.</li>
                <li><strong>Cookies analíticas:</strong> para comprender cómo los visitantes interactúan con el sitio (Google Analytics).</li>
                <li><strong>Cookies de preferencias:</strong> para recordar sus configuraciones y preferencias.</li>
              </ul>
              <p>
                Puede configurar su navegador para rechazar cookies, aunque esto podría afectar la funcionalidad del sitio.
              </p>

              <h2>6. Compartición de Datos</h2>
              <p>
                No vendemos, alquilamos ni compartimos sus datos personales con terceros, excepto en los siguientes casos:
              </p>
              <ul>
                <li><strong>Proveedores de servicios:</strong> empresas que nos ayudan a operar el sitio web (hosting, analytics, email marketing), quienes están obligados contractualmente a proteger sus datos.</li>
                <li><strong>Obligación legal:</strong> cuando sea requerido por ley, orden judicial o autoridad competente.</li>
                <li><strong>Consentimiento:</strong> cuando usted haya dado su autorización expresa.</li>
              </ul>

              <h2>7. Seguridad de los Datos</h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger sus datos personales contra acceso no autorizado, pérdida, alteración o destrucción. Estas medidas incluyen cifrado SSL/TLS, acceso restringido a datos y monitoreo continuo de seguridad.
              </p>

              <h2>8. Derechos del Titular</h2>
              <p>
                De acuerdo con la Ley 1581 de 2012, usted tiene derecho a:
              </p>
              <ul>
                <li><strong>Conocer:</strong> acceder a sus datos personales que obran en nuestras bases de datos.</li>
                <li><strong>Actualizar:</strong> solicitar la corrección de datos inexactos o incompletos.</li>
                <li><strong>Rectificar:</strong> corregir información errónea.</li>
                <li><strong>Suprimir:</strong> solicitar la eliminación de sus datos cuando no exista obligación legal de conservarlos.</li>
                <li><strong>Revocar:</strong> retirar el consentimiento otorgado para el tratamiento de sus datos.</li>
                <li><strong>Presentar quejas:</strong> ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la ley.</li>
              </ul>

              <h2>9. Retención de Datos</h2>
              <p>
                Conservamos sus datos personales durante el tiempo necesario para cumplir con las finalidades descritas en esta política, o según lo requiera la legislación aplicable. Una vez cumplida la finalidad, los datos serán eliminados de forma segura.
              </p>

              <h2>10. Cambios a esta Política</h2>
              <p>
                Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Los cambios serán publicados en esta página con la fecha de última actualización. Le recomendamos revisar esta política periódicamente.
              </p>

              <h2>11. Contacto</h2>
              <p>
                Para ejercer sus derechos o realizar consultas sobre el tratamiento de sus datos personales, puede contactarnos a través de:
              </p>
              <ul>
                <li><strong>WhatsApp:</strong> +57 323 581 2748</li>
                <li><strong>LinkedIn:</strong> /in/juanpablo321</li>
                <li><strong>Ubicación:</strong> Bogotá D.C., Colombia</li>
              </ul>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
