import getProdById from "@/actions/getProdById";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, quantity } = body;

  const prod = await getProdById(id);
  // console.log(prod);
  const maxQ = prod?.maxQuantity ?? 0;
  // console.log(maxQ);

  const maxQuantity = maxQ - quantity;
  // console.log(maxQuantity);
  // const maxQuantity = quantity;
  let inStock = true;
  if (maxQuantity === 0) {
    inStock = false;
  }

  const product = await prisma.product.update({
    where: { id: id },
    data: { maxQuantity, inStock },
  });

  return NextResponse.json(product);
}
