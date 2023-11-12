"use client";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import userStore from "@/store/userStore";
import authModaStore from "@/store/authModalStore";
import toast from "react-hot-toast";
import { toastConfig } from "@/const";
import uploadModalStore from "@/store/uploadModalStore";

interface LibraryProps {}

const Library: React.FC<LibraryProps> = ({}) => {
  const { isLogin } = userStore();
  const { setIsOpenLogin } = authModaStore();
  const { setIsOpenUpload } = uploadModalStore();
  const handleUpload = () => {
    if (!isLogin) {
      toast("Please login!", toastConfig);
      setIsOpenLogin(true);
      return;
    }
    setIsOpenUpload(true);
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="text-neutral-500 items-center gap-2 inline-flex">
          <TbPlaylist size={25} />
          <p className="font-medium text-base">Songs library</p>
        </div>
        <AiOutlinePlus
          onClick={handleUpload}
          size={20}
          className="text-white hover:text-gray-400 transition cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-2">List of songs</div>
    </div>
  );
};

export default Library;
