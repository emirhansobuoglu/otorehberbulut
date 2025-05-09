import prisma from "@/lib/prismadb";

export interface IMarkaParams {
  modelid: string | undefined | null;
}

export default async function getKasa(params: IMarkaParams) {
  try {
    const { modelid } = params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    const modeller = await prisma.kasa.findMany({
      where: {
        modelid: modelid || undefined,
      },
      orderBy: {
        name: "asc",
      },
      include: {
        model: {
          select: {
            name: true,
          },
        },
      },
    });
    const result = modeller.map((paket) => ({
      ...paket,
      modelAd: paket.model?.name || null,
    }));
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
}
