import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { CountryDTO } from "@/lib/countries/types";

export function CountryCard({ country }: { country: CountryDTO }) {
  return (
    <Card>
      <h3 className="font-semibold">{country.name}</h3>
      <p className="text-sm text-slate-600">{country.region} · Pop: {country.population.toLocaleString()}</p>
      <p className="mt-2 text-sm text-slate-500">Capital: {country.capital ?? "N/A"}</p>
      <Link href={`/app/country/${country.cca3}`} className="mt-3 inline-block text-sm text-blue-600">
        View profile
      </Link>
    </Card>
  );
}
