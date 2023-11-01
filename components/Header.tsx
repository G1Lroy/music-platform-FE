"use client";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./UI/Button";
import modalStore from "@/store/modalStore";
import userStore from "@/store/userStore";
import { delay } from "@/utils";

interface HeaderProps {
  className: string;
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ className, children }) => {
  const router = useRouter();
  const { onOpen } = modalStore();
  const { isLogin, setIslogin } = userStore();
  const handleLogout = async () => {
    await delay(1500);
    setIslogin(false);
  };
  return (
    <div
      className={twMerge(`
  h-fit
  bg-gradient-to-b
  from-emerald-800
  p-5
  `)}
    >
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
          <div>
            <Button onClick={handleLogout} className="bg-white">
              Log Out
            </Button>
          </div>
        ) : (
          <div className="flex justify-between items-center gap-x-4">
            <>
              <div>
                <Button>Sign Up</Button>
              </div>
              <div>
                <Button onClick={onOpen} className="bg-white">
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
