import { prisma } from "@/lib/db/prisma";

const memory = new Map<string, { payload: string; expiresAt: number }>();
const MEM_TTL_MS = 10 * 60 * 1000;
const DB_TTL_MS = 24 * 60 * 60 * 1000;

export async function getCached<T>(key: string): Promise<T | null> {
  const now = Date.now();
  const mem = memory.get(key);
  if (mem && mem.expiresAt > now) return JSON.parse(mem.payload) as T;

  const db = await prisma.countryCache.findUnique({ where: { key } });
  if (db && db.expiresAt.getTime() > now) {
    memory.set(key, { payload: db.payload, expiresAt: now + MEM_TTL_MS });
    return JSON.parse(db.payload) as T;
  }

  return null;
}

export async function setCached<T>(key: string, value: T) {
  const payload = JSON.stringify(value);
  const now = Date.now();
  memory.set(key, { payload, expiresAt: now + MEM_TTL_MS });
  await prisma.countryCache.upsert({
    where: { key },
    create: {
      key,
      payload,
      expiresAt: new Date(now + DB_TTL_MS)
    },
    update: {
      payload,
      expiresAt: new Date(now + DB_TTL_MS)
    }
  });
}

export function __clearMemoryCache() {
  memory.clear();
}
