"use client";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

interface LibraryProps {}

const Library: React.FC<LibraryProps> = ({}) => {
  const handleUpload = () => {
    return;
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
