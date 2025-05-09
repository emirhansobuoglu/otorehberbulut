import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, password } = body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error: ", error.stack);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
