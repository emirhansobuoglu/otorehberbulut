import { CircularProgress } from "@nextui-org/react";

export default function Loading() {
  return (
    <CircularProgress
      className="mx-auto mt-20"
      classNames={{
        svg: "w-36 h-36 drop-shadow-md",
      }}
      aria-label="Loading page..."
    />
  );
}
