import { NextRequest, NextResponse } from "next/server";
import { schema, User } from "./type";
import { prismaClient } from "@/lib/prismaClient";
import { hash } from "bcryptjs";

export async function POST(request: NextRequest) {
  const body: User = await request.json();

  const { success, error, data } = schema.safeParse(body);

  if (!success) {
    return NextResponse.json({ errors: error.issues }, { status: 400 });
  }

  const { name, lastName, email, password } = data;

  const emailAlreadyInUse = await prismaClient.user.findFirst({
    where: {
      email,
    },
    select: { id: true },
  });

  if (emailAlreadyInUse) {
    return NextResponse.json({ error: "Email ja existe" }, { status: 409 });
  }
  const hashPassword = await hash(password, 12);
  await prismaClient.user.create({
    data: {
      name,
      lastName,
      email,
      password: hashPassword,
    },
  });
  return new NextResponse(null, { status: 204 });
}
