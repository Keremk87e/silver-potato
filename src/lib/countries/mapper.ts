import type { CountryDTO } from "./types";

type RestCountry = {
  cca3: string;
  name: { common: string; official: string };
  region: string;
  subregion?: string;
  population: number;
  capital?: string[];
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string }>;
  flags?: { png?: string };
  maps?: { googleMaps?: string };
  borders?: string[];
};

export function toCountryDTO(raw: RestCountry): CountryDTO {
  return {
    cca3: raw.cca3,
    name: raw.name.common,
    officialName: raw.name.official,
    region: raw.region,
    subregion: raw.subregion,
    population: raw.population,
    capital: raw.capital?.[0],
    languages: Object.values(raw.languages ?? {}),
    currencies: Object.values(raw.currencies ?? {}).map((c) => c.name),
    flagPng: raw.flags?.png,
    mapsUrl: raw.maps?.googleMaps,
    borders: raw.borders ?? []
  };
}
