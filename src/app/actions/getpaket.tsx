/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prismadb";

export interface IMarkaParams {
  versid: string | undefined | null;
}

export default async function getPaket(params: IMarkaParams) {
  try {
    const { versid } = params;

    const pakets = await prisma.paket.findMany({
      where: {
        versid: versid || undefined,
      },
      orderBy: {
        name: "asc",
      },
      include: {
        vers: {
          select: {
            name: true,
          },
        },
        paketicerik: true,
      },
    });

    const result = pakets.map((paket) => ({
      ...paket,
      verName: paket.vers?.name || null,
    }));

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
