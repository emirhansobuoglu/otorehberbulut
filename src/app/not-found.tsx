import { Card, CardBody } from "@nextui-org/react";
import { IconFileUnknown } from "@tabler/icons-react";

export default async function NotFound() {
  return (
    <div className="h-screen">
      <Card className="mx-auto mt-20 max-w-md bg-black/20 text-black">
        <CardBody>
          <p className="flex items-center justify-center gap-2 text-2xl">
            <IconFileUnknown />
            This page cannot be found.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
