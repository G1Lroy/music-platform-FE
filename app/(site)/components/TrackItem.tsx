import PlayButton from "@/components/UI/PlayButton";
import { TrackT } from "@/store/tracksPage/model";
import React from "react";

interface TrackItemProps {
  track: TrackT;
  onClick: () => void;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="  relative 
        group 
        flex 
        flex-col 
        items-center 
        justify-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        bg-neutral-400/5 
        cursor-pointer 
        hover:bg-neutral-400/10 
        transition 
        p-3"
    >
      <div
        className="
          relative 
          aspect-square 
          w-full
          h-full 
          rounded-md 
          overflow-hidden
        "
      >
        <img className="w-full h-full" loading="lazy" src={"http://localhost:5000/" + track.image} alt="" />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{track.title}</p>
        <p
          className="
            text-neutral-400 
            text-sm 
            pb-4 
            w-full 
            truncate
          "
        >
          {track.artist}
        </p>
      </div>
      <div
        className="
          absolute 
          bottom-24 
          right-5
        "
      >
        <PlayButton />
      </div>
    </div>
  );
};

export default TrackItem;
