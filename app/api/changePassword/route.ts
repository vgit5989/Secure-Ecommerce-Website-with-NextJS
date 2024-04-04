import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, password } = body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const order = await prisma.user.update({
    where: { id: id },
    data: { hashedPassword },
  });

  return NextResponse.json(order);
}
