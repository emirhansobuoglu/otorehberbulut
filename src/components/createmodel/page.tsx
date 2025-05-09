"use client";

import { useRouter } from "next/navigation";

import { Card } from "@nextui-org/react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Input from "../input";

interface CreateModelProps {
  markaid: string | undefined;
}
const CreateModel: React.FC<CreateModelProps> = ({ markaid }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      markaid: markaid,
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios
      .post("/api/model", data)
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
      <div className="relative mx-auto w-1/2">
        <Card
          isFooterBlurred
          className="items-center justify-center bg-black/30 p-2"
          shadow="lg"
        >
          <h3 className="p-1 text-2xl text-slate-200">Yeni Model Ekle</h3>
          <Input
            placeholder="Model Adı"
            type="text"
            id="name"
            register={register}
            errors={errors}
            required
          />
          <button
            className="w-1/2 rounded-2xl bg-green-500 text-xl"
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

export default CreateModel;
