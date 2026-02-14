import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/countries/cache", () => ({
  getCached: vi.fn().mockResolvedValue(null),
  setCached: vi.fn().mockResolvedValue(undefined)
}));

import { getCountryByCode, searchCountries } from "@/lib/countries/service";

describe("country service", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(
          JSON.stringify([
            {
              cca3: "TUR",
              name: { common: "Turkey", official: "Republic of Türkiye" },
              region: "Asia",
              population: 10
            }
          ]),
          { status: 200 }
        )
      )
    );
  });

  it("searches countries", async () => {
    const result = await searchCountries("turkey");
    expect(result[0].cca3).toBe("TUR");
  });

  it("gets country by code", async () => {
    const result = await getCountryByCode("tur");
    expect(result?.name).toBe("Turkey");
  });
});
