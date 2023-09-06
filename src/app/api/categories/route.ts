import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";

// FETCH ALL CATEGORIES
export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

export const POST = () => {
  return new NextResponse("Hello method POST", { status: 200 });
};
