"use client";

import { useState, useEffect } from "react";
import { SidebarOptions } from "./SidebarOptions";
import { useUser } from "@/src/context/user.provider";
import { adminLinks, userLinks } from "./constants";
import SidebarLoading from "./Loading";

const Sidebar = () => {
  const { user, isLoading } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading]);

  if (loading) {
    return <SidebarLoading />;
  }

  const getInitials = () => {
    const first = user?.firstName?.[0] || "";
    const last = user?.lastName?.[0] || "";
    return `${first}${last}`.toUpperCase();
  };

  return (
    <aside className="space-y-6 p-4">
      {/* User Card */}
      <div className="relative overflow-hidden rounded-2xl border border-purple-300 dark:border-purple-700 bg-white dark:bg-zinc-900 shadow-md p-6 text-center transition-all duration-300">
        <div className="absolute inset-0 z-0 opacity-10 bg-gradient-to-br from-purple-200 to-purple-500 rounded-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Avatar with Initials */}
          <div className="w-20 h-20 mb-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-3xl font-bold flex items-center justify-center shadow-md">
            {getInitials()}
          </div>

          {/* Name */}
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-white capitalize">
            {user?.firstName} {user?.lastName}
          </h2>

          {/* Email */}
          <a
            href={`mailto:${user?.email}`}
            className="text-sm text-zinc-500 hover:text-purple-600 transition break-words">
            {user?.email}
          </a>

          {/* Role Badge */}
          <span className="mt-3 inline-block backdrop-blur-sm bg-purple-300/30 dark:bg-purple-300/20 border border-purple-400 text-purple-800 dark:text-purple-300 text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {user?.role || "Guest"}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div className="rounded-2xl bg-white dark:bg-zinc-900 shadow-md p-4 border border-gray-200 dark:border-zinc-700 transition-all duration-300">
        <SidebarOptions
          groups={user?.role === "user" ? userLinks : adminLinks}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
