import { describe, it, expect } from "vitest";

describe("Resend API Key Validation", () => {
  it("should have RESEND_API_KEY environment variable set", () => {
    const apiKey = process.env.RESEND_API_KEY;
    expect(apiKey).toBeDefined();
    expect(apiKey).not.toBe("");
    expect(apiKey!.startsWith("re_")).toBe(true);
  });

  it("should have RESEND_FROM_EMAIL configured", () => {
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    expect(fromEmail).toBeDefined();
    expect(fromEmail).not.toBe("");
    // Should contain an @ sign (email format)
    expect(fromEmail).toContain("@");
  });

  it("should have a valid Resend API key (send-only or full access)", async () => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === "") {
      console.warn("RESEND_API_KEY not set, skipping API validation");
      return;
    }

    // Use the domains endpoint to check key validity
    // A valid key returns 200 (full access) or 401 with "restricted_api_key" (send-only key)
    // An invalid key returns 401 with "invalid_api_key"
    const response = await fetch("https://api.resend.com/domains", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Full access key
      expect(response.status).toBe(200);
    } else {
      // Should be a restricted (send-only) key, not an invalid key
      const body = await response.json();
      expect(body.name).toBe("restricted_api_key");
    }
  }, 15000);
});
