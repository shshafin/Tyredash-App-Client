"use client";

import { NavbarItem } from "@heroui/navbar";
import React from "react";
import NavbarDropdown from "./NavbarDropdown";
import { useUser } from "@/src/context/user.provider";
import Link from "next/link";
import { Button } from "@heroui/button";

export const NavbarLogin = () => {
  const { user } = useUser();
  console.log({user}, 'user_user')
  return (
    <>
      {user?.email ? (
        <NavbarItem className="hidden sm:flex gap-2">
          <NavbarDropdown />
        </NavbarItem>
      ) : (
        <NavbarItem className="hidden sm:flex gap-2">
          <Link href={`/login`}>
            <Button>Login</Button>
          </Link>
        </NavbarItem>
      )}
    </>
  );
};

export const NavbarLoginMobile = () => {
  const { user }: any = useUser();
  return (
    <>
      {user?.email ? (
        <NavbarDropdown />
      ) : (
        <Link href={`/login`}>
          <Button>Login</Button>
        </Link>
      )}
    </>
  );
};
