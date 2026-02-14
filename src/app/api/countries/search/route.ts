import { searchCountries } from "@/lib/countries/service";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  if (!q) return Response.json([]);
  try {
    const countries = await searchCountries(q);
    return Response.json(countries);
  } catch {
    return Response.json({ message: "Country service unavailable" }, { status: 502 });
  }
}
