"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { User } from "@prisma/client";
import { IconLogin } from "@tabler/icons-react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "../input";

interface RegisterProps {
  currentUser: User | null | undefined;
}
const RegisterClient: React.FC<RegisterProps> = ({ currentUser }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    axios.post("/api/register/", data).then(() => {
      toast.success("Kullanıcı Oluşturuldu...");
      signIn("credentials", {
        name: data.name,
        password: data.password,
        redirect: false,
      }).then((callback) => {
        if (callback?.ok) {
          router.push("/admin/edit");
          router.refresh();
          toast.success("Giriş Başarılı...");
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      });
    });
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  }, []);
  return (
    <div className="mx-auto mt-20 h-screen min-h-fit w-full items-center justify-center p-5 md:p-20">
      <div className="mx-auto grid w-full gap-4 rounded-md p-3 shadow-lg md:w-[500px]">
        <h3 className="text-center text-2xl text-slate-800">Kayıt Ol</h3>
        <Input
          placeholder="Name"
          type="text"
          id="name"
          register={register}
          errors={errors}
          required
        />
        <Input
          placeholder="Password"
          type="password"
          id="password"
          register={register}
          errors={errors}
          required
        />
        <button
          className="btn btn-success rounded-2xl"
          onClick={handleSubmit(onSubmit)}
        >
          <div className="flex items-center justify-center gap-4">
            <IconLogin />
            Kayıt ol
          </div>
        </button>
      </div>
    </div>
  );
};

export default RegisterClient;
