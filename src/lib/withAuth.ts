import { User } from "@/entites/User";
import { authUser } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface NextRequestWithUser extends NextRequest {
  user: User;
}

export function withAuth(
  handler: (request: NextRequestWithUser) => Promise<unknown>
) {
  return async (request: NextRequest) => {
    const cookieStore = cookies();
    const user = await authUser(cookieStore);

    if (!user) {
      return NextResponse.json(
        {
          error: "Nao autorizado",
        },
        { status: 401 }
      );
    }

    const requestWithUser = request as NextRequestWithUser;
    requestWithUser.user = user;
    return handler(requestWithUser);
  };
}
