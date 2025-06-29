import { prisma } from "@/lib/database";

export async function GET() {
  try {
    const payStructures = await prisma.payStructure.findMany({});
    return Response.json(payStructures);
  } catch (err) {
    console.log(err);
    return Response.json("An error occured.");
  }
}
