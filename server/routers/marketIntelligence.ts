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
// API responses come wrapped in { meta: {...}, <data_key>: [...] }
// The callDataApi helper returns the full parsed JSON object.

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
  // Response: { meta: {...}, global_rank: [{ date: "2025-11", global_rank: 30851 }, ...] }
  if (rankResult.status === "fulfilled") {
    try {
      const resp = rankResult.value as Record<string, unknown>;
      const rankArray = resp.global_rank as Array<{ date: string; global_rank: number }> | undefined;
      if (Array.isArray(rankArray) && rankArray.length > 0) {
        const latest = rankArray[rankArray.length - 1];
        if (latest.global_rank) {
          metrics.globalRank = latest.global_rank;
          apiAvailable = true;
        }
      }
    } catch (e) {
      console.error("[MarketIntelligence] Error parsing global rank:", e);
    }
  }

  // Process Bounce Rate
  // Response: { meta: {...}, bounce_rate: [{ date: "2025-11-01", bounce_rate: 0.227 }, ...] }
  if (bounceResult.status === "fulfilled") {
    try {
      const resp = bounceResult.value as Record<string, unknown>;
      const bounceArray = resp.bounce_rate as Array<{ date: string; bounce_rate: number }> | undefined;
      if (Array.isArray(bounceArray) && bounceArray.length > 0) {
        const latest = bounceArray[bounceArray.length - 1];
        if (latest.bounce_rate !== undefined && latest.bounce_rate !== null) {
          metrics.bounceRate = latest.bounce_rate;
          apiAvailable = true;
        }
      }
    } catch (e) {
      console.error("[MarketIntelligence] Error parsing bounce rate:", e);
    }
  }

  // Process Total Visits
  // Response: { meta: {..., device: "Desktop"}, visits: [{ date: "2025-11-01", visits: 381189.75 }, ...] }
  if (visitsResult.status === "fulfilled") {
    try {
      const resp = visitsResult.value as Record<string, unknown>;
      const visitsArray = resp.visits as Array<{ date: string; visits: number }> | undefined;
      if (Array.isArray(visitsArray) && visitsArray.length > 0) {
        // Average the last 3 months for a more stable metric
        const totalVisitsSum = visitsArray.reduce((sum, v) => sum + (v.visits || 0), 0);
        const avgVisits = totalVisitsSum / visitsArray.length;
        metrics.totalVisits = Math.round(avgVisits);
        apiAvailable = true;
      }
    } catch (e) {
      console.error("[MarketIntelligence] Error parsing total visits:", e);
    }
  }

  // Process Traffic by Country
  // Response: { meta: {...}, records: [{ country: 170, share: 0.9775, visits: 4750123, 
  //   pages_per_visit: 5.6, average_time: 252.5, bounce_rate: 0.22, rank: null, country_name: "Colombia" }, ...] }
  if (countryResult.status === "fulfilled") {
    try {
      const resp = countryResult.value as Record<string, unknown>;
      const records = resp.records as Array<Record<string, unknown>> | undefined;
      if (Array.isArray(records) && records.length > 0) {
        metrics.trafficByCountry = records.slice(0, 10).map((c) => ({
          country: String(c.country_name ?? c.country ?? ""),
          countryCode: Number(c.country ?? 0),
          share: Number(c.share ?? 0),
          visits: Number(c.visits ?? 0),
          pagesPerVisit: Number(c.pages_per_visit ?? 0),
          avgTime: Number(c.average_time ?? 0),
          bounceRate: Number(c.bounce_rate ?? 0),
          rank: Number(c.rank ?? 0),
        }));
        apiAvailable = true;

        // Extract pages per visit and avg session duration from country data (weighted average)
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
    } catch (e) {
      console.error("[MarketIntelligence] Error parsing traffic by country:", e);
    }
  }

  // Process Desktop Traffic Sources
  // Response: { meta: {...}, visits: { "domain.com": [
  //   { source_type: "Search", visits: [{ date: "...", organic: 206820, paid: 79090 }] },
  //   { source_type: "Direct", visits: [{ date: "...", organic: 81974, paid: 0 }] }, ...
  // ] } }
  if (desktopSourcesResult.status === "fulfilled") {
    try {
      const resp = desktopSourcesResult.value as Record<string, unknown>;
      const visitsObj = resp.visits as Record<string, unknown> | undefined;
      if (visitsObj && typeof visitsObj === "object") {
        // Get the first (and usually only) domain key
        const domainKeys = Object.keys(visitsObj);
        const domainData = domainKeys.length > 0
          ? visitsObj[domainKeys[0]] as Array<{ source_type: string; visits: Array<{ organic: number; paid: number }> }>
          : null;

        if (Array.isArray(domainData) && domainData.length > 0) {
          // Calculate total visits across all sources for share calculation
          let grandTotal = 0;
          const sourceTotals: Record<string, number> = {};

          for (const source of domainData) {
            const sourceType = source.source_type;
            let sourceTotal = 0;
            if (Array.isArray(source.visits)) {
              for (const v of source.visits) {
                sourceTotal += (v.organic || 0) + (v.paid || 0);
              }
            }
            // Average over months
            sourceTotal = sourceTotal / (source.visits?.length || 1);
            sourceTotals[sourceType] = sourceTotal;
            grandTotal += sourceTotal;
          }

          // Convert to shares
          if (grandTotal > 0) {
            for (const [sourceType, total] of Object.entries(sourceTotals)) {
              // Map SimilarWeb source types to cleaner labels
              const labelMap: Record<string, string> = {
                "Search": "Organic Search",
                "Social": "Social",
                "Mail": "Email",
                "Display Ads": "Display Ads",
                "Direct": "Direct",
                "Referrals": "Referrals",
              };
              const label = labelMap[sourceType] || sourceType;
              metrics.trafficSources[label] = total / grandTotal;
            }
            apiAvailable = true;
          }
        }
      }
    } catch (e) {
      console.error("[MarketIntelligence] Error parsing traffic sources:", e);
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
      ? `Datos reales del sitio: Visitas mensuales: ${siteMetrics.totalVisits ? (siteMetrics.totalVisits / 1000000).toFixed(2) + "M" : "no disponible"}, Tasa de rebote: ${siteMetrics.bounceRate ? (siteMetrics.bounceRate * 100).toFixed(1) + "%" : "no disponible"}, Duración sesión: ${siteMetrics.avgSessionDuration ? Math.floor(siteMetrics.avgSessionDuration / 60) + "min " + Math.round(siteMetrics.avgSessionDuration % 60) + "seg" : "no disponible"}, Páginas/visita: ${siteMetrics.pagesPerVisit?.toFixed(1) ?? "no disponible"}, Ranking global: #${siteMetrics.globalRank ?? "no disponible"}.`
      : "No se pudieron obtener datos reales del sitio (API temporalmente no disponible).";

    const trafficSourcesContext = Object.keys(siteMetrics.trafficSources).length > 0
      ? "Fuentes de tráfico: " + Object.entries(siteMetrics.trafficSources)
          .map(([k, v]) => `${k}: ${(v * 100).toFixed(1)}%`)
          .join(", ")
      : "";

    const countryContext = siteMetrics.trafficByCountry.length > 0
      ? "Distribución geográfica: " + siteMetrics.trafficByCountry.slice(0, 5)
          .map((c) => `${c.country}: ${(c.share * 100).toFixed(1)}%`)
          .join(", ")
      : "";

    const benchmarkContext = benchmarks
      .map((b) => `${b.metric}: sitio=${b.siteValue !== null ? (b.unit === "%" ? (Number(b.siteValue) * 100).toFixed(1) + "%" : b.unit === "seg" ? Math.round(Number(b.siteValue)) + "seg" : Number(b.siteValue).toLocaleString()) : "N/D"}, promedio industria=${b.industryAvg !== null ? (b.unit === "%" ? (Number(b.industryAvg) * 100).toFixed(1) + "%" : b.unit === "seg" ? Math.round(Number(b.industryAvg)) + "seg" : Number(b.industryAvg).toLocaleString()) : "N/D"}, líder=${b.topPlayerName}`)
      .join("\n");

    const competitorContext = competitors
      .map((c) => `${c.name} (${c.domain}): ${((c.totalVisits ?? 0) / 1000000).toFixed(1)}M visitas, ${((c.bounceRate ?? 0) * 100).toFixed(0)}% rebote`)
      .join("\n");

    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `Eres un analista de inteligencia de mercado digital especializado en Colombia y Latinoamérica. Genera insights estratégicos concisos, accionables y basados en datos. Cada insight debe ser de 1-2 oraciones máximo. Responde siempre en español.`,
        },
        {
          role: "user",
          content: `Analiza el sitio ${domain} en la industria de ${industryLabel} en ${countryLabel}.

${metricsContext}
${trafficSourcesContext}
${countryContext}

Benchmarking vs industria:
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
      `Los datos de tráfico en tiempo real no están disponibles temporalmente. El análisis se basa en los benchmarks de la industria de ${industryLabel} en ${countryLabel}.`
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
  const organicShare = sources["Organic Search"] ?? 0;
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
