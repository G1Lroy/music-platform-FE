import { TrackT } from "@/store/tracksPage/model";
import React from "react";

interface LibraryItemProps {
  track: TrackT;
}

const LibraryItem: React.FC<LibraryItemProps> = ({ track }) => {
  return (
    <div
      className="
        flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        hover:bg-neutral-800/50 
        w-full 
        p-2 
        rounded-md
        bg-neutral-950
      "
    >
      <div
        className="
          relative 
          rounded-md 
          w-[50px]
          h-[50px]
          overflow-hidden
        "
      >
        <img src={"http://localhost:5000/" + track.image} alt="Library Item" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{track.title}</p>
        <p className="text-neutral-400 text-sm truncate">By {track.artist}</p>
      </div>
    </div>
  );
};

export default LibraryItem;
