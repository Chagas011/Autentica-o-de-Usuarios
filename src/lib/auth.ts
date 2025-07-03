import { JwtPayload, verify } from "jsonwebtoken";
import { env } from "@/config/env";
import { prismaClient } from "@/lib/prismaClient";
import { User } from "@/entites/User";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export function getAccessToken(cookieStore: ReadonlyRequestCookies) {
  return cookieStore.get("accessToken")?.value;
}

function verifyJwt(cookieStore: ReadonlyRequestCookies) {
  const accessToken = getAccessToken(cookieStore);

  if (!accessToken) {
    return null;
  }

  try {
    const { sub: userId } = verify(accessToken, env.jwtSecret) as JwtPayload;

    if (!userId) {
      return null;
    }
    return userId;
  } catch {
    return null;
  }
}

export function isAuthenticated(cookieStore: ReadonlyRequestCookies) {
  return !!verifyJwt(cookieStore);
}

export async function authUser(
  cookieStore: ReadonlyRequestCookies
): Promise<User | null> {
  const userId = verifyJwt(cookieStore);
  if (!userId) return null;

  try {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch {
    return null;
  }
}
