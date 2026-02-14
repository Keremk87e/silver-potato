import { getCountryByCode } from "@/lib/countries/service";

export async function GET(_: Request, { params }: { params: Promise<{ cca3: string }> }) {
  const { cca3 } = await params;
  try {
    const country = await getCountryByCode(cca3);
    if (!country) return Response.json({ message: "Country not found" }, { status: 404 });
    return Response.json(country);
  } catch {
    return Response.json({ message: "Country service unavailable" }, { status: 502 });
  }
}
