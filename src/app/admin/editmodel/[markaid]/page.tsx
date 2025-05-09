import getModel from "@/app/actions/getmodel";
import { getCurrentUser } from "@/app/actions/getuser";
import CreateModel from "@/components/createmodel/page";
import ManageModel from "@/components/manage/managemodel";
import WarningText from "@/components/warning";

type Params = Promise<{ markaid: string }>;

export default async function Admin({ params }: { params: Params }) {
  const markaid = (await params).markaid;
  const currentUser = await getCurrentUser();
  const models = await getModel({ markaid: markaid });

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <WarningText text="Buraya erişiminiz yoktur!" />;
  }
  return (
    <div className="relative z-0 my-20">
      <div className="mx-auto mt-10 gap-8 px-32" key={1}>
        <p className="text-center text-5xl tracking-wider text-slate-600">
          Model Düzenleme <br />
          <br />
        </p>
        <CreateModel markaid={markaid} />
        <br />
        <ManageModel modeller={models} />
      </div>
    </div>
  );
}
