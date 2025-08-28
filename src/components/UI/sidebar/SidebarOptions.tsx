"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react"; // Icons

type LinkItem = {
  href: string;
  label: string;
  icon?: React.ReactNode; // Optional icon
};

type SidebarGroup = {
  label: string;
  links: LinkItem[];
};

export const SidebarOptions = ({ groups }: { groups: SidebarGroup[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Track which folder is open

  const handleFolderToggle = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index)); // Toggle current folder
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {groups.map((group, idx) => (
        <Folder
          key={idx}
          index={idx}
          label={group.label}
          links={group.links}
          isOpen={openIndex === idx}
          onToggle={handleFolderToggle}
        />
      ))}
    </div>
  );
};

const Folder = ({
  label,
  links,
  isOpen,
  onToggle,
  index,
}: {
  label: string;
  links: LinkItem[];
  isOpen: boolean;
  onToggle: (index: number) => void;
  index: number;
}) => {
  const pathname = usePathname();

  return (
    <div className="group rounded-lg overflow-hidden transition-all">
      {/* Header Section */}
      <button
        onClick={() => onToggle(index)}
        className="w-full flex justify-between text-justify items-center px-5 py-2 text-sm font-semibold text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-300 group-hover:bg-gray-50 dark:group-hover:bg-zinc-800 transition-all rounded-t-lg backdrop-blur-sm bg-white/30 dark:bg-zinc-900/50">
        <span>{label}</span>
        {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* Collapsible Links Section */}
      {isOpen && (
        <div className="bg-white dark:bg-zinc-900 px-3 pt-1 pb-3 rounded-b-lg backdrop-blur-sm bg-white/30 dark:bg-zinc-900/50">
          <ul className="flex flex-col gap-2">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-medium text-xs transition-all  ${
                      isActive
                        ? "text-white bg-purple-600"
                        : "text-gray-600 dark:text-zinc-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-zinc-700"
                    }`}>
                    {link.icon && (
                      <span
                        className={`text-sm  ${isActive ? "text-white" : "text-purple-600 dark:text-purple-300"}`}>
                        {link.icon}
                      </span>
                    )}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
