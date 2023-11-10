"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { BiUserPin } from "react-icons/bi";
import Button from "./UI/Button";
import modalStore from "@/store/authModalStore";
import userStore from "@/store/userStore";
import Link from "next/link";
import toast from "react-hot-toast";
import { removeSession } from "@/utils/session";
import uiStore from "@/store/uiStore";

interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ className, children }) => {
  const router = useRouter();
  const { setIsOpenLogin, setIsOpenRegister } = modalStore();
  const { isLogin, setIslogin } = userStore();
  const { setisFirstRendeProfile } = uiStore();

  const handleLogout = async () => {
    setIslogin(false);
    setisFirstRendeProfile(true);
    removeSession();
    toast.success("Logged out");
    router.push("/");
  };
  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-5`, className)}>
      <div className="w-full flex items-center justify-between mb-5">
        {/* Desctop */}
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="bg-black rounded-full flex items-center justify-center cursor-pointer hover:-translate-x-1 transition"
          >
            <RxCaretLeft className="text-white" size={30} />
          </button>
          <button
            onClick={() => router.forward()}
            className="bg-black rounded-full flex items-center justify-center cursor-pointer hover:translate-x-1 transition"
          >
            <RxCaretRight className="text-white" size={30} />
          </button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="p-1 rounded-full bg-white hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="p-1 rounded-full bg-white hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>

        {/* Auth */}

        {isLogin ? (
          <div className="flex items-center justify-center gap-x-3">
            <Link href="/profile">
              <BiUserPin
                title="Go to profile page"
                className="cursor-pointer hover:scale-125 transition"
                size={25}
              />
            </Link>
            <Button onClick={handleLogout} className="bg-white flex items-center">
              Log Out
            </Button>
          </div>
        ) : (
          <div className="flex justify-between items-center gap-x-4">
            <>
              <div>
                <Button onClick={() => setIsOpenRegister(true)}>Sign Up</Button>
              </div>
              <div>
                <Button onClick={() => setIsOpenLogin(true)} className="bg-white">
                  Log In
                </Button>
              </div>
            </>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default Header;
