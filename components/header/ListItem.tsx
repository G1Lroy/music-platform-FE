"use client";
import { useRouter } from "next/navigation";
import { FcLikePlaceholder } from "react-icons/fc";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({ href, name }) => {
  const router = useRouter();
  const clickHandler = () => {
    router.push(href);
  };
  return (
    <button
      onClick={clickHandler}
      className="
            relative
            group
            rounded-md
            overflow-hidden
            gap-x-3
            bg-neutral-100/10
            hover:bg-neutral-100/20
            transition
            px-2
          "
    >
      <div className="relative min-h-[64px] min-w-[64px] flex justify-between items-center flex-1">
        <div className="h-[64px] flex justify-center items-center ">
          <FcLikePlaceholder size={25} />
        </div>
        <p className="text-semibold text-lg">{name}</p>
        <div
          className="
          transition 
          opacity-0 
          rounded-full 
          flex 
          items-center 
          justify-center 
          bg-green-500 
          p-4 
          drop-shadow-md 
          right-5
          group-hover:opacity-100 
          hover:scale-110
        "
        >
          <FaPlay className="text-black" />
        </div>
      </div>
    </button>
  );
};

export default ListItem;
