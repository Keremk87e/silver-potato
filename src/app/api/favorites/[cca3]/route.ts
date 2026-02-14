import { requireAuth } from "@/lib/auth/guard";
import { prisma } from "@/lib/db/prisma";

export async function DELETE(_: Request, { params }: { params: Promise<{ cca3: string }> }) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  const { cca3 } = await params;

  await prisma.favorite.deleteMany({
    where: { userId: auth.session.sub, cca3: cca3.toUpperCase() }
  });

  return Response.json({ ok: true });
}
