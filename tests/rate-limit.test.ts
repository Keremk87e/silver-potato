import { describe, expect, it } from "vitest";
import { checkRateLimit } from "@/lib/rate-limit";

describe("checkRateLimit", () => {
  it("allows up to max requests", () => {
    const now = 1000;
    expect(checkRateLimit("k1", 2, 1000, now).ok).toBe(true);
    expect(checkRateLimit("k1", 2, 1000, now + 1).ok).toBe(true);
    expect(checkRateLimit("k1", 2, 1000, now + 2).ok).toBe(false);
  });

  it("resets after window", () => {
    const now = 2000;
    checkRateLimit("k2", 1, 1000, now);
    expect(checkRateLimit("k2", 1, 1000, now + 1500).ok).toBe(true);
  });
});
