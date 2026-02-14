import { requireAuth } from "@/lib/auth/guard";
import { prisma } from "@/lib/db/prisma";
import { noteSchema } from "@/lib/validation/domain";

export async function GET(_: Request, { params }: { params: Promise<{ cca3: string }> }) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  const { cca3 } = await params;

  const note = await prisma.note.findUnique({
    where: { userId_cca3: { userId: auth.session.sub, cca3: cca3.toUpperCase() } }
  });

  return Response.json(note);
}

export async function PUT(req: Request, { params }: { params: Promise<{ cca3: string }> }) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  const { cca3 } = await params;
  const parsed = noteSchema.safeParse(await req.json());
  if (!parsed.success) return Response.json(parsed.error.flatten(), { status: 400 });

  const note = await prisma.note.upsert({
    where: { userId_cca3: { userId: auth.session.sub, cca3: cca3.toUpperCase() } },
    create: { userId: auth.session.sub, cca3: cca3.toUpperCase(), content: parsed.data.content },
    update: { content: parsed.data.content }
  });

  return Response.json(note);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ cca3: string }> }) {
  const auth = await requireAuth();
  if ("error" in auth) return auth.error;
  const { cca3 } = await params;

  await prisma.note.deleteMany({ where: { userId: auth.session.sub, cca3: cca3.toUpperCase() } });
  return Response.json({ ok: true });
}
