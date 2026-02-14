"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useRouter } from "next/navigation";

export function Navbar({ authenticated = false }: { authenticated?: boolean }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Globe className="h-5 w-5" /> Country Intel
        </Link>
        <div className="flex items-center gap-2">
          {authenticated ? (
            <>
              <Link href="/app/search"><Button variant="ghost">App</Button></Link>
              <Button variant="outline" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login"><Button variant="ghost">Login</Button></Link>
              <Link href="/register"><Button>Register</Button></Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
