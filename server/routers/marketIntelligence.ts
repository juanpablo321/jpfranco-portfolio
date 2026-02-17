import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { callDataApi } from "../_core/dataApi";
import { invokeLLM } from "../_core/llm";
import {
  INDUSTRIES,
  COUNTRIES,
  getIndustryById,
  getCountryByCode,
  getIndustryBenchmarks,
  calculateIndustryAverage,
  type SiteMetrics,
  type CompetitorInfo,
  type BenchmarkComparison,
  type MarketIntelligenceResult,
} from "@shared/marketIntelligence";

// ─── Helpers ────────────────────────────────────────────────────────────────

function extractDomain(url: string): string {
  let cleaned = url.trim();
  if (!cleaned.startsWith("http://") && !cleaned.startsWith("https://")) {
    cleaned = "https://" + cleaned;
  }
  try {
    const parsed = new URL(cleaned);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return cleaned.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
  }
}

function getDateRange() {
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);
  return {
    endDate: `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, "0")}`,
    startDate: `${threeMonthsAgo.getFullYear()}-${String(threeMonthsAgo.getMonth() + 1).padStart(2, "0")}`,
  };
}

// ─── SimilarWeb Data Fetchers ───────────────────────────────────────────────

async function fetchSiteMetrics(domain: string): Promise<{ metrics: SiteMetrics; apiAvailable: boolean }> {
  const { startDate, endDate } = getDateRange();

  const metrics: SiteMetrics = {
    domain,
    globalRank: null,
    countryRank: null,
    totalVisits: null,
    bounceRate: null,
    avgSessionDuration: null,
    pagesPerVisit: null,
    trafficByCountry: [],
    trafficSources: {},
    mobileVsDesktop: { desktop: 37, mobile: 63 },
  };

  let apiAvailable = false;

  // Run all API calls in parallel for speed
  const [rankResult, bounceResult, visitsResult, countryResult, desktopSourcesResult] =
    await Promise.allSettled([
      callDataApi("Similarweb/get_global_rank", {
        pathParams: { domain },
        query: { main_domain_only: "false", start_date: startDate, end_date: endDate },
      }),
      callDataApi("Similarweb/get_bounce_rate", {
        pathParams: { domain },
        query: { country: "world", granularity: "monthly", main_domain_only: "false", start_date: startDate, end_date: endDate },
      }),
      callDataApi("Similarweb/get_visits_total", {
        pathParams: { domain },
        query: { country: "world", granularity: "monthly", main_domain_only: "false", start_date: startDate, end_date: endDate },
      }),
      callDataApi("Similarweb/get_total_traffic_by_country", {
        pathParams: { domain },
        query: { main_domain_only: "true", limit: "10", start_date: startDate, end_date: endDate },
      }),
      callDataApi("Similarweb/get_traffic_sources_desktop", {
        pathParams: { domain },
        query: { country: "world", granularity: "monthly", main_domain_only: "false", start_date: startDate, end_date: endDate },
      }),
    ]);

  // Process Global Rank
  if (rankResult.status === "fulfilled") {
    const data = rankResult.value as Record<string, unknown>[];
    if (Array.isArray(data) && data.length > 0) {
      const latest = data[data.length - 1] as Record<string, number>;
      if (latest.global_rank) {
        metrics.globalRank = latest.global_rank;
        apiAvailable = true;
      }
    }
  }

  // Process Bounce Rate
  if (bounceResult.status === "fulfilled") {
    const data = bounceResult.value as Record<string, unknown>[];
    if (Array.isArray(data) && data.length > 0) {
      const latest = data[data.length - 1] as Record<string, number>;
      if (latest.bounce_rate !== undefined && latest.bounce_rate !== null) {
        metrics.bounceRate = latest.bounce_rate;
        apiAvailable = true;
      }
    }
  }

  // Process Total Visits
  if (visitsResult.status === "fulfilled") {
    const data = visitsResult.value as Record<string, unknown>[];
    if (Array.isArray(data) && data.length > 0) {
      const latest = data[data.length - 1] as Record<string, number>;
      if (latest.visits) {
        metrics.totalVisits = latest.visits;
        apiAvailable = true;
      }
    }
  }

  // Process Traffic by Country
  if (countryResult.status === "fulfilled") {
    const data = countryResult.value as Record<string, unknown>[];
    if (Array.isArray(data) && data.length > 0) {
      metrics.trafficByCountry = data.slice(0, 10).map((c: Record<string, unknown>) => ({
        country: String(c.country ?? ""),
        countryCode: Number(c.country_code ?? 0),
        share: Number(c.share ?? 0),
        visits: Number(c.visits ?? 0),
        pagesPerVisit: Number(c.pages_per_visit ?? 0),
        avgTime: Number(c.average_time ?? 0),
        bounceRate: Number(c.bounce_rate ?? 0),
        rank: Number(c.rank ?? 0),
      }));
      apiAvailable = true;

      // Extract pages per visit and avg session duration from country data
      if (metrics.trafficByCountry.length > 0) {
        const totalShare = metrics.trafficByCountry.reduce((s, c) => s + c.share, 0);
        if (totalShare > 0) {
          metrics.pagesPerVisit = metrics.trafficByCountry.reduce(
            (s, c) => s + c.pagesPerVisit * (c.share / totalShare), 0
          );
          metrics.avgSessionDuration = metrics.trafficByCountry.reduce(
            (s, c) => s + c.avgTime * (c.share / totalShare), 0
          );
        }
      }
    }
  }

  // Process Desktop Traffic Sources
  if (desktopSourcesResult.status === "fulfilled") {
    const data = desktopSourcesResult.value as Record<string, unknown>;
    if (data && typeof data === "object") {
      const overview = (data as Record<string, unknown>).overview as Record<string, unknown>[] | undefined;
      if (Array.isArray(overview) && overview.length > 0) {
        for (const source of overview) {
          const name = String(source.source_type ?? "unknown");
          metrics.trafficSources[name] = Number(source.share ?? 0);
        }
        apiAvailable = true;
      }
    }
  }

  return { metrics, apiAvailable };
}

// ─── Competitor Generation ──────────────────────────────────────────────────

function generateCompetitors(
  industryId: string,
  countryCode: string,
  siteDomain: string
): CompetitorInfo[] {
  const benchmarks = getIndustryBenchmarks(industryId, countryCode);

  return benchmarks
    .filter((b) => b.domain !== siteDomain)
    .slice(0, 3)
    .map((b) => ({
      domain: b.domain,
      name: b.name,
      globalRank: null,
      totalVisits: b.avgMonthlyVisits,
      bounceRate: b.avgBounceRate,
      avgSessionDuration: b.avgSessionDuration,
      isIndustryLeader: true,
    }));
}

// ─── Benchmark Comparison ───────────────────────────────────────────────────

function generateBenchmarks(
  siteMetrics: SiteMetrics,
  industryId: string,
  countryCode: string
): BenchmarkComparison[] {
  const benchmarks = getIndustryBenchmarks(industryId, countryCode);
  const avg = calculateIndustryAverage(benchmarks);

  if (benchmarks.length === 0) return [];

  const topVisits = benchmarks.reduce((a, b) => (a.avgMonthlyVisits > b.avgMonthlyVisits ? a : b));
  const topBounce = benchmarks.reduce((a, b) => (a.avgBounceRate < b.avgBounceRate ? a : b));
  const topDuration = benchmarks.reduce((a, b) => (a.avgSessionDuration > b.avgSessionDuration ? a : b));
  const topPages = benchmarks.reduce((a, b) => (a.avgPagesPerVisit > b.avgPagesPerVisit ? a : b));

  return [
    {
      metric: "Visitas Mensuales",
      siteValue: siteMetrics.totalVisits,
      industryAvg: avg.avgVisits,
      topPlayer: topVisits.avgMonthlyVisits,
      topPlayerName: topVisits.name,
      unit: "visitas",
      higherIsBetter: true,
    },
    {
      metric: "Tasa de Rebote",
      siteValue: siteMetrics.bounceRate,
      industryAvg: avg.avgBounceRate,
      topPlayer: topBounce.avgBounceRate,
      topPlayerName: topBounce.name,
      unit: "%",
      higherIsBetter: false,
    },
    {
      metric: "Duración de Sesión",
      siteValue: siteMetrics.avgSessionDuration,
      industryAvg: avg.avgSessionDuration,
      topPlayer: topDuration.avgSessionDuration,
      topPlayerName: topDuration.name,
      unit: "seg",
      higherIsBetter: true,
    },
    {
      metric: "Páginas por Visita",
      siteValue: siteMetrics.pagesPerVisit,
      industryAvg: avg.avgPagesPerVisit,
      topPlayer: topPages.avgPagesPerVisit,
      topPlayerName: topPages.name,
      unit: "págs",
      higherIsBetter: true,
    },
  ];
}

// ─── LLM-Powered Insight Generation ────────────────────────────────────────

async function generateLLMInsights(
  domain: string,
  industryLabel: string,
  countryLabel: string,
  siteMetrics: SiteMetrics,
  benchmarks: BenchmarkComparison[],
  competitors: CompetitorInfo[],
  apiAvailable: boolean
): Promise<string[]> {
  try {
    const metricsContext = apiAvailable
      ? `Datos reales del sitio: Visitas mensuales: ${siteMetrics.totalVisits ? (siteMetrics.totalVisits / 1000000).toFixed(1) + "M" : "no disponible"}, Tasa de rebote: ${siteMetrics.bounceRate ? (siteMetrics.bounceRate * 100).toFixed(1) + "%" : "no disponible"}, Duración sesión: ${siteMetrics.avgSessionDuration ? Math.floor(siteMetrics.avgSessionDuration / 60) + "min" : "no disponible"}, Páginas/visita: ${siteMetrics.pagesPerVisit?.toFixed(1) ?? "no disponible"}.`
      : "No se pudieron obtener datos reales del sitio (API temporalmente no disponible).";

    const benchmarkContext = benchmarks
      .map((b) => `${b.metric}: sitio=${b.siteValue ?? "N/D"}, promedio industria=${b.industryAvg?.toFixed?.(2) ?? "N/D"}, líder=${b.topPlayerName} (${b.topPlayer})`)
      .join("\n");

    const competitorContext = competitors
      .map((c) => `${c.name} (${c.domain}): ${(c.totalVisits ?? 0) / 1000000}M visitas, ${((c.bounceRate ?? 0) * 100).toFixed(0)}% rebote`)
      .join("\n");

    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `Eres un consultor experto en marketing digital y eCommerce en Latinoamérica, especializado en el mercado de ${countryLabel}. Genera insights estratégicos accionables y específicos para el dominio analizado. Responde SOLO en español. Cada insight debe ser una oración concisa y accionable (máximo 2 líneas). No uses numeración ni viñetas.`,
        },
        {
          role: "user",
          content: `Analiza el sitio ${domain} en la industria de ${industryLabel} en ${countryLabel}.

${metricsContext}

Benchmarking:
${benchmarkContext}

Competidores principales:
${competitorContext}

Genera exactamente 4 insights estratégicos diferentes:
1. Un insight sobre posicionamiento competitivo vs los líderes locales
2. Un insight sobre oportunidades de crecimiento de tráfico específicas para ${countryLabel}
3. Un insight sobre mejora de engagement (rebote, duración, páginas)
4. Un insight sobre estrategia de canales de adquisición recomendada

Responde como un JSON array de 4 strings. Ejemplo: ["insight1", "insight2", "insight3", "insight4"]`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "insights_array",
          strict: true,
          schema: {
            type: "object",
            properties: {
              insights: {
                type: "array",
                items: { type: "string" },
                description: "Array of 4 strategic insights",
              },
            },
            required: ["insights"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices?.[0]?.message?.content;
    if (content && typeof content === "string") {
      const parsed = JSON.parse(content);
      if (parsed.insights && Array.isArray(parsed.insights)) {
        return parsed.insights.slice(0, 5);
      }
    }
  } catch (err) {
    console.error("[MarketIntelligence] LLM insights error:", err);
  }

  // Fallback to static insights
  return generateStaticInsights(domain, industryLabel, countryLabel, siteMetrics, benchmarks, apiAvailable);
}

function generateStaticInsights(
  domain: string,
  industryLabel: string,
  countryLabel: string,
  siteMetrics: SiteMetrics,
  benchmarks: BenchmarkComparison[],
  apiAvailable: boolean
): string[] {
  const insights: string[] = [];

  if (!apiAvailable) {
    insights.push(
      `Los datos de tráfico en tiempo real no están disponibles temporalmente. El análisis se basa en los benchmarks de la industria de ${industryLabel} en ${countryLabel}. Los datos de benchmarking provienen de fuentes verificadas del mercado.`
    );
  }

  for (const b of benchmarks) {
    if (b.siteValue === null || b.industryAvg === null) continue;

    if (b.metric === "Visitas Mensuales") {
      const ratio = b.siteValue / b.industryAvg;
      if (ratio >= 1.2) {
        insights.push(
          `Tu sitio recibe ${Math.round(ratio * 100 - 100)}% más tráfico que el promedio de ${industryLabel} en ${countryLabel}. Excelente posicionamiento competitivo.`
        );
      } else if (ratio < 0.5) {
        insights.push(
          `Tu tráfico está ${Math.round(100 - ratio * 100)}% por debajo del promedio de ${industryLabel}. Considera invertir en SEO y marketing de contenidos para ${countryLabel}.`
        );
      }
    }

    if (b.metric === "Tasa de Rebote") {
      if (b.siteValue > (b.industryAvg ?? 0) * 1.15) {
        insights.push(
          `Tu tasa de rebote (${(b.siteValue * 100).toFixed(1)}%) supera el promedio de la industria. Revisa la experiencia de usuario y la relevancia del contenido para la audiencia de ${countryLabel}.`
        );
      } else if (b.siteValue < (b.industryAvg ?? 1) * 0.85) {
        insights.push(
          `Tu tasa de rebote es inferior al promedio de la industria. Tus visitantes encuentran contenido relevante.`
        );
      }
    }
  }

  if (siteMetrics.trafficByCountry.length > 0) {
    const topCountry = siteMetrics.trafficByCountry[0];
    insights.push(
      `El ${(topCountry.share * 100).toFixed(1)}% de tu tráfico proviene de ${topCountry.country}. ${
        topCountry.share > 0.5
          ? "Alta concentración geográfica: diversificar puede reducir riesgos."
          : "Buena distribución geográfica del tráfico."
      }`
    );
  }

  const sources = siteMetrics.trafficSources;
  const organicShare = sources["Organic Search"] ?? sources["organic"] ?? 0;
  if (organicShare > 0.5) {
    insights.push(
      `El tráfico orgánico representa el ${(organicShare * 100).toFixed(0)}% de tus visitas. Excelente base SEO, pero diversifica con paid y social.`
    );
  } else if (organicShare < 0.2 && organicShare > 0) {
    insights.push(
      `Solo el ${(organicShare * 100).toFixed(0)}% de tu tráfico es orgánico. Hay una gran oportunidad de crecimiento SEO en ${countryLabel}.`
    );
  }

  if (insights.length === 0) {
    insights.push(
      `Análisis completado para ${domain} en el mercado de ${industryLabel} de ${countryLabel}. Compara las métricas de los líderes de la industria para identificar oportunidades de crecimiento.`
    );
    insights.push(
      `Los competidores principales en ${industryLabel} de ${countryLabel} establecen el estándar del mercado. Enfócate en diferenciación de producto y experiencia de usuario para ganar cuota de mercado.`
    );
  }

  return insights.slice(0, 5);
}

// ─── Router ─────────────────────────────────────────────────────────────────

export const marketIntelligenceRouter = router({
  getOptions: publicProcedure.query(() => ({
    countries: COUNTRIES,
    industries: INDUSTRIES.map((i) => ({ id: i.id, label: i.label, icon: i.icon })),
  })),

  analyze: publicProcedure
    .input(
      z.object({
        url: z.string().min(1, "La URL es requerida"),
        country: z.string().min(1, "Selecciona un país"),
        industry: z.string().min(1, "Selecciona una industria"),
      })
    )
    .mutation(async ({ input }) => {
      const { url, country, industry } = input;
      const domain = extractDomain(url);
      const countryOption = getCountryByCode(country);
      const industryConfig = getIndustryById(industry);

      if (!countryOption) throw new Error("País no válido");
      if (!industryConfig) throw new Error("Industria no válida");

      // Fetch real metrics from SimilarWeb
      const { metrics: siteMetrics, apiAvailable } = await fetchSiteMetrics(domain);

      // Generate competitor list from industry benchmarks
      const competitors = generateCompetitors(industry, country, domain);

      // Generate benchmark comparisons
      const benchmarks = generateBenchmarks(siteMetrics, industry, country);

      // Generate strategic insights using LLM
      const insights = await generateLLMInsights(
        domain,
        industryConfig.label,
        countryOption.label,
        siteMetrics,
        benchmarks,
        competitors,
        apiAvailable
      );

      const result: MarketIntelligenceResult & { apiAvailable: boolean } = {
        domain,
        url: url.startsWith("http") ? url : `https://${url}`,
        country,
        countryLabel: countryOption.label,
        industry,
        industryLabel: industryConfig.label,
        analyzedAt: new Date().toISOString(),
        siteMetrics,
        competitors,
        benchmarks,
        insights,
        apiAvailable,
      };

      return result;
    }),
});
