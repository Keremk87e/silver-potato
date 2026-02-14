import { getCached, setCached } from "./cache";
import { toCountryDTO } from "./mapper";
import type { CountryDTO } from "./types";

const BASE_URL = "https://restcountries.com/v3.1";

async function fetchWithTimeout(url: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`Upstream error: ${res.status}`);
    }
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

export async function searchCountries(query: string): Promise<CountryDTO[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const key = `search:${q}`;
  const cached = await getCached<CountryDTO[]>(key);
  if (cached) return cached;

  const raw = await fetchWithTimeout(`${BASE_URL}/name/${encodeURIComponent(q)}`);
  if (!raw) return [];
  const dto = raw.map(toCountryDTO);
  await setCached(key, dto);
  return dto;
}

export async function getCountryByCode(cca3: string): Promise<CountryDTO | null> {
  const normalized = cca3.toUpperCase();
  const key = `detail:${normalized}`;
  const cached = await getCached<CountryDTO>(key);
  if (cached) return cached;

  const raw = await fetchWithTimeout(`${BASE_URL}/alpha/${normalized}`);
  if (!raw?.[0]) return null;
  const dto = toCountryDTO(raw[0]);
  await setCached(key, dto);
  return dto;
}
