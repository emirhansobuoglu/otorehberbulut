import { getCurrentUser } from "@/app/actions/getuser";
import getVersiyon from "@/app/actions/getversiyon";
import CreateVers from "@/components/createvers/page";
import ManageVersiyon from "@/components/manage/manageversiyon";
import WarningText from "@/components/warning";

type Params = Promise<{ kasaid: string }>;

export default async function Admin({ params }: { params: Params }) {
  const kasaid = (await params).kasaid;
  const currentUser = await getCurrentUser();
  const verss = await getVersiyon({ kasaid: kasaid });
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <WarningText text="Buraya erişiminiz yoktur!" />;
  }
  return (
    <div className="relative z-0 my-20">
      <div className="mx-auto mt-10 gap-8 px-8" key={1}>
        <p className="text-center text-5xl tracking-wider text-slate-600">
          Versiyon Düzenleme <br />
          <br />
        </p>
        <CreateVers kasaid={kasaid} />
        <br />
        <ManageVersiyon versiyonlar={verss} />
      </div>
    </div>
  );
}
