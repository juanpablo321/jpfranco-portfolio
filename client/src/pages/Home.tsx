/* Swiss Minimalism Home Page
 * Clean, minimal design with maximum legibility
 * Typography as protagonist, generous whitespace
 * Grid-based precision, functional color use
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
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
import { FormEvent } from "react";

export default function Home() {
  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("¡Mensaje enviado! Te responderé en menos de 24 horas.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/ZCx160ZdIiIn3Yj59OSda8-img-1_1770758684000_na1fn_c3dpc3MtaGVyby1wYXR0ZXJu.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUU9aN3IyREZLSWZaV3lVd3hOaVlOcC9zYW5kYm94L1pDeDE2MFpkSWlJbjNZajU5T1NkYTgtaW1nLTFfMTc3MDc1ODY4NDAwMF9uYTFmbl9jM2RwYzNNdGFHVnlieTF3WVhSMFpYSnUucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=MaWCiiX6GEEQg8FRAwaaiiCsXKK1MOLoUY2RBLccD8KK7fQ~gvQP365Aouq2dMX~Na~N8tGGS6BaCPHQFAQputi1iry1LL8PWJFdOs9L0271053fDE0k8hw5oTOyRvEPUgwD-2VTmLqj~dboy7nxv5YToniQ2dYFdp9ekon4tnuQp7~HbSR5xGVfAdD~lR1nov~tGzuh7ttL951vX3Xam3O5ZcTFEO1azDiJ~fK~D5xKYHw7drtV7TtdzZCgmt92YD6Ee6GczcyyRq2wMK6etd439NrYZeXFxSwDi7gOg8FkchXe6-QWQh~oOurss1vpY4arin64vPdKP9Ow74bXnQ__')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="swiss-label">Consultor Digital</p>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Estratega de Expansión Digital
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Transformando negocios a través de estrategias de comercio digital
              basadas en datos en LATAM, Europa y Norteamérica
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={() =>
                  document
                    .getElementById("contacto")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="swiss-button"
              >
                Agendar Consulta
              </Button>
              <Button
                onClick={() =>
                  document
                    .getElementById("servicios")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="swiss-button-outline"
              >
                Ver Servicios
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-8 pt-16 border-t border-border max-w-2xl mx-auto">
              <div>
                <p className="text-3xl font-bold">+15</p>
                <p className="text-sm text-muted-foreground">Años Experiencia</p>
              </div>
              <div>
                <p className="text-3xl font-bold">+100</p>
                <p className="text-sm text-muted-foreground">Proyectos</p>
              </div>
              <div>
                <p className="text-3xl font-bold">Global</p>
                <p className="text-sm text-muted-foreground">Clientes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="swiss-section bg-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="swiss-label">Sobre Mí</p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Experto en Comercio Digital y Marketplaces
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Con más de 15 años de experiencia en eCommerce y transformación
              digital, me especializo en implementaciones VTEX, desarrollo de
              marketplaces B2B y estrategias de generación de leads para empresas
              en LATAM, Europa y Norteamérica.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              He liderado proyectos para marcas globales como Coca-Cola, Nestlé,
              Unilever y Amazon, generando resultados medibles en crecimiento de
              ventas, optimización de procesos y expansión de mercado.
            </p>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <Card className="swiss-card text-center">
              <CardContent className="pt-8">
                <Target className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Enfoque en Resultados
                </h3>
                <p className="text-muted-foreground">
                  Estrategias basadas en datos con KPIs claros y ROI medible
                </p>
              </CardContent>
            </Card>
            <Card className="swiss-card text-center">
              <CardContent className="pt-8">
                <TrendingUp className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Crecimiento Escalable
                </h3>
                <p className="text-muted-foreground">
                  Soluciones diseñadas para crecer con tu negocio
                </p>
              </CardContent>
            </Card>
            <Card className="swiss-card text-center">
              <CardContent className="pt-8">
                <Award className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Experiencia Global
                </h3>
                <p className="text-muted-foreground">
                  Proyectos exitosos en 3 continentes con marcas líderes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="swiss-section">
        <div className="container">
          <div className="text-center mb-16">
            <p className="swiss-label">Servicios</p>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Soluciones de Comercio Digital
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <Card className="swiss-card">
              <CardContent className="pt-8">
                <img
                  src="https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/ZCx160ZdIiIn3Yj59OSda8_1770758690300_na1fn_c3dpc3Mtc2VydmljZXMtaWNvbi0x.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUU9aN3IyREZLSWZaV3lVd3hOaVlOcC9zYW5kYm94L1pDeDE2MFpkSWlJbjNZajU5T1NkYThfMTc3MDc1ODY5MDMwMF9uYTFmbl9jM2RwYzNNdGMyVnlkbWxqWlhNdGFXTnZiaTB4LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=tvk8mPQTep3v3wc7xH9n5-TmiYgl1Swd48X6UtTstVhLT6RTlgUAIVWd-BmlWJx2AKhZ2at2qdrZIaKf4~0rS~SJXzmBu5kbRozkfMvEXOBD5sKUghKVuCzMylO8lCKWPWxboXCHsNyqvXbPI3fuSMzAA1Ve2EFAMtDqICWhlWOi2PZcQYREUxf~RSih56D5iYAKPXpHFI3LXHEAWCL5tEFinmSrcCobFrGsMWHjTcMH2n0mJHK5pGh4EbM1eE~SWk9cfG6n-ON6JuyQEzn8tScLieI7IEdVdnN~rM6666iPy0V0YktmqRBcM~2-6ERAXzJ4mwnuIJU1n5UBQd21-w__"
                  alt="eCommerce Icon"
                  className="w-16 h-16 mb-6"
                />
                <h3 className="text-2xl font-semibold mb-4">
                  Consultoría eCommerce & VTEX
                </h3>
                <p className="text-muted-foreground mb-4">
                  Implementación y optimización de plataformas VTEX para
                  maximizar conversiones y mejorar la experiencia del usuario.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>Auditoría y estrategia eCommerce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>Implementación VTEX end-to-end</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>Optimización de conversión (CRO)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 2 */}
            <Card className="swiss-card">
              <CardContent className="pt-8">
                <img
                  src="https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/ZCx160ZdIiIn3Yj59OSda8_1770758690301_na1fn_c3dpc3Mtc2VydmljZXMtaWNvbi0y.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUU9aN3IyREZLSWZaV3lVd3hOaVlOcC9zYW5kYm94L1pDeDE2MFpkSWlJbjNZajU5T1NkYThfMTc3MDc1ODY5MDMwMV9uYTFmbl9jM2RwYzNNdGMyVnlkbWxqWlhNdGFXTnZiaTB5LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=v3Zfoh8KvsQjGQmxJw8aRkxDYOzdAn5TJaVxrgNO4-T6rd56BhD20AMR0ANjlSxDn905bxixEGUVEJ9uUfemGy5Ljywa6U4LvSaycANnNeupWMJ6aJmcBZKzREkoiZFr93rVrpbkbLvhb7LG8qiLDa6GQMbUZPowmlVhzy83tLMAMAX93eE93J~5RSxm-LDZe~acQIXlmMCojKTs6QxFmztmm~WLwR0vC3tpF~sGuTglPM0kxQ0nA-xUum1qT87JHV4omMsQFDDr6fs0oFTgI41JPfnYr-6Ltr5~PhHbDzPXe6LbZGL-H6xn~nG1RV7NNkyLb-YtiXvoKKUOCbeVUQ__"
                  alt="Marketplace Icon"
                  className="w-16 h-16 mb-6"
                />
                <h3 className="text-2xl font-semibold mb-4">
                  Desarrollo de Marketplaces
                </h3>
                <p className="text-muted-foreground mb-4">
                  Creación y gestión de marketplaces B2B y B2C escalables con
                  arquitectura robusta y experiencia optimizada.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>Arquitectura de marketplace</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>Onboarding de sellers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>Gestión de catálogos multi-vendor</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 3 */}
            <Card className="swiss-card">
              <CardContent className="pt-8">
                <img
                  src="https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/ZCx160ZdIiIn3Yj59OSda8_1770758690301_na1fn_c3dpc3Mtc2VydmljZXMtaWNvbi0z.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUU9aN3IyREZLSWZaV3lVd3hOaVlOcC9zYW5kYm94L1pDeDE2MFpkSWlJbjNZajU5T1NkYThfMTc3MDc1ODY5MDMwMV9uYTFmbl9jM2RwYzNNdGMyVnlkbWxqWlhNdGFXTnZiaTB6LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TLNIdbafCakTiYcSyQPeO8~dYgrv6Hz~gREewwCj8O3iOVo7yID6UfZ3PGS03BN8TtkYkS-v8jtYM7hfHoAKyegArzBRPltrOYemym9x-jq9oDV-IrxkLihKZS1Svud~-LxIABqDHBYys1snjzixBtCXwtJDn0cd5koW~54f8Q1T00IcNmirD2D8gwF22V97oVvOf3kXfPNMuw0-Nc3AOqQq~FTIMvf9hLYBRne-eNRYvOxIcwSBXY~1xOfSXFnIxlPqpgjjFFqH3V6aDR4e8q4sQysnMzVo-zxdQdW2QO0pgZLg0WdOPxAOnjhjdJyasgKfxAfVcY3X0wNEs65-VQ__"
                  alt="B2B Icon"
                  className="w-16 h-16 mb-6"
                />
                <h3 className="text-2xl font-semibold mb-4">
                  Generación de Leads B2B
                </h3>
                <p className="text-muted-foreground mb-4">
                  Estrategias de marketing digital y automatización para generar
                  leads calificados y aumentar conversiones B2B.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>Estrategia de contenido B2B</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>Marketing automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>Optimización de funnel de ventas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 4 */}
            <Card className="swiss-card">
              <CardContent className="pt-8">
                <BarChart3 className="w-16 h-16 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">
                  Análisis de Datos y BI
                </h3>
                <p className="text-muted-foreground mb-4">
                  Implementación de dashboards y análisis de datos para toma de
                  decisiones basadas en métricas clave.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>Dashboards personalizados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>Análisis de comportamiento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>Reportes de performance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 5 */}
            <Card className="swiss-card">
              <CardContent className="pt-8">
                <ShoppingCart className="w-16 h-16 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">
                  Estrategia Omnicanal
                </h3>
                <p className="text-muted-foreground mb-4">
                  Integración de canales online y offline para experiencia de
                  cliente unificada y sin fricciones.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>Integración de sistemas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>Unified commerce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>Customer journey mapping</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 6 */}
            <Card className="swiss-card">
              <CardContent className="pt-8">
                <Building2 className="w-16 h-16 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">
                  Transformación Digital
                </h3>
                <p className="text-muted-foreground mb-4">
                  Acompañamiento en procesos de digitalización empresarial y
                  adopción de nuevas tecnologías.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>Roadmap de digitalización</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>Change management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                    <span>Capacitación de equipos</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experiencia" className="swiss-section bg-secondary">
        <div className="container">
          <div className="text-center mb-16">
            <p className="swiss-label">Trayectoria</p>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Experiencia Profesional
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {/* Experience 1 */}
            <div className="border-l-2 border-foreground pl-8">
              <p className="swiss-label">2020 - Presente</p>
              <h3 className="text-2xl font-semibold mt-2 mb-2">
                Consultor Independiente
              </h3>
              <p className="text-muted-foreground mb-4">
                Estrategia Digital & eCommerce
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                  <span>
                    Liderazgo de +50 proyectos de implementación VTEX para
                    empresas Fortune 500
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                  <span>
                    Desarrollo de marketplaces B2B con GMV superior a $10M USD
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                  <span>
                    Generación de +5,000 leads calificados para clientes B2B
                  </span>
                </li>
              </ul>
            </div>

            {/* Experience 2 */}
            <div className="border-l-2 border-foreground pl-8">
              <p className="swiss-label">2015 - 2020</p>
              <h3 className="text-2xl font-semibold mt-2 mb-2">
                Director de eCommerce
              </h3>
              <p className="text-muted-foreground mb-4">
                Empresa Multinacional FMCG
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                  <span>
                    Gestión de equipo de 15 personas en 3 países de LATAM
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                  <span>
                    Crecimiento de ventas online del 300% en 3 años
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                  <span>
                    Implementación de estrategia omnicanal en 50+ tiendas
                  </span>
                </li>
              </ul>
            </div>

            {/* Experience 3 */}
            <div className="border-l-2 border-foreground pl-8">
              <p className="swiss-label">2010 - 2015</p>
              <h3 className="text-2xl font-semibold mt-2 mb-2">
                Gerente de Marketing Digital
              </h3>
              <p className="text-muted-foreground mb-4">
                Agencia de Marketing Digital
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                  <span>
                    Gestión de portafolio de 30+ clientes en retail y eCommerce
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                  <span>
                    Desarrollo de estrategias SEO/SEM con ROI promedio del 400%
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="mt-1 flex-shrink-0" />
                  <span>
                    Capacitación de equipos en herramientas de analytics y CRO
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clientes" className="swiss-section">
        <div className="container">
          <div className="text-center mb-16">
            <p className="swiss-label">Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Clientes Destacados
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
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
              <Card key={client} className="swiss-card text-center">
                <CardContent className="pt-8">
                  <p className="font-semibold">{client}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="swiss-section bg-secondary">
        <div className="container">
          <div className="text-center mb-16">
            <p className="swiss-label">Competencias</p>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Expertise Técnico
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Platforms */}
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Plataformas & Tecnologías
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">VTEX</span>
                    <span className="text-sm text-muted-foreground">
                      Experto
                    </span>
                  </div>
                  <div className="h-2 bg-muted">
                    <div className="h-full bg-foreground w-[95%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Shopify</span>
                    <span className="text-sm text-muted-foreground">
                      Avanzado
                    </span>
                  </div>
                  <div className="h-2 bg-muted">
                    <div className="h-full bg-foreground w-[85%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Magento</span>
                    <span className="text-sm text-muted-foreground">
                      Avanzado
                    </span>
                  </div>
                  <div className="h-2 bg-muted">
                    <div className="h-full bg-foreground w-[80%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">
                      Google Analytics & Tag Manager
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Experto
                    </span>
                  </div>
                  <div className="h-2 bg-muted">
                    <div className="h-full bg-foreground w-[90%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Habilidades Clave
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">
                      Estrategia Digital
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Experto
                    </span>
                  </div>
                  <div className="h-2 bg-muted">
                    <div className="h-full bg-foreground w-[95%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">
                      Análisis de Datos
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Avanzado
                    </span>
                  </div>
                  <div className="h-2 bg-muted">
                    <div className="h-full bg-foreground w-[90%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">UX/UI</span>
                    <span className="text-sm text-muted-foreground">
                      Avanzado
                    </span>
                  </div>
                  <div className="h-2 bg-muted">
                    <div className="h-full bg-foreground w-[85%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">
                      Project Management
                    </span>
                    <span className="text-sm text-muted-foreground">
                      Experto
                    </span>
                  </div>
                  <div className="h-2 bg-muted">
                    <div className="h-full bg-foreground w-[95%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Languages & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto mt-16">
            <Card className="swiss-card">
              <CardContent className="pt-8">
                <h3 className="text-xl font-semibold mb-4">Idiomas</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Español</span>
                    <span className="text-muted-foreground">Nativo</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Inglés</span>
                    <span className="text-muted-foreground">Fluido (C1)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Portugués</span>
                    <span className="text-muted-foreground">
                      Intermedio (B2)
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="swiss-card">
              <CardContent className="pt-8">
                <h3 className="text-xl font-semibold mb-4">Certificaciones</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Award size={16} className="mt-1 flex-shrink-0" />
                    <span>VTEX Certified Professional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award size={16} className="mt-1 flex-shrink-0" />
                    <span>Google Analytics Individual Qualification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award size={16} className="mt-1 flex-shrink-0" />
                    <span>Certified ScrumMaster (CSM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award size={16} className="mt-1 flex-shrink-0" />
                    <span>Digital Marketing Nanodegree - Udacity</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="swiss-section">
        <div className="container">
          <div className="text-center mb-16">
            <p className="swiss-label">Contacto</p>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Trabajemos Juntos
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              ¿Listo para llevar tu negocio al siguiente nivel? Agenda una
              consulta gratuita de 30 minutos.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="swiss-card">
              <CardContent className="pt-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="swiss-label">
                      Nombre *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      className="mt-2"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="swiss-label">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-2"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="swiss-label">
                      Empresa
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      className="mt-2"
                      placeholder="Tu empresa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service" className="swiss-label">
                      Servicio de Interés *
                    </Label>
                    <Select name="service" required>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecciona un servicio" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ecommerce">
                          Consultoría eCommerce & VTEX
                        </SelectItem>
                        <SelectItem value="marketplace">
                          Desarrollo de Marketplaces
                        </SelectItem>
                        <SelectItem value="leads">
                          Generación de Leads B2B
                        </SelectItem>
                        <SelectItem value="analytics">
                          Análisis de Datos y BI
                        </SelectItem>
                        <SelectItem value="omnichannel">
                          Estrategia Omnicanal
                        </SelectItem>
                        <SelectItem value="transformation">
                          Transformación Digital
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="message" className="swiss-label">
                      Mensaje *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="mt-2"
                      placeholder="Cuéntame sobre tu proyecto..."
                    />
                  </div>
                  <Button type="submit" className="swiss-button w-full">
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="swiss-card">
                <CardContent className="pt-8">
                  <h3 className="text-xl font-semibold mb-6">
                    Información de Contacto
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 border border-border flex items-center justify-center flex-shrink-0">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="swiss-label mb-1">Teléfono</p>
                        <a
                          href="tel:+573235812748"
                          className="hover:text-primary transition-colors"
                        >
                          +57 323 581 2748
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 border border-border flex items-center justify-center flex-shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="swiss-label mb-1">Ubicación</p>
                        <p>Bogotá D.C., Colombia</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 border border-border flex items-center justify-center flex-shrink-0">
                        <Linkedin size={20} />
                      </div>
                      <div>
                        <p className="swiss-label mb-1">LinkedIn</p>
                        <a
                          href="https://www.linkedin.com/in/juanpablofrancob/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          /in/juanpablofrancob
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="swiss-card">
                <CardContent className="pt-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Agenda una Consulta
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Reserva 30 minutos para discutir tu proyecto y explorar cómo
                    puedo ayudarte a alcanzar tus objetivos de negocio.
                  </p>
                  <Button className="swiss-button-outline w-full">
                    Agendar Llamada
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
