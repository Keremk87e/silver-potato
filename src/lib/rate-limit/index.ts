type Entry = { count: number; expiresAt: number };

const store = new Map<string, Entry>();

export function checkRateLimit(
  key: string,
  maxRequests = 10,
  windowMs = 60_000,
  now = Date.now()
) {
  const current = store.get(key);
  if (!current || current.expiresAt < now) {
    store.set(key, { count: 1, expiresAt: now + windowMs });
    return { ok: true, remaining: maxRequests - 1 };
  }

  if (current.count >= maxRequests) {
    return { ok: false, remaining: 0, retryAfterMs: current.expiresAt - now };
  }

  current.count += 1;
  return { ok: true, remaining: maxRequests - current.count };
}
