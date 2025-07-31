export const menuConfig: any = {
  admin: [
    { key: "dashboard", label: "Dashboard", path: "/admin" },
    { key: "manageUsers", label: "Manage Users", path: "/admin/users" },
  ],
  user: [
    { key: "profile", label: "Profile", path: "/profile" },
    // { key: "createPost", label: "Create Post", path: "/profile/create-post" },
    { key: "settings", label: "Settings", path: "/profile/settings" },
  ],
  common: [{ key: "logout", label: "Logout", path: null, isDanger: true }],
};
