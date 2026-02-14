"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", username: "", password: "" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (!res.ok) return toast.error("Registration failed");
    toast.success("Account created");
    router.push("/app/search");
  }

  return (
    <main>
      <Navbar />
      <div className="mx-auto mt-16 max-w-md px-4">
        <Card>
          <h1 className="mb-4 text-xl font-semibold">Register</h1>
          <form onSubmit={submit} className="space-y-3">
            <Input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <Input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <Input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <Button className="w-full" type="submit">Create Account</Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
