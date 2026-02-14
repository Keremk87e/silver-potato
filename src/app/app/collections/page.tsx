"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Collection = { id: string; name: string; description?: string; items: { id: string; cca3: string }[] };

export default function CollectionsPage() {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cca3, setCca3] = useState("TUR");

  const query = useQuery({
    queryKey: ["collections"],
    queryFn: async () => {
      const res = await fetch("/api/collections");
      return (await res.json()) as Collection[];
    }
  });

  async function createCollection() {
    await fetch("/api/collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description })
    });
    setName("");
    setDescription("");
    qc.invalidateQueries({ queryKey: ["collections"] });
  }

  async function addItem(id: string) {
    await fetch(`/api/collections/${id}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cca3 })
    });
    qc.invalidateQueries({ queryKey: ["collections"] });
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Collections</h1>
      <Card className="space-y-2">
        <Input placeholder="Collection name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <Button onClick={createCollection}>Create</Button>
      </Card>

      <Input placeholder="Country code for add" value={cca3} onChange={(e) => setCca3(e.target.value)} />
      <div className="space-y-3">
        {query.data?.map((c) => (
          <Card key={c.id}>
            <h2 className="font-semibold">{c.name}</h2>
            <p className="text-sm text-slate-500">{c.description}</p>
            <p className="text-sm">Items: {c.items.map((i) => i.cca3).join(", ") || "None"}</p>
            <Button className="mt-2" onClick={() => addItem(c.id)}>Add country</Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
