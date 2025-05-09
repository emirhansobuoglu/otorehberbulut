/* eslint-disable @next/next/no-async-client-component */
import Image from "next/image";

import { Link, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";

import { getCurrentUser } from "@/app/actions/getuser";
import User from "@/components/user";

const AppNavbar = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Navbar className="fixed left-0 right-0 top-0 z-50" maxWidth="xl" isBlurred>
      <NavbarContent justify="start">
        {/* <IconSailboat /> */}
        <div className="bg-transparent"></div>
      </NavbarContent>

      <NavbarContent className="gap-4" justify="center">
        <NavbarItem key="logo">
          <Link className="w-full" href="/" size="lg">
            <Image alt="logo" src="/logooo.png" width={150} height={50} />
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {currentUser ? <User currentUser={currentUser} /> : ""}
      </NavbarContent>
    </Navbar>
  );
};
export default AppNavbar;
