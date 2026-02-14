import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db/prisma";
import { loginSchema } from "@/lib/validation/auth";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const rate = checkRateLimit(`login:${ip}`, 5, 60_000);
  if (!rate.ok) return Response.json({ message: "Too many login attempts" }, { status: 429 });

  const body = await req.json();
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return Response.json({ errors: parsed.error.flatten() }, { status: 400 });

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return Response.json({ message: "Invalid credentials" }, { status: 401 });

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) return Response.json({ message: "Invalid credentials" }, { status: 401 });

  const token = await createSessionToken({ sub: user.id, email: user.email, username: user.username });
  await setSessionCookie(token);

  return Response.json({ id: user.id, email: user.email, username: user.username });
}
