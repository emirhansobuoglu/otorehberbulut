/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth";

import prisma from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session?.user?.name) {
      return null;
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        name: session?.user?.name,
      },
    });
    if (!currentUser) {
      return null;
    }
    return {
      ...currentUser,
    };
  } catch (error: any) {
    console.error(error);
  }
}
