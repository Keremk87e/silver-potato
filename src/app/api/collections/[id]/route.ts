import { requireAuth } from "@/lib/auth/guard";
import { prisma } from "@/lib/db/prisma";
import { collectionSchema } from "@/lib/validation/domain";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  const { id } = await params;

  const collection = await prisma.collection.findFirst({
    where: { id, userId: auth.session.sub },
    include: { items: true }
  });

  if (!collection) return Response.json({ message: "Not found" }, { status: 404 });
  return Response.json(collection);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  const { id } = await params;
  const parsed = collectionSchema.safeParse(await req.json());
  if (!parsed.success) return Response.json(parsed.error.flatten(), { status: 400 });

  const collection = await prisma.collection.updateMany({
    where: { id, userId: auth.session.sub },
    data: parsed.data
  });

  return Response.json(collection);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  const { id } = await params;

  await prisma.collection.deleteMany({ where: { id, userId: auth.session.sub } });
  return Response.json({ ok: true });
}
