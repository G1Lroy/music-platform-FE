import { TrackT } from "@/store/tracksPageStore";
import React from "react";

interface TrackItemProps {
  track: TrackT;
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  return (
    <div
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
      key={track._id}
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
        <img
          loading="lazy"
          src={"http://localhost:5000/" + track.image}
          alt=""
        />
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
          By {track.artist}
        </p>
      </div>
      <div
        className="
          absolute 
          bottom-24 
          right-5
        "
      >
        Play BTN
      </div>
    </div>
  );
};

export default TrackItem;
