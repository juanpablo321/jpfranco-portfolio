import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
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

// ─── Site Metrics (Industry Benchmark Based) ────────────────────────────────
// Without SimilarWeb, we initialize metrics from the domain itself.
// Real-time traffic data is no longer available.

function buildSiteMetrics(domain: string): SiteMetrics {
  return {
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
  competitors: CompetitorInfo[]
): Promise<string[]> {
  try {
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
          content: `Eres un analista de inteligencia de mercado digital especializado en Colombia y Latinoamérica. Genera insights estratégicos concisos, accionables y basados en datos de la industria. Cada insight debe ser de 1-2 oraciones máximo. Responde siempre en español.`,
        },
        {
          role: "user",
          content: `Analiza el sitio ${domain} en la industria de ${industryLabel} en ${countryLabel}.

Nota: No se dispone de datos de tráfico en tiempo real para este sitio. El análisis se basa en los benchmarks de la industria y los competidores principales.

Benchmarking vs industria:
${benchmarkContext}

Competidores principales:
${competitorContext}

Genera exactamente 4 insights estratégicos diferentes:
1. Un insight sobre el panorama competitivo de ${industryLabel} en ${countryLabel} y cómo posicionarse
2. Un insight sobre oportunidades de crecimiento digital específicas para ${countryLabel}
3. Un insight sobre mejores prácticas de engagement basadas en los líderes de la industria
4. Un insight sobre estrategia de canales de adquisición recomendada para competir en este mercado

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
  return generateStaticInsights(domain, industryLabel, countryLabel, benchmarks, competitors);
}

function generateStaticInsights(
  domain: string,
  industryLabel: string,
  countryLabel: string,
  benchmarks: BenchmarkComparison[],
  competitors: CompetitorInfo[]
): string[] {
  const insights: string[] = [];

  insights.push(
    `El mercado de ${industryLabel} en ${countryLabel} está dominado por jugadores como ${competitors.map((c) => c.name).join(", ")}. Analiza sus estrategias digitales para identificar oportunidades de diferenciación.`
  );

  const avgVisits = benchmarks.find((b) => b.metric === "Visitas Mensuales");
  if (avgVisits?.industryAvg) {
    insights.push(
      `El promedio de visitas mensuales en ${industryLabel} es de ${(avgVisits.industryAvg / 1000000).toFixed(1)}M. Una estrategia combinada de SEO y marketing de contenidos puede ayudar a ${domain} a capturar una mayor cuota de este tráfico.`
    );
  }

  const avgBounce = benchmarks.find((b) => b.metric === "Tasa de Rebote");
  if (avgBounce?.industryAvg) {
    insights.push(
      `La tasa de rebote promedio en la industria es ${(Number(avgBounce.industryAvg) * 100).toFixed(1)}%. Optimizar la experiencia de usuario, velocidad de carga y relevancia del contenido son claves para estar por debajo de este umbral.`
    );
  }

  insights.push(
    `Para competir efectivamente en ${industryLabel} de ${countryLabel}, se recomienda una estrategia multicanal que combine SEO orgánico, marketing de contenidos localizado, y presencia activa en redes sociales relevantes para la audiencia local.`
  );

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

      // Build site metrics (no real-time data without SimilarWeb)
      const siteMetrics = buildSiteMetrics(domain);

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
        competitors
      );

      const result: MarketIntelligenceResult = {
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
      };

      return result;
    }),
});
