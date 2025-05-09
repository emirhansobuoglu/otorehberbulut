"use client";

import { useRouter } from "next/navigation";

import { Card } from "@nextui-org/react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Input from "../input";

interface CreatePaketProps {
  paketid: string | undefined;
}
const CreatePaket: React.FC<CreatePaketProps> = ({ paketid }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      icerik: "",
      paketid: paketid,
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    axios
      .post("/api/paketack", data)
      .then(() => {
        toast.success("Model ekleme işlemi başarılı");
        router.refresh();
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };
  return (
    <>
      <div className="relative col-span-6 mx-auto w-1/2">
        <Card
          isFooterBlurred
          className="items-center justify-center bg-black/30 p-2"
          shadow="lg"
        >
          <h3 className="mx-auto p-1 text-2xl text-slate-200">
            Yeni İçerik Ekle
          </h3>
          <Input
            placeholder="Model Adı"
            type="text"
            id="icerik"
            register={register}
            errors={errors}
          />
          <button
            className="mx-auto w-1/2 rounded-2xl bg-green-500 text-xl"
            onClick={() => {
              handleSubmit((data) => {
                onSubmit(data);
                reset();
              })();
            }}
          >
            Ekle
          </button>
        </Card>
      </div>
    </>
  );
};

export default CreatePaket;
