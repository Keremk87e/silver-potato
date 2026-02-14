"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { CountryCard } from "@/components/countries/country-card";
import type { CountryDTO } from "@/lib/countries/types";

export default function SearchPage() {
  const [q, setQ] = useState("tur");
  const [region, setRegion] = useState("");
  const [minPop, setMinPop] = useState(0);
  const query = useQuery({
    queryKey: ["countries", q],
    queryFn: async () => {
      const res = await fetch(`/api/countries/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error("Failed");
      return (await res.json()) as CountryDTO[];
    }
  });

  const filtered = (query.data ?? []).filter((c) => {
    const byRegion = region ? c.region === region : true;
    const byPop = c.population >= minPop;
    return byRegion && byPop;
  });

  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold">Country Search</h1>
      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search country name" />
        <Input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Filter region (e.g. Europe)" />
        <Input type="number" value={minPop} onChange={(e) => setMinPop(Number(e.target.value))} placeholder="Min population" />
      </div>
      {query.isLoading ? <p>Loading...</p> : null}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((c) => <CountryCard key={c.cca3} country={c} />)}
      </div>
      {!query.isLoading && filtered.length === 0 ? <p className="text-slate-500">No results.</p> : null}
    </section>
  );
}
