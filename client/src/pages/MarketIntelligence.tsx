import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmailOtpGate from "@/components/EmailOtpGate";
import { trpc } from "@/lib/trpc";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Globe,
  TrendingUp,
  BarChart3,
  ArrowLeft,
  Loader2,
  Users,
  Clock,
  MousePointerClick,
  FileStack,
  Trophy,
  Target,
  Lightbulb,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Building2,
  AlertCircle,
  Info,
} from "lucide-react";
import { Link } from "wouter";
import {
  COUNTRIES,
  INDUSTRIES,
  formatNumber,
  formatDuration,
  formatPercent,
  type MarketIntelligenceResult,
} from "@shared/marketIntelligence";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Radar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

// ─── Metric Card Component ──────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  icon: Icon,
  subtitle,
  trend,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
}) {
  return (
    <div className="rounded-xl border bg-card p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="flex items-end gap-2">
        <p className="text-2xl font-bold">{value}</p>
        {trend && (
          <span className={`text-xs font-medium flex items-center gap-0.5 mb-1 ${
            trend === "up" ? "text-green-600" : trend === "down" ? "text-red-500" : "text-muted-foreground"
          }`}>
            {trend === "up" ? <ArrowUpRight size={12} /> : trend === "down" ? <ArrowDownRight size={12} /> : <Minus size={12} />}
          </span>
        )}
      </div>
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    </div>
  );
}

// ─── Benchmark Bar Component ────────────────────────────────────────────────

function BenchmarkBar({
  label,
  siteValue,
  industryAvg,
  topPlayer,
  topPlayerName,
  unit,
  higherIsBetter,
  formatFn,
}: {
  label: string;
  siteValue: number | null;
  industryAvg: number | null;
  topPlayer: number | null;
  topPlayerName: string;
  unit: string;
  higherIsBetter: boolean;
  formatFn: (v: number | null) => string;
}) {
  if (siteValue === null && industryAvg === null) return null;

  const maxVal = Math.max(siteValue ?? 0, industryAvg ?? 0, topPlayer ?? 0);
  const siteWidth = maxVal > 0 ? ((siteValue ?? 0) / maxVal) * 100 : 0;
  const avgWidth = maxVal > 0 ? ((industryAvg ?? 0) / maxVal) * 100 : 0;
  const topWidth = maxVal > 0 ? ((topPlayer ?? 0) / maxVal) * 100 : 0;

  const isGood = higherIsBetter
    ? (siteValue ?? 0) >= (industryAvg ?? 0)
    : (siteValue ?? 0) <= (industryAvg ?? 0);

  return (
    <div className="py-4 border-b border-border/50 last:border-0">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-sm">{label}</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
          isGood ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
        }`}>
          {isGood ? "Por encima" : "Por debajo"} del promedio
        </span>
      </div>
      <div className="space-y-2">
        {/* Site */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-24 shrink-0">Tu sitio</span>
          <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.max(siteWidth, 2)}%`,
                background: isGood
                  ? "linear-gradient(90deg, oklch(0.65 0.20 145), oklch(0.55 0.18 155))"
                  : "linear-gradient(90deg, oklch(0.75 0.18 55), oklch(0.65 0.20 45))",
              }}
            />
          </div>
          <span className="text-xs font-bold w-20 text-right">{formatFn(siteValue)}</span>
        </div>
        {/* Industry Average */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-24 shrink-0">Promedio ind.</span>
          <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-400/70 transition-all duration-700"
              style={{ width: `${Math.max(avgWidth, 2)}%` }}
            />
          </div>
          <span className="text-xs font-medium w-20 text-right text-muted-foreground">{formatFn(industryAvg)}</span>
        </div>
        {/* Top Player */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-24 shrink-0 truncate" title={topPlayerName}>
            {topPlayerName}
          </span>
          <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.max(topWidth, 2)}%`,
                background: "linear-gradient(90deg, oklch(0.50 0.20 310), oklch(0.40 0.18 310))",
              }}
            />
          </div>
          <span className="text-xs font-medium w-20 text-right text-muted-foreground">{formatFn(topPlayer)}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function SeoAnalyzer() {
  const [url, setUrl] = useState("");
  const [country, setCountry] = useState("co");
  const [industry, setIndustry] = useState("retail-ecommerce");

  const analyzeMutation = trpc.marketIntelligence.analyze.useMutation();

  const handleAnalyze = () => {
    if (!url.trim()) return;
    analyzeMutation.mutate({ url: url.trim(), country, industry });
  };

  const data = analyzeMutation.data as MarketIntelligenceResult | undefined;
  const isLoading = analyzeMutation.isPending;

  // Group countries for the select
  const countryGroups = useMemo(() => {
    const latam = COUNTRIES.filter((c) => !c.group);
    const groups: Record<string, typeof COUNTRIES> = {};
    for (const c of COUNTRIES) {
      if (c.group) {
        if (!groups[c.group]) groups[c.group] = [];
        groups[c.group].push(c);
      }
    }
    return { latam, groups };
  }, []);

  // Chart data for traffic sources
  const trafficSourcesChart = useMemo(() => {
    if (!data?.siteMetrics.trafficSources) return null;
    const sources = data.siteMetrics.trafficSources;
    const labels = Object.keys(sources).map((k) => {
      const map: Record<string, string> = {
        "Organic Search": "Orgánico",
        "Paid Search": "Pago",
        "Direct": "Directo",
        "Display Ads": "Display",
        "Email": "Email",
        "Referrals": "Referidos",
        "Social": "Social",
        "social": "Social",
        "organic": "Orgánico",
        "paid": "Pago",
        "direct": "Directo",
        "referral": "Referidos",
        "mail": "Email",
        "display_ad": "Display",
      };
      return map[k] || k;
    });
    const values = Object.values(sources).map((v) => Number(v) * 100);
    const colors = [
      "oklch(0.55 0.20 145)", // green
      "oklch(0.60 0.22 25)",  // red-orange
      "oklch(0.55 0.20 260)", // blue
      "oklch(0.65 0.18 85)",  // yellow
      "oklch(0.50 0.20 310)", // purple
      "oklch(0.60 0.15 180)", // teal
      "oklch(0.70 0.12 50)",  // peach
    ];

    return {
      labels,
      datasets: [
        {
          data: values,
          backgroundColor: colors.slice(0, values.length),
          borderWidth: 0,
          hoverOffset: 8,
        },
      ],
    };
  }, [data]);

  // Chart data for country traffic
  const countryTrafficChart = useMemo(() => {
    if (!data?.siteMetrics.trafficByCountry?.length) return null;
    const top5 = data.siteMetrics.trafficByCountry.slice(0, 5);
    return {
      labels: top5.map((c) => c.country || `País ${c.countryCode}`),
      datasets: [
        {
          label: "% del Tráfico",
          data: top5.map((c) => Number((c.share * 100).toFixed(1))),
          backgroundColor: [
            "oklch(0.55 0.20 310)",
            "oklch(0.60 0.16 50)",
            "oklch(0.55 0.20 260)",
            "oklch(0.55 0.20 145)",
            "oklch(0.65 0.18 85)",
          ],
          borderRadius: 6,
          borderWidth: 0,
        },
      ],
    };
  }, [data]);

  // Radar chart for benchmarking
  const radarChart = useMemo(() => {
    if (!data?.benchmarks?.length) return null;

    // Normalize all values to 0-100 scale for radar
    const normalize = (val: number | null, max: number) => {
      if (val === null) return 0;
      return Math.min(100, (val / max) * 100);
    };

    const maxValues = data.benchmarks.map((b) =>
      Math.max(b.siteValue ?? 0, b.industryAvg ?? 0, b.topPlayer ?? 0)
    );

    return {
      labels: data.benchmarks.map((b) => b.metric),
      datasets: [
        {
          label: data.domain,
          data: data.benchmarks.map((b, i) => {
            const norm = normalize(b.siteValue, maxValues[i]);
            return b.higherIsBetter ? norm : (100 - norm);
          }),
          backgroundColor: "rgba(234, 120, 30, 0.15)",
          borderColor: "oklch(0.65 0.20 55)",
          borderWidth: 2,
          pointBackgroundColor: "oklch(0.65 0.20 55)",
          pointRadius: 4,
        },
        {
          label: "Promedio Industria",
          data: data.benchmarks.map((b, i) => {
            const norm = normalize(b.industryAvg, maxValues[i]);
            return b.higherIsBetter ? norm : (100 - norm);
          }),
          backgroundColor: "rgba(99, 102, 241, 0.10)",
          borderColor: "oklch(0.55 0.20 260)",
          borderWidth: 2,
          pointBackgroundColor: "oklch(0.55 0.20 260)",
          pointRadius: 4,
          borderDash: [5, 5],
        },
      ],
    };
  }, [data]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <EmailOtpGate>
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
            <Link
              href="/herramientas"
              className="text-white/70 hover:text-white text-sm flex items-center gap-1"
            >
              <ArrowLeft size={14} /> Herramientas
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white/90 text-sm">Inteligencia de Mercado</span>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-white mb-4">Inteligencia de Mercado</h1>
            <p className="text-lg text-white/90 mb-8">
              Analiza cualquier sitio web y compáralo contra los líderes de tu
              industria en Colombia y Latinoamérica. Métricas reales de tráfico,
              benchmarking y análisis competitivo.
            </p>

            {/* Input Form */}
            <div className="max-w-4xl mx-auto space-y-4">
              {/* URL Input */}
              <div className="flex gap-3">
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
              </div>

              {/* Selectors Row */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Country Selector */}
                <div className="flex-1">
                  <Select value={country} onValueChange={setCountry} disabled={isLoading}>
                    <SelectTrigger className="bg-white/95 text-foreground h-12 rounded-xl border-0 text-sm">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground text-xs mr-1">Audiencia:</span>
                        <SelectValue placeholder="Seleccionar país" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Latinoamérica y EEUU</SelectLabel>
                        {countryGroups.latam.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            {c.flag} {c.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      {Object.entries(countryGroups.groups).map(([group, countries]) => (
                        <SelectGroup key={group}>
                          <SelectLabel>{group}</SelectLabel>
                          {countries.map((c) => (
                            <SelectItem key={c.code} value={c.code}>
                              {c.flag} {c.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Industry Selector */}
                <div className="flex-1">
                  <Select value={industry} onValueChange={setIndustry} disabled={isLoading}>
                    <SelectTrigger className="bg-white/95 text-foreground h-12 rounded-xl border-0 text-sm">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground text-xs mr-1">Industria:</span>
                        <SelectValue placeholder="Seleccionar industria" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {INDUSTRIES.map((ind) => (
                        <SelectItem key={ind.id} value={ind.id}>
                          {ind.icon} {ind.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Analyze Button */}
                <Button
                  onClick={handleAnalyze}
                  disabled={isLoading || !url.trim()}
                  className="px-8 h-12 text-base bg-primary hover:bg-primary/90 text-white rounded-xl"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Search className="w-5 h-5 mr-2" />
                  )}
                  Analizar Competencia
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What does this tool analyze? - shown before results */}
      {!data && !isLoading && !analyzeMutation.isError && (
        <section className="py-16">
          <div className="container max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-10">
              ¿Qué analiza esta herramienta?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-xl border bg-card">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Métricas de Tráfico</h3>
                <p className="text-sm text-muted-foreground">
                  Visitas mensuales, tasa de rebote, duración de sesión y
                  distribución geográfica del tráfico con datos de SimilarWeb.
                </p>
              </div>
              <div className="text-center p-6 rounded-xl border bg-card">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Benchmarking por Industria</h3>
                <p className="text-sm text-muted-foreground">
                  Compara tu sitio contra los líderes de tu industria en Colombia:
                  Mercado Libre, Rappi, Bancolombia y más.
                </p>
              </div>
              <div className="text-center p-6 rounded-xl border bg-card">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Análisis Competitivo</h3>
                <p className="text-sm text-muted-foreground">
                  Identifica tus 3 competidores directos locales y obtén insights
                  estratégicos para tu mercado objetivo.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Loading State */}
      {isLoading && (
        <section className="py-20">
          <div className="container text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-2">
              Analizando {url}...
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Consultando datos de tráfico de SimilarWeb y comparando contra los
              líderes de{" "}
              {INDUSTRIES.find((i) => i.id === industry)?.label || "la industria"}{" "}
              en{" "}
              {COUNTRIES.find((c) => c.code === country)?.label || "el país seleccionado"}.
              Esto puede tomar 15-30 segundos.
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

      {/* ─── Results Dashboard ─────────────────────────────────────────────── */}
      {data && !isLoading && (
        <section className="py-12">
          <div className="container max-w-6xl mx-auto">
            {/* Header */}
            <div className="rounded-xl border bg-card p-6 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{data.domain}</h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    {data.industryLabel} · {data.countryLabel} · Analizado el{" "}
                    {new Date(data.analyzedAt).toLocaleDateString("es-CO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                {data.siteMetrics.globalRank && (
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Ranking Global</p>
                    <p className="text-3xl font-bold text-primary">
                      #{data.siteMetrics.globalRank.toLocaleString("es-CO")}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Cache Indicator Banner */}
            {(data as any).fromCache && (data as any).apiAvailable && (
              <div className="rounded-xl border border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800 p-4 mb-8 flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                    Datos cargados desde caché
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                    Estas métricas fueron obtenidas previamente y se actualizarán automáticamente en las próximas 24 horas. Esto reduce el consumo de créditos de API.
                  </p>
                </div>
              </div>
            )}

            {/* API Availability Banner */}
            {!(data as any).apiAvailable && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800 p-4 mb-8 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">
                    Datos en vivo temporalmente no disponibles
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">
                    Las métricas de tráfico del sitio no están disponibles en este momento. El benchmarking, competidores e insights estratégicos se generan con datos de la industria y análisis de IA.
                  </p>
                </div>
              </div>
            )}

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <MetricCard
                label="Visitas Mensuales"
                value={formatNumber(data.siteMetrics.totalVisits)}
                icon={Users}
                subtitle="Últimos 3 meses"
              />
              <MetricCard
                label="Tasa de Rebote"
                value={formatPercent(data.siteMetrics.bounceRate)}
                icon={MousePointerClick}
                subtitle="Promedio mundial"
              />
              <MetricCard
                label="Duración Sesión"
                value={formatDuration(data.siteMetrics.avgSessionDuration)}
                icon={Clock}
                subtitle="Promedio por visita"
              />
              <MetricCard
                label="Páginas / Visita"
                value={data.siteMetrics.pagesPerVisit?.toFixed(1) ?? "N/D"}
                icon={FileStack}
                subtitle="Promedio por sesión"
              />
            </div>

            {/* Two Column Layout: Charts + Benchmarking */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Traffic Sources Chart */}
              <div className="rounded-xl border bg-card p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Fuentes de Tráfico
                </h3>
                {trafficSourcesChart && trafficSourcesChart.labels.length > 0 ? (
                  <div className="flex items-center justify-center" style={{ height: 280 }}>
                    <Doughnut
                      data={trafficSourcesChart}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "right",
                            labels: {
                              usePointStyle: true,
                              pointStyle: "circle",
                              padding: 16,
                              font: { size: 11 },
                            },
                          },
                          tooltip: {
                            callbacks: {
                              label: (ctx) => `${ctx.label}: ${ctx.parsed.toFixed(1)}%`,
                            },
                          },
                        },
                        cutout: "60%",
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
                    No hay datos de fuentes de tráfico disponibles
                  </div>
                )}
              </div>

              {/* Country Traffic Chart */}
              <div className="rounded-xl border bg-card p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Tráfico por País
                </h3>
                {countryTrafficChart && countryTrafficChart.labels.length > 0 ? (
                  <div style={{ height: 280 }}>
                    <Bar
                      data={countryTrafficChart}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        indexAxis: "y",
                        plugins: {
                          legend: { display: false },
                          tooltip: {
                            callbacks: {
                              label: (ctx) => `${ctx.parsed.x}% del tráfico`,
                            },
                          },
                        },
                        scales: {
                          x: {
                            grid: { display: false },
                            ticks: { callback: (v) => `${v}%` },
                          },
                          y: {
                            grid: { display: false },
                          },
                        },
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
                    No hay datos de tráfico por país disponibles
                  </div>
                )}
              </div>
            </div>

            {/* Benchmarking Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Benchmark Bars */}
              <div className="lg:col-span-2 rounded-xl border bg-card p-6">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Benchmarking vs. {data.industryLabel}
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  Comparación contra el promedio de la industria y el líder del mercado en {data.countryLabel}
                </p>
                {data.benchmarks.length > 0 ? (
                  <div>
                    {data.benchmarks.map((b, i) => (
                      <BenchmarkBar
                        key={i}
                        label={b.metric}
                        siteValue={b.siteValue}
                        industryAvg={b.industryAvg}
                        topPlayer={b.topPlayer}
                        topPlayerName={b.topPlayerName}
                        unit={b.unit}
                        higherIsBetter={b.higherIsBetter}
                        formatFn={
                          b.metric === "Visitas Mensuales"
                            ? formatNumber
                            : b.metric === "Tasa de Rebote"
                              ? formatPercent
                              : b.metric === "Duración de Sesión"
                                ? formatDuration
                                : (v) => v?.toFixed(1) ?? "N/D"
                        }
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No hay datos de benchmarking disponibles para esta industria/país
                  </div>
                )}
              </div>

              {/* Radar Chart */}
              <div className="rounded-xl border bg-card p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Perfil Competitivo
                </h3>
                {radarChart ? (
                  <div style={{ height: 280 }}>
                    <Radar
                      data={radarChart}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: "bottom",
                            labels: {
                              usePointStyle: true,
                              pointStyle: "circle",
                              padding: 12,
                              font: { size: 10 },
                            },
                          },
                        },
                        scales: {
                          r: {
                            beginAtZero: true,
                            max: 100,
                            ticks: { display: false },
                            pointLabels: { font: { size: 9 } },
                            grid: { color: "rgba(0,0,0,0.06)" },
                          },
                        },
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
                    Sin datos suficientes
                  </div>
                )}
              </div>
            </div>

            {/* Competitors Section */}
            {data.competitors.length > 0 && (
              <div className="rounded-xl border bg-card p-6 mb-8">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Competidores Directos en {data.countryLabel}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.competitors.map((comp, i) => (
                    <div
                      key={i}
                      className="rounded-lg border bg-muted/30 p-5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                          {i + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{comp.name}</p>
                          <p className="text-xs text-muted-foreground">{comp.domain}</p>
                        </div>
                        {comp.isIndustryLeader && (
                          <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                            Líder
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Visitas/mes</p>
                          <p className="font-semibold">{formatNumber(comp.totalVisits)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Rebote</p>
                          <p className="font-semibold">{formatPercent(comp.bounceRate)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Sesión</p>
                          <p className="font-semibold">{formatDuration(comp.avgSessionDuration)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Insights Section */}
            {data.insights.length > 0 && (
              <div className="rounded-xl border bg-card p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Insights Estratégicos
                </h3>
                <div className="space-y-3">
                  {data.insights.map((insight, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-lg bg-muted/30 border border-border/50"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">{i + 1}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      </EmailOtpGate>

      <Footer />
    </div>
  );
}
