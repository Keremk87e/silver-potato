import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar authenticated />
      <div className="mx-auto flex max-w-6xl gap-8 px-4 py-6">
        <aside className="w-48 space-y-2 text-sm">
          <Link href="/app/search" className="block rounded p-2 hover:bg-slate-100">Search</Link>
          <Link href="/app/compare" className="block rounded p-2 hover:bg-slate-100">Compare</Link>
          <Link href="/app/collections" className="block rounded p-2 hover:bg-slate-100">Collections</Link>
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </main>
  );
}
