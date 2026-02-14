import { requireAuth } from "@/lib/auth/guard";
import { prisma } from "@/lib/db/prisma";
import { collectionSchema } from "@/lib/validation/domain";

export async function GET() {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  const collections = await prisma.collection.findMany({
    where: { userId: auth.session.sub },
    include: { items: true }
  });

  return Response.json(collections);
}

export async function POST(req: Request) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;

  const parsed = collectionSchema.safeParse(await req.json());
  if (!parsed.success) return Response.json(parsed.error.flatten(), { status: 400 });

  const collection = await prisma.collection.create({
    data: { userId: auth.session.sub, ...parsed.data }
  });

  return Response.json(collection, { status: 201 });
}
