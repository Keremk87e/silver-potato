import { requireAuth } from "@/lib/auth/guard";
import { prisma } from "@/lib/db/prisma";
import { favoriteSchema } from "@/lib/validation/domain";

export async function GET() {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  const items = await prisma.favorite.findMany({ where: { userId: auth.session.sub } });
  return Response.json(items);
}

export async function POST(req: Request) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  const parsed = favoriteSchema.safeParse(await req.json());
  if (!parsed.success) return Response.json(parsed.error.flatten(), { status: 400 });

  const item = await prisma.favorite.upsert({
    where: { userId_cca3: { userId: auth.session.sub, cca3: parsed.data.cca3 } },
    create: { userId: auth.session.sub, ...parsed.data },
    update: { note: parsed.data.note }
  });

  return Response.json(item, { status: 201 });
}
