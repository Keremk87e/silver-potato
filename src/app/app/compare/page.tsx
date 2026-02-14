"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import type { CountryDTO } from "@/lib/countries/types";

export default function ComparePage() {
  const [codes, setCodes] = useState("TUR,FRA,USA");
  const list = codes.split(",").map((c) => c.trim().toUpperCase()).filter(Boolean).slice(0, 3);

  const query = useQuery({
    queryKey: ["compare", list.join(",")],
    queryFn: async () => {
      const results = await Promise.all(
        list.map(async (code) => {
          const res = await fetch(`/api/countries/${code}`);
          return res.ok ? ((await res.json()) as CountryDTO) : null;
        })
      );
      return results.filter(Boolean) as CountryDTO[];
    }
  });

  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold">Compare Countries</h1>
      <Input value={codes} onChange={(e) => setCodes(e.target.value)} placeholder="TUR,FRA,USA" />
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {query.data?.map((c) => (
          <Card key={c.cca3}>
            <h3 className="font-semibold">{c.name}</h3>
            <p>Population: {c.population.toLocaleString()}</p>
            <p>Region: {c.region}</p>
            <p>Capital: {c.capital}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
