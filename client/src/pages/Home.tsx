/* Soft Modernism Home Page
 * Warm, approachable design with pastel colors
 * Generous rounded corners and soft shadows
 * Glassmorphism effects for contemporary feel
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
        className="min-h-screen flex items-center justify-center relative pt-24"
        style={{
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/yPRZm5yCh2zlUmi4ec7OzQ-img-1_1770759541000_na1fn_c29mdC1oZXJvLWdyYWRpZW50.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUU9aN3IyREZLSWZaV3lVd3hOaVlOcC9zYW5kYm94L3lQUlptNXlDaDJ6bFVtaTRlYzdPelEtaW1nLTFfMTc3MDc1OTU0MTAwMF9uYTFmbl9jMjltZEMxb1pYSnZMV2R5WVdScFpXNTAucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=upmCQXLieq83ETBeSFCEIo--XfiDmgtB7zVRNoc0udDjRBlLBEKrLZ51qtj670ahDXW2zCfkW-Fv69ope-Df1cbCdYVwDKB-zNTXYpNaEZFZJa-o0ItvdxwP-oW1FNy-c0L6lnuI097I1XYF7xbizc2ZJeCvaeLin1ejHuBvE3G~a6ZnTD24Dg3aO1KXhHK~Qp40cmlt0r8bIoMEfKKA21Vw5DfxlreGOxrkS1mFpc1uhoGvZjnoBWEayl8VtPRYmxoEDEkLuacnHcjg6Zl80kkmP1DyLLRq2AFWu3w6V2YkJWxORVnTICdHW2z-FB58tmDpI0yqJVAd8BZhPS8fxQ__')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="soft-label">Consultor Digital</p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight text-foreground">
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
                className="soft-button"
              >
                Agendar Consulta
              </Button>
              <Button
                onClick={() =>
                  document
                    .getElementById("servicios")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="soft-button-outline"
              >
                Ver Servicios
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto">
              <div className="glass-card p-6">
                <p className="text-3xl font-bold text-primary">+15</p>
                <p className="text-sm text-muted-foreground mt-2">Años Experiencia</p>
              </div>
              <div className="glass-card p-6">
                <p className="text-3xl font-bold text-primary">+100</p>
                <p className="text-sm text-muted-foreground mt-2">Proyectos</p>
              </div>
              <div className="glass-card p-6">
                <p className="text-3xl font-bold text-primary">Global</p>
                <p className="text-sm text-muted-foreground mt-2">Clientes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="soft-section">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <p className="soft-label">Sobre Mí</p>
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
            <Card className="soft-card text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Enfoque en Resultados
                </h3>
                <p className="text-muted-foreground">
                  Estrategias basadas en datos con KPIs claros y ROI medible
                </p>
              </CardContent>
            </Card>
            <Card className="soft-card text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Crecimiento Escalable
                </h3>
                <p className="text-muted-foreground">
                  Soluciones diseñadas para crecer con tu negocio
                </p>
              </CardContent>
            </Card>
            <Card className="soft-card text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
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
      <section id="servicios" className="soft-section soft-gradient-1">
        <div className="container">
          <div className="text-center mb-16">
            <p className="soft-label">Servicios</p>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Soluciones de Comercio Digital
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <Card className="soft-card">
              <CardContent className="pt-8">
                <img
                  src="https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/yPRZm5yCh2zlUmi4ec7OzQ-img-3_1770759530000_na1fn_c29mdC1pY29uLWVjb21tZXJjZQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUU9aN3IyREZLSWZaV3lVd3hOaVlOcC9zYW5kYm94L3lQUlptNXlDaDJ6bFVtaTRlYzdPelEtaW1nLTNfMTc3MDc1OTUzMDAwMF9uYTFmbl9jMjltZEMxcFkyOXVMV1ZqYjIxdFpYSmpaUS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=mhkC4~G6tvtPCqgMaHSw7MLuKfN28yk8ikxwnpAi~Mwot35Y-p444TchmmHeV2sKkC~BfV8DKSrC4tdbjrbZ-f7xh1tYNWT-dRhZxTBQu0JDu~voaTMPgmE4z6DgUu5iz~EWiCnaG23E4guK0FZwInVD4k3CyaN5KZPr7HI6tauzgAq3obXPswjVxvTCsccLovs8-8xeGItIhPQPgQTwSxzPAI7SrmIgZu-6p6u2M6e6y665eqnNevoUMjiBgKUj5qEqJIWBU6MxDccr-fYRuLtauN7OHa6mGaRKywfPTJwDaaNrv4aD34cYZtA0RC0AEz2fsXA1bGfN6JInXUtVXA__"
                  alt="eCommerce Icon"
                  className="w-20 h-20 mb-6"
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
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Auditoría y estrategia eCommerce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Implementación VTEX end-to-end</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Optimización de conversión (CRO)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 2 */}
            <Card className="soft-card">
              <CardContent className="pt-8">
                <img
                  src="https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/yPRZm5yCh2zlUmi4ec7OzQ-img-4_1770759525000_na1fn_c29mdC1pY29uLW1hcmtldHBsYWNl.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUU9aN3IyREZLSWZaV3lVd3hOaVlOcC9zYW5kYm94L3lQUlptNXlDaDJ6bFVtaTRlYzdPelEtaW1nLTRfMTc3MDc1OTUyNTAwMF9uYTFmbl9jMjltZEMxcFkyOXVMVzFoY210bGRIQnNZV05sLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=CD8ivgwCuStEONA9S5nroGXOo3vzWTFu0BpeQ8Bz6ytusNgyS2~y5PItKAl~h2F3DltfElp8RN3zkV7QVi00eQOu6qO4DJZceyGvMwGQBbh0CaWC3FJKcBd6IFsS2GFmiwv14k0Hy2eLQGex0-ddv7YMHNr7a9wYuq6QbK~XEpMNenEx1BM-HTueQgzwIA-ASw5IgKuLUQC43LtR5l6GdHWYStYOatHdbE2s2OxaBfgkt~PJl7iUX2N3HsUn-DW2Y~mP518zss8Gr0H93QMFQcs0gxTf-1l83UzLfmB6OBv-SbZXTkfy4RUa8y5gZUZSjd5p2~PSRRFvVdDl6ELPXA__"
                  alt="Marketplace Icon"
                  className="w-20 h-20 mb-6"
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
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Arquitectura de marketplace</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Onboarding de sellers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Gestión de catálogos multi-vendor</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 3 */}
            <Card className="soft-card">
              <CardContent className="pt-8">
                <img
                  src="https://private-us-east-1.manuscdn.com/sessionFile/QOZ7r2DFKIfZWyUwxNiYNp/sandbox/yPRZm5yCh2zlUmi4ec7OzQ-img-5_1770759541000_na1fn_c29mdC1pY29uLWxlYWRz.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUU9aN3IyREZLSWZaV3lVd3hOaVlOcC9zYW5kYm94L3lQUlptNXlDaDJ6bFVtaTRlYzdPelEtaW1nLTVfMTc3MDc1OTU0MTAwMF9uYTFmbl9jMjltZEMxcFkyOXVMV3hsWVdSei5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=KdU875USQWj-Skh42iLmXpC67CNWLiliz8XDM71xb3k6EvVF85cgAnLIrDJFOybAVBbJ~LaguOmdeZu1VIca7~sp-hxA0cXOHNbCsCZ0iK0Z0AxHZLIhnoknqB22BiId0E3jP2iN3RsSCAITtKQOvLMOqHvMRIaeo9GNx-HIuKa5QZ1uvXKqKhsO0YBYPHOV9KVjuC1CenXxREJde-WlfmeqxMYiFmCzC796khJTxGitCzxB~abk4ymXvygm1FzuqtrYBuSXojNUHT8DXahRCy0onmg6dWuJhy87N4ICAuAj6z-BtA3JDXWZVZKhsFtsGlucAr-H32y7EVBGpSx4dg__"
                  alt="B2B Icon"
                  className="w-20 h-20 mb-6"
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
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Estrategia de contenido B2B</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Marketing automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Optimización de funnel de ventas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 4 */}
            <Card className="soft-card">
              <CardContent className="pt-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                  <BarChart3 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  Análisis de Datos y BI
                </h3>
                <p className="text-muted-foreground mb-4">
                  Implementación de dashboards y análisis de datos para toma de
                  decisiones basadas en métricas clave.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Dashboards personalizados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Análisis de comportamiento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Reportes de performance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 5 */}
            <Card className="soft-card">
              <CardContent className="pt-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-6">
                  <ShoppingCart className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  Estrategia Omnicanal
                </h3>
                <p className="text-muted-foreground mb-4">
                  Integración de canales online y offline para experiencia de
                  cliente unificada y sin fricciones.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Integración de sistemas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Unified commerce</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Customer journey mapping</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Service 6 */}
            <Card className="soft-card">
              <CardContent className="pt-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6">
                  <Building2 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">
                  Transformación Digital
                </h3>
                <p className="text-muted-foreground mb-4">
                  Acompañamiento en procesos de digitalización empresarial y
                  adopción de nuevas tecnologías.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Roadmap de digitalización</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Change management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Capacitación de equipos</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experiencia" className="soft-section">
        <div className="container">
          <div className="text-center mb-16">
            <p className="soft-label">Trayectoria</p>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Experiencia Profesional
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Experience 1 */}
            <Card className="soft-card">
              <CardContent className="pt-8">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-full bg-gradient-to-b from-primary to-accent rounded-full"></div>
                  <div className="flex-1">
                    <p className="soft-label">2020 - Presente</p>
                    <h3 className="text-2xl font-semibold mt-2 mb-2">
                      Consultor Independiente
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Estrategia Digital & eCommerce
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                        <span>
                          Liderazgo de +50 proyectos de implementación VTEX para
                          empresas Fortune 500
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                        <span>
                          Desarrollo de marketplaces B2B con GMV superior a $10M USD
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
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
            <Card className="soft-card">
              <CardContent className="pt-8">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-full bg-gradient-to-b from-accent to-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="soft-label">2015 - 2020</p>
                    <h3 className="text-2xl font-semibold mt-2 mb-2">
                      Director de eCommerce
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Empresa Multinacional FMCG
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                        <span>
                          Gestión de equipo de 15 personas en 3 países de LATAM
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                        <span>
                          Crecimiento de ventas online del 300% en 3 años
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
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
            <Card className="soft-card">
              <CardContent className="pt-8">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-full bg-gradient-to-b from-primary to-accent rounded-full"></div>
                  <div className="flex-1">
                    <p className="soft-label">2010 - 2015</p>
                    <h3 className="text-2xl font-semibold mt-2 mb-2">
                      Gerente de Marketing Digital
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Agencia de Marketing Digital
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                        <span>
                          Gestión de portafolio de 30+ clientes en retail y eCommerce
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
                        <span>
                          Desarrollo de estrategias SEO/SEM con ROI promedio del 400%
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={16} className="mt-1 flex-shrink-0 text-primary" />
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

      {/* Clients Section */}
      <section id="clientes" className="soft-section soft-gradient-2">
        <div className="container">
          <div className="text-center mb-16">
            <p className="soft-label">Portfolio</p>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Clientes Destacados
            </h2>
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
              <Card key={client} className="soft-card text-center">
                <CardContent className="pt-6">
                  <p className="font-semibold text-foreground">{client}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="soft-section">
        <div className="container">
          <div className="text-center mb-16">
            <p className="soft-label">Competencias</p>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Expertise Técnico
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Platforms */}
            <Card className="soft-card">
              <CardContent className="pt-8">
                <h3 className="text-xl font-semibold mb-6">
                  Plataformas & Tecnologías
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">VTEX</span>
                      <span className="text-sm text-primary">Experto</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent w-[95%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Shopify</span>
                      <span className="text-sm text-primary">Avanzado</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent w-[85%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Magento</span>
                      <span className="text-sm text-primary">Avanzado</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent w-[80%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        Google Analytics & Tag Manager
                      </span>
                      <span className="text-sm text-primary">Experto</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-accent w-[90%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="soft-card">
              <CardContent className="pt-8">
                <h3 className="text-xl font-semibold mb-6">
                  Habilidades Clave
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        Estrategia Digital
                      </span>
                      <span className="text-sm text-primary">Experto</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent to-primary w-[95%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        Análisis de Datos
                      </span>
                      <span className="text-sm text-primary">Avanzado</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent to-primary w-[90%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">UX/UI</span>
                      <span className="text-sm text-primary">Avanzado</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent to-primary w-[85%] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        Project Management
                      </span>
                      <span className="text-sm text-primary">Experto</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-accent to-primary w-[95%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Languages & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
            <Card className="soft-card">
              <CardContent className="pt-8">
                <h3 className="text-xl font-semibold mb-4">Idiomas</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span>Español</span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      Nativo
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Inglés</span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      Fluido (C1)
                    </span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Portugués</span>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      Intermedio (B2)
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="soft-card">
              <CardContent className="pt-8">
                <h3 className="text-xl font-semibold mb-4">Certificaciones</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Award size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>VTEX Certified Professional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Google Analytics Individual Qualification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Certified ScrumMaster (CSM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award size={16} className="mt-1 flex-shrink-0 text-primary" />
                    <span>Digital Marketing Nanodegree - Udacity</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="soft-section soft-gradient-1">
        <div className="container">
          <div className="text-center mb-16">
            <p className="soft-label">Contacto</p>
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
            <Card className="soft-card">
              <CardContent className="pt-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="soft-label mb-2 block">
                      Nombre *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      className="rounded-xl"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="soft-label mb-2 block">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="rounded-xl"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="soft-label mb-2 block">
                      Empresa
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      className="rounded-xl"
                      placeholder="Tu empresa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service" className="soft-label mb-2 block">
                      Servicio de Interés *
                    </Label>
                    <Select name="service" required>
                      <SelectTrigger className="rounded-xl">
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
                    <Label htmlFor="message" className="soft-label mb-2 block">
                      Mensaje *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="rounded-xl"
                      placeholder="Cuéntame sobre tu proyecto..."
                    />
                  </div>
                  <Button type="submit" className="soft-button w-full">
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="soft-card">
                <CardContent className="pt-8">
                  <h3 className="text-xl font-semibold mb-6">
                    Información de Contacto
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                        <Phone size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="soft-label mb-1">Teléfono</p>
                        <a
                          href="tel:+573235812748"
                          className="hover:text-primary transition-colors"
                        >
                          +57 323 581 2748
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center flex-shrink-0">
                        <MapPin size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="soft-label mb-1">Ubicación</p>
                        <p>Bogotá D.C., Colombia</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                        <Linkedin size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="soft-label mb-1">LinkedIn</p>
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

              <Card className="soft-card">
                <CardContent className="pt-8">
                  <h3 className="text-xl font-semibold mb-4">
                    Agenda una Consulta
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Reserva 30 minutos para discutir tu proyecto y explorar cómo
                    puedo ayudarte a alcanzar tus objetivos de negocio.
                  </p>
                  <Button className="soft-button-outline w-full">
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
