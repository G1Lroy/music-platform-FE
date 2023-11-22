import { TrackT } from "@/store/tracksPage/model";
import React from "react";
import { twMerge } from "tailwind-merge";
import { AiTwotoneDelete } from "react-icons/ai";
import tracksPageStore from "@/store/tracksPage";
import Loader from "../UI/Loader";

interface LibraryItemProps {
  track: TrackT;
  className?: string;
  onClick?: () => void;
  isUserLibrary?: boolean;
}

const LibraryItem: React.FC<LibraryItemProps> = ({ track, className, onClick, isUserLibrary }) => {
  const { fetchDeleteTrack, isTracksLoading, trackIdToDelete } = tracksPageStore();
  const deleteTrack = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    fetchDeleteTrack(id);
  };
  return (
    <div
      onClick={onClick}
      className={twMerge(
        "flex items-center gap-x-3 cursor-pointer relative hover:bg-neutral-800/50 w-full p-1 rounded-md bg-neutral-950",
        className
      )}
    >
      <div
        className="
          relative 
          rounded-md 
          w-[40px]
          h-[40px]
        "
      >
        <img src={"http://localhost:5000/" + track?.image} alt="Library Item" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden max-w-[180px]">
        <p className="text-white truncate" title={track.title}>
          {track?.title}
        </p>
        <p className="text-neutral-400 text-sm truncate">{track?.artist}</p>
      </div>
      {isUserLibrary && (
        <button
          title="Delete track!"
          onClick={(e) => deleteTrack(track._id, e)}
          className={twMerge("absolute right-1 hover:text-red-500 transition")}
        >
          {isTracksLoading && trackIdToDelete === track._id ? (
            <Loader className="border w-3 h-3 border-white" />
          ) : (
            <AiTwotoneDelete />
          )}
        </button>
      )}
    </div>
  );
};

export default LibraryItem;
