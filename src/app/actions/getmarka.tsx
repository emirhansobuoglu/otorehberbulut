import prisma from "@/lib/prismadb";

export interface IMarkaParams {
  search?: string | null;
}

export default async function getMarka(params: IMarkaParams) {
  try {
    const { search } = params;
    let searchString = search;
    if (!search) {
      searchString = "";
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    const markalar = await prisma.marka.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: {
        name: "asc",
      },
    });
    return markalar;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
}
