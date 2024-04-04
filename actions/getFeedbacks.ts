import prisma from "@/libs/prismadb";

export default async function getFeedbacks() {
  try {
    const Feedbacks = await prisma.feedback.findMany();
    return Feedbacks;
  } catch (error: any) {
    throw new Error(error);
  }
}
