import { requireAuth } from "@/lib/auth/guard";
import { prisma } from "@/lib/db/prisma";
import { collectionItemSchema } from "@/lib/validation/domain";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  const { id } = await params;
  const parsed = collectionItemSchema.safeParse(await req.json());
  if (!parsed.success) return Response.json(parsed.error.flatten(), { status: 400 });

  const ownsCollection = await prisma.collection.findFirst({
    where: { id, userId: auth.session.sub }
  });
  if (!ownsCollection) return Response.json({ message: "Not found" }, { status: 404 });

  const item = await prisma.collectionItem.upsert({
    where: { collectionId_cca3: { collectionId: id, cca3: parsed.data.cca3 } },
    create: { collectionId: id, cca3: parsed.data.cca3 },
    update: {}
  });

  return Response.json(item, { status: 201 });
}
