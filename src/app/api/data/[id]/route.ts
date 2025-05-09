import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/getuser";
import prisma from "@/lib/prismadb";

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const currentUser = await getCurrentUser();
  const markaid = await params.id;
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const marka = await prisma.marka.delete({
    where: {
      id: markaid,
    },
  });
  return NextResponse.json(marka);
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const currentUser = await getCurrentUser();
  const markaid = await params.id;

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  try {
    const body = await request.json();
    const { name, image } = body;

    if (!name || !image) {
      return NextResponse.json(
        { error: "Name and image fields are required." },
        { status: 400 }
      );
    }

    const updatedMarka = await prisma.marka.update({
      where: { id: markaid },
      data: { name, image },
    });

    return NextResponse.json(updatedMarka);
  } catch (error) {
    console.error("Error updating marka:", error);
    return NextResponse.json(
      { error: "Failed to update marka." },
      { status: 500 }
    );
  }
}
