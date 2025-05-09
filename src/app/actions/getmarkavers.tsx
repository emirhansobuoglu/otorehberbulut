/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prismadb";

export interface IMarkaParams {
  versid?: string | null | undefined;
}

export default async function getMarkaVers(params: IMarkaParams) {
  try {
    const { versid } = params;
    if (versid) {
      const kasaid = await prisma.versiyon.findFirst({
        where: { id: versid },
        select: { kasaid: true },
      });
      return kasaid;
    }
    return null;
  } catch (error: any) {
    throw new Error(
      error.message || "An error occurred while fetching marka details."
    );
  }
}
