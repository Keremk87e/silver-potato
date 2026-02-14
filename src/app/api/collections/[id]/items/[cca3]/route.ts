import { requireAuth } from "@/lib/auth/guard";
import { prisma } from "@/lib/db/prisma";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string; cca3: string }> }
) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  const { id, cca3 } = await params;

  const ownsCollection = await prisma.collection.findFirst({
    where: { id, userId: auth.session.sub }
  });
  if (!ownsCollection) return Response.json({ message: "Not found" }, { status: 404 });

  await prisma.collectionItem.deleteMany({
    where: { collectionId: id, cca3: cca3.toUpperCase() }
  });

  return Response.json({ ok: true });
}
