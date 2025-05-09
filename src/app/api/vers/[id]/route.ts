import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/getuser";
import prisma from "@/lib/prismadb";

export async function DELETE(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const currentUser = await getCurrentUser();
  const versid = await params.id;
  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const vers = await prisma.versiyon.delete({
    where: {
      id: versid,
    },
  });
  return NextResponse.json(vers);
}

export async function PUT(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const currentUser = await getCurrentUser();
  const versid = await params.id;

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  try {
    const body = await request.json();
    const {
      name,
      segment,
      engine_capacity,
      horsepower,
      torque,
      fueltype,
      fuel,
      transmission,
      topspeed,
    } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Name and image fields are required." },
        { status: 400 }
      );
    }

    const updatedversiyon = await prisma.versiyon.update({
      where: { id: versid },
      data: {
        name,
        segment,
        engine_capacity,
        horsepower,
        torque,
        fueltype,
        fuel,
        transmission,
        topspeed,
      },
    });

    return NextResponse.json(updatedversiyon);
  } catch (error) {
    console.error("Error updating versiyon:", error);
    return NextResponse.json(
      { error: "Failed to update versiyon." },
      { status: 500 }
    );
  }
}
