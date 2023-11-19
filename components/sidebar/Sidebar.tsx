"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Container from "../UI/Container";
import SidebarItem from "./SidebarItem";
import Library from "../library/Library";
import playerStore from "@/store/player";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { currTrack } = playerStore();
  const pathName = usePathname();
  const routs = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathName !== "search",
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathName === "search",
        href: "/search",
      },
    ],
    [pathName]
  );

  return (
    <div className={twMerge("flex h-full", currTrack && "h-[calc(100%-80px)]")}>
      <div
        className="
        hidden
        md:flex
        flex-col
        gap-y-2
        bg-black
        h-full
        w-[300px]
        p-2
        "
      >
        <Container className="flex flex-col gap-4 p-3">
          {routs.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </Container>
        <Container className="overflow-y-auto p-3 h-full">
          <Library />
        </Container>
      </div>
      <main className="h-full flex-1 py-2 pr-2 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Sidebar;
