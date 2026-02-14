import { NextResponse } from "next/server";
import { getSession } from "./session";

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    return {
      error: NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    };
  }
  return { session };
}
