import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ─── Mock Resend ───────────────────────────────────────────────────────────

const mockSend = vi.fn();
vi.mock("resend", () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: mockSend,
    },
  })),
}));

// ─── Track DB operations ───────────────────────────────────────────────────

let capturedInserts: { table: string; values: any }[] = [];
let capturedUpdates: { setValues: any }[] = [];
let selectResults: any[] = [];

/**
 * Build a chainable mock that mimics Drizzle's fluent API.
 * Each call to select/from/where/orderBy/limit returns the same chain,
 * and limit() resolves with whatever is in selectResults at call time.
 */
function createChainableMock(resolveWith: () => any[]) {
  const chain: any = {};
  const methods = ["select", "from", "where", "orderBy", "limit"];
  for (const m of methods) {
    chain[m] = vi.fn().mockImplementation(() => {
      if (m === "limit") return Promise.resolve(resolveWith());
      return chain;
    });
  }
  return chain;
}

function createMockDb() {
  const selectChain = createChainableMock(() => selectResults);

  const db = {
    select: vi.fn().mockReturnValue(selectChain),
    insert: vi.fn().mockImplementation((table: any) => ({
      values: vi.fn().mockImplementation((vals: any) => {
        capturedInserts.push({
          table: table?.name || String(table),
          values: vals,
        });
        return Promise.resolve();
      }),
    })),
    update: vi.fn().mockImplementation(() => ({
      set: vi.fn().mockImplementation((vals: any) => {
        capturedUpdates.push({ setValues: vals });
        return {
          where: vi.fn().mockResolvedValue(undefined),
        };
      }),
    })),
  };

  return db;
}

const mockDb = createMockDb();

vi.mock("./db", () => ({
  getDb: vi.fn().mockImplementation(async () => mockDb),
}));

// ─── Test Context Helper ───────────────────────────────────────────────────

type CookieCall = {
  name: string;
  value: string;
  options: Record<string, unknown>;
};

function createPublicContext(cookieHeader = ""): {
  ctx: TrpcContext;
  setCookies: CookieCall[];
} {
  const setCookies: CookieCall[] = [];

  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {
        cookie: cookieHeader,
      },
    } as TrpcContext["req"],
    res: {
      cookie: (name: string, value: string, options: Record<string, unknown>) => {
        setCookies.push({ name, value, options });
      },
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };

  return { ctx, setCookies };
}

// ─── Tests ─────────────────────────────────────────────────────────────────

describe("emailOtp", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    capturedInserts = [];
    capturedUpdates = [];
    selectResults = [];
    mockSend.mockResolvedValue({ data: { id: "test-email-id" }, error: null });
  });

  describe("checkAccess", () => {
    it("returns not verified when no cookie is present", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.emailOtp.checkAccess();

      expect(result.verified).toBe(false);
      expect(result.email).toBeNull();
    });

    it("returns not verified when cookie email is not in database", async () => {
      const { ctx } = createPublicContext(
        "mi_verified_email=" + encodeURIComponent("test@example.com")
      );
      const caller = appRouter.createCaller(ctx);
      selectResults = []; // No record found

      const result = await caller.emailOtp.checkAccess();

      expect(result.verified).toBe(false);
      expect(result.email).toBeNull();
    });

    it("returns verified when cookie email exists in database", async () => {
      const email = "verified@example.com";
      const { ctx } = createPublicContext(
        "mi_verified_email=" + encodeURIComponent(email)
      );
      const caller = appRouter.createCaller(ctx);
      selectResults = [{ email, verifiedAt: new Date() }];

      const result = await caller.emailOtp.checkAccess();

      expect(result.verified).toBe(true);
      expect(result.email).toBe(email);
    });
  });

  describe("sendOtp", () => {
    it("sends OTP email for new email address", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      selectResults = []; // Not verified, no recent OTP

      const result = await caller.emailOtp.sendOtp({
        email: "new@example.com",
      });

      expect(result.success).toBe(true);
      expect(result.alreadyVerified).toBe(false);
      expect(mockSend).toHaveBeenCalledTimes(1);

      // Check that an OTP was inserted
      const otpInsert = capturedInserts.find((i) =>
        i.values?.email === "new@example.com" && i.values?.code
      );
      expect(otpInsert).toBeDefined();
      expect(otpInsert!.values.code).toMatch(/^\d{6}$/);
    });

    it("returns alreadyVerified for previously verified email", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      // First select returns verified email
      selectResults = [{ email: "existing@example.com", verifiedAt: new Date() }];

      const result = await caller.emailOtp.sendOtp({
        email: "existing@example.com",
      });

      expect(result.success).toBe(true);
      expect(result.alreadyVerified).toBe(true);
      expect(mockSend).not.toHaveBeenCalled();
    });

    it("rejects invalid email format", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.emailOtp.sendOtp({ email: "not-an-email" })
      ).rejects.toThrow();
    });

    it("normalizes email to lowercase", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      selectResults = [];

      await caller.emailOtp.sendOtp({ email: "TEST@Example.COM" });

      const otpInsert = capturedInserts.find((i) => i.values?.code);
      expect(otpInsert).toBeDefined();
      expect(otpInsert!.values.email).toBe("test@example.com");
    });

    it("throws when Resend fails to send", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      selectResults = [];

      mockSend.mockResolvedValue({
        data: null,
        error: { message: "Rate limited" },
      });

      await expect(
        caller.emailOtp.sendOtp({ email: "fail@example.com" })
      ).rejects.toThrow();
    });

    it("generates 6-digit numeric codes", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      selectResults = [];

      // Send multiple OTPs
      for (let i = 0; i < 3; i++) {
        capturedInserts = [];
        await caller.emailOtp.sendOtp({ email: `test${i}@example.com` });
        const otpInsert = capturedInserts.find((ins) => ins.values?.code);
        expect(otpInsert).toBeDefined();
        expect(otpInsert!.values.code).toMatch(/^\d{6}$/);
        expect(otpInsert!.values.code.length).toBe(6);
      }
    });

    it("sets expiry time ~10 minutes in the future", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      selectResults = [];

      const before = Date.now();
      await caller.emailOtp.sendOtp({ email: "test@example.com" });
      const after = Date.now();

      const otpInsert = capturedInserts.find((ins) => ins.values?.expiresAt);
      expect(otpInsert).toBeDefined();
      const expiresAt = otpInsert!.values.expiresAt;
      expect(expiresAt instanceof Date).toBe(true);
      expect(expiresAt.getTime()).toBeGreaterThan(before + 9 * 60 * 1000);
      expect(expiresAt.getTime()).toBeLessThan(after + 11 * 60 * 1000);
    });
  });

  describe("verifyOtp", () => {
    it("rejects when no valid OTP exists", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      selectResults = []; // No OTP found

      await expect(
        caller.emailOtp.verifyOtp({
          email: "test@example.com",
          code: "123456",
        })
      ).rejects.toThrow(/expirado|no encontrado/i);
    });

    it("rejects incorrect code and increments attempts", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      selectResults = [{
        id: 1,
        email: "test@example.com",
        code: "654321",
        expiresAt: new Date(Date.now() + 600000),
        used: false,
        attempts: 0,
      }];

      await expect(
        caller.emailOtp.verifyOtp({
          email: "test@example.com",
          code: "123456",
        })
      ).rejects.toThrow(/incorrecto/i);

      // Should have incremented attempts
      expect(capturedUpdates.length).toBeGreaterThan(0);
      expect(capturedUpdates[0].setValues).toHaveProperty("attempts", 1);
    });

    it("rejects code with wrong length", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.emailOtp.verifyOtp({
          email: "test@example.com",
          code: "123",
        })
      ).rejects.toThrow();
    });

    it("verifies correct code and sets cookie", async () => {
      const { ctx, setCookies } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const code = "123456";
      selectResults = [{
        id: 1,
        email: "test@example.com",
        code,
        expiresAt: new Date(Date.now() + 600000),
        used: false,
        attempts: 0,
      }];

      const result = await caller.emailOtp.verifyOtp({
        email: "test@example.com",
        code,
      });

      expect(result.success).toBe(true);
      expect(result.email).toBe("test@example.com");

      // Should set verification cookie
      expect(setCookies).toHaveLength(1);
      expect(setCookies[0].name).toBe("mi_verified_email");
      expect(decodeURIComponent(setCookies[0].value)).toBe("test@example.com");
      expect(setCookies[0].options).toMatchObject({
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
    });

    it("rejects when max attempts exceeded", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);
      selectResults = [{
        id: 1,
        email: "test@example.com",
        code: "654321",
        expiresAt: new Date(Date.now() + 600000),
        used: false,
        attempts: 5,
      }];

      await expect(
        caller.emailOtp.verifyOtp({
          email: "test@example.com",
          code: "654321",
        })
      ).rejects.toThrow(/demasiados intentos/i);
    });

    it("marks OTP as used after successful verification", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const code = "999999";
      selectResults = [{
        id: 42,
        email: "mark@example.com",
        code,
        expiresAt: new Date(Date.now() + 600000),
        used: false,
        attempts: 0,
      }];

      await caller.emailOtp.verifyOtp({
        email: "mark@example.com",
        code,
      });

      // Should have updated OTP to used
      const usedUpdate = capturedUpdates.find((u) => u.setValues?.used === true);
      expect(usedUpdate).toBeDefined();
    });

    it("inserts verified email record after successful verification", async () => {
      const { ctx } = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const code = "111111";
      selectResults = [{
        id: 10,
        email: "new-verified@example.com",
        code,
        expiresAt: new Date(Date.now() + 600000),
        used: false,
        attempts: 0,
      }];

      await caller.emailOtp.verifyOtp({
        email: "new-verified@example.com",
        code,
      });

      // Should have inserted into verified_emails
      const verifiedInsert = capturedInserts.find(
        (i) => i.values?.email === "new-verified@example.com" && !i.values?.code
      );
      expect(verifiedInsert).toBeDefined();
    });
  });
});
