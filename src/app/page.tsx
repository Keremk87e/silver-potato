import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <section className="mx-auto max-w-5xl px-4 py-20">
        <h1 className="text-4xl font-bold">Country Intel</h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          REST Countries ile ülke keşfi, karşılaştırma, favoriler, notlar ve koleksiyonlar.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/register" className="rounded-md bg-slate-900 px-4 py-2 text-white">Start now</Link>
          <Link href="/app/search" className="rounded-md border border-slate-300 px-4 py-2">Demo Search</Link>
        </div>
      </section>
    </main>
  );
}
