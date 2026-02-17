import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Search,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  XCircle,
  Globe,
  Clock,
  FileText,
  Image,
  Link2,
  Shield,
  Smartphone,
  Share2,
  TrendingUp,
  BarChart3,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { Link } from "wouter";

// ─── Score Circle Component ──────────────────────────────────────────────────

function ScoreCircle({
  score,
  label,
  size = 120,
  unavailable = false,
}: {
  score: number;
  label: string;
  size?: number;
  unavailable?: boolean;
}) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const displayScore = unavailable ? 0 : score;
  const offset = circumference - (displayScore / 100) * circumference;
  const color =
    displayScore >= 80
      ? "oklch(0.65 0.20 145)"
      : displayScore >= 50
        ? "oklch(0.75 0.18 85)"
        : displayScore > 0
          ? "oklch(0.60 0.22 25)"
          : "oklch(0.85 0 0)";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="oklch(0.90 0 0)"
            strokeWidth="8"
          />
          {!unavailable && (
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 1s ease-out" }}
            />
          )}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {unavailable ? (
            <span className="text-sm font-medium text-muted-foreground">N/D</span>
          ) : (
            <span className="text-2xl font-bold">{score}</span>
          )}
        </div>
      </div>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

// ─── Issue Badge ─────────────────────────────────────────────────────────────

function IssueBadge({ type }: { type: "critical" | "warning" | "info" }) {
  if (type === "critical")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
        <XCircle size={12} /> Crítico
      </span>
    );
  if (type === "warning")
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
        <AlertTriangle size={12} /> Advertencia
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
      <Info size={12} /> Info
    </span>
  );
}

// ─── Check Item ──────────────────────────────────────────────────────────────

function CheckItem({
  label,
  passed,
  detail,
}: {
  label: string;
  passed: boolean;
  detail?: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0">
      {passed ? (
        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
      ) : (
        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
      )}
      <div>
        <p className="font-medium text-sm">{label}</p>
        {detail && (
          <p className="text-xs text-muted-foreground mt-0.5">{detail}</p>
        )}
      </div>
    </div>
  );
}

// ─── Metric Card ─────────────────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number | null;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-primary" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-lg font-bold">
        {value !== null && value !== undefined ? String(value) : "N/A"}
      </p>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function SeoAnalyzer() {
  const [url, setUrl] = useState("");
  const [activeTab, setActiveTab] = useState<
    "overview" | "technical" | "speed" | "traffic" | "issues"
  >("overview");

  const analyzeMutation = trpc.seoAnalyzer.analyze.useMutation();

  const handleAnalyze = () => {
    if (!url.trim()) return;
    analyzeMutation.mutate({ url: url.trim() });
  };

  const data = analyzeMutation.data;
  const isLoading = analyzeMutation.isPending;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero / Input Section */}
      <section
        className="pt-32 pb-16 text-white"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.40 0.18 310) 0%, oklch(0.50 0.20 310) 40%, oklch(0.55 0.18 330) 70%, oklch(0.60 0.16 50) 100%)",
        }}
      >
        <div className="container">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/herramientas" className="text-white/70 hover:text-white text-sm flex items-center gap-1">
              <ArrowLeft size={14} /> Herramientas
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white/90 text-sm">Analizador de SEO</span>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-white mb-4">Analizador de SEO</h1>
            <p className="text-lg text-white/90 mb-8">
              Ingresa cualquier URL y obtén un análisis completo de SEO con
              score, velocidad, meta tags, estructura y datos de tráfico.
            </p>

            {/* URL Input */}
            <div className="flex gap-3 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                  placeholder="ejemplo.com"
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-foreground bg-white text-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  disabled={isLoading}
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isLoading || !url.trim()}
                className="px-8 py-4 text-lg bg-primary hover:bg-primary/90 text-white rounded-xl h-auto"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                <span className="ml-2">Analizar</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && (
        <section className="py-20">
          <div className="container text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-2">
              Analizando {url}...
            </h3>
            <p className="text-muted-foreground">
              Esto puede tomar entre 15-60 segundos. Estamos analizando la
              estructura HTML, velocidad con Google PageSpeed y datos de tráfico
              con SimilarWeb.
            </p>
          </div>
        </section>
      )}

      {/* Error State */}
      {analyzeMutation.isError && (
        <section className="py-12">
          <div className="container max-w-2xl mx-auto">
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
              <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Error al analizar
              </h3>
              <p className="text-red-600 text-sm">
                {analyzeMutation.error?.message ||
                  "No se pudo completar el análisis. Verifica la URL e intenta de nuevo."}
              </p>
              <Button
                onClick={handleAnalyze}
                variant="outline"
                className="mt-4"
              >
                Reintentar
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {data && !isLoading && (
        <section className="py-12">
          <div className="container max-w-6xl mx-auto">
            {/* Overall Score Header */}
            <div className="rounded-xl border bg-card p-8 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <ScoreCircle
                  score={data.overallScore}
                  label="Score General"
                  size={140}
                />
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold mb-2">{data.domain}</h2>
                  <p className="text-muted-foreground mb-4">
                    Analizado el{" "}
                    {new Date(data.analyzedAt).toLocaleDateString("es-CO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <span className="inline-flex items-center gap-1 text-sm">
                      <XCircle size={14} className="text-red-500" />
                      {data.crawl.issues.filter((i) => i.type === "critical").length}{" "}
                      Críticos
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm">
                      <AlertTriangle size={14} className="text-amber-500" />
                      {data.crawl.issues.filter((i) => i.type === "warning").length}{" "}
                      Advertencias
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm">
                      <Info size={14} className="text-blue-500" />
                      {data.crawl.issues.filter((i) => i.type === "info").length}{" "}
                      Info
                    </span>
                  </div>
                </div>
                <div className="flex gap-6">
                  <ScoreCircle
                    score={data.pageSpeed.performanceScore}
                    label="Rendimiento"
                    size={90}
                    unavailable={data.pageSpeed.performanceScore === 0 && data.pageSpeed.seoScore === 0 && data.pageSpeed.accessibilityScore === 0}
                  />
                  <ScoreCircle
                    score={data.pageSpeed.seoScore}
                    label="SEO"
                    size={90}
                    unavailable={data.pageSpeed.performanceScore === 0 && data.pageSpeed.seoScore === 0 && data.pageSpeed.accessibilityScore === 0}
                  />
                  <ScoreCircle
                    score={data.pageSpeed.accessibilityScore}
                    label="Accesibilidad"
                    size={90}
                    unavailable={data.pageSpeed.performanceScore === 0 && data.pageSpeed.seoScore === 0 && data.pageSpeed.accessibilityScore === 0}
                  />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-8 overflow-x-auto pb-2 border-b">
              {[
                { id: "overview" as const, label: "Resumen", icon: BarChart3 },
                { id: "technical" as const, label: "Técnico", icon: FileText },
                { id: "speed" as const, label: "Velocidad", icon: Clock },
                { id: "traffic" as const, label: "Tráfico", icon: TrendingUp },
                { id: "issues" as const, label: "Problemas", icon: AlertTriangle },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                  {tab.id === "issues" && (
                    <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs bg-red-100 text-red-700">
                      {data.crawl.issues.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-8">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <>
                  {/* Quick Checks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-xl border bg-card p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-primary" />
                        Verificaciones Básicas
                      </h3>
                      <CheckItem
                        label="HTTPS habilitado"
                        passed={data.crawl.hasHttps}
                        detail={
                          data.crawl.hasHttps
                            ? "El sitio usa conexión segura"
                            : "El sitio no usa HTTPS"
                        }
                      />
                      <CheckItem
                        label="Meta viewport"
                        passed={data.crawl.hasViewport}
                        detail="Compatibilidad con dispositivos móviles"
                      />
                      <CheckItem
                        label="Robots.txt"
                        passed={data.crawl.hasRobotsTxt}
                        detail="Control de rastreo para buscadores"
                      />
                      <CheckItem
                        label="Sitemap.xml"
                        passed={data.crawl.hasSitemap}
                        detail="Mapa del sitio para indexación"
                      />
                      <CheckItem
                        label="Favicon"
                        passed={data.crawl.hasFavicon}
                        detail="Icono de la pestaña del navegador"
                      />
                    </div>

                    <div className="rounded-xl border bg-card p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Meta Tags
                      </h3>
                      <CheckItem
                        label="Title tag"
                        passed={data.crawl.title.length > 0}
                        detail={
                          data.crawl.title
                            ? `"${data.crawl.title.substring(0, 60)}${data.crawl.title.length > 60 ? "..." : ""}" (${data.crawl.title.length} caracteres)`
                            : "No encontrado"
                        }
                      />
                      <CheckItem
                        label="Meta description"
                        passed={data.crawl.metaDescription.length > 0}
                        detail={
                          data.crawl.metaDescription
                            ? `${data.crawl.metaDescription.length} caracteres`
                            : "No encontrada"
                        }
                      />
                      <CheckItem
                        label="Canonical URL"
                        passed={data.crawl.canonical.length > 0}
                        detail={data.crawl.canonical || "No encontrada"}
                      />
                      <CheckItem
                        label="Open Graph tags"
                        passed={Object.keys(data.crawl.ogTags).length > 0}
                        detail={`${Object.keys(data.crawl.ogTags).length} tags encontrados`}
                      />
                    </div>
                  </div>

                  {/* Content Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <MetricCard
                      label="Palabras"
                      value={data.crawl.wordCount.toLocaleString()}
                      icon={FileText}
                    />
                    <MetricCard
                      label="Imágenes"
                      value={`${data.crawl.totalImages} (${data.crawl.imgWithoutAlt} sin alt)`}
                      icon={Image}
                    />
                    <MetricCard
                      label="Links internos"
                      value={data.crawl.internalLinks}
                      icon={Link2}
                    />
                    <MetricCard
                      label="Links externos"
                      value={data.crawl.externalLinks}
                      icon={Globe}
                    />
                  </div>

                  {/* Headings Structure */}
                  <div className="rounded-xl border bg-card p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Estructura de Encabezados
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          H1 ({data.crawl.h1Tags.length})
                        </span>
                        {data.crawl.h1Tags.length > 0 ? (
                          <ul className="mt-1 space-y-1">
                            {data.crawl.h1Tags.map((h, i) => (
                              <li key={i} className="text-sm pl-4 border-l-2 border-primary">
                                {h}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-red-500 mt-1">
                            No se encontraron H1
                          </p>
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          H2 ({data.crawl.h2Tags.length})
                        </span>
                        {data.crawl.h2Tags.length > 0 ? (
                          <ul className="mt-1 space-y-1">
                            {data.crawl.h2Tags.slice(0, 10).map((h, i) => (
                              <li key={i} className="text-sm pl-4 border-l-2 border-primary/50">
                                {h}
                              </li>
                            ))}
                            {data.crawl.h2Tags.length > 10 && (
                              <li className="text-sm text-muted-foreground pl-4">
                                ... y {data.crawl.h2Tags.length - 10} más
                              </li>
                            )}
                          </ul>
                        ) : (
                          <p className="text-sm text-muted-foreground mt-1">
                            No se encontraron H2
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Technical Tab */}
              {activeTab === "technical" && (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <MetricCard
                      label="Tamaño HTML"
                      value={`${(data.crawl.htmlSize / 1024).toFixed(0)} KB`}
                      icon={FileText}
                    />
                    <MetricCard
                      label="Tiempo de carga"
                      value={`${(data.crawl.loadTimeMs / 1000).toFixed(1)}s`}
                      icon={Clock}
                    />
                    <MetricCard
                      label="Encabezados H1"
                      value={data.crawl.h1Tags.length}
                      icon={FileText}
                    />
                    <MetricCard
                      label="Encabezados H2"
                      value={data.crawl.h2Tags.length}
                      icon={FileText}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="rounded-xl border bg-card p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-primary" />
                        Mobile & Accesibilidad
                      </h3>
                      <CheckItem
                        label="Meta viewport configurado"
                        passed={data.crawl.hasViewport}
                      />
                      <CheckItem
                        label="Imágenes con alt text"
                        passed={data.crawl.imgWithoutAlt === 0}
                        detail={
                          data.crawl.imgWithoutAlt > 0
                            ? `${data.crawl.imgWithoutAlt} imágenes sin alt`
                            : "Todas las imágenes tienen alt"
                        }
                      />
                      <CheckItem
                        label="Score accesibilidad > 80"
                        passed={data.pageSpeed.accessibilityScore >= 80}
                        detail={`Score: ${data.pageSpeed.accessibilityScore}/100`}
                      />
                    </div>

                    <div className="rounded-xl border bg-card p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Share2 className="w-5 h-5 text-primary" />
                        Open Graph Tags
                      </h3>
                      {Object.keys(data.crawl.ogTags).length > 0 ? (
                        <div className="space-y-2">
                          {Object.entries(data.crawl.ogTags).map(
                            ([key, value]) => (
                              <div key={key} className="py-2 border-b border-border/50 last:border-0">
                                <span className="text-xs font-mono text-primary">
                                  {key}
                                </span>
                                <p className="text-sm text-muted-foreground truncate">
                                  {value}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No se encontraron Open Graph tags. Agrega og:title,
                          og:description y og:image para mejorar cómo se ve tu
                          sitio al compartirlo en redes sociales.
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Speed Tab */}
              {activeTab === "speed" && (
                <>
                  <div className="flex flex-wrap gap-8 justify-center mb-8">
                    <ScoreCircle
                      score={data.pageSpeed.performanceScore}
                      label="Rendimiento"
                      size={120}
                    />
                    <ScoreCircle
                      score={data.pageSpeed.accessibilityScore}
                      label="Accesibilidad"
                      size={120}
                    />
                    <ScoreCircle
                      score={data.pageSpeed.bestPracticesScore}
                      label="Buenas Prácticas"
                      size={120}
                    />
                    <ScoreCircle
                      score={data.pageSpeed.seoScore}
                      label="SEO"
                      size={120}
                    />
                  </div>

                  <div className="rounded-xl border bg-card p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Core Web Vitals
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <MetricCard
                        label="First Contentful Paint"
                        value={data.pageSpeed.metrics.firstContentfulPaint}
                        icon={Clock}
                      />
                      <MetricCard
                        label="Largest Contentful Paint"
                        value={data.pageSpeed.metrics.largestContentfulPaint}
                        icon={Clock}
                      />
                      <MetricCard
                        label="Total Blocking Time"
                        value={data.pageSpeed.metrics.totalBlockingTime}
                        icon={Clock}
                      />
                      <MetricCard
                        label="Cumulative Layout Shift"
                        value={data.pageSpeed.metrics.cumulativeLayoutShift}
                        icon={Clock}
                      />
                      <MetricCard
                        label="Speed Index"
                        value={data.pageSpeed.metrics.speedIndex}
                        icon={Clock}
                      />
                      <MetricCard
                        label="Time to Interactive"
                        value={data.pageSpeed.metrics.timeToInteractive}
                        icon={Clock}
                      />
                    </div>
                  </div>

                  {data.pageSpeed.diagnostics.length > 0 && (
                    <div className="rounded-xl border bg-card p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Diagnósticos
                      </h3>
                      <div className="space-y-3">
                        {data.pageSpeed.diagnostics.map((d, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0"
                          >
                            {d.score === null || d.score >= 0.9 ? (
                              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            ) : d.score >= 0.5 ? (
                              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-sm">{d.title}</p>
                              {d.displayValue && (
                                <p className="text-xs text-muted-foreground">
                                  {d.displayValue}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Traffic Tab */}
              {activeTab === "traffic" && (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <MetricCard
                      label="Ranking Global"
                      value={
                        data.similarWeb.globalRank
                          ? `#${data.similarWeb.globalRank.toLocaleString()}`
                          : "N/A"
                      }
                      icon={TrendingUp}
                    />
                    <MetricCard
                      label="Visitas Totales"
                      value={
                        data.similarWeb.totalVisits
                          ? data.similarWeb.totalVisits >= 1000000
                            ? `${(data.similarWeb.totalVisits / 1000000).toFixed(1)}M`
                            : data.similarWeb.totalVisits >= 1000
                              ? `${(data.similarWeb.totalVisits / 1000).toFixed(1)}K`
                              : data.similarWeb.totalVisits.toLocaleString()
                          : "N/A"
                      }
                      icon={Globe}
                    />
                    <MetricCard
                      label="Bounce Rate"
                      value={
                        data.similarWeb.bounceRate !== null
                          ? `${(data.similarWeb.bounceRate * 100).toFixed(1)}%`
                          : "N/A"
                      }
                      icon={BarChart3}
                    />
                    <MetricCard
                      label="Fuentes de Tráfico"
                      value={Object.keys(data.similarWeb.trafficSources).length}
                      icon={Share2}
                    />
                  </div>

                  {/* Traffic by Country */}
                  {data.similarWeb.trafficByCountry.length > 0 && (
                    <div className="rounded-xl border bg-card p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Tráfico por País
                      </h3>
                      <div className="space-y-3">
                        {data.similarWeb.trafficByCountry.map((c, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-4"
                          >
                            <span className="w-8 text-center text-lg font-bold text-muted-foreground">
                              {i + 1}
                            </span>
                            <span className="flex-1 font-medium">
                              {c.country}
                            </span>
                            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{
                                  width: `${Math.min(c.share * 100, 100)}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-16 text-right">
                              {(c.share * 100).toFixed(1)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Traffic Sources */}
                  {Object.keys(data.similarWeb.trafficSources).length > 0 && (
                    <div className="rounded-xl border bg-card p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Fuentes de Tráfico (Desktop)
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(data.similarWeb.trafficSources)
                          .sort(([, a], [, b]) => b - a)
                          .map(([source, share], i) => (
                            <div
                              key={i}
                              className="flex items-center gap-4"
                            >
                              <span className="flex-1 font-medium capitalize">
                                {source.replace(/_/g, " ")}
                              </span>
                              <div className="w-40 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary rounded-full"
                                  style={{
                                    width: `${Math.min(share * 100, 100)}%`,
                                  }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-16 text-right">
                                {(share * 100).toFixed(1)}%
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {data.similarWeb.globalRank === null &&
                    data.similarWeb.totalVisits === null && (
                      <div className="rounded-xl border bg-card p-8 text-center">
                        <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          Datos de tráfico no disponibles
                        </h3>
                        <p className="text-muted-foreground max-w-md mx-auto">
                          SimilarWeb no tiene datos suficientes para este dominio.
                          Esto es común en sitios con poco tráfico o dominios
                          nuevos.
                        </p>
                      </div>
                    )}
                </>
              )}

              {/* Issues Tab */}
              {activeTab === "issues" && (
                <>
                  {/* Issues Summary */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
                      <p className="text-3xl font-bold text-red-700">
                        {data.crawl.issues.filter((i) => i.type === "critical").length}
                      </p>
                      <p className="text-sm text-red-600">Errores Críticos</p>
                    </div>
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
                      <p className="text-3xl font-bold text-amber-700">
                        {data.crawl.issues.filter((i) => i.type === "warning").length}
                      </p>
                      <p className="text-sm text-amber-600">Advertencias</p>
                    </div>
                    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center">
                      <p className="text-3xl font-bold text-blue-700">
                        {data.crawl.issues.filter((i) => i.type === "info").length}
                      </p>
                      <p className="text-sm text-blue-600">Informativo</p>
                    </div>
                  </div>

                  {/* Issues List */}
                  <div className="rounded-xl border bg-card">
                    {data.crawl.issues.length === 0 ? (
                      <div className="p-8 text-center">
                        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">
                          Sin problemas detectados
                        </h3>
                        <p className="text-muted-foreground">
                          El sitio pasó todas las verificaciones básicas de SEO.
                        </p>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {data.crawl.issues
                          .sort((a, b) => {
                            const order = { critical: 0, warning: 1, info: 2 };
                            return order[a.type] - order[b.type];
                          })
                          .map((issue, i) => (
                            <div key={i} className="p-5">
                              <div className="flex items-start gap-3">
                                <IssueBadge type={issue.type} />
                                <div className="flex-1">
                                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                    {issue.category}
                                  </span>
                                  <p className="font-medium mt-1">
                                    {issue.message}
                                  </p>
                                  <p className="text-sm text-muted-foreground mt-2 bg-muted/50 rounded-lg p-3">
                                    💡 {issue.recommendation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {!data && !isLoading && (
        <section className="py-20">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              ¿Qué analiza esta herramienta?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <FileText className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">SEO On-Page</h3>
                <p className="text-muted-foreground">
                  Meta tags, estructura de encabezados, imágenes, links,
                  robots.txt y sitemap.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Clock className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Velocidad</h3>
                <p className="text-muted-foreground">
                  Core Web Vitals, Lighthouse scores, diagnósticos de
                  rendimiento y recomendaciones.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Tráfico</h3>
                <p className="text-muted-foreground">
                  Ranking global, visitas, bounce rate, tráfico por país y
                  fuentes de tráfico.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
