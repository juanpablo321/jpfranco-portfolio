import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { callDataApi } from "../_core/dataApi";

// ─── Types ───────────────────────────────────────────────────────────────────

interface PageSpeedResult {
  performanceScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  seoScore: number;
  metrics: {
    firstContentfulPaint: string;
    largestContentfulPaint: string;
    totalBlockingTime: string;
    cumulativeLayoutShift: string;
    speedIndex: string;
    timeToInteractive: string;
  };
  diagnostics: Array<{
    title: string;
    description: string;
    score: number | null;
    displayValue?: string;
  }>;
}

interface CrawlResult {
  title: string;
  metaDescription: string;
  canonical: string;
  h1Tags: string[];
  h2Tags: string[];
  h3Tags: string[];
  imgWithoutAlt: number;
  totalImages: number;
  internalLinks: number;
  externalLinks: number;
  brokenLinks: string[];
  hasRobotsTxt: boolean;
  hasSitemap: boolean;
  hasHttps: boolean;
  hasViewport: boolean;
  hasFavicon: boolean;
  ogTags: Record<string, string>;
  wordCount: number;
  loadTimeMs: number;
  htmlSize: number;
  issues: Array<{
    type: "critical" | "warning" | "info";
    category: string;
    message: string;
    recommendation: string;
  }>;
}

interface SimilarWebResult {
  globalRank: number | null;
  bounceRate: number | null;
  totalVisits: number | null;
  trafficByCountry: Array<{
    country: string;
    share: number;
    visits: number;
  }>;
  trafficSources: Record<string, number>;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normalizeUrl(input: string): string {
  let url = input.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = "https://" + url;
  }
  return url;
}

function extractDomain(url: string): string {
  try {
    const parsed = new URL(normalizeUrl(url));
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
  }
}

async function crawlUrl(url: string): Promise<CrawlResult> {
  const normalizedUrl = normalizeUrl(url);
  const startTime = Date.now();
  const issues: CrawlResult["issues"] = [];

  let html = "";
  let statusCode = 0;
  let htmlSize = 0;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const response = await fetch(normalizedUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; JPFrancoSEOBot/1.0)",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    });
    clearTimeout(timeout);
    statusCode = response.status;
    html = await response.text();
    htmlSize = new TextEncoder().encode(html).length;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    issues.push({
      type: "critical",
      category: "Accesibilidad",
      message: `No se pudo acceder al sitio: ${message}`,
      recommendation: "Verifica que la URL sea correcta y que el sitio esté en línea.",
    });
    return {
      title: "",
      metaDescription: "",
      canonical: "",
      h1Tags: [],
      h2Tags: [],
      h3Tags: [],
      imgWithoutAlt: 0,
      totalImages: 0,
      internalLinks: 0,
      externalLinks: 0,
      brokenLinks: [],
      hasRobotsTxt: false,
      hasSitemap: false,
      hasHttps: normalizedUrl.startsWith("https"),
      hasViewport: false,
      hasFavicon: false,
      ogTags: {},
      wordCount: 0,
      loadTimeMs: Date.now() - startTime,
      htmlSize: 0,
      issues,
    };
  }

  const loadTimeMs = Date.now() - startTime;

  // Parse HTML with regex (lightweight, no DOM dependency)
  const getMetaContent = (name: string): string => {
    const regex = new RegExp(
      `<meta[^>]*(?:name|property)=["']${name}["'][^>]*content=["']([^"']*)["']|<meta[^>]*content=["']([^"']*)["'][^>]*(?:name|property)=["']${name}["']`,
      "i"
    );
    const match = html.match(regex);
    return match?.[1] || match?.[2] || "";
  };

  const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "").trim();
  const metaDescription = getMetaContent("description");
  const canonical =
    html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i)?.[1] || "";
  const viewport = getMetaContent("viewport");

  // Headings
  const h1Tags = Array.from(html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)).map((m) =>
    m[1].replace(/<[^>]*>/g, "").trim()
  );
  const h2Tags = Array.from(html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)).map((m) =>
    m[1].replace(/<[^>]*>/g, "").trim()
  );
  const h3Tags = Array.from(html.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/gi)).map((m) =>
    m[1].replace(/<[^>]*>/g, "").trim()
  );

  // Images
  const imgTags = Array.from(html.matchAll(/<img[^>]*>/gi));
  const totalImages = imgTags.length;
  const imgWithoutAlt = imgTags.filter(
    (m) => !m[0].match(/alt=["'][^"']+["']/i)
  ).length;

  // Links
  const domain = extractDomain(normalizedUrl);
  const allLinks = Array.from(html.matchAll(/<a[^>]*href=["']([^"'#]*?)["']/gi)).map(
    (m) => m[1]
  );
  const internalLinks = allLinks.filter(
    (l) => l.startsWith("/") || l.includes(domain)
  ).length;
  const externalLinks = allLinks.filter(
    (l) => l.startsWith("http") && !l.includes(domain)
  ).length;

  // OG Tags
  const ogTags: Record<string, string> = {};
  for (const prop of ["og:title", "og:description", "og:image", "og:url", "og:type"]) {
    const val = getMetaContent(prop);
    if (val) ogTags[prop] = val;
  }

  // Favicon
  const hasFavicon =
    /<link[^>]*rel=["'](?:icon|shortcut icon)["']/i.test(html) ||
    /<link[^>]*href=["'][^"']*favicon/i.test(html);

  // Word count (strip HTML)
  const textContent = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const wordCount = textContent.split(/\s+/).filter((w) => w.length > 0).length;

  // Check robots.txt and sitemap
  let hasRobotsTxt = false;
  let hasSitemap = false;
  try {
    const parsedUrl = new URL(normalizedUrl);
    const robotsRes = await fetch(`${parsedUrl.origin}/robots.txt`, {
      signal: AbortSignal.timeout(5000),
    });
    hasRobotsTxt = robotsRes.ok && (await robotsRes.text()).length > 0;
  } catch {}
  try {
    const parsedUrl = new URL(normalizedUrl);
    const sitemapRes = await fetch(`${parsedUrl.origin}/sitemap.xml`, {
      signal: AbortSignal.timeout(5000),
    });
    hasSitemap =
      sitemapRes.ok && (await sitemapRes.text()).includes("<urlset");
  } catch {}

  const hasHttps = normalizedUrl.startsWith("https");
  const hasViewport = viewport.length > 0;

  // ─── Generate Issues ───────────────────────────────────────────────────────

  // Title
  if (!title) {
    issues.push({
      type: "critical",
      category: "Meta Tags",
      message: "No se encontró la etiqueta <title>",
      recommendation: "Agrega un título único de 50-60 caracteres que incluya tu keyword principal.",
    });
  } else if (title.length < 30) {
    issues.push({
      type: "warning",
      category: "Meta Tags",
      message: `El título es muy corto (${title.length} caracteres)`,
      recommendation: "Amplía el título a 50-60 caracteres para mejor visibilidad en SERPs.",
    });
  } else if (title.length > 60) {
    issues.push({
      type: "warning",
      category: "Meta Tags",
      message: `El título es muy largo (${title.length} caracteres)`,
      recommendation: "Reduce el título a máximo 60 caracteres para evitar truncamiento en Google.",
    });
  }

  // Meta description
  if (!metaDescription) {
    issues.push({
      type: "critical",
      category: "Meta Tags",
      message: "No se encontró meta description",
      recommendation: "Agrega una meta description de 150-160 caracteres con tu propuesta de valor.",
    });
  } else if (metaDescription.length < 120) {
    issues.push({
      type: "warning",
      category: "Meta Tags",
      message: `La meta description es muy corta (${metaDescription.length} caracteres)`,
      recommendation: "Amplía la meta description a 150-160 caracteres.",
    });
  } else if (metaDescription.length > 160) {
    issues.push({
      type: "warning",
      category: "Meta Tags",
      message: `La meta description es muy larga (${metaDescription.length} caracteres)`,
      recommendation: "Reduce la meta description a máximo 160 caracteres.",
    });
  }

  // H1
  if (h1Tags.length === 0) {
    issues.push({
      type: "critical",
      category: "Estructura",
      message: "No se encontró ninguna etiqueta H1",
      recommendation: "Agrega exactamente un H1 por página con tu keyword principal.",
    });
  } else if (h1Tags.length > 1) {
    issues.push({
      type: "warning",
      category: "Estructura",
      message: `Se encontraron ${h1Tags.length} etiquetas H1 (debería haber solo 1)`,
      recommendation: "Usa solo un H1 por página. Usa H2/H3 para subtítulos.",
    });
  }

  // Images
  if (imgWithoutAlt > 0) {
    issues.push({
      type: "warning",
      category: "Accesibilidad",
      message: `${imgWithoutAlt} de ${totalImages} imágenes sin atributo alt`,
      recommendation: "Agrega texto alt descriptivo a todas las imágenes para accesibilidad y SEO.",
    });
  }

  // HTTPS
  if (!hasHttps) {
    issues.push({
      type: "critical",
      category: "Seguridad",
      message: "El sitio no usa HTTPS",
      recommendation: "Migra a HTTPS. Google penaliza sitios sin SSL en los rankings.",
    });
  }

  // Viewport
  if (!hasViewport) {
    issues.push({
      type: "critical",
      category: "Mobile",
      message: "No se encontró meta viewport",
      recommendation: 'Agrega <meta name="viewport" content="width=device-width, initial-scale=1"> para compatibilidad móvil.',
    });
  }

  // Robots.txt
  if (!hasRobotsTxt) {
    issues.push({
      type: "warning",
      category: "Rastreo",
      message: "No se encontró archivo robots.txt",
      recommendation: "Crea un robots.txt para controlar qué páginas pueden rastrear los buscadores.",
    });
  }

  // Sitemap
  if (!hasSitemap) {
    issues.push({
      type: "warning",
      category: "Rastreo",
      message: "No se encontró sitemap.xml",
      recommendation: "Crea un sitemap.xml y envíalo a Google Search Console.",
    });
  }

  // Canonical
  if (!canonical) {
    issues.push({
      type: "info",
      category: "Meta Tags",
      message: "No se encontró etiqueta canonical",
      recommendation: "Agrega una URL canónica para evitar problemas de contenido duplicado.",
    });
  }

  // OG Tags
  if (Object.keys(ogTags).length === 0) {
    issues.push({
      type: "warning",
      category: "Social",
      message: "No se encontraron Open Graph tags",
      recommendation: "Agrega og:title, og:description y og:image para mejorar la apariencia al compartir en redes sociales.",
    });
  }

  // Word count
  if (wordCount < 300) {
    issues.push({
      type: "warning",
      category: "Contenido",
      message: `Contenido insuficiente (${wordCount} palabras)`,
      recommendation: "Google prefiere páginas con al menos 300+ palabras de contenido relevante.",
    });
  }

  // Favicon
  if (!hasFavicon) {
    issues.push({
      type: "info",
      category: "UX",
      message: "No se detectó favicon",
      recommendation: "Agrega un favicon para mejorar la identidad de marca en las pestañas del navegador.",
    });
  }

  // Load time
  if (loadTimeMs > 3000) {
    issues.push({
      type: "warning",
      category: "Rendimiento",
      message: `Tiempo de carga alto (${(loadTimeMs / 1000).toFixed(1)}s)`,
      recommendation: "Optimiza imágenes, minifica CSS/JS y usa CDN para mejorar la velocidad.",
    });
  }

  // HTML size
  if (htmlSize > 500000) {
    issues.push({
      type: "warning",
      category: "Rendimiento",
      message: `HTML muy pesado (${(htmlSize / 1024).toFixed(0)} KB)`,
      recommendation: "Reduce el tamaño del HTML. Considera lazy loading y code splitting.",
    });
  }

  return {
    title,
    metaDescription,
    canonical,
    h1Tags,
    h2Tags,
    h3Tags,
    imgWithoutAlt,
    totalImages,
    internalLinks,
    externalLinks,
    brokenLinks: [],
    hasRobotsTxt,
    hasSitemap,
    hasHttps,
    hasViewport,
    hasFavicon,
    ogTags,
    wordCount,
    loadTimeMs,
    htmlSize,
    issues,
  };
}

async function getPageSpeedData(url: string): Promise<PageSpeedResult> {
  const normalizedUrl = normalizeUrl(url);
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(normalizedUrl)}&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);
    const response = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`PageSpeed API returned ${response.status}`);
    }

    const data = await response.json();
    const lighthouse = data.lighthouseResult;
    const categories = lighthouse?.categories || {};
    const audits = lighthouse?.audits || {};

    const diagnosticAudits = [
      "render-blocking-resources",
      "uses-optimized-images",
      "uses-text-compression",
      "uses-responsive-images",
      "unminified-css",
      "unminified-javascript",
      "unused-css-rules",
      "unused-javascript",
      "efficient-animated-content",
      "server-response-time",
      "redirects",
      "dom-size",
      "critical-request-chains",
      "font-display",
    ];

    const diagnostics = diagnosticAudits
      .filter((id) => audits[id])
      .map((id) => ({
        title: audits[id].title || id,
        description: (audits[id].description || "").replace(/\[.*?\]\(.*?\)/g, "").trim(),
        score: audits[id].score,
        displayValue: audits[id].displayValue,
      }));

    return {
      performanceScore: Math.round((categories.performance?.score || 0) * 100),
      accessibilityScore: Math.round((categories.accessibility?.score || 0) * 100),
      bestPracticesScore: Math.round((categories["best-practices"]?.score || 0) * 100),
      seoScore: Math.round((categories.seo?.score || 0) * 100),
      metrics: {
        firstContentfulPaint: audits["first-contentful-paint"]?.displayValue || "N/A",
        largestContentfulPaint: audits["largest-contentful-paint"]?.displayValue || "N/A",
        totalBlockingTime: audits["total-blocking-time"]?.displayValue || "N/A",
        cumulativeLayoutShift: audits["cumulative-layout-shift"]?.displayValue || "N/A",
        speedIndex: audits["speed-index"]?.displayValue || "N/A",
        timeToInteractive: audits["interactive"]?.displayValue || "N/A",
      },
      diagnostics,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[PageSpeed] Error:", message);
    return {
      performanceScore: 0,
      accessibilityScore: 0,
      bestPracticesScore: 0,
      seoScore: 0,
      metrics: {
        firstContentfulPaint: "N/A",
        largestContentfulPaint: "N/A",
        totalBlockingTime: "N/A",
        cumulativeLayoutShift: "N/A",
        speedIndex: "N/A",
        timeToInteractive: "N/A",
      },
      diagnostics: [],
    };
  }
}

async function getSimilarWebData(domain: string): Promise<SimilarWebResult> {
  const result: SimilarWebResult = {
    globalRank: null,
    bounceRate: null,
    totalVisits: null,
    trafficByCountry: [],
    trafficSources: {},
  };

  // Calculate date range: last 3 complete months
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, 1);
  const endDate = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, "0")}`;
  const startDate = `${threeMonthsAgo.getFullYear()}-${String(threeMonthsAgo.getMonth() + 1).padStart(2, "0")}`;

  // Global Rank
  try {
    const rankData = (await callDataApi("Similarweb/get_global_rank", {
      pathParams: { domain },
      query: { main_domain_only: "false", start_date: startDate, end_date: endDate },
    })) as Record<string, unknown>[];
    if (Array.isArray(rankData) && rankData.length > 0) {
      const latest = rankData[rankData.length - 1];
      result.globalRank = (latest as Record<string, number>).global_rank ?? null;
    }
  } catch (err) {
    console.warn("[SimilarWeb] Global rank error:", err);
  }

  // Bounce Rate
  try {
    const bounceData = (await callDataApi("Similarweb/get_bounce_rate", {
      pathParams: { domain },
      query: {
        country: "world",
        granularity: "monthly",
        main_domain_only: "false",
        start_date: startDate,
        end_date: endDate,
      },
    })) as Record<string, unknown>[];
    if (Array.isArray(bounceData) && bounceData.length > 0) {
      const latest = bounceData[bounceData.length - 1];
      result.bounceRate = (latest as Record<string, number>).bounce_rate ?? null;
    }
  } catch (err) {
    console.warn("[SimilarWeb] Bounce rate error:", err);
  }

  // Total Visits
  try {
    const visitsData = (await callDataApi("Similarweb/get_visits_total", {
      pathParams: { domain },
      query: {
        country: "world",
        granularity: "monthly",
        main_domain_only: "false",
        start_date: startDate,
        end_date: endDate,
      },
    })) as Record<string, unknown>[];
    if (Array.isArray(visitsData) && visitsData.length > 0) {
      const latest = visitsData[visitsData.length - 1];
      result.totalVisits = (latest as Record<string, number>).visits ?? null;
    }
  } catch (err) {
    console.warn("[SimilarWeb] Total visits error:", err);
  }

  // Traffic by Country
  try {
    const countryData = (await callDataApi("Similarweb/get_total_traffic_by_country", {
      pathParams: { domain },
      query: {
        main_domain_only: "true",
        limit: "5",
        start_date: startDate,
        end_date: endDate,
      },
    })) as Record<string, unknown>[];
    if (Array.isArray(countryData)) {
      result.trafficByCountry = countryData.slice(0, 5).map((c: Record<string, unknown>) => ({
        country: String(c.country ?? ""),
        share: Number(c.share ?? 0),
        visits: Number(c.visits ?? 0),
      }));
    }
  } catch (err) {
    console.warn("[SimilarWeb] Traffic by country error:", err);
  }

  // Traffic Sources
  try {
    const sourcesData = (await callDataApi("Similarweb/get_traffic_sources_desktop", {
      pathParams: { domain },
      query: {
        country: "world",
        granularity: "monthly",
        main_domain_only: "false",
        start_date: startDate,
        end_date: endDate,
      },
    })) as Record<string, unknown>;
    if (sourcesData && typeof sourcesData === "object") {
      const overview = (sourcesData as Record<string, unknown>).overview as Record<string, unknown>[] | undefined;
      if (Array.isArray(overview)) {
        for (const source of overview) {
          const name = String(source.source_type ?? "unknown");
          result.trafficSources[name] = Number(source.share ?? 0);
        }
      }
    }
  } catch (err) {
    console.warn("[SimilarWeb] Traffic sources error:", err);
  }

  return result;
}

function calculateOverallScore(
  crawl: CrawlResult,
  pageSpeed: PageSpeedResult
): number {
  let score = 100;

  // Critical issues: -8 each
  const criticalCount = crawl.issues.filter((i) => i.type === "critical").length;
  score -= criticalCount * 8;

  // Warnings: -3 each
  const warningCount = crawl.issues.filter((i) => i.type === "warning").length;
  score -= warningCount * 3;

  // Info: -1 each
  const infoCount = crawl.issues.filter((i) => i.type === "info").length;
  score -= infoCount * 1;

  // PageSpeed performance weight (30% of score)
  if (pageSpeed.performanceScore > 0) {
    const perfPenalty = Math.max(0, (100 - pageSpeed.performanceScore) * 0.3);
    score -= perfPenalty;
  }

  // SEO score from Lighthouse (20% weight)
  if (pageSpeed.seoScore > 0) {
    const seoPenalty = Math.max(0, (100 - pageSpeed.seoScore) * 0.2);
    score -= seoPenalty;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

// ─── Router ──────────────────────────────────────────────────────────────────

export const seoAnalyzerRouter = router({
  analyze: publicProcedure
    .input(
      z.object({
        url: z.string().min(1, "La URL es requerida"),
      })
    )
    .mutation(async ({ input }) => {
      const { url } = input;
      const domain = extractDomain(url);

      // Run crawl and PageSpeed in parallel
      const [crawlResult, pageSpeedResult] = await Promise.all([
        crawlUrl(url),
        getPageSpeedData(url),
      ]);

      // SimilarWeb runs separately (may fail for small sites)
      const similarWebResult = await getSimilarWebData(domain);

      const overallScore = calculateOverallScore(crawlResult, pageSpeedResult);

      return {
        url: normalizeUrl(url),
        domain,
        overallScore,
        analyzedAt: new Date().toISOString(),
        crawl: crawlResult,
        pageSpeed: pageSpeedResult,
        similarWeb: similarWebResult,
      };
    }),
});
