import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, description } = body;

  const user = await prisma.contact.create({
    data: {
      name,
      email,
      description,
    },
  });
  return NextResponse.json(user);
}
