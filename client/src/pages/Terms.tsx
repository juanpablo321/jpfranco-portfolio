/* Terms and Conditions Page
 * Professional corporate style
 * Spanish language, compliant with Colombian law
 */

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function Terms() {
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
              Términos y Condiciones
            </h1>
            <p className="text-muted-foreground mb-12">
              Última actualización: 16 de febrero de 2026
            </p>

            <div className="prose prose-lg prose-headings:text-foreground prose-p:text-foreground max-w-none">
              <h2>1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar el sitio web <strong>franco.com.co</strong> (en adelante, "el Sitio"), usted acepta estar sujeto a estos Términos y Condiciones de uso. Si no está de acuerdo con alguno de estos términos, le solicitamos que no utilice el Sitio. El uso continuado del Sitio constituye su aceptación de estos términos y cualquier modificación posterior.
              </p>

              <h2>2. Descripción del Servicio</h2>
              <p>
                El Sitio es operado por Juan Pablo Franco, consultor especializado en estrategia de crecimiento digital, eCommerce y marketplaces. A través del Sitio, ofrecemos:
              </p>
              <ul>
                <li>Información sobre servicios de consultoría en expansión digital y comercio electrónico.</li>
                <li>Contenido educativo a través de artículos de blog sobre marketing digital, inteligencia artificial y estrategias B2B.</li>
                <li>Formularios de contacto para solicitar consultas y asesorías.</li>
                <li>Información profesional y de experiencia del consultor.</li>
              </ul>

              <h2>3. Propiedad Intelectual</h2>
              <p>
                Todo el contenido del Sitio, incluyendo pero no limitado a textos, gráficos, logotipos, imágenes, videos, artículos de blog, diseños y código fuente, es propiedad de Juan Pablo Franco o se utiliza bajo licencia, y está protegido por las leyes de propiedad intelectual de Colombia (Ley 23 de 1982 y Decisión Andina 351).
              </p>
              <p>
                Queda expresamente prohibido:
              </p>
              <ul>
                <li>Reproducir, distribuir o modificar el contenido sin autorización escrita previa.</li>
                <li>Utilizar el contenido con fines comerciales sin consentimiento.</li>
                <li>Eliminar o alterar avisos de derechos de autor o marcas registradas.</li>
                <li>Crear obras derivadas basadas en el contenido del Sitio.</li>
              </ul>
              <p>
                Se permite compartir enlaces a los artículos del blog y citar fragmentos breves con la debida atribución al autor y enlace al Sitio original.
              </p>

              <h2>4. Uso Aceptable</h2>
              <p>
                Al utilizar el Sitio, usted se compromete a:
              </p>
              <ul>
                <li>Proporcionar información veraz y actualizada en los formularios de contacto.</li>
                <li>No utilizar el Sitio para fines ilegales o no autorizados.</li>
                <li>No intentar acceder a áreas restringidas del Sitio o sus sistemas.</li>
                <li>No transmitir virus, malware o cualquier código de naturaleza destructiva.</li>
                <li>No realizar actividades que puedan dañar, deshabilitar o sobrecargar el Sitio.</li>
                <li>No recopilar información de otros usuarios sin su consentimiento.</li>
              </ul>

              <h2>5. Servicios de Consultoría</h2>
              <p>
                Los servicios de consultoría ofrecidos a través del Sitio están sujetos a acuerdos individuales entre Juan Pablo Franco y el cliente. La información presentada en el Sitio es de carácter informativo y no constituye una oferta vinculante. Los términos específicos de cada servicio de consultoría (alcance, precio, plazos, entregables) se definirán en contratos o propuestas individuales.
              </p>

              <h2>6. Contenido del Blog</h2>
              <p>
                Los artículos publicados en el blog del Sitio tienen carácter informativo y educativo. Aunque nos esforzamos por proporcionar información precisa y actualizada:
              </p>
              <ul>
                <li>El contenido no constituye asesoría profesional personalizada.</li>
                <li>Las estrategias y recomendaciones pueden no ser aplicables a todas las situaciones empresariales.</li>
                <li>Los resultados pueden variar según las circunstancias específicas de cada negocio.</li>
                <li>Le recomendamos consultar con un profesional antes de tomar decisiones basadas en el contenido del blog.</li>
              </ul>

              <h2>7. Enlaces a Terceros</h2>
              <p>
                El Sitio puede contener enlaces a sitios web de terceros. Estos enlaces se proporcionan únicamente para su conveniencia y no implican respaldo o responsabilidad por el contenido, productos o servicios de dichos sitios. Le recomendamos revisar los términos y políticas de privacidad de cualquier sitio de terceros que visite.
              </p>

              <h2>8. Limitación de Responsabilidad</h2>
              <p>
                En la máxima medida permitida por la ley colombiana:
              </p>
              <ul>
                <li>El Sitio se proporciona "tal cual" y "según disponibilidad", sin garantías de ningún tipo.</li>
                <li>No garantizamos que el Sitio esté libre de errores, interrupciones o virus.</li>
                <li>No seremos responsables por daños directos, indirectos, incidentales, consecuentes o punitivos derivados del uso o la imposibilidad de uso del Sitio.</li>
                <li>No nos responsabilizamos por pérdidas económicas derivadas de decisiones tomadas con base en el contenido del Sitio.</li>
              </ul>

              <h2>9. Indemnización</h2>
              <p>
                Usted acepta indemnizar y mantener indemne a Juan Pablo Franco, sus colaboradores y asociados, de cualquier reclamación, daño, pérdida o gasto (incluyendo honorarios de abogados) que surja del uso indebido del Sitio o la violación de estos Términos y Condiciones.
              </p>

              <h2>10. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigor inmediatamente después de su publicación en el Sitio. Es responsabilidad del usuario revisar periódicamente estos términos. El uso continuado del Sitio después de cualquier modificación constituye la aceptación de los nuevos términos.
              </p>

              <h2>11. Ley Aplicable y Jurisdicción</h2>
              <p>
                Estos Términos y Condiciones se rigen por las leyes de la República de Colombia. Cualquier controversia derivada de estos términos será sometida a la jurisdicción de los tribunales competentes de Bogotá D.C., Colombia, salvo que las partes acuerden un mecanismo alternativo de resolución de conflictos.
              </p>

              <h2>12. Divisibilidad</h2>
              <p>
                Si alguna disposición de estos Términos y Condiciones fuera declarada inválida o inaplicable por un tribunal competente, las disposiciones restantes continuarán en pleno vigor y efecto.
              </p>

              <h2>13. Contacto</h2>
              <p>
                Para cualquier consulta relacionada con estos Términos y Condiciones, puede contactarnos a través de:
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
