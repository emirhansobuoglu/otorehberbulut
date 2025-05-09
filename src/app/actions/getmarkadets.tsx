/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prismadb";

export interface IMarkaParams {
  modelid?: string | null;
  markaid?: string | null;
  kasaid?: string | null;
}

export default async function getMarkaDetails(params: IMarkaParams) {
  try {
    const { modelid, markaid, kasaid } = params;

    let resolvedMarkaId: string | undefined;
    let resolvedModelId: string | undefined;
    let modelAd: string | undefined;
    let kasalar: any | undefined;

    if (markaid) {
      // Eğer markaid verilmişse direkt kullan
      resolvedMarkaId = markaid;
    } else if (modelid) {
      // Eğer modelid verilmişse model tablosundan markaid'yi al
      const model = await prisma.model.findFirst({
        where: { id: modelid },
        select: { markaid: true },
      });
      resolvedMarkaId = model?.markaid;
    } else if (kasaid) {
      // Eğer kasaid verilmişse önce modelid'yi, ardından markaid'yi ve model adını al
      resolvedModelId = (
        await prisma.kasa.findFirst({
          where: { id: kasaid },
          select: { modelid: true },
        })
      )?.modelid;

      const model = await prisma.model.findFirst({
        where: {
          id: resolvedModelId,
        },
        select: {
          markaid: true,
          name: true,
        },
      });

      resolvedMarkaId = model?.markaid;
      modelAd = model?.name;

      // Kasa bilgilerini al
      kasalar = await prisma.kasa.findFirst({
        where: { id: kasaid },
      });
    }

    if (!resolvedMarkaId) {
      throw new Error("A valid modelid, markaid, or kasaid is required.");
    }

    // Marka tablosundan name ve image bilgilerini al
    const markaDetails = await prisma.marka.findFirst({
      where: { id: resolvedMarkaId },
      select: {
        name: true,
        image: true,
      },
    });

    return {
      marka: markaDetails,
      kasalar: kasaid ? kasalar : undefined, // Eğer kasaid varsa kasa bilgileri eklenir
      modelAd: kasaid ? modelAd : undefined, // Eğer kasaid varsa model adı eklenir
    };
  } catch (error: any) {
    throw new Error(
      error.message || "An error occurred while fetching marka details."
    );
  }
}
