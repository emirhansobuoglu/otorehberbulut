"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Card } from "@nextui-org/react";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import firebaseApp from "@/lib/firebase";

import Input from "../input";

const CreateMarka = () => {
  const [img, setImg] = useState<File | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      image: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!img) {
      toast.error("No image selected!");
      return;
    }
    let uploadedImg;
    const handleChange = async () => {
      try {
        const storage = getStorage(firebaseApp);
        const storageRef = ref(storage, `images/${data.name}.jpg`);
        const uploadTask = uploadBytesResumable(storageRef, img);
        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`upload is${progress}% done`);
              switch (snapshot.state) {
                case "paused":
                  console.log("Upload is paused");
                  break;
                case "running":
                  console.log("Upload is running");
                  break;
              }
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                toast.success("Fotoğraf yükleme başarılı!");
                uploadedImg = downloadURL;
                resolve();
              });
            }
          );
        });
      } catch (error) {
        console.log(error);
      }
    };
    await handleChange();
    const newData = { ...data, image: uploadedImg };

    axios
      .post("/api/data", newData)
      .then(() => {
        toast.success("Marka ekleme işlemi başarılı");
        router.refresh();
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  };

  const onChangeFunc = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImg(e.target.files[0]);
    }
  };
  return (
    <>
      <div className="relative mx-auto w-1/2">
        <Card
          isFooterBlurred
          className="items-center justify-center bg-black/30 p-2"
          shadow="lg"
        >
          <h3 className="p-1 text-2xl text-slate-200">Yeni Marka Ekle</h3>
          <Input
            placeholder="Marka Adı"
            type="text"
            id="name"
            register={register}
            errors={errors}
            required
          />
          <input
            type="file"
            id="image"
            onChange={onChangeFunc}
            required
            className="rounded-3xl p-3 text-slate-200"
          />
          <button
            className="w-1/2 rounded-2xl border border-green-500 bg-green-500 text-xl"
            onClick={handleSubmit(onSubmit)}
          >
            Ekle
          </button>
        </Card>
      </div>
    </>
  );
};

export default CreateMarka;
