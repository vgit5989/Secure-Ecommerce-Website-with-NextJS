import prisma from "@/libs/prismadb";

export default async function getProdById(prodId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: prodId,
      },
    });

    if (!product) {
      return null;
    }
    return product;
  } catch (error: any) {
    throw new Error(error);
  }
}
