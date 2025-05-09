import getPaketAck from "@/app/actions/getpaketack";
import { getCurrentUser } from "@/app/actions/getuser";
import CreatePaketAck from "@/components/createpaketack/page";
import ManagePaketAck from "@/components/manage/managepaketack";
import WarningText from "@/components/warning";

type Params = Promise<{ paketid: string }>;

export default async function Admin({ params }: { params: Params }) {
  const paketid = (await params).paketid;
  const currentUser = await getCurrentUser();
  const pakets = await getPaketAck({ paketid: paketid });
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <WarningText text="Buraya erişiminiz yoktur!" />;
  }
  return (
    <div className="relative z-0 my-20">
      <div className="mx-auto mt-10 gap-8 px-32" key={1}>
        <p className="text-center text-5xl tracking-wider text-slate-600">
          Versiyon Düzenleme <br />
          <br />
        </p>
        <CreatePaketAck paketid={paketid} />
        <br />
        <ManagePaketAck paketler={pakets} />
      </div>
    </div>
  );
}
