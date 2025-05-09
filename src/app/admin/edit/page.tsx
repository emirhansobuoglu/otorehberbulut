import getMarka from "@/app/actions/getmarka";
import { getCurrentUser } from "@/app/actions/getuser";
import CreateMarka from "@/components/createmarka/page";
import ManageMarka from "@/components/manage/managemarka";
import WarningText from "@/components/warning";

export default async function Admin() {
  const currentUser = await getCurrentUser();
  const markas = await getMarka({ search: null });
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <WarningText text="Buraya erişiminiz yoktur!" />;
  }
  return (
    <div className="relative z-0 mt-20">
      <div className="mx-auto mt-10 gap-10 px-32" key={1}>
        <p className="text-center text-5xl tracking-wider text-slate-600">
          Hemen Başlayabilirsiniz <br />
          <br />
        </p>
        <CreateMarka /> <br />
        <br />
        <ManageMarka markalar={markas} />
      </div>
    </div>
  );
}
