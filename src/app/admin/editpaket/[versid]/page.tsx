import getPaket from "@/app/actions/getpaket";
import { getCurrentUser } from "@/app/actions/getuser";
import CreatePaket from "@/components/createpaket/page";
import ManagePaket from "@/components/manage/managepaket";
import WarningText from "@/components/warning";

type Params = Promise<{ versid: string }>;

export default async function Admin({ params }: { params: Params }) {
  const versid = (await params).versid;
  const currentUser = await getCurrentUser();
  const pakets = await getPaket({ versid: versid });
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <WarningText text="Buraya erişiminiz yoktur!" />;
  }
  return (
    <div className="relative z-0 my-20">
      <div className="mx-auto mt-10 gap-8 px-32" key={1}>
        <p className="text-center text-5xl tracking-wider text-slate-600">
          Paket Düzenleme <br />
          <br />
        </p>
        <CreatePaket versid={versid} />
        <br />
        <ManagePaket paketler={pakets} />
      </div>
    </div>
  );
}
