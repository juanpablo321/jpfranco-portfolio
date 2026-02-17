import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import {
  COUNTRIES,
  INDUSTRIES,
  getIndustryById,
  getCountryByCode,
  getIndustryBenchmarks,
  calculateIndustryAverage,
  formatNumber,
  formatDuration,
  formatPercent,
} from "../shared/marketIntelligence";

// ─── Shared Data Model Tests ──────────────────────────────────────────────

describe("marketIntelligence shared data model", () => {
  it("has Colombia as the first country option", () => {
    expect(COUNTRIES[0].code).toBe("co");
    expect(COUNTRIES[0].label).toBe("Colombia");
    expect(COUNTRIES[0].flag).toBe("🇨🇴");
  });

  it("includes all required LATAM countries", () => {
    const codes = COUNTRIES.map((c) => c.code);
    expect(codes).toContain("co");
    expect(codes).toContain("mx");
    expect(codes).toContain("ar");
    expect(codes).toContain("cl");
    expect(codes).toContain("pe");
    expect(codes).toContain("us");
  });

  it("groups non-LATAM countries by continent", () => {
    const europeCountries = COUNTRIES.filter((c) => c.group === "Europa");
    const asiaCountries = COUNTRIES.filter((c) => c.group === "Asia");
    const africaCountries = COUNTRIES.filter((c) => c.group === "África");

    expect(europeCountries.length).toBeGreaterThan(0);
    expect(asiaCountries.length).toBeGreaterThan(0);
    expect(africaCountries.length).toBeGreaterThan(0);
  });

  it("includes all 8 required Colombian industries", () => {
    const labels = INDUSTRIES.map((i) => i.label);
    expect(labels).toContain("Retail / E-commerce");
    expect(labels).toContain("Tecnología / Apps");
    expect(labels).toContain("Banca / Fintech");
    expect(labels).toContain("Turismo");
    expect(labels).toContain("Educación");
    expect(labels).toContain("Inmobiliario");
    expect(labels).toContain("Salud");
    expect(labels).toContain("Moda");
  });

  it("each industry has Colombian benchmarks with local giants", () => {
    for (const industry of INDUSTRIES) {
      const coBenchmarks = industry.benchmarks["co"];
      expect(coBenchmarks, `${industry.label} should have Colombian benchmarks`).toBeDefined();
      expect(coBenchmarks.length).toBeGreaterThanOrEqual(2);

      for (const benchmark of coBenchmarks) {
        expect(benchmark.domain).toBeTruthy();
        expect(benchmark.name).toBeTruthy();
        expect(benchmark.avgMonthlyVisits).toBeGreaterThan(0);
        expect(benchmark.avgBounceRate).toBeGreaterThan(0);
        expect(benchmark.avgBounceRate).toBeLessThan(1);
        expect(benchmark.avgSessionDuration).toBeGreaterThan(0);
        expect(benchmark.avgPagesPerVisit).toBeGreaterThan(0);
      }
    }
  });

  it("Retail/E-commerce includes Mercado Libre, Falabella, Éxito", () => {
    const retail = getIndustryById("retail-ecommerce");
    expect(retail).toBeDefined();
    const coNames = retail!.benchmarks["co"].map((b) => b.name);
    expect(coNames).toContain("Mercado Libre");
    expect(coNames).toContain("Falabella");
    expect(coNames).toContain("Éxito");
  });

  it("Tecnología/Apps includes Rappi, Habi, Bold", () => {
    const tech = getIndustryById("tecnologia");
    expect(tech).toBeDefined();
    const coNames = tech!.benchmarks["co"].map((b) => b.name);
    expect(coNames).toContain("Rappi");
    expect(coNames).toContain("Habi");
    expect(coNames).toContain("Bold");
  });

  it("Banca/Fintech includes Bancolombia, Nequi, Davivienda", () => {
    const fintech = getIndustryById("banca-fintech");
    expect(fintech).toBeDefined();
    const coNames = fintech!.benchmarks["co"].map((b) => b.name);
    expect(coNames).toContain("Bancolombia");
    expect(coNames).toContain("Nequi");
    expect(coNames).toContain("Davivienda");
  });

  it("Moda includes Arturo Calle, Studio F, Leonisa", () => {
    const moda = getIndustryById("moda");
    expect(moda).toBeDefined();
    const coNames = moda!.benchmarks["co"].map((b) => b.name);
    expect(coNames).toContain("Arturo Calle");
    expect(coNames).toContain("Studio F");
    expect(coNames).toContain("Leonisa");
  });

  it("Turismo includes Aviatur, Decameron, Despegar", () => {
    const turismo = getIndustryById("turismo");
    expect(turismo).toBeDefined();
    const coNames = turismo!.benchmarks["co"].map((b) => b.name);
    expect(coNames).toContain("Aviatur");
    expect(coNames).toContain("Decameron");
    expect(coNames).toContain("Despegar");
  });
});

// ─── Helper Function Tests ────────────────────────────────────────────────

describe("getIndustryById", () => {
  it("returns the correct industry by ID", () => {
    const retail = getIndustryById("retail-ecommerce");
    expect(retail).toBeDefined();
    expect(retail!.label).toBe("Retail / E-commerce");
  });

  it("returns undefined for invalid ID", () => {
    expect(getIndustryById("nonexistent")).toBeUndefined();
  });
});

describe("getCountryByCode", () => {
  it("returns Colombia for 'co'", () => {
    const co = getCountryByCode("co");
    expect(co).toBeDefined();
    expect(co!.label).toBe("Colombia");
  });

  it("returns undefined for invalid code", () => {
    expect(getCountryByCode("xx")).toBeUndefined();
  });
});

describe("getIndustryBenchmarks", () => {
  it("returns Colombian benchmarks for retail-ecommerce", () => {
    const benchmarks = getIndustryBenchmarks("retail-ecommerce", "co");
    expect(benchmarks.length).toBeGreaterThanOrEqual(2);
    expect(benchmarks[0].name).toBe("Mercado Libre");
  });

  it("falls back to Colombian benchmarks for unknown country", () => {
    const benchmarks = getIndustryBenchmarks("retail-ecommerce", "zz");
    // Should fallback to 'co' benchmarks
    expect(benchmarks.length).toBeGreaterThanOrEqual(2);
  });

  it("returns empty array for invalid industry", () => {
    const benchmarks = getIndustryBenchmarks("nonexistent", "co");
    expect(benchmarks).toEqual([]);
  });
});

describe("calculateIndustryAverage", () => {
  it("calculates correct averages from benchmarks", () => {
    const benchmarks = getIndustryBenchmarks("retail-ecommerce", "co");
    const avg = calculateIndustryAverage(benchmarks);

    expect(avg.avgVisits).toBeGreaterThan(0);
    expect(avg.avgBounceRate).toBeGreaterThan(0);
    expect(avg.avgBounceRate).toBeLessThan(1);
    expect(avg.avgSessionDuration).toBeGreaterThan(0);
    expect(avg.avgPagesPerVisit).toBeGreaterThan(0);
  });

  it("returns zeros for empty benchmarks", () => {
    const avg = calculateIndustryAverage([]);
    expect(avg.avgVisits).toBe(0);
    expect(avg.avgBounceRate).toBe(0);
    expect(avg.avgSessionDuration).toBe(0);
    expect(avg.avgPagesPerVisit).toBe(0);
  });
});

// ─── Format Function Tests ────────────────────────────────────────────────

describe("formatNumber", () => {
  it("formats null as N/D", () => {
    expect(formatNumber(null)).toBe("N/D");
  });

  it("formats billions correctly", () => {
    expect(formatNumber(1_500_000_000)).toBe("1.5B");
  });

  it("formats millions correctly", () => {
    expect(formatNumber(85_000_000)).toBe("85.0M");
  });

  it("formats thousands correctly", () => {
    expect(formatNumber(5_500)).toBe("5.5K");
  });

  it("formats small numbers with locale", () => {
    const result = formatNumber(500);
    expect(result).toBeTruthy();
  });
});

describe("formatDuration", () => {
  it("formats null as N/D", () => {
    expect(formatDuration(null)).toBe("N/D");
  });

  it("formats seconds to mm:ss", () => {
    expect(formatDuration(420)).toBe("7:00");
    expect(formatDuration(333)).toBe("5:33");
    expect(formatDuration(90)).toBe("1:30");
  });
});

describe("formatPercent", () => {
  it("formats null as N/D", () => {
    expect(formatPercent(null)).toBe("N/D");
  });

  it("formats rate as percentage", () => {
    expect(formatPercent(0.35)).toBe("35.0%");
    expect(formatPercent(0.42)).toBe("42.0%");
  });
});

// ─── tRPC Router Tests ────────────────────────────────────────────────────

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("marketIntelligence.getOptions", () => {
  it("returns countries and industries lists", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const options = await caller.marketIntelligence.getOptions();

    expect(options.countries).toBeDefined();
    expect(options.countries.length).toBeGreaterThan(0);
    expect(options.countries[0].code).toBe("co");

    expect(options.industries).toBeDefined();
    expect(options.industries.length).toBe(8);
    expect(options.industries[0]).toHaveProperty("id");
    expect(options.industries[0]).toHaveProperty("label");
    expect(options.industries[0]).toHaveProperty("icon");
  });
});

describe("marketIntelligence.analyze", () => {
  it("rejects empty URL", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.marketIntelligence.analyze({
        url: "",
        country: "co",
        industry: "retail-ecommerce",
      })
    ).rejects.toThrow();
  });

  it("rejects invalid country", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.marketIntelligence.analyze({
        url: "example.com",
        country: "xx",
        industry: "retail-ecommerce",
      })
    ).rejects.toThrow("País no válido");
  });

  it("rejects invalid industry", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.marketIntelligence.analyze({
        url: "example.com",
        country: "co",
        industry: "nonexistent",
      })
    ).rejects.toThrow("Industria no válida");
  });

  it("returns complete analysis result for valid input", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.marketIntelligence.analyze({
      url: "falabella.com.co",
      country: "co",
      industry: "retail-ecommerce",
    });

    // Check basic structure
    expect(result.domain).toBe("falabella.com.co");
    expect(result.country).toBe("co");
    expect(result.countryLabel).toBe("Colombia");
    expect(result.industry).toBe("retail-ecommerce");
    expect(result.industryLabel).toBe("Retail / E-commerce");
    expect(result.analyzedAt).toBeTruthy();

    // Check siteMetrics structure
    expect(result.siteMetrics).toBeDefined();
    expect(result.siteMetrics.domain).toBe("falabella.com.co");

    // Check competitors (falabella is excluded from its own competitors list)
    expect(result.competitors).toBeDefined();
    expect(result.competitors.length).toBeGreaterThanOrEqual(2);
    for (const comp of result.competitors) {
      expect(comp.domain).toBeTruthy();
      expect(comp.name).toBeTruthy();
      expect(comp.isIndustryLeader).toBe(true);
    }

    // Check benchmarks
    expect(result.benchmarks).toBeDefined();
    expect(result.benchmarks.length).toBe(4); // 4 metrics
    const metricNames = result.benchmarks.map((b) => b.metric);
    expect(metricNames).toContain("Visitas Mensuales");
    expect(metricNames).toContain("Tasa de Rebote");
    expect(metricNames).toContain("Duración de Sesión");
    expect(metricNames).toContain("Páginas por Visita");

    for (const benchmark of result.benchmarks) {
      expect(benchmark.industryAvg).toBeGreaterThan(0);
      expect(benchmark.topPlayer).toBeGreaterThan(0);
      expect(benchmark.topPlayerName).toBeTruthy();
    }

    // Check insights
    expect(result.insights).toBeDefined();
    expect(result.insights.length).toBeGreaterThanOrEqual(1);
    for (const insight of result.insights) {
      expect(typeof insight).toBe("string");
      expect(insight.length).toBeGreaterThan(10);
    }

    // Check apiAvailable flag
    expect(typeof (result as any).apiAvailable).toBe("boolean");
  }, 30000); // 30s timeout for LLM call

  it("handles URL with protocol prefix", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.marketIntelligence.analyze({
      url: "https://www.habi.co",
      country: "co",
      industry: "tecnologia",
    });

    expect(result.domain).toBe("habi.co");
    expect(result.industryLabel).toBe("Tecnología / Apps");
    expect(result.competitors.length).toBeGreaterThanOrEqual(2);
  }, 30000);

  it("works with different country selections", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.marketIntelligence.analyze({
      url: "amazon.com.mx",
      country: "mx",
      industry: "retail-ecommerce",
    });

    expect(result.country).toBe("mx");
    expect(result.countryLabel).toBe("México");
    expect(result.competitors.length).toBeGreaterThanOrEqual(2);
  }, 30000);
});
