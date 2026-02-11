/* Professional Corporate Home Page (Simon Sinek Inspired)
 * Clean, trustworthy design with solid blue backgrounds
 * Asymmetric layouts: text left, image right
 * White outline CTAs
 * Generous spacing and clear typography
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  Award,
  BarChart3,
  Building2,
  CheckCircle2,
  Linkedin,
  MapPin,
  Phone,
  ShoppingCart,
  Target,
  TrendingUp,
} from "lucide-react";


export default function Home() {


  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section - Blue background with asymmetric layout */}
      <section
        id="hero"
        className="corp-blue-section min-h-screen flex items-center pt-20"
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8">
              <h1 className="text-white">
                Estratega de Expansión Digital
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                Transformando negocios a través de estrategias de comercio digital
                basadas en datos en LATAM, Europa y Norteamérica
              </p>
              <div className="pt-4">
                <button
                  onClick={() =>
                    document
                      .getElementById("contacto")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="corp-button-outline text-lg px-8 py-4"
                >
                  Agendar Consultoría Gratuita
                </button>
              </div>
            </div>

            {/* Right: Professional Image */}
            <div className="flex justify-center lg:justify-end">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/Dz3VX8CtuwGnqwZAtwcqk4-img-1_1770818624000_na1fn_anBmLXByb2Zlc3Npb25hbC1oZXJv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUU9aN3IyREZLSWZaV3lVd3hOaVlOcC9zYW5kYm94L0R6M1ZYOEN0dXdHbnF3WkF0d2NxazQtaW1nLTFfMTc3MDgxODYyNDAwMF9uYTFmbl9hbkJtTFhCeWIyWmxjM05wYjI1aGJDMW9aWEp2LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=N0LsRElf9VhxJ9J3ahp6~eP~M5XfIEGNtkhgvEc4ZQwkt2bc3OAGUuzmu1NytfZM2cigc2g1pbAKYSNYNgEIa5QwXH9HU-OvzOaM~i9-g5AWRmarDT3ne~ollfEUzkYXh0eJuyrozKRD2HUjWpNuKFD7Lv-CIKmJ0o2kCEDDswZEBBhACs~XvxH~7EFCCD2CoKSevhCquY-SHi5zsQIBOq-UzcJ4VrYyee~aNgBJBESR5ExmamSxJbIbJD2ntKDibiCMC2rcMbDLaLf0b65h8UJ36cX~w0omVuvrM4I3nwwtbBWiII~x6L~tCZQ0olSlxEF2F2tlcqR9XYwkN~CUUg__"
                alt="Juan Pablo Franco"
                className="w-full max-w-md lg:max-w-lg rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats - White section */}
      <section className="corp-white-section py-16">
        <div className="container">
          <div className="grid grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <p className="text-5xl font-bold text-primary mb-2">+15</p>
              <p className="text-base text-muted-foreground">Años Experiencia</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary mb-2">+100</p>
              <p className="text-base text-muted-foreground">Proyectos</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-primary mb-2">Global</p>
              <p className="text-base text-muted-foreground">Alcance</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Gray background */}
      <section id="about" className="corp-gray-section corp-section">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center">
              <p className="corp-label text-primary mb-4">Sobre Mí</p>
              <h2>Experto en Comercio Digital y Marketplaces</h2>
            </div>
            <div className="space-y-6 text-center">
              <p className="text-xl leading-relaxed">
                Con más de 15 años de experiencia en eCommerce y transformación
                digital, me especializo en implementaciones VTEX, desarrollo de
                marketplaces B2B y estrategias de generación de leads para empresas
                en LATAM, Europa y Norteamérica.
              </p>
              <p className="text-xl leading-relaxed">
                He liderado proyectos para marcas globales como Coca-Cola, Nestlé,
                Unilever y Amazon, generando resultados medibles en crecimiento de
                ventas, optimización de procesos y expansión de mercado.
              </p>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">
                  Enfoque en Resultados
                </h3>
                <p className="text-muted-foreground">
                  Estrategias basadas en datos con KPIs claros y ROI medible
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">
                  Crecimiento Escalable
                </h3>
                <p className="text-muted-foreground">
                  Soluciones diseñadas para crecer con tu negocio
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">
                  Experiencia Global
                </h3>
                <p className="text-muted-foreground">
                  Proyectos exitosos en 3 continentes con marcas líderes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - White background */}
      <section id="servicios" className="corp-white-section corp-section">
        <div className="container">
          <div className="text-center mb-16">
            <p className="corp-label text-primary mb-4">Servicios</p>
            <h2>Soluciones de Comercio Digital</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <Card className="corp-card">
              <CardContent className="pt-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">
                  Consultoría eCommerce & VTEX
                </h3>
                <p className="text-muted-foreground">
                  Implementación y optimización de plataformas VTEX para
                  maximizar conversiones y mejorar la experiencia del usuario.
                </p>
                <ul className="space-y-2 text-base">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Auditoría y estrategia eCommerce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Implementación VTEX end-to-end</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Optimización de conversión (CRO)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 2 */}
            <Card className="corp-card">
              <CardContent className="pt-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">
                  Desarrollo de Marketplaces
                </h3>
                <p className="text-muted-foreground">
                  Creación y gestión de marketplaces B2B y B2C escalables con
                  arquitectura robusta y experiencia optimizada.
                </p>
                <ul className="space-y-2 text-base">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Arquitectura de marketplace</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Onboarding de sellers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Gestión de catálogos multi-vendor</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 3 */}
            <Card className="corp-card">
              <CardContent className="pt-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">
                  Generación de Leads B2B
                </h3>
                <p className="text-muted-foreground">
                  Estrategias de marketing digital y automatización para generar
                  leads calificados y aumentar conversiones B2B.
                </p>
                <ul className="space-y-2 text-base">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Estrategia de contenido B2B</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Marketing automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Optimización de funnel de ventas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 4 */}
            <Card className="corp-card">
              <CardContent className="pt-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">
                  Análisis de Datos y BI
                </h3>
                <p className="text-muted-foreground">
                  Implementación de dashboards y análisis de datos para toma de
                  decisiones basadas en métricas clave.
                </p>
                <ul className="space-y-2 text-base">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Dashboards personalizados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Análisis de comportamiento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Reportes de performance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 5 */}
            <Card className="corp-card">
              <CardContent className="pt-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">
                  Estrategia Omnicanal
                </h3>
                <p className="text-muted-foreground">
                  Integración de canales online y offline para experiencia de
                  cliente unificada y sin fricciones.
                </p>
                <ul className="space-y-2 text-base">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Integración de sistemas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Unified commerce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Customer journey mapping</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 6 */}
            <Card className="corp-card">
              <CardContent className="pt-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">
                  Transformación Digital
                </h3>
                <p className="text-muted-foreground">
                  Acompañamiento en procesos de digitalización empresarial y
                  adopción de nuevas tecnologías.
                </p>
                <ul className="space-y-2 text-base">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Roadmap de digitalización</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Change management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Capacitación de equipos</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section - Gray background */}
      <section id="experiencia" className="corp-gray-section corp-section">
        <div className="container">
          <div className="text-center mb-16">
            <p className="corp-label text-primary mb-4">Trayectoria</p>
            <h2>Experiencia Profesional</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Experience 1 */}
            <Card className="corp-card">
              <CardContent className="pt-8">
                <div className="flex items-start gap-6">
                  <div className="w-1 h-full bg-primary rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="corp-label text-primary mb-2">2020 - Presente</p>
                    <h3 className="text-2xl font-semibold mb-2">
                      Consultor Independiente
                    </h3>
                    <p className="text-muted-foreground mb-4 text-lg">
                      Estrategia Digital & eCommerce
                    </p>
                    <ul className="space-y-3 text-base">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                        <span>
                          Liderazgo de +50 proyectos de implementación VTEX para
                          empresas Fortune 500
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                        <span>
                          Desarrollo de marketplaces B2B con GMV superior a $10M USD
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                        <span>
                          Generación de +5,000 leads calificados para clientes B2B
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Experience 2 */}
            <Card className="corp-card">
              <CardContent className="pt-8">
                <div className="flex items-start gap-6">
                  <div className="w-1 h-full bg-primary rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="corp-label text-primary mb-2">2015 - 2020</p>
                    <h3 className="text-2xl font-semibold mb-2">
                      Director de eCommerce
                    </h3>
                    <p className="text-muted-foreground mb-4 text-lg">
                      Empresa Multinacional FMCG
                    </p>
                    <ul className="space-y-3 text-base">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                        <span>
                          Gestión de equipo de 15 personas en 3 países de LATAM
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                        <span>
                          Crecimiento de ventas online del 300% en 3 años
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                        <span>
                          Implementación de estrategia omnicanal en 50+ tiendas
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Experience 3 */}
            <Card className="corp-card">
              <CardContent className="pt-8">
                <div className="flex items-start gap-6">
                  <div className="w-1 h-full bg-primary rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="corp-label text-primary mb-2">2010 - 2015</p>
                    <h3 className="text-2xl font-semibold mb-2">
                      Gerente de Marketing Digital
                    </h3>
                    <p className="text-muted-foreground mb-4 text-lg">
                      Agencia de Marketing Digital
                    </p>
                    <ul className="space-y-3 text-base">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                        <span>
                          Gestión de portafolio de 30+ clientes en retail y eCommerce
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                        <span>
                          Desarrollo de estrategias SEO/SEM con ROI promedio del 400%
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="mt-1 flex-shrink-0 text-primary" />
                        <span>
                          Capacitación de equipos en herramientas de analytics y CRO
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Clients Section - White background */}
      <section id="clientes" className="corp-white-section corp-section">
        <div className="container">
          <div className="text-center mb-16">
            <p className="corp-label text-primary mb-4">Portfolio</p>
            <h2>Clientes Destacados</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              "Coca-Cola",
              "Nestlé",
              "Unilever",
              "Amazon",
              "Mercado Libre",
              "Rappi",
              "Falabella",
              "Grupo Éxito",
            ].map((client) => (
              <div
                key={client}
                className="corp-card text-center flex items-center justify-center h-24"
              >
                <p className="font-semibold text-foreground text-lg">{client}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section - Gray background */}
      <section id="expertise" className="corp-gray-section corp-section">
        <div className="container">
          <div className="text-center mb-16">
            <p className="corp-label text-primary mb-4">Competencias</p>
            <h2>Expertise Técnico</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Platforms */}
            <Card className="corp-card">
              <CardContent className="pt-8">
                <h3 className="text-2xl font-semibold mb-6">
                  Plataformas & Tecnologías
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-base font-semibold">VTEX</span>
                      <span className="text-base text-primary font-semibold">Experto</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[95%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-base font-semibold">Shopify</span>
                      <span className="text-base text-primary font-semibold">Avanzado</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[85%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-base font-semibold">Magento</span>
                      <span className="text-base text-primary font-semibold">Avanzado</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[80%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-base font-semibold">
                        Google Analytics & Tag Manager
                      </span>
                      <span className="text-base text-primary font-semibold">Experto</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[90%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="corp-card">
              <CardContent className="pt-8">
                <h3 className="text-2xl font-semibold mb-6">
                  Habilidades Clave
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-base font-semibold">
                        Estrategia Digital
                      </span>
                      <span className="text-base text-primary font-semibold">Experto</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[95%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-base font-semibold">
                        Análisis de Datos
                      </span>
                      <span className="text-base text-primary font-semibold">Avanzado</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[90%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-base font-semibold">UX/UI</span>
                      <span className="text-base text-primary font-semibold">Avanzado</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[85%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-base font-semibold">
                        Project Management
                      </span>
                      <span className="text-base text-primary font-semibold">Experto</span>
                    </div>
                    <div className="h-3 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-[95%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Languages & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-12">
            <Card className="corp-card">
              <CardContent className="pt-8">
                <h3 className="text-2xl font-semibold mb-6">Idiomas</h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center text-base">
                    <span className="font-semibold">Español</span>
                    <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold">
                      Nativo
                    </span>
                  </li>
                  <li className="flex justify-between items-center text-base">
                    <span className="font-semibold">Inglés</span>
                    <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold">
                      Fluido (C1)
                    </span>
                  </li>
                  <li className="flex justify-between items-center text-base">
                    <span className="font-semibold">Portugués</span>
                    <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold">
                      Intermedio (B2)
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="corp-card">
              <CardContent className="pt-8">
                <h3 className="text-2xl font-semibold mb-6">Certificaciones</h3>
                <ul className="space-y-3 text-base">
                  <li className="flex items-start gap-3">
                    <Award size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>VTEX Certified Professional</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Google Analytics Individual Qualification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Certified ScrumMaster (CSM)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Award size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Digital Marketing Nanodegree - Udacity</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section - Blue background */}
      <section id="contacto" className="corp-blue-section corp-section">
        <div className="container">
          <div className="text-center mb-16">
            <p className="corp-label text-white/80 mb-4">Contacto</p>
            <h2 className="text-white">Trabajemos Juntos</h2>
            <p className="text-xl text-white/90 mt-6 max-w-2xl mx-auto">
              ¿Listo para llevar tu negocio al siguiente nivel? Agenda una
              consulta gratuita de 30 minutos.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* HubSpot Meetings Embed - Direct iframe */}
            <div className="bg-white rounded-lg overflow-hidden" style={{ minHeight: '660px' }}>
              <iframe
                src="https://meetings.hubspot.com/juanpablo321?embed=true"
                width="100%"
                height="660"
                frameBorder="0"
                style={{ border: 'none', minHeight: '660px' }}
                title="Agendar Reunión con Juan Pablo Franco"
                allow="camera; microphone"
              />
            </div>

            {/* Contact Info */}
            <div className="space-y-8 text-white">
              <div>
                <h3 className="text-2xl font-semibold mb-6">
                  Información de Contacto
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-1"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider mb-2 text-white/80">
                        Whatsapp
                      </p>
                      <a
                        href="https://wa.me/573235812748"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:underline"
                      >
                        +57 323 581 2748
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin size={24} className="flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider mb-2 text-white/80">
                        Ubicación
                      </p>
                      <p className="text-xl">Bogotá D.C., Colombia</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Linkedin size={24} className="flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider mb-2 text-white/80">
                        LinkedIn
                      </p>
                      <a
                        href="https://www.linkedin.com/in/juanpablo321/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xl hover:underline"
                      >
                        /in/juanpablo321
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
