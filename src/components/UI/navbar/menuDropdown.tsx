"use client";

import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/src/server-cookie/logoutUser";

const MenuDropdown = ({ menuItems, userName, onLogout }: any) => {
  const router = useRouter();

  const handleNavigation = async (path: string | null) => {
    if (path) {
      await logoutUser(router);
    } else if (onLogout) {
      onLogout();
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        {userName && (
          <Avatar
            className="cursor-pointer"
            name={userName}
          />
        )}
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions">
        {menuItems.map(({ key, label, path, isDanger }: any) => (
          <DropdownItem
            key={key}
            onPress={() => handleNavigation(path)}
            className={isDanger ? "text-danger" : ""}
            color={isDanger ? "danger" : undefined} // Set undefined if no danger color
          >
            {label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default MenuDropdown;
