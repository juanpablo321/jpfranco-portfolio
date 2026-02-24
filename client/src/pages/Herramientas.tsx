import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, BarChart3, Zap, Shield } from "lucide-react";
import { Link } from "wouter";

const tools = [
  {
    title: "Inteligencia de Mercado",
    description:
      "Analiza cualquier sitio web y compáralo contra los líderes de tu industria en Colombia y Latinoamérica. Métricas reales de tráfico, benchmarking y análisis competitivo.",
    icon: Search,
    href: "/herramientas/inteligencia-de-mercado",
    available: true,
    features: [
      "Benchmarking de tráfico y engagement por industria",
      "Benchmarking vs. líderes de la industria",
      "Análisis de competidores directos",
      "Insights estratégicos con IA",
    ],
  },
  {
    title: "Auditor de Rendimiento",
    description:
      "Mide la velocidad de carga, Core Web Vitals y rendimiento general de tu sitio para mejorar la experiencia del usuario.",
    icon: Zap,
    href: "#",
    available: false,
    features: [
      "Lighthouse Performance Score",
      "First Contentful Paint",
      "Largest Contentful Paint",
      "Cumulative Layout Shift",
      "Recomendaciones de optimización",
    ],
  },
  {
    title: "Comparador de Competidores",
    description:
      "Compara las métricas SEO y de tráfico de tu sitio contra tus competidores directos.",
    icon: BarChart3,
    href: "#",
    available: false,
    features: [
      "Comparación lado a lado",
      "Ranking global y por país",
      "Fuentes de tráfico",
      "Bounce rate comparativo",
      "Análisis de gaps",
    ],
  },
  {
    title: "Verificador de Seguridad",
    description:
      "Verifica certificados SSL, headers de seguridad y vulnerabilidades comunes en tu sitio web.",
    icon: Shield,
    href: "#",
    available: false,
    features: [
      "Certificado SSL",
      "Security Headers",
      "Mixed Content",
      "HSTS Policy",
      "Content Security Policy",
    ],
  },
];

export default function Herramientas() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section
        className="pt-32 pb-20 text-white"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.40 0.18 310) 0%, oklch(0.50 0.20 310) 40%, oklch(0.55 0.18 330) 70%, oklch(0.60 0.16 50) 100%)",
        }}
      >
        <div className="container text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/80 mb-4">
            Herramientas Gratuitas
          </p>
          <h1 className="text-white mb-6">
            Herramientas de Marketing Digital
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Herramientas profesionales gratuitas para analizar, optimizar y
            mejorar tu presencia digital. Impulsadas por datos reales de
            benchmarks de industria e inteligencia artificial.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {tools.map((tool) => {
              const Icon = tool.icon;
              const innerContent = (
                <>
                  {!tool.available && (
                    <span className="absolute top-4 right-4 text-xs font-semibold uppercase tracking-wider bg-muted text-muted-foreground px-3 py-1 rounded-full">
                      Próximamente
                    </span>
                  )}

                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>

                  <h3 className="text-2xl font-semibold mb-3">{tool.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {tool.description}
                  </p>

                  <ul className="space-y-2">
                    {tool.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {tool.available && (
                    <div className="mt-6 pt-6 border-t">
                      <span className="text-primary font-semibold group-hover:underline">
                        Usar herramienta →
                      </span>
                    </div>
                  )}
                </>
              );

              const className = `group relative rounded-xl border bg-card p-8 transition-all duration-300 ${
                tool.available
                  ? "hover:shadow-lg hover:border-primary/30 cursor-pointer"
                  : "opacity-60 cursor-default"
              }`;

              if (tool.available) {
                return (
                  <Link key={tool.title} href={tool.href} className={className}>
                    {innerContent}
                  </Link>
                );
              }

              return (
                <div key={tool.title} className={className}>
                  {innerContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
