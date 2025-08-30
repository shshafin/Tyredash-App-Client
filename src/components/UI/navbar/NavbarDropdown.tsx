// "use client";

// import { protectedRoutes } from "@/src/constant";
// import { useUser } from "@/src/context/user.provider";
// import { logoutUser } from "@/src/services/AuthService";
// import { Avatar } from "@heroui/avatar";
// import {
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
// } from "@heroui/dropdown";
// import { usePathname, useRouter } from "next/navigation";

// const NavbarDropdown = () => {
//   const router = useRouter();
//   const pathName = usePathname();
//   const { setIsLoading: userLoading, user } = useUser();
//   const handleLogout = () => {
//     logoutUser();
//     userLoading(true);

//     if (protectedRoutes.some((route) => pathName.match(route))) {
//       router.push("/");
//     }
//   };
//   const handleNavigation = (pathName: string) => {
//     router.push(pathName);
//   };

//   return (
//     <Dropdown>
//       <DropdownTrigger>
//         {user?.firstName && (
//           <Avatar
//             className="cursor-pointer"
//             name={user?.firstName}
//           />
//         )}
//       </DropdownTrigger>
//       <DropdownMenu aria-label="Static Actions">
//         <DropdownItem
//           key="profile"
//           onPress={() => handleNavigation("/profile")}>
//           Profile
//         </DropdownItem>
//         <DropdownItem
//           key="createPost"
//           onPress={() => handleNavigation("/profile/create-post")}>
//           Create Post
//         </DropdownItem>
//         <DropdownItem
//           key="settings"
//           onPress={() => handleNavigation("/profile/settings")}>
//           Settings
//         </DropdownItem>
//         <DropdownItem
//           key="logout"
//           className="text-danger"
//           color="danger"
//           onPress={() => handleLogout()}>
//           Logout
//         </DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   );
// };

// export default NavbarDropdown;

"use client";

import React from "react";
import { useUser } from "@/src/context/user.provider"; // User context
import { logoutUser } from "@/src/services/AuthService"; // Logout service
import { menuConfig } from "./menuConfig";
import MenuDropdown from "./menuDropdown";
import { useRouter } from "next/navigation";

const NavbarDropdown: React.FC = () => {
  const { setIsLoading: userLoading, user, setUser } = useUser();

  const handleLogout = async () => {
    userLoading(true);
    setUser(null);
    await logoutUser();
  };

  // Use "any" for menu items if strict typing is not required
  const menuItems: any = [
    ...(user?.role ? menuConfig[user.role] : []), // Dynamically add role-based menu items
    ...menuConfig.common, // Include common menu items
  ];

  return (
    <MenuDropdown
      menuItems={menuItems}
      userName={user?.firstName}
      onLogout={handleLogout}
    />
  );
};

export default NavbarDropdown;
