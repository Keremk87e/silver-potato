"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { CountryDTO } from "@/lib/countries/types";
import { toast } from "sonner";

export default function CountryDetailPage() {
  const params = useParams<{ cca3: string }>();
  const [note, setNote] = useState("");
  const code = params.cca3;

  const query = useQuery({
    queryKey: ["country", code],
    queryFn: async () => {
      const res = await fetch(`/api/countries/${code}`);
      if (!res.ok) throw new Error("Failed");
      return (await res.json()) as CountryDTO;
    }
  });

  async function addFavorite() {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cca3: code })
    });
    if (res.ok) toast.success("Added to favorites");
  }

  async function saveNote() {
    const res = await fetch(`/api/notes/${code}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: note })
    });
    if (res.ok) toast.success("Note saved");
  }

  if (query.isLoading) return <p>Loading...</p>;
  if (!query.data) return <p>Country not found.</p>;
  const c = query.data;

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">{c.name} ({c.cca3})</h1>
      <p>{c.officialName}</p>
      {c.flagPng ? <img src={c.flagPng} alt={c.name} className="h-32 rounded" /> : null}
      <p>Region: {c.region} / {c.subregion}</p>
      <p>Population: {c.population.toLocaleString()}</p>
      <p>Capital: {c.capital ?? "N/A"}</p>
      <p>Borders: {c.borders.join(", ") || "None"}</p>
      {c.mapsUrl ? <a className="text-blue-600" href={c.mapsUrl} target="_blank">Map</a> : null}
      <div className="flex gap-2">
        <Button onClick={addFavorite}>Add Favorite</Button>
      </div>
      <div>
        <h2 className="mb-2 font-semibold">My note</h2>
        <Textarea value={note} onChange={(e) => setNote(e.target.value)} rows={5} />
        <Button onClick={saveNote} className="mt-2">Save Note</Button>
      </div>
    </section>
  );
}
