"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (!res.ok) return toast.error("Login failed");
    toast.success("Welcome back");
    router.push("/app/search");
  }

  return (
    <main>
      <Navbar />
      <div className="mx-auto mt-16 max-w-md px-4">
        <Card>
          <h1 className="mb-4 text-xl font-semibold">Login</h1>
          <form onSubmit={submit} className="space-y-3">
            <Input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <Button className="w-full" type="submit">Login</Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
