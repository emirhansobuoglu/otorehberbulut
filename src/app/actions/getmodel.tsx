import prisma from "@/lib/prismadb";

export interface IMarkaParams {
  markaid: string | undefined | null;
}

export default async function getModel(params: IMarkaParams) {
  try {
    const { markaid } = params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any

    const modeller = await prisma.model.findMany({
      where: {
        markaid: markaid || undefined,
      },
      orderBy: {
        name: "asc",
      },
    });
    return modeller;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
}
