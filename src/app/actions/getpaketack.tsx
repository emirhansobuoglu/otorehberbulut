/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prismadb";

export interface IMarkaParams {
  paketid: string | undefined | null;
}

export default async function getPaketAck(params: IMarkaParams) {
  try {
    const { paketid } = params;

    const detaylar = await prisma.paketicerik.findMany({
      where: {
        paketid: paketid || undefined,
      },
      orderBy: {
        paket: {
          name: "asc",
        },
      },
      include: {
        paket: {
          select: {
            name: true,
          },
        },
      },
    });

    const result = detaylar.map((detay) => ({
      ...detay,
      paketName: detay.paket?.name || null,
    }));

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
