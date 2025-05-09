"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { User as UserModel } from "@prisma/client";
import { IconUser } from "@tabler/icons-react";
import { signOut } from "next-auth/react";

interface UserProps {
  currentUser: UserModel | null | undefined;
}
const User: React.FC<UserProps> = ({ currentUser }) => {
  const router = useRouter();
  const [openMenu, SetOpenMenu] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MenuFunc = (url: any, type: string) => {
    if (type == "logout") {
      SetOpenMenu(false);
      signOut();
      router.push(url);
    } else if (type == "admin") {
      SetOpenMenu(false);
      router.push(url);
    }
  };
  return (
    <div className="relative hidden md:flex">
      <div
        onClick={() => SetOpenMenu(!openMenu)}
        className="flex cursor-pointer items-center gap-1"
      >
        <IconUser />
        <div>{currentUser ? currentUser.name : "user"}</div>
      </div>
      {openMenu && (
        <div className="absolute right-0 top-10 flex w-[180px] gap-3 rounded-2xl bg-white p-2 text-slate-600 shadow-lg">
          <div
            className="btn btn-primary cursor-pointer"
            onClick={() => MenuFunc("/admin/edit", "admin")}
          >
            Admin
          </div>
          <div
            className="btn btn-error cursor-pointer"
            onClick={() => MenuFunc("/admin/login", "logout")}
          >
            Çıkış Yap
          </div>
        </div>
      )}
    </div>
  );
};
export default User;
