import getKasa from "@/app/actions/getkasa";
import { getCurrentUser } from "@/app/actions/getuser";
import CreateKasa from "@/components/createkasa/page";
import ManageKasa from "@/components/manage/managekasa";
import WarningText from "@/components/warning";

type Params = Promise<{ modelid: string }>;

export default async function Admin({ params }: { params: Params }) {
  const modelid = (await params).modelid;
  const currentUser = await getCurrentUser();
  const kasas = await getKasa({ modelid: modelid });
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <WarningText text="Buraya erişiminiz yoktur!" />;
  }
  return (
    <div className="relative z-0 my-20">
      <div className="mx-auto mt-10 gap-8 px-32" key={1}>
        <p className="mx-auto text-center text-5xl tracking-wider text-slate-600">
          Kasa Düzenleme <br />
          <br />
        </p>
        <CreateKasa modelid={modelid} />
        <br />
        <ManageKasa kasalar={kasas} />
      </div>
    </div>
  );
}
