import { Card, CardBody } from "@nextui-org/react";

const WarningText = ({ text }: { text: string }) => {
  return (
    <div className="h-screen">
      <Card className="mx-auto mt-20 max-w-md bg-black/20 text-black">
        <CardBody>
          <p className="flex items-center justify-center gap-2 text-2xl">
            {text}
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default WarningText;
