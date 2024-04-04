import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { rating, email, subject, description } = body;

  const user = await prisma.feedback.create({
    data: {
      rating: parseInt(rating),
      email,
      subject,
      description,
    },
  });
  return NextResponse.json(user);
}
