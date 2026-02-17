/**
 * Individual Glossary Term Page — Expanded
 * Displays a single term with extended definition, examples, references,
 * illustrative charts, and navigation
 * Orange/purple palette
 */

import { useEffect, useRef, useMemo } from "react";
import { Link, useParams, useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  Tag,
  ArrowRight,
  Lightbulb,
  Quote,
  BarChart3,
  ExternalLink,
  CheckCircle2,
  BookMarked,
  Wrench,
  FileText,
  GraduationCap,
  Layers,
} from "lucide-react";
import {
  getTermBySlug,
  getRelatedTerms,
  getAdjacentTerms,
  getAvailableLetters,
  getTermsByLetter,
} from "@/data/glossaryData";
import { extendedGlossary } from "@/data/glossaryExtended";
import type { ChartData, Reference } from "@/data/glossaryExtended";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function ReferenceIcon({ type }: { type: Reference["type"] }) {
  switch (type) {
    case "libro":
      return <BookMarked className="w-4 h-4" />;
    case "herramienta":
      return <Wrench className="w-4 h-4" />;
    case "estudio":
      return <FileText className="w-4 h-4" />;
    case "artículo":
      return <FileText className="w-4 h-4" />;
    case "framework":
      return <Layers className="w-4 h-4" />;
    default:
      return <BookOpen className="w-4 h-4" />;
  }
}

function ReferenceTypeLabel({ type }: { type: Reference["type"] }) {
  const labels: Record<string, string> = {
    libro: "Libro",
    herramienta: "Herramienta",
    estudio: "Estudio",
    artículo: "Artículo",
    framework: "Framework",
  };
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
      {labels[type] || type}
    </span>
  );
}

function GlossaryChart({ chartData }: { chartData: ChartData }) {
  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            padding: 16,
            usePointStyle: true,
            font: { size: 12 },
          },
        },
        tooltip: {
          backgroundColor: "rgba(0,0,0,0.8)",
          padding: 12,
          titleFont: { size: 13 },
          bodyFont: { size: 12 },
          cornerRadius: 8,
        },
      },
      scales:
        chartData.type === "pie" || chartData.type === "doughnut"
          ? undefined
          : {
              x: {
                grid: { display: false },
                ticks: { font: { size: 11 } },
              },
              y: {
                grid: { color: "rgba(0,0,0,0.06)" },
                ticks: { font: { size: 11 } },
                beginAtZero: true,
              },
            },
    }),
    [chartData.type]
  );

  const data = useMemo(
    () => ({
      labels: chartData.labels,
      datasets: chartData.datasets.map((ds) => ({
        ...ds,
        borderWidth: chartData.type === "line" ? 2 : 0,
        tension: 0.4,
        fill: chartData.type === "line" ? true : false,
        pointRadius: chartData.type === "line" ? 4 : undefined,
        pointHoverRadius: chartData.type === "line" ? 6 : undefined,
        borderRadius: chartData.type === "bar" || chartData.type === "horizontalBar" ? 6 : undefined,
      })),
    }),
    [chartData]
  );

  const horizontalOptions = useMemo(
    () => ({
      ...chartOptions,
      indexAxis: "y" as const,
    }),
    [chartOptions]
  );

  switch (chartData.type) {
    case "bar":
      return <Bar data={data} options={chartOptions} />;
    case "horizontalBar":
      return <Bar data={data} options={horizontalOptions} />;
    case "line":
      return <Line data={data} options={chartOptions} />;
    case "pie":
      return <Pie data={data} options={chartOptions} />;
    case "doughnut":
      return <Doughnut data={data} options={chartOptions} />;
    default:
      return <Bar data={data} options={chartOptions} />;
  }
}

export default function GlossaryTermPage() {
  const { slug } = useParams<{ slug: string }>();
  const [, setLocation] = useLocation();

  const term = slug ? getTermBySlug(slug) : undefined;
  const adjacent = slug ? getAdjacentTerms(slug) : { prev: null, next: null };
  const relatedTerms = term?.relatedTerms
    ? getRelatedTerms(term.relatedTerms)
    : [];

  const extended = slug ? extendedGlossary[slug] : undefined;

  const availableLetters = getAvailableLetters();
  const termsByLetter = getTermsByLetter();
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const currentLetter = term ? term.term[0].toUpperCase() : "";

  // Set page title and scroll to top
  useEffect(() => {
    if (term) {
      document.title = `${term.term} - Glosario | Juan Pablo Franco`;
    }
    window.scrollTo(0, 0);
  }, [term, slug]);

  // 404 if term not found
  if (!term) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container pt-32 pb-20 text-center">
          <div className="w-20 h-20 rounded-full bg-muted mx-auto mb-6 flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Término no encontrado</h1>
          <p className="text-muted-foreground mb-8 text-lg">
            El término que buscas no existe en nuestro glosario.
          </p>
          <Link href="/glosario">
            <Button className="bg-primary hover:bg-primary/90">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Glosario
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section
        className="pt-32 pb-16 text-white relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.40 0.18 310) 0%, oklch(0.50 0.20 310) 40%, oklch(0.55 0.18 330) 70%, oklch(0.60 0.16 50) 100%)",
        }}
      >
        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/70 text-sm mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link
                href="/glosario"
                className="hover:text-white transition-colors"
              >
                Glosario
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{term.term}</span>
            </nav>

            {/* Category badge */}
            {term.category && (
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium bg-white/15 text-white rounded-full mb-4">
                <Tag className="w-3.5 h-3.5" />
                {term.category}
              </span>
            )}

            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
              {term.term}
            </h1>
          </div>
        </div>
      </section>

      {/* A-Z Navigation Bar */}
      <section className="py-6 bg-background border-b sticky top-[72px] z-30">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/glosario">
              <button className="px-4 h-10 rounded-lg font-semibold transition-all text-sm bg-primary/10 text-primary hover:bg-primary/20">
                Todos
              </button>
            </Link>
            {alphabet.map((letter) => {
              const isAvailable = availableLetters.includes(letter);
              const isCurrent = letter === currentLetter;
              const termsForLetter = termsByLetter[letter];
              return (
                <div key={letter} className="relative group">
                  <button
                    disabled={!isAvailable}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                      isAvailable
                        ? isCurrent
                          ? "bg-primary text-white shadow-lg scale-110"
                          : "bg-primary/10 text-primary hover:bg-primary/20 hover:scale-105"
                        : "bg-muted text-muted-foreground/30 cursor-not-allowed"
                    }`}
                  >
                    {letter}
                  </button>
                  {isAvailable && termsForLetter && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-xl border border-border p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                      <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
                        Letra {letter} — {termsForLetter.length} término
                        {termsForLetter.length !== 1 ? "s" : ""}
                      </p>
                      <div className="max-h-48 overflow-y-auto space-y-1">
                        {termsForLetter.map((t) => (
                          <Link
                            key={t.slug}
                            href={`/glosario/${t.slug}`}
                          >
                            <div
                              className={`px-3 py-1.5 rounded-md text-sm transition-colors cursor-pointer ${
                                t.slug === slug
                                  ? "bg-primary/10 text-primary font-medium"
                                  : "hover:bg-muted text-foreground/80"
                              }`}
                            >
                              {t.term}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Definition Card */}
            <Card className="corp-card mb-10 overflow-hidden">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold">Definición</h2>
                </div>
                <p className="text-lg leading-relaxed text-foreground/90 mb-0">
                  {extended
                    ? extended.extendedDefinition
                    : term.definition}
                </p>
              </CardContent>
            </Card>

            {/* Key Points */}
            {extended?.keyPoints && extended.keyPoints.length > 0 && (
              <Card className="corp-card mb-10 overflow-hidden">
                <CardContent className="pt-8 pb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-semibold">Puntos Clave</h2>
                  </div>
                  <ul className="space-y-4">
                    {extended.keyPoints.map((point, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span
                          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                          style={{
                            background:
                              "linear-gradient(135deg, oklch(0.65 0.18 50), oklch(0.55 0.20 310))",
                          }}
                        >
                          {i + 1}
                        </span>
                        <p className="text-foreground/85 leading-relaxed">
                          {point}
                        </p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Illustrative Chart */}
            {extended?.chart && (
              <Card className="corp-card mb-10 overflow-hidden">
                <CardContent className="pt-8 pb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">
                        Datos Ilustrativos
                      </h2>
                      {extended.chart.source && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                          Fuente: {extended.chart.source}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-border/50">
                    <h3 className="text-center text-sm font-semibold text-foreground/70 mb-4">
                      {extended.chart.title}
                    </h3>
                    <div
                      className={`mx-auto ${
                        extended.chart.type === "pie" ||
                        extended.chart.type === "doughnut"
                          ? "max-w-sm"
                          : "max-w-2xl"
                      }`}
                    >
                      <GlossaryChart chartData={extended.chart} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Example / Case Study */}
            {extended?.example && (
              <Card className="corp-card mb-10 overflow-hidden border-l-4 border-l-primary">
                <CardContent className="pt-8 pb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold">Caso de Estudio</h2>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {extended.example.title}
                      </p>
                    </div>
                  </div>
                  <p className="text-foreground/85 leading-relaxed text-lg">
                    {extended.example.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Pro Tip */}
            {extended?.proTip && (
              <div
                className="mb-10 rounded-xl p-6 border"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.97 0.02 50), oklch(0.96 0.03 310))",
                  borderColor: "oklch(0.85 0.08 50)",
                }}
              >
                <div className="flex gap-4 items-start">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.18 50), oklch(0.55 0.20 310))",
                    }}
                  >
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: "oklch(0.45 0.15 50)" }}>
                      Pro Tip
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      {extended.proTip}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* References */}
            {extended?.references && extended.references.length > 0 && (
              <Card className="corp-card mb-10 overflow-hidden">
                <CardContent className="pt-8 pb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <BookMarked className="w-5 h-5 text-purple-600" />
                    </div>
                    <h2 className="text-2xl font-semibold">
                      Referencias y Recursos
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {extended.references.map((ref, i) => (
                      <div
                        key={i}
                        className="flex gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center flex-shrink-0 border border-border/50">
                          <ReferenceIcon type={ref.type} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h4 className="font-semibold text-foreground">
                              {ref.title}
                            </h4>
                            <ReferenceTypeLabel type={ref.type} />
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {ref.author}
                          </p>
                          <p className="text-sm text-foreground/70 leading-relaxed">
                            {ref.description}
                          </p>
                          {ref.url && (
                            <a
                              href={ref.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 mt-2 font-medium"
                            >
                              Visitar recurso
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Related Terms */}
            {relatedTerms.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">
                  Términos Relacionados
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedTerms.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/glosario/${related.slug}`}
                    >
                      <Card className="corp-card cursor-pointer group hover:shadow-md hover:border-primary/30 transition-all h-full">
                        <CardContent className="pt-5 pb-5">
                          <h3 className="font-semibold text-primary group-hover:text-primary/80 transition-colors mb-1 text-base">
                            {related.term}
                          </h3>
                          {related.category && (
                            <span className="text-xs text-muted-foreground">
                              {related.category}
                            </span>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation between terms */}
            <div className="flex items-center justify-between gap-4 pt-8 border-t">
              {adjacent.prev ? (
                <Link
                  href={`/glosario/${adjacent.prev.slug}`}
                  className="flex items-center gap-3 group max-w-[45%]"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors flex-shrink-0">
                    <ChevronLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">
                      Anterior
                    </p>
                    <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                      {adjacent.prev.term}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              <Link href="/glosario">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Ver todos
                </Button>
              </Link>

              {adjacent.next ? (
                <Link
                  href={`/glosario/${adjacent.next.slug}`}
                  className="flex items-center gap-3 group max-w-[45%]"
                >
                  <div className="text-right min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">
                      Siguiente
                    </p>
                    <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                      {adjacent.next.term}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-2xl font-semibold mb-4">
            ¿Necesitas ayuda con tu estrategia digital?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Con más de 15 años de experiencia en eCommerce y marketing digital,
            puedo ayudarte a implementar estas estrategias en tu negocio.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/#contacto">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
                Agendar Consultoría
              </Button>
            </Link>
            <Link href="/glosario">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-3"
              >
                Explorar Glosario
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
