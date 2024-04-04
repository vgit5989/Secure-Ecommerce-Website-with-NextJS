import prisma from "@/libs/prismadb";

export default async function getContacts() {
  try {
    const contacts = await prisma.contact.findMany();
    return contacts;
  } catch (error: any) {
    throw new Error(error);
  }
}
