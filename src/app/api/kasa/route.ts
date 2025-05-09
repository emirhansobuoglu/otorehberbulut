import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/getuser";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }
  const body = await request.json();
  const { name, year, image, modelid } = body;

  try {
    const model = await prisma.kasa.create({
      data: {
        name,
        year,
        image,
        modelid,
      },
    });
    return NextResponse.json(model);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
