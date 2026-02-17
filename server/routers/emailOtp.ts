import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { ENV } from "../_core/env";
import { getDb } from "../db";
import { otpCodes, verifiedEmails } from "../../drizzle/schema";
import { eq, and, gt, desc } from "drizzle-orm";
import { Resend } from "resend";

// ─── Constants ─────────────────────────────────────────────────────────────

const OTP_LENGTH = 6;
const OTP_EXPIRY_MINUTES = 10;
const MAX_ATTEMPTS = 5;
const RATE_LIMIT_MINUTES = 1; // Minimum time between OTP sends to same email
const COOKIE_NAME = "mi_verified_email";
const COOKIE_MAX_AGE_DAYS = 30;

// ─── Helpers ───────────────────────────────────────────────────────────────

function generateOtpCode(): string {
  // Generate a cryptographically random 6-digit code
  const digits = "0123456789";
  let code = "";
  const randomBytes = new Uint8Array(OTP_LENGTH);
  crypto.getRandomValues(randomBytes);
  for (let i = 0; i < OTP_LENGTH; i++) {
    code += digits[randomBytes[i] % 10];
  }
  return code;
}

function getExpiryDate(): Date {
  return new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);
}

function getRateLimitDate(): Date {
  return new Date(Date.now() - RATE_LIMIT_MINUTES * 60 * 1000);
}

async function sendOtpEmail(email: string, code: string): Promise<boolean> {
  if (!ENV.resendApiKey) {
    console.error("[OTP] RESEND_API_KEY not configured");
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "El servicio de email no está configurado.",
    });
  }

  const resend = new Resend(ENV.resendApiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: ENV.resendFromEmail,
      to: [email],
      subject: `Tu código de verificación: ${code}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; background: #ffffff;">
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #1a1a2e; font-size: 22px; margin: 0 0 8px;">Inteligencia de Mercado</h1>
            <p style="color: #666; font-size: 14px; margin: 0;">franco.com.co</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #6b21a8 0%, #9333ea 100%); border-radius: 12px; padding: 32px; text-align: center; margin-bottom: 24px;">
            <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 0 0 16px;">Tu código de verificación es:</p>
            <div style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #ffffff; font-family: 'Courier New', monospace;">
              ${code}
            </div>
          </div>
          
          <div style="text-align: center; color: #666; font-size: 13px; line-height: 1.5;">
            <p>Este código expira en <strong>${OTP_EXPIRY_MINUTES} minutos</strong>.</p>
            <p>Si no solicitaste este código, puedes ignorar este email.</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
          
          <p style="text-align: center; color: #999; font-size: 11px;">
            Juan Pablo Franco — Estratega de Expansión Digital<br/>
            <a href="https://franco.com.co" style="color: #9333ea; text-decoration: none;">franco.com.co</a>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[OTP] Resend error:", error);
      return false;
    }

    console.log(`[OTP] Email sent to ${email}, id: ${data?.id}`);
    return true;
  } catch (err) {
    console.error("[OTP] Failed to send email:", err);
    return false;
  }
}

// ─── Router ────────────────────────────────────────────────────────────────

export const emailOtpRouter = router({
  /**
   * Check if the current session has a verified email (via cookie).
   */
  checkAccess: publicProcedure.query(async ({ ctx }) => {
    const cookieHeader = ctx.req.headers.cookie || "";
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((c) => {
        const [key, ...val] = c.trim().split("=");
        return [key, val.join("=")];
      })
    );

    const verifiedEmail = cookies[COOKIE_NAME];
    if (!verifiedEmail) {
      return { verified: false, email: null };
    }

    // Decode the email from the cookie
    const email = decodeURIComponent(verifiedEmail);

    // Verify it exists in the database
    const db = await getDb();
    if (!db) {
      return { verified: false, email: null };
    }

    const [record] = await db
      .select()
      .from(verifiedEmails)
      .where(eq(verifiedEmails.email, email))
      .limit(1);

    if (!record) {
      return { verified: false, email: null };
    }

    return { verified: true, email: record.email };
  }),

  /**
   * Send an OTP code to the provided email address.
   */
  sendOtp: publicProcedure
    .input(
      z.object({
        email: z.string().email("Ingresa un email válido"),
      })
    )
    .mutation(async ({ input }) => {
      const { email } = input;
      const normalizedEmail = email.toLowerCase().trim();

      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Base de datos no disponible.",
        });
      }

      // Check if email is already verified
      const [existing] = await db
        .select()
        .from(verifiedEmails)
        .where(eq(verifiedEmails.email, normalizedEmail))
        .limit(1);

      if (existing) {
        // Email already verified, no need for OTP
        return {
          success: true,
          alreadyVerified: true,
          message: "Este email ya está verificado.",
        };
      }

      // Rate limit: check if we sent an OTP to this email recently
      const rateLimitDate = getRateLimitDate();
      const [recentOtp] = await db
        .select()
        .from(otpCodes)
        .where(
          and(
            eq(otpCodes.email, normalizedEmail),
            gt(otpCodes.createdAt, rateLimitDate)
          )
        )
        .orderBy(desc(otpCodes.createdAt))
        .limit(1);

      if (recentOtp) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: `Espera ${RATE_LIMIT_MINUTES} minuto(s) antes de solicitar otro código.`,
        });
      }

      // Generate and store OTP
      const code = generateOtpCode();
      const expiresAt = getExpiryDate();

      await db.insert(otpCodes).values({
        email: normalizedEmail,
        code,
        expiresAt,
      });

      // Send email
      const sent = await sendOtpEmail(normalizedEmail, code);
      if (!sent) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No se pudo enviar el email. Intenta de nuevo.",
        });
      }

      return {
        success: true,
        alreadyVerified: false,
        message: `Código enviado a ${normalizedEmail}`,
      };
    }),

  /**
   * Verify an OTP code and grant access.
   */
  verifyOtp: publicProcedure
    .input(
      z.object({
        email: z.string().email("Email inválido"),
        code: z.string().length(OTP_LENGTH, `El código debe tener ${OTP_LENGTH} dígitos`),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const normalizedEmail = input.email.toLowerCase().trim();

      const db = await getDb();
      if (!db) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Base de datos no disponible.",
        });
      }

      // Find the most recent unused, non-expired OTP for this email
      const now = new Date();
      const [otpRecord] = await db
        .select()
        .from(otpCodes)
        .where(
          and(
            eq(otpCodes.email, normalizedEmail),
            eq(otpCodes.used, false),
            gt(otpCodes.expiresAt, now)
          )
        )
        .orderBy(desc(otpCodes.createdAt))
        .limit(1);

      if (!otpRecord) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Código expirado o no encontrado. Solicita uno nuevo.",
        });
      }

      // Check max attempts
      if (otpRecord.attempts >= MAX_ATTEMPTS) {
        // Mark as used to prevent further attempts
        await db
          .update(otpCodes)
          .set({ used: true })
          .where(eq(otpCodes.id, otpRecord.id));

        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Demasiados intentos. Solicita un nuevo código.",
        });
      }

      // Increment attempts
      await db
        .update(otpCodes)
        .set({ attempts: otpRecord.attempts + 1 })
        .where(eq(otpCodes.id, otpRecord.id));

      // Verify code
      if (otpRecord.code !== input.code) {
        const remaining = MAX_ATTEMPTS - (otpRecord.attempts + 1);
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: remaining > 0
            ? `Código incorrecto. ${remaining} intento(s) restante(s).`
            : "Código incorrecto. Solicita un nuevo código.",
        });
      }

      // Mark OTP as used
      await db
        .update(otpCodes)
        .set({ used: true })
        .where(eq(otpCodes.id, otpRecord.id));

      // Upsert verified email
      try {
        await db.insert(verifiedEmails).values({
          email: normalizedEmail,
        });
      } catch {
        // Already exists (unique constraint), that's fine
      }

      // Set verification cookie
      const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
      ctx.res.cookie(COOKIE_NAME, encodeURIComponent(normalizedEmail), {
        httpOnly: true,
        secure: ENV.isProduction,
        sameSite: "lax",
        maxAge: maxAge * 1000,
        path: "/",
      });

      return {
        success: true,
        email: normalizedEmail,
        message: "Email verificado correctamente.",
      };
    }),

  /**
   * Record a tool usage for the verified email.
   */
  recordUsage: publicProcedure.mutation(async ({ ctx }) => {
    const cookieHeader = ctx.req.headers.cookie || "";
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((c) => {
        const [key, ...val] = c.trim().split("=");
        return [key, val.join("=")];
      })
    );

    const verifiedEmail = cookies[COOKIE_NAME];
    if (!verifiedEmail) return { recorded: false };

    const email = decodeURIComponent(verifiedEmail);
    const db = await getDb();
    if (!db) return { recorded: false };

    try {
      await db
        .update(verifiedEmails)
        .set({
          usageCount: (await db.select().from(verifiedEmails).where(eq(verifiedEmails.email, email)).limit(1))[0]?.usageCount + 1 || 1,
          lastUsedAt: new Date(),
        })
        .where(eq(verifiedEmails.email, email));

      return { recorded: true };
    } catch {
      return { recorded: false };
    }
  }),
});
