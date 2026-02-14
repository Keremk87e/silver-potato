import { describe, expect, it } from "vitest";
import { toCountryDTO } from "@/lib/countries/mapper";

describe("toCountryDTO", () => {
  it("normalizes rest country payload", () => {
    const dto = toCountryDTO({
      cca3: "TUR",
      name: { common: "Turkey", official: "Republic of Türkiye" },
      region: "Asia",
      population: 100,
      capital: ["Ankara"],
      languages: { tur: "Turkish" },
      currencies: { TRY: { name: "Turkish lira" } },
      flags: { png: "x" },
      maps: { googleMaps: "y" },
      borders: ["GRC"]
    });

    expect(dto.name).toBe("Turkey");
    expect(dto.languages).toEqual(["Turkish"]);
    expect(dto.currencies).toEqual(["Turkish lira"]);
  });
});
