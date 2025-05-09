import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/getuser";
import prisma from "@/lib/prismadb";

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const currentUser = await getCurrentUser();
  const icerikid = params.id;
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const model = await prisma.paketicerik.delete({
    where: {
      id: icerikid,
    },
  });
  return NextResponse.json(model);
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const currentUser = await getCurrentUser();
  const icerikid = await params.id;

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  try {
    const body = await request.json();
    const { icerik } = body;

    if (!icerik) {
      return NextResponse.json(
        { error: "Name and image fields are required." },
        { status: 400 }
      );
    }

    const updatedpaket = await prisma.paketicerik.update({
      where: { id: icerikid },
      data: { icerik },
    });

    return NextResponse.json(updatedpaket);
  } catch (error) {
    console.error("Error updating model:", error);
    return NextResponse.json(
      { error: "Failed to update model." },
      { status: 500 }
    );
  }
}
