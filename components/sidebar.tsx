"use client";

import { Logo } from "./logo";
import { SidebarItem } from "./sidebar-items";
import { Book, TestTube2Icon, List, LanguagesIcon } from "lucide-react";

const routes = [
  {
    icon: List,
    label: "Home",
    href: "/",
  },
  {
    icon: Book,
    label: "Books",
    href: "/book",
  },
];

export const Sidebar = () => {
  return (
    <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
      <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
        <div className="p-6">
          <Logo />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col w-full">
            {routes.map((route) => (
              <SidebarItem
                key={route.href}
                icon={route.icon}
                label={route.label}
                href={route.href}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
