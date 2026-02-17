// ─── Market Intelligence Types & Data ────────────────────────────────────────

// Countries with individual entries for LATAM + USA, grouped for rest
export interface CountryOption {
  code: string; // ISO 2-letter or group key
  label: string;
  flag?: string;
  group?: string;
}

export const COUNTRIES: CountryOption[] = [
  { code: "co", label: "Colombia", flag: "🇨🇴" },
  { code: "mx", label: "México", flag: "🇲🇽" },
  { code: "ar", label: "Argentina", flag: "🇦🇷" },
  { code: "cl", label: "Chile", flag: "🇨🇱" },
  { code: "pe", label: "Perú", flag: "🇵🇪" },
  { code: "us", label: "Estados Unidos", flag: "🇺🇸" },
  { code: "br", label: "Brasil", flag: "🇧🇷" },
  // Europe group
  { code: "es", label: "España", flag: "🇪🇸", group: "Europa" },
  { code: "gb", label: "Reino Unido", flag: "🇬🇧", group: "Europa" },
  { code: "de", label: "Alemania", flag: "🇩🇪", group: "Europa" },
  { code: "fr", label: "Francia", flag: "🇫🇷", group: "Europa" },
  // Asia group
  { code: "cn", label: "China", flag: "🇨🇳", group: "Asia" },
  { code: "jp", label: "Japón", flag: "🇯🇵", group: "Asia" },
  { code: "in", label: "India", flag: "🇮🇳", group: "Asia" },
  { code: "kr", label: "Corea del Sur", flag: "🇰🇷", group: "Asia" },
  // Africa group
  { code: "ng", label: "Nigeria", flag: "🇳🇬", group: "África" },
  { code: "za", label: "Sudáfrica", flag: "🇿🇦", group: "África" },
  { code: "ke", label: "Kenia", flag: "🇰🇪", group: "África" },
];

// ─── Industry Definitions with Colombian Benchmarks ─────────────────────────

export interface IndustryBenchmark {
  domain: string;
  name: string;
  avgMonthlyVisits: number;
  avgBounceRate: number;
  avgSessionDuration: number; // seconds
  avgPagesPerVisit: number;
}

export interface IndustryConfig {
  id: string;
  label: string;
  icon: string; // emoji
  benchmarks: Record<string, IndustryBenchmark[]>; // keyed by country code
}

export const INDUSTRIES: IndustryConfig[] = [
  {
    id: "retail-ecommerce",
    label: "Retail / E-commerce",
    icon: "🛒",
    benchmarks: {
      co: [
        { domain: "mercadolibre.com.co", name: "Mercado Libre", avgMonthlyVisits: 85000000, avgBounceRate: 0.32, avgSessionDuration: 420, avgPagesPerVisit: 8.5 },
        { domain: "falabella.com.co", name: "Falabella", avgMonthlyVisits: 12000000, avgBounceRate: 0.38, avgSessionDuration: 300, avgPagesPerVisit: 6.2 },
        { domain: "exito.com", name: "Éxito", avgMonthlyVisits: 18000000, avgBounceRate: 0.35, avgSessionDuration: 280, avgPagesPerVisit: 5.8 },
      ],
      mx: [
        { domain: "mercadolibre.com.mx", name: "Mercado Libre MX", avgMonthlyVisits: 250000000, avgBounceRate: 0.30, avgSessionDuration: 450, avgPagesPerVisit: 9.0 },
        { domain: "amazon.com.mx", name: "Amazon MX", avgMonthlyVisits: 120000000, avgBounceRate: 0.33, avgSessionDuration: 380, avgPagesPerVisit: 7.5 },
        { domain: "liverpool.com.mx", name: "Liverpool", avgMonthlyVisits: 35000000, avgBounceRate: 0.36, avgSessionDuration: 310, avgPagesPerVisit: 6.0 },
      ],
      ar: [
        { domain: "mercadolibre.com.ar", name: "Mercado Libre AR", avgMonthlyVisits: 300000000, avgBounceRate: 0.29, avgSessionDuration: 460, avgPagesPerVisit: 9.2 },
        { domain: "fravega.com", name: "Frávega", avgMonthlyVisits: 15000000, avgBounceRate: 0.37, avgSessionDuration: 280, avgPagesPerVisit: 5.5 },
        { domain: "garbarino.com", name: "Garbarino", avgMonthlyVisits: 8000000, avgBounceRate: 0.40, avgSessionDuration: 250, avgPagesPerVisit: 5.0 },
      ],
    },
  },
  {
    id: "tecnologia",
    label: "Tecnología / Apps",
    icon: "💻",
    benchmarks: {
      co: [
        { domain: "rappi.com.co", name: "Rappi", avgMonthlyVisits: 8000000, avgBounceRate: 0.42, avgSessionDuration: 180, avgPagesPerVisit: 3.5 },
        { domain: "habi.co", name: "Habi", avgMonthlyVisits: 2500000, avgBounceRate: 0.45, avgSessionDuration: 200, avgPagesPerVisit: 4.0 },
        { domain: "bold.co", name: "Bold", avgMonthlyVisits: 1800000, avgBounceRate: 0.48, avgSessionDuration: 160, avgPagesPerVisit: 3.2 },
      ],
      mx: [
        { domain: "rappi.com.mx", name: "Rappi MX", avgMonthlyVisits: 15000000, avgBounceRate: 0.40, avgSessionDuration: 190, avgPagesPerVisit: 3.8 },
        { domain: "kavak.com", name: "Kavak", avgMonthlyVisits: 8000000, avgBounceRate: 0.43, avgSessionDuration: 220, avgPagesPerVisit: 4.5 },
        { domain: "clip.mx", name: "Clip", avgMonthlyVisits: 3000000, avgBounceRate: 0.46, avgSessionDuration: 170, avgPagesPerVisit: 3.0 },
      ],
    },
  },
  {
    id: "banca-fintech",
    label: "Banca / Fintech",
    icon: "🏦",
    benchmarks: {
      co: [
        { domain: "bancolombia.com", name: "Bancolombia", avgMonthlyVisits: 45000000, avgBounceRate: 0.25, avgSessionDuration: 540, avgPagesPerVisit: 7.0 },
        { domain: "nequi.com.co", name: "Nequi", avgMonthlyVisits: 12000000, avgBounceRate: 0.35, avgSessionDuration: 300, avgPagesPerVisit: 4.5 },
        { domain: "davivienda.com", name: "Davivienda", avgMonthlyVisits: 20000000, avgBounceRate: 0.28, avgSessionDuration: 480, avgPagesPerVisit: 6.5 },
      ],
      mx: [
        { domain: "bbva.mx", name: "BBVA México", avgMonthlyVisits: 60000000, avgBounceRate: 0.24, avgSessionDuration: 560, avgPagesPerVisit: 7.5 },
        { domain: "nubank.com.mx", name: "Nu México", avgMonthlyVisits: 8000000, avgBounceRate: 0.38, avgSessionDuration: 250, avgPagesPerVisit: 4.0 },
        { domain: "banorte.com", name: "Banorte", avgMonthlyVisits: 35000000, avgBounceRate: 0.26, avgSessionDuration: 500, avgPagesPerVisit: 7.0 },
      ],
    },
  },
  {
    id: "turismo",
    label: "Turismo",
    icon: "✈️",
    benchmarks: {
      co: [
        { domain: "aviatur.com", name: "Aviatur", avgMonthlyVisits: 3500000, avgBounceRate: 0.38, avgSessionDuration: 320, avgPagesPerVisit: 5.5 },
        { domain: "decameron.com", name: "Decameron", avgMonthlyVisits: 2000000, avgBounceRate: 0.42, avgSessionDuration: 280, avgPagesPerVisit: 4.8 },
        { domain: "despegar.com.co", name: "Despegar", avgMonthlyVisits: 5000000, avgBounceRate: 0.36, avgSessionDuration: 350, avgPagesPerVisit: 6.0 },
      ],
      mx: [
        { domain: "despegar.com.mx", name: "Despegar MX", avgMonthlyVisits: 12000000, avgBounceRate: 0.34, avgSessionDuration: 370, avgPagesPerVisit: 6.5 },
        { domain: "bestday.com.mx", name: "BestDay", avgMonthlyVisits: 8000000, avgBounceRate: 0.37, avgSessionDuration: 330, avgPagesPerVisit: 5.8 },
        { domain: "booking.com", name: "Booking.com", avgMonthlyVisits: 50000000, avgBounceRate: 0.30, avgSessionDuration: 400, avgPagesPerVisit: 7.0 },
      ],
    },
  },
  {
    id: "educacion",
    label: "Educación",
    icon: "🎓",
    benchmarks: {
      co: [
        { domain: "unal.edu.co", name: "U. Nacional", avgMonthlyVisits: 8000000, avgBounceRate: 0.40, avgSessionDuration: 260, avgPagesPerVisit: 4.2 },
        { domain: "platzi.com", name: "Platzi", avgMonthlyVisits: 15000000, avgBounceRate: 0.35, avgSessionDuration: 480, avgPagesPerVisit: 5.5 },
        { domain: "icetex.gov.co", name: "ICETEX", avgMonthlyVisits: 5000000, avgBounceRate: 0.38, avgSessionDuration: 300, avgPagesPerVisit: 4.8 },
      ],
    },
  },
  {
    id: "inmobiliario",
    label: "Inmobiliario",
    icon: "🏠",
    benchmarks: {
      co: [
        { domain: "metrocuadrado.com", name: "Metrocuadrado", avgMonthlyVisits: 6000000, avgBounceRate: 0.35, avgSessionDuration: 380, avgPagesPerVisit: 6.5 },
        { domain: "fincaraiz.com.co", name: "FincaRaíz", avgMonthlyVisits: 8000000, avgBounceRate: 0.33, avgSessionDuration: 400, avgPagesPerVisit: 7.0 },
        { domain: "ciencuadras.com", name: "Ciencuadras", avgMonthlyVisits: 3000000, avgBounceRate: 0.40, avgSessionDuration: 320, avgPagesPerVisit: 5.5 },
      ],
    },
  },
  {
    id: "salud",
    label: "Salud",
    icon: "🏥",
    benchmarks: {
      co: [
        { domain: "colsanitas.com", name: "Colsanitas", avgMonthlyVisits: 4000000, avgBounceRate: 0.38, avgSessionDuration: 280, avgPagesPerVisit: 4.5 },
        { domain: "sura.com", name: "Sura Salud", avgMonthlyVisits: 6000000, avgBounceRate: 0.35, avgSessionDuration: 300, avgPagesPerVisit: 5.0 },
        { domain: "compensar.com", name: "Compensar", avgMonthlyVisits: 5000000, avgBounceRate: 0.37, avgSessionDuration: 260, avgPagesPerVisit: 4.2 },
      ],
    },
  },
  {
    id: "moda",
    label: "Moda",
    icon: "👗",
    benchmarks: {
      co: [
        { domain: "arturocalle.com", name: "Arturo Calle", avgMonthlyVisits: 1500000, avgBounceRate: 0.42, avgSessionDuration: 240, avgPagesPerVisit: 4.5 },
        { domain: "studiof.com.co", name: "Studio F", avgMonthlyVisits: 1200000, avgBounceRate: 0.44, avgSessionDuration: 220, avgPagesPerVisit: 4.2 },
        { domain: "leonisa.com", name: "Leonisa", avgMonthlyVisits: 3000000, avgBounceRate: 0.38, avgSessionDuration: 280, avgPagesPerVisit: 5.0 },
      ],
    },
  },
];

// ─── Analysis Result Types ──────────────────────────────────────────────────

export interface SiteMetrics {
  domain: string;
  globalRank: number | null;
  countryRank: number | null;
  totalVisits: number | null;
  bounceRate: number | null;
  avgSessionDuration: number | null; // seconds
  pagesPerVisit: number | null;
  trafficByCountry: Array<{
    country: string;
    countryCode: number;
    share: number;
    visits: number;
    pagesPerVisit: number;
    avgTime: number;
    bounceRate: number;
    rank: number;
  }>;
  trafficSources: Record<string, number>;
  mobileVsDesktop: {
    desktop: number;
    mobile: number;
  };
}

export interface CompetitorInfo {
  domain: string;
  name: string;
  globalRank: number | null;
  totalVisits: number | null;
  bounceRate: number | null;
  avgSessionDuration: number | null;
  isIndustryLeader: boolean;
}

export interface BenchmarkComparison {
  metric: string;
  siteValue: number | null;
  industryAvg: number | null;
  topPlayer: number | null;
  topPlayerName: string;
  unit: string;
  higherIsBetter: boolean;
}

export interface MarketIntelligenceResult {
  domain: string;
  url: string;
  country: string;
  countryLabel: string;
  industry: string;
  industryLabel: string;
  analyzedAt: string;
  siteMetrics: SiteMetrics;
  competitors: CompetitorInfo[];
  benchmarks: BenchmarkComparison[];
  insights: string[];
}

// ─── Helper Functions ───────────────────────────────────────────────────────

export function getIndustryById(id: string): IndustryConfig | undefined {
  return INDUSTRIES.find((i) => i.id === id);
}

export function getCountryByCode(code: string): CountryOption | undefined {
  return COUNTRIES.find((c) => c.code === code);
}

export function getIndustryBenchmarks(
  industryId: string,
  countryCode: string
): IndustryBenchmark[] {
  const industry = getIndustryById(industryId);
  if (!industry) return [];
  return industry.benchmarks[countryCode] || industry.benchmarks["co"] || [];
}

export function calculateIndustryAverage(benchmarks: IndustryBenchmark[]) {
  if (benchmarks.length === 0) {
    return { avgVisits: 0, avgBounceRate: 0, avgSessionDuration: 0, avgPagesPerVisit: 0 };
  }
  const n = benchmarks.length;
  return {
    avgVisits: Math.round(benchmarks.reduce((s, b) => s + b.avgMonthlyVisits, 0) / n),
    avgBounceRate: benchmarks.reduce((s, b) => s + b.avgBounceRate, 0) / n,
    avgSessionDuration: Math.round(benchmarks.reduce((s, b) => s + b.avgSessionDuration, 0) / n),
    avgPagesPerVisit: benchmarks.reduce((s, b) => s + b.avgPagesPerVisit, 0) / n,
  };
}

export function formatNumber(num: number | null): string {
  if (num === null || num === undefined) return "N/D";
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)}B`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toLocaleString("es-CO");
}

export function formatDuration(seconds: number | null): string {
  if (seconds === null || seconds === undefined) return "N/D";
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function formatPercent(rate: number | null): string {
  if (rate === null || rate === undefined) return "N/D";
  return `${(rate * 100).toFixed(1)}%`;
}
