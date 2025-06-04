import { JwtPayload, verify } from "jsonwebtoken";
import { env } from "@/config/env";
import { prismaClient } from "@/lib/prismaClient";
import { User } from "@/entites/User";
import { type cookies } from "next/headers";

export function getAccessToken(cookieStore: ReturnType<typeof cookies>) {
  return cookieStore.get("accessToken")?.value;
}

function verifyJwt(cookieStore: ReturnType<typeof cookies>) {
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

export function isAuthenticated(cookieStore: ReturnType<typeof cookies>) {
  return !!verifyJwt(cookieStore);
}

export async function authUser(
  cookieStore: ReturnType<typeof cookies>
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
