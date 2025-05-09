"use client";

import { useRouter } from "next/navigation";

import { Card } from "@nextui-org/react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import Input from "../input";

interface CreateVersProps {
  kasaid: string | undefined;
}
const CreateVers: React.FC<CreateVersProps> = ({ kasaid }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      kasaid: kasaid,
      segment: "",
      engine_capacity: "",
      horsepower: "",
      torque: "",
      fueltype: "",
      fuel: "",
      transmission: "",
      topspeed: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    axios
      .post("/api/vers", data)
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
          className="grid grid-cols-2 items-center justify-center bg-black/30 p-2"
          shadow="lg"
        >
          <h3 className="col-span-2 mx-auto p-1 text-2xl text-slate-200">
            Yeni Versiyon Ekle
          </h3>
          <div className="col-span-1 px-2">
            <Input
              placeholder="Versiyon Adı *Ör: 316, 1.6GTD*"
              type="text"
              id="name"
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className="col-span-1 px-2">
            <Input
              placeholder="Segment Ör: B Segment"
              type="text"
              id="segment"
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className="col-span-1 px-2">
            <Input
              placeholder="Motor Hacmi"
              type="text"
              id="engine_capacity"
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className="col-span-1 px-2">
            <Input
              placeholder="HP"
              type="text"
              id="horsepower"
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className="col-span-1 px-2">
            <Input
              placeholder="Tork"
              type="text"
              id="torque"
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className="col-span-1 px-2">
            <Input
              placeholder="Yakıt Türü"
              type="text"
              id="fueltype"
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className="col-span-1 px-2">
            <Input
              placeholder="Yakıt Tüketimi"
              type="text"
              id="fuel"
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className="col-span-1 px-2">
            <Input
              placeholder="Şanzıman"
              type="text"
              id="transmission"
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className="col-span-1 px-2">
            <Input
              placeholder="Maks. Hız"
              type="text"
              id="topspeed"
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className="col-span-1 px-2">
            <Input
              placeholder="Hızlanma 0-100"
              type="text"
              id="accerelation"
              register={register}
              errors={errors}
              required
            />
          </div>
          <button
            className="col-span-2 mx-auto w-1/2 rounded-2xl bg-green-500 text-xl"
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

export default CreateVers;
