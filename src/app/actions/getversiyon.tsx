/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prismadb";

export interface IMarkaParams {
  kasaid: string | undefined | null;
}

export default async function getVersiyon(params: IMarkaParams) {
  try {
    const { kasaid } = params;

    const versiyonlar = await prisma.versiyon.findMany({
      where: {
        kasaid: kasaid || undefined,
      },
      orderBy: {
        kasa: {
          name: "asc",
        },
      },
      include: {
        kasa: {
          select: {
            name: true,
          },
        },
      },
    });

    const result = versiyonlar.map((versiyon) => ({
      ...versiyon,
      kasaName: versiyon.kasa?.name || null,
    }));

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
