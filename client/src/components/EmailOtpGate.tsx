import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Loader2,
  ShieldCheck,
  ArrowRight,
  KeyRound,
  RefreshCw,
} from "lucide-react";

type EmailOtpGateProps = {
  children: React.ReactNode;
};

/**
 * EmailOtpGate wraps a tool/page and requires email OTP verification before granting access.
 * Once verified, a cookie persists the session for 30 days.
 */
export default function EmailOtpGate({ children }: EmailOtpGateProps) {
  const [step, setStep] = useState<"checking" | "email" | "otp" | "verified">("checking");
  const [email, setEmail] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [errorMsg, setErrorMsg] = useState("");
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Check if user already has access
  const accessQuery = trpc.emailOtp.checkAccess.useQuery(undefined, {
    retry: false,
  });

  const sendOtpMutation = trpc.emailOtp.sendOtp.useMutation();
  const verifyOtpMutation = trpc.emailOtp.verifyOtp.useMutation();
  const recordUsageMutation = trpc.emailOtp.recordUsage.useMutation();

  // Determine initial state based on access check
  useEffect(() => {
    if (accessQuery.isSuccess) {
      if (accessQuery.data.verified) {
        setStep("verified");
        // Record usage on access
        recordUsageMutation.mutate();
      } else {
        setStep("email");
      }
    }
    if (accessQuery.isError) {
      setStep("email");
    }
  }, [accessQuery.isSuccess, accessQuery.isError, accessQuery.data]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendOtp = async () => {
    if (!email.trim()) return;
    setErrorMsg("");

    try {
      const result = await sendOtpMutation.mutateAsync({ email: email.trim() });

      if (result.alreadyVerified) {
        // Email was already verified, just verify with any code to set cookie
        setStep("verified");
        recordUsageMutation.mutate();
        // Refresh the access query to get the cookie set
        accessQuery.refetch();
        return;
      }

      setStep("otp");
      setOtpDigits(["", "", "", "", "", ""]);
      setCountdown(60);
      // Focus first input
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      setErrorMsg(err.message || "Error al enviar el código.");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, "").slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);
    setErrorMsg("");

    // Auto-focus next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits filled
    if (digit && index === 5) {
      const code = newDigits.join("");
      if (code.length === 6) {
        handleVerifyOtp(code);
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter") {
      const code = otpDigits.join("");
      if (code.length === 6) {
        handleVerifyOtp(code);
      }
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 0) return;

    const newDigits = [...otpDigits];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setOtpDigits(newDigits);

    // Focus the next empty input or the last one
    const nextEmpty = newDigits.findIndex((d) => !d);
    const focusIndex = nextEmpty === -1 ? 5 : nextEmpty;
    inputRefs.current[focusIndex]?.focus();

    // Auto-submit if all filled
    if (pasted.length === 6) {
      handleVerifyOtp(pasted);
    }
  };

  const handleVerifyOtp = async (code: string) => {
    setErrorMsg("");
    try {
      await verifyOtpMutation.mutateAsync({
        email: email.trim(),
        code,
      });
      setStep("verified");
      recordUsageMutation.mutate();
    } catch (err: any) {
      setErrorMsg(err.message || "Código incorrecto.");
      // Clear the OTP inputs on error
      setOtpDigits(["", "", "", "", "", ""]);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setErrorMsg("");
    try {
      await sendOtpMutation.mutateAsync({ email: email.trim() });
      setOtpDigits(["", "", "", "", "", ""]);
      setCountdown(60);
      setTimeout(() => inputRefs.current[0]?.focus(), 100);
    } catch (err: any) {
      setErrorMsg(err.message || "Error al reenviar el código.");
    }
  };

  // ─── Render States ──────────────────────────────────────────────────────

  // Loading / checking access
  if (step === "checking") {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Verified - show the children (the actual tool)
  if (step === "verified") {
    return <>{children}</>;
  }

  // ─── Gate UI ────────────────────────────────────────────────────────────

  return (
    <div className="py-12 md:py-20">
      <div className="container max-w-md mx-auto">
        <div className="rounded-2xl border bg-card shadow-lg overflow-hidden">
          {/* Header */}
          <div
            className="p-6 pb-8 text-center text-white"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.40 0.18 310) 0%, oklch(0.50 0.20 310) 50%, oklch(0.55 0.18 330) 100%)",
            }}
          >
            <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
              {step === "email" ? (
                <Mail className="w-7 h-7 text-white" />
              ) : (
                <KeyRound className="w-7 h-7 text-white" />
              )}
            </div>
            <h2 className="text-xl font-bold mb-1">
              {step === "email"
                ? "Verifica tu email para continuar"
                : "Ingresa el código de verificación"}
            </h2>
            <p className="text-sm text-white/80">
              {step === "email"
                ? "Accede a la herramienta de Inteligencia de Mercado verificando tu email."
                : `Enviamos un código de 6 dígitos a ${email}`}
            </p>
          </div>

          {/* Body */}
          <div className="p-6">
            {step === "email" && (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email-input"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="email-input"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorMsg("");
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
                      placeholder="tu@email.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      disabled={sendOtpMutation.isPending}
                      autoFocus
                    />
                  </div>
                </div>

                {errorMsg && (
                  <p className="text-sm text-red-500 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
                    {errorMsg}
                  </p>
                )}

                <Button
                  onClick={handleSendOtp}
                  disabled={!email.trim() || sendOtpMutation.isPending}
                  className="w-full h-12 rounded-xl text-sm font-semibold"
                >
                  {sendOtpMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <ArrowRight className="w-4 h-4 mr-2" />
                  )}
                  Enviar código de verificación
                </Button>

                <div className="flex items-start gap-2 pt-2">
                  <ShieldCheck className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Tu email se usa únicamente para verificar el acceso a esta
                    herramienta. No enviaremos spam ni compartiremos tu
                    información.
                  </p>
                </div>
              </div>
            )}

            {step === "otp" && (
              <div className="space-y-5">
                {/* OTP Input Grid */}
                <div className="flex justify-center gap-2.5" onPaste={handleOtpPaste}>
                  {otpDigits.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 bg-background text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      disabled={verifyOtpMutation.isPending}
                    />
                  ))}
                </div>

                {errorMsg && (
                  <p className="text-sm text-red-500 text-center flex items-center justify-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-red-500 flex-shrink-0" />
                    {errorMsg}
                  </p>
                )}

                {verifyOtpMutation.isPending && (
                  <div className="flex justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                  </div>
                )}

                {/* Resend */}
                <div className="text-center pt-2">
                  {countdown > 0 ? (
                    <p className="text-xs text-muted-foreground">
                      Reenviar código en{" "}
                      <span className="font-semibold">{countdown}s</span>
                    </p>
                  ) : (
                    <button
                      onClick={handleResendOtp}
                      disabled={sendOtpMutation.isPending}
                      className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 mx-auto transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      Reenviar código
                    </button>
                  )}
                </div>

                {/* Change email */}
                <div className="text-center">
                  <button
                    onClick={() => {
                      setStep("email");
                      setErrorMsg("");
                      setOtpDigits(["", "", "", "", "", ""]);
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Cambiar email
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
